# Lando Norris Website — Reference Assets

Site: https://landonorris.com
Plataforma: Webflow
Extraído em: 2026-07-05

## Arquivos

- `index.html` — HTML completo da homepage
- `lando-offbrand.shared.043b62fef.css` — CSS externo do Webflow (~10.000 linhas)
- `inline-styles.css` — CSS inline extraído do HTML (variáveis, temas, animações, masks)

## Sistema de Design

### Cores (CSS Variables)
```css
--color--lime          /* #d2ff00 - cor principal */
--color--lime-off      /* variante lime */
--color--dark-green    /* #101400 - fundo dark */
--color--black         /* #000 */
--color--white         /* #fff */
--color--grey-1        /* cinza claro */
--color--grey-2        /* cinza médio */
--color--grey-on-track /* cinza seção on-track */
--color--green-off-white-2 /* variante verde */
```

### Tipografia
- **Principal**: Mona Sans (variable font: wdth, wght)
  - URL: `https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67bc6274c5b4108b123aa4d5_MonaSans-VariableFont_wdth%2Cwght.woff2`
- **Display/Impacto**: Brier (font-family para textos grandes)
- **Body font-size**: 16px (design-unit), escala fluida

### Fluid Scaling
```css
--design-width: 1728    /* largura de referência */
--min-width: 992px      /* início da escala */
--max-width: 1920px     /* fim da escala */
--fluid-font: calc(var(--fluid-container) / var(--design-width) * var(--design-unit))
```

Breakpoints:
- Desktop: 1920px (max) / 992px (min)
- Tablet: 991px - 768px
- Mobile Landscape: 767px - 480px
- Mobile Portrait: 479px - 320px

### Animações
```css
--cubic-default: cubic-bezier(0.65, 0.05, 0, 1)
--duration-default: 0.75s
--animation-default: var(--duration-default) var(--cubic-default)
```

### Temas
- `[data-theme="dark"]` — fundo dark-green, texto white
- `[data-theme="light"]` — fundo light, nav preta
- `[data-theme="lime"]` — fundo lime, texto preto
- `[data-nav-theme="light"]` / `[data-nav-theme="dark"]` — controle do nav

## Assets Externos (CDN)

### Fontes
| Fonte | URL |
|-------|-----|
| Mona Sans Variable | `https://cdn.prod.website-files.com/.../MonaSans-VariableFont_wdth,wght.woff2` |

### Favicon
| Tipo | URL |
|------|-----|
| Favicon PNG | `https://cdn.prod.website-files.com/.../ln-favicon.png` |
| Apple Touch Icon | `https://cdn.prod.website-files.com/.../ln-webclip.png` |
| OpenGraph Image | `https://cdn.prod.website-files.com/.../lando-OpenGraph.webp` |

### Imagens (WebP)
| Descrição | URL |
|-----------|-----|
| Menu img 1 | `https://cdn.prod.website-files.com/.../ln4-menu-img-1.webp` |
| Menu img 2 | `https://cdn.prod.website-files.com/.../ln4-menu-img-2.webp` |
| Menu img 3 | `https://cdn.prod.website-files.com/.../ln4-menu-img-3.webp` |
| Menu img 5 (Lando in F1) | `https://cdn.prod.website-files.com/.../ln4-menu-img-5.webp` |
| Lando helmet profile | `https://cdn.prod.website-files.com/.../ln4-hp-lando-helmet.webp` |
| Lando fleece profile | `https://cdn.prod.website-files.com/.../ln4-hp-lando-head.webp` |
| Lando helmet large | `https://cdn.prod.website-files.com/.../ln-home-helm-large.webp` |
| Hero horizontal 1-10 | `https://cdn.prod.website-files.com/.../ln-home-horiz-[1-10].webp` |
| Store gold images | `https://cdn.prod.website-files.com/.../lando-store-gold-[1-5].webp` |
| Social images | `https://cdn.prod.website-files.com/.../ln-social-img-[2,6].webp` |
| Footer 360 helmet | `https://cdn.prod.website-files.com/.../ln-360-helm-1.webp` |

### Helmets (base + hover pairs)
| Nome | Ano | Base | Hover |
|------|-----|------|-------|
| Season | 2025 | `In-helm-2025-Season-base.webp` | `In-helm-2025-Season-hover.webp` |
| Discoball | 2025 | `In-helm-2025-Discoball-base.webp` | `In-helm-2025-Discoball-hover.webp` |
| Dark Glitter | 2025 | `In-helm-2025-DarkGlitter-base.webp` | `In-helm-2025-DarkGlitter-hover.webp` |
| Season | 2024 | `In-helm-2024-Season-base.webp` | `In-helm-2024-Season-hover.webp` |
| Porcelain | 2024 | `In-helm-2024-Porcelain-base.webp` | `In-helm-2024-Porcelain-hover.webp` |
| Japan | 2024 | `In-helm-2024-Japan-base.webp` | `In-helm-2024-Japan-hover.webp` |
| GIF | 2024 | `In-helm-2024-GIF Helmet-base.webp` | `In-helm-2024-GIF Helmet-hover.webp` |
| Dark Mode | 2024 | `In-helm-2024-DarkMode-base.webp` | `In-helm-2024-DarkMode-hover.webp` |
| Race 100 | 2023 | `In-helm-2023-Race 100-base.webp` | `In-helm-2023-Race 100-hover.webp` |
| Las Vegas | 2023 | `In-helm-2023-Las Vegas-base.webp` | `In-helm-2023-Las Vegas-hover.webp` |
| Chrome | 2023 | `In-helm-2023-Chrome-base.webp` | `In-helm-2023-Chrome-hover.webp` |
| Beachball | 2023 | `In-helm-2023-Beach Ball-base.webp` | `In-helm-2023-Beach Ball-hover.webp` |
| Basketball | 2022 | `In-helm-2022-Basketball-base.webp` | `In-helm-2022-Basketball-hover.webp` |
| Season | 2021 | `ln-helm-2021-base.webp` | `ln-helm-2021-hover.webp` |
| Silverstone | 2020 | `In-helm-2020-Silverstone-base.webp` | `In-helm-2020-Silverstone-hover.webp` |
| Season | 2019 | `In-helm-2019-base.webp` | `In-helm-2019-hover.webp` |

### SVG Masks
| Descrição | URL |
|-----------|-----|
| Helmet mask fill | `.../ln4-2-helm-mask-fill.svg` |
| Helmet mask mobile | `.../ln4-helm-mob-refactor-lime-fill.svg` |
| Helmet extender grey | `.../ln4-2-helm-mask-extender-grey-fade.png` |
| Helmet extender lime | `.../ln4-2-helm-mask-extender-lime-fade.png` |
| Footer mask desktop | `.../ln4-footer-mask-desktop.svg` |
| Footer mask mobile | `.../ln4-footer-mask-mobile.svg` |
| Calendar track mask | `.../ln-calendar-track-mask.svg` |
| Off-track masks | `.../ln4-off-track-mask-case-left.svg`, `...-right.svg` |
| Off-track callout masks | `.../ln4-off-track-mask-callout-right.svg`, `...-left.svg` |

### Partner Logos (SVG)
- Ralph Lauren: `ln4-ln4-collab-logo-ralph.svg`
- Mind: `ln4-ln4-collab-logo-mind.svg`
- PlayStation: `ln4-ln4-collab-logo-ps4.svg`
- Quadrant: `ln4-ln4-collab-logo-quadrant.svg`
- Tumi: `ln4-ln4-collab-logo-tumi.svg`
- Hilton: `ln4-ln4-collab-logo-hilton.svg`
- Uber: `ln4-ln4-collab-logo-uber.svg`
- LN Kart: `ln4-ln4-collab-lnkart.svg`
- Bell Helmets: `ln4-ln4-collab-bell-helmets.svg`
- Pure Electric: `ln4-ln4-collab-pure-electric.svg`
- Google: `ln4-ln4-collab-google.svg`

### Footer Partner Logos
- Google, Ralph Lauren, Android, PAP, Monster, Hilton

### SVG Brand
- LN Logo SVG (inline no nav): paths `nav-brand-path="1"` e `nav-brand-path="2"`
- Lando Norris Text mobile: `ln4-lando-norris-text-mobile.svg`
- Lando signature lime: `ln4-hw-signature2.svg`
- LN Logo: `ln4-LN-logo-svg.svg`
- Signature dark green: `ln4-signature-dark-green.webp`

### Rive Animations (Canvas)
| Elemento | Data Attribute | Artboard | State Machine |
|----------|---------------|----------|---------------|
| Hamburger menu | `data-rive-nav-hamburger` | `hamburger` | `hamburger` |
| LN4 logo | `data-rive-ln4` | — | — |
| Footer Rive | `data-rive-placeholder` | — | — |
| Collab Rive | `data-rive-placeholder` | — | — |

## JavaScript Externo (não disponível - 403)
- `https://lando.itsoffbrand.io/dev-js/lando.OFF+BRAND.gold-android-fix-03.js`
- Controla: Lenis smooth scroll, Rive animations, Split Text, Marquees, Theme switching

## Estrutura de Seções (HTML)
1. **Nav** — Logo SVG, links (Home, On Track, Off Track, Calendar), Store button
2. **Hero** — Mensagem de Lando, assinatura, next race widget
3. **Horizontal Scroll** — Galeria de fotos com parallax
4. **On Track / Off Track** — Cards de navegação
5. **Helmets Hall of Fame** — Grid de capacetes com hover reveal
6. **Store** — World Drivers' Champion collection
7. **Partners & Campaigns** — Logo marquee
8. **Social Feed** — Imagens Instagram
9. **Footer** — Links, partners, newsletter, assinatura
