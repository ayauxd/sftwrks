#!/usr/bin/env node
/**
 * Generate DISTINCT article images for monthly insights
 * Each image has a unique visual concept that tells a micro-story
 *
 * Run: source .env.local && node scripts/generate-monthly-images-v2.mjs
 */

import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

// Base style - minimal, paper-cut aesthetic (matching site style)
const BASE_STYLE = `Create a sophisticated, minimal illustration in a premium paper-cut diorama style.
STYLE: Paper-cut layered effect with visible depth. Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan glow (#00D4FF). Cinematic noir lighting. Abstract and symbolic. NO text, NO realistic faces. Professional mood.`;

// Each article has a UNIQUE visual concept with recognizable objects
const MONTHLY_ARTICLES = [
  {
    month: 'jan-2025',
    title: 'DeepSeek Changes Everything',
    prompt: `${BASE_STYLE}

CONCEPT - "David vs Goliath":
A tiny glowing seed/sprout on the left that grows into a tree matching the height of massive dark corporate skyscrapers on the right.
The small seed glows bright cyan, showing its efficiency and power.
The corporate buildings are imposing dark monolithic shapes in navy and steel blue.
Paper-cut depth: seed in foreground, tree growing in midground, skyscrapers in background.
Visual metaphor: small and efficient can rival big and expensive.
4:3 aspect ratio.`
  },
  {
    month: 'feb-2025',
    title: 'Compliance Begins, Adoption Accelerates',
    prompt: `${BASE_STYLE}

CONCEPT - "The Supportive Trellis":
A geometric scaffold/trellis structure made of clean lines, with stylized plants growing upward through it.
The scaffold provides structure but doesn't constrain - the plants reach toward a glowing light above.
The scaffold connection points glow subtle cyan.
Plants are organic shapes within the geometric framework.
Paper-cut layers create depth.
Visual metaphor: regulation as supportive framework, enabling growth rather than blocking it.
4:3 aspect ratio.`
  },
  {
    month: 'mar-2025',
    title: 'The Agent Evolution',
    prompt: `${BASE_STYLE}

CONCEPT - "Metamorphosis":
A horizontal sequence showing evolution: simple geometric robot shape on left → transitioning middle form → elegant autonomous agent silhouette on right.
Like a butterfly metamorphosis but for AI.
Each stage more sophisticated than the last.
Cyan energy trails connect the three stages, showing progression.
Paper-cut depth with figures at different layers.
Visual metaphor: AI agents rapidly evolving in capability.
4:3 aspect ratio.`
  },
  {
    month: 'apr-2025',
    title: 'Enterprise Spending Explodes',
    prompt: `${BASE_STYLE}

CONCEPT - "The Investment Waterfall":
A cascade of geometric coin/currency shapes flowing from top of frame, transforming into glowing technology nodes as they reach the bottom.
Money enters from above, innovation emerges below.
The transformation point in the middle glows brightest cyan.
Paper-cut layers: falling currency in front, transformation in mid, resulting tech nodes in back.
Visual metaphor: massive investment becoming AI capability.
4:3 aspect ratio.`
  },
  {
    month: 'may-2025',
    title: 'Claude 4 Arrives',
    prompt: `${BASE_STYLE}

CONCEPT - "Words Become Architecture":
A speech/chat bubble on the left morphs and transitions into structured building blocks/code architecture on the right.
The speech bubble is soft and organic. The architecture is precise and geometric.
A glowing cyan transformation line connects them where word becomes structure.
Paper-cut depth showing the metamorphosis.
Visual metaphor: natural language becoming working software.
4:3 aspect ratio.`
  },
  {
    month: 'jun-2025',
    title: "The Talent War You Can't Win",
    prompt: `${BASE_STYLE}

CONCEPT - "Many Paths, One Destination":
A central glowing destination/goal orb at the top of frame.
Multiple paths lead to it: one golden/prominent highway (expensive talent route) and several alternative winding paths (upskilling routes).
All paths converge on the same destination.
A small figure silhouette on one of the alternative paths, succeeding.
Visual metaphor: multiple ways to build AI capability, not just expensive hiring.
4:3 aspect ratio.`
  },
  {
    month: 'jul-2025',
    title: 'The Reality Check',
    prompt: `${BASE_STYLE}

CONCEPT - "The Truth Mirror":
A vertical mirror frame in the center of the composition.
On the left (reflection side): a shiny, polished, sparkly surface representing hype and promise.
On the right (reality side): practical tools being used, representing actual implementation.
The reality/practical side has subtle cyan glow showing genuine value.
Paper-cut layers create the mirror depth effect.
Visual metaphor: looking past AI hype to find real implementation value.
4:3 aspect ratio.`
  },
  {
    month: 'aug-2025',
    title: 'GPT-5 Changes the Game',
    prompt: `${BASE_STYLE}

CONCEPT - "The Unified Core":
A central glowing orb/sphere in the middle of the frame.
Multiple capability rays extend outward from it like a star or sun - representing text, code, image, reasoning capabilities.
Each ray is distinct but all originate from the single unified source.
The central sphere glows brightest cyan.
Paper-cut depth with orb in foreground, rays extending to background.
Visual metaphor: unified AI model with many capabilities in one.
4:3 aspect ratio.`
  },
  {
    month: 'sep-2025',
    title: 'Infrastructure at Scale',
    prompt: `${BASE_STYLE}

CONCEPT - "Compute as Utility":
Massive power transmission towers and lines stretching toward a distant horizon.
Instead of electricity, glowing cyan data/compute energy flows through the lines.
Scale emphasized through perspective - towers diminishing into distance.
Pulses of cyan energy travel along the transmission lines.
Paper-cut depth with towers at different distances.
Visual metaphor: AI compute becoming fundamental utility infrastructure.
4:3 aspect ratio.`
  },
  {
    month: 'oct-2025',
    title: 'The Solo Founder Revolution',
    prompt: `${BASE_STYLE}

CONCEPT - "One Person Orchestra":
A single small human silhouette in the center of the frame.
Multiple glowing tool extensions/mechanical arms radiate outward from them.
Each tool represents a different capability (code, design, analysis, communication).
The tools glow cyan, dramatically extending the person's reach and capability.
Like a one-person orchestra with AI instruments.
Visual metaphor: solo founders amplified exponentially by AI tools.
4:3 aspect ratio.`
  },
  {
    month: 'nov-2025',
    title: 'Three Frontier Models in One Week',
    prompt: `${BASE_STYLE}

CONCEPT - "Convergent Spotlights":
A stage or podium viewed from above angle.
Three distinct spotlights from different directions all converging on the same central point.
Each spotlight has slightly different character/shape but same destination.
Where all three overlap, the light glows brightest cyan.
Paper-cut depth with stage below, spotlights from above.
Visual metaphor: fierce competition converging, multiple leaders in one race.
4:3 aspect ratio.`
  },
  {
    month: 'dec-2025',
    title: 'The Year AI Became Infrastructure',
    prompt: `${BASE_STYLE}

CONCEPT - "Foundation Built":
A calendar page curling/turning from 2025 to 2026 in the upper portion of the frame.
Below the calendar, a solid interconnected foundation of glowing nodes and connections has formed.
The foundation wasn't there before - now it's permanent bedrock.
Foundation glows with subtle cyan network connections.
Paper-cut layers: calendar page in front, foundation below/behind.
Visual metaphor: AI shifting from experimental novelty to permanent infrastructure.
4:3 aspect ratio.`
  }
];

async function generateImage(article) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Generating: ${article.month} - ${article.title}`);
  console.log('='.repeat(60));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: article.prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '4:3',
            personGeneration: 'dont_allow',
            outputOptions: { mimeType: 'image/png' }
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(`⚠ API Error: ${data.error.message}`);
      return savePrompt(article);
    }

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      console.log(`⚠ No image in response`);
      return savePrompt(article);
    }

    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
    const outputDir = path.join(process.cwd(), 'public/assets/journal');
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${article.month}.png`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`✅ Image saved: ${outputPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    return { success: true, path: outputPath };

  } catch (error) {
    console.log(`⚠ Error: ${error.message}`);
    return savePrompt(article);
  }
}

function savePrompt(article) {
  const promptDir = path.join(process.cwd(), 'public/assets/journal/prompts');
  fs.mkdirSync(promptDir, { recursive: true });

  const promptPath = path.join(promptDir, `${article.month}-prompt.txt`);
  fs.writeFileSync(promptPath, `Title: ${article.title}\n\nPrompt:\n${article.prompt}`);
  console.log(`📝 Prompt saved: ${promptPath}`);

  return { success: false, promptPath };
}

async function main() {
  console.log('\n🎨 Generating DISTINCT Monthly Article Images');
  console.log('Each image has a unique visual concept\n');

  const results = [];

  for (const article of MONTHLY_ARTICLES) {
    const result = await generateImage(article);
    results.push({ ...article, ...result });

    // Rate limiting - 2 seconds between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  // Summary
  console.log('\n\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const generated = results.filter(r => r.success);
  const prompts = results.filter(r => !r.success);

  console.log(`\n✅ Generated: ${generated.length} images`);
  generated.forEach(r => console.log(`   - ${r.month}: ${r.title}`));

  if (prompts.length > 0) {
    console.log(`\n📝 Prompts saved (need manual generation): ${prompts.length}`);
    prompts.forEach(r => console.log(`   - ${r.month}: ${r.title}`));
  }
}

main().catch(console.error);
