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

from brainwiki.config.dirs import brain_state_dir
from brainwiki.config.manifest import Profile
from brainwiki.consolidate.schema import CLAIM_MAX_CHARS, MAX_OPS
from brainwiki.errors import Expired, NotFound
from brainwiki.format.document import parse_document
from brainwiki.format.relations import CANONICAL
from brainwiki.index.scanner import discovered_topics
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

INSTRUCTIONS_VERSION = 1
RUN_TTL_SECONDS = 3600
BUDGETS = {"agent": 15_000, "command": 30_000}
MAX_CANDIDATES = 5
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


@dataclass
class EpisodeRef:
    handle: str
    path: str
    id: str | None
    first_line: int
    last_line: int
    taint: str
    origin: str
    privacy_rank: int
    archive_to: str


@dataclass
class NoteRef:
    handle: str
    path: str
    id: str
    hash: str
    topic: str | None
    privacy_rank: int
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
    privacy_rank: int
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
        and time.time() - packet.created > RUN_TTL_SECONDS
    ):
        raise Expired(f"{run} expired; prepare a new run")
    return packet


def drop_packet(engine: Engine, run: str) -> None:
    _packet_file(engine, run).unlink(missing_ok=True)


# -- selection -------------------------------------------------------------
def reserved_episodes(engine: Engine) -> set[str]:
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


def pending_episodes(engine: Engine, profile: Profile, *, topic: str | None = None) -> list[Any]:
    """Pending episodes this profile may read, oldest first."""
    max_rank = engine.manifest.privacy_rank(profile.max_privacy)
    reserved = reserved_episodes(engine)
    rows = engine.db.execute(
        """SELECT id, path, fm_id, agent, origin, taint, privacy_rank, props, created, session, origin_turns
           FROM nodes WHERE kind = 'episode' ORDER BY COALESCE(fm_id, created, path)"""
    ).fetchall()
    out = []
    for row in rows:
        if row["privacy_rank"] > max_rank or row["path"] in reserved:
            continue
        hints = _hints(row["props"])
        if topic and topic not in hints:
            continue
        if "*" not in profile.topics and hints and not any(h in profile.topics for h in hints):
            continue
        out.append(row)
    return out


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


def _candidates(engine: Engine, text: str, hints: list[str], visible: set[str]) -> list[str]:
    found: list[str] = []
    for slug in hints:
        hub = engine.db.execute(
            "SELECT id FROM nodes WHERE topic = ? AND kind = 'hub' ORDER BY path LIMIT 1", (slug,)
        ).fetchone()
        if hub and hub["id"] in visible:
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
        notes = [r["id"] for r in rows if r["id"] in visible and r["id"] not in found]
        found += notes[:MAX_CANDIDATES]
    return found


def _archive_path(engine: Engine, rel: str) -> str:
    layout = engine.manifest.layout
    return f"{layout.archive_dir}/{rel[len(layout.inbox_dir) + 1 :]}"


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
    limit = max_episodes or manifest.consolidate.max_episodes_per_run
    budget = (budget_tokens or BUDGETS.get(backend, 15_000)) * 4  # characters
    episodes = pending_episodes(engine, profile, topic=topic)[: max(limit * 3, limit)]
    if not episodes:
        return None
    max_rank = manifest.privacy_rank(profile.max_privacy)
    visible = {
        r["id"]
        for r in engine.db.execute(
            "SELECT id, topic, privacy_rank FROM nodes WHERE kind IN ('note', 'hub')"
        )
        if r["privacy_rank"] <= max_rank and profile.topic_allowed(r["topic"])
    }
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
            "SELECT id, path, title, type, status, topic, privacy_rank, kind FROM nodes WHERE id = ?",
            (node_id,),
        ).fetchone()
        if row is None:
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
        packet.notes[handle] = NoteRef(
            handle,
            row["path"],
            row["id"],
            "sha256:" + sha256_bytes(data),
            row["topic"],
            row["privacy_rank"],
            row["kind"],
        )
        note_entries.append(entry)
        return handle, cost

    for row in episodes:
        if len(packet.episodes) >= limit:
            break
        data = engine.store.read_bytes(row["path"])
        text = data.decode("utf-8", "replace")
        doc = parse_document(row["path"], text)
        all_lines = text.splitlines()
        first = doc.frontmatter.body_start_line
        last = len(all_lines)
        while last >= first and not all_lines[last - 1].strip():
            last -= 1
        if last < first:
            continue
        lines = [f"{n}| {all_lines[n - 1]}" for n in range(first, last + 1)]
        cost = sum(len(line) + 4 for line in lines) + 200
        candidates_ids = _candidates(engine, doc.body_text, _hints(row["props"]), visible)
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
        packet.episodes[handle] = EpisodeRef(
            handle=handle,
            path=row["path"],
            id=row["fm_id"],
            first_line=first,
            last_line=last,
            taint=row["taint"] or "unknown",
            origin=row["origin"] or "agent",
            privacy_rank=row["privacy_rank"],
            archive_to=_archive_path(engine, row["path"]),
        )
        entry = {
            "handle": handle,
            "agent": row["agent"],
            "created": row["created"],
            "origin": row["origin"],
            "taint": row["taint"],
            "candidates": handles,
            "origin_available": bool(row["session"] and row["origin_turns"]),
            "lines": lines,
        }
        if (row["taint"] or "unknown") != "false":
            entry["untrusted"] = True
        episode_entries.append(entry)
    if not packet.episodes:
        return None

    topics_out = []
    for slug, path in sorted(discovered_topics(engine).items()):
        declared = manifest.topics.get(slug)
        privacy = declared.privacy if declared and declared.privacy else manifest.privacy.default
        rank = manifest.privacy_rank(privacy)
        if rank > max_rank or not profile.topic_allowed(slug):
            continue
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
            rank,
            declared.review if declared else None,
        )
        entry = {
            "slug": slug,
            "title": (declared.title if declared and declared.title else None)
            or (hub["title"] if hub else slug),
            "description": (declared.description if declared else None) or "",
            "notes": sorted(h for h, n in packet.notes.items() if n.topic == slug),
        }
        if hub_handle:
            entry["hub"] = hub_handle
        topics_out.append(entry)

    packet.data = {
        "run": run,
        "brain": packet.brain,
        "instructions_version": INSTRUCTIONS_VERSION,
        "limits": {
            "max_ops": min(MAX_OPS, 10 * len(packet.episodes) + 20),
            "hub_max_lines": manifest.budgets.hub_max_lines,
            "claim_max_chars": CLAIM_MAX_CHARS,
        },
        "relations": list(CANONICAL),
        "topics": topics_out,
        "notes": note_entries,
        "episodes": episode_entries,
    }
    return packet
