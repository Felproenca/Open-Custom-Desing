# Video Integration Reference

## 1. Embedded Video with Scroll Control

### Basic Setup
```html
<video
  data-scroll-video
  muted
  playsinline
  preload="auto"
  poster="poster-frame.jpg"
>
  <source src="video.mp4" type="video/mp4" />
</video>
```

**Required attributes:**
- `muted` — browsers require muted for autoplay/programmatic play
- `playsinline` — prevents fullscreen on iOS
- `preload="auto"` — loads video data early for smooth scrub
- `poster` — shows image before video loads/starts

### Scroll-Linked Playback
Video plays forward as you scroll down, reverses as you scroll up.

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

### Bounded Playback Range
Only play video during a specific scroll range (e.g., 30%-70% of viewport):

```js
ScrollTrigger.create({
  trigger: video,
  start: 'top 70%',
  end: 'bottom 30%',
  scrub: true,
  onUpdate: self => {
    if (video.duration) {
      video.currentTime = self.progress * video.duration;
    }
  }
});
```

### Multiple Videos
Each video gets its own ScrollTrigger. Don't share triggers across videos.

```js
document.querySelectorAll('[data-scroll-video]').forEach(video => {
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
});
```

---

## 2. Video Sections

### Full-Bleed Video Hero
```html
<section style="position:relative; height:100vh; overflow:hidden;">
  <video data-scroll-video muted playsinline preload="auto"
    style="width:100%; height:100%; object-fit:cover;">
    <source src="hero.mp4" type="video/mp4" />
  </video>
  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
    <h1 style="color:white; text-shadow:0 2px 20px rgba(0,0,0,0.5);">Headline</h1>
  </div>
</section>
```

### Video with Ken Burns Container
Wrap video in a Ken Burns container for subtle zoom during scroll:
```html
<div data-scroll data-scroll-image-motion="ken-burns" style="border-radius:16px; overflow:hidden; aspect-ratio:16/9;">
  <video data-scroll-video muted playsinline preload="auto"
    style="width:100%; height:100%; object-fit:cover;">
    <source src="demo.mp4" type="video/mp4" />
  </video>
</div>
```

### Video + Parallax
Video moves at different speed than surrounding content:
```html
<section style="position:relative; overflow:hidden; min-height:80vh;">
  <div data-scroll data-scroll-speed="-0.2" style="position:absolute; inset:-10%;">
    <video data-scroll-video muted playsinline preload="auto"
      style="width:100%; height:120%; object-fit:cover;">
      <source src="bg.mp4" type="video/mp4" />
    </video>
  </div>
  <div data-scroll data-scroll-speed="0.1" style="position:relative; z-index:1; padding:120px;">
    <h2>Overlay content</h2>
  </div>
</section>
```

---

## 3. Video with Captions

### HTML5 Track
```html
<video data-scroll-video muted playsinline preload="auto">
  <source src="video.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default />
</video>
```

### Styled Captions
```css
video::cue {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 4px 8px;
  border-radius: 4px;
}
```

---

## 4. Performance Considerations

### Preload Strategy
| Strategy | Use case |
|----------|----------|
| `preload="auto"` | Video below fold — loads in background |
| `preload="metadata"` | Video above fold — loads size/duration only |
| `preload="none"` | Videos not yet needed — load on scroll |

### Lazy Loading
For videos not in initial viewport:
```html
<video data-scroll-video muted playsinline preload="none" loading="lazy">
```

### Source Formats
Provide multiple formats for cross-browser support:
```html
<video data-scroll-video muted playsinline preload="auto">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
</video>
```

### Memory Management
- Pause videos when not in viewport
- Remove `src` attribute for off-screen videos if memory is a concern
- Use `preload="none"` for distant videos

```js
// Auto-pause when out of viewport
ScrollTrigger.create({
  trigger: video,
  start: 'top bottom',
  end: 'bottom top',
  onLeave: () => video.pause(),
  onEnterBack: () => video.pause() // scrub controls playback
});
```

---

## 5. Mobile Considerations

### iOS Quirks
- Must have `playsinline` attribute
- Must be muted
- `preload` may be ignored (iOS loads on user interaction)
- Scroll-linked video may not work smoothly on older iOS

### Android
- Generally better scroll-linked video support
- `preload="auto"` works reliably
- Some browsers throttle video decode when tab is backgrounded

### Fallback
If scroll-linked video doesn't work (low-end device, old browser), show poster frame:
```html
<video data-scroll-video muted playsinline preload="auto" poster="fallback.jpg">
  <source src="video.mp4" type="video/mp4" />
</video>
```
