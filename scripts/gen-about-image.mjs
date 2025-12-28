/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function generateImage() {
  console.log("Generating impactful About section image...");

  const prompt = `Cinematic wide shot of a business professional standing at a crossroads in a futuristic digital landscape.
On the left side: chaotic tangled glowing data streams, fragmented circuits, and scattered nodes representing AI complexity and confusion.
On the right side: clean organized data flows, structured pathways, and harmonious connections representing clarity and success.
The figure is in silhouette, contemplating the choice ahead.
Cool blue-cyan color palette dominant with navy (#0A1628) as the primary dark color and cyan (#00D4FF) as accent.
Dramatic volumetric lighting, subtle lens flare, corporate aesthetic, photorealistic quality.
16:9 aspect ratio. No text or watermarks.`;

  try {
    // Use Gemini 2.0 Flash for image generation
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    // Check for generated images
    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          const outputPath = path.join(
            projectRoot,
            "public/assets/sections/about-challenge.png"
          );

          // Ensure directory exists
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, "base64"));
          console.log(`Image saved to: ${outputPath}`);
          return;
        }
      }
    }

    console.error("No image found in response");
    console.log("Full response:", JSON.stringify(response, null, 2).slice(0, 2000));

  } catch (error) {
    console.error("Error:", error.message);

    // Provide fallback instructions
    console.log("\n\n=== MANUAL GENERATION INSTRUCTIONS ===");
    console.log("Generate this image at https://aistudio.google.com using Imagen 3:");
    console.log("\n---PROMPT---");
    console.log(prompt);
    console.log("---END PROMPT---\n");
    console.log("Save the image to: public/assets/sections/about-challenge.png");
    process.exit(1);
  }
}

generateImage();
