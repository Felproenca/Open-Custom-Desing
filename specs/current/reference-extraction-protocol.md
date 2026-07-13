# Protocolo de Extração Total — Capturando o Comportamento, Não Só a Aparência

## O que muda em relação à extração atual

A extração atual (Playwright básico, usada em crav-burgers/revelo/realfood) captura **um estado**: a página como carregou, parada. Isso documenta o campo semântico (cor, fonte, layout) e parte do orgânico visível em repouso. Mas a inteligência real de uma referência — a física do hover, o timing do scroll reveal, o comportamento do menu abrindo — só existe **em movimento**, e movimento não aparece numa screenshot única.

Extração total significa capturar 4 camadas que a extração atual não pega:

1. Estados de interação (hover, active, focus, aberto/fechado)
2. Comportamento ao longo do scroll (não só o topo da página)
3. Múltiplos breakpoints (o que muda de mobile pra desktop não é só reflow, às vezes é comportamento diferente)
4. Os parâmetros reais de animação, extraídos do JS — não estimados olhando o resultado

---

## Camada 1 — Captura de estados de interação

Em vez de um `page.screenshot()` único, o script precisa **provocar cada estado interativo antes de capturar**.

```javascript
// extraction-states.js — roda com Playwright
const { chromium } = require('playwright');

async function captureAllStates(url, outputDir) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url, { waitUntil: 'networkidle' });

  // Estado 1: repouso (já fazíamos isso)
  await page.screenshot({ path: `${outputDir}/01-repouso.png`, fullPage: true });

  // Estado 2: hover em cada elemento interativo
  const interactiveElements = await page.$$('a, button, [role="button"], .card, .product-item');
  for (let i = 0; i < interactiveElements.length; i++) {
    await interactiveElements[i].hover();
    await page.waitForTimeout(400); // espera a transição CSS terminar
    await interactiveElements[i].screenshot({ path: `${outputDir}/hover-${i}.png` });
  }

  // Estado 3: menu/accordion aberto — clicar em cada trigger conhecido
  const menuTriggers = await page.$$('[aria-expanded], .menu-toggle, .accordion-trigger');
  for (let i = 0; i < menuTriggers.length; i++) {
    await menuTriggers[i].click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outputDir}/aberto-${i}.png`, fullPage: true });
    await menuTriggers[i].click(); // fecha de volta
  }

  await browser.close();
}
```

**O que isso resolve:** o "sticker peel effect" do crav-burgers, o hover reveal do lando-norris, o accordion do realfood — tudo isso passa a existir como par de imagens (antes/depois), não como nota "requer JS, não capturado".

---

## Camada 2 — Comportamento ao longo do scroll

Scroll-triggered animation (a maioria dos efeitos "premium") só aparece em movimento. A alternativa: gravar vídeo do scroll completo, e paralelamente logar o computed style em intervalos.

```javascript
async function captureScrollBehavior(url, outputDir) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: `${outputDir}/video/`, size: { width: 1920, height: 1080 } }
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 40; // granularidade da captura

  for (let i = 0; i <= steps; i++) {
    const scrollY = (pageHeight / steps) * i;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await page.waitForTimeout(150); // deixa animações de scroll-trigger rodarem
    await page.screenshot({ path: `${outputDir}/scroll-${String(i).padStart(2, '0')}.png` });
  }

  await context.close(); // salva o vídeo automaticamente
  await browser.close();
}
```

**O que isso resolve:** a sequência de imagens `scroll-00.png` até `scroll-40.png` funciona como um flipbook — dá pra ver exatamente em que ponto do scroll um elemento começa a revelar, com que velocidade, se há stagger entre elementos vizinhos. O vídeo gravado é a referência definitiva pra qualquer dúvida futura.

---

## Camada 3 — Matriz de breakpoints

```javascript
const breakpoints = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

for (const bp of breakpoints) {
  const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outputDir}/${bp.name}-repouso.png`, fullPage: true });
  // repetir Camadas 1 e 2 para cada breakpoint se o comportamento mudar
}
```

**Regra prática:** rodar Camadas 1 e 2 completas só no desktop (mais caro). Nos outros breakpoints, capturar ao menos o repouso completo — e só repetir a captura de interação se uma inspeção rápida mostrar que o comportamento muda de verdade (menu mobile costuma ser estruturalmente diferente do desktop, por exemplo).

---

## Camada 4 — A parte que realmente resolve "ele não erra": decompilar o JS

Isso é o que faltou em crav-burgers, revelo e realfood — os bundles foram arquivados como caixa-preta. A alternativa:

### Passo 1 — Desminificar
```bash
npx js-beautify assets/js/*.js -o assets/js-readable/
```
Isso transforma código compactado numa única linha em algo legível, com indentação e nomes de variável preservados (quando não foram ofuscados).

### Passo 2 — Buscar por bibliotecas de animação conhecidas
```bash
grep -l "gsap\|ScrollTrigger\|framer-motion\|lenis\|anime(" assets/js-readable/*.js
```
Isso identifica qual arquivo contém a configuração real de animação — não é preciso ler os 20 bundles, só os que citam a lib.

### Passo 3 — Extrair os parâmetros literais
Dentro do arquivo identificado, procurar por chamadas como:
```javascript
gsap.to(element, { duration: 0.9, ease: "power3.out", stagger: 0.08 })
ScrollTrigger.create({ trigger: ".hero", start: "top 85%", scrub: 1 })
```
Esses valores — `duration`, `ease`, `stagger`, `start` — são exatamente os campos da tabela de `perceptual-coherence.md`. Em vez de estimar "parece rápido" olhando o vídeo, agora é um número real extraído do código-fonte deles.

**Quando isso não é possível:** bundles fortemente ofuscados (nomes de variável trocados por letras, código gerado por bundler avançado) podem resistir à leitura direta. Nesse caso, o vídeo da Camada 2 vira a fonte de verdade — dá pra cronometrar manualmente quadro a quadro (30 quadros = 1 segundo em captura padrão) e estimar duration/easing por comparação visual contra curvas conhecidas (linear, ease-out, elastic). É mais impreciso, mas ainda assim melhor que "presumir sem checar".

---

## Estrutura de saída atualizada por referência

```
references/[nome]/
├── index.html
├── styles.css
├── assets.md
├── README.md
├── manifest.json
├── screenshots/
│   ├── 01-repouso.png
│   ├── hover-0.png, hover-1.png, ...
│   ├── aberto-0.png, aberto-1.png, ...
│   ├── scroll-00.png ... scroll-40.png
│   ├── mobile-repouso.png / tablet-repouso.png
├── video/
│   └── scroll-completo.webm
└── motion-log.json          ← NOVO: parâmetros reais extraídos do JS (Camada 4)
```

### Formato do `motion-log.json`
```json
{
  "hero_reveal": { "duration": 0.9, "ease": "power3.out", "stagger": 0.08, "source": "extraído de assets/js-readable/0h72oc0nv1wic.js linha 340", "confidence": "alta — valor literal no código" },
  "menu_toggle": { "duration": 0.3, "ease": "power2.inOut", "source": "estimado via vídeo, bundle ofuscado", "confidence": "média — cronometragem manual" }
}
```
O campo `confidence` importa: separa o que foi extraído (fato) do que foi estimado (melhor palpite documentado como tal) — a mesma disciplina de não alucinar que já estamos aplicando em tudo isso.

---

## Por que isso é o que resolve "5-10 referências e ele não erra"

Hoje, quando o VisualSpecAgent gera um site novo, ele aplica a tabela genérica de `perceptual-coherence.md` (5 linhas, uma por tensão). Com motion-log.json real por referência, cada uma das 5-10 referências passa a ter **sua própria assinatura de movimento verificada**, não uma aproximação da tabela mestra. A tabela mestra vira o ponto de partida; o motion-log de cada referência específica vira o ajuste fino real, baseado em código que existiu e funcionou de verdade — não em suposição de qual "sensação" a tensão deveria ter.

## Custo real de fazer isso

Isso é caro comparado à extração atual — cada referência passa de "5 minutos de Playwright" pra um processo de várias etapas com vídeo, múltiplos breakpoints e leitura de JS. Não vale a pena rodar isso nas 5 referências atuais de uma vez. Vale rodar **na próxima referência nova que você extrair**, e retroativamente nas 2-3 que mais se repetem em produção — provavelmente lando-norris e crav-burgers, que são as mais citadas até agora.
