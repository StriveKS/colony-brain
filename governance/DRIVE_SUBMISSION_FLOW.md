# Drive Submission Flow

This flow lets contributors create Skills through chat and submit them for review through Google Drive.

## Automatic infrastructure setup

Use the Apps Script below to create the Drive folders, contributor guides and tracking spreadsheet automatically:

```text
scripts/criar-infra-submissoes-colony-brain.gs
```

### How to run

1. Open `script.google.com`.
2. Create a new Apps Script project.
3. Paste the content of `scripts/criar-infra-submissoes-colony-brain.gs`.
4. Optional: set `CONFIG.pastaProjetosId` if you already have a `Projetos` folder.
5. Run `criarInfraSubmissoesColonyBrain`.
6. Authorize Drive and Sheets permissions.
7. Open the generated folder and spreadsheet from the execution logs.

## Recommended Drive structure

```text
Projetos/
  colony-brain/
    skill-submissions/
      incoming/
      under-review/
      approved/
      rejected/
      published/
      archived/
    review-logs/
    contributor-guides/
```

## Generated spreadsheet

The script creates or updates:

```text
colony-brain - Skill Submissions
```

Tabs:

- Submissions
- Review Queue
- Approved
- Published
- Rejected
- Contributors
- Folders

## Contributor flow

1. User activates `WorldWideBridges.MVP-allmight` or `colony-brain.skill-forge`.
2. User creates a Skill draft through chat.
3. LLM generates:
   - SKILL.md
   - README.md
   - examples/templates/scripts if needed
   - SUBMISSION.md
4. User saves the package in `skill-submissions/incoming`.
5. User or maintainer records it in the `Submissions` tab.
6. Maintainer reviews through a connected LLM.
7. Maintainer moves the package to:
   - `under-review`
   - `approved`
   - `rejected`
   - `published`
   - `archived`

## Maintainer review prompt

```text
Review the pending Skill submissions in Drive. For each submission, evaluate usefulness, clarity, safety, free-first quality, project memory compatibility and publication readiness. Use governance/SKILL_REVIEW_TEMPLATE.md as the review format.
```

## Publication flow

```text
Drive incoming -> review -> approved -> GitHub colony-brain -> published
```

## Status values

- Draft
- Submitted
- Under Review
- Needs Changes
- Approved
- Published
- Rejected
- Archived
