# colony-brain

**colony-brain** is an open ecosystem for LLM Skills, operational memory, free-first MVP patterns and reusable workflows.

The goal is to help people turn ideas, automations, project routines and practical solutions into reusable Skills that can be shared, reviewed and improved.

## Core idea

```text
Projects create workflows.
Useful workflows become Skills.
Skills improve future projects.
```

## Public entry points

### WorldWideBridges.MVP-allmight GPT

```text
https://chatgpt.com/g/g-6a0a755a220881918878077b69e285fd-worldwidebridges-mvp-allmight
```

### WorldWideBridges.MVP-allmight landing page

```text
https://striveks.github.io/WorldWideBridges.MVP-allmight/
```

### WorldWideBridges.MVP-allmight repository

```text
https://github.com/StriveKS/WorldWideBridges.MVP-allmight
```

## Official Skills

### WorldWideBridges.MVP-allmight

Free-first MVP Skill for creating, organizing, launching and improving projects using native connections, Google Workspace, GitHub, Apps Script, lightweight databases, marketing, delivery and portable project memory.

Official GPT:

```text
https://chatgpt.com/g/g-6a0a755a220881918878077b69e285fd-worldwidebridges-mvp-allmight
```

Official package:

```text
https://github.com/StriveKS/WorldWideBridges.MVP-allmight
```

Local mirror inside this repo:

```text
WorldWideBridges.MVP-allmight/
```

### colony-brain.skill-forge

Skill for helping users create, package, review and submit new Skills to the colony-brain ecosystem.

Path:

```text
skills/official/colony-brain.skill-forge/
```

Status:

```text
Draft / early official Skill
```

## COLONIA operational brain

COLONIA uses `colony-brain` as an append-only operational brain for agent logs, genomes, tasks, learned Skills, skill combinations and test evidence.

Operational documentation:

```text
docs/COLONIA_OPERATIONAL_BRAIN.md
```

Phase 1.5 to Phase 2 runbook:

```text
docs/RUNBOOK_PHASE_1_5_TO_2.md
```

Minimal executable runner:

```text
colonia_core/runner.py
```

First executable task:

```text
tasks/active/web_fetch_status_v1.json
```

Initial operational Skill registry:

```text
skills/index.json
```

## Experimental Skills

### example-free-first-lead-capture

Experimental test Skill used to validate the contribution flow from opportunity detection to review and publication.

Path:

```text
skills/experimental/example-free-first-lead-capture/
```

Status:

```text
Experimental test fixture
```

## Contribution flow

colony-brain supports a simple Skill submission flow using Google Drive and GitHub.

```text
Workflow or idea
-> Skill opportunity
-> Draft package
-> Drive submission
-> Review
-> Approved / Experimental / Rejected
-> GitHub publication
```

Drive submission documentation:

```text
governance/DRIVE_SUBMISSION_FLOW.md
```

Submission template:

```text
governance/SKILL_SUBMISSION_TEMPLATE.md
```

Review template:

```text
governance/SKILL_REVIEW_TEMPLATE.md
```

Drive infrastructure script:

```text
scripts/criar-infra-submissoes-colony-brain.gs
```

## Ecosystem roles

```text
colony-brain
= parent ecosystem, brand, index, governance, review base and COLONIA operational brain.

WorldWideBridges.MVP-allmight
= first official installable Skill package, public GPT and free-first MVP operator.

colony-brain.skill-forge
= Skill for transforming reusable workflows into publishable Skills.

Experimental Skills
= testable, unstable or early workflows that may become official later.
```

## Skill lifecycle

```text
Idea or workflow
-> Skill opportunity
-> Draft package
-> Review
-> Approved / Experimental / Rejected
-> Published in colony-brain
```

## Repository strategy

- Use this repo as the main hub and ecosystem index.
- Keep the COLONIA operational brain explicit under `schemas/`, `tasks/`, `skills/`, `logs/`, `genomes/` and `colonia_core/`.
- Use dedicated repositories for clean installable Skill packages when a Skill needs independent distribution.
- Keep public Skills easy to copy, install, fork and adapt.
- Keep project memory and review standards explicit.
- Keep experimental Skills separate from official Skills until reviewed.

## Current repository map

```text
colonia_core/
  runner.py

docs/
  COLONIA_OPERATIONAL_BRAIN.md
  PROJECT_STATE_PHASE_1_5.md
  RUNBOOK_PHASE_1_5_TO_2.md

schemas/
  agent_log.schema.json
  genome.schema.json
  skill.schema.json
  skill_combination.schema.json
  task.schema.json

tasks/
  active/
    web_fetch_status_v1.json

skills/
  index.json
  atomic/
  combinations/
  official/
    colony-brain.skill-forge/
  experimental/
    example-free-first-lead-capture/

governance/
  DRIVE_SUBMISSION_FLOW.md
  SKILL_SUBMISSION_TEMPLATE.md
  SKILL_REVIEW_TEMPLATE.md

scripts/
  criar-infra-submissoes-colony-brain.gs

WorldWideBridges.MVP-allmight/
  Local mirror of the first official Skill package.
```

## Status

Early public beta. COLONIA Phase 1.5 is in progress: the Brain now has schemas, initial Skills, an active task and a minimal runner path toward enriched agent logs.
