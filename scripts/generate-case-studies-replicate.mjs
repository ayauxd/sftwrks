#!/usr/bin/env node
/**
 * Generate Case Study Images via Replicate (Flux Schnell)
 * Matches hero "Clarity Machine" noir style
 *
 * Run: node scripts/generate-case-studies-replicate.mjs
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// Load API key from pfs-logoworks env
const envPath = '/Users/fredpro/pfs-logoworks/.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/REPLICATE_API_KEY=(.+)/);
const REPLICATE_API_KEY = apiKeyMatch?.[1]?.trim();

if (!REPLICATE_API_KEY) {
  console.error('❌ REPLICATE_API_KEY not found in pfs-logoworks/.env.local');
  process.exit(1);
}

// Flux Schnell latest version (as of Jan 2026)
const FLUX_SCHNELL_VERSION = '5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637';

// Hero noir style base - CRITICAL for consistency
const STYLE_BASE = `Photorealistic cinematic noir paper-cut diorama with 6-8 visible depth layers. Dark charcoal navy background (#0A1628). Single warm amber sepia spotlight from industrial hanging lamp above, creating dramatic chiaroscuro shadows. Grainy cardstock textures, matte paper materials throughout. Industrial machinery aesthetic with visible gears, pipes, conveyor belts, bronze and copper accents. Subtle cyan glow (#00D4FF) emanates ONLY from AI processing core. Premium editorial quality. No text, no words, no human figures, no faces.`;

// Case study prompts adapted for hero style
const CASE_STUDIES = [
  {
    id: 'logistics',
    filename: 'logistics-noir-new.png',
    prompt: `Paper-cut diorama of document routing system in industrial workshop. LEFT: Towering chaotic pile of paper shipping manifests and customs forms cascading onto conveyor belt. CENTER: Intricate paper sorting machine with multiple output chutes, visible cardstock gears and mechanical arms, subtle cyan glow from scanning chamber. RIGHT: Documents emerge into organized paper trays with neat stacks and labeled folders. ${STYLE_BASE} 16:9 aspect ratio.`
  },
  {
    id: 'finance',
    filename: 'finance-noir-new.png',
    prompt: `Paper-cut diorama of dual-verification system in industrial workshop. Two mechanical paper brains made of layered cardstock gears, connected by paper tubes to central verification chamber. Glass-like paper cylinder in center where documents are cross-checked, subtle cyan glow from verification core. Paper scales and matching mechanisms visible. Financial documents on conveyor belts. ${STYLE_BASE} 16:9 aspect ratio.`
  },
  {
    id: 'accounting',
    filename: 'accounting-noir-new.png',
    prompt: `Paper-cut diorama of content production pipeline in industrial workshop. LEFT: Paper microphone on small desk with sound waves as layered paper ripples. CENTER: Elaborate paper machine with audio intake funnel, processing gears, multiple output arms, subtle cyan glow from AI core. RIGHT: Paper video screens in different aspect ratios emerging on conveyor, organized stacks of content cards. ${STYLE_BASE} 16:9 aspect ratio.`
  },
  {
    id: 'photobooth',
    filename: 'photobooth-noir-new.png',
    prompt: `Paper-cut diorama of autonomous photo transformation machine in industrial workshop. LEFT: Paper camera with simple interface, photos dropping into intake slot. CENTER: Magical paper machine with visible internal gears, photo negatives moving through chambers, paper jungle leaves and adventure elements inside imagination chamber, subtle cyan glow from transformation core. RIGHT: Transformed paper polaroids with adventure scenes emerging into collection trays. ${STYLE_BASE} 16:9 aspect ratio.`
  }
];

async function callReplicate(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      version: FLUX_SCHNELL_VERSION,
      input: {
        prompt: prompt,
        num_outputs: 1,
        aspect_ratio: '16:9',
        output_format: 'png',
        output_quality: 95
      }
    });

    const options = {
      hostname: 'api.replicate.com',
      port: 443,
      path: '/v1/predictions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function pollPrediction(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.replicate.com',
      port: 443,
      path: url.replace('https://api.replicate.com', ''),
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse poll response: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      // Handle redirect
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function generateImage(study) {
  console.log(`\n🎨 Generating: ${study.id}`);
  console.log(`   Prompt: ${study.prompt.substring(0, 80)}...`);

  try {
    // Create prediction
    const prediction = await callReplicate(study.prompt);

    if (prediction.error) {
      throw new Error(prediction.error);
    }

    console.log(`   ⏳ Processing... (ID: ${prediction.id})`);

    // Poll for completion
    let result = prediction;
    let attempts = 0;
    while (result.status === 'starting' || result.status === 'processing') {
      if (attempts++ > 60) throw new Error('Timeout after 120 seconds');
      await new Promise(r => setTimeout(r, 2000));
      process.stdout.write('.');
      result = await pollPrediction(result.urls.get);
    }
    console.log('');

    if (result.status === 'failed') {
      throw new Error(result.error || 'Prediction failed');
    }

    // Download image
    const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    const outputPath = path.join(process.cwd(), 'public/assets/case-studies', study.filename);

    await downloadImage(imageUrl, outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`   ✅ Saved: ${outputPath} (${Math.round(stats.size / 1024)}KB)`);

    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  CASE STUDY IMAGE GENERATOR - Replicate Flux Schnell        ║');
  console.log('║  Style: Hero noir (warm amber + cyan glow + paper-cut)      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  console.log(`\n📋 Generating ${CASE_STUDIES.length} case study images...`);
  console.log(`   Model: Flux Schnell (black-forest-labs)`);
  console.log(`   Cost: ~$0.003 × 4 = ~$0.012`);

  const outputDir = path.join(process.cwd(), 'public/assets/case-studies');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let success = 0;
  for (const study of CASE_STUDIES) {
    if (await generateImage(study)) {
      success++;
    }
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n════════════════════════════════════════════════════════════════`);
  console.log(`✅ Complete: ${success}/${CASE_STUDIES.length} images generated`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review images in public/assets/case-studies/`);
  console.log(`   2. If good, rename *-new.png to replace existing .webp`);
  console.log(`   3. Run: node scripts/optimize-images.mjs`);
  console.log(`   4. Deploy`);
}

main().catch(console.error);
