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

// Premium hero prompt - technical blueprint editorial style
const HERO_PROMPT = `Premium 3D isometric editorial illustration, technical blueprint aesthetic, paper-craft diorama with extreme depth and layering.

Scene composition - information transformation from chaos to clarity:

Left third: Towering wall of stacked white papers, cream documents, manila folders, open books spilling chaotically. Overwhelming mass of paperwork with visible paper textures and soft shadows between layers.

Center: Elegant brain shape formed by clean circuit board traces and glowing connection pathways. Bright cyan glowing nodes at key neural intersections. This is the processing engine where complexity becomes understanding.

Right third: Perfectly organized output - neat filing cabinet drawers, precisely aligned folder stacks with visible tabs, structured document trays. Everything precise, labeled, purposeful.

Style: Architectural paper model aesthetic like premium editorial illustrations. Warm off-white blueprint grid background. Visible depth layers with soft directional shadows. Materials look like real paper, cardboard, matte surfaces. Premium quality like Anthropic or NotebookLM marketing materials.

Color palette: Cream, white, warm gray papers. Navy blue shadows for depth. Bright cyan (#00D4FF) accent ONLY on circuit brain connection nodes.

Absolutely no text, no words, no labels, no letters, no numbers, no human figures, no faces.`;

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
