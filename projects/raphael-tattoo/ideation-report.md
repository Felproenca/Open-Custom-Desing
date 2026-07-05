# Ideation Report — Raphael Tattoo

## Brief Decomposto
- **O que:** Site portfolio para tatuador profissional
- **Pra quem:** Clientes que buscam tatuagem de qualidade — 18-45 anos, conscientes de design
- **Por quê:** Mostrar portfólio, gerar confiança, agendar sessões
- **Contexto:** Marca pessoal "Raphael Tattoo" — não é estúdio, é artista

## Referências Competitivas

### 1. Tattoo Digital (Awwwards HM)
- tattoo-digital.com
- **O que funciona:** Portfolio fullscreen com hover reveal, scroll vertical com zoom em peças individuais
- ** Roubar:** Formato de galeria com zoom suave
- **Evitar:** Muita coisa na mesma tela

### 2. HYPE TATTOO (Awwwards HM)
- hivetattoo.com
- **O que funciona:** Dark theme agressivo, tipografia bold, vídeo de processo
- **Roubar:** Seção de vídeo mostrando o processo de tattoo
- **Evitar:** Demais energia — pode assustar clientes mais calmns

### 3. La Tatuajería (Awwwards HM)
- latatuajeria.com
- **O que funciona:** Editorial clean, tipografia serif, photos com moldura
- **Roubar:** Tratamento editorial das fotos — molduras, espaçamento generoso
- **Evitar:** Pode parecer genérico demais

### 4. Momday Club Tattoo (Awwwards HM)
- momdayclub.com
- **O que funciona:** Minimalista extremo, apenas fotos e nome, zero distração
- **Roubar:** Filosofia "as fotos falam por si"
- **Evitar:** Falta de CTA — cliente não sabe o que fazer depois

### 5. Dr. Woo (referência de autoridade)
- drwoo.com
- **O que funciona:** Celebrity tattoo artist, brand pessoal fortíssima, merch
- **Roubar:** Posicionamento de "artista", não "tatuador"
- **Evitar:** Escala — Dr. Woo é exceção, não modelo

## Direções Geradas

### Direção 1: Dark Craft ★ RECOMENDADA
- **Mood:** Ateliê noturno. Precisão artesanal em escuridão.
- **Palette:** #0A0A0A bg, #F5F0EB text (off-white quente), #C8A2FF accent (lilás), #1A1A1A surface
- **Typography:** Space Grotesk display, Inter body, JetBrains Mono para dados
- **Key element:** Fullbleed portfolio com hover que revela detalhe da pele/textura
- **Referência:** Cruzeiro de HYPE TATTOO (energia) + La Tatuajería (refinamento)
- **Motion:** Scroll parallax suave, Ken Burns nas fotos, clip-path reveals nos textos
- **Best for:** Artista que quer posicionar como premium, não "tatuador de esquina"

### Direção 2: Editorial Ink
- **Mood:** Revista de tatuagem. Cada peça é uma obra editorial.
- **Palette:** #FFFBEB bg (papel antigo), #1A1207 text, #8B4513 accent (saddle brown), #F5E6D3 surface
- **Typography:** Playfair Display headlines, Georgia body
- **Key element:** Grid 2 colunas como página de revista, molduras elegantes
- **Referência:** La Tatuajería + revistas de tattoo dos anos 90
- **Motion:** Fade reveals sutis, parallax leve
- **Best for:** Artista com estilo blackwork/traditional que quer vibe clássica

### Direção 3: Raw Minimal
- **Mood:** Apenas as fotos. Zero distração.
- **Palette:** #000 bg, #FFF text, #FF3333 accent (vermelho tinta)
- **Typography:** System fonts only — brutalist
- **Key element:** Grid de fotos sem legenda, sem borda, sem sombra
- **Referência:** Momday Club + sites de galeria de arte contemporânea
- **Motion:** Nenhum — fotos estáticas, scroll puro
- **Best for:** Artista minimalista que acredita que o trabalho fala por si

## Recomendação

**Dark Craft** é a melhor direção porque:
1. Posiciona Raphael como artista premium (não "tatuador")
2. Dark theme é padrão da indústria de tattoo — clientes esperam
3. Permite motion rico (WebGL, parallax) sem parecer exagerado
4. Lilás como accent é único — diferencia de todos os sites preto+vermelho

## Próximo Passo

Invocar **scroll-premium** com:
- `product_name`: "Raphael Tattoo"
- `mood`: "cinematic"
- `has_webgl`: true
- `scroll_intensity`: "moderate"
- Seções: Hero fullscreen → Portfolio gallery → Process video → About → Booking CTA
