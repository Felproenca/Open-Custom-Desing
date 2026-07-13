# Skill: self-review

# Auto-avaliação de Trabalho (Loop de Turno)

Esta skill ensina a IA a revisar o próprio trabalho antes de entregar ao usuário, seguindo um checklist de qualidade.

## Quando usar

- Antes de entregar qualquer output (texto, código, análise)
- Quando o usuário pede para "conferir" ou "revisar" algo
- Como parte do workflow de produção

## Processo de Auto-avaliação

### 1. Checklist de Qualidade
Antes de entregar, verifique:

- [ ] **Completude**: O output cobre todos os pontos solicitados?
- [ ] **Precisão**: As informações estão corretas?
- [ ] **Clareza**: A mensagem é fácil de entender?
- [ ] **Formato**: Está no formato esperado?
- [ ] **Tom**: O tom é apropriado para o contexto?
- [ ] **Tamanho**: Não é nem muito curto nem muito longo?
- [ ] **Erros**: Não há erros gramaticais ou dedigitação?

### 2. Teste de Leitura
- Leia o output como se fosse o destinatário
- Pergunte: "Isso responde completamente o que foi pedido?"
- Se não, identifique o que falta

### 3. Validação com Critérios
Se houver critérios específicos definidos:
- Compare cada critério com o output
- Marque como atendido ou não atendido
- Justifique cada avaliação

### 4. Decisão de Entrega
- **Aprovado**: Entregue ao usuário com confiança
- **Revisado**: Faça ajustes necessários antes de entregar
- **Rejeitado**: Refaça o trabalho completamente

## Formato de Resposta

Quando usar esta skill, formate a resposta assim:

```
## Auto-avaliação

**Checklist:**
- [x] Completude
- [x] Precisão
- [ ] Clareza (precisa de melhoria)
- [x] Formato
- [x] Tom
- [x] Tamanho
- [x] Erros

**Decisão:** Revisado - ajustes necessários em Clareza

**Ajustes realizados:**
- Reescrevi o parágrafo X para maior clareza
- Adicionei exemplo para ilustrar conceito Y

**Resultado final:** [output revisado]
```

## Exemplos de Uso

### Exemplo 1: Revisão de Texto
**Input do usuário:** "Escreva um parágrafo sobre IA"

**Processo:**
1. Escreva o parágrafo
2. Aplique o checklist
3. Identifique: "poderia ter mais exemplos"
4. Reescreva com exemplo incluído
5. Entregue com auto-avaliação

### Exemplo 2: Revisão de Código
**Input do usuário:** "Escreva uma função em Python"

**Processo:**
1. Escreva a função
2. Aplique o checklist
3. Identifique: "faltam docstrings"
4. Adicione documentação
5. Entregue com auto-avaliação

## Integração com Outras Skills

Esta skill pode ser combinada com:
- `/goal`: Definir critérios de sucesso para a auto-avaliação
- `/loop`: Repetir o processo de revisão até atender critérios
- Outras skills específicas de domínio

## Dicas

- Não seja autocrítico demais - foque em melhorias reais
- Documente o que foi melhorado para transparência
- Use a auto-avaliação para aprender e melhorar futuras entregas
- O objetivo é entregar trabalho de qualidade, não perfeição absoluta
