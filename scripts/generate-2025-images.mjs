#!/usr/bin/env node
/**
 * Generate article images for 2025 using Gemini AI
 * Run: source .env.local && node scripts/generate-2025-images.mjs
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Softworks brand style
const BRAND_STYLE = `
Style: Modern, minimalist tech aesthetic with abstract representations
Colors: Navy blue (#0A1628, #0F172A), cyan accent (#00D4FF), steel blue (#1E3A5F)
Mood: Professional, forward-thinking, innovative
Elements: Abstract geometric shapes, subtle grid patterns, clean lines, glowing nodes
Avoid: Faces, text, cluttered compositions, bright colors outside palette
Format: 16:9 aspect ratio, suitable for article header
`;

const ARTICLES_2025 = [
  {
    month: 'jan-2025',
    title: 'DeepSeek Changes Everything',
    concept: 'Chinese AI disruption, cost efficiency, open source challenging giants. Visual: Small glowing seed growing to match massive corporate structures, efficiency vs. scale contrast.'
  },
  {
    month: 'feb-2025',
    title: 'Compliance Begins, Adoption Accelerates',
    concept: 'EU AI Act, regulation and growth coexisting. Visual: Framework/scaffold structure enabling growth rather than constraining it, governance as foundation.'
  },
  {
    month: 'mar-2025',
    title: 'The Agent Evolution',
    concept: 'AI task capability doubling every 7 months, transformation of work. Visual: Exponential growth curve, evolving geometric forms, capability expansion.'
  },
  {
    month: 'apr-2025',
    title: 'Enterprise Spending Explodes',
    concept: '$7.3B departmental spend, 4.1x growth, coding tools dominant. Visual: Investment flowing into technology nodes, resource allocation visualization.'
  },
  {
    month: 'may-2025',
    title: 'Claude 4 Arrives',
    concept: 'Vibe coding, Y Combinator 25% AI-generated code, barrier collapse. Visual: Conversation transforming into code structures, natural language becoming architecture.'
  },
  {
    month: 'jun-2025',
    title: 'The Talent War You Can\'t Win',
    concept: 'Meta $14.3B Scale AI, sports-star compensation, upskilling strategy. Visual: Talent scarcity, alternative pathways, distributed capability.'
  },
  {
    month: 'jul-2025',
    title: 'The Reality Check',
    concept: 'MIT study 95% found zero value, implementation strategy matters. Visual: Contrast between superficial adoption and deep integration, methodology over tools.'
  },
  {
    month: 'aug-2025',
    title: 'GPT-5 Changes the Game',
    concept: '256K context, unified capabilities, expert-level performance. Visual: Unified system, convergence of capabilities, expanded horizon.'
  },
  {
    month: 'sep-2025',
    title: 'Infrastructure at Scale',
    concept: 'Stargate 7GW, Claude Sonnet 4.5, massive infrastructure buildout. Visual: Power infrastructure, data center scale, compute as utility.'
  },
  {
    month: 'oct-2025',
    title: 'The Solo Founder Revolution',
    concept: '35% solo founders, Cursor $29.3B, vibe coding mainstream. Visual: Individual amplified by AI tools, one person with extended capabilities.'
  },
  {
    month: 'nov-2025',
    title: 'Three Frontier Models in One Week',
    concept: 'Gemini 3, Opus 4.5, GPT-5.1 within days, competition driving progress. Visual: Three peaks, competitive landscape, convergence and divergence.'
  }
];

async function generateImagePrompt(article) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Create a detailed, specific image generation prompt for this article header image.

Article: "${article.title}"
Concept: ${article.concept}

${BRAND_STYLE}

Output ONLY the image prompt, nothing else. Make it detailed and specific for Imagen 3 or similar AI image generators. Focus on abstract, geometric representations - no people, no text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`Error generating prompt for ${article.month}:`, error.message);
    return null;
  }
}

async function tryGenerateImage(prompt, outputPath) {
  // Try to use Imagen if available
  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' });
    const result = await model.generateContent(prompt);

    // Check if we got image data
    if (result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      const imageData = result.response.candidates[0].content.parts[0].inlineData;
      const buffer = Buffer.from(imageData.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      return true;
    }
  } catch (error) {
    // Imagen not available, will use prompts
    return false;
  }
  return false;
}

async function main() {
  console.log('Generating image prompts for 2025 articles...\n');

  const outputDir = path.join(process.cwd(), 'public/assets/journal');
  fs.mkdirSync(outputDir, { recursive: true });

  const results = [];
  let imagenAvailable = false;

  for (const article of ARTICLES_2025) {
    console.log(`Processing ${article.month}: ${article.title}`);

    const prompt = await generateImagePrompt(article);
    if (!prompt) {
      console.log(`  ⚠ Skipped (error)\n`);
      continue;
    }

    console.log(`  ✓ Prompt generated`);

    // Try to generate actual image
    const imagePath = path.join(outputDir, `${article.month}.jpg`);
    const generated = await tryGenerateImage(prompt, imagePath);

    if (generated) {
      console.log(`  ✓ Image saved to ${imagePath}\n`);
      imagenAvailable = true;
    } else {
      console.log(`  → Prompt ready for manual generation\n`);
    }

    results.push({
      month: article.month,
      title: article.title,
      prompt,
      generated
    });

    // Rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save prompts to markdown file
  const promptsPath = path.join(outputDir, '2025-image-prompts.md');
  let content = '# 2025 Article Image Prompts\n\n';

  if (!imagenAvailable) {
    content += '> **Note**: Imagen API not available. Use these prompts in [Google AI Studio](https://aistudio.google.com) with Imagen 3.\n\n';
  }

  for (const r of results) {
    content += `## ${r.month}: ${r.title}\n\n`;
    if (r.generated) {
      content += `✅ Image generated: \`public/assets/journal/${r.month}.jpg\`\n\n`;
    }
    content += '```\n' + r.prompt + '\n```\n\n---\n\n';
  }

  fs.writeFileSync(promptsPath, content);
  console.log(`\n✅ Prompts saved to: ${promptsPath}`);

  if (!imagenAvailable) {
    console.log('\n📌 To generate images manually:');
    console.log('   1. Go to https://aistudio.google.com');
    console.log('   2. Select Imagen 3');
    console.log('   3. Paste each prompt');
    console.log('   4. Download and save to public/assets/journal/');
  }
}

main().catch(console.error);
