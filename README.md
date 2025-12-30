# Softworks Trading Company

AI Strategy, Governance, and Integration Advisory website.

**Live Site:** [sftwrks.com](https://www.sftwrks.com)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (build-time compilation)
- **Build:** Vite
- **Fonts:** Inter, Courier Prime, JetBrains Mono
- **Hosting:** Vercel (via GitHub Pages)
- **Image Generation:** Google Imagen 4

## Run Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
sftwrks/
├── src/
│   ├── index.css          # Tailwind directives + custom styles
│   └── constants.ts       # Site content and configuration
├── public/
│   └── assets/
│       ├── logos/         # Brand assets, OG cards
│       ├── sections/      # Section illustrations
│       ├── team/          # Team section imagery
│       └── journal/       # Article header images
├── scripts/
│   ├── generate-og-card.mjs      # OG preview card generation
│   ├── generate-section-images.mjs
│   └── optimize-images.mjs       # Image compression
├── App.tsx                # Main application component
├── index.html             # Entry point with SEO meta tags
└── index.tsx              # React entry point
```

## Image Generation

This project uses **Google Imagen 4** for generating illustrations.

### Available Models (December 2025)

| Model | Model ID | Best For |
|-------|----------|----------|
| **Imagen 4 Ultra** | `imagen-4.0-ultra-generate-001` | Highest quality |
| **Imagen 4** | `imagen-4.0-generate-001` | Balanced quality/speed |
| **Imagen 4 Fast** | `imagen-4.0-fast-generate-001` | Rapid iteration |

### Generation Example

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: 'Your prompt here' }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '16:9',
        personGeneration: 'allow_adult',
        outputOptions: { mimeType: 'image/png' }
      }
    })
  }
);

const data = await response.json();
const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
```

### Visual Style Guide

**Noir Paper-Cut Style** (matches site aesthetic):
```
Cinematic noir illustration with paper-cut layered effect.

STYLE:
- Paper-cut layered effect: distinct geometric layers with depth
- Cinematic noir: dramatic lighting, deep shadows
- Colors: Deep navy (#0A1628), Steel blue (#1E3A5F), Cyan (#00D4FF)
- Sharp geometric edges, abstract silhouettes
- NO text, NO realistic faces

SCENE: [describe your scene]
```

### Regenerate Images

```bash
# Section images (noir style)
source .env.local && node scripts/generate-section-images.mjs

# OG preview card
source .env.local && node scripts/generate-og-card.mjs

# Optimize all images
node scripts/optimize-images.mjs
```

## Performance

Optimizations implemented:
- Build-time Tailwind CSS compilation (removed 300KB+ CDN runtime)
- Font preloading with `preconnect` and `preload`
- Image compression (target <150KB per image)
- Static asset caching

## Dark Mode

Class-based dark mode configured in Tailwind v4:

```css
/* src/index.css */
@import "tailwindcss";
@variant dark (&:where(.dark, .dark *));
```

Toggle via `.dark` class on `<html>` element.

## Deployment

Automatic deployment via GitHub Actions on push to `main`:

```bash
git add . && git commit -m "Your message" && git push origin main
```

Pre-commit hooks run TypeScript checks and build verification.

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#0F172A` | Primary text, dark backgrounds |
| Navy Dark | `#0A1628` | Dark mode background |
| Steel | `#1E3A5F` | Secondary elements |
| Cyan | `#00D4FF` | Accent, highlights, CTAs |
| Slate | `#F1F5F9` | Light mode background |

---

Built by [Softworks Trading Company](https://www.sftwrks.com)
