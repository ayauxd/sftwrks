#!/usr/bin/env node
/**
 * Generate images for thought leadership articles
 * Run: source .env.local && node scripts/generate-thought-leadership-images.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

const NOIR_STYLE = `Create a sophisticated illustration in premium paper-cut diorama style.
STYLE: Paper-cut layered effect with visible depth. Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan glow (#00D4FF). Cinematic noir lighting. Abstract and symbolic. NO text, NO realistic faces. Professional mood. 4:3 aspect ratio.`;

const ARTICLES = [
  {
    name: 'latency-tax',
    title: 'The Latency Tax',
    prompt: `${NOIR_STYLE}

CONCEPT - "The 400ms Threshold" (Speed vs Intelligence):
A split-scene showing two AI assistants represented as geometric brain-like structures.
LEFT SIDE: A large, complex, glowing brain structure - but surrounded by an hourglass draining slowly, sand piling up. A small figure waits impatiently, tapping foot.
RIGHT SIDE: A smaller, simpler brain structure - but lightning-fast, with speed lines and instant response arrows. The same figure is already moving forward.
The message: smaller + faster beats bigger + slower.
Paper-cut depth layers create the split scene effect.
Mood: The frustration of waiting vs the satisfaction of instant response.`
  },
  {
    name: 'context-window',
    title: 'Context Window Is Not a Database',
    prompt: `${NOIR_STYLE}

CONCEPT - "Lost in the Middle" (RAG/Memory Problem):
A long horizontal document/scroll stretching across the image.
The BEGINNING and END of the scroll glow brightly with cyan highlights - information visible and accessible.
The MIDDLE section is dark, faded, buried - showing lost/ignored information.
A small spotlight/magnifying glass searches the middle but finds nothing.
Above: a brain/AI icon looking confused, missing the buried information.
Paper-cut layers: documents in foreground, brain mid-ground, darkness background.
Mood: The danger of information overload, precision over comprehensiveness.`
  },
  {
    name: 'chief-ai-officer',
    title: 'The Chief AI Officer Won\'t Exist',
    prompt: `${NOIR_STYLE}

CONCEPT - "AI as Capability Layer, Not Department":
CENTER: An org chart structure with traditional department boxes.
One box labeled (abstractly) as "AI Dept" is fading/dissolving.
FROM that dissolving box: cyan tendrils/streams flowing OUT to connect with ALL other department boxes.
Each department box now has a small AI glow integrated into it - AI embedded everywhere.
The message: AI shouldn't be centralized, it should be distributed.
Paper-cut depth: org chart foreground, flowing connections midground, dark background.
Mood: Transformation, distribution of capability, evolution not revolution.`
  }
];

async function generateImage(article) {
  console.log(`\nGenerating: ${article.title}`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: article.prompt }],
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
    const outputDir = path.join(process.cwd(), 'public/assets/journal');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${article.name}.png`);
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
  console.log('  Thought Leadership Article Images');
  console.log('═══════════════════════════════════════');

  for (const article of ARTICLES) {
    await generateImage(article);
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n✓ Done!');
}

main().catch(console.error);
