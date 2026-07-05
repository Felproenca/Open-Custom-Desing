---
name: design-intelligence
description: |
  Design intelligence engine powered by 192 industry palettes, 73 font pairings,
  67 UI styles, and 161 reasoning rules. Generates complete design systems from
  a product description — colors, typography, styles, anti-patterns, and
  checklists. Works across the entire OD ecosystem. Based on UI UX Pro Max
  (98k stars). Use when building any visual output that needs a coherent
  design system.
triggers:
  - "design system"
  - "color palette"
  - "font pairing"
  - "ui style"
  - "design tokens"
  - "brand colors"
  - "typography"
  - "sistema de design"
  - "paleta de cores"
  - "estilo visual"
od:
  mode: design-system
  platform: desktop
  scenario: design
  featured: 1
  preview:
    type: html
    entry: design-preview.html
  design_system:
    requires: false
    generates: true
  inputs:
    - name: product_type
      type: string
      required: true
      description: "What kind of product (SaaS, tattoo studio, e-commerce, etc.)"
    - name: mood
      type: enum
      values: [premium, minimal, bold, dark, playful, editorial, technical]
      default: premium
    - name: output_format
      type: enum
      values: [design-system, css-variables, tailwind-config, full-prompt]
      default: design-system
  outputs:
    primary: DESIGN.md
  capabilities_required:
    - file_write
---

# Design Intelligence Skill

Generates complete design systems from product descriptions. Draws from
192 industry palettes, 73 font pairings, 67 UI styles, and 161 reasoning
rules to produce coherent, WCAG-compliant design tokens.

## Workflow

### Step 1 — Match product type

Search `references/palettes.csv` for the closest product type match.
Use keyword matching: tattoo → #64 (Photography Studio) or #33 (Luxury/Premium Brand).
Extract: Primary, Secondary, Accent, Background, Foreground, Card, Muted, Border, Destructive colors.

### Step 2 — Select font pairing

Search `references/typography.csv` by mood keywords:
- premium → #1 Classic Elegant (Playfair Display + Inter)
- minimal → #5 Minimal Swiss (Inter)
- bold → #7 Bold Statement (Bebas Neue + Source Sans 3)
- dark → #9 Developer Mono (JetBrains Mono + IBM Plex Sans)
- playful → #6 Playful Creative (Fredoka + Nunito)
- editorial → #4 Editorial Classic (Cormorant Garamond + Libre Baskerville)
- technical → #9 Developer Mono

### Step 3 — Choose UI style

Search `references/styles.csv` by keywords and mood. Map:
- premium → #14 Liquid Glass, #19 Soft UI Evolution, #29 Exaggerated Minimalism
- minimal → #1 Minimalism & Swiss Style
- bold → #4 Brutalism, #20 Neubrutalism
- dark → #7 Dark Mode (OLED)
- playful → #9 Claymorphism, #6 Vibrant & Block-based
- editorial → #47 Editorial Grid / Magazine
- technical → #1 Minimalism, #25 AI-Native UI

### Step 4 — Generate design system

Write `DESIGN.md` with these sections:

```markdown
# [Product Name] Design System

## Visual Theme
- Mood: [resolved]
- Style: [selected style name]
- References: [1-2 real sites]

## Color Palette
- Primary: [hex] — [role]
- Secondary: [hex] — [role]
- Accent: [hex] — [role]
- Background: [hex]
- Foreground: [hex]
- Card: [hex]
- Muted: [hex]
- Border: [hex]
- Destructive: [hex]

## Typography
- Display: [font] — [weight, size, line-height]
- Body: [font] — [weight, size, line-height]
- Mono: [font] — [weight, size, line-height]
- Google Fonts: [URL]

## Spacing & Layout
- Section gap: [value]
- Content padding: [value]
- Max width: [value]
- Border radius: [value]

## Effects & Animation
- [selected style effects from styles.csv]
- Duration: [ms]
- Easing: [value]

## Anti-Patterns (DO NOT)
- [from styles.csv "Do Not Use For" column]
- [from colors.csv industry-specific notes]

## Pre-Delivery Checklist
- [ ] WCAG AA contrast (4.5:1 minimum)
- [ ] Hover states with transitions (150-300ms)
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No emoji as icons (use SVG)
```

### Step 5 — Output CSS variables (if requested)

```css
:root {
  --color-primary: [hex];
  --color-secondary: [hex];
  --color-accent: [hex];
  --color-bg: [hex];
  --color-fg: [hex];
  --color-card: [hex];
  --color-muted: [hex];
  --color-border: [hex];
  --color-destructive: [hex];
  --font-display: '[font]', sans-serif;
  --font-body: '[font]', sans-serif;
  --font-mono: '[font]', monospace;
  --radius: [value];
  --spacing: [value];
  --duration: [value]ms;
}
```

## Hard rules

- **WCAG AA minimum.** Every color combination must pass 4.5:1 contrast.
- **One accent color.** Used max 3x per viewport.
- **Industry-appropriate.** Don't use playful colors for finance.
- **Document anti-patterns.** What NOT to do is as important as what to do.
- **Google Fonts only.** All font pairings use Google Fonts CDN.

## Data files

- `references/palettes.csv` — 192 industry-specific color palettes
- `references/typography.csv` — 73 curated font pairings
- `references/styles.csv` — 67 UI styles with effects, anti-patterns, CSS variables
