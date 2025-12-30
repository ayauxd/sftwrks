#!/usr/bin/env node
/**
 * Generate high-quality images using Imagen 3 via Google Generative AI
 * Run: source .env.local && node scripts/generate-imagen3.mjs
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

const IMAGES = [
  {
    name: 'challenge-noir',
    outputDir: 'public/assets/sections',
    prompt: `Create a sophisticated minimalist illustration for a premium business consulting website. Square format.

Scene: A calm, organized workspace where a consultant guides a client through complexity.
Show two abstract professional figures (simple elegant silhouettes, NOT mannequins or robots)
at a sleek modern desk reviewing a glowing strategic roadmap displayed on a tablet.

Visual elements:
- Left side: Faint scattered geometric shapes representing disorganized processes
- Center: The two figures collaborating, one pointing at the roadmap
- Right side: Clean connected flowchart nodes showing organized systems
- A gentle cyan light (#00D4FF) illuminates the path from chaos to clarity

Style: Premium editorial illustration. Deep navy background (#0A1628).
Steel blue mid-tones (#1E3A5F). Cyan accent highlights (#00D4FF).
Clean vector-like lines, soft gradients, subtle depth.
Think: Harvard Business Review cover art, McKinsey presentation quality.

Mood: Confident, professional, trustworthy, approachable.
The feeling of expert guidance making complex things simple.

NO text. NO realistic human faces. Elegant abstract human forms only.
NO sci-fi elements. NO cyberpunk aesthetic. NO glitch effects.
NO horizontal lines or scan lines. Clean smooth surfaces.`
  },
  {
    name: 'team-workflow-noir',
    outputDir: 'public/assets/team',
    prompt: `Create a warm, professional illustration of a modern consulting team workspace. Ultra-wide 21:9 cinematic format (1920x823 pixels).

Scene: A bright, open office environment with 4 abstract professional figures
collaborating around modern workstations. They are engaged, leaning in, discussing work.
One central large display shows a network diagram of connected workflow nodes.
Small subtle glowing orbs near each workstation represent AI tools - helpful, not dominant.

Visual composition:
- Foreground: Team members at individual stations, clearly human and collaborative
- Center: Large shared screen showing interconnected process diagram
- Background: Clean office with subtle grid pattern suggesting structure
- Warm lighting from above, cool cyan accents on screens and highlights

Style: Contemporary editorial illustration like Notion, Linear, or Stripe's brand art.
Navy (#0A1628) and steel blue (#1E3A5F) palette with warm cyan (#00D4FF) highlights.
Soft, inviting lighting. Premium business aesthetic.

The humans are clearly the focus - they drive the work, AI tools support them.
Professional, collaborative, aspirational but grounded.

NO text. Abstract human silhouettes with professional body language.
NO mannequins, robots, or sci-fi elements. NOT dystopian or cold.
NO horizontal scan lines. Clean modern aesthetic.
Think: The kind of team you'd trust with your business transformation.`
  }
];

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);

  // Try Imagen 3 first
  try {
    console.log('Attempting Imagen 3...');
    const imagenModel = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await imagenModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: imageConfig.prompt }] }],
    });

    const response = result.response;
    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return await saveImage(part.inlineData.data, imageConfig);
        }
      }
    }
  } catch (error) {
    console.log(`Imagen 3 not available: ${error.message}`);
  }

  // Fallback to Gemini 2.0 Flash with image generation
  try {
    console.log('Using Gemini 2.0 Flash with image generation...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    });

    const result = await model.generateContent(imageConfig.prompt);
    const response = result.response;

    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return await saveImage(part.inlineData.data, imageConfig);
        }
      }
    }
  } catch (error) {
    console.error(`Gemini Flash failed: ${error.message}`);
  }

  console.error(`✗ Failed to generate ${imageConfig.name}`);
  return false;
}

async function saveImage(base64Data, imageConfig) {
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const outputDir = path.join(process.cwd(), imageConfig.outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${imageConfig.name}.png`);
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  return true;
}

async function main() {
  console.log('Generating premium images...\n');

  for (const img of IMAGES) {
    await generateImage(img);
    // Delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✓ Done!');
}

main().catch(console.error);
