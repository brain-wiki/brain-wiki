"""Gather pending inbox episodes with the notes they may belong to (write-path.md §4).

The agent folds them in by editing notes directly; nothing here writes to the brain.
"""

from __future__ import annotations

import json
import re
from collections import Counter
from importlib import resources
from typing import TYPE_CHECKING, Any

from brainwiki.errors import NotFound, UsageError
from brainwiki.format import parse_document
from brainwiki.origin import available as origin_available

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_BUDGET_TOKENS = 15_000
_MAX_CANDIDATES = 5
_WORD = re.compile(r"[^\W\d_]{4,}", re.UNICODE)
_STOP = frozenset(
    [
        "about",
        "after",
        "again",
        "also",
        "because",
        "been",
        "before",
        "being",
        "between",
        "both",
        "could",
        "does",
        "doing",
        "during",
        "each",
        "from",
        "have",
        "having",
        "here",
        "into",
        "itself",
        "just",
        "more",
        "most",
        "other",
        "over",
        "same",
        "should",
        "some",
        "such",
        "than",
        "that",
        "their",
        "them",
        "then",
        "there",
        "these",
        "they",
        "this",
        "those",
        "through",
        "under",
        "until",
        "very",
        "were",
        "what",
        "when",
        "where",
        "which",
        "while",
        "will",
        "with",
        "would",
        "your",
        "yours",
        "episode",
        "claims",
        "claim",
        "negative",
        "findings",
        "open",
        "questions",
    ]
)


def guidance() -> str:
    """How to fold episodes into notes; it ends with the heading the packet follows."""
    return (resources.files("brainwiki") / "assets" / "prompts" / "consolidate.md").read_text(
        encoding="utf-8"
    )


def _pending_episodes(engine: Engine, *, topic: str | None = None) -> list[Any]:
    """Pending episodes and agent memory files, oldest first."""
    rows = engine.db.execute(
        """SELECT id, path, fm_id, agent, origin, inputs, props, created, session, origin_turns,
                  device FROM nodes WHERE kind IN ('episode', 'agent_file')
           ORDER BY COALESCE(fm_id, created, path)"""
    ).fetchall()
    return [row for row in rows if not topic or topic in _hints(row["props"])]


def archive_path(engine: Engine, rel: str) -> str:
    layout = engine.manifest.layout
    return f"{layout.archive_dir}/{rel[len(layout.inbox_dir) + 1 :]}"


def _hints(props: str) -> list[str]:
    try:
        value = json.loads(props or "{}").get("topics")
    except ValueError:
        return []
    if isinstance(value, list):
        return [str(v) for v in value]
    if isinstance(value, str):
        return [v.strip() for v in value.split(",") if v.strip()]
    return []


def _query_terms(text: str) -> str | None:
    words = Counter(w.lower() for w in _WORD.findall(text) if w.lower() not in _STOP)
    terms = [w for w, _ in words.most_common(12)]
    return " OR ".join(f'"{t}"' for t in terms) if terms else None


def _candidates(engine: Engine, text: str, hints: list[str]) -> list[str]:
    """Node ids: the hubs of hinted topics, then the notes that best match the episode's words."""
    found: list[str] = []
    for slug in hints:
        hub = engine.db.execute(
            "SELECT id FROM nodes WHERE topic = ? AND kind = 'hub' ORDER BY path LIMIT 1", (slug,)
        ).fetchone()
        if hub:
            found.append(hub["id"])
    query = _query_terms(text)
    if query:
        try:
            rows = engine.db.execute(
                """SELECT n.id FROM fts JOIN docs d ON d.rowid = fts.rowid
                   JOIN nodes n ON n.id = d.node_id
                   WHERE fts MATCH ? AND n.kind IN ('note', 'hub') AND n.status != 'archived'
                   ORDER BY bm25(fts) LIMIT 30""",
                (query,),
            ).fetchall()
        except Exception:  # noqa: BLE001 - an FTS syntax edge case must not block consolidation
            rows = []
        notes = [r["id"] for r in rows if r["id"] not in found]
        found += notes[:_MAX_CANDIDATES]
    return found


def _summary(doc: Any) -> str:
    """The first prose paragraph after the title; stops at the first section heading."""
    lines = doc.text.splitlines()
    out: list[str] = []
    for n in range(doc.frontmatter.body_start_line, len(lines) + 1):
        line = lines[n - 1].strip()
        if line.startswith("#"):
            if line.startswith("# ") and not out:
                continue
            break
        if not line:
            if out:
                break
            continue
        out.append(line)
    return " ".join(out)[:600]


def prepare(
    engine: Engine, *, topic: str | None = None, max_episodes: int | None = None
) -> dict[str, Any] | None:
    """Pending episodes (within a token budget) with candidate notes and the topic list, or
    None when the inbox is empty."""
    if max_episodes is not None and max_episodes < 1:
        raise UsageError("--max-episodes must be at least 1")
    engine.scan(force=True)
    manifest = engine.manifest
    if topic and topic not in engine.topics.paths and topic not in manifest.topics:
        raise NotFound(f"unknown topic {topic!r}; `brain topics` lists them")
    limit = manifest.consolidate.max_episodes_per_run if max_episodes is None else max_episodes
    budget = _BUDGET_TOKENS * 4  # characters
    rows = _pending_episodes(engine, topic=topic)
    episodes: list[dict[str, Any]] = []
    notes: dict[str, dict[str, Any]] = {}
    used = 1500
    for row in rows:
        if len(episodes) >= limit:
            break
        text = engine.store.read_bytes(row["path"]).decode("utf-8", "replace")
        doc = parse_document(row["path"], text)
        body = doc.frontmatter.body.strip()
        if not body:
            continue
        cost = len(body) + 300
        if episodes and used + cost > budget:
            break
        candidate_paths = []
        for node_id in _candidates(engine, body, _hints(row["props"])):
            note = engine.db.execute(
                "SELECT id, path, title, type, status FROM nodes WHERE id = ?", (node_id,)
            ).fetchone()
            if note is None:
                continue
            candidate_paths.append(note["path"])
            if note["path"] not in notes:
                note_doc = parse_document(
                    note["path"], engine.store.read_bytes(note["path"]).decode("utf-8", "replace")
                )
                entry = {
                    "path": note["path"],
                    "title": note["title"],
                    "type": note["type"],
                    "status": note["status"],
                    "summary": _summary(note_doc),
                }
                notes[note["path"]] = entry
                used += len(json.dumps(entry, ensure_ascii=False))
        used += cost
        episode = {
            "path": row["path"],
            "archive_to": archive_path(engine, row["path"]),
            "agent": row["agent"],
            "created": row["created"],
            "inputs": row["inputs"] or "unknown",
            "topics": _hints(row["props"]),
            "candidates": candidate_paths,
            "origin_available": origin_available(engine, row),
            "text": body,
        }
        hint = doc.frontmatter.data.get("pattern")
        if isinstance(hint, str) and hint:
            episode["pattern"] = hint  # the capturing agent's guess; consolidation may ignore it
        if (row["inputs"] or "unknown") != "local":
            episode["untrusted"] = True
        episodes.append(episode)
    if not episodes:
        return None
    tree = engine.topics
    topics = []
    for slug, path in sorted(tree.paths.items()):
        declared = manifest.topics.get(slug)
        hub = engine.db.execute(
            "SELECT title FROM nodes WHERE topic = ? AND kind = 'hub' ORDER BY path LIMIT 1",
            (slug,),
        ).fetchone()
        entry = {
            "slug": slug,
            "path": path,
            "title": (declared.title if declared and declared.title else None)
            or (hub["title"] if hub else slug),
        }
        if declared and declared.description:
            entry["description"] = declared.description
        if tree.parent(slug):
            entry["parent"] = tree.parent(slug)
        topics.append(entry)
    return {
        "brain": engine.brain.display_name,
        "root": str(engine.brain.root),
        "pending": len(rows),
        "episodes": episodes,
        "notes": list(notes.values()),
        "topics": topics,
    }


def packet_text(packet: dict[str, Any]) -> str:
    """The guidance followed by the packet, as an agent reads it."""
    return guidance().rstrip() + "\n\n" + json.dumps(packet, ensure_ascii=False, indent=1)
