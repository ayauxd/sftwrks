/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Design Tokens for Softworks Trading Company
 *
 * Color palette derived from "Architecting Intelligence" brand guidelines.
 * Navy/Steel/Cyan palette with isometric 3D cube logo featuring cyan glow accents.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Primary brand colors - Navy/Steel palette for backgrounds and surfaces
 */
export const colors = {
  primary: {
    navyDark: '#0A1628',      // Hero backgrounds, footer
    navyMid: '#0F172A',       // Section backgrounds
    steelBlue: '#1E3A5F',     // Cards, surfaces
    slate: '#334155',         // Borders, secondary text
    slateLight: '#475569',    // Muted text
  },

  accent: {
    glowCyan: '#00D4FF',      // Links, CTAs, primary accents
    cyanHover: '#22D3EE',     // Hover states
    cyanMuted: '#0891B2',     // Less prominent accents
  },

  light: {
    iceBlue: '#E0F2FE',       // Light backgrounds
    lightGray: '#F1F5F9',     // Page background (light mode)
    white: '#FFFFFF',         // Cards on light backgrounds
  },

  text: {
    primaryDark: '#F8FAFC',   // White text on dark backgrounds
    secondaryDark: '#94A3B8', // Muted text on dark backgrounds
    primaryLight: '#0F172A',  // Dark text on light backgrounds
    secondaryLight: '#64748B', // Muted text on light backgrounds
  },
} as const;

/**
 * Semantic color aliases for common use cases
 */
export const semanticColors = {
  // Backgrounds
  background: {
    hero: colors.primary.navyDark,
    section: colors.primary.navyMid,
    card: colors.primary.steelBlue,
    cardLight: colors.light.white,
    page: colors.light.lightGray,
    pageAlt: colors.light.iceBlue,
  },

  // Text
  text: {
    heading: colors.text.primaryDark,
    body: colors.text.primaryDark,
    muted: colors.text.secondaryDark,
    headingLight: colors.text.primaryLight,
    bodyLight: colors.text.primaryLight,
    mutedLight: colors.text.secondaryLight,
  },

  // Interactive elements
  interactive: {
    link: colors.accent.glowCyan,
    linkHover: colors.accent.cyanHover,
    button: colors.accent.glowCyan,
    buttonHover: colors.accent.cyanHover,
    buttonSubtle: colors.accent.cyanMuted,
    focus: colors.accent.glowCyan,
  },

  // Borders and dividers
  border: {
    default: colors.primary.slate,
    subtle: colors.primary.slateLight,
    accent: colors.accent.glowCyan,
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font families
 */
export const fontFamilies = {
  headline: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  display: "'Courier Prime', 'Courier New', monospace",
} as const;

/**
 * Font weights
 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Font sizes (rem-based for accessibility)
 */
export const fontSizes = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
} as const;

/**
 * Line heights
 */
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  body: 1.6,          // Default body text
} as const;

/**
 * Letter spacing (tracking)
 */
export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
  mono: '0.15em',     // For JetBrains Mono labels
} as const;

/**
 * Pre-composed typography styles
 */
export const typography = {
  // Headlines - Inter, 700 weight, tight tracking
  h1: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes['6xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h3: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h4: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h5: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h6: {
    fontFamily: fontFamilies.headline,
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },

  // Body - Inter, 400 weight, 1.6 line-height
  body: {
    fontFamily: fontFamilies.body,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacings.normal,
  },
  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacings.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacings.normal,
  },

  // Mono/Labels - JetBrains Mono, uppercase, wide tracking
  label: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacings.mono,
    textTransform: 'uppercase' as const,
  },
  labelLarge: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacings.mono,
    textTransform: 'uppercase' as const,
  },
  code: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },

  // Display quotes - Courier Prime
  quote: {
    fontFamily: fontFamilies.display,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacings.normal,
    fontStyle: 'italic' as const,
  },
  quoteLarge: {
    fontFamily: fontFamilies.display,
    fontWeight: fontWeights.regular,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacings.normal,
    fontStyle: 'italic' as const,
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing scale (in pixels, use with rem conversion)
 */
export const spacing = {
  0: '0',
  1: '4px',      // 0.25rem
  2: '8px',      // 0.5rem
  3: '12px',     // 0.75rem
  4: '16px',     // 1rem
  6: '24px',     // 1.5rem
  8: '32px',     // 2rem
  12: '48px',    // 3rem
  16: '64px',    // 4rem
  24: '96px',    // 6rem
  32: '128px',   // 8rem
} as const;

/**
 * Spacing scale as numbers (for programmatic use)
 */
export const spacingValues = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const;

/**
 * Semantic spacing aliases
 */
export const spacingSemantics = {
  // Component internal spacing
  componentXs: spacing[1],    // 4px
  componentSm: spacing[2],    // 8px
  componentMd: spacing[4],    // 16px
  componentLg: spacing[6],    // 24px

  // Section spacing
  sectionSm: spacing[12],     // 48px
  sectionMd: spacing[16],     // 64px
  sectionLg: spacing[24],     // 96px
  sectionXl: spacing[32],     // 128px

  // Gap spacing for flex/grid
  gapXs: spacing[1],          // 4px
  gapSm: spacing[2],          // 8px
  gapMd: spacing[4],          // 16px
  gapLg: spacing[6],          // 24px
  gapXl: spacing[8],          // 32px
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border radius scale
 */
export const borderRadius = {
  none: '0',
  sm: '4px',       // Buttons, inputs
  md: '8px',       // Cards
  lg: '12px',      // Modals
  xl: '16px',      // Large containers
  '2xl': '24px',   // Feature sections
  full: '9999px',  // Pills, avatars
} as const;

/**
 * Semantic border radius aliases
 */
export const borderRadiusSemantics = {
  button: borderRadius.sm,
  input: borderRadius.sm,
  card: borderRadius.md,
  modal: borderRadius.lg,
  pill: borderRadius.full,
  avatar: borderRadius.full,
  tag: borderRadius.full,
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box shadow definitions
 */
export const shadows = {
  none: 'none',

  // Card shadow - subtle cyan glow
  card: '0 4px 24px rgba(0, 212, 255, 0.08)',

  // Elevated shadow - darker, more prominent
  elevated: '0 8px 32px rgba(10, 22, 40, 0.24)',

  // Glow shadow - cyan accent glow effect
  glow: '0 0 24px rgba(0, 212, 255, 0.3)',

  // Additional utility shadows
  sm: '0 1px 2px rgba(10, 22, 40, 0.1)',
  md: '0 4px 6px rgba(10, 22, 40, 0.12)',
  lg: '0 10px 15px rgba(10, 22, 40, 0.15)',
  xl: '0 20px 25px rgba(10, 22, 40, 0.2)',

  // Inner shadows
  inner: 'inset 0 2px 4px rgba(10, 22, 40, 0.12)',
  innerGlow: 'inset 0 0 12px rgba(0, 212, 255, 0.15)',
} as const;

/**
 * Glow effects for the isometric cube logo and accents
 */
export const glowEffects = {
  // Text glow for headings
  textGlow: '0 0 20px rgba(0, 212, 255, 0.4)',
  textGlowSubtle: '0 0 10px rgba(0, 212, 255, 0.2)',

  // Border glow for interactive elements
  borderGlow: '0 0 0 1px rgba(0, 212, 255, 0.3)',
  borderGlowHover: '0 0 0 2px rgba(0, 212, 255, 0.5)',

  // Logo cube glow
  logoGlow: '0 0 32px rgba(0, 212, 255, 0.5)',
  logoGlowIntense: '0 0 48px rgba(0, 212, 255, 0.7)',
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

/**
 * Transition durations
 */
export const durations = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const;

/**
 * Transition timing functions
 */
export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Custom easings for brand motion
  glowPulse: 'cubic-bezier(0.4, 0, 0.6, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Pre-composed transitions
 */
export const transitions = {
  default: `all ${durations.normal} ${easings.easeInOut}`,
  fast: `all ${durations.fast} ${easings.easeOut}`,
  slow: `all ${durations.slow} ${easings.easeInOut}`,
  color: `color ${durations.normal} ${easings.easeInOut}, background-color ${durations.normal} ${easings.easeInOut}`,
  transform: `transform ${durations.normal} ${easings.easeOut}`,
  opacity: `opacity ${durations.normal} ${easings.easeInOut}`,
  shadow: `box-shadow ${durations.normal} ${easings.easeOut}`,
  glow: `box-shadow ${durations.slow} ${easings.glowPulse}`,
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Breakpoint values as numbers (for programmatic use)
 */
export const breakpointValues = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Media query helpers
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  // Max-width variants
  maxXs: `@media (max-width: ${breakpoints.xs})`,
  maxSm: `@media (max-width: ${breakpoints.sm})`,
  maxMd: `@media (max-width: ${breakpoints.md})`,
  maxLg: `@media (max-width: ${breakpoints.lg})`,
  maxXl: `@media (max-width: ${breakpoints.xl})`,
  // Preference queries
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index scale for layering
 */
export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 100,
  sticky: 200,
  banner: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  max: 9999,
} as const;

// =============================================================================
// COMPOSITE THEME OBJECT
// =============================================================================

/**
 * Complete design tokens theme object
 * Use this for theme providers or CSS-in-JS solutions
 */
export const theme = {
  colors,
  semanticColors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  typography,
  spacing,
  spacingValues,
  spacingSemantics,
  borderRadius,
  borderRadiusSemantics,
  shadows,
  glowEffects,
  durations,
  easings,
  transitions,
  breakpoints,
  breakpointValues,
  mediaQueries,
  zIndices,
} as const;

// =============================================================================
// CSS CUSTOM PROPERTIES GENERATOR
// =============================================================================

/**
 * Generates CSS custom properties (CSS variables) from the design tokens.
 * Useful for vanilla CSS or CSS-in-JS solutions that use custom properties.
 */
export const cssVariables = `
:root {
  /* Primary Colors */
  --color-navy-dark: ${colors.primary.navyDark};
  --color-navy-mid: ${colors.primary.navyMid};
  --color-steel-blue: ${colors.primary.steelBlue};
  --color-slate: ${colors.primary.slate};
  --color-slate-light: ${colors.primary.slateLight};

  /* Accent Colors */
  --color-glow-cyan: ${colors.accent.glowCyan};
  --color-cyan-hover: ${colors.accent.cyanHover};
  --color-cyan-muted: ${colors.accent.cyanMuted};

  /* Light Mode Colors */
  --color-ice-blue: ${colors.light.iceBlue};
  --color-light-gray: ${colors.light.lightGray};
  --color-white: ${colors.light.white};

  /* Text Colors */
  --color-text-primary-dark: ${colors.text.primaryDark};
  --color-text-secondary-dark: ${colors.text.secondaryDark};
  --color-text-primary-light: ${colors.text.primaryLight};
  --color-text-secondary-light: ${colors.text.secondaryLight};

  /* Font Families */
  --font-headline: ${fontFamilies.headline};
  --font-body: ${fontFamilies.body};
  --font-mono: ${fontFamilies.mono};
  --font-display: ${fontFamilies.display};

  /* Font Sizes */
  --font-size-xs: ${fontSizes.xs};
  --font-size-sm: ${fontSizes.sm};
  --font-size-base: ${fontSizes.base};
  --font-size-lg: ${fontSizes.lg};
  --font-size-xl: ${fontSizes.xl};
  --font-size-2xl: ${fontSizes['2xl']};
  --font-size-3xl: ${fontSizes['3xl']};
  --font-size-4xl: ${fontSizes['4xl']};
  --font-size-5xl: ${fontSizes['5xl']};
  --font-size-6xl: ${fontSizes['6xl']};
  --font-size-7xl: ${fontSizes['7xl']};

  /* Spacing */
  --spacing-0: ${spacing[0]};
  --spacing-1: ${spacing[1]};
  --spacing-2: ${spacing[2]};
  --spacing-3: ${spacing[3]};
  --spacing-4: ${spacing[4]};
  --spacing-6: ${spacing[6]};
  --spacing-8: ${spacing[8]};
  --spacing-12: ${spacing[12]};
  --spacing-16: ${spacing[16]};
  --spacing-24: ${spacing[24]};
  --spacing-32: ${spacing[32]};

  /* Border Radius */
  --radius-none: ${borderRadius.none};
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-2xl: ${borderRadius['2xl']};
  --radius-full: ${borderRadius.full};

  /* Shadows */
  --shadow-card: ${shadows.card};
  --shadow-elevated: ${shadows.elevated};
  --shadow-glow: ${shadows.glow};
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};

  /* Transitions */
  --transition-default: ${transitions.default};
  --transition-fast: ${transitions.fast};
  --transition-slow: ${transitions.slow};

  /* Z-Indices */
  --z-base: ${zIndices.base};
  --z-dropdown: ${zIndices.dropdown};
  --z-sticky: ${zIndices.sticky};
  --z-overlay: ${zIndices.overlay};
  --z-modal: ${zIndices.modal};
  --z-tooltip: ${zIndices.tooltip};
}
`;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Colors = typeof colors;
export type SemanticColors = typeof semanticColors;
export type FontFamilies = typeof fontFamilies;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;
export type LineHeights = typeof lineHeights;
export type LetterSpacings = typeof letterSpacings;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type SpacingValues = typeof spacingValues;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type GlowEffects = typeof glowEffects;
export type Durations = typeof durations;
export type Easings = typeof easings;
export type Transitions = typeof transitions;
export type Breakpoints = typeof breakpoints;
export type MediaQueries = typeof mediaQueries;
export type ZIndices = typeof zIndices;
export type Theme = typeof theme;

// Default export
export default theme;
