#!/usr/bin/env node
/**
 * Generate hero image using Midjourney v7 via Kie.ai API
 * Run: KIE_API_KEY=xxx node scripts/generate-hero-midjourney.mjs
 *
 * Docs: https://kie.ai/features/mj-api
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.KIE_API_KEY;
if (!apiKey) {
  console.error('KIE_API_KEY not set');
  process.exit(1);
}

// Midjourney-optimized prompt - technical blueprint editorial style
// Based on reference images: NotebookLM paper stacks, circuit brain, isometric 3D
const HERO_PROMPT = `Premium 3D isometric editorial illustration, technical blueprint aesthetic, paper-craft diorama with extreme depth --

Scene: Information transformation from chaos to clarity

Left side: Towering wall of stacked white papers, cream documents, manila folders, open books spilling chaotically. Overwhelming mass of paperwork. Matte paper textures with soft shadows.

Center: Elegant brain shape formed by clean circuit board traces and connection pathways. Glowing cyan nodes at key intersections. The processing engine where complexity becomes understanding.

Right side: Perfectly organized output -- neat filing cabinet drawers, aligned folder stacks with visible tabs, structured document trays. Everything precise and purposeful.

Style: Architectural paper model aesthetic, warm off-white blueprint grid background, visible depth layers with soft directional shadows, premium editorial quality like NotebookLM or Anthropic marketing materials

Color palette: Cream white gray papers, navy shadows, bright cyan #00D4FF accent on circuit nodes only

--ar 16:9 --v 7 --style raw --no text words labels letters numbers human faces people`;

async function submitGeneration() {
  console.log('🎨 Submitting to Midjourney v7 via Kie.ai...\n');
  console.log('Prompt preview:', HERO_PROMPT.substring(0, 200) + '...\n');

  try {
    const response = await fetch('https://api.kie.ai/api/ai/mj-txt2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: HERO_PROMPT,
        model: 'mj-v7',
        aspect_ratio: '16:9'
      })
    });

    const data = await response.json();
    console.log('Submit response:', JSON.stringify(data, null, 2));

    if (data.error || data.code !== 0) {
      console.log('⚠ Error:', data.error || data.message || 'Unknown error');
      return null;
    }

    // Get task ID for polling
    const taskId = data.data?.task_id || data.task_id;
    if (!taskId) {
      console.log('⚠ No task_id in response');
      return null;
    }

    console.log('Task ID:', taskId);
    return taskId;

  } catch (error) {
    console.log('⚠ Error:', error.message);
    return null;
  }
}

async function pollForResult(taskId) {
  console.log('\nPolling for result...');

  let attempts = 0;
  const maxAttempts = 120; // 4 minutes max (Midjourney can take a while)

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 2000));
    attempts++;

    try {
      const response = await fetch(`https://api.kie.ai/api/ai/task/${taskId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      const data = await response.json();
      const status = data.data?.status || data.status;
      const progress = data.data?.progress || '';

      console.log(`  Attempt ${attempts}: ${status} ${progress}`);

      if (status === 'completed' || status === 'finished') {
        const imageUrl = data.data?.image_url || data.data?.output?.image_url;
        if (imageUrl) {
          return imageUrl;
        }
        // Check for multiple images (Midjourney generates 4)
        const images = data.data?.images || data.data?.output?.images;
        if (images?.length > 0) {
          return images;
        }
        console.log('Result data:', JSON.stringify(data.data, null, 2));
        return null;
      } else if (status === 'failed' || status === 'error') {
        console.log('⚠ Generation failed:', data.data?.error || 'Unknown');
        return null;
      }
    } catch (error) {
      console.log(`  Attempt ${attempts}: ${error.message}`);
    }
  }

  console.log('⚠ Timeout waiting for result');
  return null;
}

async function downloadImage(url, filename) {
  console.log(`Downloading ${filename}...`);
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const outputDir = path.join(process.cwd(), 'public/assets/hero');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, filename);
  fs.writeFileSync(outputPath, imageBuffer);

  console.log(`✅ Saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
  return outputPath;
}

async function main() {
  console.log('🎨 Generating Hero Image with Midjourney v7');
  console.log('='.repeat(50));

  const taskId = await submitGeneration();
  if (!taskId) {
    console.log('\n❌ Failed to submit generation');
    return;
  }

  const result = await pollForResult(taskId);

  if (!result) {
    console.log('\n❌ Failed to get result');
    return;
  }

  // Handle single image or array of images
  if (Array.isArray(result)) {
    console.log(`\n✅ Generated ${result.length} variants`);
    for (let i = 0; i < result.length; i++) {
      await downloadImage(result[i], `hero-mj-v${i + 1}.png`);
    }
    console.log('\n📌 Review all variants and pick the best one');
  } else {
    await downloadImage(result, 'hero-mj-grid.png');
    console.log('\n📌 Image contains 4 variants in a grid - pick your favorite');
  }

  console.log('\n📌 Next steps:');
  console.log('   1. Review: open public/assets/hero/hero-mj-*.png');
  console.log('   2. Pick best variant');
  console.log('   3. Upscale if needed');
  console.log('   4. Convert and replace hero images');
}

main().catch(console.error);
