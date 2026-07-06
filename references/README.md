# References — Sites Premium como Template Base

Cada pasta contém o código fonte extraído de um site premium, organizado para adaptação por nicho.

## Estrutura por referência

```
referencia-nome/
├── index.html          # HTML completo extraído com Playwright
├── styles.css          # CSS real extraído do site (ou variáveis se CSS bundlado)
├── assets/             # Imagens, fonts, SVGs, JS baixados
├── assets.md           # Mapa de assets com quantidades e tamanhos
└── README.md           # Perfil: nicho, padrões, transferível vs proprietário
```

## Índice

| # | Referência | Nicho | CSS | Assets | Transferível |
|---|-----------|-------|-----|--------|-------------|
| 1 | [lando-norris](./lando-norris/) | Atleta/Personalidade | ✅ Completo | ✅ | Layout, animações, cores |
| 2 | [crav-burgers](./crav-burgers/) | Restaurante/Food | ✅ 55KB | ✅ 36 | Hero gigante, waves, text stroke |
| 3 | [decathlon-yestalgia](./decathlon-yestalgia/) | Moda Esportiva/Retro | ✅ 79KB | ✅ 45 | Retro palette, menu fullscreen |
| 4 | [realfood-gov](./realfood-gov/) | Governo/Saúde | ✅ 197KB | ✅ 64 | Stats animados, FAQ, scroll text |
| 5 | [revelo-framer](./revelo-framer/) | Product Showcase | ✅ Lenis | ✅ 33 | Dark theme, text reveal, pricing |
| 6 | [mariafilo](./mariafilo/) | Moda Feminina | ✅ CDN | ✅ 113 | Split hero, horizontal scroll |
| 7 | [rockstar-gta6](./rockstar-gta6/) | Entretenimento/Games | ❌ WebGL | ⚠️ Conceitual | Tipografia, parallax (conceito) |
| 8 | [telescope-fyi](./telescope-fyi/) | Discovery/Curadoria | ❌ SPA vazia | ⚠️ Conceitual | Card grid, accent (conceito) |

## Como usar

1. Identificar o nicho do prospect
2. Escolher referência mais próxima (coluna "Nicho")
3. Ler `README.md` para padrões transferíveis
4. Ler `styles.css` para CSS real (ou `assets.md` para paleta)
5. Adaptar: substituir cores, fontes, conteúdo, imagens

## Referências conceituais

**rockstar-gta6** e **telescope-fyi** não têm CSS extraível — o primeiro usa WebGL/Three.js, o segundo é SPA pura com HTML vazio. Funcionam como referência visual/conceitual, mas o template precisa ser recriado do zero inspirado nos padrões.

## Padrões transferíveis (universais)

### Layout
- Fluid scaling com `clamp()` (design-width 1728px)
- Sticky hero fullscreen
- Horizontal scroll gallery
- CSS marquee infinito
- Fullscreen menu

### Typography
- Impact text (font-family display separada)
- Text stroke
- Variable fonts
- Split text animation

### Visual
- Hover reveal com clip-path
- SVG masks para formatos orgânicos
- Jelly wave dividers
- Parallax scroll
- Scroll-triggered reveals

### Components
- Nav theme switching
- Stats bars animados
- FAQ accordion
- Product grid com hover
- Blob buttons SVG

### Colors & Theme
- Data-attribute themes
- Dark/Light mode
- CSS variables isoladas
