# Softworks Trading Company - Brand Implementation Guide

## Overview

This document serves as the master reference for rebuilding the Softworks website to match the brand identity established in the "Architecting Intelligence" PDF and logo system.

---

## 1. Logo Assets & Usage

### Available Assets
| File | Location | Use Case |
|------|----------|----------|
| `softworks-horizontal-light.png` | `/public/assets/logos/` | Header nav (light mode), light sections |
| `softworks-avatar.png` | `/public/assets/logos/` | Favicon, social profiles, mobile nav |

### Logo Usage by Section
- **Header (light mode)**: Horizontal lockup
- **Header (dark mode)**: Horizontal lockup (need white version)
- **Hero**: Faint watermark "S" at 5-10% opacity as background
- **Footer**: Text-only "Softworks Trading Company" in mono font
- **Favicon**: Avatar cropped to square

---

## 2. Color System

### Primary Palette (Navy/Steel)
```css
--color-navy-dark: #0A1628;    /* Hero bg, footer */
--color-navy-mid: #0F172A;     /* Section backgrounds */
--color-steel-blue: #1E3A5F;   /* Cards, surfaces */
--color-slate: #334155;        /* Borders, secondary */
--color-slate-light: #475569;  /* Muted text */
```

### Accent Palette (Cyan)
```css
--color-cyan-glow: #00D4FF;    /* Links, CTAs, accents */
--color-cyan-hover: #22D3EE;   /* Hover states */
--color-cyan-muted: #0891B2;   /* Subtle accents */
```

### Light Mode
```css
--color-ice-blue: #E0F2FE;     /* Light backgrounds */
--color-light-gray: #F1F5F9;   /* Page background */
--color-white: #FFFFFF;        /* Cards */
```

### Text Colors
```css
/* On dark backgrounds */
--text-primary-dark: #F8FAFC;
--text-secondary-dark: #94A3B8;

/* On light backgrounds */
--text-primary-light: #0F172A;
--text-secondary-light: #64748B;
```

---

## 3. Color Transformation Map

### Background Classes
| Old (Stone) | New (Navy/Steel) |
|-------------|------------------|
| `bg-stone-900` | `bg-[#0F172A]` |
| `bg-stone-800` | `bg-[#1E3A5F]` |
| `bg-[#0c0a09]` | `bg-[#0A1628]` |
| `bg-[#F5F5F4]` | `bg-[#F1F5F9]` |
| `bg-[#E7E5E4]` | `bg-[#E0F2FE]` |
| `bg-white` | `bg-white` (unchanged) |

### Text Classes
| Old (Stone) | New (Slate) |
|-------------|-------------|
| `text-stone-900` | `text-slate-900` |
| `text-stone-600` | `text-slate-400` |
| `text-stone-500` | `text-slate-500` |
| `text-stone-400` | `text-slate-400` |
| `text-stone-100` | `text-slate-100` |

### Border Classes
| Old (Stone) | New (Slate) |
|-------------|-------------|
| `border-stone-300` | `border-slate-600` |
| `border-stone-700` | `border-slate-700` |
| `border-stone-800` | `border-slate-800` |
| `border-stone-200` | `border-slate-700` |

### Accent Classes
| Old (Orange) | New (Cyan) |
|--------------|------------|
| `text-orange-600` | `text-cyan-400` |
| `text-orange-500` | `text-cyan-400` |
| `hover:bg-orange-600` | `hover:bg-cyan-500` |
| `hover:text-orange-600` | `hover:text-cyan-400` |
| `bg-orange-600` | `bg-cyan-500` |
| `border-orange-500` | `border-cyan-400` |

### Dark Mode Overrides
| Old | New |
|-----|-----|
| `dark:bg-[#0c0a09]` | `dark:bg-[#0A1628]` |
| `dark:bg-stone-900` | `dark:bg-[#0F172A]` |
| `dark:border-stone-800` | `dark:border-slate-800` |
| `dark:text-stone-400` | `dark:text-slate-400` |

---

## 4. Typography

### Font Stack
```css
/* Headlines */
font-family: 'Inter', sans-serif;
font-weight: 700;
letter-spacing: -0.02em;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.6;

/* Mono/Labels */
font-family: 'JetBrains Mono', monospace;
text-transform: uppercase;
letter-spacing: 0.1em;

/* Display Quotes (keep existing) */
font-family: 'Courier Prime', monospace;
```

---

## 5. Component-Specific Guidelines

### Hero Section
- Background: Deep navy gradient `#0A1628` to `#0F172A`
- Faint "S" logo watermark at 5% opacity
- Headline: White text with cyan accent on key word
- CTA: Cyan background with white text
- Visual: Bridge metaphor imagery (paper-craft style)

### Navbar
- Transparent → Navy on scroll
- Logo: Horizontal lockup left-aligned
- Links: Slate text, cyan on hover
- CTA button: Cyan outline or filled

### Cards (Case Studies, Features)
- Background: Steel blue `#1E3A5F` or white
- Border: Subtle slate or cyan glow on hover
- Shadow: `0 4px 24px rgba(0, 212, 255, 0.08)`

### Footer
- Background: Darkest navy `#0A1628`
- Text: Slate for secondary, white for primary
- Links: Cyan on hover
- Logo: Text-only or "S" mark

---

## 6. Visual Motifs (from PDF)

### Bridge Metaphor
- Hero: Figure crossing bridge toward city
- Left side: Chaos (tangled wires, circuits)
- Right side: Organized city (outcomes)
- Bridge: Illuminated path (the service)

### Circuit/Data Flow
- Use as background textures at low opacity
- Cyan glow for "active" data flows
- Binary patterns as decorative elements

### Paper-Craft Aesthetic
- 3D diorama style for illustrations
- Depth through shadows and layers
- Avoid flat/stock photography

---

## 7. Implementation Phases

### Phase 1: Foundation
- [x] Git branch created
- [x] Asset directories set up
- [x] Logo files copied
- [x] Design tokens file created (design-tokens.ts)
- [x] index.html updated with new colors

### Phase 2: Core Components
- [x] Navbar with logo integration
- [x] Hero rebuild with navy/cyan gradient
- [x] Footer update with brand colors

### Phase 3: Section Updates
- [x] About/Problem section (three pillars)
- [x] Services/Features section (service tiers)
- [x] Process section (4-step methodology)
- [x] Case Studies section (navy cards)
- [x] Journal section (cyan accents)
- [x] Contact section (CTA styling)
- [x] Ecology section (initiative cards)
- [x] JournalDetail & CaseStudyDetail pages

### Phase 4: Content
- [x] Case studies aligned with AI consultancy
- [x] Journal content aligned
- [x] Copy updated for brand voice

### Phase 5: Assets
- [x] Image generation prompts document created
- [ ] Hero imagery generated (pending - use IMAGE_GENERATION_PROMPTS.md)
- [ ] Section images generated (pending)
- [ ] Case study landmarks generated (pending)

### Phase 6: QA
- [x] Build verification passed
- [ ] Visual review
- [ ] Responsive testing

---

## 8. File Change Manifest

Files to modify (in order):
1. `index.html` - Tailwind config, CSS variables, fonts
2. `components/Navbar.tsx` - Logo, colors
3. `components/Hero.tsx` - Complete rebuild
4. `components/Footer.tsx` - Colors, logo
5. `App.tsx` - Section backgrounds
6. `components/Journal.tsx` - Card styles
7. `components/CaseStudyDetail.tsx` - Content structure
8. `constants.ts` - Case study data restructure
9. `types.ts` - Enhanced interfaces

---

*Generated: 2024-12-27*
*Branch: feature/brand-system-rebuild*
