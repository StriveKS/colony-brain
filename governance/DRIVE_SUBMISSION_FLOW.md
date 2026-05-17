# Drive Submission Flow

This flow lets contributors create Skills through chat and submit them for review through Google Drive.

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
    review-logs/
    contributor-guides/
```

## Contributor flow

1. User activates `WorldWideBridges.MVP-allmight` or `colony-brain.skill-forge`.
2. User creates a Skill draft through chat.
3. LLM generates:
   - SKILL.md
   - README.md
   - examples/templates/scripts if needed
   - SUBMISSION.md
4. User saves the package in `skill-submissions/incoming`.
5. Maintainer reviews through a connected LLM.
6. Maintainer moves the package to:
   - `under-review`
   - `approved`
   - `rejected`
   - `published`

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
