#!/usr/bin/env node
/**
 * Optimize images for web performance
 * - Compress PNGs
 * - Resize oversized images
 * - Target: <100KB for most images, <200KB max
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Max dimensions for different image types
const MAX_DIMENSIONS = {
  'og-preview': { width: 1200, height: 630 },
  'journal': { width: 1200, height: 800 },
  'sections': { width: 1400, height: 900 },
  'team': { width: 1400, height: 700 },
  'case-studies': { width: 1200, height: 800 },
  'logos': { width: 600, height: 600 },
  'default': { width: 1200, height: 800 }
};

// Target file sizes (bytes)
const TARGET_SIZES = {
  'og-preview': 150 * 1024,  // 150KB for OG
  'journal': 100 * 1024,     // 100KB
  'sections': 150 * 1024,    // 150KB
  'team': 150 * 1024,        // 150KB
  'case-studies': 120 * 1024, // 120KB
  'logos': 50 * 1024,        // 50KB
  'default': 100 * 1024
};

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const originalSize = stats.size;
  const fileName = path.basename(filePath);
  const dirName = path.basename(path.dirname(filePath));

  // Skip if already small
  if (originalSize < 50 * 1024) {
    console.log(`  Skip ${fileName} (${Math.round(originalSize/1024)}KB - already small)`);
    return { skipped: true };
  }

  // Determine category
  let category = 'default';
  if (fileName.includes('og-preview')) category = 'og-preview';
  else if (dirName === 'journal') category = 'journal';
  else if (dirName === 'sections') category = 'sections';
  else if (dirName === 'team') category = 'team';
  else if (dirName === 'case-studies') category = 'case-studies';
  else if (dirName === 'logos') category = 'logos';

  const maxDim = MAX_DIMENSIONS[category];
  const targetSize = TARGET_SIZES[category];

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Calculate resize if needed
    let resizeOptions = null;
    if (metadata.width > maxDim.width || metadata.height > maxDim.height) {
      resizeOptions = {
        width: maxDim.width,
        height: maxDim.height,
        fit: 'inside',
        withoutEnlargement: true
      };
    }

    // Start with quality 85, reduce if needed
    let quality = 85;
    let outputBuffer;
    let attempts = 0;

    do {
      let pipeline = sharp(filePath);

      if (resizeOptions) {
        pipeline = pipeline.resize(resizeOptions);
      }

      outputBuffer = await pipeline
        .png({
          quality,
          compressionLevel: 9,
          palette: metadata.width < 512 // Use palette for small images
        })
        .toBuffer();

      quality -= 10;
      attempts++;
    } while (outputBuffer.length > targetSize && quality > 40 && attempts < 5);

    // Only save if we achieved meaningful reduction
    if (outputBuffer.length < originalSize * 0.9) {
      fs.writeFileSync(filePath, outputBuffer);
      const savings = Math.round((1 - outputBuffer.length / originalSize) * 100);
      console.log(`  ✓ ${fileName}: ${Math.round(originalSize/1024)}KB → ${Math.round(outputBuffer.length/1024)}KB (-${savings}%)`);
      return { optimized: true, saved: originalSize - outputBuffer.length };
    } else {
      console.log(`  ~ ${fileName}: Already optimized (${Math.round(originalSize/1024)}KB)`);
      return { optimized: false };
    }

  } catch (error) {
    console.log(`  ✗ ${fileName}: Error - ${error.message}`);
    return { error: true };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Optimizing images for web performance');
  console.log('='.repeat(60));

  const imageDirs = [
    'public/assets/logos',
    'public/assets/sections',
    'public/assets/team',
    'public/assets/journal',
    'public/assets/case-studies'
  ];

  let totalSaved = 0;
  let filesOptimized = 0;

  for (const dir of imageDirs) {
    const fullDir = path.join(rootDir, dir);
    if (!fs.existsSync(fullDir)) continue;

    console.log(`\n${dir}:`);
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.png'));

    for (const file of files) {
      // Skip backup directories
      if (file.includes('backup')) continue;

      const filePath = path.join(fullDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) continue;

      const result = await optimizeImage(filePath);
      if (result.optimized) {
        filesOptimized++;
        totalSaved += result.saved || 0;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Done! ${filesOptimized} files optimized`);
  console.log(`Total saved: ${Math.round(totalSaved / 1024)}KB`);
  console.log('='.repeat(60));
}

main().catch(console.error);
