# References — Sites Premium como Template Base

Cada pasta contém o código fonte extraído de um site premium, organizado para ser usado como base de um template adaptável.

## Índice

| Referência | Site | Nicho | Padrões principais |
|-----------|------|-------|-------------------|
| [lando-norris](./lando-norris/) | landonorris.com | Atleta / Personalidade pública | Sticky hero, horizontal scroll, marquee, split-text, hover reveal grid, SVG masks, fluid scaling |

## Como usar

1. Escolha a referência que mais se aproxima do nicho do cliente
2. Leia o `README.md` da pasta para entender quais padrões são transferíveis
3. Use o `assets.md` para mapear o que precisa ser substituído (cores, fonts, imagens, conteúdo)
4. O `inline-styles.css` contém o CSS customizado que pode ser adaptado
5. O `webflow.css` é referência de reset/grid, mas não deve ser copiado (usar reset próprio)

## Estrutura de cada referência

```
referencia-nome/
├── README.md           # Perfil: nicho, padrões visuais, o que transfere vs proprietário
├── index.html          # HTML completo extraído
├── inline-styles.css   # CSS customizado (temas, animações, masks, seções)
├── webflow.css         # CSS base (reset, grid) — referência apenas
└── assets.md           # Mapa de todos os assets (imagens, SVGs, fonts, animations)
```

## Padrões transferíveis (universais)

Estes padrões aparecem em múltiplas referências e funcionam em qualquer nicho:

- **Fluid scaling** — `clamp()` com design-width, responsivo sem media queries
- **Data-attribute themes** — troca de tema via atributo no `<html>` ou `<body>`
- **Sticky hero** — hero fullscreen com background e conteúdo centralizado
- **Horizontal scroll** — galeria com scroll horizontal e pausa no hover
- **CSS marquee** — scroll infinito com keyframes, sem dependência de JS
- **Split text** — animação de texto caractere por caractere com clip-path
- **Impact text** — tipografia display separada do body
- **Hover reveal** — items com clip-path ou opacity reveal no hover
- **SVG masks** — seções com formato orgânico via mask-image
- **Nav theme switching** — nav reage à seção visível
- **Footer mask** — footer com borda orgânica via SVG mask
