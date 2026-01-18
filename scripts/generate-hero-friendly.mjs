#!/usr/bin/env node
/**
 * Generate a friendlier, more approachable hero image
 * Uses Imagen 4 Ultra for highest quality
 * Run: source .env.local && node scripts/generate-hero-friendly.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const HERO_PROMPT = `A warm, inviting illustration for an AI consulting company homepage.

STYLE:
- Modern paper-cut layered effect with soft depth and dimension
- Cinematic lighting - warm and welcoming, professional
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Electric cyan (#00D4FF) as accent, subtle warm amber highlights
- Friendly, approachable mood - AI should feel helpful, not intimidating
- Abstract geometric style with elegant curves and clean edges
- Premium, sophisticated aesthetic

SCENE - "A Welcoming Path Forward":
- An elegant open archway or portal made of layered geometric shapes, softly glowing with cyan light
- Beyond the archway: a clear, organized cityscape of interconnected nodes and pathways representing clarity, possibility, and success
- The foreground shows a welcoming path with subtle stepping stones leading toward the light
- Two abstract human silhouettes in collaborative poses - one guiding another, representing partnership
- Floating geometric elements that feel like friendly guides, not cold machines
- Soft gradient lighting drawing the eye toward the bright possibilities ahead
- Paper-cut depth with distinct layers creating dimension

MOOD: Hopeful, premium, partnership-oriented. The feeling of having an expert guide who makes complex things simple. Professional but warm.

TECHNICAL: 16:9 aspect ratio, landscape orientation, high detail, sharp focus.

AVOID: Harsh shadows, intimidating darkness, robotic/cold imagery, chaos, warning colors (red/orange), isolated figures, aggressive sharp geometry, text, realistic faces, logos.`;

async function generateImage() {
  console.log('Generating hero image with Imagen 4 Ultra (highest quality)...\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: HERO_PROMPT }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            personGeneration: 'allow_adult',
            outputOptions: { mimeType: 'image/png' }
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('API Error:', data.error.message);

      // Fallback to standard Imagen 4 if Ultra not available
      if (data.error.message.includes('not found') || data.error.message.includes('permission')) {
        console.log('\nTrying Imagen 4 standard...');
        return generateWithFallback();
      }
      process.exit(1);
    }

    if (!data.predictions || !data.predictions[0]?.bytesBase64Encoded) {
      console.error('No image generated. Response:', JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
    const outputPath = path.join(process.cwd(), 'public/assets/hero/hero-friendly.png');

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    console.log('Model: Imagen 4 Ultra');

  } catch (error) {
    console.error('Failed to generate image:', error.message);
    process.exit(1);
  }
}

async function generateWithFallback() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: HERO_PROMPT }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          personGeneration: 'allow_adult',
          outputOptions: { mimeType: 'image/png' }
        }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error('Fallback API Error:', data.error.message);
    process.exit(1);
  }

  if (!data.predictions || !data.predictions[0]?.bytesBase64Encoded) {
    console.error('No image generated.');
    process.exit(1);
  }

  const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  const outputPath = path.join(process.cwd(), 'public/assets/hero/hero-friendly.png');

  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  console.log('Model: Imagen 4 (standard)');
}

generateImage();
