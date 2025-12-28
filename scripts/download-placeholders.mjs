#!/usr/bin/env node
/**
 * Download curated placeholder images from Unsplash
 * These match the Softworks brand aesthetic (navy, tech, professional)
 * Replace with AI-generated images later via pfs-generate.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

// Curated Unsplash images matching brand aesthetic
const PLACEHOLDERS = {
  // Hero - abstract tech bridge/connection concept
  'public/assets/hero/bridge-metaphor.png': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    description: 'Abstract digital network - globe with connections',
  },

  // Strategy - topographic/path concept
  'public/assets/sections/strategy-map.png': {
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=900&fit=crop',
    description: 'Strategic planning - data visualization',
  },

  // Integration - connected systems
  'public/assets/sections/integration-hub.png': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=900&fit=crop',
    description: 'Server room - interconnected systems',
  },

  // Governance - balance/trust
  'public/assets/sections/governance-scales.png': {
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=900&fit=crop',
    description: 'Legal/governance - scales of justice concept',
  },

  // Results - success metrics
  'public/assets/sections/results-chart.png': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop',
    description: 'Dashboard with charts - success metrics',
  },

  // Case study - Brain/AI
  'public/assets/case-studies/landmark-brain.png': {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop',
    description: 'AI brain concept - neural network visualization',
  },

  // Case study - Automation/Gears
  'public/assets/case-studies/landmark-gears.png': {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop',
    description: 'Technology gears - automation concept',
  },

  // Case study - Knowledge/Library
  'public/assets/case-studies/landmark-library.png': {
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    description: 'Library - knowledge management',
  },

  // Case study - Security/Fortress
  'public/assets/case-studies/landmark-fortress.png': {
    url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=800&fit=crop',
    description: 'Cybersecurity - digital protection',
  },
};

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
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
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  SOFTWORKS - Placeholder Image Downloader                  ║');
  console.log('║  Curated Unsplash images matching brand aesthetic          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const entries = Object.entries(PLACEHOLDERS);
  let success = 0;

  for (const [outputPath, config] of entries) {
    console.log(`  📥 Downloading: ${path.basename(outputPath)}`);
    console.log(`     ${config.description}`);

    try {
      await downloadImage(config.url, outputPath);
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`     ✅ Saved (${sizeKB}KB)\n`);
      success++;
    } catch (error) {
      console.log(`     ❌ Failed: ${error.message}\n`);
    }
  }

  console.log('═'.repeat(60));
  console.log(`  Downloaded: ${success}/${entries.length} images`);
  console.log('═'.repeat(60));

  if (success === entries.length) {
    console.log('\n  ✅ All placeholders ready!');
    console.log('  Run npm run build to include in production.\n');
    console.log('  To generate custom paper-craft images later:');
    console.log('  1. Open https://aistudio.google.com');
    console.log('  2. Use prompts from scripts/pfs-generate.mjs\n');
  }
}

main().catch(console.error);
