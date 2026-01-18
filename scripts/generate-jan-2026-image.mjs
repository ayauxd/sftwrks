#!/usr/bin/env node
/**
 * Generate January 2026 article image - Stripe incident
 * Run: source .env.local && node scripts/generate-jan-2026-image.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

const NOIR_STYLE = `Create a sophisticated, minimal illustration in a premium paper-cut diorama style.
STYLE: Paper-cut layered effect with visible depth. Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan glow (#00D4FF). Cinematic noir lighting. Abstract and symbolic. NO text, NO realistic faces. Professional mood.`;

const PROMPT = `${NOIR_STYLE}

CONCEPT - "The Vanishing Bridge" (Platform Dependency Risk):
A stylized business building (left side) connected to a payment/cloud platform symbol (right side) via a geometric bridge.
The CENTER section of the bridge is dissolving - pixels, nodes, and data fragments falling away into a void below.
A small geometric figure silhouette stands on the business side, looking at the growing gap with concern.
The platform side shows a glowing question mark or lock icon, suggesting inaccessibility.
Paper-cut depth layers: building in foreground, dissolving bridge in midground, platform in background.
Below the gap: scattered fragments suggesting lost data/transactions.
Mood: Fragility of cloud infrastructure, caution, but professional not scary.
4:3 aspect ratio for article card format.`;

async function generate() {
  console.log('Generating January 2026 article image...');
  console.log('Concept: "The Vanishing Bridge" - Platform dependency risk\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: PROMPT }],
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
    console.error('Error:', data.error.message);
    process.exit(1);
  }

  if (!data.predictions?.[0]?.bytesBase64Encoded) {
    console.error('No image generated');
    process.exit(1);
  }

  const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  const outputDir = path.join(process.cwd(), 'public/assets/journal');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'jan-2026.png');
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
}

generate().catch(console.error);
