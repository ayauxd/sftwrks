#!/usr/bin/env node
/**
 * Generate section images using Gemini AI
 * Run: source .env.local && node scripts/generate-section-images.mjs
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Noir paper-cut style base
const NOIR_STYLE = `Create a cinematic noir style illustration with paper-cut layered effect.

REQUIRED STYLE:
- Cinematic noir aesthetic: dramatic lighting, deep shadows, film noir mood
- Paper-cut/layered effect: distinct layers with depth, like cut paper art
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accent (#00D4FF), near-black shadows
- High contrast between light and dark areas
- Geometric shapes with sharp edges suggesting paper layers
- Subtle film grain texture
- Dramatic diagonal lighting from one side
- Professional, moody, sophisticated atmosphere
- NO text, NO faces, NO photorealistic elements
- Abstract/symbolic representation

`;

const IMAGES = [
  {
    name: 'challenge-noir',
    outputDir: 'public/assets/sections',
    aspectRatio: '1:1 aspect ratio (1080x1080)',
    prompt: `${NOIR_STYLE}
${this?.aspectRatio || '1:1 aspect ratio (1080x1080)'}

SPECIFIC VISUAL - "The AI Consultation Journey":
Show a helpful consultation scene - abstract representation of guidance through complexity.
On the left: chaotic scattered geometric shapes representing disconnected business processes, with faint red warning glows.
In the center: a clear pathway/bridge of cyan light connecting the chaos to order.
On the right: organized, interconnected geometric nodes glowing with cyan, representing successful AI integration.
A subtle human figure silhouette (abstract, geometric) guides another across the bridge - showing the consultancy relationship.
Paper-cut layers create depth - foreground elements sharp, background softer.
Mood: Hopeful, professional, showing transformation from chaos to clarity with expert guidance.`
  },
  {
    name: 'team-workflow-noir',
    outputDir: 'public/assets/team',
    aspectRatio: '21:9 aspect ratio (1920x823)',
    prompt: `${NOIR_STYLE}
21:9 aspect ratio (1920x823) - ultra-wide cinematic format.

SPECIFIC VISUAL - "Human Expertise Amplified by AI":
Show an abstract modern workspace scene - multiple geometric workstations arranged in a collaborative layout.
Central focus: a large display/screen showing the Softworks "S" logo shape made of interconnected cyan nodes.
Around it: abstract representations of team members as geometric silhouettes - 4-5 figures positioned at workstations.
Flowing data streams and workflow lines connecting each station to the central display.
AI assistance visualized as subtle cyan helper nodes floating near each workstation.
The workflow lines should show processes moving from humans → AI processing → refined outputs.
Paper-cut depth: workstations in foreground, central screen mid-ground, data visualization background.
Mood: Collaborative, high-tech, human-centered but AI-enhanced.`
  },
  {
    name: 'og-preview-landscape',
    outputDir: 'public/assets/logos',
    aspectRatio: '1200x630 (1.91:1 social card format)',
    prompt: `${NOIR_STYLE}
1200x630 pixels (1.91:1 social media card format) - landscape orientation.

SPECIFIC VISUAL - "Softworks Trading Company Brand Card":
Clean, minimal social sharing card design.
Background: Deep navy gradient (#0A1628 to #0F172A) with subtle grid pattern at 10% opacity.
Center composition: The Softworks "S" logo shape - a geometric interconnected S made of cyan-glowing nodes and connecting lines.
The S should be prominent, centered, and clearly readable as the brand mark.
Subtle paper-cut layers creating depth around the logo.
Small accent elements: a few floating geometric shapes in the corners, very subtle.
NO text - just the abstract S logo mark.
Mood: Premium, tech-forward, memorable, clean.
This must work as a social sharing preview image - keep it simple and impactful.`
  }
];

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);
  console.log(`Aspect: ${imageConfig.aspectRatio}`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  try {
    const fullPrompt = imageConfig.prompt.replace('${this?.aspectRatio || \'1:1 aspect ratio (1080x1080)\'}', imageConfig.aspectRatio);

    const result = await model.generateContent(fullPrompt);
    const response = result.response;

    let imageSaved = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        const outputDir = path.join(process.cwd(), imageConfig.outputDir);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${imageConfig.name}.png`);
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
        imageSaved = true;
        break;
      }
    }

    if (!imageSaved) {
      console.error(`✗ No image generated for ${imageConfig.name}`);
    }

  } catch (error) {
    console.error(`✗ Error generating ${imageConfig.name}:`, error.message);
  }
}

async function main() {
  console.log('Generating section images...\n');

  for (const img of IMAGES) {
    await generateImage(img);
    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✓ Done!');
}

main().catch(console.error);
