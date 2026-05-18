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
= parent ecosystem, brand, index, governance and review base.

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
- Use dedicated repositories for clean installable Skill packages.
- Keep public Skills easy to copy, install, fork and adapt.
- Keep project memory and review standards explicit.
- Keep experimental Skills separate from official Skills until reviewed.

## Current repository map

```text
skills/
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

Early public beta.
