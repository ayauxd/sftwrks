#!/usr/bin/env node
/**
 * Aggressively compress images for web performance
 * Converts PNG to WebP and resizes to reasonable dimensions
 *
 * Run: node scripts/compress-images.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Check for required tools
function checkDependencies() {
  try {
    execSync('which cwebp', { stdio: 'ignore' });
    execSync('which sips', { stdio: 'ignore' });
    return true;
  } catch {
    console.error('Missing dependencies. Install with: brew install webp');
    return false;
  }
}

// Get image dimensions using sips (macOS)
function getImageDimensions(filePath) {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: 'utf8' });
    const width = parseInt(output.match(/pixelWidth: (\d+)/)?.[1] || '0');
    const height = parseInt(output.match(/pixelHeight: (\d+)/)?.[1] || '0');
    return { width, height };
  } catch {
    return { width: 0, height: 0 };
  }
}

// Resize image if too large
function resizeImage(filePath, maxWidth) {
  const { width } = getImageDimensions(filePath);
  if (width > maxWidth) {
    console.log(`    Resizing from ${width}px to ${maxWidth}px...`);
    execSync(`sips --resampleWidth ${maxWidth} "${filePath}"`, { stdio: 'ignore' });
    return true;
  }
  return false;
}

// Convert to WebP with quality setting
function convertToWebP(pngPath, quality = 80) {
  const webpPath = pngPath.replace('.png', '.webp');
  try {
    execSync(`cwebp -q ${quality} "${pngPath}" -o "${webpPath}"`, { stdio: 'ignore' });
    return webpPath;
  } catch (error) {
    console.error(`    Failed to convert: ${error.message}`);
    return null;
  }
}

// Get file size in KB
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024);
  } catch {
    return 0;
  }
}

// Process a directory of images
function processDirectory(dirPath, maxWidth, quality, targetKB = 200) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.png') && !f.includes('backup'));

  console.log(`\n${dirPath}:`);

  let totalSaved = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const originalSize = getFileSize(filePath);

    // Skip already small files
    if (originalSize < targetKB) {
      console.log(`  ✓ ${file}: ${originalSize}KB (already optimized)`);
      continue;
    }

    process.stdout.write(`  Processing ${file} (${originalSize}KB)...`);

    // Resize if needed
    resizeImage(filePath, maxWidth);

    // Convert to WebP
    const webpPath = convertToWebP(filePath, quality);

    if (webpPath) {
      const newSize = getFileSize(webpPath);
      const saved = originalSize - newSize;
      totalSaved += saved;

      if (newSize > targetKB && quality > 60) {
        // Try more aggressive compression
        execSync(`cwebp -q 60 "${filePath}" -o "${webpPath}"`, { stdio: 'ignore' });
        const aggressiveSize = getFileSize(webpPath);
        console.log(` → ${aggressiveSize}KB (aggressive)`);
      } else {
        console.log(` → ${newSize}KB (-${Math.round(saved/originalSize*100)}%)`);
      }
    } else {
      console.log(' FAILED');
    }
  }

  return totalSaved;
}

async function main() {
  console.log('='.repeat(60));
  console.log('AGGRESSIVE IMAGE COMPRESSION');
  console.log('='.repeat(60));

  if (!checkDependencies()) {
    process.exit(1);
  }

  let totalSaved = 0;

  // Journal images - max 1200px width, quality 75
  totalSaved += processDirectory(
    path.join(process.cwd(), 'public/assets/journal'),
    1200, 75, 150
  );

  // Section images - max 1400px width, quality 80
  totalSaved += processDirectory(
    path.join(process.cwd(), 'public/assets/sections'),
    1400, 80, 200
  );

  // Case study images - max 1200px width, quality 80
  totalSaved += processDirectory(
    path.join(process.cwd(), 'public/assets/case-studies'),
    1200, 80, 150
  );

  // Team images - max 1400px width, quality 80
  totalSaved += processDirectory(
    path.join(process.cwd(), 'public/assets/team'),
    1400, 80, 200
  );

  console.log('\n' + '='.repeat(60));
  console.log(`TOTAL SAVED: ${Math.round(totalSaved / 1024)}MB`);
  console.log('='.repeat(60));

  console.log('\n📌 Next: Update components to use WebP with PNG fallback');
}

main().catch(console.error);
