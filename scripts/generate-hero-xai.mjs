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

// Cinematic noir paper-cut prompt - "The Clarity Machine" (condensed for xAI)
const HERO_PROMPT = `Cinematic noir paper-cut diorama, dimly lit industrial workshop, AI transformation machine.

LEFT: Chaotic paper documents, manila folders, tangled ribbons tumbling onto paper conveyor belt. Business chaos.

CENTER: Intricate paper mechanism - layered cardstock gears, pipes, mechanical components. Subtle cyan glow (#00D4FF) at core. Paper conveyor belts feed in and out.

RIGHT: Documents emerge organized - neat file stacks, labeled folders, structured trays. Precise, purposeful.

STYLE: 6-8 depth layers, dark charcoal/navy background (#0A1628), warm amber spotlight from above, grainy cardstock textures, industrial machinery aesthetic.

COLORS: Deep navy background, cream/manila papers, bronze machinery accents, cyan glow ONLY at AI core.

NO text, NO faces, NO humans. 16:9 aspect ratio.`;

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
