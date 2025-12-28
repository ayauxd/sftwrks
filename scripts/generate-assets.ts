/**
 * Asset Generation Utility
 * Uses Gemini API for image generation and Grok for X/Twitter insights
 *
 * Usage:
 *   npx ts-node scripts/generate-assets.ts --type hero
 *   npx ts-node scripts/generate-assets.ts --type case-study --name brain
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

// Asset prompts from IMAGE_GENERATION_PROMPTS.md
const ASSET_PROMPTS = {
  hero: {
    prompt: `3D paper-craft diorama, isometric view: A lone figure in business attire stands at the center of an illuminated bridge. On the left side, a chaotic tangle of wires, blinking servers, and fragmented circuit boards represents technological confusion. On the right, a pristine paper-craft cityscape with organized buildings, clear pathways, and soft glowing windows represents structured AI capability. The bridge itself glows with subtle cyan light (#00D4FF), creating a path from chaos to clarity. Deep navy background (#0A1628) with subtle grid lines. Dramatic lighting from below the bridge. Style: Clean geometric paper-craft, low-poly aesthetic, professional yet approachable.`,
    negativePrompt: `photorealistic, cluttered, dark, dystopian, scary, complex textures, noise`,
    aspectRatio: '16:9',
    outputPath: 'public/assets/hero/bridge-metaphor.png'
  },
  strategy: {
    prompt: `3D paper-craft diorama: A detailed topographic map made of layered paper, showing a mountain peak with a flag at the summit. Multiple dotted-line paths wind up the mountain, some crossing out dead ends. A magnifying glass hovers over one optimal path glowing cyan. Scattered around: tiny paper compasses, rolled blueprints, and milestone markers. Navy blue base (#0F172A), cream paper layers, cyan accent lighting on the chosen path. Isometric view, clean shadows.`,
    negativePrompt: `flat design, photorealistic, busy, cluttered backgrounds`,
    aspectRatio: '4:3',
    outputPath: 'public/assets/sections/strategy-map.png'
  },
  integration: {
    prompt: `3D paper-craft diorama: A central hub (glowing cyan orb) with paper-craft puzzle pieces floating and connecting around it. Each puzzle piece represents a different system: a tiny server rack, a document stack, a chat bubble, a calendar. Soft connection lines (like threads) link pieces to the central hub. Navy gradient background, warm paper textures on pieces. Isometric view, pieces in various stages of connection—some locked in, others approaching.`,
    negativePrompt: `messy, tangled, dark, aggressive, sharp edges`,
    aspectRatio: '4:3',
    outputPath: 'public/assets/sections/integration-hub.png'
  },
  governance: {
    prompt: `3D paper-craft diorama: A balanced scale made of brass-colored paper, perfectly level. On each side: stacked policy documents and a shield emblem. Behind the scale, a circular frame containing binary code patterns (0s and 1s in subtle relief). A gavel rests at the base. Color palette: Navy background, cream/ivory paper, gold accents on scale, subtle cyan glow on the binary frame. Symmetrical composition, conveying trust and oversight.`,
    negativePrompt: `unbalanced, chaotic, dark, threatening, complex`,
    aspectRatio: '4:3',
    outputPath: 'public/assets/sections/governance-scales.png'
  },
  'case-brain': {
    prompt: `3D paper-craft landmark: A stylized human brain made of folded paper layers, with visible neural pathway grooves. The brain sits on a small pedestal. Subtle cyan light pulses through the pathway grooves like data flowing. One hemisphere is more geometric/circuit-like, the other more organic/folded. Navy background, cream brain with cyan accents. Clean, iconic, suitable as a case study thumbnail.`,
    negativePrompt: `realistic brain, gory, medical, complex, busy`,
    aspectRatio: '1:1',
    outputPath: 'public/assets/case-studies/landmark-brain.png'
  },
  'case-gears': {
    prompt: `3D paper-craft landmark: Three interlocking gears of different sizes, made of layered cardstock. The gears are in motion (implied by slight blur lines). A small wrench rests against the largest gear. Teeth of gears have subtle cyan edge-lighting. Isometric view on navy background. Industrial but friendly aesthetic—automation without intimidation.`,
    negativePrompt: `rusty, broken, dark, menacing machinery, complex mechanisms`,
    aspectRatio: '1:1',
    outputPath: 'public/assets/case-studies/landmark-gears.png'
  },
  'case-library': {
    prompt: `3D paper-craft landmark: A miniature library alcove with three shelves of tiny books (spines visible). One book floats off the shelf, open, with pages turning. A small reading lamp casts warm light. The alcove frame has subtle Greek column detailing. Colors: Navy background, warm cream books, one book spine in cyan. Conveys knowledge retrieval and structured information.`,
    negativePrompt: `messy, dusty, old, decrepit, dark, complex`,
    aspectRatio: '1:1',
    outputPath: 'public/assets/case-studies/landmark-library.png'
  },
  'case-fortress': {
    prompt: `3D paper-craft landmark: A small fortress/castle with clean geometric walls. A shield emblem on the main gate. The fortress sits on a slight hill. Subtle digital patterns (like a firewall visualization) shimmer around the perimeter as a protective dome. Navy background, stone-gray paper for fortress, cyan glow for the protective barrier. Conveys security and governance.`,
    negativePrompt: `medieval, war, battle damage, dark, foreboding, complex`,
    aspectRatio: '1:1',
    outputPath: 'public/assets/case-studies/landmark-fortress.png'
  },
  results: {
    prompt: `3D paper-craft diorama: A stylized bar chart made of rising paper columns, each column a different shade from navy to cyan. The tallest column has a small flag or star at its peak. Floating around: percentage symbols, upward arrows, and a small trophy. Confetti-like paper dots scattered. Navy background with celebration energy but professional restraint. Conveys measurable success and outcomes.`,
    negativePrompt: `boring, flat, spreadsheet-like, corporate cliche, complex`,
    aspectRatio: '16:9',
    outputPath: 'public/assets/sections/results-chart.png'
  }
};

interface GenerateOptions {
  type: keyof typeof ASSET_PROMPTS;
  apiKey?: string;
}

async function generateWithGemini(options: GenerateOptions): Promise<string> {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }

  const assetConfig = ASSET_PROMPTS[options.type];
  if (!assetConfig) {
    throw new Error(`Unknown asset type: ${options.type}. Available: ${Object.keys(ASSET_PROMPTS).join(', ')}`);
  }

  console.log(`\n🎨 Generating ${options.type} asset...`);
  console.log(`📝 Prompt: ${assetConfig.prompt.substring(0, 100)}...`);

  const genAI = new GoogleGenAI({ apiKey });

  // Use Gemini 2.5 Flash for image generation
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: [{
      role: 'user',
      parts: [{ text: assetConfig.prompt }]
    }],
    generationConfig: {
      responseModalities: ['image', 'text'],
    }
  });

  // Extract and save image
  const outputDir = path.dirname(assetConfig.outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const imageData = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(assetConfig.outputPath, imageData);
      console.log(`✅ Saved to: ${assetConfig.outputPath}`);
      return assetConfig.outputPath;
    }
  }

  throw new Error('No image data in response');
}

// Alternative: Use Imagen 3 for higher quality
async function generateWithImagen(options: GenerateOptions): Promise<string> {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }

  const assetConfig = ASSET_PROMPTS[options.type];
  if (!assetConfig) {
    throw new Error(`Unknown asset type: ${options.type}`);
  }

  console.log(`\n🎨 Generating ${options.type} with Imagen 3...`);

  const genAI = new GoogleGenAI({ apiKey });

  const response = await genAI.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: assetConfig.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: assetConfig.aspectRatio === '16:9' ? '16:9' :
                   assetConfig.aspectRatio === '1:1' ? '1:1' : '4:3',
    }
  });

  const outputDir = path.dirname(assetConfig.outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (response.generatedImages?.[0]) {
    const imageData = response.generatedImages[0].image;
    // @ts-ignore - save method exists
    await imageData.save(assetConfig.outputPath);
    console.log(`✅ Saved to: ${assetConfig.outputPath}`);
    return assetConfig.outputPath;
  }

  throw new Error('No image generated');
}

// List available assets
function listAssets(): void {
  console.log('\n📦 Available Asset Types:\n');
  for (const [key, config] of Object.entries(ASSET_PROMPTS)) {
    console.log(`  ${key.padEnd(15)} → ${config.outputPath}`);
  }
  console.log('\nUsage: npx ts-node scripts/generate-assets.ts --type <asset-type>');
}

// CLI entry point
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes('--list') || args.length === 0) {
    listAssets();
    return;
  }

  const typeIndex = args.indexOf('--type');
  if (typeIndex === -1 || !args[typeIndex + 1]) {
    console.error('Error: --type <asset-type> is required');
    listAssets();
    process.exit(1);
  }

  const assetType = args[typeIndex + 1] as keyof typeof ASSET_PROMPTS;
  const useImagen = args.includes('--imagen');

  try {
    if (useImagen) {
      await generateWithImagen({ type: assetType });
    } else {
      await generateWithGemini({ type: assetType });
    }
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

export { generateWithGemini, generateWithImagen, ASSET_PROMPTS, listAssets };

// Run if called directly
main().catch(console.error);
