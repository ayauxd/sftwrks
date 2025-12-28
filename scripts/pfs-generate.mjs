#!/usr/bin/env node
/**
 * PFS Image Generator - Pitch Film Studios Asset Pipeline
 * Uses Gemini 3 Pro Image (Nano Banana Pro) for highest quality
 * Fallback to Gemini 2.5 Flash (Nano Banana) for speed
 *
 * Usage:
 *   node scripts/pfs-generate.mjs              # Generate all assets
 *   node scripts/pfs-generate.mjs --asset hero # Generate specific asset
 *   node scripts/pfs-generate.mjs --list       # List all assets
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// ══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

const API_KEY = process.env.GEMINI_API_KEY;

// Models in order of preference (Nano Banana Pro → Nano Banana → Flash)
const MODELS = [
  'gemini-2.0-flash-preview-image-generation',  // Nano Banana - image gen enabled
  'gemini-2.0-flash-exp',                        // Experimental flash
  'imagen-3.0-generate-002',                     // Imagen 3 direct
];

// Brand colors for consistent generation
const BRAND = {
  navy: '#0A1628',
  steel: '#1E3A5F',
  cyan: '#00D4FF',
  slate: '#2C3E50',
  cream: '#F5F5F4',
  gold: '#FFD700',
};

// ══════════════════════════════════════════════════════════════════════════════
// ASSET DEFINITIONS - Softworks Trading Company
// ══════════════════════════════════════════════════════════════════════════════

const ASSETS = {
  hero: {
    name: 'Hero - Bridge Metaphor',
    output: 'public/assets/hero/bridge-metaphor.png',
    aspectRatio: '16:9',
    prompt: `Generate an image: 3D paper-craft diorama, isometric view. A lone figure in business attire stands at the center of an illuminated bridge. On the left side, a chaotic tangle of wires, blinking servers, and fragmented circuit boards represents technological confusion. On the right, a pristine paper-craft cityscape with organized buildings, clear pathways, and soft glowing windows represents structured AI capability. The bridge itself glows with subtle cyan light (${BRAND.cyan}), creating a path from chaos to clarity. Deep navy background (${BRAND.navy}) with subtle grid lines. Dramatic lighting from below the bridge. Style: Clean geometric paper-craft, low-poly aesthetic, professional yet approachable. Aspect ratio 16:9.`,
  },

  strategy: {
    name: 'Strategy Map',
    output: 'public/assets/sections/strategy-map.png',
    aspectRatio: '4:3',
    prompt: `Generate an image: 3D paper-craft diorama showing a detailed topographic map made of layered paper, with a mountain peak and flag at the summit. Multiple dotted-line paths wind up the mountain, some crossing out dead ends. A magnifying glass hovers over one optimal path glowing cyan (${BRAND.cyan}). Scattered around: tiny paper compasses, rolled blueprints, and milestone markers. Navy blue base (${BRAND.navy}), cream paper layers, cyan accent lighting on the chosen path. Isometric view, clean shadows. Professional consulting aesthetic.`,
  },

  integration: {
    name: 'Integration Hub',
    output: 'public/assets/sections/integration-hub.png',
    aspectRatio: '4:3',
    prompt: `Generate an image: 3D paper-craft diorama with a central hub (glowing cyan orb, ${BRAND.cyan}) surrounded by floating paper-craft puzzle pieces connecting around it. Each puzzle piece represents a different system: a tiny server rack, a document stack, a chat bubble, a calendar. Soft connection lines like threads link pieces to the central hub. Navy gradient background (${BRAND.navy}), warm paper textures on pieces. Isometric view, pieces in various stages of connection—some locked in, others approaching. Technology integration concept.`,
  },

  governance: {
    name: 'Governance Scales',
    output: 'public/assets/sections/governance-scales.png',
    aspectRatio: '4:3',
    prompt: `Generate an image: 3D paper-craft diorama of a balanced scale made of brass-colored paper, perfectly level. On each side: stacked policy documents and a shield emblem. Behind the scale, a circular frame containing binary code patterns (0s and 1s in subtle relief). A gavel rests at the base. Color palette: Navy background (${BRAND.navy}), cream/ivory paper, gold accents on scale (${BRAND.gold}), subtle cyan glow (${BRAND.cyan}) on the binary frame. Symmetrical composition, conveying trust and oversight.`,
  },

  results: {
    name: 'Results Chart',
    output: 'public/assets/sections/results-chart.png',
    aspectRatio: '16:9',
    prompt: `Generate an image: 3D paper-craft diorama of a stylized bar chart made of rising paper columns, each column a different shade from navy (${BRAND.navy}) to cyan (${BRAND.cyan}). The tallest column has a small flag or star at its peak. Floating around: percentage symbols, upward arrows, and a small trophy. Confetti-like paper dots scattered. Navy background with celebration energy but professional restraint. Conveys measurable success and business outcomes. Aspect ratio 16:9.`,
  },

  'case-brain': {
    name: 'Case Study - Brain (AI Strategy)',
    output: 'public/assets/case-studies/landmark-brain.png',
    aspectRatio: '1:1',
    prompt: `Generate an image: 3D paper-craft landmark of a stylized human brain made of folded paper layers, with visible neural pathway grooves. The brain sits on a small pedestal. Subtle cyan light (${BRAND.cyan}) pulses through the pathway grooves like data flowing. One hemisphere is more geometric/circuit-like, the other more organic/folded. Navy background (${BRAND.navy}), cream brain with cyan accents. Clean, iconic, suitable as a case study thumbnail. Square format.`,
  },

  'case-gears': {
    name: 'Case Study - Gears (Automation)',
    output: 'public/assets/case-studies/landmark-gears.png',
    aspectRatio: '1:1',
    prompt: `Generate an image: 3D paper-craft landmark of three interlocking gears of different sizes, made of layered cardstock. The gears are in motion (implied by slight blur lines). A small wrench rests against the largest gear. Teeth of gears have subtle cyan edge-lighting (${BRAND.cyan}). Isometric view on navy background (${BRAND.navy}). Industrial but friendly aesthetic—automation without intimidation. Square format.`,
  },

  'case-library': {
    name: 'Case Study - Library (Knowledge)',
    output: 'public/assets/case-studies/landmark-library.png',
    aspectRatio: '1:1',
    prompt: `Generate an image: 3D paper-craft landmark of a miniature library alcove with three shelves of tiny books (spines visible). One book floats off the shelf, open, with pages turning. A small reading lamp casts warm light. The alcove frame has subtle Greek column detailing. Colors: Navy background (${BRAND.navy}), warm cream books, one book spine in cyan (${BRAND.cyan}). Conveys knowledge retrieval and structured information. Square format.`,
  },

  'case-fortress': {
    name: 'Case Study - Fortress (Security)',
    output: 'public/assets/case-studies/landmark-fortress.png',
    aspectRatio: '1:1',
    prompt: `Generate an image: 3D paper-craft landmark of a small fortress/castle with clean geometric walls. A shield emblem on the main gate. The fortress sits on a slight hill. Subtle digital patterns (like a firewall visualization) shimmer around the perimeter as a protective dome. Navy background (${BRAND.navy}), stone-gray paper for fortress, cyan glow (${BRAND.cyan}) for the protective barrier. Conveys security and governance. Square format.`,
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// GENERATION ENGINE
// ══════════════════════════════════════════════════════════════════════════════

async function generateWithGemini(assetKey, config) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Generating: ${config.name}`);
  console.log(`  Output: ${config.output}`);
  console.log(`${'═'.repeat(60)}`);

  // Try models in order
  for (const model of MODELS) {
    console.log(`\n  Trying model: ${model}...`);

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: config.prompt }] }],
        generationConfig: {
          responseModalities: ['image', 'text'],
        },
      });

      // Check for image in response
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData?.data) {
            // Ensure directory exists
            const outputDir = path.dirname(config.output);
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }

            // Save image
            const imageData = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(config.output, imageData);

            const sizeKB = Math.round(imageData.length / 1024);
            console.log(`  ✅ SUCCESS - ${sizeKB}KB saved to ${config.output}`);
            console.log(`  Model used: ${model}`);

            return { success: true, model, size: sizeKB, path: config.output };
          }
        }
      }

      console.log(`  ⚠️  No image data returned from ${model}`);

    } catch (error) {
      const msg = error.message?.substring(0, 80) || 'Unknown error';
      console.log(`  ❌ ${model}: ${msg}`);
    }
  }

  // All models failed
  return { success: false, asset: assetKey, name: config.name };
}

async function generateWithImagen(assetKey, config) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  console.log(`\n  Trying Imagen 3 direct API...`);

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: config.prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: config.aspectRatio,
      },
    });

    if (response.generatedImages?.[0]) {
      const outputDir = path.dirname(config.output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const imageData = response.generatedImages[0].image;
      // Handle different response formats
      if (imageData.imageBytes) {
        fs.writeFileSync(config.output, Buffer.from(imageData.imageBytes, 'base64'));
      } else if (typeof imageData === 'string') {
        fs.writeFileSync(config.output, Buffer.from(imageData, 'base64'));
      }

      const stats = fs.statSync(config.output);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`  ✅ SUCCESS (Imagen 3) - ${sizeKB}KB saved`);

      return { success: true, model: 'imagen-3.0-generate-002', size: sizeKB, path: config.output };
    }
  } catch (error) {
    console.log(`  ❌ Imagen 3: ${error.message?.substring(0, 80)}`);
  }

  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// CLI INTERFACE
// ══════════════════════════════════════════════════════════════════════════════

function listAssets() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  PFS IMAGE GENERATOR - Available Assets                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  for (const [key, config] of Object.entries(ASSETS)) {
    const exists = fs.existsSync(config.output);
    const status = exists ? '✅' : '⏳';
    console.log(`  ${status} ${key.padEnd(15)} → ${config.name}`);
    console.log(`     ${config.output}`);
  }

  console.log('\nUsage:');
  console.log('  node scripts/pfs-generate.mjs              # Generate all');
  console.log('  node scripts/pfs-generate.mjs --asset hero # Generate one');
  console.log('  node scripts/pfs-generate.mjs --list       # Show this list\n');
}

async function main() {
  const args = process.argv.slice(2);

  // Check for API key
  if (!API_KEY) {
    console.error('\n❌ GEMINI_API_KEY environment variable required');
    console.log('\nSet it with:');
    console.log('  export GEMINI_API_KEY=your-key-here\n');
    process.exit(1);
  }

  // Handle --list flag
  if (args.includes('--list')) {
    listAssets();
    return;
  }

  // Handle --asset flag for single asset
  const assetIndex = args.indexOf('--asset');
  let assetsToGenerate = Object.entries(ASSETS);

  if (assetIndex !== -1 && args[assetIndex + 1]) {
    const assetKey = args[assetIndex + 1];
    if (!ASSETS[assetKey]) {
      console.error(`\n❌ Unknown asset: ${assetKey}`);
      listAssets();
      process.exit(1);
    }
    assetsToGenerate = [[assetKey, ASSETS[assetKey]]];
  }

  // Generate assets
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  PFS IMAGE GENERATOR - Pitch Film Studios Pipeline         ║');
  console.log('║  Powered by Gemini (Nano Banana Pro)                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\nGenerating ${assetsToGenerate.length} asset(s)...\n`);

  const results = { success: [], failed: [] };

  for (const [key, config] of assetsToGenerate) {
    // Try Gemini first
    let result = await generateWithGemini(key, config);

    // If Gemini fails, try Imagen 3
    if (!result.success) {
      result = await generateWithImagen(key, config);
    }

    if (result?.success) {
      results.success.push({ key, ...result });
    } else {
      results.failed.push({ key, name: config.name, output: config.output });
    }

    // Rate limiting - wait between requests
    if (assetsToGenerate.length > 1) {
      console.log('\n  ⏳ Waiting 2s before next request...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('  GENERATION SUMMARY');
  console.log('═'.repeat(60));

  if (results.success.length > 0) {
    console.log(`\n  ✅ Successfully generated: ${results.success.length}`);
    for (const r of results.success) {
      console.log(`     • ${r.key} (${r.size}KB)`);
    }
  }

  if (results.failed.length > 0) {
    console.log(`\n  ❌ Failed: ${results.failed.length}`);
    for (const r of results.failed) {
      console.log(`     • ${r.key}: ${r.name}`);
    }

    console.log('\n  📋 MANUAL GENERATION OPTION:');
    console.log('     Open https://aistudio.google.com');
    console.log('     Select "Imagen 3" or "Gemini with image output"');
    console.log('     Use the prompts from scripts/pfs-generate.mjs');
  }

  console.log('\n');
}

// Run
main().catch(console.error);
