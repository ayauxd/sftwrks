#!/usr/bin/env node
/**
 * Generate premium hero image for Softworks landing page
 * Run: source .env.local && node scripts/generate-hero-v2.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

// Premium hero image prompt - "The Processing Engine" concept
// Inspired by: technical blueprint aesthetic, paper stacks, isometric 3D style
const HERO_PROMPT = `Create a premium 3D isometric illustration with technical blueprint aesthetic.

SCENE: "The Processing Engine" - Information transformation from chaos to clarity.

LEFT SIDE: A towering wall of stacked papers, documents, and file folders in disarray. Overwhelming mass of grayscale papers with subtle cream/tan tones. Papers spilling, overlapping, creating visual weight representing data overload.

CENTER: A sophisticated brain-shaped circuit board or processing mechanism. Clean geometric form with visible circuit traces and connection nodes. The nodes glow with bright cyan (#00D4FF). This is the transformation engine - where complexity becomes understanding.

RIGHT SIDE: Organized output - neat file folders, structured documents, clean data visualization elements. Everything aligned, labeled, purposeful. Connected by thin cyan circuit lines to the center brain.

BACKGROUND:
- Subtle grid pattern like technical blueprint paper
- Light warm gray or off-white base (#F5F5F0)
- Very faint dimension lines and measurement marks for architectural feel

STYLE:
- 3D isometric paper-craft / diorama aesthetic
- Visible depth and soft shadows between layers
- Technical, precise, editorial quality
- Materials should look like actual paper, cardboard, matte surfaces
- NO glossy or plastic look
- NO text, labels, or readable words
- NO human figures or faces

COLOR PALETTE:
- Background: Warm light gray/cream (#F5F5F0)
- Papers: White, cream, light gray variations
- Accent highlights: Bright cyan (#00D4FF) on circuit nodes and connection lines only
- Subtle navy (#0A1628) for shadows and depth

MOOD: Sophisticated, precise, trustworthy. "We process complexity into clarity."

Aspect ratio: 16:9 landscape.`;

// Responsive sizes to generate
const SIZES = [
  { name: 'desktop', width: 1920, aspectRatio: '16:9' },
  { name: 'tablet', width: 1024, aspectRatio: '4:3' },
  { name: 'mobile', width: 640, aspectRatio: '3:4' }
];

async function generateImage(size) {
  console.log(`\nGenerating ${size.name} hero image (${size.aspectRatio})...`);

  const prompt = size.name === 'mobile'
    ? HERO_PROMPT.replace('16:9 landscape', '3:4 portrait - Focus on the center brain/circuit processing mechanism with cyan glowing nodes. Show partial paper stacks on edges. Vertical composition with brain prominent in center.')
    : size.name === 'tablet'
      ? HERO_PROMPT.replace('16:9 landscape', '4:3 - Show the center processing brain and the organized output on right. Reduce the chaotic paper wall on left to just a hint at the edge.')
      : HERO_PROMPT;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: size.aspectRatio,
            personGeneration: 'dont_allow',
            outputOptions: { mimeType: 'image/png' }
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(`  ⚠ API Error: ${data.error.message}`);
      return null;
    }

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      console.log(`  ⚠ No image generated`);
      return null;
    }

    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
    const outputDir = path.join(process.cwd(), 'public/assets/hero');
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `hero-${size.name}.png`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`  ✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    return outputPath;

  } catch (error) {
    console.log(`  ⚠ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🎨 Generating Premium Hero Images');
  console.log('='.repeat(50));

  const results = [];

  for (const size of SIZES) {
    const result = await generateImage(size);
    results.push({ ...size, path: result });
    // Rate limiting
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));

  const success = results.filter(r => r.path);
  const failed = results.filter(r => !r.path);

  console.log(`\n✅ Generated: ${success.length}/${results.length} images`);
  success.forEach(r => console.log(`   - hero-${r.name}.png`));

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}`);
    failed.forEach(r => console.log(`   - ${r.name}`));
  }

  if (success.length > 0) {
    console.log('\n📌 Next steps:');
    console.log('   1. Review images in public/assets/hero/');
    console.log('   2. Run: node scripts/optimize-images.mjs');
    console.log('   3. Convert to WebP if needed');
  }
}

main().catch(console.error);
