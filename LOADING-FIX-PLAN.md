# Loading Performance Fix Plan

## Current Problems
1. **Site takes too long to show content** - users see loading shell for too long
2. **63MB of assets** when only ~2MB are actually used
3. **Redundant PNG files** alongside optimized WebP versions
4. **Source files in production** (6.5MB favicon source!)

---

## Phase 1: Delete Redundant Files (~40MB savings)

### 1.1 Delete Backup Folder (7MB)
```
public/assets/journal/backup-20241229/  # Old journal PNGs
```

### 1.2 Delete Source Files (7MB+)
```
public/assets/logos/favicon-source-new.jpg     # 6.5MB source
public/assets/logos/favicon-bubble-source.png  # 299KB source
public/assets/logos/favicon-ico-source.png     # 2.7KB source
```

### 1.3 Delete Unused Logo Variants (~2MB)
```
public/assets/logos/og-preview-landscape.png
public/assets/logos/og-preview-landscape-gemini.png
public/assets/logos/favicon-light-512.png
public/assets/logos/favicon-bubble-square.png
```

### 1.4 Delete PNG Duplicates of WebP Files (~15MB)
Journal PNGs (all have .webp versions):
```
public/assets/journal/*.png  # All PNG versions
```

Section PNGs:
```
public/assets/sections/strategy-card.png      # 1.4MB (have .webp)
public/assets/sections/integration-card.png   # 1.3MB (have .webp)
public/assets/sections/governance-card.png    # 1.1MB (have .webp)
```

Team duplicates:
```
public/assets/team/team-collective.jpg        # 2.6MB (unused)
public/assets/team/team-workflow-noir.png     # 1.3MB (have .webp)
public/assets/team/team-workflow.jpg          # 836KB (unused)
public/assets/team/team-light.jpg             # 836KB (unused)
```

### 1.5 Delete Unused Assets
```
public/assets/sections/softworks-logo-loop.mp4  # 1.5MB video (unused)
public/assets/hero/bridge-metaphor.png          # (unused)
public/assets/case-studies/landmark-gears.png   # Check if used
public/assets/sections/strategy-map.png         # Check if used
```

### 1.6 Consolidate Favicon Sizes
Keep only these (required for all devices):
```
favicon.ico           # Browser tab
favicon-32x32.png     # Standard
favicon-512.png       # PWA/manifest
apple-touch-icon.png  # iOS
android-chrome-192x192.png
android-chrome-512x512.png
og-preview.png        # Social sharing
```

Delete redundant sizes:
```
favicon-16.png, favicon-16x16.png
favicon-48.png, favicon-48x48.png
favicon-64.png, favicon-128.png
favicon-180.png, favicon-192.png, favicon-256.png
apple-touch-icon-180.png
```

---

## Phase 2: Fix Loading Performance

### 2.1 Problem: Loading Shell Shows Too Long
The loading shell in index.html is visible while React hydrates. If this takes too long, users see the shell indefinitely.

**Root Causes:**
1. Large JS bundle blocks rendering
2. CSS not inlined for critical path
3. Hero image not preloaded correctly

### 2.2 Optimize Critical Rendering Path

**index.html changes:**
```html
<!-- Preload hero images with correct priority -->
<link rel="preload" as="image" href="/assets/hero/hero-desktop.jpg"
      media="(min-width: 1024px)" fetchpriority="high">
<link rel="preload" as="image" href="/assets/hero/hero-mobile.jpg"
      media="(max-width: 639px)" fetchpriority="high">

<!-- Inline critical CSS for loading shell -->
<style>
  /* Inline the essential styles for immediate rendering */
</style>

<!-- Defer non-critical JS -->
<script type="module" src="/index.tsx" defer></script>
```

### 2.3 Code Splitting Improvements (vite.config.ts)
Current chunks are good, but ensure:
- React loads first (vendor-react chunk)
- Data loads after (data chunk)
- Pages load on demand (pages chunk)

### 2.4 Loading Shell Improvements
The loading shell should:
1. Show immediately (inline styles)
2. Display hero background (preloaded)
3. Fade smoothly into React app

---

## Phase 3: What Fast Sites Do

### Stripe.com approach:
- Inline critical CSS (~5KB)
- Preload hero images
- Progressive image loading (blur → sharp)
- No loading spinners - content appears ready

### Linear.app approach:
- Server-side rendering for initial content
- Skeleton screens match final layout
- Images lazy-loaded below fold

### For Softworks:
1. **Inline critical CSS** for loading shell
2. **Preload hero image** so it's ready when shell shows
3. **Remove the loading indicator** - show actual content structure
4. **Lazy load below-fold images** (case studies, journal)

---

## Phase 4: Implementation Steps

### Step 1: Clean up files (5 mins)
```bash
# Delete backup folder
rm -rf public/assets/journal/backup-20241229/

# Delete source files
rm -f public/assets/logos/favicon-source-new.jpg
rm -f public/assets/logos/favicon-bubble-source.png
rm -f public/assets/logos/favicon-ico-source.png

# Delete PNG duplicates of WebP
rm -f public/assets/journal/*.png
rm -f public/assets/sections/strategy-card.png
rm -f public/assets/sections/integration-card.png
rm -f public/assets/sections/governance-card.png
rm -f public/assets/team/team-workflow-noir.png
rm -f public/assets/team/team-collective.jpg
rm -f public/assets/team/team-workflow.jpg
rm -f public/assets/team/team-light.jpg

# Delete unused
rm -f public/assets/sections/softworks-logo-loop.mp4

# Delete redundant favicons
rm -f public/assets/logos/favicon-16.png
rm -f public/assets/logos/favicon-16x16.png
rm -f public/assets/logos/favicon-48.png
rm -f public/assets/logos/favicon-48x48.png
rm -f public/assets/logos/favicon-64.png
rm -f public/assets/logos/favicon-128.png
rm -f public/assets/logos/favicon-180.png
rm -f public/assets/logos/favicon-192.png
rm -f public/assets/logos/favicon-256.png
rm -f public/assets/logos/apple-touch-icon-180.png
rm -f public/assets/logos/og-preview-landscape.png
rm -f public/assets/logos/og-preview-landscape-gemini.png
rm -f public/assets/logos/favicon-light-512.png
rm -f public/assets/logos/favicon-bubble-square.png
```

### Step 2: Improve loading shell (index.html)
- Inline essential CSS
- Show hero background in shell
- Better preload directives

### Step 3: Test & Deploy
```bash
npm run build
npm run preview  # Test locally
vercel --prod    # Deploy
```

---

## Expected Results

| Metric | Before | After |
|--------|--------|-------|
| public/assets size | 63MB | ~3MB |
| Files to deploy | 250+ | ~40 |
| Initial paint | 2-3s | <1s |
| Hero visible | After React loads | Immediately |

---

## Done When
- [ ] All redundant files deleted
- [ ] Loading shell shows hero immediately
- [ ] No visible "loading" state for users
- [ ] Build passes
- [ ] Deployed and verified
