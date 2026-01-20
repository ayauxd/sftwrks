# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## NEXT SESSION REMINDER (Jan 20, 2026)

**All Images Complete!**
- Case studies: 4 images
- Journal articles: 13 images
- Homepage sections: 5 images
- Path step cards: 5 images (NEW)
- Total: ~1MB optimized webp

**Remaining Tasks:**
1. Fix Slack Integration (Formspree plugin or direct webhook)
2. Article OG images (requires SSR or Vercel OG API)

---

## Latest Session Report

**Date**: January 20, 2026 at 12:30 PM (Lagos Time)
**Site**: https://www.sftwrks.com

### Completed

1. **ALL Homepage Section Images Regenerated** - Noir paper-cut style throughout
   - Model: `gemini-3-pro-image-preview` (Gemini 3 Pro)
   - Style: Cinematic noir paper-cut diorama, dark navy (#0A1628), warm amber spotlight, cyan glow (#00D4FF)

2. **Case Study Images** (4 images, 191KB total)
   - logistics-noir.webp: Document chaos → sorting machine
   - finance-noir.webp: Two AI brains verifying
   - accounting-noir.webp: Voice → content pipeline
   - photobooth-noir.webp: Photo transformation machine

3. **Journal Article Images** (13 images, 649KB total)
   - All monthly articles from Jan 2025 to Jan 2026

4. **Homepage Section Images** (5 images, 195KB total)
   - challenge-noir.webp: Broken process accelerating (The Real Problem)
   - strategy-card.webp: Magnifying glass on flowchart (Find the Constraint)
   - governance-card.webp: Focused construction (Build the System)
   - integration-card.webp: Key handover (Hand It Over)
   - team-workflow-noir.webp: Human-AI collaboration (Team section)

5. **Path Step Card Images** (5 images, 35KB total) - NEW
   - step-01-map.webp: Discovery and mapping
   - step-02-value.webp: Calculation and ROI
   - step-03-scope.webp: Agreement and clarity
   - step-04-build.webp: Construction in progress
   - step-05-handover.webp: Completion and transfer
   - Features.tsx updated to display images in all step cards

2. **Image Generation Scripts Created**
   - `scripts/generate-case-studies-replicate.mjs` - Replicate/Flux Schnell
   - `scripts/generate-single-case-study.mjs` - Single image via Replicate
   - `scripts/generate-case-study-images.mjs` - Gemini (updated)

3. **Previous Session Work**
   - "The Path" section redesign with two-phase layout
   - Mobile menu dark theme redesign
   - Mobile horizontal scroll fix
   - Case study content redaction (pricing, tech details)
   - Hero image retina fix (2x srcSet)

### Image Generation Reference

**Recommended approach:** Gemini 3 Pro Image
```bash
# Model to use
gemini-3-pro-image-preview

# Style base for all images
STYLE = 'Cinematic noir paper-cut diorama style. Dark navy background, warm amber spotlight from above, layered cardstock textures, subtle cyan glow accent. Premium editorial quality. No text, no human figures.'

# Generate with prompt reflecting actual content
const model = genAI.getGenerativeModel({
  model: 'gemini-3-pro-image-preview',
  generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
});
```

**Case study images generated:**
| Case Study | Content | Size |
|------------|---------|------|
| logistics-noir.webp | Document chaos → sorting machine → organized output | 39KB |
| finance-noir.webp | Two AI brains verifying each other | 70KB |
| accounting-noir.webp | Voice → content pipeline → social videos | 35KB |
| photobooth-noir.webp | Photos → imagination chamber → adventure scenes | 47KB |

**Journal article images generated (13 total):**
| Article | Content | Size |
|---------|---------|------|
| jan-2026.webp | Payment infrastructure fragility, dissolving cards | 39KB |
| dec-2025.webp | AI as infrastructure, utility poles with data streams | 39KB |
| nov-2025.webp | Three competing AI monuments (Gemini/Claude/GPT) | 66KB |
| oct-2025.webp | Solo desk with multiple outputs emanating | 69KB |
| sep-2025.webp | Massive data center buildout, power infrastructure | 55KB |
| aug-2025.webp | Expanding book/brain, unlocked potential | 63KB |
| jul-2025.webp | Diverging paths (95% fail, 5% succeed) | 39KB |
| jun-2025.webp | Talent bidding war, figures pulled in directions | 44KB |
| may-2025.webp | Speech bubbles transforming to code | 56KB |
| apr-2025.webp | Dramatic growth chart, investment surge | 53KB |
| mar-2025.webp | Exponential staircase, doubling capability | 37KB |
| feb-2025.webp | Scales of justice, EU regulation | 31KB |
| jan-2025.webp | Seed/spark of emergence, dawn/promise | 58KB |

**Total image sizes:** Case studies 191KB + Journal 649KB = **840KB**

### Pending

- [ ] Slack integration for form submissions
- [ ] OG images for articles (requires SSR or API route - see note below)
- [ ] Possible: AI deeper analysis option

### Note: Article OG Images

Currently, sharing article links shows the default homepage OG image because this is a client-side React SPA. Social media crawlers don't execute JavaScript, so they only see the static meta tags in index.html.

**Solutions (in order of complexity):**
1. **Vercel OG Image Generation** - Create an API route that generates dynamic OG images
2. **Pre-rendering** - Use a service like Prerender.io
3. **SSR Migration** - Convert to Next.js or similar

For now, all articles share the main site OG image.

---

## Identity

**Softworks is an AI consulting firm, NOT a trading company.**
- Brand name: Softworks
- Legal name: Softworks Trading Company
- **Primary domain: sftwrks.com** (always deploy here)
- Legacy domain: softworkstrading.com (expiring, do not use)
- Primary email: fred@sftwrks.com

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (runs on port 3000) |
| Build | `npm run build` |
| Type check | `npx tsc --noEmit` |
| Preview | `npm run preview` |
| Deploy | `bash ~/.claude/skills/softworks-site-manager/scripts/deploy.sh "message"` |
| Add article | `python3 ~/.claude/skills/softworks-site-manager/scripts/add-article.py` |
| Health check | `bash ~/.claude/skills/softworks-site-manager/scripts/health-check.sh` |

### Image Generation

```bash
# Section images (noir style)
source .env.local && node scripts/generate-section-images.mjs

# OG preview card
source .env.local && node scripts/generate-og-card.mjs

# Optimize all images
node scripts/optimize-images.mjs
```

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4

### File Structure

```
sftwrks/
├── App.tsx              # Main app: routing state, theme, section rendering
├── index.tsx            # React entry point
├── index.html           # SEO meta, OG images, JSON-LD schema
├── constants.ts         # ALL content: CASE_STUDIES, JOURNAL_ARTICLES, INITIATIVES
├── types.ts             # TypeScript interfaces: CaseStudy, JournalArticle, Initiative
├── design-tokens.ts     # Brand colors and design tokens
├── components/
│   ├── Hero.tsx         # Landing section with CTA
│   ├── About.tsx        # Problem/solution messaging
│   ├── Team.tsx         # Team section
│   ├── Assistant.tsx    # AI assessment chatbot (uses Anthropic API)
│   ├── CaseStudyDetail.tsx / CaseStudiesList.tsx
│   ├── JournalDetail.tsx / InsightsList.tsx
│   ├── Media.tsx        # Media/press page
│   └── Navbar.tsx / Footer.tsx
├── src/index.css        # Tailwind directives + custom CSS (fonts, animations)
├── scripts/             # Image generation scripts (Imagen 4)
└── public/assets/       # logos/, sections/, team/, journal/
```

### State Management

The app uses React state in `App.tsx` for all navigation:
- `selectedCaseStudy` / `selectedArticle` - Detail view rendering
- `showInsightsList` / `showCaseStudiesList` - List views
- `showMedia` - Media page
- `isAssessmentOpen` - AI chatbot modal
- `isDark` - Theme toggle (persisted to localStorage)

No router library - navigation is handled via state changes and conditional rendering.

### Content System

All content lives in `constants.ts`:
- `CASE_STUDIES: CaseStudy[]` - Client work with HTML content
- `JOURNAL_ARTICLES: JournalArticle[]` - Monthly insights with HTML content
- `INITIATIVES: Initiative[]` - Related ventures

To add content: Edit `constants.ts`, generate image if needed, build, deploy.

## Available Skills

### softworks-site-manager
Use for: journal articles, case studies, deployments, SEO, health checks

### frederick-ecosystem
Use for: cross-venture decisions, pricing, communication style

### /ralphloop
For complex multi-step work with checkpoint validation:
```
/ralphloop Add new case study. Done when: added to constants.ts, image generated, deployed.
```

## Design System (DO NOT MODIFY)

| Element | Value |
|---------|-------|
| Navy Dark | #0A1628 |
| Cyan Glow | #00D4FF |
| Headings | Courier Prime |
| Body | Inter |
| Mono | JetBrains Mono |

## Content Guidelines

- 7-8th grade reading level
- Outcome-focused, not tech jargon
- Reference: B2B-THOUGHT-LEADERSHIP-STYLE-GUIDE.md

## Pre-Deploy Checklist

```bash
npm run build           # Must pass
npx tsc --noEmit        # No type errors
# Then deploy
```

## Environment Variables

Required in `.env.local` (dev) and Vercel (prod):
- `GEMINI_API_KEY` - Image generation
- `ANTHROPIC_API_KEY` - AI assistant

**Important:** Use unrestricted keys for local dev, restricted keys for production. See `docs/API_KEY_MANAGEMENT.md` for setup guide.

## Donovan Protocol

> See global: `~/.claude/CLAUDE.md`

When detecting frustration (3+ failures, terse messages, version hell), suggest documented solutions over continued debugging.

## Mistakes Log

- [2026-01-12] Don't assume "trading company" relates to stocks - it's AI consulting
- [2026-01-18] Always use sftwrks.com - softworkstrading.com is being retired
- [2026-01-19] CSP blocked Formspree - always add external API domains to `connect-src` in vercel.json
