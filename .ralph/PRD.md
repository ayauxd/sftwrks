# PRD: VtF Story-Driven Presentation Rebuild

## Context
Rebuilding client proposal presentation from feature-list format to story-driven narrative.

**Target file:** `/Users/fredpro/sftwrks/public/vtf-presentation/index.html`

**Available assets:**
- Desktop screenshots: 1440×900 (16:10 ratio) - 7 pages
- Mobile screenshots: 780×1688 (~9:19.5 ratio) - 7 pages
- Location: `public/vtf-presentation/slides/`

## Success Criteria

### Password & Security
- [ ] Password gate on page load (password: `pass123`)
- [ ] Clean branded gate UI (not browser prompt)
- [ ] Gate remembers session (sessionStorage)

### Story Structure
- [ ] Slide 1: Mission hook (their land, their purpose) - NOT "Website Redesign Proposal"
- [ ] Slide 2: The stakes (what outdated presence costs them)
- [ ] One big idea per slide maximum (no 4-card dumps)
- [ ] Final slide: Vision of their future, not generic "Thank You"

### Screenshot Presentation
- [ ] Desktop frames use 16:10 aspect ratio (matches 1440×900 images)
- [ ] Mobile frames use 9:19.5 aspect ratio (matches 780×1688 images)
- [ ] Images fit frames without cropping or distortion
- [ ] Each screenshot has impact-focused caption (donor benefit, not feature)

### Visual Polish
- [ ] Generous whitespace between elements
- [ ] Bold typography hierarchy (one thing stands out per slide)
- [ ] Consistent color palette (VtF brand: teal #2d8a8a, brown #4a3728, sandstone #d4c4a8)

### Mobile Experience
- [ ] Proper touch/swipe navigation
- [ ] Mobile-only view shows full device frame (proper aspect ratio)
- [ ] View toggle (mobile/desktop) works correctly
- [ ] Navigation buttons touch-friendly (min 44px tap targets)

### Deployment
- [ ] Builds without errors: `cd /Users/fredpro/sftwrks && npm run build`
- [ ] Deploys to production: `cd /Users/fredpro/sftwrks && npx vercel --prod --yes`
- [ ] Accessible at sftwrks.com/vtf-presentation/

## Done When
ALL checkboxes above are checked. Verify by:
1. Opening sftwrks.com/vtf-presentation/
2. Password gate appears and accepts `pass123`
3. First slide is mission-focused (land/conservation imagery or statement)
4. No slide has more than 2 elements competing for attention
5. Screenshots fit their frames perfectly
6. Mobile swipe works
7. Final slide inspires action

## Out of Scope
- Recapturing screenshots
- Changing VtF website itself
- Adding actual payment processing
- Video or animated content
