"""Select pending episodes and package them with candidate notes (design doc 05 §4.3).

Handles (E1, N1, C1) replace paths and ids so models never copy long identifiers; the map
from handles back to files stays in the saved packet and is never shown to the model.
"""

from __future__ import annotations

import json
import re
import time
from collections import Counter
from dataclasses import asdict, dataclass, field
from typing import TYPE_CHECKING, Any

from brainwiki.config import Profile, brain_state_dir
from brainwiki.consolidate._schema import CLAIM_MAX_CHARS, MAX_OPS
from brainwiki.errors import Expired, FormatError, NotFound, Stale
from brainwiki.format import CANONICAL, parse_document
from brainwiki.origin import available as origin_available
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_INSTRUCTIONS_VERSION = 1
_RUN_TTL_SECONDS = 3600
_BUDGETS = {"agent": 15_000, "command": 30_000}
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
_EPISODE_REF = re.compile(r"inbox/(?:episodes|agents)/[^\s)\"'`]+\.md")
_PROTECTED_FILES = frozenset({"rules.md", "log.md", "brain.toml", "AGENTS.md"})


@dataclass
class EpisodeRef:
    handle: str
    path: str
    id: str | None
    first_line: int
    last_line: int
    inputs: str
    origin: str
    archive_to: str


@dataclass
class NoteRef:
    handle: str
    path: str
    id: str
    hash: str
    topic: str | None
    kind: str


@dataclass
class ClaimRef:
    handle: str
    note: str
    claim_id: str
    text: str
    active_claims_in_note: int


@dataclass
class TopicRef:
    slug: str
    path: str
    hub: str | None  # note handle
    hub_path: str | None
    review: str | None


@dataclass
class Packet:
    run: str
    brain: str
    backend: str
    profile: str
    created: float
    data: dict[str, Any]
    episodes: dict[str, EpisodeRef] = field(default_factory=dict)
    notes: dict[str, NoteRef] = field(default_factory=dict)
    claims: dict[str, ClaimRef] = field(default_factory=dict)
    topics: dict[str, TopicRef] = field(default_factory=dict)

    def model_text(self) -> str:
        return json.dumps(self.data, ensure_ascii=False, indent=1)

    @property
    def sha256(self) -> str:
        return sha256_bytes(self.model_text().encode("utf-8"))

    def to_json(self) -> dict[str, Any]:
        return {
            "run": self.run,
            "brain": self.brain,
            "backend": self.backend,
            "profile": self.profile,
            "created": self.created,
            "data": self.data,
            "episodes": {k: asdict(v) for k, v in self.episodes.items()},
            "notes": {k: asdict(v) for k, v in self.notes.items()},
            "claims": {k: asdict(v) for k, v in self.claims.items()},
            "topics": {k: asdict(v) for k, v in self.topics.items()},
        }

    @classmethod
    def from_json(cls, raw: dict[str, Any]) -> Packet:
        return cls(
            run=raw["run"],
            brain=raw["brain"],
            backend=raw.get("backend", "agent"),
            profile=raw.get("profile", "owner"),
            created=float(raw.get("created", 0)),
            data=raw.get("data", {}),
            episodes={k: EpisodeRef(**v) for k, v in raw.get("episodes", {}).items()},
            notes={k: NoteRef(**v) for k, v in raw.get("notes", {}).items()},
            claims={k: ClaimRef(**v) for k, v in raw.get("claims", {}).items()},
            topics={k: TopicRef(**v) for k, v in raw.get("topics", {}).items()},
        )


# -- persistence -----------------------------------------------------------
def _packet_file(engine: Engine, run: str):
    return brain_state_dir(engine.brain.key) / "runs" / run / "packet.json"


def save_packet(engine: Engine, packet: Packet) -> None:
    target = _packet_file(engine, packet.run)
    target.parent.mkdir(parents=True, exist_ok=True)
    tmp = target.with_suffix(".tmp")
    tmp.write_text(json.dumps(packet.to_json(), ensure_ascii=False), encoding="utf-8")
    tmp.replace(target)


def load_packet(engine: Engine, run: str, *, check_expiry: bool = True) -> Packet:
    target = _packet_file(engine, run)
    if not target.is_file():
        raise NotFound(f"no prepared run {run!r}; call prepare again")
    packet = Packet.from_json(json.loads(target.read_text(encoding="utf-8")))
    if (
        check_expiry
        and packet.backend == "agent"
        and time.time() - packet.created > _RUN_TTL_SECONDS
    ):
        raise Expired(f"{run} expired; prepare a new run")
    return packet


def drop_packet(engine: Engine, run: str) -> None:
    _packet_file(engine, run).unlink(missing_ok=True)


# -- selection -------------------------------------------------------------
def _reserved_episodes(engine: Engine) -> set[str]:
    """Episodes referenced by open proposals: they stay out of new packets until reviewed."""
    directory = engine.store.abspath(engine.manifest.layout.proposals_dir)
    found: set[str] = set()
    if directory.is_dir():
        for path in directory.glob("*.md"):
            try:
                found.update(_EPISODE_REF.findall(path.read_text(encoding="utf-8")))
            except (OSError, UnicodeDecodeError):
                continue
    return found


def _pending_episodes(engine: Engine, *, topic: str | None = None) -> list[Any]:
    """Pending episodes, oldest first."""
    reserved = _reserved_episodes(engine)
    rows = engine.db.execute(
        """SELECT id, path, fm_id, agent, origin, inputs, props, created, session, origin_turns,
                  device FROM nodes WHERE kind = 'episode' ORDER BY COALESCE(fm_id, created, path)"""
    ).fetchall()
    return [
        row
        for row in rows
        if row["path"] not in reserved and (not topic or topic in _hints(row["props"]))
    ]


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
                """SELECT n.id FROM fts JOIN docs d ON d.rowid = fts.rowid JOIN nodes n ON n.id = d.node_id
                   WHERE fts MATCH ? AND n.kind IN ('note', 'hub') AND n.status != 'archived'
                   ORDER BY bm25(fts, 10.0, 6.0, 3.0, 3.0, 1.0, 0.2) LIMIT 30""",
                (query,),
            ).fetchall()
        except Exception:  # noqa: BLE001 - an FTS syntax edge case must not block consolidation
            rows = []
        notes = [r["id"] for r in rows if r["id"] not in found]
        found += notes[:_MAX_CANDIDATES]
    return found


def _archive_path(engine: Engine, rel: str) -> str:
    layout = engine.manifest.layout
    return f"{layout.archive_dir}/{rel[len(layout.inbox_dir) + 1 :]}"


def _curated(engine: Engine, rel: str) -> bool:
    """A file consolidation may edit: never the brain's own files, the inbox, the archive, or reports."""
    layout = engine.manifest.layout
    if rel in _PROTECTED_FILES:
        return False
    return not rel.startswith(
        tuple(f"{d}/" for d in (layout.inbox_dir, layout.archive_dir, layout.reports_dir))
    )


def _note_ref(engine: Engine, row: Any, data: bytes, handle: str) -> NoteRef:
    return NoteRef(
        handle, row["path"], row["id"], "sha256:" + sha256_bytes(data), row["topic"], row["kind"]
    )


def _episode_span(engine: Engine, rel: str) -> tuple[Any, list[str], int, int] | None:
    """The parsed episode, its lines, and the first and last body lines; None for an empty body."""
    text = engine.store.read_bytes(rel).decode("utf-8", "replace")
    doc = parse_document(rel, text)
    all_lines = text.splitlines()
    first = doc.frontmatter.body_start_line
    last = len(all_lines)
    while last >= first and not all_lines[last - 1].strip():
        last -= 1
    return None if last < first else (doc, all_lines, first, last)


def _episode_ref(engine: Engine, row: Any, handle: str, first: int, last: int) -> EpisodeRef:
    """Provenance and the archive target always come from the episode's own file (05 §3.3)."""
    return EpisodeRef(
        handle=handle,
        path=row["path"],
        id=row["fm_id"],
        first_line=first,
        last_line=last,
        inputs=row["inputs"] or "unknown",
        origin=row["origin"] or "agent",
        archive_to=_archive_path(engine, row["path"]),
    )


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


# -- packet ----------------------------------------------------------------
def build_packet(
    engine: Engine,
    profile: Profile,
    *,
    run: str,
    backend: str,
    topic: str | None = None,
    max_episodes: int | None = None,
    budget_tokens: int | None = None,
) -> Packet | None:
    engine.scan(force=True)
    manifest = engine.manifest
    if topic and topic not in engine.topics.paths and topic not in manifest.topics:
        raise NotFound(f"unknown topic {topic!r}; `brain topics` lists them")
    limit = manifest.consolidate.max_episodes_per_run if max_episodes is None else max_episodes
    budget = (budget_tokens or _BUDGETS.get(backend, 15_000)) * 4  # characters
    episodes = _pending_episodes(engine, topic=topic)[: max(limit * 3, limit)]
    if not episodes:
        return None
    packet = Packet(
        run=run,
        brain=engine.brain.display_name,
        backend=backend,
        profile=profile.name,
        created=time.time(),
        data={},
    )
    note_handles: dict[str, str] = {}  # node id -> handle
    note_entries: list[dict[str, Any]] = []
    episode_entries: list[dict[str, Any]] = []
    used = 2000

    def add_note(node_id: str) -> tuple[str, int] | None:
        if node_id in note_handles:
            return note_handles[node_id], 0
        row = engine.db.execute(
            "SELECT id, path, title, type, status, topic, kind FROM nodes WHERE id = ?",
            (node_id,),
        ).fetchone()
        if row is None or not _curated(engine, row["path"]):
            return None
        data = engine.store.read_bytes(row["path"])
        doc = parse_document(row["path"], data.decode("utf-8", "replace"))
        handle = f"N{len(note_handles) + 1}"
        active = [c for c in doc.claims if c.status == "active" and c.id]
        claims = []
        for claim in active:
            chandle = f"C{len(packet.claims) + 1}"
            packet.claims[chandle] = ClaimRef(
                chandle, handle, str(claim.id), claim.text, len(active)
            )
            claims.append({"handle": chandle, "text": claim.text, "sources": len(claim.sources)})
        entry = {
            "handle": handle,
            "path": row["path"],
            "title": row["title"],
            "type": row["type"],
            "status": row["status"],
            "summary": _summary(doc),
            "claims": claims,
            "relations": [{"verb": r.verb, "target": r.target} for r in doc.relations],
        }
        unclaimed = sum(1 for c in doc.claims if c.status == "active" and not c.id)
        if unclaimed:
            entry["claims_without_ids"] = unclaimed
        cost = len(json.dumps(entry, ensure_ascii=False))
        note_handles[node_id] = handle
        packet.notes[handle] = _note_ref(engine, row, data, handle)
        note_entries.append(entry)
        return handle, cost

    for row in episodes:
        if len(packet.episodes) >= limit:
            break
        span = _episode_span(engine, row["path"])
        if span is None:
            continue
        doc, all_lines, first, last = span
        lines = [f"{n}| {all_lines[n - 1]}" for n in range(first, last + 1)]
        cost = sum(len(line) + 4 for line in lines) + 200
        candidates_ids = _candidates(engine, doc.body_text, _hints(row["props"]))
        if packet.episodes and used + cost > budget:
            break
        handle = f"E{len(packet.episodes) + 1}"
        handles = []
        for node_id in candidates_ids:
            added = add_note(node_id)
            if added:
                handles.append(added[0])
                used += added[1]
        used += cost
        packet.episodes[handle] = _episode_ref(engine, row, handle, first, last)
        entry = {
            "handle": handle,
            "agent": row["agent"],
            "created": row["created"],
            "origin": row["origin"],
            "inputs": row["inputs"],
            "candidates": handles,
            "origin_available": origin_available(engine, row),
            "lines": lines,
        }
        if (row["inputs"] or "unknown") != "local":
            entry["untrusted"] = True
        episode_entries.append(entry)
    if not packet.episodes:
        return None

    topics_out = []
    tree = engine.topics
    for slug, path in sorted(tree.paths.items()):
        declared = manifest.topics.get(slug)
        hub = engine.db.execute(
            "SELECT id, path, title FROM nodes WHERE topic = ? AND kind = 'hub' ORDER BY path LIMIT 1",
            (slug,),
        ).fetchone()
        hub_handle = None
        if hub is not None and slug in {packet.notes[h].topic for h in packet.notes}:
            added = add_note(hub["id"])
            hub_handle = added[0] if added else None
        packet.topics[slug] = TopicRef(
            slug,
            path,
            hub_handle,
            hub["path"] if hub else None,
            tree.setting(slug, "review"),
        )
        entry = {
            "slug": slug,
            "title": (declared.title if declared and declared.title else None)
            or (hub["title"] if hub else slug),
            "description": (declared.description if declared else None) or "",
            "notes": sorted(h for h, n in packet.notes.items() if n.topic == slug),
        }
        parent = tree.parent(slug)
        if parent:
            entry["parent"] = parent
        if hub_handle:
            entry["hub"] = hub_handle
        topics_out.append(entry)

    packet.data = {
        "run": run,
        "brain": packet.brain,
        "instructions_version": _INSTRUCTIONS_VERSION,
        "limits": {
            "max_ops": min(MAX_OPS, 10 * len(packet.episodes) + 20),
            "claim_max_chars": CLAIM_MAX_CHARS,
        },
        "relations": list(CANONICAL),
        "topics": topics_out,
        "notes": note_entries,
        "episodes": episode_entries,
    }
    return packet


# -- review ----------------------------------------------------------------
def _used_handles(ops: Any) -> set[str]:
    """Note, claim, and episode handles the ops point at; the ops are not validated yet."""
    used: set[str] = set()
    for op in ops if isinstance(ops, list) else []:
        if not isinstance(op, dict):
            continue
        used.update(
            op[k] for k in ("note", "from", "to", "claim", "episode") if isinstance(op.get(k), str)
        )
        groups = [op.get("sources")] + [
            c.get("sources") for c in op.get("claims") or [] if isinstance(c, dict)
        ]
        for sources in groups:
            if isinstance(sources, list):
                used.update(str(s).split("#", 1)[0] for s in sources)
    return used


def rebuild_packet(engine: Engine, claimed: Packet, ops: Any) -> Packet:
    """The packet behind a stored proposal, rebuilt from the current brain (05 §7.2).

    A proposal is a file anyone with access to the brain can write, so only its handles and the
    identities behind them are kept: every note must be a note consolidation may change, every
    episode a pending one whose archive target is where it archives. Hashes, line ranges,
    provenance, and topic review policies come from the files, never from `claimed`. A note,
    claim, or episode the ops use that has changed since makes the proposal stale.
    """
    engine.scan(force=True)
    layout = engine.manifest.layout
    used = _used_handles(ops)
    packet = Packet(
        run=claimed.run,
        brain=engine.brain.display_name,
        backend=claimed.backend,
        profile=claimed.profile,
        created=claimed.created,
        data={},
    )

    def node(rel: str) -> Any:
        return engine.db.execute(
            "SELECT id, path, fm_id, topic, kind, origin, inputs FROM nodes WHERE path = ?",
            (rel,),
        ).fetchone()

    def forged(rel: str) -> bool:
        return ".." in rel.split("/") or rel.startswith("/")

    for handle, ref in claimed.notes.items():
        row = node(ref.path)
        if (
            forged(ref.path)
            or not _curated(engine, ref.path)
            or (row is not None and row["kind"] not in ("note", "hub"))
        ):
            raise FormatError(
                f"{handle} names {ref.path}, which is not a note consolidation may change"
            )
        if row is None or row["id"] != ref.id:
            if handle in used:
                raise Stale(f"{ref.path} is no longer the note this proposal was made against")
            continue
        packet.notes[handle] = _note_ref(engine, row, engine.store.read_bytes(ref.path), handle)

    docs: dict[str, Any] = {}
    for handle, ref in claimed.claims.items():
        note = packet.notes.get(ref.note)
        found, active = None, []
        if note is not None:
            if note.path not in docs:
                docs[note.path] = parse_document(note.path, engine.store.read_text(note.path))
            active = [c for c in docs[note.path].claims if c.status == "active" and c.id]
            found = next((c for c in active if str(c.id) == ref.claim_id), None)
        if found is None:
            if handle in used:
                raise Stale(f"claim {ref.claim_id} is no longer active in {ref.note}'s note")
            continue
        packet.claims[handle] = ClaimRef(handle, ref.note, ref.claim_id, found.text, len(active))

    inboxes = (f"{layout.episodes_dir}/", f"{layout.agents_inbox_dir}/")
    for handle, ref in claimed.episodes.items():
        if (
            forged(ref.path)
            or not ref.path.startswith(inboxes)
            or ref.archive_to != _archive_path(engine, ref.path)
        ):
            raise FormatError(
                f"{handle} names {ref.path} (archived to {ref.archive_to}), "
                "which is not a pending episode and its archive location"
            )
        row = node(ref.path)
        span = _episode_span(engine, ref.path) if row and row["kind"] == "episode" else None
        if span is None:
            if handle in used:
                raise Stale(f"{ref.path} is no longer pending")
            continue
        packet.episodes[handle] = _episode_ref(engine, row, handle, span[2], span[3])

    tree = engine.topics
    hubs = {n.path: h for h, n in packet.notes.items()}
    for slug, path in sorted(tree.paths.items()):
        hub = engine.db.execute(
            "SELECT path FROM nodes WHERE topic = ? AND kind = 'hub' ORDER BY path LIMIT 1",
            (slug,),
        ).fetchone()
        hub_path = hub["path"] if hub else None
        packet.topics[slug] = TopicRef(
            slug, path, hubs.get(hub_path or ""), hub_path, tree.setting(slug, "review")
        )
    return packet
