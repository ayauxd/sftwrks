# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Identity

**Softworks is an AI consulting firm, NOT a trading company.**
- Brand name: Softworks
- Legal name: Softworks Trading Company
- Primary email: fred@sftwrks.com (casual) / fred@softworkstrading.com (formal)

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

## Mistakes Log

- [2026-01-12] Don't assume "trading company" relates to stocks - it's AI consulting
