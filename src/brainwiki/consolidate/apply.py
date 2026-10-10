"""The deterministic writer: validated ops become line-local edits staged on a run (05 §5, §7.3).

The writer never deletes text. It appends claims and relations, strikes claims through with
metadata, adds sources, creates notes and hubs, and archives the episodes it consumed.
"""

from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from brainwiki.consolidate.packet import Packet
from brainwiki.consolidate.validate import Validation
from brainwiki.errors import Conflict, InvalidOps
from brainwiki.format.agents_md import replace_block
from brainwiki.format.claims import format_claim
from brainwiki.format.document import parse_document
from brainwiki.format.edit import append_to_section
from brainwiki.format.frontmatter import format_value, set_fields
from brainwiki.format.relations import canonical_verb, format_relation
from brainwiki.ids import claim_id, new_ulid
from brainwiki.index.resolver import LinkNamer, Resolver, norm_key
from brainwiki.runs import Run
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

TAINT_ORDER = {"false": 0, "unknown": 1, "true": 2}
_FM_ORDER = ("id", "type", "title")


@dataclass
class Staged:
    run: Run
    stats: dict[str, Counter[str]] = field(default_factory=lambda: defaultdict(Counter))
    created_notes: list[str] = field(default_factory=list)
    created_topics: list[str] = field(default_factory=list)
    archived: list[str] = field(default_factory=list)

    def log_lines(self, pending: int) -> list[str]:
        lines = [
            f"- episodes: {len(self.archived)} archived"
            + (f", {pending} left pending" if pending else "")
        ]
        for path in self.created_topics:
            lines.append(f"- new topic {path}")
        for path in self.created_notes:
            lines.append(f"- new note {path}")
        for path, counts in self.stats.items():
            bits = [f"{label} {counts[key]}" for key, label in _LABELS if counts[key]]
            if bits:
                lines.append(f"- {path}: {', '.join(bits)}")
        return lines

    def summary(self) -> dict[str, Any]:
        return {
            "episodes_archived": len(self.archived),
            "notes_created": self.created_notes,
            "topics_created": self.created_topics,
            "notes_changed": {p: dict(c) for p, c in self.stats.items()},
        }


_LABELS = (
    ("added", "+claims"),
    ("merged", "merged"),
    ("superseded", "superseded"),
    ("retracted", "retracted"),
    ("relations", "+relations"),
)


def _today() -> str:
    return datetime.now(UTC).strftime("%Y-%m-%d")


def _replace_lines(text: str, start: int, end: int, new_lines: list[str]) -> str:
    newline = "\r\n" if "\r\n" in text else "\n"
    lines = text.split(newline)
    lines[start - 1 : end] = new_lines
    return newline.join(lines)


class Applier:
    def __init__(self, engine: Engine, packet: Packet, run: Run, *, strict_hashes: bool):
        self.engine = engine
        self.packet = packet
        self.run = run
        self.strict = strict_hashes
        self.namer = LinkNamer(engine.db)
        self.staged = Staged(run)
        self.new_paths: dict[str, str] = {}  # new:<topic>/<slug> -> path
        self.new_topics: dict[str, tuple[str, str]] = {}  # slug -> (folder, hub path)
        self.topic_meta: dict[str, tuple[str, str]] = {}  # slug -> (title, description)
        self.touched: set[str] = set()
        self.changed_by_ops: set[str] = set()  # files an op changed; these get `updated`
        self.hubs: set[str] = set()
        manifest = engine.manifest
        self.layout = manifest.layout

    # -- helpers ---------------------------------------------------------
    def path_of(self, ref: str) -> str:
        if ref in self.packet.notes:
            return self.packet.notes[ref].path
        return self.new_paths[ref]

    def read(self, path: str) -> str:
        text = self.run.read(path)
        if text is None:
            raise Conflict(f"{path} no longer exists; prepare a new run")
        return text

    def write(self, path: str, text: str, *, bookkeeping: bool = False) -> None:
        self.run.write(path, text)
        self.touched.add(path)
        if not bookkeeping:
            self.changed_by_ops.add(path)

    def verify_hashes(self) -> None:
        if not self.strict:
            return
        for note in self.packet.notes.values():
            data = self.run.read_bytes(note.path)
            if data is None or "sha256:" + sha256_bytes(data) != note.hash:
                raise Conflict(
                    f"{note.path} changed since the packet was prepared; prepare a new run"
                )

    def episode_meta(self, sources: list[str]) -> dict[str, str]:
        paths: list[str] = []
        taints, origins = [], set()
        for src in sources:
            handle, _, span = src.partition("#")
            episode = self.packet.episodes[handle]
            paths.append(f"{episode.path}#{span}")
            taints.append(episode.taint)
            origins.add(episode.origin)
        meta = {
            "src": ",".join(dict.fromkeys(paths)),
            "origin": origins.pop() if len(origins) == 1 else "agent",
        }
        worst = max(taints, key=lambda t: TAINT_ORDER.get(t, 1), default="false")
        if worst != "false":
            meta["taint"] = worst
        meta["at"] = _today()
        return meta

    def link_to(self, ref: str) -> str:
        if ref in self.packet.notes:
            return self.namer(self.packet.notes[ref].id)
        path = self.new_paths[ref]
        stem = path.rsplit("/", 1)[-1][:-3]
        taken = self.engine.db.execute(
            "SELECT COUNT(*) FROM names WHERE kind = 'stem' AND key = ?", (norm_key(stem),)
        ).fetchone()[0]
        return stem if not taken else path[:-3]

    def find_claim(self, handle: str) -> tuple[str, Any]:
        claim = self.packet.claims[handle]
        path = self.path_of(claim.note)
        doc = parse_document(path, self.read(path))
        found = next((c for c in doc.claims if c.id == claim.claim_id), None)
        if found is None:
            raise InvalidOps(f"claim {handle} ({claim.claim_id}) is no longer in {path}")
        return path, found

    # -- ops -------------------------------------------------------------
    def create_topic(self, op: dict[str, Any]) -> None:
        slug = op["slug"]
        folder = f"{self.layout.topics_dir}/{slug}"
        hub = f"{folder}/{self.layout.hub_filename.replace('{folder}', slug)}"
        fields = {"id": new_ulid(), "type": "hub", "title": op["title"]}
        if op.get("description"):
            fields["description"] = op["description"]
        fields.update(created=_today(), updated=_today())
        head = ["---", *[f"{k}: {format_value(v)}" for k, v in fields.items()], "---"]
        body = (
            [f"# {op['title']}", ""]
            + ([op["description"], ""] if op.get("description") else [])
            + ["## Notes", ""]
        )
        self.run.create(hub, "\n".join(head + body))
        self.touched.add(hub)
        self.new_topics[slug] = (folder, hub)
        self.topic_meta[slug] = (op["title"], op.get("description") or "")
        self.staged.created_topics.append(folder)

    def create_note(self, op: dict[str, Any], rank: int) -> None:
        topic, slug = op["ref"][4:].split("/", 1)
        if topic in self.new_topics:
            folder, hub = self.new_topics[topic]
            topic_rank = self.engine.manifest.privacy_rank(None)
        else:
            ref = self.packet.topics[topic]
            folder, hub, topic_rank = ref.path, ref.hub_path, ref.privacy_rank
        path = f"{folder}/{slug}.md"
        self.new_paths[op["ref"]] = path
        fields: dict[str, Any] = {
            "id": new_ulid(),
            "type": op.get("type") or "note",
            "title": op["title"],
        }
        if rank > topic_rank:
            fields["privacy"] = self.engine.manifest.privacy.levels[rank]
        fields.update(created=_today(), updated=_today())
        lines = [
            "---",
            *[f"{k}: {format_value(v)}" for k, v in fields.items()],
            "---",
            f"# {op['title']}",
            "",
        ]
        if op.get("summary"):
            lines += [" ".join(op["summary"].split()), ""]
        lines.append("## Claims")
        for claim in op["claims"]:
            meta = {"id": claim_id(), **self.episode_meta(claim["sources"])}
            lines.append(format_claim(claim["text"], meta))
        lines += ["", "## Relations"]
        if hub:
            lines.append(f"- part_of [[{self.hub_link(hub)}]]")
        self.run.create(path, "\n".join(lines) + "\n")
        self.touched.add(path)
        self.staged.created_notes.append(path)
        self.staged.stats[path]["added"] += len(op["claims"])
        if hub:
            text = self.read(hub)
            self.write(
                hub,
                append_to_section(text, "notes", [f"- [[{self.link_to(op['ref'])}]]"]),
                bookkeeping=True,
            )
            self.hubs.add(hub)

    def hub_link(self, hub_path: str) -> str:
        """Hubs share a file name (index.md), so they are usually linked by path, labeled by title."""
        row = self.engine.db.execute(
            "SELECT id, title FROM nodes WHERE path = ?", (hub_path,)
        ).fetchone()
        if row is None:
            return hub_path[:-3]
        link = self.namer(row["id"])
        return f"{link}|{row['title']}" if "/" in link and row["title"] else link

    def add_claim(self, op: dict[str, Any]) -> None:
        path = self.path_of(op["note"])
        meta = {"id": claim_id(), **self.episode_meta(op["sources"])}
        text = append_to_section(
            self.read(path), "claims", [format_claim(op["text"], meta)], create_before="relations"
        )
        self.write(path, text)
        self.staged.stats[path]["added"] += 1

    def merge_claim(self, op: dict[str, Any]) -> None:
        path, claim = self.find_claim(op["claim"])
        extra = self.episode_meta(op["sources"])
        meta = dict(claim.meta)
        sources = [s for s in meta.get("src", "").split(",") if s] + extra["src"].split(",")
        meta["src"] = ",".join(dict.fromkeys(sources))
        taint = max(
            (meta.get("taint", "false"), extra.get("taint", "false")),
            key=lambda t: TAINT_ORDER.get(t, 1),
        )
        meta.pop("taint", None)
        if taint != "false":
            meta["taint"] = taint
        meta["at"] = _today()
        line = format_claim(claim.text, meta, struck=claim.struck)
        self.write(path, _replace_lines(self.read(path), claim.line, claim.last_line, [line]))
        self.staged.stats[path]["merged"] += 1

    def supersede_claim(self, op: dict[str, Any]) -> None:
        path, claim = self.find_claim(op["claim"])
        new_id = claim_id()
        new_line = format_claim(op["text"], {"id": new_id, **self.episode_meta(op["sources"])})
        old_meta = {**claim.meta, "status": "superseded", "by": new_id, "reason": op["reason"]}
        old_line = format_claim(claim.text, old_meta, struck=True)
        self.write(
            path, _replace_lines(self.read(path), claim.line, claim.last_line, [new_line, old_line])
        )
        self.staged.stats[path]["superseded"] += 1

    def retract_claim(self, op: dict[str, Any]) -> None:
        path, claim = self.find_claim(op["claim"])
        evidence = self.episode_meta(op["sources"])["src"]
        meta = {**claim.meta, "status": "retracted", "reason": op["reason"], "at": _today()}
        meta["src"] = ",".join(
            dict.fromkeys(
                [s for s in claim.meta.get("src", "").split(",") if s] + evidence.split(",")
            )
        )
        line = format_claim(claim.text, meta, struck=True)
        self.write(path, _replace_lines(self.read(path), claim.line, claim.last_line, [line]))
        self.staged.stats[path]["retracted"] += 1

    def add_relation(self, op: dict[str, Any]) -> None:
        verb, is_alias = canonical_verb(op["verb"])
        assert verb is not None
        qualifier = op.get("qualifier") or (op["verb"].lower() if is_alias else None)
        source = self.path_of(op["from"])
        target = self.path_of(op["to"])
        text = self.read(source)
        doc = parse_document(source, text)
        resolver = Resolver(self.engine.db)
        target_id = self.packet.notes[op["to"]].id if op["to"] in self.packet.notes else None
        for existing in doc.relations:
            if existing.verb != verb:
                continue
            if norm_key(existing.target) in (norm_key(target), norm_key(target.rsplit("/", 1)[-1])):
                return
            if target_id and resolver.resolve(existing.target, source).node_id == target_id:
                return
        attrs = {str(k): str(v) for k, v in (op.get("attrs") or {}).items()}
        line = format_relation(
            verb, self.link_to(op["to"]), qualifier=qualifier, attrs=attrs, note=op.get("comment")
        )
        self.write(source, append_to_section(text, "relations", [line]))
        self.staged.stats[source]["relations"] += 1
        if verb == "supersedes":
            self.write(
                target,
                set_fields(self.read(target), {"status": "superseded"}, order_first=_FM_ORDER),
            )
        elif verb == "superseded_by":
            self.write(
                source,
                set_fields(self.read(source), {"status": "superseded"}, order_first=_FM_ORDER),
            )


def stage(
    engine: Engine,
    packet: Packet,
    ops: list[dict[str, Any]],
    validation: Validation,
    *,
    strict_hashes: bool = True,
    agent: str | None = None,
    backend: str | None = None,
    model: str | None = None,
) -> Staged:
    """Compute every change in memory on a run; nothing touches disk until the run commits."""
    from brainwiki.index.orient import agents_block

    run = Run(
        engine,
        "consolidate",
        agent=agent,
        backend=backend,
        model=model,
        ops=ops,
        packet_sha256=packet.sha256,
        run_id=packet.run,
    )
    applier = Applier(engine, packet, run, strict_hashes=strict_hashes)
    applier.verify_hashes()
    ranks: dict[str, int] = defaultdict(int)
    for op in ops:
        target = op.get("ref") or op.get("note")
        for src in [
            *op.get("sources", []),
            *(s for c in op.get("claims", []) for s in c["sources"]),
        ]:
            handle = src.split("#", 1)[0]
            if target and handle in packet.episodes:
                ranks[target] = max(ranks[target], packet.episodes[handle].privacy_rank)
    order = {"create_topic": 0, "create_note": 1}
    for op in sorted(ops, key=lambda o: order.get(o["op"], 2)):
        kind = op["op"]
        if kind == "create_topic":
            applier.create_topic(op)
        elif kind == "create_note":
            applier.create_note(op, ranks.get(op["ref"], 0))
        elif kind != "skip_episode":
            getattr(applier, kind)(op)
    for path in (
        applier.changed_by_ops
        - set(applier.staged.created_notes)
        - {h for _, h in applier.new_topics.values()}
    ):
        run.write(
            path, set_fields(run.read(path) or "", {"updated": _today()}, order_first=_FM_ORDER)
        )
    budget = engine.manifest.budgets.hub_max_lines
    for path in applier.touched:
        text = run.read(path) or ""
        is_hub = path in applier.hubs or path in {t.hub_path for t in packet.topics.values()}
        if is_hub and len(text.splitlines()) > budget:
            raise InvalidOps(
                f"{path} would exceed hub_max_lines ({budget}); put detail in a child note"
            )
    for handle in sorted(validation.cited | validation.skipped, key=lambda h: int(h[1:])):
        episode = packet.episodes[handle]
        if run.exists(episode.path) and not run.exists(episode.archive_to):
            run.move(episode.path, episode.archive_to)
            applier.staged.archived.append(episode.path)
    extra = [
        {
            "slug": slug,
            "title": applier.topic_meta[slug][0],
            "path": folder,
            "hub": hub,
            "description": applier.topic_meta[slug][1],
            "updated": _today(),
        }
        for slug, (folder, hub) in applier.new_topics.items()
    ]
    current = run.read("AGENTS.md")
    if current is not None:
        block = agents_block(engine, extra)
        regenerated = replace_block(current, block)
        if regenerated != current:
            run.write("AGENTS.md", regenerated)
    return applier.staged
