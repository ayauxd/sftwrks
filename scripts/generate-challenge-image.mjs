#!/usr/bin/env node
/**
 * Generate challenge section image using Gemini AI
 * Run: source .env.local && node scripts/generate-challenge-image.mjs
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

// Noir paper-cut style matching case studies
const NOIR_STYLE = `Create a cinematic noir style illustration with paper-cut layered effect. 1:1 aspect ratio (1080x1080).

REQUIRED STYLE:
- Cinematic noir aesthetic: dramatic lighting, deep shadows, film noir mood
- Paper-cut/layered effect: distinct layers with depth, like cut paper art
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accent (#00D4FF), near-black shadows
- High contrast between light and dark areas
- Geometric shapes with sharp edges suggesting paper layers
- Subtle film grain texture
- Dramatic diagonal lighting from one side
- Professional, moody, sophisticated atmosphere
- NO text, NO faces, NO photorealistic elements
- Abstract/symbolic representation of the topic

SPECIFIC VISUAL: `;

const challengeImage = {
  name: 'challenge-noir',
  prompt: `${NOIR_STYLE}
The challenge of AI transformation - visualize disconnected systems trying to connect.
Show abstract geometric shapes representing different business functions (sales, operations, support, data)
floating separately in dark space, with faint cyan connection lines trying but failing to bridge them.
Some shapes have small red warning indicators. A single bright cyan path shows the way forward but most paths are broken.
Represents the 70% of AI projects that fail due to poor setup and lack of strategy.
Paper-cut layers create depth - foreground shapes sharp and defined, background shapes softer.
Mood: Challenging but not hopeless - the solution is visible if you know where to look.`
};

async function generateImage() {
  console.log(`\nGenerating: ${challengeImage.name}`);
  console.log(`Prompt: ${challengeImage.prompt.substring(0, 100)}...`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  });

  try {
    const result = await model.generateContent(challengeImage.prompt);
    const response = result.response;

    // Find image part in response
    let imageSaved = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        const outputDir = path.join(process.cwd(), 'public', 'assets', 'sections');

        // Ensure directory exists
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${challengeImage.name}.png`);
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
        imageSaved = true;
        break;
      }
    }

    if (!imageSaved) {
      console.error(`No image generated for ${challengeImage.name}`);
      console.log('Response:', JSON.stringify(response, null, 2).substring(0, 500));
    }

  } catch (error) {
    console.error(`Error generating ${challengeImage.name}:`, error.message);
  }
}

generateImage().then(() => {
  console.log('\nDone!');
}).catch(console.error);
