# Drive Submission Flow

This flow lets contributors create Skills through chat and submit them for review through Google Drive, Google Forms and GitHub.

## Automatic infrastructure setup

Use the Apps Script below to create the Drive folders, contributor guides and tracking spreadsheet automatically:

```text
scripts/criar-infra-submissoes-colony-brain.gs
```

### How to run infrastructure setup

1. Open `script.google.com`.
2. Create a new Apps Script project.
3. Paste the content of `scripts/criar-infra-submissoes-colony-brain.gs`.
4. Optional: set `CONFIG.pastaProjetosId` if you already have a `Projetos` folder.
5. Run `criarInfraSubmissoesColonyBrain`.
6. Authorize Drive and Sheets permissions.
7. Open the generated folder and spreadsheet from the execution logs.

## Skill submission form setup

Use this Apps Script to create a public Google Form for Skill submissions:

```text
scripts/criar-form-submissao-skills-colony-brain.gs
```

### How to run form setup

1. Open `script.google.com`.
2. Create a new Apps Script project or reuse the colony-brain setup project.
3. Paste the content of `scripts/criar-form-submissao-skills-colony-brain.gs`.
4. Confirm the spreadsheet ID points to `colony-brain - Skill Submissions`.
5. Run `criarFormSubmissaoSkillsColonyBrain`.
6. Authorize Forms, Drive, Sheets and Gmail permissions.
7. Copy the public form URL from the execution logs or the `Folders` tab.

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
- Form Setup
- Form Responses 1, created automatically by Google Forms

## Contributor flow

1. User activates `WorldWideBridges.MVP-allmight` or `colony-brain.skill-forge`.
2. User creates a Skill draft through chat.
3. LLM generates:
   - SKILL.md
   - README.md
   - examples/templates/scripts if needed
   - SUBMISSION.md
4. User submits through the public Google Form.
5. Form response enters the spreadsheet.
6. Maintainer reviews the response and attached/linked package.
7. Maintainer normalizes accepted submissions into the `Submissions` tab.
8. Maintainer moves the package/status to:
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
Google Form -> spreadsheet response -> review -> approved -> GitHub colony-brain -> published
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

## Public channels

Primary channel for non-technical users:

```text
Google Form submission
```

Primary channel for developers:

```text
GitHub Issue / Pull Request
```
