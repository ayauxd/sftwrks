#!/usr/bin/env node
/**
 * Create responsive hero images for optimal performance
 * Creates multiple sizes + WebP versions
 *
 * Run: node scripts/optimize-hero-responsive.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const HERO_SIZES = [
  { name: 'hero-mobile', width: 640, quality: 80 },
  { name: 'hero-tablet', width: 1024, quality: 80 },
  { name: 'hero-desktop', width: 1920, quality: 85 },
];

async function optimizeHero() {
  const heroDir = path.join(rootDir, 'public/assets/hero');
  const sourcePath = path.join(heroDir, 'hero-friendly.png');

  if (!fs.existsSync(sourcePath)) {
    console.error('Hero image not found:', sourcePath);
    process.exit(1);
  }

  const stats = fs.statSync(sourcePath);
  console.log(`\nSource: hero-friendly.png (${Math.round(stats.size / 1024)}KB)`);
  console.log('Creating responsive versions...\n');

  for (const size of HERO_SIZES) {
    // PNG version
    const pngPath = path.join(heroDir, `${size.name}.png`);
    await sharp(sourcePath)
      .resize(size.width, null, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: size.quality, compressionLevel: 9 })
      .toFile(pngPath);

    const pngStats = fs.statSync(pngPath);
    console.log(`  ✓ ${size.name}.png (${size.width}w) - ${Math.round(pngStats.size / 1024)}KB`);

    // WebP version (much smaller)
    const webpPath = path.join(heroDir, `${size.name}.webp`);
    await sharp(sourcePath)
      .resize(size.width, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: size.quality })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    console.log(`  ✓ ${size.name}.webp (${size.width}w) - ${Math.round(webpStats.size / 1024)}KB`);
  }

  console.log('\nDone! Update Hero.tsx to use responsive images.');
}

async function optimizeCaseStudies() {
  const caseStudiesDir = path.join(rootDir, 'public/assets/case-studies');
  const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.png'));

  console.log('\nOptimizing case study images...\n');

  for (const file of files) {
    const filePath = path.join(caseStudiesDir, file);
    const stats = fs.statSync(filePath);

    if (stats.size > 200 * 1024) { // Only optimize files > 200KB
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Resize to max 1200px width and compress
      const outputBuffer = await sharp(filePath)
        .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();

      if (outputBuffer.length < stats.size * 0.8) {
        fs.writeFileSync(filePath, outputBuffer);
        console.log(`  ✓ ${file}: ${Math.round(stats.size / 1024)}KB → ${Math.round(outputBuffer.length / 1024)}KB`);
      } else {
        console.log(`  ~ ${file}: Already optimized`);
      }
    } else {
      console.log(`  ~ ${file}: Already small (${Math.round(stats.size / 1024)}KB)`);
    }
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Creating responsive hero images + optimizing case studies');
  console.log('='.repeat(60));

  await optimizeHero();
  await optimizeCaseStudies();

  console.log('\n' + '='.repeat(60));
  console.log('Optimization complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
