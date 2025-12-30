# Softworks Trading Company

AI Strategy, Governance, and Integration Advisory website.

**Live Site:** [softworkstrading.com](https://softworkstrading.com)

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app: `npm run dev`
4. Build for production: `npm run build`

---

## Image Generation

This project uses Google's Gemini API for generating illustrations. Below is the research on current models (December 2025).

### Current Models (Recommended)

| Model | Model ID | Best For | Pricing |
|-------|----------|----------|---------|
| **Gemini 3 Pro Image** (Nano Banana Pro) | `gemini-3-pro-image-preview` | Highest quality, 4K output, text rendering | $0.134/image (1K-2K), $0.24/image (4K) |
| **Gemini 2.5 Flash Image** (Nano Banana) | `gemini-2.5-flash-image` | Fast, cost-effective, stable | Free tier available |

### Deprecated/Legacy Models

| Model | Status | Notes |
|-------|--------|-------|
| `gemini-2.0-flash-exp` | Deprecated Sept 2025 | Still works but quality degraded after May 2025 updates |
| `gemini-2.0-flash-preview-image-generation` | Legacy | Not available in EU/MEA regions |
| `imagen-3.0-generate-001` | Vertex AI Only | Requires GCP Vertex AI, not available via standard Gemini API |

### Migration Guide

**From `gemini-2.0-flash-exp` to `gemini-3-pro-image-preview`:**

```javascript
// OLD (deprecated)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    responseModalities: ['TEXT', 'IMAGE']
  }
});

// NEW (recommended - December 2025)
const model = genAI.getGenerativeModel({
  model: 'gemini-3-pro-image-preview',
  generationConfig: {
    responseModalities: ['TEXT', 'IMAGE']
  }
});

// Or use the new SDK pattern
import { GoogleGenAI } from '@google/genai';
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await client.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents: [{ role: 'user', parts: [{ text: prompt }] }],
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
    imageConfig: {
      aspectRatio: '16:9',
      outputSize: '2K'  // Options: '1K', '2K', '4K'
    }
  }
});
```

### Key Features by Model

**Gemini 3 Pro Image (Nano Banana Pro):**
- High-resolution output: 1K, 2K, 4K
- Advanced text rendering (legible, stylized text)
- Up to 14 reference images for character consistency
- Google Search grounding for real-time data
- Best for: professional asset production, illustrations with text

**Gemini 2.5 Flash Image (Nano Banana):**
- Fast generation
- Good for rapid iteration
- Free tier in AI Studio
- Best for: prototyping, high-volume generation

### Aspect Ratios Supported

Both models support: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`

### Image Generation Scripts

Located in `scripts/`:

- `generate-sections-noir.mjs` - Challenge and Team section images (noir paper-cut style)
- `generate-imagen3.mjs` - Legacy Imagen 3 attempt (requires Vertex AI)
- `generate-imagen3-v2.mjs` - Fallback script with improved prompts

**To regenerate images:**
```bash
source .env.local && node scripts/generate-sections-noir.mjs
```

### Prompt Best Practice

From Google's documentation: "Describe the scene, don't just list keywords."

Our proven noir paper-cut style template:
```
Create a cinematic noir style illustration with paper-cut layered effect.

REQUIRED STYLE:
- Cinematic noir aesthetic: dramatic lighting, deep shadows, film noir mood
- Paper-cut/layered effect: distinct layers with depth, like cut paper art
- Color palette: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan accent (#00D4FF)
- High contrast between light and dark areas
- NO text, NO faces, NO photorealistic elements

SPECIFIC VISUAL: [describe scene here]
```

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS (CDN)
- **Build:** Vite
- **Fonts:** Inter, Courier Prime, JetBrains Mono
- **Hosting:** Vercel

## Sources

Research conducted December 2025:

- [Gemini 3 Flash Announcement](https://blog.google/products/gemini/gemini-3-flash/)
- [Gemini 3 Developer Guide](https://ai.google.dev/gemini-api/docs/gemini-3)
- [Image Generation with Gemini](https://ai.google.dev/gemini-api/docs/image-generation)
- [Gemini Models Documentation](https://ai.google.dev/gemini-api/docs/models)
- [Gemini Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [Nano Banana Pro Tutorial](https://www.cometapi.com/how-to-use-the-nano-banana-pro-api/)
- [Raymond Camden's Model Comparison](https://www.raymondcamden.com/2025/04/08/comparing-googles-image-generation-models)
