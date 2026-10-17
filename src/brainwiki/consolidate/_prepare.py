"""Gather pending inbox episodes with the notes they may belong to (write-path.md §4).

The agent folds them in by editing notes directly; nothing here writes to the brain.
"""

from __future__ import annotations

import json
import re
from collections import Counter
from dataclasses import dataclass, field
from importlib import resources
from typing import TYPE_CHECKING, Any

from brainwiki.errors import NotFound, UsageError
from brainwiki.format import parse_document
from brainwiki.hosts import reader_for
from brainwiki.index import pending_by_agent
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


def nothing_message(engine: Engine) -> str:
    """What to say when the caller has nothing to consolidate: whose episodes are waiting."""
    waiting = pending_by_agent(engine)
    if not waiting:
        return "Nothing to consolidate: no pending episodes."
    listed = ", ".join(
        f"{owner} {c['count']}" + (f" (oldest {c['oldest']})" if c["oldest"] else "")
        for owner, c in waiting.items()
    )
    return (
        f"Nothing of yours to consolidate. Pending: {listed}. Take others' episodes only when "
        "the user asks (agents, unowned, or all)."
    )


def guidance() -> str:
    """How to fold episodes into notes; it ends with the heading the packet follows."""
    return (resources.files("brainwiki") / "assets" / "prompts" / "consolidate.md").read_text(
        encoding="utf-8"
    )


@dataclass
class _Scope:
    """Whose pending episodes a consolidation takes (write-path.md §4.3).

    An agent takes its own episodes; another agent's, or the unowned ones, only when the user
    asked. Without a host (the user's own CLI), every episode unless the user names some.
    """

    host: str | None = None
    agents: list[str] = field(default_factory=list)
    unowned: bool = False
    all: bool = False

    def includes(self, owner: str | None) -> bool:
        if self.all or (self.host is None and not self.agents and not self.unowned):
            return True
        if owner is None:
            return self.unowned
        return owner == self.host or owner in self.agents

    def to_json(self) -> dict[str, Any]:
        return {"agent": self.host, "agents": self.agents, "unowned": self.unowned, "all": self.all}


def _pending_episodes(engine: Engine, *, topic: str | None = None) -> list[Any]:
    """Pending episodes and agent memory files, oldest first. An episode's owner is its
    `bw-agent`; one without (written by hand, or by the user in earlier versions) is unowned."""
    rows = engine.db.execute(
        """SELECT id, path, fm_id, agent, origin, inputs, props, created, session, origin_turns,
                  device FROM nodes WHERE kind IN ('episode', 'agent_file')
           ORDER BY COALESCE(fm_id, created, path)"""
    ).fetchall()
    return [row for row in rows if not topic or topic in _hints(row["props"])]


class _Sessions:
    """Find transcripts on this machine, once per session: whether an episode's conversation
    can be reopened here, and whether that session read anything from outside."""

    def __init__(self, engine: Engine):
        self.engine = engine
        self._found: dict[tuple[str, str], Any] = {}
        self._inputs: dict[tuple[str, str], str | None] = {}

    def info(self, row: Any) -> Any:
        if not origin_available(self.engine, row):
            return None
        key = (str(row["agent"]), str(row["session"]))
        if key not in self._found:
            reader = reader_for(key[0])
            try:
                self._found[key] = reader.find(key[1]) if reader else None
            except OSError:
                self._found[key] = None
        return self._found[key]

    def inputs(self, row: Any) -> str | None:
        info = self.info(row)
        if info is None:
            return None
        key = (str(row["agent"]), str(row["session"]))
        if key not in self._inputs:
            reader = reader_for(key[0])
            try:
                self._inputs[key] = reader.read(info).inputs if reader else None
            except (OSError, ValueError):
                self._inputs[key] = None
        return self._inputs[key]


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
    engine: Engine,
    *,
    topic: str | None = None,
    max_episodes: int | None = None,
    agents: list[str] | None = None,
    unowned: bool = False,
    all: bool = False,  # noqa: A002 - the name the CLI flag and MCP argument use
) -> dict[str, Any] | None:
    """The caller's pending episodes (within a token budget) with candidate notes and the
    topic list, or None when there are none. A host gets its own episodes, those whose
    conversation is on this machine first; `agents`, `unowned`, and `all` add the rest
    (write-path.md §4.3)."""
    if max_episodes is not None and max_episodes < 1:
        raise UsageError("--max-episodes must be at least 1")
    engine.scan(force=True)
    manifest = engine.manifest
    if topic and topic not in engine.topics.paths and topic not in manifest.topics:
        raise NotFound(f"unknown topic {topic!r}; `brain topics` lists them")
    limit = manifest.consolidate.max_episodes_per_run if max_episodes is None else max_episodes
    budget = _BUDGET_TOKENS * 4  # characters
    host = engine.host if engine.host not in (None, "owner") else None
    scope = _Scope(host, [a for a in agents or [] if a != host], unowned, all)
    sessions = _Sessions(engine)
    every = _pending_episodes(engine, topic=topic)
    chosen = [row for row in every if scope.includes(row["agent"])]
    rows = sorted(
        chosen,
        key=lambda row: (
            0 if host and row["agent"] == host else 1,
            0 if host and row["agent"] == host and sessions.info(row) is not None else 1,
        ),
    )  # stable: oldest first within each group
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
        inputs = row["inputs"] or "unknown"
        session_inputs = sessions.inputs(row) if inputs != "local" else None
        episode = {
            "path": row["path"],
            "archive_to": archive_path(engine, row["path"]),
            "agent": row["agent"],
            "created": row["created"],
            "inputs": inputs,
            "topics": _hints(row["props"]),
            "candidates": candidate_paths,
            "origin_available": sessions.info(row) is not None,
            "text": body,
        }
        if session_inputs:
            # brain-wiki's own reading of the conversation, which MCP capture cannot give
            episode["session_inputs"] = session_inputs
        hint = doc.frontmatter.data.get("pattern")
        if isinstance(hint, str) and hint:
            episode["pattern"] = hint  # the capturing agent's guess; consolidation may ignore it
        if "local" not in (inputs, session_inputs):
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
    others = {
        owner: counts
        for owner, counts in pending_by_agent(engine).items()
        if not scope.includes(None if owner == "unowned" else owner)
    }
    return {
        "brain": engine.brain.display_name,
        "root": str(engine.brain.root),
        "scope": scope.to_json(),
        "pending": len(rows),
        "episodes": episodes,
        "notes": list(notes.values()),
        "topics": topics,
        "not_included": others,
    }


def packet_text(packet: dict[str, Any]) -> str:
    """The guidance followed by the packet, as an agent reads it."""
    return guidance().rstrip() + "\n\n" + json.dumps(packet, ensure_ascii=False, indent=1)
