"""Orientation: the short, budgeted context an agent receives at session start (design doc 04 §8)."""

from __future__ import annotations

import json
import re
from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from brainwiki.format.rules import parse_rules
from brainwiki.ids import is_ulid, ulid_datetime

if TYPE_CHECKING:
    from brainwiki.config.manifest import Profile
    from brainwiki.engine import Engine


def topic_rows(engine: Engine, profile: Profile | None = None) -> list[dict[str, Any]]:
    """Topics visible to `profile` (default: the engine's), most recently updated first."""
    from brainwiki.index.scanner import discovered_topics

    conn = engine.db
    profile = profile or engine.profile
    max_rank = engine.manifest.privacy_rank(profile.max_privacy)
    stats = {
        r["topic"]: r
        for r in conn.execute(
            """SELECT topic, COUNT(*) AS c, MAX(updated) AS u FROM nodes
               WHERE kind IN ('note','hub') AND topic IS NOT NULL GROUP BY topic"""
        )
    }
    hubs: dict[str, Any] = {}
    for r in conn.execute(
        "SELECT topic, title, path, props FROM nodes WHERE kind='hub' ORDER BY path"
    ):
        hubs.setdefault(r["topic"], r)
    conflict_counts: dict[str, int] = {}
    for ta, tb, count in conn.execute(
        """SELECT a.topic, b.topic, COUNT(*) FROM edges e
           JOIN nodes a ON a.id=e.src JOIN nodes b ON b.id=e.dst
           WHERE e.rel='conflicts_with' AND a.status='active' AND b.status='active'
           GROUP BY a.topic, b.topic"""
    ):
        for topic in {ta, tb} - {None}:
            conflict_counts[topic] = conflict_counts.get(topic, 0) + count
    rows = []
    for slug, path in sorted(discovered_topics(engine).items()):
        declared = engine.manifest.topics.get(slug)
        privacy = (
            declared.privacy if declared and declared.privacy else engine.manifest.privacy.default
        )
        if engine.manifest.privacy_rank(privacy) > max_rank or not profile.topic_allowed(slug):
            continue
        stat = stats.get(slug)
        hub = hubs.get(slug)
        title = (declared.title if declared and declared.title else None) or (
            hub["title"] if hub else slug
        )
        description = declared.description if declared and declared.description else ""
        if not description and hub is not None:
            description = str(json.loads(hub["props"] or "{}").get("description") or "")
        rows.append(
            {
                "slug": slug,
                "title": title,
                "path": path,
                "hub": hub["path"] if hub else None,
                "description": description,
                "notes": stat["c"] if stat else 0,
                "updated": ((stat["u"] if stat else None) or "")[:10],
                "conflicts": conflict_counts.get(slug, 0),
            }
        )
    rows.sort(key=lambda r: r["updated"], reverse=True)
    return rows


def pending_stats(engine: Engine) -> dict[str, Any]:
    rows = engine.db.execute("SELECT id, fm_id FROM nodes WHERE kind='episode'").fetchall()
    oldest_days = 0.0
    for row in rows:
        ulid = row["fm_id"] or ""
        if is_ulid(ulid):
            oldest_days = max(
                oldest_days, (datetime.now(UTC) - ulid_datetime(ulid)).total_seconds() / 86400
            )
    proposals = engine.store.abspath(engine.manifest.layout.proposals_dir)
    files = sorted(proposals.glob("*.md")) if proposals.exists() else []
    rule_ids = [p.stem[len("rule-") :] for p in files if p.name.startswith("rule-")]
    return {
        "pending": len(rows),
        "oldest_days": round(oldest_days, 1),
        "proposals": len(files) - len(rule_ids),
        "rule_proposals": rule_ids,
    }


def recent_changes(engine: Engine, count: int = 5) -> list[str]:
    try:
        text = engine.store.read_text("log.md")
    except OSError:
        return []
    entries = [line[3:].strip() for line in text.splitlines() if line.startswith("## ")]
    return entries[-count:][::-1]


def orient(engine: Engine, *, extra_lines: list[str] | None = None) -> dict[str, Any]:
    engine.scan()
    name = engine.brain.display_name
    try:
        rules_text = engine.store.read_text("rules.md")
    except OSError:
        rules_text = ""
    rules, _ = parse_rules(rules_text)
    topics = topic_rows(engine)
    inbox = pending_stats(engine)
    notes = engine.db.execute("SELECT COUNT(*) FROM nodes WHERE kind IN ('note','hub')").fetchone()[
        0
    ]
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    budget_chars = engine.manifest.budgets.orient_max_tokens * 4

    header = f"# Brain: {name} · {today} · {notes} notes · {inbox['pending']} pending episodes"
    rule_lines = ["## Rules"] + ([f"- {r.text}" for r in rules] or ["(none)"])
    inbox_lines = [
        "## Inbox",
        f"{inbox['pending']} pending episodes"
        + (f", oldest {inbox['oldest_days']} days" if inbox["pending"] else ""),
    ]
    if inbox["proposals"]:
        inbox_lines.append(
            f"{inbox['proposals']} proposal(s) awaiting review (`brain review list`)."
        )
    if inbox["rule_proposals"]:
        count = len(inbox["rule_proposals"])
        inbox_lines.append(
            f"{count} rule{'s' if count != 1 else ''} awaiting the user's confirmation: "
            + ", ".join(f"`brain rule accept {r}`" for r in inbox["rule_proposals"][:3])
        )
    if inbox["pending"] >= 20 or inbox["oldest_days"] > 7:
        inbox_lines.append(
            "Consider consolidating (brain_consolidate_prepare) when the user agrees."
        )
    inbox_lines += extra_lines or []
    howto = [
        "## How to use",
        "- Search (brain_search) before answering about past decisions, preferences, or project history.",
        "- Record durable learnings with brain_log_episode. Never edit brain files directly; never add rules unless asked.",
    ]
    changes = recent_changes(engine)
    change_lines = (["## Recent changes"] + [f"- {c}" for c in changes]) if changes else []

    def topic_line(t: dict[str, Any]) -> str:
        bits = [f"- **{t['slug']}**: {t['title']}"]
        if t["description"]:
            bits.append(f"— {t['description']}")
        bits.append(
            f"({t['notes']} notes, updated {t['updated'] or 'n/a'}"
            + (f", {t['conflicts']} open conflicts" if t["conflicts"] else "")
            + ")"
        )
        return " ".join(bits)

    fixed = [header, "", *rule_lines, "", *inbox_lines, "", *howto]
    fixed_len = sum(len(line) + 1 for line in fixed) + sum(len(line) + 1 for line in change_lines)
    topic_lines = ["## Topics"]
    used = fixed_len + 20
    shown = 0
    for t in topics:
        line = topic_line(t)
        if used + len(line) + 1 > budget_chars:
            break
        topic_lines.append(line)
        used += len(line) + 1
        shown += 1
    if shown < len(topics):
        topic_lines.append(f"- … {len(topics) - shown} more topics; use brain_search.")
    if not topics:
        topic_lines.append("(no topics yet)")
    parts = [header, "", *rule_lines, "", *topic_lines, ""]
    if change_lines and used + sum(len(line) + 1 for line in change_lines) <= budget_chars:
        parts += [*change_lines, ""]
    parts += [*inbox_lines, "", *howto]
    text = "\n".join(parts)
    if len(text) > budget_chars:
        text = text[: budget_chars - 1] + "…"
    return {
        "brain": name,
        "text": text,
        "rules": [r.text for r in rules],
        "topics": topics,
        "pending_episodes": inbox["pending"],
        "open_proposals": inbox["proposals"],
        "notes": notes,
    }


def strip_markdown(text: str) -> str:
    return re.sub(r"[*_`]", "", text)


def agents_block(engine: Engine, extra: list[dict[str, Any]] | None = None) -> str:
    """The generated block of the brain's AGENTS.md, as the `default` profile sees the brain.

    Topics are listed alphabetically so the block only changes when topics do; when the file
    would exceed `budgets.agents_md_max_lines`, only the most recently updated topics are kept.
    """
    from brainwiki.format.agents_md import extract_block
    from brainwiki.lifecycle import default_agents_block

    rows = topic_rows(engine, engine.manifest.profile("default"))
    known = {r["slug"] for r in rows}
    rows = [r for r in extra or [] if r["slug"] not in known] + rows
    name = engine.brain.display_name

    def render(selected: list[dict[str, Any]], hidden: int) -> str:
        table = [
            (r["slug"], r["hub"] or r["path"], r["description"] or r["title"])
            for r in sorted(selected, key=lambda r: r["slug"])
        ]
        if hidden:
            table.append((f"… {hidden} more", "see the hubs under topics/", ""))
        return default_agents_block(name, table)

    try:
        current = engine.store.read_text("AGENTS.md")
    except OSError:
        current = ""
    old_block = extract_block(current) or ""
    outside = len(current.splitlines()) - (len(old_block.splitlines()) + 2 if old_block else 0)
    budget = engine.manifest.budgets.agents_md_max_lines - max(outside, 0) - 2
    keep = len(rows)
    block = render(rows, 0)
    while keep > 0 and len(block.splitlines()) > budget:
        keep -= 1
        block = render(rows[:keep], len(rows) - keep)
    return block
