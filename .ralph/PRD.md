# PRD: Fix www.sftwrks.com OG Preview on OpenGraph.xyz

## Context
- www.sftwrks.com DNS was just configured (CNAME added in Namecheap)
- Site works when tested directly via curl, Puppeteer, multiple DNS resolvers
- opengraph.xyz returns "fetch failed" - likely cached error or DNS propagation delay
- OG tags currently point to sftwrks.com (non-www) while testing www.sftwrks.com

## Root Cause Analysis
1. DNS propagation may not have reached opengraph.xyz's servers yet
2. opengraph.xyz may have cached the previous NXDOMAIN error
3. OG meta tags use sftwrks.com URLs while testing www.sftwrks.com (URL mismatch)

## Success Criteria
- [x] Update OG meta tags to use www.sftwrks.com as canonical URL
- [x] Update canonical link to www.sftwrks.com
- [x] Update JSON-LD schema URLs to www.sftwrks.com
- [x] Configure Vercel redirect: sftwrks.com → www.sftwrks.com
- [x] Deploy changes to production
- [x] Test with metatags.io (alternative OG tool) ✅ SUCCESS
- [x] Rich branded OG image displays correctly
- [ ] Confirm opengraph.xyz successfully fetches www.sftwrks.com ⚠️ BLOCKED (their infra issue)

## Done When
opengraph.xyz successfully fetches and displays OG preview for https://www.sftwrks.com with the rich branded image.

## Out of Scope
- Changing the actual OG image design
- DNS provider migration
- Non-OG related site changes

## Verification Commands
```bash
# DNS check
dig www.sftwrks.com +short

# HTTP check
curl -sI https://www.sftwrks.com | head -5

# OG tags check
curl -s https://www.sftwrks.com | grep -E "og:" | head -10

# OG image check
curl -sI https://www.sftwrks.com/assets/logos/og-preview.png | head -5
```

## Files to Modify
1. `/Users/fredpro/sftwrks/index.html` - Update OG tags to www.sftwrks.com
2. `/Users/fredpro/sftwrks/vercel.json` - Add redirect sftwrks.com → www.sftwrks.com
