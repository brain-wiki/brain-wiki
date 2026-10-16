"""Orientation: the short, budgeted briefing an agent fetches with `brain_orient` (design doc 04 §8)."""

from __future__ import annotations

import json
from datetime import UTC, datetime, timedelta
from typing import TYPE_CHECKING, Any

from brainwiki.format import parse_rules
from brainwiki.ids import is_ulid, ulid_datetime

if TYPE_CHECKING:
    from brainwiki.engine import Engine


_PEOPLE_TYPES = {"person": "People", "meeting": "Meetings"}


def brief_stats(engine: Engine) -> dict[str, Any]:
    """Everything the briefing counts, from one pass over the notes.

    A pass over 10k notes costs about 10 ms even from a covering index, so the topic table,
    the totals, the type counts, and where people and meetings live share this one query.
    Counts are of notes: a topic's hub is its index, not one of its notes, so it only dates
    the topic.
    """
    week_ago = (datetime.now(UTC) - timedelta(days=7)).strftime("%Y-%m-%d")
    by_topic: dict[str, dict[str, Any]] = {}
    types: dict[str, int] = {}
    homes: dict[str, dict[str, int]] = {}
    notes, last = 0, ""
    for row in engine.db.execute(
        """SELECT kind, topic, type, COUNT(*) AS c, MAX(updated) AS l
            FROM nodes n WHERE kind IN ('note', 'hub')
            GROUP BY kind, topic, type"""
    ):
        latest = (row["l"] or "")[:10]
        last = max(last, latest)
        note = row["kind"] == "note"
        notes += row["c"] if note else 0
        if row["topic"] is not None:
            topic = by_topic.setdefault(row["topic"], {"notes": 0, "updated": ""})
            topic["notes"] += row["c"] if note else 0
            topic["updated"] = max(topic["updated"], latest)
        if note:
            types[row["type"]] = types.get(row["type"], 0) + row["c"]
            if row["type"] in _PEOPLE_TYPES and row["topic"] is not None:
                where = homes.setdefault(row["type"], {})
                where[row["topic"]] = where.get(row["topic"], 0) + row["c"]
    # The oldest date and the last week's count read nodes_updated in order, not every note.
    oldest = engine.db.execute(
        """SELECT updated FROM nodes n INDEXED BY nodes_updated
            WHERE updated IS NOT NULL AND kind IN ('note', 'hub')
            ORDER BY updated LIMIT 1"""
    ).fetchone()
    first = (oldest["updated"] or "")[:10] if oldest else ""
    week = engine.db.execute(
        """SELECT COUNT(*) FROM nodes n INDEXED BY nodes_updated
            WHERE updated >= ? AND kind = 'note'""",
        (week_ago,),
    ).fetchone()[0]
    episodes = engine.db.execute(
        """SELECT COUNT(*) AS pending,
                   MIN(CASE WHEN length(fm_id) = 26 THEN fm_id END) AS oldest
            FROM nodes n WHERE kind = 'episode'"""
    ).fetchone()
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
    }


def topic_rows(engine: Engine, stats: dict[str, Any] | None = None) -> list[dict[str, Any]]:
    """Topics, most recently updated first.

    Every topic of the tree gets a row with its own counts, its `parent`, and `total_*` counts
    that include its sub-topics."""
    conn = engine.db
    tree = engine.topics
    stats = stats or brief_stats(engine)
    by_topic = stats["by_topic"]
    hubs: dict[str, Any] = {}
    for r in conn.execute(
        "SELECT topic, title, path, props FROM nodes WHERE kind='hub' ORDER BY path"
    ):
        hubs.setdefault(r["topic"], r)
    rows = []
    for slug, path in sorted(tree.paths.items()):
        declared = engine.manifest.topics.get(slug)
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
            }
        )
    by_slug = {r["slug"]: r for r in rows}
    for row in rows:
        parent = next((a for a in tree.ancestors(row["slug"]) if a in by_slug), None)
        below = [by_slug[d] for d in tree.descendants(row["slug"]) if d in by_slug]
        row["parent"] = parent
        row["sub_topics"] = [
            r["slug"] for r in sorted(below, key=lambda r: r["updated"], reverse=True)
        ]
        row["total_notes"] = row["notes"] + sum(r["notes"] for r in below)
        row["total_updated"] = max([row["updated"], *(r["updated"] for r in below)])
    rows.sort(key=lambda r: r["updated"], reverse=True)
    return rows


def _pending_stats(engine: Engine, stats: dict[str, Any] | None = None) -> dict[str, Any]:
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
        "rule_proposals": rule_ids,
    }


def _recent_changes(engine: Engine, count: int = 5) -> list[str]:
    try:
        text = engine.store.read_text("log.md")
    except OSError:
        return []
    entries = [line[3:].strip() for line in text.splitlines() if line.startswith("## ")]
    return entries[-count:][::-1]


def _contents(
    engine: Engine, stats: dict[str, Any], topics: list[dict[str, Any]]
) -> dict[str, Any]:
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
    }


def _query_examples(info: dict[str, Any], topics: list[dict[str, Any]]) -> list[str]:
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
    hub = next((t["hub"] for t in by_size if t["title"] == other and t["hub"]), None)
    if hub:
        lines.append(f'- `brain_neighbors("{hub}")`: what a note links to, and what links to it.')
    return lines


def _writing_lines(engine: Engine, topics: list[dict[str, Any]]) -> list[str]:
    """How to write a valid note, for agents that may edit (02 §6)."""
    from brainwiki.format import STATUSES

    layout = engine.manifest.layout
    slugs = [t["slug"] for t in sorted(topics, key=lambda t: -t["notes"]) if t["parent"] is None]
    known = ", ".join(slugs[:6]) + (", …" if len(slugs) > 6 else "") if slugs else "none yet"
    return [
        "## Writing notes",
        f"- Edit or create Markdown files at `{layout.topics_dir}/<topic>/<slug>.md` (topics: "
        f"{known}); a new topic is a folder with an `{layout.hub_filename}` hub.",
        "- Frontmatter is metadata only: `type` (note, decision, howto, person, …), `title`, "
        f'`status` ({" | ".join(STATUSES)}), `bw-superseded_by: "[[newer note]]"` with '
        '`status: superseded`, `bw-sources: ["[[archive/episodes/…]]", "https://…"]`, '
        "`tags`, `aliases`, `updated`. Keep an existing `id`; for a new note, "
        "`brain_validate` gives the `id:` line to add.",
        "- Body: a one-paragraph summary, then one fact per bullet; link notes with "
        "`[[wikilinks]]` inside sentences.",
        "- Then run `brain_validate` on the files you changed and fix what it reports.",
    ]


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
    inbox = _pending_stats(engine, stats)
    info = _contents(engine, stats, topics)
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    budget_chars = engine.manifest.budgets.orient_max_tokens * 4

    span = f" ({info['span'][0]} to {info['span'][1]})" if info["span"] else ""
    header = (
        f"# Brain: {name} · {today} · {info['notes']} notes{span} · "
        f"{inbox['pending']} pending {'episode' if inbox['pending'] == 1 else 'episodes'}"
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
    if len(content_lines) == 1:
        content_lines.append("(empty so far)")
    inbox_lines = [
        "## Inbox",
        f"{inbox['pending']} pending {'episode' if inbox['pending'] == 1 else 'episodes'}"
        + (f", oldest {inbox['oldest_days']} days" if inbox["pending"] else ""),
    ]
    if inbox["rule_proposals"]:
        count = len(inbox["rule_proposals"])
        inbox_lines.append(
            f"{count} rule{'s' if count != 1 else ''} awaiting the user's confirmation: "
            + ", ".join(f"`brain rules accept {r}`" for r in inbox["rule_proposals"][:3])
        )
    if inbox["pending"] >= 20 or inbox["oldest_days"] > 7:
        inbox_lines.append(
            "Consider consolidating (brain_consolidate_prepare) when the user agrees."
        )
    inbox_lines += extra_lines or []
    howto = ["## How to query", *_query_examples(info, topics)]
    writing = _writing_lines(engine, topics) if engine.profile.can("edit") else []
    changes = _recent_changes(engine)
    change_lines = ["## Recent changes"] + [f"- {c}" for c in changes]
    if info["updated_7d"]:
        change_lines.append(f"{info['updated_7d']} notes updated in the last 7 days.")
    if len(change_lines) == 1:
        change_lines = []

    def topic_line(t: dict[str, Any]) -> str:
        bits = [f"- **{t['slug']}**: {t['title']}"]
        if t["description"]:
            bits.append(f"— {t['description']}")
        subs = t["sub_topics"]
        bits.append(
            f"({t['total_notes']} notes, updated {t['total_updated'] or 'n/a'}"
            + (
                f"; {len(subs)} sub-topics: "
                + ", ".join(subs[:4])
                + (", …" if len(subs) > 4 else "")
                if subs
                else ""
            )
            + ")"
        )
        return " ".join(bits)

    def size(lines: list[str]) -> int:
        return sum(len(line) + 1 for line in lines) + 1

    fixed = [header, *rule_lines, *content_lines, *inbox_lines, *howto, *writing]
    used = size(fixed) + 8
    if change_lines and used + size(change_lines) + 200 > budget_chars:
        change_lines = []  # keep room for at least a few topics
    used += size(change_lines) + size(["## Topics"]) + 80
    topic_lines = ["## Topics"]
    shown = 0
    roots = sorted(
        (t for t in topics if t["parent"] is None), key=lambda t: t["total_updated"], reverse=True
    )
    for t in roots:
        line = topic_line(t)
        if used + len(line) + 1 > budget_chars:
            break
        topic_lines.append(line)
        used += len(line) + 1
        shown += 1
    if shown < len(roots):
        rest = roots[shown]
        topic_lines.append(
            f'- … {len(roots) - shown} more topics; list one with brain_search("", topic=["{rest["slug"]}"]).'
        )
    if not topics:
        topic_lines.append("(no topics yet)")
    parts = [header, "", *rule_lines, "", *content_lines, "", *topic_lines, ""]
    if change_lines:
        parts += [*change_lines, ""]
    parts += [*inbox_lines, "", *howto]
    if writing:
        parts += ["", *writing]
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
        "open_proposals": len(inbox["rule_proposals"]),
        "notes": info["notes"],
    }


def agents_block(
    engine: Engine, extra: list[dict[str, Any]] | None = None, *, edit: bool | None = None
) -> str:
    """The generated block of the brain's AGENTS.md.

    Topics are listed alphabetically so the block only changes when topics do; when the file
    would exceed `budgets.agents_md_max_lines`, only the most recently updated topics are kept.
    """
    from brainwiki.format import extract_block
    from brainwiki.lifecycle import default_agents_block

    rows = [r for r in topic_rows(engine) if r["parent"] is None]
    known = {r["slug"] for r in rows}
    rows = [r for r in extra or [] if r["slug"] not in known and not r.get("parent")] + rows
    name = engine.brain.display_name
    can_edit = engine.manifest.profile("default").can("edit") if edit is None else edit

    def render(selected: list[dict[str, Any]], hidden: int) -> str:
        table = [
            (
                r["slug"],
                r["hub"] or r["path"],
                (r["description"] or r["title"])
                + (f" ({len(r['sub_topics'])} sub-topics)" if r.get("sub_topics") else ""),
            )
            for r in sorted(selected, key=lambda r: r["slug"])
        ]
        if hidden:
            table.append((f"… {hidden} more", "see the hubs under topics/", ""))
        return default_agents_block(name, table, edit=can_edit)

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
