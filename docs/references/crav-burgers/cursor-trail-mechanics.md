# Cursor Trail com Ingredientes — Mecânica Completa

## O que é

Efeito de cursor customizado onde **imagens de ingredientes de hamburger** (tomate, queijo, alface, carne) **seguem o mouse** em formação de trail, e quando o cursor para, **se empilham** formando um hamburger.

## Observações do site (cravburgers.shop)

### Elementos visíveis
- **4-5 ícones circulares** com imagens de ingredientes
- Cada ícone tem ~20-30px de diâmetro
- Posicionados com `position: fixed` (seguem a viewport)
- `pointer-events: none` (não interferem com cliques)
- `z-index` alto (acima de todo conteúdo)
- `will-change: transform` (otimização de performance)

### Comportamento observado
1. **Trail**: Elementos seguem o cursor com **atraso progressivo**
2. **Física**: Movimento suave com easing (não linear)
3. **Snap**: Quando cursor para, elementos se **arranjam em stack vertical**
4. **Hover**: Pode ter efeito diferente ao passar sobre elementos interativos

---

## Mecânica Técnica

### Arquitetura

```
Mouse Position → Tracker → [Element 0] → [Element 1] → [Element 2] → [Element 3]
                (cursor)    (tomate)      (queijo)       (alface)      (carne)
                             delay: 0      delay: 1       delay: 2      delay: 3
```

### 1. Estrutura HTML

```html
<div class="cursor-trail" aria-hidden="true">
  <div class="trail-item" data-index="0">
    <img src="/img-webp/tomato.webp" alt="" />
  </div>
  <div class="trail-item" data-index="1">
    <img src="/img-webp/cheese.webp" alt="" />
  </div>
  <div class="trail-item" data-index="2">
    <img src="/img-webp/lettuce.webp" alt="" />
  </div>
  <div class="trail-item" data-index="3">
    <img src="/img-webp/meat.webp" alt="" />
  </div>
</div>
```

### 2. CSS Base

```css
.cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
}

.trail-item {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  will-change: transform;
  transform: translate(-50%, -50%);
  transition: none; /* GSAP controla */
}

.trail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 3. JavaScript — Tracker (posição do mouse)

```javascript
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
```

### 4. JavaScript — Trail Follower (seguimento com atraso)

**Abordagem A: Interpolação simples (lag)**

```javascript
const items = document.querySelectorAll('.trail-item');
const positions = [];
const lag = 0.15; // 0 = instantâneo, 1 = nunca chega

items.forEach((item, i) => {
  positions[i] = { x: mouse.x, y: mouse.y };
});

function animate() {
  // Primeiro item segue o cursor
  positions[0].x += (mouse.x - positions[0].x) * lag;
  positions[0].y += (mouse.y - positions[0].y) * lag;

  // Itens seguintes seguem o anterior
  for (let i = 1; i < items.length; i++) {
    positions[i].x += (positions[i-1].x - positions[i].x) * lag;
    positions[i].y += (positions[i-1].y - positions[i].y) * lag;
  }

  // Aplica posições
  items.forEach((item, i) => {
    item.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
  });

  requestAnimationFrame(animate);
}

animate();
```

**Abordagem B: GSAP (mais suave, recomendada)**

```javascript
const items = gsap.utils.toArray('.trail-item');
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Cada item segue o anterior com delay
items.forEach((item, i) => {
  const proxy = { x: mouse.x, y: mouse.y };

  gsap.ticker.add(() => {
    const target = i === 0 ? mouse : items[i - 1].proxy;
    proxy.x += (target.x - proxy.x) * 0.15;
    proxy.y += (target.y - proxy.y) * 0.15;

    gsap.set(item, {
      x: proxy.x,
      y: proxy.y,
      xPercent: -50,
      yPercent: -50
    });
  });

  item.proxy = proxy;
});
```

### 5. JavaScript — Snap to Hamburger (empilhamento)

```javascript
const STACK_POSITIONS = [
  { y: 0,   scale: 1,   label: 'pao-topo' },    // Pão topo
  { y: -35, scale: 0.9, label: 'alface' },       // Alface
  { y: -65, scale: 0.85, label: 'tomate' },      // Tomate
  { y: -95, scale: 0.9, label: 'queijo' },       // Queijo
  { y: -125, scale: 1,  label: 'pao-base' },     // Pão base
];

let velocity = 0;
let lastX = mouse.x;
let lastY = mouse.y;
let isStacked = false;

function checkVelocity() {
  const dx = mouse.x - lastX;
  const dy = mouse.y - lastY;
  velocity = Math.sqrt(dx * dx + dy * dy);
  lastX = mouse.x;
  lastY = mouse.y;

  if (velocity < 2 && !isStacked) {
    // Cursor parou → empilha
    stackItems();
    isStacked = true;
  } else if (velocity >= 5 && isStacked) {
    // Cursor voltou a mover → solta
    unstackItems();
    isStacked = false;
  }

  requestAnimationFrame(checkVelocity);
}

function stackItems() {
  const centerX = mouse.x;
  const centerY = mouse.y;

  items.forEach((item, i) => {
    gsap.to(item, {
      x: centerX,
      y: centerY + STACK_POSITIONS[i].y,
      scale: STACK_POSITIONS[i].scale,
      rotation: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
      delay: i * 0.05 // stagger
    });
  });
}

function unstackItems() {
  items.forEach((item, i) => {
    gsap.to(item, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      delay: i * 0.03
    });
  });
}

checkVelocity();
```

### 6. Otimizações

```javascript
// Throttle do mousemove
let ticking = false;
document.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      ticking = false;
    });
    ticking = true;
  }
});

// Pausa quando aba está oculta
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

// Desabilita em touch devices
if ('ontouchstart' in window) {
  document.querySelector('.cursor-trail').style.display = 'none';
}

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.cursor-trail').style.display = 'none';
}
```

---

## Parâmetros Chave

| Parâmetro | Valor Observado | Efeito |
|-----------|-----------------|--------|
| `lag` | 0.12-0.18 | Suavidade do trail (menor = mais responsivo) |
| `stagger` | 30-60ms | Delay entre elementos no snap |
| `snap duration` | 0.3-0.5s | Velocidade do empilhamento |
| `snap ease` | `back.out(1.7)` | Efeito de "quique" no empilhamento |
| `velocity threshold` | 2-5 px/frame | Velocidade para triggers snap/unsnap |
| `element size` | 24-32px | Tamanho dos ícones |
| `element spacing` | 25-40px | Espaçamento no stack vertical |

---

## Referência: Stack de Hamburger

A ordem visual do stack (de cima pra baixo):
1. **Pão topo** (bun top)
2. **Alface** (lettuce)
3. **Tomate** (tomato)
4. **Queijo** (cheese)
5. **Carne** (patty/meat)
6. **Pão base** (bun bottom)

---

## Implementação Recomendada

Para replicar em qualquer projeto:

1. **GSAP** para animação (não CSS transitions — GSAP dá mais controle)
2. **requestAnimationFrame** para o ticker principal
3. **Proxy objects** para cada item (rastreamento de posição intermediária)
4. **Velocity check** via `Math.sqrt(dx² + dy²)` para detectar parada
5. **Stagger** no snap para efeito cascata
6. **`will-change: transform`** em todos os itens
7. **`pointer-events: none`** no container
8. **`position: fixed`** no container
9. **`z-index: 99999`** no container
10. **Respect `prefers-reduced-motion`** — desabilitar em acessibilidade
