---
name: scroll-premium
description: |
  Premium scroll-driven website matching Awwwards/Google quality. Lenis smooth
  scroll + GSAP ScrollTrigger + Three.js WebGL backgrounds + character-by-character
  text choreography + play/pause motion control + animated headers + micro-interactions.
  Production-grade, not a template. Use when the brief asks for "premium site",
  "Awwwards quality", "Google-level", "cinematic website", "immersive landing",
  "scroll animations", "parallax", "exploding view", "WebGL background",
  "text animation", "smooth scroll", "lenis", "site premium", "ultra realismo".
triggers:
  - "scroll premium"
  - "awwwards quality"
  - "google level"
  - "cinematic website"
  - "immersive landing"
  - "premium site"
  - "scroll animations"
  - "parallax site"
  - "exploding view"
  - "webgl background"
  - "text animation"
  - "smooth scroll"
  - "lenis"
  - "site premium"
  - "vista explodida"
  - "animação de scroll"
  - "ultra realismo"
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
    sections: [color, typography, layout, components]
  inputs:
    - name: product_name
      type: string
      required: true
    - name: tagline
      type: string
      required: true
    - name: mood
      type: enum
      values: [cinematic, editorial, tech-luxury, organic, brutalist]
      default: cinematic
    - name: scroll_intensity
      type: enum
      values: [subtle, moderate, intense]
      default: moderate
    - name: has_video
      type: boolean
      default: false
    - name: has_exploded_view
      type: boolean
      default: false
    - name: has_webgl
      type: boolean
      default: true
  outputs:
    primary: index.html
  capabilities_required:
    - file_write
---

# Scroll Premium Skill v2

Production-grade scroll experience. Not a template — a full stack:
Lenis smooth scroll → GSAP ScrollTrigger → Three.js WebGL backgrounds →
character-by-character text choreography → play/pause motion control →
animated header → micro-interactions → perspective 3D.

## Resource map

```
scroll-premium/
├── SKILL.md                    ← you're reading this
├── assets/
│   └── template.html           ← production seed (Lenis + GSAP + Three.js)
└── references/
    ├── scroll-patterns.md      ← parallax, reveal, explode, motion patterns
    ├── text-choreography.md    ← character-by-character, clip-path, stagger
    ├── webgl-backgrounds.md    ← Three.js particle fields, depth layers
    ├── micro-interactions.md   ← cursor, hover states, focus, selection
    ├── image-motion.md         ← Ken Burns, parallax images, hover depth
    ├── video-integration.md    ← embedded video, scroll-linked playback
    └── checklist.md            ← P0/P1/P2 quality gates
```

## Workflow

### Step 0 — Pre-flight (mandatory)

1. **Read `assets/template.html`** — it IS the seed. Every pattern is
   pre-implemented. Study the Lenis init, GSAP choreography, Three.js
   background, play/pause system, and micro-interactions.
2. **Read `references/text-choreography.md`** — character-by-character
   reveals, clip-path reveals, stagger patterns.
3. **Read `references/webgl-backgrounds.md`** — if `has_webgl: true`.
4. **Read `references/micro-interactions.md`** — cursor, hover, focus.
5. **Read `references/scroll-patterns.md`** — parallax, explode, Ken Burns.
6. **Read the active DESIGN.md** — map its tokens to the template's `:root`.

### Step 1 — Plan the scroll journey

Before writing HTML, define the **emotional arc** in one sentence:

> "WebGL particle field hero with title-by-title reveal → product explode
>  on scroll → feature cards with stagger → Ken Burns gallery → CTA"

**Required sections:**

| Section | Purpose | Motion |
|---------|---------|--------|
| **Hero** | First impression | WebGL background + text choreography |
| **Product Reveal** | Showcase | Exploded view or parallax layers |
| **Features** | Capabilities | Staggered card reveals |
| **Gallery** | Visual proof | Ken Burns + hover 3D |
| **Video** | Motion proof | Scroll-linked playback |
| **Specs/Data** | Credibility | Counter animations |
| **Social Proof** | Trust | Quote reveals |
| **CTA** | Conversion | Final motion beat |

### Step 2 — Copy and customize

Copy `assets/template.html` to project root as `index.html`. Replace:
1. `:root` variables with DESIGN.md tokens
2. `<title>` and nav brand
3. Font URLs if DESIGN.md specifies different fonts
4. All `[BRACKET]` placeholders with real content
5. `.ph-img` divs with real images or styled placeholders

### Step 3 — Content — no placeholders, ever

Every text block must be real, specific copy. No `[HEADLINE]`, no
`[TAGLINE]`, no lorem ipsum. Generate plausible, opinionated copy
from the brief. Example:

- BAD: `[HEADLINE]`
- GOOD: `Precision redefined.`
- BAD: `[TAGLINE — one or two sentences]`
- GOOD: `47 custom components. Zero compromises. Each layer engineered for clarity.`

### Step 4 — Typography choreography

Replace `data-scroll-reveal="fade-up"` on headlines with character-by-
character animation. The template ships a `Choreography` class:

```js
// Title by title reveal
Choreography.reveal('.hero-title', {
  type: 'chars',       // 'chars' | 'words' | 'lines' | 'clip'
  stagger: 0.03,       // seconds between characters
  duration: 1.2,
  ease: 'expo.out',
  delay: 0.3
});

// Clip-path line reveal (Google-style)
Choreography.reveal('.section-title', {
  type: 'clip',        // clips each line from bottom
  stagger: 0.15,
  duration: 0.8,
  ease: 'power4.out'
});
```

### Step 5 — WebGL background (if `has_webgl`)

The template ships a Three.js particle field. Customize:

```js
WebGLBackground.init({
  particles: 2000,           // count
  color: 0x6C5CE7,           // accent color
  size: 0.02,                // particle size
  speed: 0.3,                // rotation speed
  depth: 3,                  // z-depth range
  mouseInfluence: 0.5,       // mouse parallax strength
  fadeIn: true,              // fade in on load
});
```

### Step 6 — Play/pause motion control

The template includes a motion toggle. Respect it:

```html
<button class="motion-toggle" data-motion-toggle aria-label="Toggle animations">
  <span class="motion-toggle__on">Pause</span>
  <span class="motion-toggle__off">Play</span>
</button>
```

```js
document.querySelectorAll('[data-motion-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isPaused = document.documentElement.dataset.motion === 'paused';
    document.documentElement.dataset.motion = isPaused ? '' : 'paused';
    if (isPaused) {
      lenis.start();
      ScrollTrigger.getAll().forEach(st => st.enable());
    } else {
      lenis.stop();
      ScrollTrigger.getAll().forEach(st => st.disable());
    }
  });
});
```

All CSS animations respect `html[data-motion="paused"]`:
```css
html[data-motion="paused"] *,
html[data-motion="paused"] *::before,
html[data-motion="paused"] *::after {
  animation-play-state: paused !important;
}
```

### Step 7 — Scroll mechanics

Use the template's pre-built systems:

**Parallax:**
```html
<div data-scroll data-scroll-speed="-0.3">Background</div>
```

**Reveal (for non-headline elements):**
```html
<div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.1">Card</div>
```

**Explode:**
```html
<div data-scroll data-scroll-explode="radial" data-scroll-range="0.2-0.7">
  <div class="explode-piece" data-explode-angle="0" data-explode-distance="200">A</div>
  <div class="explode-piece" data-explode-angle="72" data-explode-distance="200">B</div>
</div>
```

**Ken Burns:**
```html
<div data-scroll data-scroll-image-motion="ken-burns">
  <img src="photo.jpg" alt="..." />
</div>
```

**Hover 3D:**
```html
<div class="hover-3d">
  <img src="product.jpg" alt="..." />
</div>
```

### Step 8 — Micro-interactions

The template ships with:
- Custom cursor (`.cursor` + `.cursor-follower`)
- Magnetic buttons (`.magnetic` attribute)
- Smooth image hover scale
- Custom `::selection` color
- Focus-visible ring

Activate in the template. Don't add new ones — the system is calibrated.

### Step 9 — Self-check

Run through `references/checklist.md`. Every P0 must pass.

### Step 10 — Emit

Wrap `index.html` in `<artifact>` tags. One sentence before. Nothing after.

## Hard rules

- **Lenis smooth scroll is mandatory.** CDN + sync with GSAP.
- **No placeholder text.** Every `[BRACKET]` must be replaced.
- **No placeholder images.** Use `.ph-img` with descriptive text, or
  real images from the user.
- **Three.js via CDN only.** No npm, no bundler.
- **`prefers-reduced-motion`** → destroy Lenis, kill ScrollTrigger, stop
  Three.js, force all reveals visible, stop all CSS animations.
- **`data-motion` play/pause** → user must be able to pause all motion.
- **Mobile**: parallax disabled ≤768px, explode hidden, hover 3d disabled,
  Three.js particles reduced by 50%.
- **`data-od-id`** on every `<section>`.
- **Performance**: 60fps scroll, LCP < 2.5s, CLS < 0.1.

## Output

```
<artifact identifier="scroll-premium-slug" type="text/html" title="Title">
<!doctype html>
<html>...</html>
</artifact>
```

## Performance budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| Scroll FPS | 60fps stable |
| Three.js draw calls | < 3 |
