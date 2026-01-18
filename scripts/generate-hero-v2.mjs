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

// Premium hero image prompt - sophisticated, authoritative, professional
const HERO_PROMPT = `Create a breathtaking, editorial-quality illustration in a sophisticated paper-cut diorama style with extreme depth and dimensionality.

SCENE: "The Navigator" - A commanding lighthouse on a rocky cliff overlooking a vast ocean at dawn/dusk golden hour. The lighthouse beam cuts through atmospheric fog, illuminating a safe path for distant ships. The scene conveys guidance, expertise, and trustworthy leadership.

COMPOSITION:
- Dramatic perspective from slightly below, looking up at the lighthouse
- Multiple paper-cut depth layers creating 3D parallax effect (at least 5-6 distinct layers)
- Foreground: Rocky cliffs with geometric facets, small wildflowers
- Midground: The lighthouse - elegant, architectural, with warm glowing windows
- Background: Calm ocean with distant ships finding their way, dramatic sky with layered clouds
- Far background: Sunrise/sunset gradient casting warm light across the scene

STYLE:
- Premium paper-cut diorama aesthetic with visible depth shadows between layers
- Sophisticated color palette: Deep navy (#0A1628), warm sunset gold/amber, soft steel blue (#1E3A5F), cyan accent (#00D4FF) on the lighthouse beam
- Soft, diffused lighting as if golden hour is filtering through the layers
- Clean geometric forms with organic flowing edges on natural elements
- No text, no realistic human faces

MOOD: Inspiring, trustworthy, calm confidence. A sense of "we've navigated these waters before."

QUALITY: Ultra-premium editorial illustration suitable for a Fortune 500 consulting firm homepage.

Aspect ratio: 16:9 landscape for hero banner.`;

// Responsive sizes to generate
const SIZES = [
  { name: 'desktop', width: 1920, aspectRatio: '16:9' },
  { name: 'tablet', width: 1024, aspectRatio: '4:3' },
  { name: 'mobile', width: 640, aspectRatio: '3:4' }
];

async function generateImage(size) {
  console.log(`\nGenerating ${size.name} hero image (${size.aspectRatio})...`);

  const prompt = size.name === 'mobile'
    ? HERO_PROMPT.replace('16:9 landscape', '3:4 portrait - focus on lighthouse and cliff')
    : size.name === 'tablet'
      ? HERO_PROMPT.replace('16:9 landscape', '4:3 - balanced composition')
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
