# Scroll Premium v2 — Quality Checklist

## P0 — Must pass

### Lenis Smooth Scroll
- [ ] Lenis CDN + CSS included (`lenis@1.3.25`)
- [ ] Lenis initialized with `autoRaf: true`, `anchors: true`
- [ ] Lenis synced with GSAP ScrollTrigger
- [ ] `prefers-reduced-motion` destroys Lenis

### WebGL Background (if enabled)
- [ ] Three.js CDN included
- [ ] Particle field renders without errors
- [ ] Particles respond to mouse movement
- [ ] Pixel ratio capped at 2
- [ ] Reduced particle count on mobile (50%)
- [ ] `prefers-reduced-motion` hides WebGL container

### Play/Pause Motion Control
- [ ] Motion toggle button visible and functional
- [ ] `html[data-motion="paused"]` stops all CSS animations
- [ ] `html[data-motion="paused"]` stops GSAP ScrollTrigger
- [ ] `html[data-motion="paused"]` stops Lenis
- [ ] Toggle restores all animations on play

### Text Choreography
- [ ] Headlines use `clip` reveal (clip-path) or character-by-character
- [ ] Section titles use `clip` type
- [ ] Stagger delays are non-zero for grouped elements
- [ ] No text is invisible at scroll position 0

### Scroll Mechanics
- [ ] All `data-scroll` elements have GSAP tweens
- [ ] ScrollTrigger uses `scrub: true` for parallax/explode
- [ ] Reveal uses `toggleActions: "play none none reverse"`
- [ ] No `Math.random()` — deterministic motion

### Custom Cursor
- [ ] Cursor dot + follower render
- [ ] Cursor expands on interactive elements
- [ ] Hidden on mobile (≤768px)
- [ ] Uses `mix-blend-mode: difference`

### Content
- [ ] All `[BRACKET]` placeholders replaced with real text
- [ ] No lorem ipsum anywhere
- [ ] All `.ph-img` have descriptive text

---

## P1 — Should pass

### Visual Quality
- [ ] Accent color max 3x per viewport
- [ ] Typography hierarchy clear (display > heading > body > mono)
- [ ] Section spacing uses `var(--section-gap)`
- [ ] Background grid visible but subtle (opacity 0.03)
- [ ] Animated gradient header visible
- [ ] Noise overlay present

### Magnetic Buttons
- [ ] Primary CTAs have `.magnetic` class
- [ ] Buttons follow cursor on hover
- [ ] Buttons snap back with elastic ease

### Hover 3D
- [ ] Product images use `.hover-3d`
- [ ] Tilt responds to mouse position
- [ ] Resets smoothly on mouseleave

### Nav
- [ ] Nav background appears on scroll (>80px)
- [ ] `backdrop-filter: blur(20px)` on scrolled nav
- [ ] Anchor links scroll smoothly via Lenis

### Mobile (≤768px)
- [ ] Parallax disabled
- [ ] Explode hidden
- [ ] Hover 3D disabled
- [ ] Cursor hidden
- [ ] Grid collapses to 1 column

---

## P2 — Nice to have

### Polish
- [ ] `::selection` color uses accent
- [ ] `:focus-visible` ring visible
- [ ] Custom scrollbar styled
- [ ] `scroll-margin-top` on sections
- [ ] Gradient text on key headlines

### Advanced
- [ ] Pin + scroll for step-by-step sections
- [ ] Ken Burns uses different directions per image
- [ ] Video has poster frame fallback
- [ ] Three.js shader background (advanced)
- [ ] Magnetic text pull on hero headline

### Performance
- [ ] FCP < 1.2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TBT < 200ms
- [ ] Scroll FPS 60fps
- [ ] Three.js draw calls < 3
