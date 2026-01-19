# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## NEXT SESSION REMINDER (Jan 19, 2026)

**1. Generate infographic cards and images for the site!**
- Use Imagen 4 with the noir/papercut theme from hero image
- Create cards for: The 5-Step Path, Value Philosophy, Good Fit section
- Style: Deep navy (#0A1628), cyan accents (#00D4FF), layered paper cutout effect
- See plan file for detailed Imagen 4 prompts: `~/.claude/plans/tidy-greeting-honey.md`

**2. Fix Slack Integration**
- Form submissions go to Formspree but NOT to Slack yet
- Option A: Configure Formspree's Slack plugin (may need paid plan)
- Option B: Add Slack webhook directly

---

## Latest Session Report

**Date**: January 19, 2026 at 08:35 AM (Lagos Time)
**Site**: https://www.sftwrks.com

### Completed

1. **Time Value Calculator** - Complete rewrite of chat widget
   - 7-step conversational flow with 12 international currencies
   - "Something else" option with business-relevance validation
   - Word representation for large amounts (e.g., "350k to 700k")

2. **CSP Fix** - Form was blocked by Content Security Policy
   - Added `formspree.io` to `connect-src` and `form-action` in `vercel.json`
   - Form submissions now working

3. **Copy/UI Updates**
   - "May not fit if..." (shortened from long version)
   - Better icons, micro-interactions, warmer tone
   - 5-step "The Path" flow with connecting line

### Pending

- [ ] Slack integration for form submissions
- [ ] Generate noir-style infographic images
- [ ] Possible: AI deeper analysis option

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
