# Fortunato Trader — Site de Trading

**Projeto:** Site premium para trader de mercado americano
**Estilo:** GTA6-inspired (dark, massive typography, parallax, video-like sections)
**Técnicas:** Lenis smooth scroll, Intersection Observer reveals, SVG charts
**Extraído em:** 2026-07-07

## Arquivos

- `index.html` — Site completo (HTML/CSS/JS single file)
- `assets/images/` — Imagens do NinjaTrader

## Assets

| Tipo | Qtd | Descrição |
|------|-----|-----------|
| HTML | 1 | Site completo auto-contido |
| Imagens | 6 | Screenshots NinjaTrader (desktop, web, mobile, devices, lifestyle) |
| Fonts | 3 | Anton, Inter, JetBrains Mono (Google Fonts) |
| Lib | 1 | Lenis smooth scroll (CDN) |

## Padrões Visuais (GTA6 Style)

| Padrão | Implementação |
|--------|---------------|
| **Dark theme** | #050505 base, orange accent (#FF6A00) |
| **Massive typography** | Anton font, clamp(3.5rem, 10vw, 10rem) |
| **Text reveal on scroll** | Intersection Observer + CSS transforms |
| **Parallax sections** | background-attachment: fixed |
| **Fullscreen hero** | 100vh with particles and grid overlay |
| **Counter animations** | Animated numbers on scroll |
| **SVG trading charts** | Custom candlestick-style chart |
| **Ticker bar** | Infinite scroll market data |
| **Lenis smooth scroll** | Buttery smooth 60fps scrolling |

## Cores

```
Background: #050505
Surface: #0A0A0A / #111111
Border: #1E1E1E / #2A2A2A
Accent: #FF6A00 (orange — GTA style)
Gain: #00E676
Loss: #FF1744
Blue: #2979FF
Text: #FFFFFF / #A0A0A0
```

## Dependências Externas

- **Lenis** (CDN): `https://unpkg.com/lenis@1.1.18/dist/lenis.min.js`
- **Google Fonts**: Anton, Inter, JetBrains Mono

## O que NÃO transferir

- Conteúdo proprietário (NinjaTrader)
- Imagens de screenshots (uso referencial)
- Dados de mercado fictícios (ticks do ticker bar)
