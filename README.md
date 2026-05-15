# colony-brain

Cérebro append-only do Projeto COLÔNIA.

Este repositório armazena a memória operacional da colônia: logs de execução, genomas, tarefas, skills aprendidas, combinações recomendadas e resultados de testes.

## Estrutura

```text
logs/
  victories/
  failures/
  partials/
genomes/
  best/
  archive/
tasks/
  active/
  archive/
skills/
  index.json
  atomic/
  combinations/
  tests/
schemas/
  genome.schema.json
  task.schema.json
  agent_log.schema.json
  skill.schema.json
  skill_combination.schema.json
```

## Conceito operacional

A COLÔNIA evolui agentes a partir de experiência acumulada. Cada execução gera logs. Logs alimentam genomas, skills e combinações de skills. A Rainha usa essa memória para lançar novas unidades de agente com maior probabilidade de sucesso.

## Princípios

1. O Cérebro é append-only: a história não deve ser apagada.
2. Toda skill aprendida precisa ser documentada, versionada e testável.
3. Toda tarefa deve declarar skills requeridas ou recomendadas.
4. A Rainha pode gerar agentes com combinações recomendadas ou combinações randômicas controladas.
5. Uma skill só deve ser promovida para confiável depois de evidência repetida em logs e testes.

## Status de skills

- `candidate`: detectada em uma execução, ainda não confiável.
- `experimental`: pode ser usada em agentes exploratórios.
- `validated`: passou em testes e possui evidência suficiente.
- `trusted`: pode ser recomendada automaticamente pela Rainha.
- `deprecated`: não deve mais ser usada.

## Fase atual

- Fase 0: prova visual evolutiva concluída.
- Fase 1: agente real local parcialmente concluído.
- Fase 1.5: estruturação do Cérebro GitHub com schemas e skills em andamento.
- Fase 2: ciclo autônomo real com skills ainda pendente.
