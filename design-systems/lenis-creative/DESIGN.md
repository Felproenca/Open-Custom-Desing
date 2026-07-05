# Lenis Creative

> Category: Creative & Editorial
> A luxury-grade, high-end editorial aesthetic with smooth scroll foundations, large typography, elegant transitions, and rich micro-interactions.

## 1. Visual Theme & Atmosphere

An aesthetic inspired by high-end design studios, interactive portfolios, and premium showcases (such as those seen on Lenis Showcase). It combines deep dark palettes (or high-contrast raw studio light themes) with dramatic typography sizes, smooth animations, and scroll-bound parallax effects.

- **Visual style:** editorial-creative
- **Color stance:** monochrome, rich contrast, luxury accents
- **Design intent:** Create immersive, high-end creative pages that feel fluid, responsive, and animated.

## 2. Color

- **Primary/Accent:** `#E2C39B` — Warm luxury gold/champagne.
- **Secondary:** `#FF3E3E` — Sharp neon red for rare highlight flags.
- **Surface:** `#0A0A0C` — Deep studio black.
- **Text:** `#F5F5F7` — Soft off-white for body readability.
- **Neutral:** `#141417` — Card backgrounds / border outlines.
- **Canvas-Light:** `#F3F3F3` — Optional light mode raw studio background.
- **Text-Light:** `#111115` — Optional light mode charcoal text.

## 3. Typography

- **Display/Headline Font:** `Syne` (bold, geometric, creative) or `Playfair Display` (elegant, high-contrast serif).
- **Body Font:** `Inter` or `Plus Jakarta Sans` (highly legible geometric sans).
- **Monospace/Accent Font:** `Space Mono` (used for stats, tags, dates, and eyebrows).
- **Typography Rules:**
  - Headlines must be massive (64px to 120px) with close line-height (`0.9` to `1.1`) and tight letter-spacing (`-0.03em`).
  - Text-reveal animation should be applied to hero headlines (revealing lines via `overflow: hidden`).
  - Accents/Eyebrows are always in Mono, uppercase, letter-spaced (`0.15em`).

## 4. Spacing & Grid

- **Scale:** 8px / 16px / 24px / 32px / 48px / 64px / 96px / 128px / 160px.
- Use generous vertical spacing (`128px` to `192px` padding on sections) to allow smooth scroll elements to breathe.
- **Grid:** Strict 12-column layout or asymmetric two-column layouts (split text left, visual assets right).

## 5. Layout & Composition

- **Asymmetry:** Asymmetric structure where headlines overlap images or sit off-center.
- **Full-Screen Sections:** Hero sections should occupy exactly `100vh` with minimal clutter.
- **Whitespace:** Use extreme whitespace as a design element. Negative space is the luxury itself.

## 6. Components

- **Creative Cards:** Hover states should cause subtle parallax image shifts, scale changes, or custom cursor triggers.
- **Magnetic Buttons:** Primary CTAs should have a magnetic hover effect (drawn to the cursor) and custom border expansion.
- **Navigation:** Transparent, sticky, minimal navbar that hides on scroll down and reveals on scroll up.

## 7. Motion & Interaction

- **Smooth Scroll:** Powered by Lenis. All page content must reside in a scroll container with easing.
- **Scroll-Linked Animations:** Elements fade in, translate vertically (parallax), or scale as they enter the viewport using GSAP ScrollTrigger.
- **Hover Transitions:** Use custom bezier easing `cubic-bezier(0.25, 1, 0.5, 1)` for all transitions (duration `400ms` to `600ms`).

## 8. Voice & Brand

- Tone: Minimalist, conceptual, bold, and artistic.
- Keep text short, poetic, and impactful. Focus on statement typography over paragraphs of text.

## 9. Anti-patterns

- Do not use standard default browser scrollbar (use a custom thin minimal scrollbar).
- Do not stack elements tightly without padding.
- Do not use drop shadows (use flat layouts or subtle inner borders).
- Do not use generic icons; use bespoke SVG lines.
