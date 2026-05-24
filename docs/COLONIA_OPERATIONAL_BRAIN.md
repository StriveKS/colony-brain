# COLONIA Operational Brain

This document preserves the operational architecture of COLONIA without replacing the public ecosystem README.

`colony-brain` has two complementary roles:

- public ecosystem hub for reusable LLM Skills, governance and submission flows
- append-only operational brain for COLONIA agents, tasks, genomes, logs and skill evidence

## Operational Structure

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
colonia_core/
  runner.py
```

## Execution Loop

1. The Queen reads active tasks.
2. The Queen reads compatible Skills from `skills/index.json`.
3. The dispatcher starts agents with a genome and `skills_manifest`.
4. Agents execute the task and record `skill_usage_events`.
5. The log is validated before entering the Brain.
6. The Brain stores the result append-only under `logs/`.
7. Future generations select better genomes and skill combinations from evidence.

## Phase 1.5 Completion Criteria

- The Skill schemas are present in `schemas/`.
- `web_fetch_status_v1` exists under `tasks/active/`.
- Initial atomic Skills and combinations exist under `skills/`.
- A real runner can execute the task with `skills_manifest`.
- At least one enriched log with `skill_usage_events` can be produced.

## Phase 2 Entry Criteria

- The Queen can compare multiple agents or combinations.
- Skill evidence can be ranked by task, outcome and fitness.
- Candidate Skills are not promoted automatically from one success.
