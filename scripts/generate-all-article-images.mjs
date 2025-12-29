#!/usr/bin/env node
/**
 * Generate all article images using Gemini AI
 * Run: GEMINI_API_KEY=xxx node scripts/generate-all-article-images.mjs
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set. Run: export GEMINI_API_KEY=your-key');
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

const ARTICLES = [
  {
    month: 'nov-2024',
    title: 'Voice AI Goes Enterprise',
    description: 'Abstract visualization of voice waves transforming into enterprise data streams. Sound wave patterns morphing into connected corporate networks. Cyan audio waveforms flowing through a dark blue digital infrastructure.'
  },
  {
    month: 'oct-2024',
    title: 'AI Got Hands - Computer Use',
    description: 'Abstract representation of AI controlling computer interfaces. Geometric hands made of light interacting with floating UI elements. Cyan wireframe hands reaching toward abstract screen interfaces in dark blue space.'
  },
  {
    month: 'sep-2024',
    title: 'NotebookLM and Reasoning Models',
    description: 'Abstract visualization of documents transforming into audio waves and thought processes. Papers and text fragmenting into podcast waveforms and neural connection patterns. Deep blue background with cyan glowing thought pathways.'
  },
  {
    month: 'aug-2024',
    title: 'Fair Use and Legal Frameworks',
    description: 'Abstract scales of justice made of digital code and musical notes. Balance scales constructed from binary data streams and sound frequencies. Navy and cyan geometric legal/tech fusion imagery.'
  },
  {
    month: 'jul-2024',
    title: 'Open Source Goes Big',
    description: 'Abstract representation of open networks expanding. Interconnected nodes spreading outward in an organic pattern. Dark blue background with cyan glowing connection points forming an expanding mesh.'
  },
  {
    month: 'jun-2024',
    title: 'Claude Gets Artifacts',
    description: 'Abstract visualization of code artifacts materializing from conversation. Geometric shapes forming into functional components. Dark space with cyan light constructing abstract technical structures.'
  },
  {
    month: 'may-2024',
    title: 'GPT-4o Goes Free',
    description: 'Abstract representation of AI accessibility explosion. Barriers dissolving into particles, gateway opening wide. Navy blue barriers fragmenting with cyan light flooding through.'
  },
  {
    month: 'apr-2024',
    title: 'Open Source Explosion',
    description: 'Abstract visualization of open-source proliferation. Seeds of light spreading and growing into a forest of connected nodes. Dark blue background with cyan points of light multiplying.'
  }
];

async function generateImagePrompt(article) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Create a detailed, specific image generation prompt for this article header:

Article: "${article.title}"
Concept: ${article.description}

${BRAND_STYLE}

Output ONLY the image prompt, nothing else. Make it detailed and specific for best AI image generation results.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`Error generating prompt for ${article.month}:`, error.message);
    return article.description;
  }
}

async function main() {
  console.log('Generating image prompts for all articles...\n');

  const outputDir = path.join(process.cwd(), 'public/assets/journal');
  fs.mkdirSync(outputDir, { recursive: true });

  const prompts = [];

  for (const article of ARTICLES) {
    console.log(`Generating prompt for ${article.month}...`);
    const prompt = await generateImagePrompt(article);
    prompts.push({ month: article.month, title: article.title, prompt });
    console.log(`  Done: ${prompt.substring(0, 80)}...\n`);

    // Rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Save all prompts to a file
  const outputPath = path.join(outputDir, 'image-prompts.md');
  let content = '# Article Image Generation Prompts\n\n';
  content += 'Use these prompts in Google AI Studio with Imagen 3 to generate images.\n\n';

  for (const p of prompts) {
    content += `## ${p.month}: ${p.title}\n\n`;
    content += '```\n' + p.prompt + '\n```\n\n';
    content += `Save as: public/assets/journal/${p.month}.jpg\n\n---\n\n`;
  }

  fs.writeFileSync(outputPath, content);
  console.log(`\nAll prompts saved to: ${outputPath}`);
  console.log('\nTo generate images:');
  console.log('1. Open https://aistudio.google.com');
  console.log('2. Select Imagen 3 model');
  console.log('3. Paste each prompt');
  console.log('4. Download and save to public/assets/journal/');
}

main().catch(console.error);
