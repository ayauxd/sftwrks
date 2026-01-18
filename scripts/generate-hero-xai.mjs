#!/usr/bin/env node
/**
 * Generate hero image using xAI Aurora (Grok's image model)
 * Run: source .env.local && node scripts/generate-hero-xai.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.XAI_API_KEY;
if (!apiKey) {
  console.error('XAI_API_KEY not set');
  process.exit(1);
}

// Premium hero prompt - condensed for xAI (max 1024 chars)
const HERO_PROMPT = `3D isometric paper-craft diorama illustration, premium editorial quality.

LEFT: Towering chaotic stack of white papers, documents, manila folders spilling over. Visual complexity.

CENTER: Brain made of circuit board traces with glowing cyan (#00D4FF) connection nodes. Clean geometric processing engine.

RIGHT: Organized filing cabinets, neat folder stacks, structured document trays. Perfect alignment.

STYLE: Paper-craft architectural model aesthetic, off-white blueprint grid background, soft shadows, matte paper textures. NO glossy plastic look. NO text, NO faces.

MOOD: Sophisticated, precise. Information chaos becoming clarity.`;

async function generateImage() {
  console.log('🎨 Generating hero image with xAI Aurora...\n');
  console.log('Prompt:', HERO_PROMPT.substring(0, 200) + '...\n');

  try {
    const response = await fetch('https://api.x.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'grok-2-image',
        prompt: HERO_PROMPT,
        n: 1,
        response_format: 'b64_json'
      })
    });

    const data = await response.json();

    if (data.error) {
      console.log('⚠ API Error:', data.error.message || JSON.stringify(data.error));
      return null;
    }

    if (!data.data?.[0]?.b64_json) {
      console.log('⚠ No image generated');
      console.log('Response:', JSON.stringify(data, null, 2));
      return null;
    }

    const imageBuffer = Buffer.from(data.data[0].b64_json, 'base64');
    const outputDir = path.join(process.cwd(), 'public/assets/hero');
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'hero-xai-desktop.png');
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    return outputPath;

  } catch (error) {
    console.log('⚠ Error:', error.message);
    return null;
  }
}

generateImage().then(result => {
  if (result) {
    console.log('\n📌 Next steps:');
    console.log('   1. Review: open', result);
    console.log('   2. If good, copy to hero-desktop.png');
    console.log('   3. Convert: cwebp -q 85 hero-xai-desktop.png -o hero-desktop.webp');
  }
}).catch(console.error);
