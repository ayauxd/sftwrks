#!/usr/bin/env node
/**
 * Generate team section image with proper paper-cut style
 * Matching the aesthetic of challenge-noir.png
 *
 * Run: source .env.local && node scripts/generate-team-image.mjs
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

async function generateTeamImage() {
  console.log('Generating team image with paper-cut style...');

  // Read the challenge image as reference for style
  const challengePath = path.join(rootDir, 'public/assets/sections/challenge-noir.png');
  const challengeBuffer = fs.readFileSync(challengePath);
  const challengeBase64 = challengeBuffer.toString('base64');

  // Read the Softworks logo for reference
  const logoPath = path.join(rootDir, 'public/assets/logos/softworks-icon-3d-master.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');

  const prompt = `Create a cinematic illustration in the EXACT same paper-cut layered style as the reference image.

CRITICAL STYLE REQUIREMENTS (match the reference exactly):
- Paper-cut/layered aesthetic with distinct depth layers
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accents (#00D4FF)
- Elegant, refined human silhouettes - NOT rough or sloppy
- Human figures should be clean geometric paper-cut shapes with professional poses
- Dramatic diagonal lighting from upper left
- Film noir mood with sophisticated atmosphere
- High production quality, premium illustration feel

SCENE - "Human expertise, amplified by AI" (21:9 ultra-wide aspect ratio):

CENTER: A large holographic display showing the Softworks logo (the 3D interconnected cube "S" from the second reference image) glowing with cyan energy.

AROUND THE CENTER: 4-5 professional human figures in elegant paper-cut style:
- Each figure at a workstation with screens
- Figures should be refined silhouettes like in the reference - clean geometric shapes suggesting business professionals
- Some standing, some seated, all engaged with their work
- Small cyan glowing orbs near each person (AI assistants)
- Thin cyan data lines connecting workstations to the central display

PAPER-CUT LAYERS:
- Background: Deep navy with subtle architectural elements (modern office)
- Mid-ground: The central holographic display with Softworks logo
- Foreground: The team figures and workstations with sharp geometric edges

The human figures must have the SAME refined, elegant quality as the figures crossing the bridge in the reference image - clean paper-cut silhouettes, not rough sketches.

NO text, NO faces (just silhouettes), premium quality illustration.`;

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
                data: challengeBase64
              }
            },
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
          const outputPath = path.join(rootDir, 'public/assets/team/team-workflow-noir.png');
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);

          const meta = await sharp(outputPath).metadata();
          console.log(`✓ Saved: ${outputPath}`);
          console.log(`  Dimensions: ${meta.width}x${meta.height}`);
          return true;
        }
      }
    }
    console.error('No image returned from API');
    return false;
  } catch (error) {
    console.error('API Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Generating team image with refined paper-cut style');
  console.log('Using challenge-noir.png as style reference');
  console.log('='.repeat(60));

  const success = await generateTeamImage();

  console.log('\n' + '='.repeat(60));
  if (success) {
    console.log('Done! Review the image at public/assets/team/team-workflow-noir.png');
  } else {
    console.log('Generation failed. Try again.');
  }
  console.log('='.repeat(60));
}

main().catch(console.error);
