#!/usr/bin/env npx ts-node
/**
 * Softworks Asset Orchestrator
 *
 * Unified interface for generating website assets using:
 * - Gemini API: Images, audio, text generation
 * - Grok API: X/Twitter insights, Aurora images
 *
 * Commands:
 *   npx ts-node scripts/orchestrator.ts generate hero
 *   npx ts-node scripts/orchestrator.ts generate all
 *   npx ts-node scripts/orchestrator.ts insights "AI governance"
 *   npx ts-node scripts/orchestrator.ts trending
 *   npx ts-node scripts/orchestrator.ts status
 */

import * as fs from 'fs';
import * as path from 'path';
import { checkApiKeys, printSetupInstructions } from './api-config';
import { ASSET_PROMPTS } from './generate-assets';

const COLORS = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
};

function log(msg: string, color = COLORS.reset): void {
  console.log(`${color}${msg}${COLORS.reset}`);
}

async function checkStatus(): Promise<void> {
  log('\n╔════════════════════════════════════════╗', COLORS.cyan);
  log('║    SOFTWORKS ASSET ORCHESTRATOR        ║', COLORS.cyan);
  log('╚════════════════════════════════════════╝\n', COLORS.cyan);

  const keys = checkApiKeys();

  log('API Status:', COLORS.yellow);
  log(`  Gemini: ${keys.gemini ? '✅ Configured' : '❌ Missing GEMINI_API_KEY'}`,
      keys.gemini ? COLORS.green : COLORS.red);
  log(`  Grok:   ${keys.grok ? '✅ Configured' : '❌ Missing XAI_API_KEY'}`,
      keys.grok ? COLORS.green : COLORS.red);

  log('\nAsset Directory Status:', COLORS.yellow);
  const dirs = [
    'public/assets/hero',
    'public/assets/sections',
    'public/assets/case-studies',
    'public/assets/logos',
  ];

  for (const dir of dirs) {
    const fullPath = path.join(process.cwd(), dir);
    const exists = fs.existsSync(fullPath);
    const files = exists ? fs.readdirSync(fullPath).length : 0;
    log(`  ${dir}: ${exists ? `✅ ${files} files` : '❌ Missing'}`,
        exists ? COLORS.green : COLORS.dim);
  }

  log('\nAvailable Assets to Generate:', COLORS.yellow);
  for (const [key, config] of Object.entries(ASSET_PROMPTS)) {
    const exists = fs.existsSync(config.outputPath);
    log(`  ${key.padEnd(15)} ${exists ? '✅' : '⬜'} ${config.outputPath}`,
        exists ? COLORS.green : COLORS.dim);
  }

  if (!keys.gemini && !keys.grok) {
    printSetupInstructions();
  }
}

async function generateAsset(type: string): Promise<void> {
  const keys = checkApiKeys();

  if (!keys.gemini) {
    log('\n❌ GEMINI_API_KEY required for image generation', COLORS.red);
    printSetupInstructions();
    return;
  }

  log(`\n🎨 Generating ${type} asset...`, COLORS.cyan);

  // Dynamic import to avoid loading SDK when not needed
  const { GoogleGenerativeAI } = await import('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const assetConfig = ASSET_PROMPTS[type as keyof typeof ASSET_PROMPTS];
  if (!assetConfig) {
    log(`❌ Unknown asset type: ${type}`, COLORS.red);
    log(`Available: ${Object.keys(ASSET_PROMPTS).join(', ')}`, COLORS.dim);
    return;
  }

  try {
    // Use Imagen 3 for best quality
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' });

    log(`📝 Prompt: ${assetConfig.prompt.substring(0, 80)}...`, COLORS.dim);

    // @ts-ignore - Imagen API
    const result = await model.generateImages({
      prompt: assetConfig.prompt,
      numberOfImages: 1,
      aspectRatio: assetConfig.aspectRatio,
    });

    // Ensure output directory exists
    const outputDir = path.dirname(assetConfig.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save image
    if (result.images?.[0]) {
      const imageData = result.images[0];
      // @ts-ignore
      await imageData.save(assetConfig.outputPath);
      log(`✅ Saved: ${assetConfig.outputPath}`, COLORS.green);
    }
  } catch (error: any) {
    log(`❌ Generation failed: ${error.message}`, COLORS.red);

    // Fallback instructions
    log('\n💡 Alternative: Use Google AI Studio directly', COLORS.yellow);
    log(`   1. Go to https://aistudio.google.com`, COLORS.dim);
    log(`   2. Select Imagen 3 model`, COLORS.dim);
    log(`   3. Use this prompt:\n`, COLORS.dim);
    log(`   ${assetConfig.prompt}\n`, COLORS.cyan);
  }
}

async function generateAll(): Promise<void> {
  log('\n🚀 Generating all assets...', COLORS.cyan);

  for (const type of Object.keys(ASSET_PROMPTS)) {
    await generateAsset(type);
  }
}

async function getXInsights(topic: string): Promise<void> {
  const keys = checkApiKeys();

  if (!keys.grok) {
    log('\n❌ XAI_API_KEY required for X/Twitter insights', COLORS.red);
    printSetupInstructions();
    return;
  }

  log(`\n🐦 Fetching X insights for: "${topic}"...`, COLORS.cyan);

  const { searchX } = await import('./grok-client');

  try {
    const results = await searchX(topic);
    log('\n📊 Summary:', COLORS.yellow);
    log(results.summary, COLORS.reset);
  } catch (error: any) {
    log(`❌ Failed: ${error.message}`, COLORS.red);
  }
}

async function getTrending(): Promise<void> {
  const keys = checkApiKeys();

  if (!keys.grok) {
    log('\n❌ XAI_API_KEY required for trending topics', COLORS.red);
    printSetupInstructions();
    return;
  }

  log('\n📈 Fetching trending topics...', COLORS.cyan);

  const { getTrending: fetchTrending } = await import('./grok-client');

  try {
    const topics = await fetchTrending('AI technology');
    log('\n🔥 Trending in AI:', COLORS.yellow);
    topics.forEach((topic, i) => log(`  ${i + 1}. ${topic}`));
  } catch (error: any) {
    log(`❌ Failed: ${error.message}`, COLORS.red);
  }
}

// CLI entry
async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case 'status':
    case undefined:
      await checkStatus();
      break;

    case 'generate':
      if (args[0] === 'all') {
        await generateAll();
      } else if (args[0]) {
        await generateAsset(args[0]);
      } else {
        log('Usage: orchestrator.ts generate <type|all>', COLORS.yellow);
        log(`Types: ${Object.keys(ASSET_PROMPTS).join(', ')}`, COLORS.dim);
      }
      break;

    case 'insights':
      if (args[0]) {
        await getXInsights(args.join(' '));
      } else {
        log('Usage: orchestrator.ts insights "topic"', COLORS.yellow);
      }
      break;

    case 'trending':
      await getTrending();
      break;

    case 'help':
      log(`
Softworks Asset Orchestrator

Commands:
  status              Check API keys and asset status
  generate <type>     Generate specific asset (hero, strategy, etc.)
  generate all        Generate all assets
  insights "topic"    Get X/Twitter insights on a topic
  trending            Get trending AI topics from X

Examples:
  npx ts-node scripts/orchestrator.ts status
  npx ts-node scripts/orchestrator.ts generate hero
  npx ts-node scripts/orchestrator.ts insights "AI governance trends"
`, COLORS.cyan);
      break;

    default:
      log(`Unknown command: ${command}`, COLORS.red);
      log('Run with "help" for usage info', COLORS.dim);
  }
}

main().catch(console.error);
