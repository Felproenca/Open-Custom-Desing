# CRAV Burgers — cravburgers.shop

**Site original:** https://www.cravburgers.shop
**Plataforma:** Next.js (App Router) + Tailwind CSS
**Extraído em:** 2026-07-05

## Perfil de nicho

**Tipo:** Restaurante / Food & Beverage / E-commerce de comida
**Atende:** Sites de restaurantes, delivery, food trucks, marcas de comida artesanal

## Arquivos

- `index.html` — HTML completo (Next.js SSR + Tailwind)

## Padrões visuais (transferíveis)

| Padrão | Descrição | Transferível? |
|--------|-----------|---------------|
| **Animated loader** | Tela de loading com SVG de hamburger | Sim |
| **Hero com texto gigante** | Título 30vw+ com stroke | Sim |
| **Sticker peel effect** | Efeito de sticker com peel-back | Sim |
| **Jelly wave divider** | Divisor orgânico ondulado | Sim |
| **Rotating media grid** | Grid de imagens com rotação | Sim |
| **Blob button** | Botão com forma orgânica SVG | Sim |
| **Menu dropdown** | Menu com animação de entrada | Sim |
| **Text stroke** | Texto com contorno (text-stroke) | Sim |
| **Tailwind utilities** | Classes utilitárias | Sim |
| **Scroll-triggered reveals** | Animações no scroll | Sim |

## Cores do sistema

```css
--red: #f91814
--mustard: #FFC614
--mustard-dark: #ED900A
--beige: #f5e3cd
--black: #4C0016
--green: #77C41E
```

## Tipografia

- **Display:** Modak (Google Fonts)
- **Body:** Mouse Memoirs (Google Fonts)
- **UI:** Tailwind defaults

## Fonte de assets

- Imagens: `/_next/image` (Next.js Image Optimization)
- SVGs inline (hamburger layers, wave dividers)

## O que NÃO transferir

- Conteúdo proprietário (CRAV brand, menu items)
- Next.js Image component paths
- Tailwind config específico
- Sticker peel effect (requer JS/GSAP)
