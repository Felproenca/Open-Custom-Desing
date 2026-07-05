# Premium Creative Layout Library

Use these pre-coded layout structures. When writing your artifact, paste them inside `<main id="content">` and configure the copy. Ensure `data-od-id` matches the unique name of the section.

---

## 1. Asymmetric Grid Gallery

An off-center, editorial grid for projects or features. Images scroll with custom parallax.

```html
<section id="work" class="bg-dots" data-od-id="work-gallery">
  <div class="grid-12">
    <!-- Header -->
    <div style="grid-column: 1 / span 12; margin-bottom: 60px;">
      <span class="eyebrow">SELECTED WORK</span>
      <h2 style="font-family: var(--font-display); font-size: clamp(32px, 5vw, 64px); text-transform: uppercase;">Curated Projects</h2>
    </div>
    
    <!-- Item 1 (Offset Left) -->
    <div style="grid-column: 1 / span 7; margin-bottom: 80px;" class="studio-card">
      <div class="img-wrapper">
        <!-- Parallax image -->
        <div class="ph-img parallax-image" style="height: 450px;">[PROJECT_01_IMAGE]</div>
      </div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; opacity: 0.5;">01 / PRODUCT DESIGN</span>
          <h3 style="font-family: var(--font-display); font-size: 24px; text-transform: uppercase; margin-top: 8px;">Aether Interactive</h3>
        </div>
        <span style="font-family: var(--font-serif); font-style: italic; opacity: 0.7;">2026</span>
      </div>
    </div>
    
    <!-- Item 2 (Offset Right & Down) -->
    <div style="grid-column: 8 / span 5; margin-top: 120px; margin-bottom: 80px;" class="studio-card">
      <div class="img-wrapper">
        <div class="ph-img parallax-image" style="height: 380px;">[PROJECT_02_IMAGE]</div>
      </div>
      <div style="margin-top: 24px;">
        <span style="font-family: var(--font-mono); font-size: 11px; opacity: 0.5;">02 / INTERACTIVE INSTALLATION</span>
        <h3 style="font-family: var(--font-display); font-size: 24px; text-transform: uppercase; margin-top: 8px;">Helios Installation</h3>
      </div>
    </div>
  </div>
</section>
```

---

## 2. Horizontal Scroll Section

A container that locks vertically and scrolls horizontally through cards. Perfect for showcases.
Add the GSAP logic to translate the target container `.horizontal-scroll-container` along the X-axis based on scroll distance.

```html
<section id="showcase-horizontal" style="padding: 0; overflow: hidden;" data-od-id="horizontal-scroll">
  <!-- Scroll Pin Wrapper -->
  <div class="pin-wrapper" style="height: 300vh; position: relative;">
    <!-- Sticky content container -->
    <div style="position: sticky; top: 0; height: 100vh; width: 100vw; display: flex; align-items: center; overflow: hidden; background: #070708;">
      
      <!-- Title block stays static left -->
      <div style="padding: 0 48px; width: 30vw; flex-shrink: 0; z-index: 10;">
        <span class="eyebrow">PERSPECTIVES</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(32px, 4vw, 54px); text-transform: uppercase; line-height: 1.0;">Design<br>Philosophy</h2>
      </div>
      
      <!-- Horizontal sliding track -->
      <div class="horizontal-scroll-track" style="display: flex; gap: 40px; padding-right: 100px; width: 200vw;">
        
        <!-- Card 1 -->
        <div style="width: 450px; flex-shrink: 0; border: 1px solid var(--neutral-border); background: var(--neutral); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; height: 500px;">
          <span style="font-family: var(--font-mono); font-size: 24px; color: var(--accent);">01</span>
          <div>
            <h3 style="font-family: var(--font-display); font-size: 28px; text-transform: uppercase; margin-bottom: 16px;">Fluid motion</h3>
            <p style="font-size: 14px; opacity: 0.7;">We use high-fidelity physics models to design scrolling dynamics. Scroll is no longer passive, but active cinema.</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div style="width: 450px; flex-shrink: 0; border: 1px solid var(--neutral-border); background: var(--neutral); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; height: 500px;">
          <span style="font-family: var(--font-mono); font-size: 24px; color: var(--accent);">02</span>
          <div>
            <h3 style="font-family: var(--font-display); font-size: 28px; text-transform: uppercase; margin-bottom: 16px;">Micro detail</h3>
            <p style="font-size: 14px; opacity: 0.7;">Bespoke cursors, letter spacing reveal animations, and hover-triggered grid expansions that respond dynamically.</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div style="width: 450px; flex-shrink: 0; border: 1px solid var(--neutral-border); background: var(--neutral); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; height: 500px;">
          <span style="font-family: var(--font-mono); font-size: 24px; color: var(--accent);">03</span>
          <div>
            <h3 style="font-family: var(--font-display); font-size: 28px; text-transform: uppercase; margin-bottom: 16px;">Immersive sound</h3>
            <p style="font-size: 14px; opacity: 0.7;">Soft interaction click sounds and low ambient hums that follow the scroll velocity, creating audio-visual unity.</p>
          </div>
        </div>
        
      </div>
      
    </div>
  </div>
</section>

<!-- Corresponding GSAP Script required:
<script>
  gsap.to('.horizontal-scroll-track', {
    x: () => -(document.querySelector('.horizontal-scroll-track').scrollWidth - window.innerWidth * 0.7),
    ease: 'none',
    scrollTrigger: {
      trigger: '#showcase-horizontal .pin-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
</script>
-->
```

---

## 3. Text Pin & Scroll Reveal Section

A section where a massive headline is pinned in the middle of the screen. As you scroll, the text changes color or highlights word by word.

```html
<section id="manifesto" class="fullscreen-section" style="padding: 0; overflow: hidden; background: #000;" data-od-id="text-reveal-manifesto">
  <div class="pin-manifesto-wrapper" style="height: 250vh; width: 100%; position: relative;">
    <div style="position: sticky; top: 0; height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; padding: 0 80px;">
      
      <p class="manifesto-text" style="font-family: var(--font-serif); font-size: clamp(32px, 5vw, 68px); line-height: 1.2; text-align: center; max-width: 1200px; font-weight: 400; color: rgba(245, 245, 247, 0.15);">
        <!-- Highlight parts by enclosing them in spans -->
        <span class="manifesto-span">[FIRST PART OF STATEMENT]</span> 
        <span class="manifesto-span" style="color: var(--accent);">[KEY ACCENT STATEMENT]</span> 
        <span class="manifesto-span">[FINAL CONCLUDING PHILOSOPHY STATEMENT]</span>
      </p>
      
    </div>
  </div>
</section>

<!-- Corresponding GSAP Script required:
<script>
  gsap.to('.manifesto-text span', {
    color: '#F5F5F7',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#manifesto .pin-manifesto-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
</script>
-->
```

---

## 4. Editorial Split Section

A full screen split container showing a massive quote or description on the left, and a scrolling image showcase on the right.

```html
<section id="about" data-od-id="editorial-split">
  <div class="grid-12">
    <!-- Left column: Sticky info -->
    <div style="grid-column: 1 / span 5; position: sticky; top: 120px; height: fit-content; margin-bottom: 60px;">
      <span class="eyebrow">ABOUT THE LAB</span>
      <h2 style="font-family: var(--font-display); font-size: clamp(36px, 4vw, 56px); text-transform: uppercase; line-height: 1.0; margin-bottom: 32px;">Crafting<br>Fluidity</h2>
      <p class="body-lead" style="margin-bottom: 24px;">Our work is rooted in high-end minimalism, combining strict typesetting grid structures with organic, smooth-scroll interactions.</p>
      <p style="opacity: 0.6; font-size: 14px;">We operate at the intersection of development and design. We believe animation isn't secondary—it's the core structural layer that communicates quality.</p>
    </div>
    
    <!-- Right column: Images -->
    <div style="grid-column: 7 / span 6; display: flex; flex-direction: column; gap: 80px;">
      <div class="studio-card">
        <div class="img-wrapper">
          <div class="ph-img" style="height: 500px;">[CREATIVE_STUDIO_INTERIOR]</div>
        </div>
        <h4 style="font-family: var(--font-mono); font-size: 11px; margin-top: 16px; opacity: 0.5;">01 / THE PHYSICAL LAB</h4>
      </div>
      
      <div class="studio-card">
        <div class="img-wrapper">
          <div class="ph-img" style="height: 500px;">[DEVELOPMENT_WORK_PROCESS]</div>
        </div>
        <h4 style="font-family: var(--font-mono); font-size: 11px; margin-top: 16px; opacity: 0.5;">02 / THE INTERACTION MATRIX</h4>
      </div>
    </div>
  </div>
</section>
```

---

## 5. Curator Contact Block

A full screen creative contact footer with large display typography, clickable email, and clean line coordinates.

```html
<section id="contact" style="background: #000; border-bottom: none;" data-od-id="contact-footer">
  <div class="grid-12" style="padding-top: 80px; padding-bottom: 80px;">
    <div style="grid-column: 1 / span 12; border-bottom: 1px solid var(--neutral-border); padding-bottom: 60px; margin-bottom: 60px;">
      <span class="eyebrow">GET IN TOUCH</span>
      <h2 style="font-family: var(--font-display); font-size: clamp(40px, 8vw, 96px); text-transform: uppercase; line-height: 0.9; margin-top: 16px;">
        Let's build a<br><span class="serif-italic" style="color: var(--accent);">masterpiece</span>.
      </h2>
    </div>
    
    <!-- Left details -->
    <div style="grid-column: 1 / span 6;">
      <p style="font-size: 18px; margin-bottom: 40px; font-weight: 300;">Have a project in mind, or want to explore new designs? Reach out to collaborate.</p>
      <a href="mailto:hello@studio-od.design" class="btn-creative" style="font-size: 12px; padding: 20px 48px;">hello@studio-od.design</a>
    </div>
    
    <!-- Right stats/links -->
    <div style="grid-column: 8 / span 5; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <p style="font-family: var(--font-mono); font-size: 11px; color: var(--accent); margin-bottom: 12px;">OFFICE</p>
        <p style="font-size: 14px; opacity: 0.7;">Av. Paulista, 1000<br>São Paulo, SP — Brazil</p>
      </div>
      
      <div style="margin-top: 40px;">
        <p style="font-family: var(--font-mono); font-size: 11px; color: var(--accent); margin-bottom: 12px;">FOLLOW</p>
        <div style="display: flex; gap: 24px;">
          <a href="#" class="nav-link" style="font-size: 12px;">Awwwards</a>
          <a href="#" class="nav-link" style="font-size: 12px;">Dribbble</a>
          <a href="#" class="nav-link" style="font-size: 12px;">Instagram</a>
        </div>
      </div>
    </div>
  </div>
</section>
```
