#!/usr/bin/env node
/**
 * Generate service card images for Strategy, Governance, Integration
 * Uses Imagen 4 Ultra for highest quality
 *
 * Run: source .env.local && node scripts/generate-service-cards.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

// Style guide for all cards - consistent noir aesthetic
const STYLE_BASE = `Create a sophisticated, minimal illustration in a premium paper-cut diorama style.

STYLE REQUIREMENTS:
- Paper-cut layered effect with visible depth between layers
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan glow (#00D4FF)
- Cinematic noir lighting with dramatic shadows
- Abstract and symbolic - no realistic faces or text
- Professional, elegant, trustworthy mood
- Clean composition with breathing room
- Subtle film grain texture
- 4:3 aspect ratio (card header format)

AVOID: Cluttered composition, bright colors outside palette, realistic faces, text, logos, generic stock imagery.

`;

const CARDS = [
  {
    name: 'strategy-card',
    title: 'Strategy',
    prompt: `${STYLE_BASE}
CONCEPT - "Strategic Vision":
A lighthouse beam cutting through paper-layered fog, illuminating a clear path of stepping stones.
The path leads from scattered, disconnected geometric shapes (representing chaos) toward an organized constellation of connected nodes (representing clarity).
A subtle compass rose or map element in the foreground suggests navigation and planning.
The lighthouse beam should glow with warm cyan, creating hope and direction.
Mood: Clarity emerging from confusion, expert guidance, the "aha" moment of finding direction.`
  },
  {
    name: 'governance-card',
    title: 'Governance',
    prompt: `${STYLE_BASE}
CONCEPT - "Protected Framework":
An elegant shield or protective dome structure made of interconnected geometric panels, glowing with subtle cyan edges.
Inside the shield: organized, safe geometric shapes representing protected business processes.
Outside: subtle storm/chaos elements held at bay by the protective structure.
The shield should feel like precision architecture - elegant guardrails, not prison bars.
Small lock/key iconography integrated subtly into the geometric patterns.
Mood: Security without restriction, elegant protection, trust and safety.`
  },
  {
    name: 'integration-card',
    title: 'Integration',
    prompt: `${STYLE_BASE}
CONCEPT - "Seamless Connection":
Two distinct systems (represented as geometric structures) being bridged by flowing, luminous cyan connection lines.
The connection should feel organic and natural, like puzzle pieces clicking together perfectly.
Show data/workflow flowing smoothly across the bridge - small glowing particles moving between systems.
The structures should have different textures/patterns but harmonize beautifully when connected.
A subtle human hand silhouette guiding one of the connection points suggests the consultancy touch.
Mood: Harmony, seamless integration, the satisfaction of things working together.`
  }
];

async function generateCard(card) {
  console.log(`\n🎨 Generating: ${card.title} card`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: card.prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '4:3',
            personGeneration: 'dont_allow',
            outputOptions: { mimeType: 'image/png' }
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error(`   ✗ Error: ${data.error.message}`);
      return false;
    }

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      console.error(`   ✗ No image generated`);
      return false;
    }

    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
    const outputDir = path.join(process.cwd(), 'public/assets/sections');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${card.name}.png`);
    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`   ✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    return true;

  } catch (error) {
    console.error(`   ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Service Card Image Generation');
  console.log('  Using Imagen 4 Ultra');
  console.log('═══════════════════════════════════════');

  for (const card of CARDS) {
    await generateCard(card);
    // Rate limiting delay
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n✓ Done! Images saved to public/assets/sections/');
}

main().catch(console.error);
