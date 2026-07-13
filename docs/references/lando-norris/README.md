# Lando Norris — landonorris.com

**Site original:** https://landonorris.com
**Plataforma:** Webflow
**Studio:** OFF+BRAND (itsoffbrand.io)
**Extraído em:** 2026-07-05

## Perfil de nicho

**Tipo:** Atleta / Personalidade pública / Esportivo premium
**Atende:** Sites pessoais de atletas, celebridades, profissionais de esporte, portfólios pessoais de alto impacto

## Arquivos

- `index.html` — HTML completo da homepage
- `webflow.css` — CSS externo do Webflow (~10.000 linhas, reset + grid + componentes)
- `inline-styles.css` — CSS customizado extraído (variáveis, temas, animações, masks, seções)
- `assets.md` — Mapa completo de assets (imagens, SVGs, fonts, Rive animations)

## Padrões visuais (transferíveis)

| Padrão | Descrição | Transferível? |
|--------|-----------|---------------|
| **Fluid scaling** | `clamp()` com design-width 1728px, 4 breakpoints | Sim |
| **Data-attribute themes** | `[data-theme="dark"]`, `[data-theme="light"]`, `[data-theme="lime"]` | Sim |
| **Sticky hero** | Hero fullscreen com background e conteúdo centralizado | Sim |
| **Horizontal scroll gallery** | Track com scroll horizontal, items com hover overlay | Sim |
| **CSS marquee** | Infinito com `@keyframes translateXLeft/Right`, pausa no hover | Sim |
| **Split text animation** | `[split-text]` com `.line` e `.char` + clip-path reveal | Sim |
| **Impact text** | Tipografia display grande (font-family separada, 8.25rem+) | Sim |
| **Hover reveal grid** | Items com `clip-path: ellipse()` reveal no hover | Sim |
| **SVG mask sections** | `mask-image: url('...svg')` para formatos orgânicos | Sim |
| **Nav theme switching** | Nav muda cor baseado na seção visível via data-attribute | Sim |
| **Footer mask SVG** | Footer com clip-path SVG para borda orgânica | Sim |
| **Smooth scroll** | Lenis (requer JS) | Parcial (CSS scroll-behavior) |
| **Rive animations** | Canvas animations (hamburger, logo, decorative) | Não (precisa .riv) |
| **WebGL/canvas** | Backgrounds 3D/interativos | Não (precisa JS proprietário) |

## Cores do sistema

```css
--color--lime: #d2ff00;
--color--lime-off: #c8f500;
--color--dark-green: #101400;
--color--black: #000000;
--color--white: #ffffff;
--color--grey-1: #b0b3a8;
--color--grey-2: #5a5d52;
--color--grey-on-track: #8a8d80;
--color--green-off-white-2: #e8ffd4;
```

## Tipografia

- **Body:** Mona Sans (variable: wdth, wght) — `https://cdn.prod.website-files.com/.../MonaSans-VariableFont_wdth%2Cwght.woff2`
- **Display/Impact:** Brier (font-family separada para títulos grandes)

## Breakpoints

| Nome | Largura | design-unit |
|------|---------|-------------|
| Desktop | 1920px (max) / 992px (min) | 16 |
| Tablet | 991px - 768px | 20 |
| Mobile Landscape | 767px - 480px | 20 |
| Mobile Portrait | 479px - 320px | 48 |

## O que NÃO transferir

- Classes Webflow (`w-*`) — overhead, não necessárias
- Rive animations — requerem arquivos `.riv` proprietários
- WebGL/canvas — requerem JavaScript externo da OFF+BRAND (403)
- SVG masks específicos — substituir por masks genéricos ou novos
- Logos de parceiros — conteúdo proprietário
- Imagens de Lando — conteúdo proprietário

## Seções do site

1. Nav (logo SVG, links, store button, hamburger Rive)
2. Hero (fullscreen, background image, next race widget)
3. Message (assinatura SVG, quote com impact text)
4. Horizontal gallery (scroll infinito com overlays)
5. On Track / Off Track (cards com hover)
6. Helmets Hall of Fame (grid com hover reveal clip-path)
7. Store (background, CTA lime)
8. Partners marquee (logos em scroll infinito)
9. Social feed (grid de imagens)
10. Footer (links, SVG mask, partner logos)
