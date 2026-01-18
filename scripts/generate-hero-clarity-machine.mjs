#!/usr/bin/env node
/**
 * Generate "The Clarity Machine" hero image using Gemini
 * Cinematic noir paper-cut style with responsive variants
 * Run: source .env.local && node scripts/generate-hero-clarity-machine.mjs
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

// Cinematic noir paper-cut hero prompt - "The Clarity Machine"
const HERO_PROMPT_BASE = `Generate a photorealistic, cinematic noir composition that visualizes AI consulting transformation inside a dimly lit, moody industrial workshop. Use a sophisticated paper-cut style to create deep, layered textures with dark, grainy cardstock forming the architecture of an elegant processing machine, illuminated by harsh, high-contrast chiaroscuro lighting with a warm amber spotlight from above.

LEFT SIDE (Input Zone): A chaotic pile of paper documents, scattered manila folders, tangled paper ribbons, and messy data cards tumbling onto a paper conveyor belt. The chaos represents overwhelming business complexity before AI intervention.

CENTER (The AI Engine): An intricate three-dimensional paper mechanism - a central processing unit made of layered cardstock with visible gears, pipes, and mechanical components. At its core, a subtle cyan glow (#00D4FF) emanates from within, representing the AI intelligence. Paper conveyor belts feed into and out of this machine.

RIGHT SIDE (Output Zone): The same documents now emerge perfectly organized - neat paper file stacks, labeled folders with visible tabs, structured document trays, clean data cards in precise rows. Everything precise, ordered, purposeful. The transformation is complete.

STYLE:
- Cinematic noir paper-cut diorama with 6-8 visible depth layers
- Dark charcoal/navy background (#0A1628)
- Warm sepia/amber spotlight lighting from above
- Grainy cardstock textures, matte paper materials
- Industrial machinery aesthetic (gears, conveyor belts, pipes)
- Tactile and gritty yet futuristically precise
- Premium editorial quality like NotebookLM marketing materials

COLOR PALETTE:
- Background: Deep charcoal/navy
- Papers: Cream, warm gray, manila brown
- Machinery: Dark gray, bronze/copper accents
- AI core: Subtle cyan glow (#00D4FF) - the ONLY bright accent

Absolutely no text, no words, no labels, no letters, no numbers, no human figures, no faces.`;

const VARIANTS = [
  {
    name: 'hero-desktop',
    aspectRatio: '16:9',
    focusNote: 'Full composition showing complete left-to-right transformation flow.'
  },
  {
    name: 'hero-tablet',
    aspectRatio: '1:1',
    focusNote: 'Center-focused composition emphasizing the AI engine with partial input/output visible on sides.'
  },
  {
    name: 'hero-mobile',
    aspectRatio: '2:3',
    focusNote: 'Vertical composition with AI engine core dominant, gears and glow prominent, minimal left/right context.'
  }
];

async function generateHeroVariant(variant) {
  console.log(`\nGenerating: ${variant.name} (${variant.aspectRatio})`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  const fullPrompt = `${HERO_PROMPT_BASE}

ASPECT RATIO: ${variant.aspectRatio}
COMPOSITION FOCUS: ${variant.focusNote}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        const outputDir = path.join(process.cwd(), 'public/assets/hero');

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${variant.name}.png`);
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`✓ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
        return outputPath;
      }
    }

    console.error(`✗ No image generated for ${variant.name}`);
    return null;

  } catch (error) {
    console.error(`✗ Error generating ${variant.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎨 Generating "The Clarity Machine" Hero Images');
  console.log('Style: Cinematic Noir Paper-Cut');
  console.log('='.repeat(50));

  const results = [];
  for (const variant of VARIANTS) {
    const result = await generateHeroVariant(variant);
    results.push({ name: variant.name, path: result });
    // Delay between requests
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📌 Results:');
  results.forEach(r => {
    if (r.path) {
      console.log(`   ✓ ${r.name}: ${r.path}`);
    } else {
      console.log(`   ✗ ${r.name}: FAILED`);
    }
  });

  console.log('\n📌 Next steps:');
  console.log('   1. Review the generated images');
  console.log('   2. Run: node scripts/optimize-images.mjs');
  console.log('   3. Deploy: bash ~/.claude/skills/softworks-site-manager/scripts/deploy.sh "Hero update"');
}

main().catch(console.error);
