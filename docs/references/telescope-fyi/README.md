# Telescope — telescope.fyi

**Site original:** https://telescope.fyi
**Plataforma:** Nuxt.js (Vue)
**Extraído em:** 2026-07-05

## Perfil de nicho

**Tipo:** Discovery platform / Curadoria de conteúdo
**Atende:** Plataformas de descoberta, diretórios curados, agregadores de recomendações

## Arquivos

- `index.html` — HTML mínimo (SPA, conteúdo carregado via JS)

## Padrões visuais (transferíveis)

| Padrão | Descrição | Transferível? |
|--------|-----------|---------------|
| **SPA shell** | HTML mínimo, conteúdo via JS | Sim (como referência) |
| **Theme color lime** | Cor accent lime (#E3F794) | Sim |
| **Minimal nav** | Navegação limpa | Sim |
| **Card grid** | Grid de cards de curadoria | Sim |

## Cores do sistema

```css
--accent: #E3F794 (lime)
```

## Nota

Site é SPA pura — HTML retornado é quase vazio. Conteúdo real precisa de browser rendering. Útil como referência de estrutura, não de CSS/markup.

## O que NÃO transferir

- Nuxt.js-specific markup
- Conteúdo dinâmico carregado via JS
