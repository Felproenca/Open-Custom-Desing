# Scroll Patterns Reference

## 0. Lenis Smooth Scroll Setup

Lenis wraps the native scroll for buttery feel. Always set up first.

### Basic Setup
```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.25/dist/lenis.css" />
<script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js"></script>
```

### Initialization
```js
const lenis = new Lenis({
  autoRaf: true,
  anchors: true,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});
```

### GSAP ScrollTrigger Sync
```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### Duration Presets

| Feel | Duration | Easing | Use case |
|------|----------|--------|----------|
| **Snappy** | 0.8s | power4.out | Data-heavy, SaaS |
| **Balanced** | 1.2s | default | Most premium sites |
| **Cinematic** | 1.8s | power2.inOut | Portfolio, storytelling |
| **Editorial** | 2.0s | sine.inOut | Magazine, long-form |

### Scrollbar Styling
Lenis uses `html.lenis` class — style the scrollbar via:
```css
html.lenis::-webkit-scrollbar { width: 6px; }
html.lenis::-webkit-scrollbar-track { background: transparent; }
html.lenis::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }
```

### Scroll-to with Lenis
```js
lenis.scrollTo('#features', {
  offset: -80,        // nav height
  duration: 2,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  onComplete: () => console.log('arrived')
});
```

### Horizontal Scroll
```js
const lenis = new Lenis({
  orientation: 'horizontal',
  gestureOrientation: 'both',
});
```

### Nested Scroll (modals, drawers)
```html
<div data-lenis-prevent>Scrollable modal content</div>
```
Or via JS:
```js
const lenis = new Lenis({
  prevent: (node) => node.classList.contains('modal-content'),
});
```

### Destroy
```js
lenis.destroy(); // cleans up all event listeners
```

---

## 1. Parallax Depth

Parallax creates depth by moving layers at different speeds relative to scroll.

### Background Parallax
Background image moves slower than content — creates depth illusion.

```html
<div class="parallax-container" style="position:relative; overflow:hidden; height:100vh;">
  <div data-scroll data-scroll-speed="-0.4" style="position:absolute; inset:-10%;">
    <img src="hero.jpg" style="width:100%; height:100%; object-fit:cover;" />
  </div>
  <div data-scroll data-scroll-speed="0.2" style="position:relative; z-index:1;">
    <h1>Content on top</h1>
  </div>
</div>
```

**Speed values:**
- `-0.6` to `-0.3`: Background (slow, moves up as you scroll down)
- `-0.2` to `-0.1`: Subtle background drift
- `0.1` to `0.3`: Foreground content (moves faster)
- `0.4` to `0.6`: Floating elements (fastest)

### Multi-Layer Parallax
3+ layers for depth. Back → front: image → overlay → text → floating elements.

```html
<div data-scroll data-scroll-speed="-0.5" style="position:absolute;">Layer 1 — far</div>
<div data-scroll data-scroll-speed="-0.25" style="position:absolute;">Layer 2 — mid</div>
<div data-scroll data-scroll-speed="0" style="position:relative;">Layer 3 — static</div>
<div data-scroll data-scroll-speed="0.3" style="position:absolute;">Layer 4 — float</div>
```

### Horizontal Parallax
Move elements left/right based on vertical scroll.

```js
gsap.to('.slide-left', {
  x: -100,
  ease: 'none',
  scrollTrigger: { trigger: '.slide-left', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

---

## 2. Scroll Reveals

Elements animate in when they enter the viewport.

### Available Types

| Type | Direction | Use case |
|------|-----------|----------|
| `fade-up` | Bottom → center | Default for most content |
| `fade-down` | Top → center | Elements below a hero |
| `fade-left` | Right → center | Text next to right-aligned images |
| `fade-right` | Left → center | Text next to left-aligned images |
| `scale-up` | Small → full | Stats, counters, emphasis |
| `scale-down` | Large → full | Dramatic reveals |
| `rotate-in` | Angled → straight | Playful or editorial |

### Staggered Reveals
Add `data-scroll-delay` to stagger a group of elements:

```html
<div class="grid-3">
  <div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.0">Card 1</div>
  <div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.1">Card 2</div>
  <div data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.2">Card 3</div>
</div>
```

### Trigger Behavior
- `toggleActions: "play none none reverse"` — plays on enter, reverses on leave-back
- Start at `top 85%` — triggers when element's top hits 85% of viewport
- Duration: 1s, ease: `power3.out`

---

## 3. Exploding View

Product breaks apart on scroll, reassembles on scroll-back.

### Radial Explode
Pieces fly outward from center in all directions.

```html
<div data-scroll data-scroll-explode="radial" data-scroll-range="0.2-0.7">
  <div class="explode-piece" data-explode-angle="0" data-explode-distance="200">A</div>
  <div class="explode-piece" data-explode-angle="72" data-explode-distance="200">B</div>
  <div class="explode-piece" data-explode-angle="144" data-explode-distance="200">C</div>
  <div class="explode-piece" data-explode-angle="216" data-explode-distance="200">D</div>
  <div class="explode-piece" data-explode-angle="288" data-explode-distance="200">E</div>
</div>
```

**Parameters:**
- `data-explode-angle`: Direction in degrees (0 = right, 90 = down, etc.)
- `data-explode-distance`: How far to travel in px (150-300 typical)
- `data-explode-rotate`: Rotation during explosion (optional, degrees)
- `data-scroll-range`: "start-end" as fractions of viewport (0.0-1.0)

### Linear Explode
All pieces fly in one direction (good for horizontal layouts).

```html
<div data-scroll data-scroll-explode="linear" data-scroll-range="0.3-0.7">
  <div class="explode-piece" style="--explode-x: -300px;">Left</div>
  <div class="explode-piece" style="--explode-x: -100px;">Center-left</div>
  <div class="explode-piece" style="--explode-x: 100px;">Center-right</div>
  <div class="explode-piece" style="--explode-x: 300px;">Right</div>
</div>
```

### Vertical Explode
Pieces fly up and down (good for stacked components).

```html
<div data-scroll data-scroll-explode="vertical" data-scroll-range="0.2-0.6">
  <div class="explode-piece" data-explode-angle="270" data-explode-distance="150">Top</div>
  <div class="explode-piece" data-explode-angle="90" data-explode-distance="150">Bottom</div>
</div>
```

### Reassembly
The same GSAP tween with reversed start/end handles reassembly automatically when scrolling back up.

---

## 4. Progress-Based Animations

### Scroll Progress Bar
Fixed bar at top showing scroll position.

```html
<div class="scroll-progress" data-scroll-progress></div>
```

```js
gsap.to('[data-scroll-progress]', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
});
```

### Section Progress
Animate within a section's scroll range.

```js
ScrollTrigger.create({
  trigger: '.section',
  start: 'top bottom',
  end: 'bottom top',
  onUpdate: self => {
    // self.progress: 0 → 1 as section scrolls through viewport
    const progress = self.progress;
    element.style.opacity = progress;
  }
});
```

### Pin + Scroll
Pin an element while scrolling through a section (good for step-by-step reveals).

```js
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: '+=2000', // scroll 2000px while pinned
  pin: true,
  scrub: true,
  onUpdate: self => {
    // Phase-based animation
    if (self.progress < 0.33) { /* Phase 1 */ }
    else if (self.progress < 0.66) { /* Phase 2 */ }
    else { /* Phase 3 */ }
  }
});
```

---

## 5. Smooth Scroll Anchors

Internal navigation that scrolls smoothly to sections.

```html
<a href="#features">Features</a>
```

```css
html { scroll-behavior: smooth; }
```

With offset for fixed nav:
```css
section[id] { scroll-margin-top: 80px; }
```
