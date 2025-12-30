#!/usr/bin/env node
/**
 * Generate section images using Gemini 3 Pro Image (Nano Banana Pro)
 * Uses the newer @google/genai SDK (recommended December 2025)
 *
 * Run: source .env.local && node scripts/generate-sections-gemini3.mjs
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

// Proven noir paper-cut style template
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
    aspectRatio: '16:9',
    prompt: `${NOIR_STYLE}
The AI consultation journey - helping businesses navigate from chaos to clarity.
16:9 aspect ratio.

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
    aspectRatio: '21:9',
    prompt: `${NOIR_STYLE}
Human expertise amplified by AI - a collaborative team workspace.
21:9 ultra-wide cinematic aspect ratio.

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

// Model priority: try newest first, fall back to stable
const MODELS = [
  { id: 'gemini-3-pro-image-preview', name: 'Gemini 3 Pro Image (Nano Banana Pro)' },
  { id: 'gemini-2.5-flash-preview-image-generation', name: 'Gemini 2.5 Flash Image (Nano Banana)' },
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Legacy)' }
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

    // Extract image from response
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
      console.log(`  Failed: ${error.message?.substring(0, 80) || error}`);
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
  console.log('Generating section images with @google/genai SDK');
  console.log('Models (priority order):');
  MODELS.forEach((m, i) => console.log(`  ${i + 1}. ${m.name}`));
  console.log('='.repeat(60));

  let successCount = 0;
  for (const img of IMAGES) {
    const success = await generateImage(img);
    if (success) successCount++;
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Done! ${successCount}/${IMAGES.length} images generated.`);

  if (successCount === IMAGES.length) {
    console.log('\nImages ready in:');
    console.log('  - public/assets/sections/challenge-noir.png');
    console.log('  - public/assets/team/team-workflow-noir.png');
  }
  console.log('='.repeat(60));
}

main().catch(console.error);
