#!/usr/bin/env node
/**
 * Generate hero image using Fal.ai Flux Pro (synchronous)
 * Run: FAL_API_KEY=xxx node scripts/generate-hero-fal.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.FAL_API_KEY;
if (!apiKey) {
  console.error('FAL_API_KEY not set');
  process.exit(1);
}

// Premium hero prompt - technical blueprint aesthetic
const HERO_PROMPT = `A premium 3D isometric editorial illustration with technical blueprint aesthetic, paper-craft diorama style.

Scene composition from left to right:
- LEFT SIDE: A towering stack of white and cream papers, documents, manila folders spilling over. Chaotic but elegant. Overwhelming visual mass.
- CENTER: A brain shape made of clean circuit board traces with glowing cyan (#00D4FF) connection nodes. The processing engine.
- RIGHT SIDE: Organized output - neat filing cabinets, stacked folders with tabs, document trays. Everything aligned and structured.

Style: Paper-craft architectural model, real material textures. Warm off-white background with subtle grid. Soft shadows. Matte paper surfaces, NOT glossy. Premium editorial quality.

Colors: Cream/white/gray papers. Navy shadows. Cyan (#00D4FF) accent on circuit nodes only.

No text, no faces. Sophisticated, transformative mood.`;

// Responsive variants
const VARIANTS = [
  { name: 'desktop', size: 'landscape_16_9', prompt: HERO_PROMPT },
  { name: 'tablet', size: 'landscape_4_3', prompt: HERO_PROMPT + ' Focus on center brain and right organized side.' },
  { name: 'mobile', size: 'portrait_4_3', prompt: HERO_PROMPT + ' Focus tightly on center brain with cyan nodes.' }
];

async function generateImage(variant) {
  console.log(`\n🎨 Generating ${variant.name} (${variant.size})...`);

  try {
    const response = await fetch('https://fal.run/fal-ai/flux-pro/v1.1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${apiKey}`
      },
      body: JSON.stringify({
        prompt: variant.prompt,
        image_size: variant.size,
        num_images: 1
      })
    });

    const data = await response.json();

    if (data.error) {
      console.log('⚠ Error:', data.error);
      return null;
    }

    if (!data.images?.[0]?.url) {
      console.log('⚠ No image in response');
      return null;
    }

    // Download image
    const imageResponse = await fetch(data.images[0].url);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const outputDir = path.join(process.cwd(), 'public/assets/hero');
    fs.mkdirSync(outputDir, { recursive: true });

    const ext = data.images[0].content_type === 'image/jpeg' ? 'jpg' : 'png';
    const outputPath = path.join(outputDir, `hero-fal-${variant.name}.${ext}`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    return outputPath;

  } catch (error) {
    console.log('⚠ Error:', error.message);
    return null;
  }
}

async function main() {
  console.log('🎨 Generating Hero Images with Fal.ai Flux Pro');
  console.log('='.repeat(50));

  const results = [];

  for (const variant of VARIANTS) {
    const result = await generateImage(variant);
    results.push({ ...variant, path: result });
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));

  const success = results.filter(r => r.path);
  console.log(`\n✅ Generated: ${success.length}/${results.length} images`);
  success.forEach(r => console.log(`   - ${r.path}`));

  if (success.length > 0) {
    console.log('\n📌 Next steps:');
    console.log('   1. Review images: open public/assets/hero/hero-fal-*.jpg');
    console.log('   2. If good, rename to hero-desktop.png, hero-tablet.png, hero-mobile.png');
    console.log('   3. Convert: for f in hero-fal-*.jpg; do cwebp -q 85 "$f" -o "${f%.jpg}.webp"; done');
  }
}

main().catch(console.error);
