# References — Índice Mestre

Biblioteca de sites premium extraídos como base de adaptação por nicho. Cada pasta em `references/[nome]/` contém o código-fonte (ou o material extraível disponível), assets mapeados, e um README com os padrões visuais transferíveis.

**Regra de uso:** a IA nunca gera um site do zero. Ela escolhe a referência mais próxima do nicho do prospect, lê o README daquela pasta, e adapta cores/fontes/conteúdo/imagens em cima da estrutura existente.

---

## Índice rápido

| # | Pasta | Site original | Nicho | Assinatura visual |
|---|-------|---------------|-------|---------------------|
| 1 | `lando-norris/` | landonorris.com | Atleta / personalidade pública | Lime + dark green, fluid scaling, hover reveal com clip-path, marquee infinito |
| 2 | `decathlon-yestalgia/` | decathlonyestalgia.com | Moda esportiva retro / e-commerce | Variable font (Roboto Flex), mascote SVG, menu fullscreen com tapes coloridas |
| 3 | `crav-burgers/` | cravburgers.shop | Food casual / delivery / restaurante | Pop-art, mascote ilustrado com olhos e mãos, text-stroke grosso, blocos de cor sólida |
| 4 | `revelo-framer/` | revelo.darkroom.engineering | Produto técnico / dev tools / SaaS | Terminal monospace vermelho sobre preto, grid de specs em `//` comments, marquee de CTA |
| 5 | `realfood-gov/` | realfood.gov | Institucional / autoridade / saúde | Editorial preto-vinho, foto B&W séria, ilustração desenhada à mão, stat cards |
| — | `rockstar-gta6/` | rockstargames.com/VI | Entretenimento / games | **Conceitual apenas** — sem CSS/JS extraível (WebGL/Three.js protegido) |
| — | `telescope-fyi/` | telescope.fyi | Discovery / curadoria | **Conceitual apenas** — SPA vazia, conteúdo só via JS |

---

## Como escolher a referência certa

**A escolha NUNCA parte do tipo de negócio. Parte da assinatura perceptiva.**

Isso é deliberado: "barbearia" não diz nada sobre qual referência serve. Duas barbearias podem ter tensões perceptivas opostas — uma é "precisão técnica que não abre mão do cuidado humano", outra é "tradição de bairro que resiste à padronização". A primeira pede algo como `revelo-framer` (precisão, estrutura) calibrado com calor; a segunda pede algo como `realfood-gov` (autoridade, peso editorial) ou até `decathlon-yestalgia` (identidade retro/tradição).

O fluxo correto é:

1. **Gerar a assinatura perceptiva do negócio primeiro** (via `skill-creative-direction.md` / VisualSpecAgent) — a frase-vetor que captura a tensão central. Ex: "precisão que não mata o carinho", "energia que nunca pede desculpa", "tradição que não parece careta".
2. **Só depois perguntar: qual referência já resolveu essa tensão específica antes?** — não qual referência é "do mesmo ramo".
3. Se nenhuma das 5 resolve a tensão identificada, isso é sinal de que falta uma referência nova — não motivo para forçar a mais parecida por categoria.

### As 5 referências por tensão perceptiva (não por categoria)

| Referência | Tensão que ela resolve | Não é sobre o setor, é sobre... |
|---|---|---|
| `lando-norris/` | Confiança pessoal que não precisa gritar — carisma com disciplina por trás | Qualquer negócio onde uma pessoa carrega a marca e a marca precisa parecer competente sem parecer fria |
| `crav-burgers/` | Prazer sem pedir desculpa — irreverência que ainda assim transmite qualidade | Negócios que vendem alegria/indulgência mas não querem parecer descartáveis |
| `decathlon-yestalgia/` | Peso de tradição que ainda é jovem — nostalgia sem ser careta | Marcas com história ou identidade forte que precisam parecer atuais, não datadas |
| `revelo-framer/` | Competência que se prova pela precisão, não pelo discurso | Negócios que vendem confiança técnica — "aqui não tem enrolação, tem método" |
| `realfood-gov/` | Seriedade que vem do dado, não do tom — autoridade documentada | Negócios onde o prospect precisa sentir "isso é sério, tem fundamento" antes de sentir "isso é bonito" |

### Como aplicar na prática

Quando o VisualSpecAgent gerar a `perceptive_signature`, comparar contra as 5 tensões acima e escolher pela **proximidade da tensão**, não pela proximidade do setor. Documentar no output da direção criativa *por que* aquela referência foi escolhida — a justificativa tem que citar a tensão, não o nicho.

Exemplo de justificativa correta: *"A assinatura perceptiva é 'disciplina que não vira frieza' — isso é a mesma tensão que `lando-norris` resolve (carisma pessoal + competência), então usamos essa referência mesmo sendo uma barbearia, não um atleta."*

Exemplo de justificativa incorreta (evitar): *"É uma barbearia, então usamos crav-burgers porque também é um negócio local descontraído."*

---

## Gap conhecido

Nenhuma das 5 referências resolve bem a tensão de **"simplicidade honesta sem pretensão"** — o tipo de negócio de bairro pequeno que não quer parecer nem irreverente (crav-burgers) nem editorial-sério (realfood-gov), só quer parecer confiável e limpo. Se essa tensão aparecer num prospect real e nenhuma referência convencer no teste, esse é o gap a preencher com uma referência nova — não force uma das 5 existentes só por estarem disponíveis.

---

## Detalhe por referência

### 1. `lando-norris/`
- **Material disponível:** completo — `index.html`, `webflow.css` (~10.000 linhas), `inline-styles.css`, `assets.md`
- **Paleta:** `#d2ff00` (lime), `#101400` (dark green), `#000`, `#fff`, cinzas
- **Tipografia:** Mona Sans (variable, body) + Brier (display/impact)
- **Padrões-chave:** fluid scaling via `clamp()`, data-attribute themes, sticky hero, horizontal scroll gallery, CSS marquee, split-text animation, hover reveal com `clip-path: ellipse()`, SVG masks
- **Não transferir:** Rive animations (.riv proprietário), WebGL/canvas, classes Webflow (`w-*`), logos/imagens de Lando

### 2. `decathlon-yestalgia/`
- **Material disponível:** `index.html`, `styles.css` (parcial — variáveis), `assets.md`
- **Paleta:** `#00966E` (verde), `#D7DD44` (lima), `#F09341` (laranja), `#3B324C` (escuro), `#F4F4F4` (bege)
- **Tipografia:** Roboto Flex (variable: opsz, wdth, wght)
- **Padrões-chave:** retro/vintage design, SVG illustrations, menu fullscreen com tapes/cartões coloridos, scroll-driven sections, product grid com hover
- **Não transferir:** mascote OLAF (proprietário), WordPress/WP Rocket specifics, Swup transitions, multi-idioma

### 3. `crav-burgers/`
- **Material disponível:** completo re-extraído via Playwright — `index.html`, `styles.css` (55KB CSS real), `assets.md`, `manifest.json`, screenshots
- **Paleta:** `#f91814` (vermelho), `#FFC614` (mostarda), `#ED900A` (mostarda escura), `#f5e3cd` (bege), `#4C0016` (preto-vinho), `#77C41E` (verde)
- **Tipografia:** Modak (display, lúdica) + Mouse Memoirs (body)
- **Padrões-chave:** hero gigante com text-stroke grosso, mascote ilustrado com olhos e mãos, blocos de cor sólida alternando com creme, fotos com halftone, linha pontilhada decorativa (rota/mapa), jelly wave dividers, blob buttons
- **Não transferir:** sticker peel effect (requer GSAP), conteúdo/mascote proprietário

### 4. `revelo-framer/`
- **Material disponível:** completo re-extraído via Playwright — `index.html`, `styles.css` (parcial, lenis.css), `assets.md`, `manifest.json`, screenshots
- **Paleta:** preto (`#111` ou mais escuro) + vermelho terminal
- **Tipografia:** IBM Plex Mono, Anton, Inter, Abel (múltiplas — mono para specs, display bold para headline)
- **Padrões-chave:** estética terminal/monospace, grid de features em texto de código com `//` comments, headline display extremamente grande full-width, marquee horizontal de CTA repetido
- **Não transferir:** Framer-specific markup, conteúdo do produto Revelo

### 5. `realfood-gov/`
- **Material disponível:** completo re-extraído via Playwright — `index.html`, `styles.css` (197KB em 5 arquivos), `assets.md`, screenshots
- **Paleta:** fundo quase preto-vinho (~`#1a0505`), `#BD0C3C`/`#cf2e2e`/`#ff6900` (vermelhos de destaque), `#FDFBEE`/`#F3F0D6` (off-white/bege)
- **Tipografia:** Die Grotesk (medium/bold/bold-italic) + Geist Mono
- **Padrões-chave:** foto B&W séria como hero, stat cards vermelhos sólidos com números grandes, ilustração desenhada à mão (não fotos) organizada em pirâmide, seção de encerramento tipo "cartão" com imagem central destacada, FAQ accordion, sticky sections
- **Não transferir:** conteúdo proprietário (governo, dietary guidelines), vídeos/imagens oficiais

### `rockstar-gta6/` e `telescope-fyi/` — conceituais
Documentadas apenas como referência de padrão visual (hero fullscreen + parallax + tipografia massiva para o primeiro; SPA minimal lime accent para o segundo). Não têm CSS ou JS extraível — reproduzir exigiria recriar do zero, não adaptar. Os padrões que elas representam já estão parcialmente cobertos por combinações de `lando-norris` (parallax + display type) e `revelo-framer` (minimal + accent color).

---

## Próximos passos sugeridos

1. Testar o fluxo completo com um prospect real: gerar a assinatura perceptiva primeiro, depois escolher a referência pela tensão (não pelo nicho)
2. Se a assinatura perceptiva de um prospect não encontrar tensão correspondente em nenhuma das 5 referências, esse é o sinal real de gap — documentar qual tensão ficou sem referência antes de caçar um site novo
3. Considerar adicionar uma referência de e-commerce de moda de porte médio (o antigo candidato mariafilo foi descartado por erro de pasta — se for retomado, deve vir de um site real, extraído com o mesmo rigor das demais)
