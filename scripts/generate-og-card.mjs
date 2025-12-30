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

// Brand colors
const NAVY_DARK = '#0A1628';
const NAVY_MID = '#0F172A';
const CYAN = '#00D4FF';

async function generateOGCard() {
  console.log('Generating OG social card...');

  const logoPath = path.join(rootDir, 'public/assets/logos/softworks-icon-3d-master.png');
  const outputPath = path.join(rootDir, 'public/assets/logos/og-preview-landscape.png');

  // Load and resize logo
  const logo = await sharp(logoPath)
    .resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create SVG text overlay
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${NAVY_DARK};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${NAVY_MID};stop-opacity:1" />
        </linearGradient>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
          .title { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 700; font-size: 72px; fill: white; }
          .slogan { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 32px; fill: ${CYAN}; }
          .url { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 24px; fill: #64748B; }
        </style>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>

      <!-- Subtle grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${CYAN}" stroke-opacity="0.05" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>

      <!-- Text content (right side) -->
      <text x="480" y="260" class="title">Softworks</text>
      <text x="480" y="320" class="slogan">AI that works for your business.</text>
      <text x="480" y="420" class="url">sftwrks.com</text>
    </svg>
  `;

  // Create the card
  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 10, g: 22, b: 40, alpha: 1 }
    }
  })
    .composite([
      // Background with text
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0
      },
      // Logo on left
      {
        input: logo,
        top: 175,
        left: 100
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
