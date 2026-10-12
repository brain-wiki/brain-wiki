"""Orientation: the short, budgeted context an agent receives at session start (design doc 04 §8)."""

from __future__ import annotations

import json
import re
from datetime import UTC, datetime, timedelta
from typing import TYPE_CHECKING, Any

from brainwiki.format.rules import parse_rules
from brainwiki.ids import is_ulid, ulid_datetime

if TYPE_CHECKING:
    from brainwiki.config.manifest import Profile
    from brainwiki.engine import Engine


_PEOPLE_TYPES = {"person": "People", "meeting": "Meetings"}


def visibility(
    engine: Engine, alias: str = "n", profile: Profile | None = None
) -> tuple[str, list[Any]]:
    """SQL limiting `alias` to the nodes `profile` (default: the engine's) may see."""
    profile = profile or engine.profile
    clause = f"{alias}.privacy_rank <= ?"
    params: list[Any] = [engine.manifest.privacy_rank(profile.max_privacy)]
    if "*" not in profile.topics:
        clause += f" AND {alias}.topic IN ({','.join('?' * len(profile.topics))})"
        params += list(profile.topics)
    return clause, params


def brief_stats(engine: Engine, profile: Profile | None = None) -> dict[str, Any]:
    """Everything the briefing counts, from one pass over the visible notes.

    A pass over 10k notes costs about 10 ms even from a covering index, so the topic table,
    the totals, the type counts, and where people and meetings live share this one query.
    """
    vis, params = visibility(engine, profile=profile)
    week_ago = (datetime.now(UTC) - timedelta(days=7)).strftime("%Y-%m-%d")
    by_topic: dict[str, dict[str, Any]] = {}
    types: dict[str, int] = {}
    homes: dict[str, dict[str, int]] = {}
    notes, last = 0, ""
    for row in engine.db.execute(
        f"""SELECT kind, topic, type, COUNT(*) AS c, MAX(updated) AS l
            FROM nodes n WHERE kind IN ('note', 'hub') AND {vis}
            GROUP BY kind, topic, type""",  # noqa: S608
        params,
    ):
        notes += row["c"]
        latest = (row["l"] or "")[:10]
        last = max(last, latest)
        if row["topic"] is not None:
            topic = by_topic.setdefault(row["topic"], {"notes": 0, "updated": ""})
            topic["notes"] += row["c"]
            topic["updated"] = max(topic["updated"], latest)
        if row["kind"] == "note":
            types[row["type"]] = types.get(row["type"], 0) + row["c"]
            if row["type"] in _PEOPLE_TYPES and row["topic"] is not None:
                where = homes.setdefault(row["type"], {})
                where[row["topic"]] = where.get(row["topic"], 0) + row["c"]
    # The oldest date and the last week's count read nodes_updated in order, not every note.
    oldest = engine.db.execute(
        f"""SELECT updated FROM nodes n INDEXED BY nodes_updated
            WHERE updated IS NOT NULL AND kind IN ('note', 'hub') AND {vis}
            ORDER BY updated LIMIT 1""",  # noqa: S608
        params,
    ).fetchone()
    first = (oldest["updated"] or "")[:10] if oldest else ""
    week = engine.db.execute(
        f"""SELECT COUNT(*) FROM nodes n INDEXED BY nodes_updated
            WHERE updated >= ? AND kind IN ('note', 'hub') AND {vis}""",  # noqa: S608
        (week_ago, *params),
    ).fetchone()[0]
    episodes = engine.db.execute(
        f"""SELECT COUNT(*) AS pending,
                   MIN(CASE WHEN length(fm_id) = 26 THEN fm_id END) AS oldest
            FROM nodes n WHERE kind = 'episode' AND {vis}""",  # noqa: S608
        params,
    ).fetchone()
    vis_a, params_a = visibility(engine, "a", profile)
    vis_b, params_b = visibility(engine, "b", profile)
    pairs = engine.db.execute(
        f"""SELECT DISTINCT e.src, e.dst, a.topic AS ta, b.topic AS tb FROM edges e
            JOIN nodes a ON a.id = e.src JOIN nodes b ON b.id = e.dst
            WHERE e.rel = 'conflicts_with' AND a.status = 'active' AND b.status = 'active'
              AND {vis_a} AND {vis_b}""",  # noqa: S608
        (*params_a, *params_b),
    ).fetchall()
    conflicts: dict[str, int] = {}
    for pair in pairs:
        for topic in {pair["ta"], pair["tb"]} - {None}:
            conflicts[topic] = conflicts.get(topic, 0) + 1
    return {
        "notes": notes,
        "span": (first, last) if last else None,
        "updated_7d": week,
        "by_topic": by_topic,
        "types": dict(sorted(types.items(), key=lambda kv: (-kv[1], kv[0]))),
        "homes": {
            kind: sorted(where.items(), key=lambda kv: (-kv[1], kv[0]))[:2]
            for kind, where in homes.items()
        },
        "pending": episodes["pending"],
        "oldest_episode": episodes["oldest"],
        "conflicts": len(pairs),  # active conflicts between two visible notes
        "conflicts_by_topic": conflicts,
    }


def topic_rows(
    engine: Engine, profile: Profile | None = None, stats: dict[str, Any] | None = None
) -> list[dict[str, Any]]:
    """Topics visible to `profile` (default: the engine's), most recently updated first.

    Counts include only notes the profile may see, so a hidden note is never counted."""
    from brainwiki.index.scanner import discovered_topics

    conn = engine.db
    profile = profile or engine.profile
    max_rank = engine.manifest.privacy_rank(profile.max_privacy)
    stats = stats or brief_stats(engine, profile)
    by_topic, conflict_counts = stats["by_topic"], stats["conflicts_by_topic"]
    hubs: dict[str, Any] = {}
    for r in conn.execute(
        "SELECT topic, title, path, props FROM nodes WHERE kind='hub' ORDER BY path"
    ):
        hubs.setdefault(r["topic"], r)
    rows = []
    for slug, path in sorted(discovered_topics(engine).items()):
        declared = engine.manifest.topics.get(slug)
        privacy = (
            declared.privacy if declared and declared.privacy else engine.manifest.privacy.default
        )
        if engine.manifest.privacy_rank(privacy) > max_rank or not profile.topic_allowed(slug):
            continue
        stat = by_topic.get(slug, {"notes": 0, "updated": ""})
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
                "notes": stat["notes"],
                "updated": stat["updated"],
                "conflicts": conflict_counts.get(slug, 0),
            }
        )
    rows.sort(key=lambda r: r["updated"], reverse=True)
    return rows


def pending_stats(engine: Engine, stats: dict[str, Any] | None = None) -> dict[str, Any]:
    stats = stats or brief_stats(engine)
    oldest = stats["oldest_episode"]
    oldest_days = (
        (datetime.now(UTC) - ulid_datetime(oldest)).total_seconds() / 86400
        if oldest and is_ulid(oldest)
        else 0.0
    )
    proposals = engine.store.abspath(engine.manifest.layout.proposals_dir)
    files = sorted(proposals.glob("*.md")) if proposals.exists() else []
    rule_ids = [p.stem[len("rule-") :] for p in files if p.name.startswith("rule-")]
    return {
        "pending": stats["pending"],
        "oldest_days": round(max(oldest_days, 0.0), 1),
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


def open_issues(engine: Engine, stats: dict[str, Any]) -> dict[str, int]:
    """Active conflicts between visible notes, and unverified claims in visible notes."""
    vis, params = visibility(engine)
    unverified = engine.db.execute(
        # CROSS JOIN starts from the few unverified claims (claims_unverified), not every note.
        f"""SELECT COUNT(*) FROM claims c CROSS JOIN nodes n ON n.id = c.node_id
            WHERE c.status = 'active' AND c.taint IN ('true', 'unknown')
              AND n.kind IN ('note', 'hub') AND {vis}""",  # noqa: S608
        params,
    ).fetchone()[0]
    return {"conflicts": stats["conflicts"], "unverified_claims": unverified}


def contents(engine: Engine, stats: dict[str, Any], topics: list[dict[str, Any]]) -> dict[str, Any]:
    """What the brain holds, for the briefing's overview section."""
    return {
        "notes": stats["notes"],
        "types": stats["types"],
        "span": stats["span"],
        "updated_7d": stats["updated_7d"],
        "largest_topics": [
            (t["slug"], t["notes"]) for t in sorted(topics, key=lambda t: -t["notes"])[:5]
        ],
        "homes": stats["homes"],
        **open_issues(engine, stats),
    }


def query_examples(info: dict[str, Any], topics: list[dict[str, Any]]) -> list[str]:
    """Three calls built from this brain's own topics and types."""
    by_size = sorted(topics, key=lambda t: -t["notes"])
    subject = (by_size[0]["title"] if by_size else "") or "the project"
    other = by_size[1]["title"] if len(by_size) > 1 else subject
    note_types = [t for t in info["types"] if t not in ("note", "person", "meeting")]
    latest = note_types[0] if note_types else next(iter(info["types"]), None)
    lines = [f'- `brain_search("{subject}")`: notes about a subject; open one with `brain_read`.']
    if latest:
        lines.append(
            f'- `brain_search("", type=["{latest}"], sort="recent", limit=3)`: the latest {latest} notes.'
        )
    why_type = ', type=["decision"]' if "decision" in info["types"] else ""
    lines.append(
        f'- `brain_search("{other}"{why_type}, intent="why")`: why it is this way, with prerequisites.'
    )
    return lines


def orient(engine: Engine, *, extra_lines: list[str] | None = None) -> dict[str, Any]:
    engine.scan()
    name = engine.brain.display_name
    try:
        rules_text = engine.store.read_text("rules.md")
    except OSError:
        rules_text = ""
    rules, _ = parse_rules(rules_text)
    stats = brief_stats(engine)
    topics = topic_rows(engine, stats=stats)
    inbox = pending_stats(engine, stats)
    info = contents(engine, stats, topics)
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    budget_chars = engine.manifest.budgets.orient_max_tokens * 4

    span = f" ({info['span'][0]} to {info['span'][1]})" if info["span"] else ""
    header = (
        f"# Brain: {name} · {today} · {info['notes']} notes{span} · "
        f"{inbox['pending']} pending episodes"
    )
    rule_lines = ["## Rules"] + ([f"- {r.text}" for r in rules] or ["(none)"])
    content_lines = ["## What's in this brain"]
    if info["types"]:
        content_lines.append(
            "- Types: " + ", ".join(f"{t} {c}" for t, c in list(info["types"].items())[:8])
        )
    if info["largest_topics"]:
        content_lines.append(
            "- Largest topics: " + ", ".join(f"{s} ({c})" for s, c in info["largest_topics"])
        )
    for kind, label in _PEOPLE_TYPES.items():
        if kind in info["homes"]:
            content_lines.append(
                f"- {label}: "
                + ", ".join(f"topic {s} ({c} {kind} notes)" for s, c in info["homes"][kind])
            )
    issues = []
    if info["conflicts"]:
        issues.append(f"{info['conflicts']} active conflicts")
    if info["unverified_claims"]:
        issues.append(f"{info['unverified_claims']} unverified claims")
    if issues:
        content_lines.append("- Open issues: " + ", ".join(issues))
    if len(content_lines) == 1:
        content_lines.append("(empty so far)")
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
    device = engine.manifest.consolidate.device
    if device and device != engine.user.device_name:
        inbox_lines.append(
            f"This device ({engine.user.device_name}) is not the consolidation device for this brain "
            f"({device}); consolidate there."
        )
    inbox_lines += extra_lines or []
    howto = ["## How to query", *query_examples(info, topics)]
    changes = recent_changes(engine)
    change_lines = ["## Recent changes"] + [f"- {c}" for c in changes]
    if info["updated_7d"]:
        change_lines.append(f"{info['updated_7d']} notes updated in the last 7 days.")
    if len(change_lines) == 1:
        change_lines = []

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

    def size(lines: list[str]) -> int:
        return sum(len(line) + 1 for line in lines) + 1

    fixed = [header, *rule_lines, *content_lines, *inbox_lines, *howto]
    used = size(fixed) + 8
    if change_lines and used + size(change_lines) + 200 > budget_chars:
        change_lines = []  # keep room for at least a few topics
    used += size(change_lines) + size(["## Topics"]) + 80
    topic_lines = ["## Topics"]
    shown = 0
    for t in topics:
        line = topic_line(t)
        if used + len(line) + 1 > budget_chars:
            break
        topic_lines.append(line)
        used += len(line) + 1
        shown += 1
    if shown < len(topics):
        rest = topics[shown]
        topic_lines.append(
            f'- … {len(topics) - shown} more topics; list one with brain_search("", topic=["{rest["slug"]}"]).'
        )
    if not topics:
        topic_lines.append("(no topics yet)")
    parts = [header, "", *rule_lines, "", *content_lines, "", *topic_lines, ""]
    if change_lines:
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
        "contents": {k: v for k, v in info.items() if k != "span"}
        | {"span": list(info["span"]) if info["span"] else None},
        "pending_episodes": inbox["pending"],
        "open_proposals": inbox["proposals"],
        "notes": info["notes"],
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
