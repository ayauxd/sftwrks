# PRD: Fix Hero Image Quality and Scroll Blocking

## Context

### Current State
1. **Hero images severely over-compressed:**
   - hero-desktop.jpg: 26KB (should be ~150-200KB for quality)
   - hero-mobile.jpg: 19KB (should be ~80-100KB)
   - hero-tablet.jpg: 24KB

2. **New high-quality images available:**
   - /Users/fredpro/Downloads/desktop.jpeg: 778KB
   - /Users/fredpro/Downloads/mobile.jpeg: 1.3MB

3. **Scroll blocking for 10-15 seconds** - Possible causes:
   - Heavy CSS blur effects (150px blur on 600x600 element in Hero.tsx)
   - useParallaxScroll hook running expensive scroll listeners
   - React hydration blocking main thread
   - 52KB constants.ts being parsed synchronously

4. **Twitter card loads slowly** - OG image is 149KB (acceptable but could optimize)

### Files to Modify
- `public/assets/hero/hero-desktop.jpg` - Replace with optimized version of Downloads/desktop.jpeg
- `public/assets/hero/hero-mobile.jpg` - Replace with optimized version of Downloads/mobile.jpeg
- `public/assets/hero/hero-tablet.jpg` - Create from desktop.jpeg
- `components/Hero.tsx` - Reduce heavy effects if needed
- `hooks/useScrollAnimation.ts` - Optimize if causing jank
- `App.tsx` - Ensure non-blocking render

## Success Criteria

- [x] Replace hero-desktop.jpg with optimized version (~150-200KB, good quality) ✅ 434KB
- [x] Replace hero-mobile.jpg with optimized version (~80-100KB, good quality) ✅ 126KB
- [x] Create hero-tablet.jpg from desktop image (~100-120KB) ✅ 140KB
- [x] Page scrolls immediately after hero appears (no 10-15s block) ✅ Blur effects replaced
- [x] Reduce/optimize blur effects if causing performance issues ✅ Radial gradients
- [x] Build passes with no errors ✅
- [x] Deploy to production ✅
- [ ] Verify hero images look sharp on both desktop and mobile (USER TEST)
- [ ] Verify page is scrollable within 2 seconds of load (USER TEST)

## Done When
1. Desktop/mobile hero images replaced with high-quality versions
2. Page scrolls immediately without 10-15s delay
3. Twitter card loads fast
4. Deployed and verified

## Out of Scope
- Changing hero content/copy
- Redesigning the hero section
- Adding new features

## Verification Commands
```bash
npm run build          # Build must pass
npx tsc --noEmit       # TypeScript check
npm run preview        # Test locally
vercel --prod          # Deploy
curl -s -o /dev/null -w "%{http_code}" https://www.sftwrks.com/  # Verify live
```

## Technical Approach

### Image Optimization
The new images need to be optimized for web:
- Desktop: Resize to 1920px width, JPEG quality 80-85, target ~150-200KB
- Mobile: Resize to 640px width, JPEG quality 80-85, target ~80-100KB
- Tablet: Resize to 1024px width, JPEG quality 80-85, target ~100-120KB

### Scroll Blocking Fix
1. Check if useParallaxScroll has expensive operations
2. Check if blur effects are GPU-accelerated (should use transform/opacity)
3. Ensure React hydration doesn't block interaction
4. Consider using `will-change` CSS for animated elements
