#!/usr/bin/env node
/**
 * Generate section images using the SAME style that worked for case studies
 * Run: source .env.local && node scripts/generate-sections-noir.mjs
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

// EXACT same style that worked for case studies
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
- Abstract/symbolic representation of the topic

SPECIFIC VISUAL: `;

const IMAGES = [
  {
    name: 'challenge-noir',
    outputDir: 'public/assets/sections',
    prompt: `${NOIR_STYLE}
The AI consultation journey - helping businesses navigate from chaos to clarity.
16:9 aspect ratio (1920x1080).

Show a visual metaphor of expert guidance through complexity:
- Left side: Scattered, disconnected geometric blocks and shapes floating in disarray - representing chaotic business processes
- Center: A glowing cyan bridge or pathway made of connected geometric segments
- Right side: Organized, interconnected geometric structure - clean, efficient, working together
- Two abstract professional silhouettes (simple geometric forms) on the bridge, one guiding the other across
- The guide figure gestures toward the organized side, showing the path forward

Paper-cut depth layers:
- Background: Deep navy with subtle grid pattern
- Mid-ground: The scattered chaos (left) and organized structure (right)
- Foreground: The bridge and figures, sharply defined with cyan edge lighting

Mood: Hopeful transformation - from confusion to clarity with expert help.
The bridge represents Softworks guiding clients to successful AI implementation.`
  },
  {
    name: 'team-workflow-noir',
    outputDir: 'public/assets/team',
    prompt: `${NOIR_STYLE}
Human expertise amplified by AI - a collaborative team workspace.
21:9 ultra-wide cinematic aspect ratio (1920x823).

Show an abstract modern workspace scene:
- Center: A large curved display screen showing the Softworks "S" logo made of interconnected glowing cyan nodes and connection lines
- Around it: 4-5 abstract professional figure silhouettes (simple geometric forms) at individual workstations
- Each workstation has a smaller screen showing workflow diagrams
- Flowing data streams (thin cyan lines) connecting all workstations to the central display
- Small glowing cyan orbs floating near each figure - representing AI assistance
- The figures are clearly engaged - gesturing, pointing at screens, collaborating

Paper-cut depth layers:
- Background: Deep navy with architectural elements suggesting a modern office
- Mid-ground: The central large display with the S logo
- Foreground: The team figures and their workstations, with sharp geometric edges

Mood: Collaborative, high-tech but human-centered. The team drives the work, AI supports them.
This is what "human expertise, amplified by AI" looks like in practice.`
  }
];

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);
  console.log(`Using: gemini-2.0-flash-exp (same as case studies)`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  try {
    const result = await model.generateContent(imageConfig.prompt);
    const response = result.response;

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
        return true;
      }
    }

    console.error(`✗ No image in response for ${imageConfig.name}`);
    return false;

  } catch (error) {
    console.error(`✗ Error generating ${imageConfig.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Generating section images with noir paper-cut style...');
  console.log('(Same style that worked for case studies)\n');

  for (const img of IMAGES) {
    await generateImage(img);
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✓ Done!');
}

main().catch(console.error);
