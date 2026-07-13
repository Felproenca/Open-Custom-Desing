# Real Food — realfood.gov

**Site original:** https://realfood.gov
**Plataforma:** Next.js (App Router)
**Extraído em:** 2026-07-05

## Perfil de nicho

**Tipo:** Governo / Saúde / Educação pública
**Atende:** Sites institucionais, campanhas de saúde, guias educacionais, landing pages de conscientização

## Arquivos

- `index.html` — HTML completo (Next.js SSR)

## Padrões visuais (transferíveis)

| Padrão | Descrição | Transferível? |
|--------|-----------|---------------|
| **Intro animation** | Animação de entrada com alimentos | Sim (CSS) |
| **Sticky sections** | Seções que fixam no scroll | Sim |
| **Stats bars animados** | Barras de progresso com contadores | Sim |
| **Scroll-triggered text** | Texto que aparece palavra por palavra | Sim |
| **Disintegrating text** | Texto que se desintegra no scroll | Sim |
| **Pill navigation** | Nav com dots/bullets | Sim |
| **Pyramid visual** | Pirâmide interativa com tooltips | Sim |
| **Video embed** | Seções com vídeo de background | Sim |
| **FAQ accordion** | Perguntas frequentes expandíveis | Sim |

## Cores do sistema

```css
--red1: #BD0C3C
--red2: #cf2e2e
--red3: #ff6900
--off-white: #FDFBEE
--bg: #F3F0D6
```

## Tipografia

- Geist Mono (variable font)
- Fontes Google via CDN

## O que NÃO transferir

- Conteúdo proprietário (governo US, dietary guidelines)
- Schema.org JSON-LD específico
- Componentes Next.js específicos
- Vídeos e imagens do governo
