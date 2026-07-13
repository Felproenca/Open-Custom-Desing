# Workflows da Anthropic: Taxonomia, Aplicações e Ecossistema

> Generated 2026-07-10 · depth: standard · 50+ sources · workspace: research/anthropic-workflows/

## Executive Summary

- Anthropic define uma **taxonomia clara de 5 padrões de workflow**: prompt chaining, routing, parallelization, orchestrator-workers, e evaluator-optimizer — todos compostos de blocos simples [1][2]
- A distinção fundamental é entre **workflows** (caminhos de orquestração pré-definidos) e **agents** (LLMs que direcionam dinamicamente seus próprios processos) [1]
- O **Model Context Protocol (MCP)** é o padrão aberto da Anthropic para conectar IA a ferramentas externas, usando JSON-RPC 2.0 com três primitivas: Tools, Resources, Prompts [4][5]
- A abordagem da Anthropic é **API-first e toolkit-based** — fornece primitivas de baixo nível, mas deixa a orquestração para o desenvolvedor [9][10]
- Casos de uso reais mostram resultados concretos: Cursor serve 60%+ do Fortune 500, Notion cortou custos de IA em 90%, Slack economiza 97 min/semana por usuário [11][12][13]
- O ecossistema convergiu para dois modelos: **agente único poderoso + ferramentas ricas** (Anthropic) vs. **orquestração multi-agente** (LangGraph, AutoGen, CrewAI, OpenAI) [17]

## Background & Scope

Esta pesquisa investiga os padrões de workflow agentic da Anthropic, sua taxonomia oficial, ferramentas de baixo nível (tool use, MCP, structured outputs), padrões de orquestração multi-agente, aplicações práticas com casos de uso reais, e comparação com alternativas no mercado. O período coberto é 2024-2026, com foco em documentação e annúncios oficiais da Anthropic.

## 1. Taxonomia de Workflows

A Anthropic publicou em dezembro de 2024 o guia "Building Effective Agents" [1], que estabelece a taxonomia definitiva de workflows agentic:

### O Bloco Fundamental: Augmented LLM

O ponto de partida é o **augmented LLM** — um LLM enriquecido com retrieval, tools e memória. Os modelos atuais da Anthropic conseguem gerar queries de busca, selecionar ferramentas e decidir o que reter [1][2].

### Os 5 Padrões de Workflow

1. **Prompt Chaining** — Decompoem uma tarefa em etapas sequenciais, onde cada chamada LLM processa a saída da anterior. Troca latência por acurácia. Ideal para tarefas que podem ser divididas em sub-problemas menores [1][2].

2. **Routing** — Classifica um input e o direciona para uma tarefa especializada. Permite separação de responsabilidades e prompts mais especializados. Otimizar para um tipo de input não prejudica performance em outros [1][3].

3. **Parallelization** — Duas variações: *sectioning* (subtarefas independentes em paralelo) e *voting* (mesma tarefa múltiplas vezes para outputs diversos) [1][2].

4. **Orchestrator-Workers** — Um LLM central quebr动态地 delega tarefas a workers. A diferença da parallelization é a flexibilidade — subtarefas são determinadas dinamicamente pelo orquestrador, não pré-definidas [1][3].

5. **Evaluator-Optimizer** — Um LLM gera, outro avalia em loop. Efetivo quando existem critérios claros de avaliação e refinamento iterativo agrega valor mensurável [1][2].

### Agentes Autônomos

Acima dos workflows, Anthropic posiciona os **agentes autônomos** — sistemas onde o LLM direciona dinamicamente seus próprios processos. Melhor para problemas abertos onde o número de passos não pode ser previsto [1].

## 2. Tool Use e MCP

### Arquitetura Cliente/Servidor

Claude distingue entre **client tools** (executam na sua aplicação) e **server tools** (executam na infraestrutura da Anthropic) [4]. As server tools incluem web_search, web_fetch, code_execution, e tool_search — uma capacidade única no mercado [10].

### Model Context Protocol (MCP)

O MCP é um padrão aberto JSON-RPC 2.0 para conectar aplicações de IA a sistemas externos — descrito como "a porta USB-C para aplicações de IA" [5].

- **Três primitivas**: Tools (funções executáveis), Resources (fontes de dados), Prompts (templates reutilizáveis) [5]
- **Transportes**: STDIO (local) e Streamable HTTP (remoto) [6]
- **MCP Connector**: Integração direta via Messages API com servidores MCP remotos, sem necessário cliente MCP separado (beta desde 2025-11-20) [6]

### Tool Search

Para bibliotecas com 10.000+ ferramentas, o tool search permite que Claude busque sob demanda com regex ou BM25, reduzindo bloat de contexto em 85%+ e carregando apenas as 3-5 ferramentas necessárias [7].

### Structured Outputs

Outputs estruturados garantem JSON compatível com schema via *constrained decoding*, e também alimentam o modo `strict: true` para validação de input de tools [8].

### Programmatic Tool Calling

Claude pode escrever código que chama ferramentas de dentro de um container de execução, melhorando performance em ~11% com 24% menos tokens em benchmarks de busca agentic [9].

## 3. Orquestração Multi-Agente

### Claude Agent SDK — Subagents

O Claude Agent SDK suporta subagentes via parâmetro `agents` para isolamento de contexto [3]:

- Cada subagente roda em sua própria conversa fresca — apenas a mensagem final volta ao pai [3]
- **AgentDefinition** permite configurar prompts, tools, modelos e permissões por subagente [3]
- Subagentes rodam em background por padrão para execução paralela não-bloqueante [3]
- Subagentes aninhados suportados até **5 níveis de profundidade** [3]
- Subagentes podem ser **reanudados** mantendo histórico completo [3]
- Para orquestração em grande escala (dezenas a centenas de agentes), usar a **Workflow tool** em vez de subagentes [3]

### Princípio de Design: Simplicidade Primeiro

Anthropic enfatiza: "Comece com prompts simples, otimize com avaliação abrangente, e adicione sistemas agentic multi-step apenas quando soluções mais simples não bastam" [1][3].

## 4. Aplicações Práticas e Casos de Uso

### Cursor — Coding Agents

- Serve 60%+ do Fortune 500 com coding agents baseados em Claude [11]
- Cresceu de 15 para 700 funcionários em 2 anos [11]
- Desenvolvendo agents remotos que rodam por horas/dias com computer use, mostrando trabalho via vídeo [11]

### Notion — Managed Agents

- Orquestra 30+ tarefas concorrentes de agentes com um board [12]
- Database auto-melhorável de skills — quando um PR é merged, Claude identifica lições e alimenta as skills [12]
- Prompt caching reduziu custos em 90% e latência em até 85% [13]

### Figma Make

- Permite a PMs criar protótipos funcionais a partir de mockups estáticos em 5 minutos, sem código [14]

### Slack

- Usuários economizam 97 minutos/semana via sumarização e busca com IA [15]

### Advantage Solutions

- Retomando 70.000+ horas/anális de trabalho manual em compliance [16]
- Workflow semanal de 10 horas de validação financeira comprimido para 30 minutos [16]

### Casos de Uso Mais Promissores (segundo Anthropic)

- **Suporte ao cliente** e **coding agents** são os dois casos de uso agentic mais promissores em produção [1][11]

## 5. Comparação com Alternativas

| Plataforma | Filosofia | Padrões de Orquestração | Diferencial |
|---|---|---|---|
| **Anthropic** | API-first, toolkit-based | 5 workflows composáveis + agentes autônomos | Server tools (executam na infra da Anthropic), MCP connector, extended thinking com tool use interleaved |
| **OpenAI** | SDK opinado (Responses API) | Handoffs + agents-as-tools | Prompts versionados como config, deprecou Assistants API |
| **LangGraph** | Runtime de orquestração de baixo nível | Grafos com estado, durabilidade, human-in-the-loop | Preenche gap que nem Anthropic nem OpenAI cobrem explicitamente |
| **CrewAI** | Agentes como membros de equipe | Papel + objetivo + backstory | Abordagem narrativa, mais próxima do AutoGen |
| **AutoGen** | 3 camadas (core, AgentChat, Studio) | Teams, Swarm, multi-agent chat | Maior amplitude de abstrações |
| **LangChain** | Provider-agnostic | create_agent com 10+ integrações | Mais genérico, roteia entre provedores |

### Convergência do Ecossistema

O mercado convergiu para dois modelos fundamentais [17]:

1. **Agente único poderoso + ferramentas ricas** (abordagem Anthropic) — aposta na inteligência do agente individual
2. **Orquestração multi-agent** (LangGraph, AutoGen, CrewAI, OpenAI handoffs) — composição de múltiplos agentes especializados

A Anthropic se diferencia ao apostar no modelo 1, oferecendo server tools únicas que nenhum outro provedor combina na mesma profundidade de integração [10].

## 6. Princípios de Design Recomendados

A Anthropic prescreve três princípios para design de agentes [1]:

1. **Simplicidade** — Manter o design do agente simples
2. **Transparência** — Mostrar explicitamente os passos de planejamento
3. **ACI (Agent-Computer Interface)** — Documentação e testes cuidadosos das ferramentas

Anti-pattern importante: "Não use frameworks por padrão. Comece com chamadas diretas à API; adicione complexidade apenas quando a melhoria mensurável justificar" [1][2].

A Anthropic gastou mais tempo otimizando definições de tools do que o prompt geral ao construir seu agente SWE-bench — incluindo mudar tools para exigir caminhos absolutos para prevenir erros do modelo [1].

## Open Questions

- Como o Workflow tool da Anthropic se compara na prática com LangGraph para orquestração de 100+ agentes?
- Quais métricas de acurácia e completude de tarefas os builders de agentes (Cursor, Notion) atingem com Claude vs. modelos alternativos?
- Como as Managed Agents da Anthropic (API REST hospedada) se comparam com auto-hospedagem para deployments enterprise?
- O MCP connector vai se tornar o padrão de fato para integração tool-use, ouOpenAI e Google criarão concorrentes?
- Qual é a trajetória de custo do programmatic tool calling vs. tool use tradicional em escala?

## Sources

[1] Building Effective Agents — https://www.anthropic.com/engineering/building-effective-agents (published 2024-12-19, accessed 2026-07-10)
[2] Anthropic Engineering Blog — Building Effective Agents — https://www.anthropic.com/research/building-effective-agents (published 2024-12-19, accessed 2026-07-10)
[3] Claude Agent SDK — Subagents — https://platform.claude.com/docs/en/agent-sdk/subagents (accessed 2026-07-10)
[4] Tool Use Overview — https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview (accessed 2026-07-10)
[5] MCP Introduction — https://modelcontextprotocol.io/introduction (accessed 2026-07-10)
[6] MCP Connector — https://docs.anthropic.com/en/docs/agents-and-tools/mcp-connector (accessed 2026-07-10)
[7] Tool Search Tool — https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/tool-search-tool (accessed 2026-07-10)
[8] Structured Outputs — https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs (accessed 2026-07-10)
[9] Programmatic Tool Calling — https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/programmatic-tool-calling (accessed 2026-07-10)
[10] Tool Use Overview (Server Tools) — https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview (accessed 2026-07-10)
[11] Cursor Customer Story — https://claude.com/customers/cursor-qa (published 2026-06-10, accessed 2026-07-10)
[12] Notion Customer Story — https://claude.com/customers/notion-qa (published 2026-07-09, accessed 2026-07-10)
[13] Notion Customer Story (Caching) — https://claude.com/customers/notion (published 2026-07-09, accessed 2026-07-10)
[14] Figma Customer Story — https://claude.com/customers/figma (published 2026-06-10, accessed 2026-07-10)
[15] Slack Customer Story — https://claude.com/customers/slack (published 2026-06-23, accessed 2026-07-10)
[16] Advantage Solutions Customer Story — https://claude.com/customers/advantage-solutions (published 2026-07-08, accessed 2026-07-10)
[17] OpenAI Orchestration Guide — https://platform.openai.com/docs/guides/agents/orchestration (accessed 2026-07-10)
[18] MCP Architecture — https://modelcontextprotocol.io/docs/learn/architecture (accessed 2026-07-10)
[19] LangGraph Overview — https://docs.langchain.com/oss/python/langgraph/overview (accessed 2026-07-10)
[20] CrewAI Agents — https://docs.crewai.com/en/concepts/agents (accessed 2026-07-10)
[21] AutoGen AgentChat — https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html (accessed 2026-07-10)
[22] Anthropic Extended Thinking — https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking (accessed 2026-07-10)
[23] OpenAI Migration Guide — https://platform.openai.com/docs/assistants/migration (accessed 2026-07-10)
[24] LangChain Overview — https://docs.langchain.com/oss/python/langchain/overview (accessed 2026-07-10)
[25] Anthropic Customer Stories — https://claude.com/customers (accessed 2026-07-10)
