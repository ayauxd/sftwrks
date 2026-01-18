#!/usr/bin/env node
/**
 * Generate unique photo booth case study image
 * Run: source .env.local && node scripts/generate-photobooth-image.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

const PROMPT = `Cinematic noir illustration with paper-cut layered effect.

STYLE:
- Paper-cut layered effect: distinct geometric layers with depth
- Cinematic noir: dramatic lighting, deep shadows
- Colors: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accent (#00D4FF)
- Sharp geometric edges, abstract silhouettes
- NO text, NO realistic faces

SCENE - "AI Photo Booth Magic":
- A sleek, modern photo booth kiosk rendered in geometric paper-cut style
- Abstract silhouettes of children gathered around, excited
- The booth screen glows with cyan light, showing a transformed photo
- Playful dinosaur silhouettes emerging from the booth as paper-cut layers
- Floating photo frames with magical cyan sparkles
- Conveying automation, fun, wonder, and accessibility
- Party atmosphere suggested through geometric confetti elements

MOOD: Playful yet sophisticated, magical automation, wonder and delight.

TECHNICAL: 4:3 aspect ratio, high detail.`;

async function generate() {
  console.log('Generating photo booth case study image with Imagen 4 Ultra...\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: PROMPT }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '4:3',
          personGeneration: 'allow_adult',
          outputOptions: { mimeType: 'image/png' }
        }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error('Error:', data.error.message);
    process.exit(1);
  }

  if (!data.predictions || !data.predictions[0]?.bytesBase64Encoded) {
    console.error('No image generated');
    process.exit(1);
  }

  const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  const outputPath = path.join(process.cwd(), 'public/assets/case-studies/photobooth-noir.png');

  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
}

generate().catch(console.error);
