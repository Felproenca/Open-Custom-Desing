# Text Choreography Reference

## 1. Character-by-Character Reveal

Each character animates in individually with stagger. Creates the "typewriter" premium feel.

### Basic chars reveal
```js
Choreography.reveal('.hero-title', {
  type: 'chars',
  stagger: 0.03,
  duration: 1.2,
  ease: 'expo.out',
  delay: 0.3
});
```

### Implementation (GSAP-based)
```js
function revealChars(selector, opts) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.textContent;
  el.innerHTML = '';
  el.style.opacity = '1';

  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    el.appendChild(span);
    return span;
  });

  gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: opts.duration || 1,
    stagger: opts.stagger || 0.03,
    ease: opts.ease || 'expo.out',
    delay: opts.delay || 0
  });
}
```

## 2. Word-by-Word Reveal

Each word animates in. Good for subtitles and descriptions.

```js
Choreography.reveal('.subtitle', {
  type: 'words',
  stagger: 0.08,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.5
});
```

## 3. Clip-Path Line Reveal (Google-style)

Each line is clipped from bottom, revealing upward. Clean, editorial.

### Implementation
```js
function clipReveal(selector, opts) {
  const el = document.querySelector(selector);
  if (!el) return;

  // Wrap each line in a clip container
  const lines = el.innerHTML.split('<br>').length > 1
    ? el.innerHTML.split('<br>')
    : [el.innerHTML];

  el.innerHTML = lines.map((line, i) =>
    `<span class="clip-line" style="display:block;overflow:hidden;">
      <span style="display:inline-block;transform:translateY(100%);">${line}</span>
    </span>`
  ).join('');

  const spans = el.querySelectorAll('.clip-line > span');

  gsap.to(spans, {
    y: 0,
    duration: opts.duration || 0.8,
    stagger: opts.stagger || 0.15,
    ease: opts.ease || 'power4.out',
    delay: opts.delay || 0
  });
}
```

### CSS for clip lines
```css
.clip-line {
  display: block;
  overflow: hidden;
  line-height: 1.1;
}
.clip-line > span {
  display: inline-block;
}
```

## 4. Stagger Grid Reveal

Cards or grid items reveal with staggered delay.

```html
<div class="grid-3">
  <div class="card" data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0">...</div>
  <div class="card" data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.1">...</div>
  <div class="card" data-scroll data-scroll-reveal="fade-up" data-scroll-delay="0.2">...</div>
</div>
```

### GSAP implementation
```js
gsap.utils.toArray('.grid-3 .card').forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    delay: i * 0.1
  });
});
```

## 5. Counter Animation

Numbers count up from 0 to their final value.

```js
function animateCounter(el, target) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.val).toLocaleString();
    }
  });
}
```

## 6. Split Text into Spans

Utility to split text for per-character/word animation:

```js
function splitText(el, type = 'chars') {
  const text = el.textContent;
  el.innerHTML = '';
  const items = type === 'chars' ? text.split('') : text.split(' ');
  return items.map(item => {
    const span = document.createElement('span');
    span.textContent = item === ' ' ? '\u00A0' : item;
    span.style.display = 'inline-block';
    el.appendChild(span);
    return span;
  });
}
```

## 7. Scroll-Linked Text Reveal

Text reveals based on scroll progress (not just viewport entry):

```js
gsap.from('.scroll-text', {
  opacity: 0,
  y: 40,
  scrollTrigger: {
    trigger: '.scroll-text',
    start: 'top 90%',
    end: 'top 50%',
    scrub: true
  }
});
```

## 8. Masked Text (clip-path reveal)

Use `clip-path` for dramatic reveal:

```css
.masked-text {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.masked-text.revealed {
  clip-path: inset(0 0 0 0);
}
```

```js
gsap.to('.masked-text', {
  clipPath: 'inset(0 0% 0 0)',
  duration: 1.2,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '.masked-text',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
```

## 9. Easing Reference

| Ease | Feel | Use for |
|------|------|---------|
| `expo.out` | Fast start, slow end | Character reveals |
| `power4.out` | Strong snap | Clip-path reveals |
| `power3.out` | Medium snap | Card reveals |
| `power2.inOut` | Smooth | Transitions |
| `back.out(1.7)` | Overshoot | Stats/counters |
| `elastic.out(1, 0.3)` | Bouncy | Playful accents |
| `circ.out` | Circular | Large text reveals |
