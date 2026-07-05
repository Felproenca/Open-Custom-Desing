---
name: premium-creative-web
description: |
  High-end creative web prototype inspired by premium showcase portfolios (e.g. Lenis Showcase, Awwwards).
  Integrates Lenis smooth scroll, GSAP ScrollTrigger animations, large typography reveals, and asymmetric editorial layouts.
triggers:
  - "premium website"
  - "creative site"
  - "lenis website"
  - "gsap animation"
  - "scrolltrigger"
  - "high-end portfolio"
  - "awwwards"
  - "smooth scroll website"
  - "creative portfolio"
od:
  mode: prototype
  platform: desktop
  scenario: design
  featured: 1
  preview:
    type: html
    entry: index.html
  design_system:
    requires: true
    sections: [color, typography, layout, components, motion]
  example_prompt: "Crie um site premium estilo portfólio de estúdio com Lenis e GSAP ScrollTrigger, incluindo uma galeria assimétrica e uma seção de manifesto que revela o texto no scroll."
---

# Premium Creative Web Skill

Create immersive, premium web pages that mirror showcase-level creative design (Awwwards/Lenis style). This skill uses a custom seed template containing Google Fonts, Lenis, and GSAP.

## Resource Map

```
premium-creative-web/
├── SKILL.md                ← you're reading this
├── assets/
│   └── template.html       ← seed layout containing fonts, style sheets, and Lenis/GSAP setups (READ FIRST)
└── references/
    ├── layouts.md          ← list of layout blocks (Asymmetric grid, horizontal scroll, text pin)
    └── checklist.md        ← quality checklist for creative design
```

## Workflow

### Step 1 — Initialize from Seed
Copy the seed file `assets/template.html` to `index.html` in the project root. Apply the active `DESIGN.md` rules:
* Swap colors in the CSS `:root` block with the active design system colors.
* Make sure `Syne` or `Playfair Display` is used as the primary display font.
* Replace `<title>` and logo text.

### Step 2 — Draft the Storyboard
Choose 3 to 5 layout blocks from `references/layouts.md`. Set up a rhythmic flow, for example:
* `Hero` (pre-built in seed)
* `Asymmetric Grid Gallery` (Section 1)
* `Text Pin & Scroll Reveal Section` (Section 2)
* `Editorial Split Section` (Section 3)
* `Curator Contact Block` (Section 5)

Present this storyboard in a single sentence to the user before generating.

### Step 3 — Build Sections
Paste the selected section structures from `references/layouts.md` into `<main id="content">` inside `index.html`. Replace placeholder values `[PROJECT_01_IMAGE]`, etc., with clean, text-based visual descriptions or image URLs, and replace bracketed copy with detailed premium-grade copy.

### Step 4 — Wire up GSAP and ScrollTrigger Scripts
Locate the script block at the bottom of `index.html`. For every interactive section added:
* Connect its scroll trigger.
* Ensure `.horizontal-scroll-track` translations use correct math:
  `-(track.scrollWidth - window.innerWidth * 0.7)`
* Ensure `.manifesto-text span` triggers use target coordinates and scrub times.
* Check that `reveal-item` triggers correctly reveal text on page load.

### Step 5 — Verify Against Checklist
Run through the quality constraints in `references/checklist.md`. Do not deliver generic, flat, or boring sections. Ensure typography sizes are large and bold, and colors feel premium and consistent.

### Step 6 — Output the Artifact
Wrap your finished `index.html` file in `<artifact>` tags. Provide a brief overview before outputting.

---

## Hard Rules

1. **Always Include Lenis & GSAP**: Ensure smooth scroll initializes on the wrapper, and `ScrollTrigger` updates on Lenis scroll events.
2. **Display Typography**: Display headings must be massive (`clamp(48px, 8vw, 110px)`) and uppercase, utilizing `Syne` or `Playfair Display`.
3. **No Unstyled Image Blocks**: Images must be enclosed in `.img-wrapper` and utilize parallax scrolling where appropriate.
4. **Use Asymmetric Grids**: Never lay out projects in a standard equal-width grid. Use offset columns and margins.
5. **No AI-slop Fillers**: Write copy that is concise, impactful, and luxury-oriented.
