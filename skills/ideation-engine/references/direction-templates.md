# Direction Templates — Pre-built Visual Concepts

## Direction Archetypes

### 1. Clean Minimal
```
Mood: Restrained confidence. Let the work speak.
Palette: #FFFFFF bg, #0A0A0A text, #3B82F6 accent, #F5F5F5 surface
Typography: Inter body, Space Grotesk display
Key element: Whitespace as design element. 60%+ of viewport is empty.
Reference: stripe.com — every pixel earns its place
Motion: Minimal. Fade reveals only. No parallax.
Best for: SaaS, fintech, B2B, enterprise
```

### 2. Dark Luxury
```
Mood: Premium darkness. Light emerges from black.
Palette: #0A0A0A bg, #EAEAEE text, #C8A2FF accent, #161620 surface
Typography: Space Grotesk display, Inter body
Key element: Gradient text + glass morphism cards + glow effects
Reference: linear.app — dark done right
Motion: Smooth scroll parallax, clip-path reveals, WebGL particles
Best for: Developer tools, crypto, premium consumer
```

### 3. Editorial Bold
```
Mood: Magazine on screen. Type is the hero.
Palette: #FFFBEB bg, #451A03 text, #F97316 accent, #FEF3C7 surface
Typography: Playfair Display headlines, Georgia body, JetBrains Mono data
Key element: Oversized serif type (8-12vw), 2-column grids, pull quotes
Reference: awwwards.com winners — editorial category
Motion: Ken Burns on images, staggered text reveals, horizontal scroll sections
Best for: Portfolio, magazine, storytelling, brand sites
```

### 4. Tech Utility
```
Mood: Engineer-designed. Data is beautiful.
Palette: #09090B bg, #FAFAFA text, #00D2FF accent, #18181B surface
Typography: JetBrains Mono data, Inter body, Space Grotesk headings
Key element: Monospace accents, grid overlays, data visualization
Reference: vercel.com — technical precision as aesthetic
Motion: Scroll-linked counters, code-block reveals, terminal animations
Best for: Developer tools, API docs, open source, technical products
```

### 5. Organic Flow
```
Mood: Nature meets technology. Soft but precise.
Palette: #F0FDF4 bg, #14532D text, #22C55E accent, #DCFCE7 surface
Typography: DM Sans body, Clash Display headings
Key element: Rounded shapes, soft shadows, gradient backgrounds
Reference: stripe.com/atlas — warm, approachable, premium
Motion: Smooth parallax, gentle hover scales, floating elements
Best for: Health, wellness, education, sustainability
```

### 6. Brutalist Raw
```
Mood: Anti-design as design. Exposed structure.
Palette: #000000 bg, #FFFFFF text, #FF0000 accent, #1A1A1A surface
Typography: System fonts, monospace, NO decorative fonts
Key element: Raw HTML aesthetic, visible grid, thick borders
Reference: Bloomberg.com — brutalism meets editorial
Motion: Snappy reveals, no easing, sharp transitions
Best for: Fashion, art, music, counterculture
```

### 7. Cinematic Immersive
```
Mood: Film on screen. Every scroll is a scene.
Palette: #000000 bg, #E5E5E5 text, #D4AF37 accent, #0A0A0A surface
Typography: Thin weights, wide tracking, cinematic spacing
Key element: Full-bleed video, parallax depth layers, scroll-linked playback
Reference: apple.com/iphone — product as protagonist
Motion: WebGL backgrounds, Ken Burns, exploded view, video scroll
Best for: Product launches, luxury brands, film, automotive
```

## Mood × Audience Matrix

| | Technical | Business | Consumer | Creative |
|---|-----------|----------|----------|----------|
| **Safe** | Tech Utility | Clean Minimal | Organic Flow | Editorial Bold |
| **Balanced** | Dark Luxury | Clean Minimal | Organic Flow | Dark Luxury |
| **Bold** | Brutalist Raw | Cinematic | Cinematic | Brutalist Raw |

## Palette Generation Rules

1. **Background first.** Pick bg → everything else responds to it.
2. **Accent is singular.** One accent, used ≤3x per viewport.
3. **Text must pass WCAG AA.** 4.5:1 minimum on bg.
4. **Surface is bg + 5-10% lightness.** Never pure gray.
5. **Gradients use 2 colors max.** Accent + one neighbor on the wheel.

## Typography Pairing Rules

| Display font | Body font | Mood |
|-------------|-----------|------|
| Space Grotesk | Inter | Technical, modern |
| Playfair Display | Georgia | Editorial, classic |
| Clash Display | DM Sans | Bold, contemporary |
| JetBrains Mono | Inter | Developer, precise |
| System stack | System stack | Brutalist, raw |
