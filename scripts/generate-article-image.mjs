#!/usr/bin/env node
/**
 * Generate article images using Gemini AI
 * Usage: node scripts/generate-article-image.mjs "Article title" "output-filename"
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load env
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not set. Run: source .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Softworks brand style prompt
const BRAND_STYLE = `
Style: Modern, minimalist tech aesthetic
Colors: Navy blue (#0A1628, #0F172A), cyan accent (#00D4FF), steel blue (#1E3A5F)
Mood: Professional, forward-thinking, innovative
Elements: Abstract geometric shapes, subtle grid patterns, clean lines
Avoid: Faces, text, cluttered compositions, bright colors outside palette
Format: 16:9 aspect ratio, suitable for article header
`;

async function generateImage(title, outputName) {
  console.log(`🎨 Generating image for: "${title}"`);
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  // Generate image description first
  const descriptionPrompt = `Create a detailed image description for an article header image.
Article title: "${title}"
${BRAND_STYLE}

Describe a compelling, abstract visual that captures the essence of this article topic.
Keep it abstract and conceptual - no literal interpretations.
Output only the image description, nothing else.`;

  try {
    const descResult = await model.generateContent(descriptionPrompt);
    const imageDescription = descResult.response.text();
    console.log(`📝 Generated description: ${imageDescription.substring(0, 100)}...`);
    
    // For now, output the description (Gemini image gen requires Imagen model)
    const outputPath = path.join(process.cwd(), 'public/assets/journal', `${outputName}-prompt.txt`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `Title: ${title}\n\nImage Prompt:\n${imageDescription}`);
    
    console.log(`✅ Saved prompt to: ${outputPath}`);
    console.log(`\n📌 To generate image:`);
    console.log(`   1. Go to https://aistudio.google.com`);
    console.log(`   2. Select Imagen 3 model`);
    console.log(`   3. Paste the prompt from ${outputPath}`);
    console.log(`   4. Download and save to public/assets/journal/${outputName}.jpg`);
    
    return imageDescription;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// CLI
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node scripts/generate-article-image.mjs "Article Title" "output-filename"');
  console.log('Example: node scripts/generate-article-image.mjs "AI Trends 2024" "ai-trends-2024"');
  process.exit(1);
}

generateImage(args[0], args[1]);
