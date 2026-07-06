# References — Sites Premium como Template Base

Cada pasta contém o código fonte extraído de um site premium, organizado para adaptação por nicho.

## Estrutura por referência

```
referencia-nome/
├── index.html          # HTML completo extraído
├── styles.css          # CSS customizado (cores, tipografia, variáveis)
├── assets.md           # Mapa de assets (imagens, SVGs, fonts)
└── README.md           # Perfil: nicho, padrões, transferível vs proprietário
```

## Índice

| # | Referência | Site | Nicho | Padrões principais |
|---|-----------|------|-------|-------------------|
| 1 | [lando-norris](./lando-norris/) | landonorris.com | Atleta/Personalidade | Fluid scaling, marquee, split-text, SVG masks, hover reveal |
| 2 | [rockstar-gta6](./rockstar-gta6/) | rockstargames.com/VI | Entretenimento/Games | Hero fullscreen, tipografia massiva, parallax, video embed |
| 3 | [realfood-gov](./realfood-gov/) | realfood.gov | Governo/Saúde | Sticky sections, stats animados, FAQ accordion, scroll text |
| 4 | [revelo-framer](./revelo-framer/) | revelo.darkroom.engineering | Product showcase | Text reveal, dark theme, variable fonts, pricing |
| 5 | [telescope-fyi](./telescope-fyi/) | telescope.fyi | Discovery/Curadoria | SPA minimal, lime accent, card grid |
| 6 | [crav-burgers](./crav-burgers/) | cravburgers.shop | Restaurante/Food | Hero gigante, jelly wave, blob buttons, text stroke, marquee |
| 7 | [decathlon-yestalgia](./decathlonyestalgia/) | decathlonyestalgia.com | Moda esportiva/Retro | Retro/vintage, SVG illustrations, menu fullscreen, product grid |
| 8 | [mariafilo](./mariafilo/) | mariafilo.com.br | Moda feminina | Split hero, horizontal scroll, manifesto, product highlight |

## Como usar

1. Identificar o nicho do prospect
2. Escolher referência mais próxima (coluna "Nicho")
3. Ler `README.md` da pasta para padrões transferíveis
4. Ler `styles.css` para variáveis de cores e tipografia
5. Ler `assets.md` para mapear assets disponíveis
6. Adaptar: substituir cores, fontes, conteúdo, imagens

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
- Variable fonts (um eixo = multi-pesos)
- Split text animation (char por char)

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
