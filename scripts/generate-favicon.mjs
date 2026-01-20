import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateFavicon() {
  console.log('Generating favicon with Gemini 3 Pro...');
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
  });

  const prompt = `Create a simple, clean favicon icon of the letter "S" made of 3D blocks/cubes connected by glowing cyan lines. 
  
  Requirements:
  - Dark navy blue background (#0A1628)
  - Cubes should be dark gray/charcoal 
  - Cyan glowing connections (#00D4FF) between the blocks
  - The "S" should be clearly recognizable
  - Simple enough to work at 32x32 pixels
  - Square format, centered
  - No text, just the S icon
  - Professional, tech company aesthetic`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        
        // Save original
        const originalPath = path.join(process.cwd(), 'public/assets/logos/favicon-new-512.png');
        await sharp(buffer)
          .resize(512, 512, { fit: 'cover' })
          .png()
          .toFile(originalPath);
        console.log('Saved 512x512:', originalPath);
        
        // Create 32x32
        const favicon32Path = path.join(process.cwd(), 'public/assets/logos/favicon-32x32-new.png');
        await sharp(buffer)
          .resize(32, 32, { fit: 'cover' })
          .png()
          .toFile(favicon32Path);
        console.log('Saved 32x32:', favicon32Path);
        
        // Create ICO (using PNG as base)
        const faviconIcoPath = path.join(process.cwd(), 'public/favicon-new.ico');
        await sharp(buffer)
          .resize(48, 48, { fit: 'cover' })
          .png()
          .toFile(faviconIcoPath.replace('.ico', '.png'));
        console.log('Saved ICO base:', faviconIcoPath);
        
        return;
      }
    }
    console.log('No image generated');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateFavicon();
