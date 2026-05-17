# Skill Generation Protocol

Este protocolo define como a WorldWideBridges.MVP-allmight deve identificar oportunidades de novas Skills para o ecossistema colony-brain.

## Objetivo

Transformar workflows, processos, automacoes, padroes criativos e solucoes reutilizaveis descobertas durante projetos em Skills publicaveis, revisaveis e melhoraveis pela comunidade.

## Quando sugerir uma nova Skill

A Skill base deve sugerir a criacao de uma nova Skill quando identificar qualquer um destes sinais:

1. O usuario criou um processo repetivel que poderia ajudar outras pessoas.
2. O projeto exigiu uma combinacao criativa de ferramentas que pode ser reaproveitada.
3. O usuario resolveu um problema comum de MVP, marketing, design, entrega, automacao, dados, codigo ou organizacao.
4. Nao existe uma Skill semelhante no repositorio colony-brain ou nas referencias disponiveis.
5. A ideia criada no projeto poderia melhorar uma Skill existente.
6. Um prompt, script, checklist ou fluxo ficou util o suficiente para virar modulo independente.
7. O usuario expressou que aquilo poderia ajudar outras pessoas.
8. O mesmo padrao apareceu mais de uma vez em projetos diferentes.

## Tipos de sugestao

A Skill base pode sugerir tres caminhos:

### 1. Nova Skill

Use quando o workflow for amplo, reutilizavel e tiver identidade propria.

Exemplo:
- uma Skill para criar landing pages gratuitas;
- uma Skill para organizar projetos no Google Drive;
- uma Skill para criar automacoes com Apps Script;
- uma Skill para transformar videos curtos em funis de captura.

### 2. Aprimoramento de Skill existente

Use quando a ideia melhora uma Skill ja existente.

Exemplo:
- adicionar uma nova matriz de decisao;
- adicionar um template;
- adicionar um script;
- adicionar exemplo de uso;
- melhorar o checklist de revisao.

### 3. Registro experimental

Use quando a ideia parece promissora, mas ainda nao esta madura.

Exemplo:
- um workflow criado em um projeto especifico;
- uma solucao que ainda precisa de validacao;
- uma integracao com ferramenta instavel ou pouco testada.

## Como responder ao usuario

Quando identificar uma oportunidade, a Skill deve dizer de forma simples:

```text
Isso parece reutilizavel. Podemos transformar este processo em uma Skill ou contribuicao para o colony-brain.
```

Depois deve entregar:

1. Nome sugerido da Skill ou aprimoramento.
2. Problema que resolve.
3. Quem se beneficiaria.
4. Quando deveria ser ativada.
5. Quais arquivos ela teria.
6. Riscos ou limites.
7. Proximo passo para empacotar.

## Formato minimo de proposta

```md
# Skill Opportunity

## Nome sugerido

## Tipo
Nova Skill / Aprimoramento / Experimental

## Problema que resolve

## Para quem serve

## Quando usar

## Quando nao usar

## Processo que ela padroniza

## Arquivos recomendados
- SKILL.md
- README.md
- templates/
- examples/
- scripts/ se necessario

## Ferramentas envolvidas

## Riscos e cuidados

## Proximo passo
```

## Papel do colony-brain

O colony-brain deve funcionar como a base central de Skills originais, aprimoramentos e padroes de revisao.

Ele deve permitir que chats de usuarios que ativem a Skill base consigam:

- consultar o padrao de criacao;
- reconhecer se uma ideia merece virar Skill;
- propor contribuicoes;
- organizar submissao;
- facilitar a revisao pelo mantenedor;
- publicar ou sugerir publicacao no repositorio.

## Fluxo ideal futuro

1. Usuario cria ou descobre um processo util durante um projeto.
2. WorldWideBridges.MVP-allmight identifica a oportunidade.
3. A Skill sugere transformar em Skill, aprimoramento ou experimento.
4. O usuario autoriza a estruturacao.
5. A LLM gera um pacote de submissao.
6. O pacote e salvo em Drive ou GitHub.
7. O mantenedor revisa com seu chat.
8. Se aprovado, entra no colony-brain.
9. Outras pessoas podem usar, adaptar e melhorar.

## Regra importante

A Skill base nao deve interromper o projeto principal toda vez que detectar uma oportunidade. Ela deve sugerir de forma leve e acionavel, sem atrapalhar o progresso do MVP.

Formato recomendado:

```text
Nota colony-brain: este fluxo parece reutilizavel e pode virar uma Skill depois. Posso registrar como oportunidade no historico do projeto.
```

## Registro no PROJECT_HISTORY.md

Sempre que uma oportunidade for identificada, registrar no historico:

```md
## Oportunidade para colony-brain

- Tipo: Nova Skill / Aprimoramento / Experimental
- Nome sugerido:
- Motivo:
- Processo reutilizavel:
- Arquivos possiveis:
- Status: Ideia / Rascunho / Submetido / Aprovado / Publicado
```
