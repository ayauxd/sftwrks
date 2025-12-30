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

  // Load and resize logo - larger for better visibility
  const logo = await sharp(logoPath)
    .resize(340, 340, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create a subtle glow effect behind the logo
  const glowSvg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${CYAN};stop-opacity:0.3" />
          <stop offset="70%" style="stop-color:${CYAN};stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:${CYAN};stop-opacity:0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#glow)"/>
    </svg>
  `;

  // Create SVG text overlay
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${NAVY_DARK};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${NAVY_MID};stop-opacity:1" />
        </linearGradient>
        <style>
          .title { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 700; font-size: 72px; fill: white; }
          .slogan { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 32px; fill: ${CYAN}; }
          .url { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 600; font-size: 28px; fill: #94A3B8; }
          .legal { font-family: 'Inter', 'Segoe UI', sans-serif; font-weight: 400; font-size: 16px; fill: #64748B; }
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
      <text x="500" y="240" class="title">Softworks</text>
      <text x="500" y="300" class="slogan">AI that works for your business.</text>
      <text x="500" y="380" class="url">www.sftwrks.com</text>
      <text x="500" y="420" class="legal">Softworks Trading Co.</text>
    </svg>
  `;

  const glowBuffer = await sharp(Buffer.from(glowSvg))
    .resize(400, 400)
    .toBuffer();

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
      // Glow effect behind logo
      {
        input: glowBuffer,
        top: 115,
        left: 40
      },
      // Logo on left - centered vertically
      {
        input: logo,
        top: 145,
        left: 70
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
