#!/usr/bin/env node
/**
 * Generate OG social card with 3D logo
 * Run: node scripts/generate-og-card.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Card dimensions (standard OG image)
const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors - Light mode
const WHITE = '#FFFFFF';
const SLATE_100 = '#F1F5F9';
const NAVY = '#0F172A';
const STEEL = '#1E3A5F';
const CYAN = '#0891B2';

async function generateOGCard() {
  console.log('Generating OG social card...');

  const logoPath = path.join(rootDir, 'public/assets/logos/softworks-icon-3d-master.png');
  const outputPath = path.join(rootDir, 'public/assets/logos/og-preview-landscape.png');

  // Load and resize logo - fit within bounds with padding
  const logoMeta = await sharp(logoPath).metadata();
  const maxHeight = 480; // Leave 75px padding top and bottom
  const scaledHeight = Math.min(maxHeight, logoMeta.height);
  const scaledWidth = Math.round((logoMeta.width / logoMeta.height) * scaledHeight);

  const logo = await sharp(logoPath)
    .resize(scaledWidth, scaledHeight, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const logoInfo = await sharp(logo).metadata();
  const logoTop = Math.round((HEIGHT - logoInfo.height) / 2); // Center vertically
  const logoLeft = 60;

  // Create SVG text overlay - white background with dark text
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${WHITE};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${SLATE_100};stop-opacity:1" />
        </linearGradient>
        <style>
          .title { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 700; font-size: 72px; fill: ${NAVY}; }
          .slogan { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 32px; fill: ${CYAN}; }
          .url { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 600; font-size: 28px; fill: ${STEEL}; }
          .legal { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 16px; fill: #64748B; }
        </style>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>

      <!-- Subtle grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${STEEL}" stroke-opacity="0.06" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>

      <!-- Text content (right side) -->
      <text x="500" y="240" class="title">Softworks</text>
      <text x="500" y="300" class="slogan">AI that works for your business.</text>
      <text x="500" y="380" class="url">www.sftwrks.com</text>
      <text x="500" y="420" class="legal">Softworks Trading Co.</text>
    </svg>
  `;

  // Create the card
  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      // Background with text
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0
      },
      // Logo on left - centered vertically
      {
        input: logo,
        top: logoTop,
        left: logoLeft
      }
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ Saved: ${outputPath}`);

  // Get file info
  const info = await sharp(outputPath).metadata();
  console.log(`  Dimensions: ${info.width}x${info.height}`);
}

generateOGCard().catch(console.error);
