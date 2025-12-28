#!/usr/bin/env node
/**
 * Quick Hero Image Generator
 * Uses Gemini with native image generation
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const HERO_PROMPT = `Generate an image: 3D paper-craft diorama, isometric view. A lone figure in business attire stands at the center of an illuminated bridge. On the left side, a chaotic tangle of wires, blinking servers, and fragmented circuit boards represents technological confusion. On the right, a pristine paper-craft cityscape with organized buildings, clear pathways, and soft glowing windows represents structured AI capability. The bridge itself glows with subtle cyan light (#00D4FF), creating a path from chaos to clarity. Deep navy background (#0A1628) with subtle grid lines. Dramatic lighting from below the bridge. Style: Clean geometric paper-craft, low-poly aesthetic, professional yet approachable. Aspect ratio 16:9.`;

// Models to try in order of preference
const MODELS = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.5-flash-preview-04-17',
  'gemini-2.0-flash-exp',
];

async function generateHero() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY environment variable required');
    process.exit(1);
  }

  const genAI = new GoogleGenAI({ apiKey });

  for (const model of MODELS) {
    console.log(`\n🎨 Trying ${model}...`);

    try {
      const response = await genAI.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: HERO_PROMPT }] }],
        generationConfig: {
          responseModalities: ['image', 'text'],
        }
      });

      // Ensure directory exists
      const outputDir = 'public/assets/hero';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, 'bridge-metaphor.png');

      // Check for image in response
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData?.data) {
            const imageData = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(outputPath, imageData);
            console.log(`\n✅ Hero image saved to: ${outputPath}`);
            console.log(`📐 Size: ${Math.round(imageData.length / 1024)}KB`);
            console.log(`🎯 Model: ${model}`);
            return;
          }
        }
      }

      console.log(`   ⚠️ No image returned from ${model}`);

    } catch (error) {
      console.log(`   ❌ ${model}: ${error.message.substring(0, 60)}...`);
    }
  }

  // All models failed - provide alternatives
  console.log('\n' + '═'.repeat(60));
  console.log('  IMAGE GENERATION ALTERNATIVES');
  console.log('═'.repeat(60));
  console.log(`
Your API key doesn't have access to image generation models.
Here are your options:

1. 🌐 GOOGLE AI STUDIO (Recommended - Free)
   → Go to: https://aistudio.google.com
   → Select "Imagen 3" or "Gemini with image output"
   → Paste this prompt:

   "${HERO_PROMPT}"

2. 🐦 GROK AURORA (Requires xAI account)
   → Get API key: https://console.x.ai
   → Set: export XAI_API_KEY=your-key
   → Run: node scripts/generate-hero-grok.mjs

3. 📸 STOCK + EDIT
   → Use the prompt with Midjourney, DALL-E, or similar
   → Save to: public/assets/hero/bridge-metaphor.png
`);
}

generateHero();
