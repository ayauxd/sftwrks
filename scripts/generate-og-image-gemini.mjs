#!/usr/bin/env node
/**
 * Generate OG Preview Image using Gemini Imagen 3
 * Run: node scripts/generate-og-image-gemini.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'public/assets/logos');

// Gemini API key from environment - NEVER hardcode API keys!
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is required.');
  console.error('Set it in your .env.local file or export it before running.');
  process.exit(1);
}

async function generateOGImage() {
  console.log('Generating OG preview image with Gemini Imagen 3...\n');

  const prompt = `Create a professional OG preview image (1200x630 pixels, landscape orientation) for a tech consulting company called "Softworks Trading Company" (brand name "SOFTWORKS").

Key visual elements:
- A 3D isometric chrome/metallic cube forming the letter "S" with blue glowing accents and chrome pipes/tubes
- Clean, modern tech aesthetic with subtle circuit board or grid patterns
- Color palette: Navy blue (#0F172A) background, cyan/teal accents (#00D4FF), chrome/silver metallic highlights
- Professional business consulting vibe, not gaming or consumer tech
- Light gray or white gradient overlay on the right side for text readability

Text to include (positioned on the right side):
- "SOFTWORKS" as the brand name (large, bold)
- "AI that works for your business" as tagline (smaller, below brand)
- "www.sftwrks.com" small at the bottom

Style: Premium, minimalist, sophisticated. Similar to high-end fintech or enterprise software companies. The 3D cube logo should be the hero element on the left, with text on the right.

Important: The image must be clean and professional, suitable for sharing on LinkedIn, Twitter, and Facebook. No busy backgrounds or cluttered elements.`;

  try {
    // Use Imagen 3 endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            safetyFilterLevel: 'block_only_high',
            personGeneration: 'dont_allow',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);

      // Try alternative endpoint
      console.log('\nTrying alternative Gemini 3 Pro Image endpoint...');
      return await tryGemini3ProImage(prompt);
    }

    const data = await response.json();

    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      const outputPath = path.join(outputDir, 'og-preview-landscape-gemini.png');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`✓ OG image saved to: ${outputPath}`);
      console.log(`  Size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
      return outputPath;
    } else {
      console.error('Unexpected response format:', JSON.stringify(data, null, 2));
      return await tryGemini3ProImage(prompt);
    }
  } catch (error) {
    console.error('Error generating image:', error.message);
    return await tryGemini3ProImage(prompt);
  }
}

async function tryGemini3ProImage(prompt) {
  console.log('Attempting with gemini-2.0-flash-exp for image generation...\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate an image: ${prompt}`
            }]
          }],
          generationConfig: {
            responseModalities: ['image', 'text'],
            responseMimeType: 'image/png'
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini 2.0 Error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log('Response structure:', JSON.stringify(Object.keys(data), null, 2));

    // Check for inline image data
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const parts = data.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          const outputPath = path.join(outputDir, 'og-preview-landscape-gemini.png');
          fs.writeFileSync(outputPath, imageBuffer);
          console.log(`✓ OG image saved to: ${outputPath}`);
          console.log(`  Size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
          return outputPath;
        }
      }
    }

    console.log('Full response:', JSON.stringify(data, null, 2).substring(0, 1000));
    return null;
  } catch (error) {
    console.error('Error with Gemini 2.0:', error.message);
    return null;
  }
}

generateOGImage().then(result => {
  if (result) {
    console.log('\n✓ Image generation complete!');
    console.log('Next steps:');
    console.log('1. Review the generated image');
    console.log('2. If satisfactory, rename to og-preview-landscape.png');
    console.log('3. Deploy to production');
  } else {
    console.log('\n✗ Image generation failed.');
    console.log('You may need to use the Google AI Studio UI directly.');
  }
});
