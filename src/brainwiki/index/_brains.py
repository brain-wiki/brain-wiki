"""Which brains a host may use, and what each holds (design doc 04 §9.1)."""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path
from typing import Any

from brainwiki.config import Brain, UserConfig, load_user_config, open_brain, resolve_brain
from brainwiki.engine import Engine
from brainwiki.errors import BrainError


def _brain_stats(engine: Engine) -> dict[str, Any]:
    """Counts over the brain's notes."""
    from brainwiki.index._orient import brief_stats, topic_rows

    engine.scan()
    stats = brief_stats(engine)
    return {
        "topics": len(topic_rows(engine, stats=stats)),
        "notes": stats["notes"],
        "updated": stats["span"][1] if stats["span"] else None,
        "pending": stats["pending"],
    }


def list_brains(
    host: str | None = None,
    *,
    explicit: str | None = None,
    cwd: Path | None = None,
    user: UserConfig | None = None,
    engine_for: Callable[[Brain], Engine] | None = None,
) -> dict[str, Any]:
    """Every brain `host` may use, with its folder path.

    `engine_for` lets a long-running caller reuse its engines; otherwise each brain gets a
    short-lived one.
    """
    user = user or load_user_config()
    allowed = user.host(host).brains if host else None
    try:
        here: Brain | None = resolve_brain(explicit, host=host, cwd=cwd, user=user)
    except BrainError:
        here = None
    candidates: list[tuple[str, Path, str | None]] = [
        (name, path, name) for name, path in sorted(user.brains.items())
    ]
    if here is not None and not any(path.resolve() == here.root for _, path, _ in candidates):
        candidates.append((here.display_name, here.root, None))  # found from the cwd, unregistered
    entries: list[dict[str, Any]] = []
    for name, path, registered in candidates:
        if allowed is not None and name not in allowed:
            continue
        entry: dict[str, Any] = {"name": name}
        if host is None:
            entry["default"] = name == user.default
        try:
            brain = open_brain(path, name=registered)
        except BrainError as exc:
            entry.update(ok=False, description="", default_here=False, error=exc.message)
            if host is None:
                entry["path"] = str(path)
            entries.append(entry)
            continue
        engine = engine_for(brain) if engine_for else Engine(brain, host=host, user=user)
        try:
            stats = _brain_stats(engine)
        finally:
            if engine_for is None:
                engine.close()
        entry.update(
            ok=True,
            description=brain.manifest.description or "",
            default_here=here is not None and brain.root == here.root,
            path=str(brain.root),
            **stats,
        )
        entries.append(entry)
    return {"brains": entries}


def format_brain_list(result: dict[str, Any], *, owner: bool = False) -> str:
    rows = result["brains"]
    if not rows:
        return (
            "No brains registered. Create one with `brain init <path>`."
            if owner
            else "No brains are available to this host."
        )
    width = max(len(r["name"]) for r in rows)
    desc_width = min(max(len(r.get("description") or "") for r in rows), 48)
    lines = []
    for r in rows:
        mark = "*" if r.get("default_here") else " "
        if not r["ok"]:
            lines.append(
                f"{mark} {r['name']:<{width}}  (unavailable: {r.get('error', 'unreadable')})"
            )
            continue
        description = (r["description"] or "")[:desc_width]
        stats = [
            f"{r['topics']} topics",
            f"{r['notes']:,} notes",
            f"updated {r['updated'] or 'never'}",
        ]
        if r["pending"]:
            stats.append(f"{r['pending']} pending")
        line = f"{mark} {r['name']:<{width}}  "
        if desc_width:
            line += f"{description:<{desc_width}}  "
        line += " · ".join(stats)
        if r.get("path"):
            line += f"  {r['path']}"
        if r.get("default_here"):
            line += "  (default here)"
        lines.append(line.rstrip())
    return "\n".join(lines)
