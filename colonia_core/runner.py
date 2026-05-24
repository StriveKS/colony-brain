from __future__ import annotations

import argparse
import json
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


DEFAULT_GENOME = {
    "retry_limit": 2,
    "wait_between_retries": 0.4,
    "timeout": 6.0,
    "user_agent": "COLONIA/0.1 skill-runner",
    "exploration_rate": 0.1,
}


@dataclass(frozen=True)
class SkillRef:
    skill_id: str
    version: str
    status: str


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_skill_index(path: Path) -> dict[str, SkillRef]:
    data = load_json(path)
    skills: dict[str, SkillRef] = {}
    for item in data.get("skills", []):
        skills[item["skill_id"]] = SkillRef(
            skill_id=item["skill_id"],
            version=item["version"],
            status=item["status"],
        )
    return skills


def build_manifest(task: dict[str, Any], skill_index: dict[str, SkillRef]) -> list[dict[str, str]]:
    selected: list[dict[str, str]] = []
    seen: set[str] = set()
    for skill_id in task.get("required_skills", []) + task.get("recommended_skills", []):
        if skill_id in seen:
            continue
        seen.add(skill_id)
        skill = skill_index[skill_id]
        selected.append(
            {"skill_id": skill.skill_id, "version": skill.version, "status": skill.status}
        )
    return selected


def classify_http_status(status: int | None, expected_status: int) -> tuple[str, str, float]:
    if status == expected_status:
        return "expected_status", "success", 35.0
    if status is None:
        return "timeout_or_network_error", "recoverable", -12.0
    if 500 <= status <= 599:
        return "temporary_server_error", "recoverable", -8.0
    return "unexpected_http_status", "failure", -20.0


def fetch_url(url: str, genome: dict[str, Any]) -> tuple[int | None, float, str | None]:
    started = time.perf_counter()
    request = Request(url, headers={"User-Agent": str(genome["user_agent"])})
    try:
        with urlopen(request, timeout=float(genome["timeout"])) as response:
            return response.status, time.perf_counter() - started, None
    except HTTPError as exc:
        return exc.code, time.perf_counter() - started, None
    except URLError as exc:
        return None, time.perf_counter() - started, str(exc.reason)
    except TimeoutError as exc:
        return None, time.perf_counter() - started, str(exc)


def validate_agent_log(log: dict[str, Any]) -> list[str]:
    required = [
        "agent_id",
        "generation",
        "task_id",
        "outcome",
        "fitness",
        "genome",
        "skills_manifest",
        "skill_usage_events",
        "history",
        "timestamp",
    ]
    return [field for field in required if field not in log]


def run_task(task_path: Path, skill_index_path: Path, output_dir: Path) -> Path:
    task = load_json(task_path)
    skill_index = load_skill_index(skill_index_path)
    manifest = build_manifest(task, skill_index)

    agent_id = f"agent_{uuid.uuid4().hex[:10]}"
    fitness = 0.0
    history: list[dict[str, Any]] = []
    skill_events: list[dict[str, Any]] = []

    for item in task.get("inputs", {}).get("urls", []):
        url = item["url"]
        expected_status = int(item["expected_status"])
        attempts = 0
        final_status: int | None = None
        final_error: str | None = None
        elapsed = 0.0

        while attempts <= int(DEFAULT_GENOME["retry_limit"]):
            attempts += 1
            status, elapsed, error = fetch_url(url, DEFAULT_GENOME)
            final_status, final_error = status, error
            barrier, result, delta = classify_http_status(status, expected_status)
            skill_events.append(
                {
                    "skill_id": "classify_http_status",
                    "event": f"classified {url}",
                    "barrier": barrier,
                    "result": result,
                    "impact": f"fitness_delta={delta}",
                    "timestamp": utc_now(),
                }
            )
            fitness += delta
            if result != "recoverable":
                break
            if attempts <= int(DEFAULT_GENOME["retry_limit"]):
                skill_events.append(
                    {
                        "skill_id": "retry_with_backoff",
                        "event": f"retry {attempts} for {url}",
                        "barrier": barrier,
                        "result": "scheduled_retry",
                        "impact": "attempting recovery from recoverable result",
                        "timestamp": utc_now(),
                    }
                )
                time.sleep(float(DEFAULT_GENOME["wait_between_retries"]) * attempts)

        if final_status is None:
            skill_events.append(
                {
                    "skill_id": "recover_from_timeout",
                    "event": f"recovered terminal network failure for {url}",
                    "barrier": "timeout_or_network_error",
                    "result": "logged_failure_context",
                    "impact": "failure converted into reusable evidence",
                    "timestamp": utc_now(),
                }
            )

        history.append(
            {
                "url": url,
                "expected_status": expected_status,
                "status": final_status,
                "error": final_error,
                "elapsed_seconds": round(elapsed, 4),
                "attempts": attempts,
            }
        )

    successful = sum(1 for item in history if item["status"] == item["expected_status"])
    outcome = "success" if successful == len(history) else "partial" if successful else "failure"
    log = {
        "agent_id": agent_id,
        "generation": 0,
        "task_id": task["task_id"],
        "outcome": outcome,
        "fitness": round(fitness, 4),
        "genome": DEFAULT_GENOME,
        "skills_manifest": manifest,
        "skill_usage_events": skill_events,
        "history": history,
        "timestamp": utc_now(),
    }
    missing_fields = validate_agent_log(log)
    skill_events.append(
        {
            "skill_id": "validate_output_schema",
            "event": "validated agent log required fields",
            "barrier": "schema_validation",
            "result": "valid" if not missing_fields else "invalid",
            "impact": "log accepted for append-only brain"
            if not missing_fields
            else f"missing_fields={','.join(missing_fields)}",
            "timestamp": utc_now(),
        }
    )

    bucket = "victories" if outcome == "success" else "partials" if outcome == "partial" else "failures"
    target_dir = output_dir / bucket
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / f"{task['task_id']}_{agent_id}.json"
    target_path.write_text(json.dumps(log, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return target_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Run a COLONIA task with a skills manifest.")
    parser.add_argument("--task", default="tasks/active/web_fetch_status_v1.json")
    parser.add_argument("--skills", default="skills/index.json")
    parser.add_argument("--output", default="logs")
    args = parser.parse_args()

    path = run_task(Path(args.task), Path(args.skills), Path(args.output))
    print(path)


if __name__ == "__main__":
    main()
