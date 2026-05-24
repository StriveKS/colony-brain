# Runbook: Phase 1.5 to Phase 2

Use this runbook to close the first executable loop with Skills.

## 1. Resolve the Brain PR

Preserve the public README role and keep the COLONIA operational brain in `docs/COLONIA_OPERATIONAL_BRAIN.md`.

## 2. Run the First Task

```bash
python -m colonia_core.runner --task tasks/active/web_fetch_status_v1.json --skills skills/index.json --output logs
```

Expected result:

- one log under `logs/victories/`, `logs/partials/` or `logs/failures/`
- `skills_manifest` included in the log
- `skill_usage_events` included in the log
- a `validate_output_schema` event included at the end

## 3. Review the Evidence

Check:

- whether each URL matched `expected_status`
- which Skills were used
- whether retry or timeout recovery was needed
- total fitness
- final outcome

## 4. Promote Only With Repeated Evidence

Keep `retry_with_backoff` and `recover_from_timeout` experimental until they have repeated evidence across runs.

## 5. Start Phase 2

After the first enriched log lands in the Brain, run multiple agents with different combinations:

- recommended: required Skills plus retry and timeout recovery
- exploratory: required Skills plus one experimental Skill
- control: required Skills only
