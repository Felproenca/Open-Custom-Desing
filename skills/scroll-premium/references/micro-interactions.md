# Micro-Interactions Reference

## 1. Custom Cursor

A two-part cursor: small dot (fast) + larger follower (smooth, delayed).

### HTML
```html
<div class="cursor" data-cursor></div>
<div class="cursor-follower" data-cursor-follower></div>
```

### CSS
```css
.cursor {
  position: fixed;
  top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10001;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, background 0.3s;
}
.cursor-follower {
  position: fixed;
  top: 0; left: 0;
  width: 40px; height: 40px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10001;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s, border-color 0.3s;
}

/* Expanded state on hover */
.cursor.is-expanded {
  width: 60px; height: 60px;
  background: var(--accent-secondary);
}
.cursor-follower.is-expanded {
  width: 80px; height: 80px;
  border-color: var(--accent-secondary);
}

/* Hidden on mobile */
@media (max-width: 768px) {
  .cursor, .cursor-follower { display: none; }
}

/* Hidden when typing */
body.is-typing .cursor,
body.is-typing .cursor-follower { opacity: 0; }
```

### JS
```js
const cursor = document.querySelector('[data-cursor]');
const follower = document.querySelector('[data-cursor-follower]');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
  gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.3, ease: 'power2.out' });
});

// Expand on interactive elements
document.querySelectorAll('a, button, .hover-3d, .card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-expanded');
    follower.classList.add('is-expanded');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-expanded');
    follower.classList.remove('is-expanded');
  });
});
```

## 2. Magnetic Buttons

Buttons that subtly follow the mouse when hovered, then snap back.

### HTML
```html
<button class="btn magnetic">Hover me</button>
```

### JS
```js
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
```

## 3. Smooth Image Hover

Images that scale and shift on hover with GSAP.

### CSS
```css
.smooth-img-wrap {
  overflow: hidden;
  border-radius: 16px;
}
.smooth-img-wrap img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}
.smooth-img-wrap:hover img {
  transform: scale(1.05);
}
```

## 4. Custom Selection Color

```css
::selection {
  background: var(--accent);
  color: var(--text);
}
::-moz-selection {
  background: var(--accent);
  color: var(--text);
}
```

## 5. Focus-Visible Ring

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

## 6. Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--accent-hover);
}
```

## 7. Magnetic Cursor on Hero

Hero section where the cursor pulls text toward it:

```js
const heroTitle = document.querySelector('.hero-title');
document.addEventListener('mousemove', e => {
  const rect = heroTitle.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = (e.clientX - centerX) * 0.02;
  const deltaY = (e.clientY - centerY) * 0.02;

  gsap.to(heroTitle, {
    x: deltaX,
    y: deltaY,
    duration: 1,
    ease: 'power2.out'
  });
});
```

## 8. Magnetic Text Pull

Each character in a headline is attracted to the cursor:

```js
function magneticText(selector) {
  const el = document.querySelector(selector);
  const chars = splitText(el, 'chars');

  document.addEventListener('mousemove', e => {
    chars.forEach(char => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
      const maxDist = 150;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 10;
        const angle = Math.atan2(charCenterY - e.clientY, charCenterX - e.clientX);
        gsap.to(char, {
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(char, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    });
  });
}
```

## 9. Image Parallax on Scroll

Images that move at different speed than their container:

```js
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.fromTo(img,
    { y: '-10%' },
    {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
});
```

## 10. Tilt Card

3D tilt effect on cards following mouse:

```js
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  });
});
```

## 11. Nav Background Blur on Scroll

```js
const nav = document.querySelector('nav');
ScrollTrigger.create({
  start: 100,
  onUpdate: self => {
    if (self.direction === 1 && window.scrollY > 100) {
      nav.classList.add('nav--scrolled');
    } else if (window.scrollY <= 100) {
      nav.classList.remove('nav--scrolled');
    }
  }
});
```

```css
nav {
  transition: background 0.3s, backdrop-filter 0.3s;
}
nav.nav--scrolled {
  background: rgba(6, 6, 10, 0.85);
  backdrop-filter: blur(20px) saturate(1.5);
}
```
