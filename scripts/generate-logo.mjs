import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyA287aJTHSfYxwZ4Q-8ztmX48hlQHUXjdQ';

async function generateLogo() {
  const prompt = `Create a premium, minimalist 3D logo for "Softworks Trading Company", an AI consultancy firm.

Design specifications:
- Modern 3D geometric design with clean lines
- Primary element: An abstract "S" shape formed by interlocking geometric forms (cubes, hexagons, or flowing ribbons)
- The S should suggest technology, data flow, and precision
- Color palette: Deep navy blue (#0A1628) background with cyan accent (#00D4FF) highlights
- Subtle metallic/glass material effect on the 3D elements
- Professional, corporate feel - think Apple + consulting firm aesthetic
- The logo should work as a standalone mark without text
- Clean edges, no artifacts, no rough background removal
- Square aspect ratio (1:1)
- Render on a solid dark navy (#0A1628) background that seamlessly blends

Style: Luxury-tech, silicon valley aesthetic, premium B2B brand`;

  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + API_KEY;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseModalities: ["image", "text"],
          responseMimeType: "text/plain"
        }
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, 'base64');
          const outputPath = path.join(process.cwd(), 'public/assets/sections/softworks-brand-logo.png');
          fs.writeFileSync(outputPath, buffer);
          console.log('Logo saved to:', outputPath);
          return true;
        }
      }
    }

    console.log('No image in response:', JSON.stringify(data, null, 2).slice(0, 500));
    return false;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

generateLogo();
