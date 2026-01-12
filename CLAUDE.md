# Softworks Website - Claude Code Instructions

## Identity

**Softworks is an AI consulting firm, NOT a trading company.**
- Brand name: Softworks
- Legal name: Softworks Trading Company
- Primary email: fred@sftwrks.com (casual)
- Formal email: fred@softworkstrading.com (invoices/contracts)

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Type check | `npx tsc --noEmit` |
| Deploy | `bash ~/.claude/skills/softworks-site-manager/scripts/deploy.sh "message"` |
| Add article | `python3 ~/.claude/skills/softworks-site-manager/scripts/add-article.py` |
| Health check | `bash ~/.claude/skills/softworks-site-manager/scripts/health-check.sh` |

## Available Skills

### softworks-site-manager
Manages this website. Use for:
- Adding/editing journal articles, case studies, team content
- Deploying to production
- SEO meta tags, Open Graph images
- Site health monitoring
- Image asset management

### frederick-ecosystem
Full business context. Use for:
- Cross-venture decisions (Pitch Film, PrePurchasePro, tiwa.ai)
- Pricing philosophy
- Communication style
- Technical stack preferences

## Persistent Tasks: Use /ralphloop

For complex, multi-step work:

```
/ralphloop Add new case study. Done when: content added, images generated, deployed, health check passes.
/ralphloop Optimize performance. Done when: Lighthouse score >90, build <500KB.
/ralphloop Fix SEO issues. Done when: all meta tags valid, schema markup correct, sitemap updated.
```

**Why:** ralphloop uses checkpoint validation - survives context compaction, catches issues at phase boundaries.

## Verification Tips (Boris Cherny)

1. **Always verify work** - Run build, type check, or tests after changes
2. **Use Plan Mode** - Shift+Tab twice for non-trivial changes
3. **Add mistakes here** - Document errors so Claude learns

### Pre-Deploy Checklist
```bash
npm run build           # Must pass
npx tsc --noEmit        # No type errors
# Then deploy
```

## Design System (DO NOT MODIFY without approval)

| Element | Value |
|---------|-------|
| Navy Dark | #0A1628 |
| Cyan Glow | #00D4FF |
| Headings | Courier Prime |
| Body | Inter |
| Header | "SOFTWORKS" text only |

## Content Guidelines

- 7-8th grade reading level
- Outcome-focused, not tech jargon
- Reference: B2B-THOUGHT-LEADERSHIP-STYLE-GUIDE.md

## Key Files

| File | Purpose |
|------|---------|
| src/constants.ts | All content: articles, case studies, services |
| index.html | SEO meta, OG images, JSON-LD schema |
| SOFTWORKS.md | Business source of truth |
| B2B-THOUGHT-LEADERSHIP-STYLE-GUIDE.md | Content voice |

## Related Projects

| Project | Location | Purpose |
|---------|----------|---------|
| n8n automation | ~/softworks-n8n | Workflow automation |
| AI toolkit | ~/softworks-toolkit | Media production tools |
| Launchpad | ~/launchpad | Project factory, core skills |

## Common Workflows

### Add Journal Article
```
/ralphloop Add article about [topic]. Done when: added to constants.ts, image generated, build passes, deployed.
```

### Update Case Study
1. Edit src/constants.ts
2. Generate new image if needed (see IMAGE_GENERATION_PROMPTS.md)
3. Run health check
4. Deploy

### Site Maintenance
```bash
bash ~/.claude/skills/softworks-site-manager/scripts/health-check.sh
```

## Mistakes Log

*Add errors here so Claude learns from them:*

- [2026-01-12] Don't assume "trading company" relates to stocks - it's AI consulting
- [Add more as discovered]

## Environment Variables

Required in Vercel:
- GEMINI_API_KEY
- ANTHROPIC_API_KEY
