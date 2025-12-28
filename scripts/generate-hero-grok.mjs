#!/usr/bin/env node
/**
 * Hero Image Generator using Grok Aurora
 * Requires XAI_API_KEY environment variable
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const HERO_PROMPT = `3D paper-craft diorama, isometric view. A lone figure in business attire stands at the center of an illuminated bridge. On the left side, a chaotic tangle of wires, blinking servers, and fragmented circuit boards represents technological confusion. On the right, a pristine paper-craft cityscape with organized buildings, clear pathways, and soft glowing windows represents structured AI capability. The bridge itself glows with subtle cyan light, creating a path from chaos to clarity. Deep navy background with subtle grid lines. Dramatic lighting from below the bridge. Style: Clean geometric paper-craft, low-poly aesthetic, professional yet approachable.`;

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function generateHero() {
  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    console.error('❌ XAI_API_KEY environment variable required');
    console.log('\n💡 Get your key at: https://console.x.ai');
    process.exit(1);
  }

  console.log('\n🎨 Generating hero image with Grok Aurora...\n');

  const client = new OpenAI({
    baseURL: 'https://api.x.ai/v1',
    apiKey,
  });

  try {
    const response = await client.images.generate({
      model: 'grok-2-image',
      prompt: HERO_PROMPT,
      n: 1,
      response_format: 'url',
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL in response');
    }

    // Ensure directory exists
    const outputDir = 'public/assets/hero';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'bridge-metaphor.png');

    console.log('📥 Downloading image...');
    await downloadImage(imageUrl, outputPath);

    console.log(`\n✅ Hero image saved to: ${outputPath}`);
    const stats = fs.statSync(outputPath);
    console.log(`📐 Size: ${Math.round(stats.size / 1024)}KB`);

  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

generateHero();
