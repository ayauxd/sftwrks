#!/usr/bin/env node
/**
 * Generate final team section image
 * Paper-cut command center with Softworks logo on central display
 *
 * Run: source .env.local && node scripts/generate-team-final.mjs
 */

import { GoogleGenAI } from '@google/genai';
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
  console.log('Generating team command center image...');

  // Read the Softworks logo for reference
  const logoPath = path.join(rootDir, 'public/assets/logos/softworks-icon-3d-master.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');

  // Read challenge image for paper-cut style reference
  const challengePath = path.join(rootDir, 'public/assets/sections/challenge-noir.png');
  const challengeBuffer = fs.readFileSync(challengePath);
  const challengeBase64 = challengeBuffer.toString('base64');

  const prompt = `Create a premium paper-cut style illustration of a futuristic command center.

EXACT STYLE (match the first reference image):
- Elegant paper-cut layered aesthetic with distinct depth
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accents (#00D4FF)
- Clean, refined human silhouettes - professional, elegant shapes
- Dramatic lighting with film noir mood
- Ultra-wide 21:9 aspect ratio

THE SCENE:
A modern command center with a large curved display screen in the center.

CENTRAL DISPLAY:
The curved screen shows the Softworks logo (from second reference) - a 3D interconnected cube structure forming an "S" shape. The logo should be rendered as a glowing cyan network visualization - nodes and connection lines forming the distinctive S-curve cube pattern. Data streams and connection lines flow from the display downward.

HUMAN FIGURES:
Two elegant paper-cut human silhouettes (one male, one female) standing at workstations on either side:
- Clean geometric shapes, professional business attire silhouettes
- Refined poses - engaged with their screens
- Small cyan orbs floating near them (AI assistants)
- Each has a desk/workstation with monitors

ENVIRONMENT:
- Multiple smaller displays on the sides showing data/charts
- Cyan data cables/lines connecting workstations to central display
- Layered paper-cut architectural elements (walls, ceiling beams)
- Subtle office equipment shapes in paper-cut style

PAPER-CUT LAYERS:
- Background: Deep navy office architecture
- Mid-ground: The large curved display with Softworks logo
- Foreground: Human figures and workstations with sharp edges

The Softworks logo MUST be clearly visible as the focal point - the interconnected cube "S" rendered as glowing nodes and lines.

Premium illustration quality. NO text, NO realistic faces.`;

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
          console.log(`✓ Saved: ${outputPath}`);
          return true;
        }
      }
    }
    console.error('No image returned');
    return false;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

generateTeamImage().catch(console.error);
