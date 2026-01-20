#!/usr/bin/env node
/**
 * Generate a single case study image via Replicate
 * Usage: node scripts/generate-single-case-study.mjs [finance|accounting|photobooth]
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// Load API key
const envPath = '/Users/fredpro/pfs-logoworks/.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/REPLICATE_API_KEY=(.+)/);
const REPLICATE_API_KEY = apiKeyMatch?.[1]?.trim();

if (!REPLICATE_API_KEY) {
  console.error('REPLICATE_API_KEY not found');
  process.exit(1);
}

const FLUX_SCHNELL_VERSION = '5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637';

const STYLE_BASE = `Photorealistic cinematic noir paper-cut diorama with 6-8 visible depth layers. Dark charcoal navy background (#0A1628). Single warm amber sepia spotlight from industrial hanging lamp above, creating dramatic chiaroscuro shadows. Grainy cardstock textures, matte paper materials throughout. Industrial machinery aesthetic with visible gears, pipes, conveyor belts, bronze and copper accents. Subtle cyan glow (#00D4FF) emanates ONLY from AI processing core. Premium editorial quality. No text, no words, no human figures, no faces.`;

const PROMPTS = {
  finance: {
    filename: 'finance-noir-new.png',
    prompt: `Paper-cut diorama of dual-verification system in industrial workshop. Two mechanical paper brains made of layered cardstock gears, connected by paper tubes to central verification chamber. Glass-like paper cylinder in center where documents are cross-checked, subtle cyan glow from verification core. Paper scales and matching mechanisms visible. Financial documents on conveyor belts. ${STYLE_BASE} 16:9 aspect ratio.`
  },
  accounting: {
    filename: 'accounting-noir-new.png',
    prompt: `Paper-cut diorama of content production pipeline in industrial workshop. LEFT: Paper microphone on small desk with sound waves as layered paper ripples. CENTER: Elaborate paper machine with audio intake funnel, processing gears, multiple output arms, subtle cyan glow from AI core. RIGHT: Paper video screens in different aspect ratios emerging on conveyor, organized stacks of content cards. ${STYLE_BASE} 16:9 aspect ratio.`
  },
  photobooth: {
    filename: 'photobooth-noir-new.png',
    prompt: `Paper-cut diorama of autonomous photo transformation machine in industrial workshop. LEFT: Paper camera with simple interface, photos dropping into intake slot. CENTER: Magical paper machine with visible internal gears, photo negatives moving through chambers, paper jungle leaves and adventure elements inside imagination chamber, subtle cyan glow from transformation core. RIGHT: Transformed paper polaroids with adventure scenes emerging into collection trays. ${STYLE_BASE} 16:9 aspect ratio.`
  }
};

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
        'Content-Length': Buffer.byteLength(data)
      }
    };

    console.log('Calling Replicate API...');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`Response status: ${res.statusCode}`);
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode !== 201) {
            console.log('Error response:', JSON.stringify(parsed, null, 2));
            reject(new Error(parsed.detail || `HTTP ${res.statusCode}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse: ${body.substring(0, 200)}`));
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
          reject(new Error(`Poll parse error: ${body.substring(0, 200)}`));
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
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function generate(studyKey) {
  const study = PROMPTS[studyKey];
  if (!study) {
    console.error(`Unknown: ${studyKey}. Options: ${Object.keys(PROMPTS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\nGenerating: ${studyKey}`);
  console.log(`Prompt: ${study.prompt.substring(0, 100)}...`);

  try {
    const prediction = await callReplicate(study.prompt);
    console.log(`Prediction ID: ${prediction.id}`);
    console.log(`Status: ${prediction.status}`);

    let result = prediction;
    let attempts = 0;
    while (result.status === 'starting' || result.status === 'processing') {
      if (attempts++ > 60) throw new Error('Timeout');
      await new Promise(r => setTimeout(r, 2000));
      process.stdout.write('.');
      result = await pollPrediction(result.urls.get);
    }
    console.log(`\nFinal status: ${result.status}`);

    if (result.status === 'failed') {
      console.error('Failed:', result.error);
      process.exit(1);
    }

    const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    const outputPath = path.join(process.cwd(), 'public/assets/case-studies', study.filename);

    console.log(`Downloading from: ${imageUrl}`);
    await downloadImage(imageUrl, outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`Saved: ${outputPath} (${Math.round(stats.size / 1024)}KB)`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

const studyKey = process.argv[2];
if (!studyKey) {
  console.log('Usage: node scripts/generate-single-case-study.mjs [finance|accounting|photobooth]');
  process.exit(1);
}

generate(studyKey);
