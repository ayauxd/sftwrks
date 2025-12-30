#!/usr/bin/env node
/**
 * Generate high-quality images using Imagen 3 via the correct API endpoint
 * Run: source .env.local && node scripts/generate-imagen3-v2.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const IMAGES = [
  {
    name: 'challenge-noir',
    outputDir: 'public/assets/sections',
    aspectRatio: '1:1',
    prompt: `A sophisticated minimalist illustration for a premium business consulting website.

Scene: A calm workspace where a consultant guides a client. Two elegant abstract professional
figures (simple silhouettes, NOT mannequins) at a modern desk reviewing a glowing strategic
roadmap on a tablet screen.

Left side: Faint scattered shapes representing disorganized processes.
Center: Two figures collaborating, one gesturing toward the roadmap.
Right side: Clean connected flowchart nodes showing organized systems.
A gentle cyan glow illuminates the path from chaos to clarity.

Style: Premium editorial illustration. Deep navy background. Steel blue mid-tones.
Cyan accent highlights. Clean vector lines, soft gradients.
Like Harvard Business Review or McKinsey presentation art.

Mood: Confident, professional, trustworthy. Expert guidance making complexity simple.

NO text. NO realistic faces. Elegant abstract human forms.
NO sci-fi. NO cyberpunk. NO glitch effects. NO scan lines. Clean smooth surfaces.`
  },
  {
    name: 'team-workflow-noir',
    outputDir: 'public/assets/team',
    aspectRatio: '16:9',
    prompt: `A warm professional illustration of a modern consulting team workspace.

Scene: Open office with 4 abstract professional figures collaborating around workstations.
They are engaged and discussing. Central large display shows connected workflow nodes.
Small glowing orbs near workstations represent AI tools - subtle and supportive.

Foreground: Team at individual stations, clearly human and collaborative.
Center: Large shared screen with interconnected process diagram.
Background: Clean office with subtle structure.
Warm lighting from above, cool cyan accents on screens.

Style: Contemporary editorial illustration like Notion or Stripe brand art.
Navy and steel blue palette with warm cyan highlights. Soft inviting lighting.

Humans are the focus - AI tools support them. Professional and collaborative.

NO text. Abstract human silhouettes with professional body language.
NO mannequins or robots. NOT dystopian. NO scan lines. Clean modern aesthetic.`
  }
];

async function generateWithImagen3(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);
  console.log(`Attempting Imagen 3 via REST API...`);

  // Try the imagen endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt: imageConfig.prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: imageConfig.aspectRatio,
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
        return await saveImage(data.predictions[0].bytesBase64Encoded, imageConfig);
      }
    } else {
      const error = await response.text();
      console.log(`Imagen 3 REST API failed: ${response.status} - ${error.substring(0, 200)}`);
    }
  } catch (error) {
    console.log(`Imagen 3 REST error: ${error.message}`);
  }

  // Fallback to Gemini 2.0 Flash
  return await generateWithGeminiFlash(imageConfig);
}

async function generateWithGeminiFlash(imageConfig) {
  console.log('Using Gemini 2.0 Flash with improved prompt...');

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  try {
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
    await generateWithImagen3(img);
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✓ Done!');
}

main().catch(console.error);
