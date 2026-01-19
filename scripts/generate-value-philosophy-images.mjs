#!/usr/bin/env node
/**
 * Generate value philosophy section images using Gemini AI
 * Run: cd /Users/fredpro/sftwrks && source .env.local && node scripts/generate-value-philosophy-images.mjs
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Base style tokens matching hero image
const BASE_STYLE = `Papercut art style, layered paper cutout effect, noir color palette with
deep navy blue (#0A1628) background, cyan accent highlights (#00D4FF),
geometric abstract shapes, dramatic side lighting casting soft shadows,
minimalist corporate illustration, depth through layered planes,
clean edges, sophisticated business aesthetic.

CRITICAL REQUIREMENTS:
- NO text, NO words, NO letters
- NO realistic faces - only abstract geometric silhouettes
- Paper-cut layered depth effect
- Deep navy (#0A1628) as primary background
- Cyan (#00D4FF) as accent highlight color
- 16:9 aspect ratio (1920x1080)
- Professional, modern, sophisticated mood

`;

const IMAGES = [
  {
    name: 'discover-constraint',
    outputDir: 'public/assets/value-philosophy',
    prompt: `${BASE_STYLE}
SPECIFIC VISUAL - "Discover the Constraint":
A business professional figure (abstract geometric silhouette) holding a magnifying glass
examining a complex machine or workflow diagram made of geometric shapes. Layered paper cutout effect
with deep navy (#0A1628) background. The magnifying glass reveals a glowing cyan (#00D4FF) node
representing the hidden constraint/bottleneck. Geometric abstract shapes suggest interconnected systems.
The figure appears thoughtful, analytical. Paper-cut layers create depth - foreground elements sharp,
background softer. Dramatic side lighting from the left.
Mood: Investigative, focused, discovering the real problem beneath the surface.`
  },
  {
    name: 'calculate-value',
    outputDir: 'public/assets/value-philosophy',
    prompt: `${BASE_STYLE}
SPECIFIC VISUAL - "Calculate the Value":
Two business figures (abstract geometric silhouettes) at a table with a transparent calculator
or dashboard floating between them. The dashboard shows ascending bar charts and numbers
glowing in cyan (#00D4FF). Deep navy (#0A1628) background. Both figures lean in collaboratively,
suggesting partnership not sales pitch. Layered paper planes create depth.
Data visualizations appear as geometric shapes - bars, lines, nodes.
Paper-cut aesthetic with clean edges. Dramatic lighting from above.
Mood: Collaborative, analytical, showing joint discovery of value.`
  },
  {
    name: 'agree-fair-terms',
    outputDir: 'public/assets/value-philosophy',
    prompt: `${BASE_STYLE}
SPECIFIC VISUAL - "Agree on Fair Terms":
A handshake between two business professionals (abstract geometric silhouettes),
with a clean contract or document floating nearby. Deep navy (#0A1628) background.
The handshake glows subtly with cyan (#00D4FF) light suggesting trust and agreement.
Behind them, an open door or pathway suggests freedom/no lock-in - represented as
a bright opening in the layered paper. NO chains, NO locks - emphasize openness and trust.
Layered paper cutout aesthetic with geometric shapes.
Mood: Trust, agreement, freedom, professional partnership.`
  },
  {
    name: 'works-best-when',
    outputDir: 'public/assets/value-philosophy',
    prompt: `${BASE_STYLE}
SPECIFIC VISUAL - "Works Best When":
A confident business owner figure (abstract geometric silhouette) pointing at a specific spot
on a large workflow map or system diagram. The pointed area glows cyan (#00D4FF) - the bottleneck
identified. Deep navy (#0A1628) background with layered paper planes creating depth.
The figure holds keys in other hand suggesting ownership - keys as geometric shapes.
The workflow map shows interconnected nodes, with one highlighted node clearly identified.
Geometric abstract elements throughout.
Mood: Confident, focused, problem identified and ready to solve.`
  },
  {
    name: 'different-paths',
    outputDir: 'public/assets/value-philosophy',
    prompt: `${BASE_STYLE}
SPECIFIC VISUAL - "Different Paths":
A fork in the road or branching paths visualized as paper-cut layers.
One path (highlighted with cyan #00D4FF glow) leads to a sleek autonomous system
represented by clean geometric shapes that operate independently.
The other path leads to a traditional office scene with an ongoing support desk
represented by more complex, interconnected shapes suggesting dependency.
Deep navy (#0A1628) background. Not judgmental - just different directions.
A small figure silhouette stands at the fork point, considering both options.
Layered paper cutout effect with dramatic depth.
Mood: Choice, clarity, two valid but different approaches.`
  }
];

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  try {
    const result = await model.generateContent(imageConfig.prompt);
    const response = result.response;

    let imageSaved = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        const outputDir = path.join(process.cwd(), imageConfig.outputDir);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${imageConfig.name}.png`);
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
        imageSaved = true;
        break;
      }
    }

    if (!imageSaved) {
      console.error(`✗ No image generated for ${imageConfig.name}`);
      // Log response for debugging
      console.log('Response parts:', response.candidates[0].content.parts.map(p => p.text || 'image'));
    }

  } catch (error) {
    console.error(`✗ Error generating ${imageConfig.name}:`, error.message);
  }
}

async function main() {
  console.log('Generating value philosophy section images...');
  console.log('Output directory: public/assets/value-philosophy\n');

  for (const img of IMAGES) {
    await generateImage(img);
    // Small delay between requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✓ Done!');
  console.log('\nTo use these images, add them to the Features.tsx component.');
}

main().catch(console.error);
