#!/usr/bin/env node
/**
 * Generate hero image using kie.ai APIs
 * Supports: GPT-4o Image, Ideogram, Flux
 * Run: KIE_API_KEY=xxx node scripts/generate-hero-kie.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.KIE_API_KEY;
if (!apiKey) {
  console.error('KIE_API_KEY not set');
  process.exit(1);
}

// Cinematic noir paper-cut hero prompt - "The Clarity Machine"
const HERO_PROMPT = `Generate a photorealistic, cinematic noir composition that visualizes AI consulting transformation inside a dimly lit, moody industrial workshop. Use a sophisticated paper-cut style to create deep, layered textures with dark, grainy cardstock forming the architecture of an elegant processing machine, illuminated by harsh, high-contrast chiaroscuro lighting with a warm amber spotlight from above.

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

Absolutely no text, no words, no labels, no letters, no numbers, no human figures, no faces.

16:9 aspect ratio.`;

// Test GPT-4o Image API
async function generateWithGPT4o() {
  console.log('🎨 Trying GPT-4o Image API...\n');

  const response = await fetch('https://api.kie.ai/api/v1/gpt4o-image/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: HERO_PROMPT,
      size: '3:2',  // Closest to 16:9
      isEnhance: true,
      enableFallback: true,
      fallbackModel: 'FLUX_MAX'
    })
  });

  const data = await response.json();
  console.log('Response:', JSON.stringify(data, null, 2));
  return data;
}

// Generic job creation (for Ideogram, etc)
async function generateWithJob(model, params) {
  console.log(`🎨 Trying ${model}...\n`);

  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      ...params
    })
  });

  const data = await response.json();
  console.log('Response:', JSON.stringify(data, null, 2));
  return data;
}

// Poll for task result
async function pollTask(taskId) {
  console.log(`\nPolling task ${taskId}...`);

  let attempts = 0;
  const maxAttempts = 90;

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 2000));
    attempts++;

    try {
      // Correct endpoint: record-info with query param
      const response = await fetch(`https://api.kie.ai/api/v1/gpt4o-image/record-info?taskId=${taskId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      const data = await response.json();
      const status = data.data?.status;
      const progress = data.data?.progress || '';

      console.log(`  Attempt ${attempts}: ${status} (${progress})`);

      if (status === 'SUCCESS') {
        return data.data;
      } else if (status === 'CREATE_TASK_FAILED' || status === 'GENERATE_FAILED') {
        console.log('❌ Failed:', data.data?.errorMessage || 'Unknown error');
        return null;
      }
    } catch (error) {
      console.log(`  Attempt ${attempts}: ${error.message}`);
    }
  }

  console.log('⚠ Timeout');
  return null;
}

// Download result
async function downloadResult(data) {
  const imageUrl = data.response?.resultUrls?.[0] || data.imageUrl || data.image_url || data.output?.url;

  if (!imageUrl) {
    console.log('No image URL found in:', JSON.stringify(data, null, 2));
    return null;
  }

  console.log(`\nDownloading from ${imageUrl}...`);

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const outputDir = path.join(process.cwd(), 'public/assets/hero');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'hero-kie-desktop.png');
  fs.writeFileSync(outputPath, imageBuffer);

  console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  return outputPath;
}

async function main() {
  console.log('🎨 Generating Hero Image via Kie.ai');
  console.log('='.repeat(50));
  console.log('Prompt:', HERO_PROMPT.substring(0, 150) + '...\n');

  // Try GPT-4o Image
  const result = await generateWithGPT4o();

  if (result.code === 200 && result.data?.taskId) {
    const taskResult = await pollTask(result.data.taskId, 'gpt4o-image');
    if (taskResult) {
      const imagePath = await downloadResult(taskResult);
      if (imagePath) {
        console.log('\n📌 Next: open', imagePath);
      }
    }
  } else {
    console.log('\n❌ Generation failed');
  }
}

main().catch(console.error);
