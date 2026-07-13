---
name: clothing-store-rectangles
description: Brutalist editorial clothing store inspired by rectangles.fm aesthetic
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: design
  preview:
    type: html
    entry: index.html
  inputs:
    - name: storeName
      type: string
      default: "FORMA"
      required: true
    - name: tagline
      type: string
      default: "Structural Clothing"
      required: true
  outputs:
    primary: index.html
  capabilities_required: [file_write]
  featured: 1
  fidelity: high-fidelity
---

# FORMA — Structural Clothing Store

A brutalist editorial clothing store inspired by the rectangles.fm design system.

## Design Language

- **Palette**: Pure black (#0a0a0a), cream (#e8e4d9), warm gray (#6b6560)
- **Typography**: Massive display type (clamp 4-12vw), condensed nav, monospace accents
- **Motion**: GSAP ScrollTrigger parallax, Lenis smooth scroll, staggered reveals
- **Geometry**: Hard rectangles, no border-radius, high-contrast blocks
- **Grid**: Full-bleed sections, asymmetric layouts, generous whitespace

## Structure

1. Hero — oversized brand name + tagline with parallax
2. Collection grid — asymmetric product cards with scroll-triggered reveals
3. Marquee — infinite horizontal text scroll
4. Featured piece — full-width product spotlight with split layout
5. Editorial — lookbook grid with hover interactions
6. Footer — massive brand wordmark (rectangles.fm style)

## Technical Notes

- Single HTML file, no dependencies except CDN links
- GSAP 3.x + ScrollTrigger for all animations
- Lenis for smooth scrolling
- CSS custom properties for theming
- Responsive via clamp() and container queries
