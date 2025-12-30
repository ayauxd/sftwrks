#!/usr/bin/env node
/**
 * Generate Softworks logo in glowing noir style for team image overlay
 * Uses Gemini 3 Pro Image with reference to actual logo
 *
 * Run: source .env.local && node scripts/generate-team-logo-overlay.mjs
 */

import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

async function generateGlowingLogo() {
  console.log('Step 1: Generating Softworks logo in glowing noir style...');

  // Read the original logo as base64 for reference
  const logoPath = path.join(rootDir, 'public/assets/logos/softworks-icon-3d-master.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');

  const prompt = `Look at this reference logo image. Generate a NEW image that is:

1. The EXACT same logo design - the 3D interconnected cube structure forming an "S" shape with connected blocks
2. Style it as a GLOWING HOLOGRAPHIC version:
   - Background: completely transparent or very dark navy (#0A1628)
   - The cube blocks should glow with cyan (#00D4FF) energy
   - Add a bright cyan aura/glow emanating from the logo
   - Keep the S-curve shape made of interconnected cubes
   - Make it look like it's displayed on a futuristic holographic screen
   - Particles or energy lines radiating outward

Output: Square image (1:1 ratio) with the glowing logo centered.
The style should match a high-tech noir aesthetic - dark background with bright cyan glow.
Do NOT change the fundamental logo shape - keep it as the interconnected cube "S".`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/png',
                data: logoBase64
              }
            }
          ]
        }
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    });

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          const outputPath = path.join(rootDir, 'public/assets/team/logo-glow-overlay.png');
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);
          console.log(`  ✓ Saved glowing logo: ${outputPath}`);
          return outputPath;
        }
      }
    }
    console.error('No image returned from API');
    return null;
  } catch (error) {
    console.error('API Error:', error.message);
    return null;
  }
}

async function compositeOntoTeamImage(glowLogoPath) {
  if (!glowLogoPath) {
    console.log('Skipping composite - no logo generated');
    return;
  }

  console.log('\nStep 2: Compositing logo onto team image...');

  const teamImagePath = path.join(rootDir, 'public/assets/team/team-workflow-noir.png');
  const outputPath = path.join(rootDir, 'public/assets/team/team-workflow-noir-updated.png');

  // Get team image dimensions
  const teamMeta = await sharp(teamImagePath).metadata();
  console.log(`  Team image: ${teamMeta.width}x${teamMeta.height}`);

  // The "S" logo in the original is roughly centered, about 200-250px wide
  // Position: roughly center of image, slightly left
  const logoSize = 220;
  const logoX = Math.floor(teamMeta.width * 0.38 - logoSize / 2); // ~38% from left
  const logoY = Math.floor(teamMeta.height * 0.35 - logoSize / 2); // ~35% from top

  // Resize the glowing logo
  const resizedLogo = await sharp(glowLogoPath)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Composite
  await sharp(teamImagePath)
    .composite([
      {
        input: resizedLogo,
        top: logoY,
        left: logoX,
        blend: 'over'
      }
    ])
    .toFile(outputPath);

  console.log(`  ✓ Saved composite: ${outputPath}`);

  // Show both for comparison
  console.log('\nGenerated files:');
  console.log('  - public/assets/team/logo-glow-overlay.png (the logo alone)');
  console.log('  - public/assets/team/team-workflow-noir-updated.png (composite)');
  console.log('\nReview these before replacing the original.');
}

async function main() {
  console.log('='.repeat(60));
  console.log('Generating Softworks logo overlay for team image');
  console.log('='.repeat(60));

  const logoPath = await generateGlowingLogo();
  await compositeOntoTeamImage(logoPath);

  console.log('\n' + '='.repeat(60));
  console.log('Done!');
  console.log('='.repeat(60));
}

main().catch(console.error);
