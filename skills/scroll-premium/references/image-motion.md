# Image Motion Reference

## 1. Ken Burns Effect

Slow zoom + pan on a static image. Creates cinematic motion from photos.

### Basic Ken Burns
```html
<div data-scroll data-scroll-image-motion="ken-burns" style="overflow:hidden; aspect-ratio:16/9;">
  <img src="photo.jpg" alt="..." />
</div>
```

### Direction Variants

| Direction | From | To | Use case |
|-----------|------|----|----------|
| **Default** | scale 1.1, x:-3%, y:-2% | scale 1.2, x:2%, y:1% | General hero |
| **Zoom in** | scale 1.0 | scale 1.3 | Dramatic focus |
| **Zoom out** | scale 1.3 | scale 1.0 | Reveal context |
| **Pan left** | x: 5% | x: -5% | Landscape sweep |
| **Pan right** | x: -5% | x: 5% | Landscape sweep |
| **Diagonal** | x:-5%, y:-3% | x:5%, y:3% | Dynamic movement |

### Custom Ken Burns via data attributes
```html
<div data-scroll data-scroll-image-motion="ken-burns"
     data-kb-from-scale="1.0"
     data-kb-from-x="-5%"
     data-kb-from-y="0%"
     data-kb-to-scale="1.25"
     data-kb-to-x="3%"
     data-kb-to-y="2%">
  <img src="photo.jpg" alt="..." />
</div>
```

### Multiple Ken Burns in sequence
Different images with different directions in a gallery:
```html
<div class="grid-2">
  <div data-scroll data-scroll-image-motion="ken-burns" style="...">
    <img src="1.jpg" /> <!-- Zoom in from left -->
  </div>
  <div data-scroll data-scroll-image-motion="ken-burns" style="...">
    <img src="2.jpg" /> <!-- Zoom out from right -->
  </div>
</div>
```

---

## 2. Parallax Depth (Images)

Image moves at different speed than surrounding content.

### Background Image Parallax
```html
<section style="position:relative; overflow:hidden; min-height:80vh;">
  <div data-scroll data-scroll-speed="-0.3" style="position:absolute; inset:-15%;">
    <img src="bg.jpg" style="width:100%; height:100%; object-fit:cover;" />
  </div>
  <div data-scroll data-scroll-speed="0.1" style="position:relative; z-index:1; padding:120px;">
    <h2>Content overlays image</h2>
  </div>
</section>
```

### Multi-Image Depth
Different images at different depths:
```html
<div data-scroll data-scroll-speed="-0.4" style="position:absolute;">
  <img src="far.jpg" /> <!-- Moves slowest -->
</div>
<div data-scroll data-scroll-speed="-0.2" style="position:absolute;">
  <img src="mid.jpg" /> <!-- Moves medium -->
</div>
<div data-scroll data-scroll-speed="0" style="position:relative;">
  <img src="near.jpg" /> <!-- Static -->
</div>
```

---

## 3. Hover 3D Tilt

CSS perspective tilt on mouse movement. No scroll needed.

### CSS Setup
```css
.hover-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.hover-3d img {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### JS Tilt
```js
document.querySelectorAll('.hover-3d').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = el.querySelector('img');
    if (img) {
      img.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    }
  });
  el.addEventListener('mouseleave', () => {
    const img = el.querySelector('img');
    if (img) img.style.transform = 'rotateY(0) rotateX(0) scale(1)';
  });
});
```

### Intensity Variants

| Intensity | Rotation range | Scale | Use case |
|-----------|---------------|-------|----------|
| **Subtle** | ±5deg | 1.01 | Cards, thumbnails |
| **Normal** | ±10deg | 1.02 | Product shots |
| **Dramatic** | ±15deg | 1.05 | Hero images |

---

## 4. Scroll-Linked Video

Video playback position tied to scroll position.

### Basic
```html
<video data-scroll-video muted playsinline preload="auto">
  <source src="demo.mp4" type="video/mp4" />
</video>
```

```js
const video = document.querySelector('[data-scroll-video]');
video.pause();
ScrollTrigger.create({
  trigger: video,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  onUpdate: self => {
    if (video.duration) {
      video.currentTime = self.progress * video.duration;
    }
  }
});
```

### With Poster Frame
```html
<video data-scroll-video muted playsinline preload="auto" poster="poster.jpg">
  <source src="demo.mp4" type="video/mp4" />
</video>
```

### Scroll Range Control
Only play video during a specific scroll range:
```js
ScrollTrigger.create({
  trigger: video,
  start: 'top 60%',  // Start when video top hits 60% of viewport
  end: 'bottom 40%', // End when video bottom hits 40%
  scrub: true,
  onUpdate: self => {
    if (video.duration) {
      video.currentTime = self.progress * video.duration;
    }
  }
});
```

---

## 5. Ultra-Realism Treatment

### Depth of Field (CSS)
```css
.dof-background {
  filter: blur(4px);
  transition: filter 0.6s ease;
}
.dof-foreground {
  filter: none;
  position: relative;
  z-index: 1;
}
```

Animate blur on scroll:
```js
gsap.to('.dof-background', {
  filter: 'blur(0px)',
  scrollTrigger: {
    trigger: '.dof-container',
    start: 'top center',
    end: 'bottom center',
    scrub: true
  }
});
```

### Light Effects
```css
/* Lens flare */
.lens-flare {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* Volumetric light */
.volumetric {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  pointer-events: none;
}
```

### Multi-Layer Shadows
```css
.realistic-shadow {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.07),
    0 4px 8px rgba(0,0,0,0.05),
    0 12px 24px rgba(0,0,0,0.04),
    0 24px 48px rgba(0,0,0,0.03);
}
```

### Noise Texture Overlay
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Sharp Rendering
```css
.sharp-image {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
```
