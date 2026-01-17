#!/usr/bin/env node
/**
 * Generate all logo assets from new 3D cube logo
 * Run: node scripts/generate-new-logo-assets.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const logosDir = path.join(rootDir, 'public/assets/logos');
const sourceImage = path.join(logosDir, 'source/new-logo-master.jpg');

// Brand colors
const NAVY = '#0F172A';
const CYAN = '#00D4FF';
const WHITE = '#FFFFFF';
const SLATE_100 = '#F1F5F9';

async function generateAssets() {
  console.log('Starting logo asset generation...\n');

  // Load and analyze source image
  const sourceMeta = await sharp(sourceImage).metadata();
  console.log(`Source image: ${sourceMeta.width}x${sourceMeta.height}`);

  // Step 1: Remove gray background (threshold extraction)
  // The background is light gray (~#E8E8E8), we'll make it transparent
  console.log('\n1. Processing source image (removing background)...');

  const processedLogo = await sharp(sourceImage)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = processedLogo;
  const threshold = 220; // Pixels lighter than this become transparent

  // Process pixels - remove light gray background
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If pixel is very light (close to white/gray background)
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0; // Make transparent
    }
  }

  const transparentLogo = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png().toBuffer();

  // Save full transparent logo
  await sharp(transparentLogo)
    .toFile(path.join(logosDir, 'softworks-logo-full-transparent.png'));
  console.log('  Saved: softworks-logo-full-transparent.png');

  // Step 2: Extract cube icon (left ~40% of image for favicons)
  console.log('\n2. Extracting cube icon for favicons...');

  const cubeWidth = Math.round(info.width * 0.38); // Left portion with cube
  const cubeIcon = await sharp(transparentLogo)
    .extract({ left: 0, top: 0, width: cubeWidth, height: info.height })
    .trim() // Remove transparent edges
    .toBuffer();

  const cubeMeta = await sharp(cubeIcon).metadata();
  console.log(`  Cube icon extracted: ${cubeMeta.width}x${cubeMeta.height}`);

  // Make cube icon square by adding padding
  const maxDim = Math.max(cubeMeta.width, cubeMeta.height);
  const squareCube = await sharp(cubeIcon)
    .extend({
      top: Math.round((maxDim - cubeMeta.height) / 2),
      bottom: Math.round((maxDim - cubeMeta.height) / 2),
      left: Math.round((maxDim - cubeMeta.width) / 2),
      right: Math.round((maxDim - cubeMeta.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // Step 3: Generate favicon sizes (cube only)
  console.log('\n3. Generating favicons (cube icon)...');

  const faviconSizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];

  for (const size of faviconSizes) {
    await sharp(squareCube)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(logosDir, `favicon-${size}.png`));
    console.log(`  Saved: favicon-${size}.png`);
  }

  // Special favicon files
  await sharp(squareCube)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'favicon-16x16.png'));

  await sharp(squareCube)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'favicon-32x32.png'));

  await sharp(squareCube)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'favicon-48x48.png'));

  await sharp(squareCube)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'apple-touch-icon-180.png'));

  // Also copy to root public directory
  await sharp(squareCube)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public/apple-touch-icon.png'));
  console.log('  Saved: apple-touch-icon.png (root public)');

  await sharp(squareCube)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'android-chrome-192x192.png'));

  await sharp(squareCube)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public/android-chrome-192x192.png'));

  await sharp(squareCube)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'android-chrome-512x512.png'));

  await sharp(squareCube)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public/android-chrome-512x512.png'));

  // Save the master 3D icon
  await sharp(squareCube)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'softworks-icon-3d-master.png'));
  console.log('  Saved: softworks-icon-3d-master.png');

  // Step 4: Generate ICO file (multi-resolution)
  console.log('\n4. Generating favicon.ico...');

  // Create PNG for ico conversion (32x32 for broad compatibility)
  await sharp(squareCube)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'favicon-ico-source.png'));

  // For ICO, we'll just use the 32x32 PNG and rename (browsers accept PNG favicons)
  await sharp(squareCube)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public/favicon.png'));
  console.log('  Saved: favicon.png (root public)');

  // Step 5: Generate OG/Social Cards
  console.log('\n5. Generating social cards...');

  // OG Preview (1200x630)
  const OG_WIDTH = 1200;
  const OG_HEIGHT = 630;

  // Load full logo for OG card
  const logoForOG = await sharp(transparentLogo)
    .resize(null, 420, { fit: 'inside' })
    .toBuffer();

  const logoOGMeta = await sharp(logoForOG).metadata();

  const ogSvg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${WHITE};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${SLATE_100};stop-opacity:1" />
        </linearGradient>
        <style>
          .slogan { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 28px; fill: ${CYAN}; }
          .url { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 600; font-size: 24px; fill: #1E3A5F; }
        </style>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E3A5F" stroke-opacity="0.06" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <text x="${OG_WIDTH - 60}" y="560" class="slogan" text-anchor="end">AI that works for your business.</text>
      <text x="${OG_WIDTH - 60}" y="600" class="url" text-anchor="end">www.sftwrks.com</text>
    </svg>
  `;

  await sharp({
    create: { width: OG_WIDTH, height: OG_HEIGHT, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: Buffer.from(ogSvg), top: 0, left: 0 },
      { input: logoForOG, top: Math.round((OG_HEIGHT - logoOGMeta.height) / 2), left: 60 }
    ])
    .png()
    .toFile(path.join(logosDir, 'og-preview-landscape.png'));
  console.log('  Saved: og-preview-landscape.png');

  // Twitter Card (1200x600)
  const TW_WIDTH = 1200;
  const TW_HEIGHT = 600;

  const logoForTW = await sharp(transparentLogo)
    .resize(null, 400, { fit: 'inside' })
    .toBuffer();

  const logoTWMeta = await sharp(logoForTW).metadata();

  const twSvg = `
    <svg width="${TW_WIDTH}" height="${TW_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${WHITE};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${SLATE_100};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad2)"/>
    </svg>
  `;

  await sharp({
    create: { width: TW_WIDTH, height: TW_HEIGHT, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: Buffer.from(twSvg), top: 0, left: 0 },
      { input: logoForTW, top: Math.round((TW_HEIGHT - logoTWMeta.height) / 2), left: Math.round((TW_WIDTH - logoTWMeta.width) / 2) }
    ])
    .png()
    .toFile(path.join(logosDir, 'twitter-card.png'));
  console.log('  Saved: twitter-card.png');

  // Step 6: Document/Invoice variants
  console.log('\n6. Generating document variants...');

  // Horizontal logo with transparent background (for light backgrounds)
  await sharp(transparentLogo)
    .resize(2048, null, { fit: 'inside' })
    .png()
    .toFile(path.join(logosDir, 'logo-horizontal-light.png'));
  console.log('  Saved: logo-horizontal-light.png');

  // Square icon only (1024x1024)
  await sharp(squareCube)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'logo-icon-only.png'));
  console.log('  Saved: logo-icon-only.png');

  // Also update legacy names for compatibility
  await sharp(squareCube)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'softworks-icon-512.png'));

  await sharp(squareCube)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'softworks-icon-256.png'));

  await sharp(squareCube)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'softworks-icon-128.png'));

  await sharp(squareCube)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(logosDir, 'softworks-icon-64.png'));

  console.log('\n=== Logo Asset Generation Complete ===');
  console.log(`\nGenerated assets in: ${logosDir}`);
  console.log('\nNext steps:');
  console.log('1. Review generated assets');
  console.log('2. Update index.html meta tags if needed');
  console.log('3. Run: npm run build && npm run preview');
}

generateAssets().catch(console.error);
