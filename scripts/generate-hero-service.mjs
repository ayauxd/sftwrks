#!/usr/bin/env node
/**
 * Generate new hero image - "Service & Support"
 * Reflects the consultancy's hands-on guidance approach
 * Optimized for parallax scrolling effect
 *
 * Run: source .env.local && node scripts/generate-hero-service.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

// Creative concept: Expert hands guiding through AI transformation
const PROMPT = `Create a stunning, emotionally resonant hero illustration in premium paper-cut diorama style.

CONCEPT - "Expert Guidance Through AI Transformation":
The scene shows the journey from AI confusion to clarity, with expert guidance as the central theme.

COMPOSITION (16:9 landscape, layered for parallax):
- BACKGROUND LAYER: A vast, abstract digital landscape - interconnected nodes and data streams in deep navy (#0A1628), suggesting the complex AI ecosystem. Subtle grid patterns fading into distance.

- MID LAYER: A clear, illuminated pathway made of geometric stepping stones, each stone glowing with soft cyan (#00D4FF) edges. The path bridges from chaos (left) to organized success (right).

- FOREGROUND LAYER: Two silhouetted figures in elegant geometric style - one slightly ahead, reaching back to guide the other. They walk the illuminated path together. A subtle glow surrounds them suggesting partnership and trust.

- ACCENT ELEMENTS: Floating geometric shapes transitioning from scattered/confused on the left to organized/connected on the right. Small lighthouse beacons along the path.

STYLE REQUIREMENTS:
- Premium paper-cut diorama aesthetic with distinct visible layers
- Each layer should have depth and shadow separation (important for parallax)
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accents (#00D4FF), warm amber highlights on the figures
- Cinematic lighting - light emanating from the organized side, casting long shadows
- Abstract and sophisticated - no realistic faces, all figures are elegant silhouettes
- The mood should evoke: trust, partnership, expertise, hope, clarity
- Clean negative space on the left third for text overlay

TECHNICAL:
- 16:9 aspect ratio (1920x1080 target)
- High detail on layer edges and textures
- Distinct foreground/mid/background separation for parallax effect
- The left side should be slightly darker/hazier for text readability

AVOID: Cold sterile feeling, harsh reds, overly complex busy composition, realistic faces, text, logos. The image should breathe and feel premium.`;

async function generate() {
  console.log('═══════════════════════════════════════');
  console.log('  Hero Image Generation');
  console.log('  Concept: "Service & Support"');
  console.log('  Using Imagen 4 Ultra');
  console.log('═══════════════════════════════════════\n');

  try {
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
      console.error('✗ Error:', data.error.message);
      process.exit(1);
    }

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      console.error('✗ No image generated');
      console.log('Response:', JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');

    // Save as the new hero desktop image
    const outputDir = path.join(process.cwd(), 'public/assets/hero');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'hero-desktop.png');
    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);

    console.log('\n📋 Next steps:');
    console.log('   1. Run: node scripts/optimize-hero-responsive.mjs');
    console.log('   2. Review the image in browser');
    console.log('   3. Deploy when satisfied');

  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

generate();
