"""Who the inbox is waiting on: pending episodes per owner, and each agent's last
consolidation (write-path.md §4.7)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.config import brain_state_dir
from brainwiki.ids import ulid_datetime

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def _day(fm_id: str | None, created: str | None) -> str | None:
    if fm_id:
        try:
            return ulid_datetime(fm_id).date().isoformat()
        except (KeyError, ValueError, OverflowError, OSError):
            pass
    return str(created)[:10] if created else None


def pending_by_agent(engine: Engine) -> dict[str, dict[str, Any]]:
    """Pending episodes per owner (their `bw-agent`, or "unowned"): count and the oldest one's
    date, largest first."""
    out: dict[str, dict[str, Any]] = {}
    for row in engine.db.execute(
        "SELECT agent, fm_id, created FROM nodes WHERE kind IN ('episode', 'agent_file')"
    ):
        entry = out.setdefault(row["agent"] or "unowned", {"count": 0, "oldest": None})
        entry["count"] += 1
        day = _day(row["fm_id"], row["created"])
        if day and (entry["oldest"] is None or day < entry["oldest"]):
            entry["oldest"] = day
    return dict(sorted(out.items(), key=lambda kv: (-kv[1]["count"], kv[0])))


def consolidation_runs(engine: Engine) -> list[dict[str, Any]]:
    """`consolidate` runs recorded in `log.md`, oldest first: when, the run id, the agent, the
    summary ("archived 7 episodes: 2 record, …"), and one line per episode."""
    try:
        text = engine.store.read_text("log.md")
    except OSError:
        return []
    runs: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    for line in text.splitlines():
        if line.startswith("## "):
            parts = [p.strip() for p in line[3:].split("·")]
            current = None
            if len(parts) == 3 and parts[1] == "consolidate":
                current = {"at": parts[0], "run": parts[2], "agent": "", "summary": "", "lines": []}
                runs.append(current)
        elif current is not None and line.startswith("- "):
            if not current["agent"] and line.startswith("- agent: "):
                current["agent"] = line[len("- agent: ") :].split(" (", 1)[0].strip()
            elif not current["summary"]:
                current["summary"] = line[2:].strip()
            else:
                current["lines"].append(line[2:].strip())
    return runs


def last_consolidations(engine: Engine) -> dict[str, dict[str, Any]]:
    """Each agent's latest `consolidate` run in `log.md`."""
    return {run["agent"]: run for run in consolidation_runs(engine) if run["agent"]}


def scheduled_run_path(brain_key: str, host: str) -> Path:
    """Where the last scheduled consolidation for this brain and host is recorded."""
    return brain_state_dir(brain_key) / "scheduled" / f"{host}.json"


def scheduled_runs(engine: Engine) -> dict[str, dict[str, Any]]:
    """The last scheduled consolidation per host on this machine: when, status (`ok`,
    `nothing`, `failed`), summary, and error."""
    directory = brain_state_dir(engine.brain.key) / "scheduled"
    out: dict[str, dict[str, Any]] = {}
    for path in sorted(directory.glob("*.json")) if directory.is_dir() else []:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        if isinstance(data, dict):
            out[path.stem] = data
    return out
