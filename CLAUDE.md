# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Latest Session Report

**Date**: January 20, 2026 at 6:00 PM (Lagos Time)
**Site**: https://www.sftwrks.com

### Completed This Session

1. **Time Value Calculator UX Improvements**
   - Team size now affects calculation (30-40% → 60-75% based on team)
   - Added cost estimation helper with challenge-specific formulas
   - Added goal-tailored results messaging
   - Replaced "constraint" jargon with "process" throughout
   - Better popup copy: "Losing hours to work that should run itself?"

2. **Slack Integration** - Form submissions now notify `#leads` channel
   - Formatted message with name, email, challenge, team size, cost, goal, recovery range
   - Uses Slack Incoming Webhook (non-blocking, graceful failure)

3. **URL Fixes** - Case study URLs now update when clicked (shareable)

4. **Image Cache Fix** - Added `?v=2` to case study images for cache busting

### All Systems Operational

- Shareable URLs with OG tags
- Noir images throughout
- Form → Formspree → Email + Slack
- Time Value Calculator fully functional

---

## Shareable URLs (STANDARD - DO NOT CHANGE)

All pages have clean, shareable URLs with proper OG tags. This is the **industry-standard implementation**.

### URL Structure

| Page Type | Shareable URL | Example |
|-----------|---------------|---------|
| Article | `/article/{id}` | `sftwrks.com/article/ai-jan-2026` |
| Case Study | `/case-study/{id}` | `sftwrks.com/case-study/cs1` |
| Journal List | `/journal` | `sftwrks.com/journal` |
| Case Studies List | `/case-studies` | `sftwrks.com/case-studies` |
| Media | `/media` | `sftwrks.com/media` |
| Homepage | `/` | `sftwrks.com` |

### How It Works

1. **Vercel rewrites** (in `vercel.json`) route clean URLs to API handlers
2. **API handlers** (in `api/og/`) return HTML with proper OG meta tags
3. **Meta refresh** redirects users to the hash-based SPA route
4. Social crawlers see OG tags; users land on correct page

### Files

```
api/og/
├── [type]/[id].ts    # Articles and case studies
└── page/[page].ts    # Static pages (journal, case-studies, media)
```

### Adding New Content

**When adding a new article:**
1. Add to `constants.ts` (as usual)
2. Add entry to `api/og/[type]/[id].ts` ARTICLES object:
```typescript
'ai-feb-2026': {
  title: 'Article Title Here',
  excerpt: 'Compelling 1-2 sentence description.',
  image: '/assets/journal/feb-2026.webp',
},
```
3. Generate image, deploy

**When adding a new case study:**
1. Add to `constants.ts` (as usual)
2. Add entry to `api/og/[type]/[id].ts` CASE_STUDIES object:
```typescript
'cs6': {
  title: 'Case Study Title',
  summary: 'Outcome-focused description with metrics.',
  image: '/assets/case-studies/new-case-study.webp',
  client: 'Client Name',
},
```
3. Generate image, deploy

### OG Tag Standards

- **Title:** Under 60 chars, ends with `| Softworks`
- **Description:** Under 155 chars, action-oriented, outcome-focused
- **Image:** 1200x630 recommended, webp format with `?v=2` cache busting
- **URL:** Clean canonical URL (no hash)

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
# Model to use
gemini-3-pro-image-preview

# Style base for all images
STYLE = 'Cinematic noir paper-cut diorama style. Dark navy background, warm amber spotlight from above, layered cardstock textures, subtle cyan glow accent. Premium editorial quality. No text, no human figures.'
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
├── types.ts             # TypeScript interfaces
├── api/
│   ├── anthropic.ts     # AI assistant API
│   └── og/              # OG tag API handlers (shareable URLs)
│       ├── [type]/[id].ts   # Articles & case studies
│       └── page/[page].ts   # Static pages
├── components/          # React components
├── src/index.css        # Tailwind + custom CSS
├── scripts/             # Image generation scripts
└── public/assets/       # logos/, sections/, team/, journal/, case-studies/
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

To add content: Edit `constants.ts`, add OG entry to API, generate image, build, deploy.

## Design System (DO NOT MODIFY)

| Element | Value |
|---------|-------|
| Navy Dark | #0A1628 |
| Cyan Glow | #00D4FF |
| Headings | Courier Prime |
| Body | Inter |
| Mono | JetBrains Mono |
| Logo | Nunito (font-black) |

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
- `VITE_SLACK_WEBHOOK_URL` - Slack notifications for calculator submissions (#leads channel)

## Mistakes Log

- [2026-01-12] Don't assume "trading company" relates to stocks - it's AI consulting
- [2026-01-18] Always use sftwrks.com - softworkstrading.com is being retired
- [2026-01-19] CSP blocked Formspree - always add external API domains to `connect-src` in vercel.json
- [2026-01-20] When adding new articles/case studies, MUST also add OG entry to `api/og/[type]/[id].ts`
