# Softworks - Source of Truth

**Legal Name:** Softworks Trading Company
**Brand Name:** Softworks
**Domain:** www.sftwrks.com (redirects to softworkstrading.com)
**Founder:** Frederick Aya

## Identity

**What We Do:** AI consulting firm helping businesses transition from AI confusion to practical results.

**Tagline:** "AI that works for your business"

**We Are NOT:** A stock trading company, commodity trader, or financial services firm.

## Contact

| Purpose | Address |
|---------|---------|
| Primary (casual/business) | fred@sftwrks.com |
| Formal (invoices/contracts) | fred@softworkstrading.com |
| General inquiries | agents@softworkstrading.com |

## Services

Three pillars:
1. **Strategy** - Identifying AI opportunities
2. **Governance** - Establishing AI safeguards and protocols
3. **Integration** - Embedding AI into existing workflows

## Target Market

- Mid-market enterprises ($500K-$20M revenue)
- Growth-stage startups
- Professional services firms
- C-suite executives, practice owners, 45-65 years old
- Worldwide clients (US-based)

## Ventures

| Venture | Domain | Email | Purpose |
|---------|--------|-------|---------|
| Pitch Film Studio | pitchfilmstudio.com | fred@pitchfilmstudio.com | Media production |
| PrePurchasePro | prepurchasepro.com | contact@prepurchasepro.com | Vehicle inspection |
| tiwa.ai | tiwa.ai | hello@tiwa.ai | Customized AI assistance |
| CBAH Organization | - | - | Community network |

## Infrastructure

| System | Purpose | Location |
|--------|---------|----------|
| Website | Public face | ~/sftwrks → sftwrks.com |
| Automation | Lead/content/client ops | ~/softworks-n8n |
| AI Toolkit | Media production | ~/softworks-toolkit |
| Launchpad | Project factory | ~/launchpad |

## Key Documents

| Document | Purpose |
|----------|---------|
| B2B-THOUGHT-LEADERSHIP-STYLE-GUIDE.md | Content voice and strategy |
| COPYWRITING_OVERHAUL_PLAN.md | Messaging framework |
| IMAGE_GENERATION_PROMPTS.md | Visual brand guidelines |

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-12 | Use fred@sftwrks.com as primary email | "Trading Company" sounds like finance, not AI consulting |
| 2026-01-12 | Keep softworkstrading.com for formal docs | Legal continuity, SEO authority |
| 2026-01-12 | sftwrks.com as Domain Alias | All team members auto-get @sftwrks.com addresses |
| 2026-01-12 | Venture domains as Secondary | Assign specific people to specific ventures |
| 2026-01-12 | Single Google Workspace for all domains | Cost efficiency ($0 per additional domain) |
| 2025-12-28 | Deploy to Vercel free tier | Low traffic, cost efficiency |

## Brand Voice

- Outcome-focused, not tech jargon
- 7-8th grade reading level
- Confident but not arrogant
- Practical, not theoretical
- Reference: B2B-THOUGHT-LEADERSHIP-STYLE-GUIDE.md

## Pricing

- Tier: Mid-range ($$)
- Model: Custom quotation per engagement
- No public pricing page (intentional)

## Team

| Name | Role | Primary Email | Aliases |
|------|------|---------------|---------|
| Frederick Aya | Founder, Super Admin | fred@sftwrks.com | fred@softworkstrading.com, fred@pitchfilmstudio.com |
| Peter Obie | Team Member | peter@sftwrks.com | peter@softworkstrading.com |

## Email Infrastructure

**Google Workspace:** Business Standard ($16.80/user/month)
**Total Cost:** $33.60/month for 2 users (domains are FREE)

### Domain Structure

| Domain | Type | Status | Users |
|--------|------|--------|-------|
| softworkstrading.com | Primary | ✅ Verified | All |
| sftwrks.com | Domain Alias (planned) | ✅ Verified | All (automatic) |
| pitchfilmstudio.com | Secondary | ⏳ Pending | Assigned only |
| tiwa.ai | Secondary | ⏳ Pending | Assigned only |
| prepurchasepro.com | Secondary | ⏳ Pending | Assigned only |

### Email Strategy

- **@sftwrks.com** → Day-to-day business, client communication
- **@softworkstrading.com** → Invoices, contracts, legal documents
- **@pitchfilmstudio.com** → Media production clients
- **@tiwa.ai** → AI product communications
- **@prepurchasepro.com** → Vehicle inspection service

### DNS Configuration (Namecheap)

All email domains require:
```
MX  @  aspmx.l.google.com (Priority 1)
MX  @  alt1.aspmx.l.google.com (Priority 5)
MX  @  alt2.aspmx.l.google.com (Priority 5)
MX  @  alt3.aspmx.l.google.com (Priority 10)
MX  @  alt4.aspmx.l.google.com (Priority 10)
TXT @  v=spf1 include:_spf.google.com ~all
```

## Accounts & Access

| Chrome Profile | Account | Services |
|----------------|---------|----------|
| ayauxd | ayauxd@gmail.com | Namecheap, Vercel, Anthropic, Google AI |
| softworks | fred@softworkstrading.com | Google Workspace Admin, Gmail |
| vaprojects | (OpenAI account) | OpenAI API |

## API Services

| Service | Purpose | Account | Balance/Plan |
|---------|---------|---------|--------------|
| Anthropic Claude | LLM API | Softworks Trading org | $24.19 credits |
| OpenAI | GPT-4 + DALL-E | vaprojects | - |
| Google Gemini | LLM + Imagen | ayauxd@gmail.com | - |
| ElevenLabs | Voice synthesis | - | - |
| Twilio | WhatsApp/SMS | - | - |
| Vercel | Hosting | ayauxd@gmail.com | Hobby (Free) |
| Namecheap | Domains (24) | ayauxd@gmail.com | ~$300/year |

## Automation Status (n8n)

| Workflow | Status | Priority |
|----------|--------|----------|
| Lead Discovery Chatbot | Complete | - |
| Lead Intake | Pending | High |
| Lead Nurture | Pending | High |
| Content Generator | Pending | Medium |
| Social Distribution | Pending | Medium |
| Proposal Builder | Pending | High |
| Client Onboarding | Pending | Medium |
| Client Offboarding | Pending | Low |
| Error Handler | Pending | Low |
| Weekly Reporting | Pending | Low |
| Dashboard | Pending | Low |

---

*Last updated: 2026-01-12*
