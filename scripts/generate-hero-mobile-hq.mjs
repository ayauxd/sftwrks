#!/usr/bin/env node
/**
 * Generate high-quality mobile hero image using Imagen 3
 * Portrait format (2:3) to match mobile viewports
 * Run: source .env.local && node scripts/generate-hero-mobile-hq.mjs
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

// Same visual style as desktop but optimized for portrait mobile
const MOBILE_HERO_PROMPT = `Generate a photorealistic, cinematic noir composition that visualizes AI consulting transformation inside a dimly lit, moody industrial workshop. Use a sophisticated paper-cut style to create deep, layered textures with dark, grainy cardstock forming the architecture of an elegant processing machine, illuminated by harsh, high-contrast chiaroscuro lighting with a warm amber spotlight from above.

PORTRAIT COMPOSITION (2:3 aspect ratio, vertical):

TOP ZONE: The warm amber spotlight and industrial lamp hanging from pipes and mechanical elements above.

CENTER (The AI Engine - Dominant Focus): An intricate three-dimensional paper mechanism - a central processing unit made of layered cardstock with visible gears, pipes, and mechanical components. At its core, a subtle cyan glow (#00D4FF) emanates from within, representing the AI intelligence. This is the hero element, large and detailed.

LEFT SIDE (Input): Chaotic paper documents, scattered manila folders feeding into the machine on a conveyor belt.

RIGHT SIDE (Output): Organized documents, neat stacks emerging from the machine.

BOTTOM ZONE: Additional mechanical elements, paper stacks, conveyor belt components for visual depth.

STYLE:
- Cinematic noir paper-cut diorama with 6-8 visible depth layers
- Dark charcoal/navy background (#0A1628)
- Warm sepia/amber spotlight lighting from above
- Grainy cardstock textures, matte paper materials
- Industrial machinery aesthetic (gears, conveyor belts, pipes)
- Tactile and gritty yet futuristically precise
- Premium editorial quality like NotebookLM marketing materials
- HIGH RESOLUTION and SHARP DETAIL throughout

COLOR PALETTE:
- Background: Deep charcoal/navy
- Papers: Cream, warm gray, manila brown
- Machinery: Dark gray, bronze/copper accents
- AI core: Subtle cyan glow (#00D4FF) - the ONLY bright accent

Absolutely no text, no words, no labels, no letters, no numbers, no human figures, no faces.`;

async function generateMobileHero() {
  console.log('Generating high-quality mobile hero image...\n');

  // Try Imagen 3 first (higher quality)
  try {
    console.log('Attempting Imagen 3 (imagen-3.0-generate-002)...');
    const imagenModel = genAI.getGenerativeModel({
      model: 'imagen-3.0-generate-002',
      generationConfig: {
        aspectRatio: '9:16' // Portrait for mobile
      }
    });

    const result = await imagenModel.generateImages({
      prompt: MOBILE_HERO_PROMPT,
      config: {
        numberOfImages: 1,
        aspectRatio: '9:16',
        outputMimeType: 'image/png'
      }
    });

    if (result.images && result.images.length > 0) {
      return await saveImage(result.images[0].imageBytes, 'imagen3-002');
    }
  } catch (error) {
    console.log(`Imagen 3.0-002 not available: ${error.message}\n`);
  }

  // Try Imagen 3.0-generate-001
  try {
    console.log('Attempting Imagen 3 (imagen-3.0-generate-001)...');
    const imagenModel = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await imagenModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: MOBILE_HERO_PROMPT }] }],
    });

    const response = result.response;
    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return await saveImage(part.inlineData.data, 'imagen3-001');
        }
      }
    }
  } catch (error) {
    console.log(`Imagen 3.0-001 not available: ${error.message}\n`);
  }

  // Fallback to Gemini 2.0 Flash
  try {
    console.log('Using Gemini 2.0 Flash with image generation...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    });

    const result = await model.generateContent(MOBILE_HERO_PROMPT);
    const response = result.response;

    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return await saveImage(part.inlineData.data, 'gemini-flash');
        }
      }
    }
  } catch (error) {
    console.error(`Gemini Flash failed: ${error.message}`);
  }

  console.error('\nFailed to generate mobile hero image');
  return false;
}

async function saveImage(base64Data, source) {
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const outputDir = path.join(process.cwd(), 'public/assets/hero');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save as PNG first for quality
  const pngPath = path.join(outputDir, 'hero-mobile-new.png');
  fs.writeFileSync(pngPath, imageBuffer);
  console.log(`\n✓ Saved: ${pngPath} (${Math.round(imageBuffer.length / 1024)}KB) [${source}]`);

  console.log('\n📌 Next steps:');
  console.log('   1. Review the generated image at public/assets/hero/hero-mobile-new.png');
  console.log('   2. If good, convert to JPG: sips -s format jpeg hero-mobile-new.png --out hero-mobile.jpg');
  console.log('   3. Or run the full optimization script');

  return true;
}

generateMobileHero().catch(console.error);
