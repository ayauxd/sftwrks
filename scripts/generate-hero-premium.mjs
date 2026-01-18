#!/usr/bin/env node
/**
 * Premium hero image - "The Guide"
 * Creative direction: The moment of clarity when guidance illuminates the path
 *
 * Run: source .env.local && node scripts/generate-hero-premium.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

// Creative concept: "The Guide" - A lighthouse moment
// The emotional core: That feeling when someone finally helps you see clearly
const PROMPT = `A stunning, emotionally resonant illustration in sophisticated paper-cut diorama style.

CONCEPT - "The Guide":
The scene captures the moment when fog lifts and the path becomes clear. A warm, elegant lighthouse stands on layered paper cliffs, its beam cutting through stylized mist rendered as delicate paper layers. The light reveals a clear path of stepping stones leading toward a glowing horizon of organized, geometric cityscape suggesting possibility and success.

COMPOSITION:
- Left third: Layered paper fog/mist in soft grays and blues, suggesting past confusion
- Center: An elegant art-deco lighthouse with a warm amber core and cyan outer glow, the beam sweeping right
- Right third: The revealed path - clean geometric stepping stones leading to an abstract city of interconnected, glowing structures
- Foreground: Two small silhouette figures on the path, one slightly ahead gesturing forward, guiding the other
- Sky: Gradient from deep navy (#0A1628) on left to warmer navy with hints of dawn amber on right

STYLE REQUIREMENTS:
- Premium paper-cut diorama aesthetic with visible layers and dimensional shadows
- Each element should feel like precision-cut card stock with depth between layers
- Sophisticated color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan (#00D4FF), warm amber/gold accents in the lighthouse glow
- Cinematic lighting - the lighthouse beam should feel warm and hopeful
- Abstract and elegant - no realistic details, everything stylized
- The overall mood should feel like relief, hope, and trust

TECHNICAL:
- 16:9 aspect ratio, landscape
- Ultra high detail on paper textures and layer edges
- Dramatic but warm lighting
- Sharp focus throughout

AVOID: Cold/sterile feeling, harsh reds, chaotic elements, realistic faces, text, logos, overly complex busy composition. The image should breathe.`;

async function generate() {
  console.log('🎨 Generating premium hero image: "The Guide"');
  console.log('   Using Imagen 4 Ultra for highest quality...\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: PROMPT }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          personGeneration: 'allow_adult',
          outputOptions: { mimeType: 'image/png' }
        }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error('Error:', data.error.message);
    process.exit(1);
  }

  if (!data.predictions || !data.predictions[0]?.bytesBase64Encoded) {
    console.error('No image generated');
    process.exit(1);
  }

  const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  const outputPath = path.join(process.cwd(), 'public/assets/hero/hero-friendly.png');

  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  console.log('\n   Concept: "The Guide" - A lighthouse illuminating the path forward');
}

generate().catch(console.error);
