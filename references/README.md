# References — Sites Premium como Template Base

Cada pasta contém o código fonte extraído de um site premium, organizado para ser usado como base de um template adaptável.

## Índice

| Referência | Site | Nicho | Padrões principais |
|-----------|------|-------|-------------------|
| [lando-norris](./lando-norris/) | landonorris.com | Atleta / Personalidade pública | Sticky hero, horizontal scroll, marquee, split-text, hover reveal grid, SVG masks, fluid scaling |
| [rockstar-gta6](./rockstar-gta6/) | rockstargames.com/VI | Entretenimento / Games | Hero fullscreen, tipografia massiva, parallax, countdown, video embed |
| [realfood-gov](./realfood-gov/) | realfood.gov | Governo / Saúde / Educação | Sticky sections, stats bars, scroll text, FAQ accordion, video bg |
| [revelo-framer](./revelo-framer/) | revelo.darkroom.engineering | Product showcase / Componentes | Text reveal, dark theme, variable fonts, pricing, FAQ |
| [telescope-fyi](./telescope-fyi/) | telescope.fyi | Discovery platform / Curadoria | SPA minimal, lime accent, card grid |
| [crav-burgers](./crav-burgers/) | cravburgers.shop | Restaurante / Food & Beverage | Hero gigante, jelly wave, sticker peel, blob buttons, text stroke |
| [decathlon-yestalgia](./decathlon-yestalgia/) | decathlonyestalgia.com | Moda esportiva / Retro branding | Retro/vintage, SVG illustrations, menu fullscreen, product grid |

## Como usar

1. Escolha a referência que mais se aproxima do nicho do cliente
2. Leia o `README.md` da pasta para entender quais padrões são transferíveis
3. O `index.html` contém o código fonte para análise
4. CSS customizado está no HTML ou em arquivos separados

## Estrutura de cada referência

```
referencia-nome/
├── README.md           # Perfil: nicho, padrões visuais, o que transfere vs proprietário
├── index.html          # HTML completo extraído
├── inline-styles.css   # (opcional) CSS customizado extraído
└── webflow.css         # (opcional) CSS base se aplicável
```

## Padrões transferíveis (universais)

Estes padrões aparecem em múltiplas referências e funcionam em qualquer nicho:

### Layout & Structure
- **Fluid scaling** — `clamp()` com design-width, responsivo sem media queries
- **Sticky hero** — hero fullscreen com background e conteúdo centralizado
- **Horizontal scroll** — galeria com scroll horizontal e pausa no hover
- **CSS marquee** — scroll infinito com keyframes, sem dependência de JS
- **Fullscreen menu** — menu que preenche a tela com links grandes

### Typography & Text
- **Impact text** — tipografia display separada do body (8rem+)
- **Text stroke** — texto com contorno para efeito visual
- **Variable fonts** — uma fonte com múltiplos eixos (wdth, wght)
- **Split text animation** — animação caractere por caractere com clip-path

### Visual Effects
- **Hover reveal** — items com clip-path ou opacity reveal no hover
- **SVG masks** — seções com formato orgânico via mask-image
- **Jelly wave dividers** — divisores orgânicos ondulados via SVG
- **Parallax scroll** — efeito de profundidade no scroll
- **Scroll-triggered reveals** — elementos aparecem ao entrar no viewport

### Components
- **Nav theme switching** — nav reage à seção visível
- **Stats bars** — barras de progresso animadas com contadores
- **FAQ accordion** — perguntas frequentes expandíveis
- **Product grid** — grid de cards com hover effects
- **Blob buttons** — botões com formas orgânicas SVG

### Colors & Theme
- **Data-attribute themes** — troca de tema via atributo no HTML/body
- **Dark/Light mode** — sistema de temas com CSS variables
