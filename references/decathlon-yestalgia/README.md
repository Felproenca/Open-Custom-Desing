# Decathlon Yestalgia — decathlonyestalgia.com

**Site original:** https://decathlonyestalgia.com
**Plataforma:** WordPress + Custom theme (Blueprint)
**Extraído em:** 2026-07-05

## Perfil de nicho

**Tipo:** E-commerce de moda esportiva / Retro branding / Coleção limitada
**Atende:** Lojas de moda, marcas esportivas, coleções retro/nostalgia, e-commerce premium

## Arquivos

- `index.html` — HTML completo (WordPress PHP renderizado)

## Padrões visuais (transferíveis)

| Padrão | Descrição | Transferível? |
|--------|-----------|---------------|
| **Retro/vintage design** | Estética anos 70/80 | Sim |
| **SVG illustrations** | Ilustrações SVG inline (OLAF mascot) | Sim |
| **Menu fullscreen** | Menu com tapes/cartões coloridos | Sim |
| **Scroll-driven sections** | Seções com scroll animado | Sim |
| **Language switcher** | Seletor de idioma (7 idiomas) | Sim |
| **Tailwind CSS** | Classes utilitárias | Sim |
| **Swup transitions** | Transições de página via AJAX | Parcial |
| **Retro typography** | Roboto Flex variable font | Sim |
| **Color palette retro** | Verde, laranja, bege | Sim |
| **Product grid** | Grid de produtos com hover | Sim |

## Cores do sistema

```css
--green: #00966E
--lime: #D7DD44
--orange: #F09341
--dark: #3B324C
--beige: #F4F4F4
--gray: #5C5B5B
```

## Tipografia

- **Roboto Flex** (variable: opsz, wdth, wght, XOPQ, XTRA, YOPQ, etc)
- CDN Google Fonts

## Assets SVG inline

- Logo Yestalgia (OLAF mascot) — complexo, 4 camadas
- Menu tape shapes (cada item tem SVG próprio)
- Olympic rings

## O que NÃO transferir

- Conteúdo proprietário (Decathlon, Yestalgia)
- OLAF mascot SVG
- WordPress/WP Rocket specifics
- Swup page transitions
- Multi-language routing
