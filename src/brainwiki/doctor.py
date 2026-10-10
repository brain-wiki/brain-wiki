"""`brain doctor`: a read-only report of configuration, brains, hosts, and SQLite (design doc 15 §3.4)."""

from __future__ import annotations

import json
import shutil
import sqlite3
from pathlib import Path
from typing import Any

from brainwiki import __version__
from brainwiki.config.dirs import config_file, state_dir
from brainwiki.config.user import load_user_config

HOST_PROBES: dict[str, dict[str, list[str]]] = {
    "claude-code": {"bins": ["claude"], "dirs": ["~/.claude"]},
    "codex": {"bins": ["codex"], "dirs": ["~/.codex"]},
    "antigravity": {
        "bins": ["agy"],
        "dirs": ["~/.gemini/antigravity", "~/.gemini/antigravity-cli"],
    },
    "openclaw": {"bins": ["openclaw"], "dirs": ["~/.openclaw"]},
    "cursor": {"bins": ["cursor-agent", "cursor"], "dirs": ["~/.cursor"]},
}


def sqlite_capabilities() -> dict[str, Any]:
    conn = sqlite3.connect(":memory:")
    caps = {"version": sqlite3.sqlite_version, "fts5": False, "trigram": False}
    try:
        conn.execute("CREATE VIRTUAL TABLE t USING fts5(a)")
        caps["fts5"] = True
        conn.execute("CREATE VIRTUAL TABLE t2 USING fts5(a, tokenize='trigram')")
        caps["trigram"] = True
    except sqlite3.OperationalError:
        pass
    finally:
        conn.close()
    return caps


def host_installed(host: str) -> bool:
    probe = HOST_PROBES.get(host, {})
    if any(shutil.which(b) for b in probe.get("bins", [])):
        return True
    return any(Path(d).expanduser().exists() for d in probe.get("dirs", []))


def host_connection(host: str) -> dict[str, Any] | None:
    record = state_dir() / "connect" / f"{host}.json"
    if record.exists():
        try:
            return json.loads(record.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return None
    return None


def _brain_summary(name: str, path: Path) -> dict[str, Any]:
    from brainwiki.config.resolve import open_brain

    info: dict[str, Any] = {"name": name, "path": str(path), "ok": False}
    try:
        brain = open_brain(path, name)
    except Exception as exc:  # report, never raise
        info["error"] = str(exc)
        return info
    info.update(ok=True, format=brain.manifest.format, git=(path / ".git").exists(), id=brain.id)
    layout = brain.manifest.layout
    info["pending_episodes"] = (
        sum(1 for _ in (path / layout.episodes_dir).rglob("*.md"))
        if (path / layout.episodes_dir).exists()
        else 0
    )
    info["notes"] = (
        sum(1 for _ in (path / layout.topics_dir).rglob("*.md"))
        if (path / layout.topics_dir).exists()
        else 0
    )
    proposals = path / layout.proposals_dir
    info["open_proposals"] = sum(1 for _ in proposals.glob("*.md")) if proposals.exists() else 0
    return info


def run_doctor() -> dict[str, Any]:
    user = load_user_config()
    report: dict[str, Any] = {
        "version": __version__,
        "device": user.device_name,
        "config": {"path": str(config_file()), "exists": config_file().exists()},
        "cli": {"on_path": bool(shutil.which("brain")), "path": shutil.which("brain")},
        "brains": [],
        "hosts": [],
        "sqlite": sqlite_capabilities(),
        "problems": [],
        "next_steps": [],
    }
    for name, path in sorted(user.brains.items()):
        summary = _brain_summary(name, path)
        summary["default"] = name == user.default
        report["brains"].append(summary)
        if not summary["ok"]:
            report["problems"].append(
                {
                    "code": "brain_unreadable",
                    "severity": "error",
                    "message": f"brain {name!r}: {summary.get('error')}",
                    "fix": f"brain brains add {name} <new path>",
                }
            )
    if not user.brains:
        report["problems"].append(
            {
                "code": "no_brain",
                "severity": "warning",
                "message": "No brain is registered.",
                "fix": "brain init ~/brains/personal",
            }
        )
        report["next_steps"].append("create a brain")
    if not report["sqlite"]["fts5"]:
        report["problems"].append(
            {
                "code": "no_fts5",
                "severity": "error",
                "message": "This Python's SQLite lacks FTS5; search will not work.",
                "fix": "use a Python build with FTS5 (python.org, uv, or distro builds include it)",
            }
        )
    for host in HOST_PROBES:
        installed = host_installed(host)
        connection = host_connection(host)
        entry: dict[str, Any] = {
            "id": host,
            "installed": installed,
            "connected": connection is not None,
        }
        if connection:
            entry.update({k: connection.get(k) for k in ("plugin", "capture") if k in connection})
        entry["harvest"] = user.harvest_enabled(host)
        entry["capture"] = user.capture_enabled(host)
        report["hosts"].append(entry)
        if installed and not connection and user.brains:
            report["problems"].append(
                {
                    "code": "host_not_connected",
                    "severity": "info",
                    "host": host,
                    "message": f"{host} is installed but not connected.",
                    "fix": f"brain connect {host}",
                }
            )
            report["next_steps"].append(f"connect {host}")
    return report
