#!/usr/bin/env node
/**
 * Generate branding images using Gemini 3 Pro Image
 * - OG Card (1200x630) with Softworks logo
 * - Team section with Softworks logo
 *
 * Run: source .env.local && node scripts/generate-branding-images.mjs
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

// The Softworks 3D cube logo description for AI to recreate
const SOFTWORKS_LOGO_DESCRIPTION = `The Softworks logo: A 3D isometric cube structure forming a stylized letter "S".
The cube is made of interconnected geometric blocks with:
- Steel blue (#1E3A5F) as the primary color for solid faces
- Cyan (#00D4FF) as the accent glow color on edges and connection points
- The blocks are arranged in an S-curve pattern when viewed from the front
- Has depth and dimensionality with subtle shadows
- Clean, precise geometric lines
- Professional and modern tech aesthetic`;

const IMAGES = [
  {
    name: 'og-preview-landscape',
    outputDir: 'public/assets/logos',
    prompt: `Create a professional social media preview card image.
Exact dimensions: 1200x630 pixels (OG image standard).

LAYOUT:
- Left side (40% of width): The Softworks logo
- Right side (60% of width): Text content
- Background: Deep navy gradient (#0A1628 to #0F172A)

THE SOFTWORKS LOGO (left side):
${SOFTWORKS_LOGO_DESCRIPTION}
Make the logo large and prominent, centered vertically on the left portion.
Add a subtle cyan glow behind the logo for depth.

TEXT CONTENT (right side, vertically centered):
1. "Softworks" - Large bold title in white, clean sans-serif font
2. "AI that works for your business." - Slogan in cyan (#00D4FF), medium size
3. "www.sftwrks.com" - URL in lighter gray (#94A3B8), smaller size
4. "Softworks Trading Co." - Very small footer text in muted gray (#64748B)

STYLE:
- Clean, minimal, professional
- Subtle grid pattern in background at very low opacity
- Tech-forward but approachable
- High contrast for readability
- Premium quality suitable for LinkedIn, Twitter, Facebook previews
- Text should be crisp and perfectly legible

The overall impression: A sophisticated AI consulting firm that delivers results.`
  },
  {
    name: 'team-workflow-noir',
    outputDir: 'public/assets/team',
    prompt: `Create a cinematic noir style illustration with paper-cut layered effect.
Ultra-wide 21:9 cinematic aspect ratio.

REQUIRED STYLE:
- Cinematic noir aesthetic: dramatic lighting, deep shadows, film noir mood
- Paper-cut/layered effect: distinct layers with depth, like cut paper art
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accent (#00D4FF)
- High contrast between light and dark areas
- Geometric shapes with sharp edges suggesting paper layers
- Subtle film grain texture
- Dramatic diagonal lighting from one side
- Professional, moody, sophisticated atmosphere
- NO faces, NO photorealistic elements
- Abstract/symbolic representation

THE SCENE - Human expertise amplified by AI:

CENTER FOCAL POINT:
A large curved display screen showing the Softworks logo:
${SOFTWORKS_LOGO_DESCRIPTION}
The logo should be glowing with cyan energy, with subtle connection lines radiating from it.
This is the heart of the operation - the AI system that connects everything.

SURROUNDING THE CENTER:
- 4-5 abstract professional figure silhouettes (simple geometric forms, no faces)
- Each at individual workstations with smaller screens showing workflow diagrams
- Flowing data streams (thin cyan lines) connecting all workstations to the central Softworks display
- Small glowing cyan orbs floating near each figure - representing AI assistance
- The figures are engaged - gesturing, pointing at screens, collaborating

PAPER-CUT DEPTH LAYERS:
- Background layer: Deep navy with architectural elements suggesting a modern office
- Mid-ground layer: The central large display with the Softworks logo prominently displayed
- Foreground layer: The team figures and their workstations, with sharp geometric edges

MOOD: Collaborative, high-tech but human-centered. The team drives the work, AI supports them.
This represents "human expertise, amplified by AI" - the Softworks way.`
  }
];

const MODELS = [
  { id: 'gemini-2.0-flash-exp-image-generation', name: 'Gemini 2.0 Flash Image' },
  { id: 'imagen-3.0-generate-002', name: 'Imagen 3' }
];

async function generateWithModel(modelId, prompt) {
  try {
    const response = await client.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    });

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          return part.inlineData.data;
        }
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);

  for (const model of MODELS) {
    console.log(`Trying: ${model.name} (${model.id})`);

    try {
      const imageData = await generateWithModel(model.id, imageConfig.prompt);

      if (imageData) {
        return await saveImage(imageData, imageConfig, model.name);
      }
      console.log(`  No image returned, trying next model...`);
    } catch (error) {
      console.log(`  Failed: ${error.message?.substring(0, 100) || error}`);
    }
  }

  console.error(`Failed to generate ${imageConfig.name} with all models`);
  return false;
}

async function saveImage(base64Data, imageConfig, modelName) {
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const outputDir = path.join(process.cwd(), imageConfig.outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${imageConfig.name}.png`);
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`  ✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  console.log(`  Model used: ${modelName}`);
  return true;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Generating Softworks branding images');
  console.log('='.repeat(60));

  let successCount = 0;
  for (const img of IMAGES) {
    const success = await generateImage(img);
    if (success) successCount++;
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Done! ${successCount}/${IMAGES.length} images generated.`);
  console.log('='.repeat(60));
}

main().catch(console.error);
