# Cursor Customizado — Variações por Tensão Perceptiva

## Princípio

O cursor padrão (dot + ring, visto no choreography-tokens.json) é a forma neutra. Mas o cursor é uma superfície pequena e sempre visível — trocar sua forma pelo símbolo certo reforça a assinatura perceptiva em cada movimento do mouse, não só nas seções estáticas. Regra: o cursor customizado só se justifica se o símbolo vier da própria tensão do negócio, não por capricho decorativo.

Três variações abaixo, cada uma resolvendo uma tensão diferente do catálogo.

---

## 1. Lua — para tensões de calma, ritual noturno, cuidado pessoal

**Quando usar:** negócios de bem-estar, spa, tatuagem, produtos de sono/skincare noturno, qualquer coisa com tensão "ritual que acontece fora do horário comercial" ou "cuidado que pede quietude".

O cursor vira uma lua crescente que gira suavemente seguindo o movimento do mouse, com uma leve cauda de brilho.

```html
<div class="cursor cursor-moon" id="cursor">
  <svg viewBox="0 0 24 24" width="28" height="28">
    <path class="moon-shape" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36A7 7 0 0 1 12 3z"
          fill="currentColor"/>
  </svg>
</div>
```

```css
.cursor-moon {
  color: var(--color-accent, #f4f1e8);
  filter: drop-shadow(0 0 6px currentColor);
  mix-blend-mode: normal;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cursor-moon.is-hover {
  transform: scale(1.3) rotate(15deg);
}
```

```javascript
// Segue o mouse com lerp suave (mais lento que o padrão — reforça calma)
let mx = 0, my = 0, cx = 0, cy = 0, rot = 0;
document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - mx;
  mx = e.clientX; my = e.clientY;
  rot = dx * 0.5; // leve rotação na direção do movimento, como fase lunar girando
});
gsap.ticker.add(() => {
  cx += (mx - cx) * 0.08; // lerp mais lento que o padrão (0.15) → sensação de flutuar
  cy += (my - cy) * 0.08;
  gsap.set(cursor, { x: cx, y: cy, rotation: rot });
});
```

**Detalhe que faz diferença:** o lerp é mais lento (0.08 em vez de 0.15) — o cursor "atrasa" ligeiramente atrás do mouse, criando sensação de leveza/flutuação em vez de resposta imediata. Isso é coerente com a tabela de movimento: tensões de calma pedem duration mais longa, e o cursor deve obedecer à mesma física.

---

## 2. Peça de roupa — para moda, vestuário, produtos físicos com textura

**Quando usar:** e-commerce de moda, ateliês, marcas de vestuário — tensão "identidade que se veste", equivalente ao `decathlon-yestalgia` no catálogo.

O cursor vira um pequeno item de roupa (ex: uma camiseta ou etiqueta) que balança levemente como se estivesse pendurado, e muda de "peça" ao passar por diferentes categorias de produto.

```html
<div class="cursor cursor-garment" id="cursor">
  <svg viewBox="0 0 24 24" width="26" height="26" class="garment-shape">
    <!-- Silhueta simplificada de camiseta -->
    <path d="M8 2 L4 6 L6 9 L8 7.5 L8 20 L16 20 L16 7.5 L18 9 L20 6 L16 2 
             Q14 4 12 4 Q10 4 8 2 Z" 
          fill="currentColor" stroke="none"/>
  </svg>
</div>
```

```css
.cursor-garment {
  color: var(--color-text, #1a1a1a);
  transform-origin: 50% 0%; /* pivô no "cabide" imaginário */
}
.cursor-garment svg {
  animation: garment-sway 2.4s ease-in-out infinite;
}
@keyframes garment-sway {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
}
.cursor-garment.is-hover svg {
  animation-duration: 0.8s; /* acelera o balanço perto de produto — reação de interesse */
}
```

```javascript
// Trocar o SVG conforme a categoria do produto sob o cursor
document.querySelectorAll('[data-product-category]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const category = el.dataset.productCategory; // ex: "camiseta", "calca", "acessorio"
    updateCursorGarment(category);
  });
});

function updateCursorGarment(category) {
  const shapes = {
    camiseta: 'M8 2 L4 6 L6 9 L8 7.5 L8 20 L16 20 L16 7.5 L18 9 L20 6 L16 2 Q14 4 12 4 Q10 4 8 2 Z',
    calca: 'M7 2 L7 20 L10 20 L11 10 L13 10 L14 20 L17 20 L17 2 Z',
    acessorio: 'M12 2 a5 5 0 1 0 0.1 0 Z' // anel/círculo simples
  };
  document.querySelector('.garment-shape path').setAttribute('d', shapes[category] || shapes.camiseta);
}
```

**Detalhe que faz diferença:** o balanço contínuo (sway) simula o item pendurado num cabide — parado, mas nunca rígido. É a mesma lógica da tensão "peso de tradição que ainda é jovem": não é estático como um ícone morto, mas também não é hiperativo.

---

## 3. Linhas de código estilo Matrix — para produtos técnicos, dev tools, precisão

**Quando usar:** negócios com tensão "competência que se prova pela precisão", equivalente ao `revelo-framer` no catálogo — SaaS, ferramentas de dev, consultorias técnicas.

O cursor vira um pequeno bloco de caracteres que mudam aleatoriamente (efeito Matrix), com um caractere "âncora" mais brilhante marcando a posição exata do ponteiro.

```html
<div class="cursor cursor-matrix" id="cursor">
  <span class="matrix-char" id="matrixChar">0</span>
  <span class="matrix-trail"></span>
</div>
```

```css
.cursor-matrix {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--color-accent, #ff2020);
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0 0 8px currentColor;
}
.matrix-char {
  display: inline-block;
}
.matrix-trail {
  position: absolute;
  top: 18px;
  left: 2px;
  font-size: 10px;
  opacity: 0.4;
  color: currentColor;
}
```

```javascript
const chars = '01アイウエオカキクケコ$#@%&';
const matrixChar = document.getElementById('matrixChar');

// Troca o caractere em intervalo curto — nunca aleatório demais, senão vira ruído
setInterval(() => {
  matrixChar.textContent = chars[Math.floor(Math.random() * chars.length)];
}, 120); // 120ms = rápido o suficiente pra "piscar dado", devagar o suficiente pra não distrair

// Cursor segue com lerp quase instantâneo — coerente com a tabela: tensão técnica não flutua
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
gsap.ticker.add(() => {
  cx += (mx - cx) * 0.35; // lerp rápido (0.35, bem acima do padrão 0.15) → resposta imediata
  cy += (my - cy) * 0.35;
  gsap.set(cursor, { x: cx, y: cy });
});
```

**Detalhe que faz diferença:** o lerp é o mais rápido dos três (0.35) — coerente com a tabela de movimento, onde a tensão técnica pede resposta "just-in-time", sem antecipação nem atraso. O cursor não pode parecer que está "pensando" antes de responder.

---

## Regra de aplicação geral

Cada cursor herda o `lerp` (velocidade de resposta) da mesma linha da tabela de movimento em `perceptual-coherence.md`:

| Cursor | Tensão correspondente | Lerp |
|---|---|---|
| Lua | Calma / ritual | 0.08 (lento, flutuante) |
| Roupa | Tradição jovem | 0.15 (padrão, com sway próprio) |
| Matrix | Precisão técnica | 0.35 (rápido, sem atraso) |

Nunca aplicar um cursor temático com a física de resposta errada — uma lua que responde a 0.35 (rápido) perde toda a sensação de calma que a forma deveria comunicar; o símbolo sozinho não carrega a tensão, a física precisa concordar com ele.

## Onde isso entra no kit

Esses três exemplos são variações do padrão `custom_cursor` já documentado em `choreography-tokens.json > ui_elements`. Ao gerar a direção criativa (Fase 1 do SKILL.md), se a tensão do negócio pedir um cursor temático em vez do dot+ring padrão, o VisualSpecAgent escolhe (ou propõe um novo, seguindo a mesma lógica de forma+física) e documenta no campo `ui_elements.custom_cursor_variant` do output.
