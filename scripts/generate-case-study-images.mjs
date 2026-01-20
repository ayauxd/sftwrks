#!/usr/bin/env node
/**
 * Generate Case Study Images - Hero Noir Style
 *
 * Creates images matching the hero "Clarity Machine" aesthetic:
 * - Warm amber spotlight lighting
 * - Paper-cut diorama with grainy cardstock textures
 * - Industrial machinery (gears, pipes, conveyor belts)
 * - Cyan glow (#00D4FF) as only bright accent
 * - No human figures
 *
 * Run: source .env.local && node scripts/generate-case-study-images.mjs
 * Or generate one: source .env.local && node scripts/generate-case-study-images.mjs logistics
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Base style directive - matches hero image
const STYLE_BASE = `
STYLE REQUIREMENTS (CRITICAL - must match hero image):
- Photorealistic paper-cut diorama with 6-8 visible depth layers
- Dark charcoal/navy background (#0A1628)
- Single warm amber/sepia spotlight from above (industrial hanging lamp)
- Grainy cardstock textures, matte paper materials throughout
- Industrial machinery aesthetic: visible gears, pipes, conveyor belts, mechanical components
- Cyan glow (#00D4FF) emanates ONLY from the machine's core/processing area
- Premium editorial quality, tactile and dimensional

COLOR PALETTE:
- Background: Deep charcoal/navy (#0A1628)
- Papers/documents: Cream, warm gray, manila brown, aged white
- Machinery: Dark gray metal, bronze/copper accents, weathered bronze
- Light source: Warm amber/sepia from industrial lamp above
- Accent: Subtle cyan glow (#00D4FF) - sparingly, only at AI processing points

ABSOLUTE RESTRICTIONS:
- No text, words, labels, letters, or numbers
- No human figures, faces, hands, or silhouettes
- No bright colors except the subtle cyan accent
- No flat illustration style - must be dimensional paper-cut
`;

// Case study specific prompts
const CASE_STUDIES = {
  logistics: {
    filename: 'logistics-noir',
    title: 'Document Processing & Routing',
    prompt: `Generate a photorealistic, cinematic noir paper-cut diorama visualizing automated document routing and processing.

SCENE COMPOSITION:
LEFT (Input): A towering chaotic pile of paper shipping manifests, customs forms, and logistics documents cascading onto a paper conveyor belt. Manila folders spilling open, paper ribbons tangled.

CENTER (The Routing Engine): An intricate paper-cut sorting machine with multiple output chutes. Visible gears and mechanical arms made of layered cardstock. Paper documents flow through scanning gates. A subtle cyan glow (#00D4FF) emanates from the central processing chamber where documents are being analyzed.

RIGHT (Output): Documents emerge into organized channels - three or four neat paper trays, each with perfectly stacked, sorted documents. Label tabs visible on organized folders.

LIGHTING: Single warm amber industrial lamp hanging above, casting dramatic shadows. The cyan glow from the machine core provides subtle contrast.

${STYLE_BASE}`
  },

  finance: {
    filename: 'finance-noir',
    title: 'Two-Brain Verification System',
    prompt: `Generate a photorealistic, cinematic noir paper-cut diorama visualizing a dual-verification AI system for financial accuracy.

SCENE COMPOSITION:
LEFT (First Brain - Generator): A paper-cut mechanical brain made of layered cardstock gears and cogs. Paper documents feed into it. Connected by paper tubes/pipes to the center.

CENTER (Verification Chamber): A cylindrical glass-like paper chamber where two streams meet. Visible comparison mechanisms - paper scales, matching gears, verification stamps. A subtle cyan glow (#00D4FF) emanates from this verification core. Paper ticker tape emerges showing checkmarks.

RIGHT (Second Brain - Checker): A second mechanical paper brain, slightly different design, receiving the output and cross-referencing against paper file drawers filled with reference documents.

FOREGROUND: A paper conveyor belt carrying financial documents (stylized bank forms, rate sheets) through the system.

LIGHTING: Warm amber spotlight from above. The cyan glow only in the central verification chamber.

${STYLE_BASE}`
  },

  accounting: {
    filename: 'accounting-noir',
    title: 'Content Production Pipeline',
    prompt: `Generate a photorealistic, cinematic noir paper-cut diorama visualizing an automated content creation pipeline.

SCENE COMPOSITION:
LEFT (Input): A paper-cut microphone and voice recorder on a small desk. Sound waves visualized as layered paper ripples emanating from it. A few handwritten paper notes scattered nearby.

CENTER (The Content Engine): An elaborate paper-cut machine with multiple stages visible:
- Audio intake funnel at top
- Internal gears and processing chambers
- Multiple output arms/chutes
A subtle cyan glow (#00D4FF) emanates from the central AI processing core.

RIGHT (Output): Multiple paper screens/frames emerging on a conveyor belt, each showing different aspect ratios (vertical, square, wide). Organized stacks of finished content cards. Paper social media icons subtly suggested in the background shelving.

LIGHTING: Warm amber desk lamp illuminating the workspace. Industrial overhead light on the machine.

${STYLE_BASE}`
  },

  photobooth: {
    filename: 'photobooth-noir',
    title: 'Self-Running Photo Experience',
    prompt: `Generate a photorealistic, cinematic noir paper-cut diorama visualizing an autonomous AI photo booth system.

SCENE COMPOSITION:
LEFT (Input): A paper-cut camera or photo input tray. Simple interface with just one or two paper buttons. Photos/polaroids dropping into an intake slot.

CENTER (The Transformation Engine): A magical paper-cut machine that transforms photos. Visible internal workings: gears turning, photo negatives moving through chambers, processing rollers. A subtle cyan glow (#00D4FF) emanates from the AI core where the transformation happens. Paper jungle leaves and adventure elements visible inside the machine's imagination chamber.

RIGHT (Output): Transformed photos emerging - paper polaroids and prints showing adventure scenes (jungles, dinosaurs, fantasy landscapes - all in paper-cut style within the photos). Photos landing in organized collection trays.

LIGHTING: Warm amber spotlight from above, like a photo studio light but with industrial warmth.

${STYLE_BASE}`
  }
};

async function generateImage(studyKey) {
  const study = CASE_STUDIES[studyKey];
  if (!study) {
    console.error(`❌ Unknown case study: ${studyKey}`);
    console.log('Available:', Object.keys(CASE_STUDIES).join(', '));
    return false;
  }

  console.log(`\n🎨 Generating: ${study.title}`);
  console.log(`   File: ${study.filename}.webp`);

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    });

    const result = await model.generateContent(study.prompt);
    const response = result.response;

    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');

          const outputDir = path.join(process.cwd(), 'public/assets/case-studies');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          // Save as PNG first
          const pngPath = path.join(outputDir, `${study.filename}-new.png`);
          fs.writeFileSync(pngPath, imageBuffer);

          console.log(`   ✅ Saved: ${pngPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
          return true;
        }
      }
    }

    console.log('   ⚠️  No image generated - try again');
    return false;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

async function interactiveMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     CASE STUDY IMAGE GENERATOR - Hero Noir Style          ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log('║  Style: Warm amber spotlight, paper-cut diorama,          ║');
  console.log('║         industrial machinery, cyan glow accent            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('Available case studies:\n');
  Object.entries(CASE_STUDIES).forEach(([key, study], i) => {
    console.log(`  [${i + 1}] ${key.padEnd(12)} - ${study.title}`);
  });
  console.log(`  [A] ALL          - Generate all images`);
  console.log(`  [Q] QUIT         - Exit\n`);

  const answer = await question('Select option: ');
  rl.close();

  const keys = Object.keys(CASE_STUDIES);

  if (answer.toLowerCase() === 'q') {
    console.log('Goodbye!');
    return;
  }

  if (answer.toLowerCase() === 'a') {
    console.log('\n🚀 Generating ALL case study images...\n');
    for (const key of keys) {
      await generateImage(key);
      // Small delay between generations
      await new Promise(r => setTimeout(r, 2000));
    }
  } else {
    const index = parseInt(answer) - 1;
    if (index >= 0 && index < keys.length) {
      await generateImage(keys[index]);
    } else if (keys.includes(answer.toLowerCase())) {
      await generateImage(answer.toLowerCase());
    } else {
      console.log('Invalid selection');
      return;
    }
  }

  console.log('\n📋 Next steps:');
  console.log('   1. Review generated images in public/assets/case-studies/');
  console.log('   2. If good, rename *-new.png to replace existing .webp');
  console.log('   3. Run: node scripts/optimize-images.mjs');
  console.log('   4. Deploy: bash ~/.claude/skills/softworks-site-manager/scripts/deploy.sh "feat: New case study images"');
}

// Main execution
const args = process.argv.slice(2);

if (args.length > 0) {
  // Direct generation mode
  const studyKey = args[0].toLowerCase();
  if (studyKey === 'all') {
    (async () => {
      for (const key of Object.keys(CASE_STUDIES)) {
        await generateImage(key);
        await new Promise(r => setTimeout(r, 2000));
      }
    })();
  } else {
    generateImage(studyKey);
  }
} else {
  // Interactive menu mode
  interactiveMenu();
}
