"""Deterministic checks on proposed ops (design doc 05 §7.1, V1–V10; V11 runs in apply)."""

from __future__ import annotations

import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any

from brainwiki.config.manifest import SLUG_RE, Profile
from brainwiki.consolidate.packet import Packet
from brainwiki.consolidate.schema import schema_errors
from brainwiki.format.relations import CANONICAL, canonical_verb

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_SRC = re.compile(r"^(E[0-9]+)#L([0-9]+)(?:-L([0-9]+))?$")
_ANCHOR = re.compile(
    r"https?://\S+|`[^`]+`|\[\[[^\]]+\]\]|\b\d{4}-\d{2}-\d{2}\b|\bv?\d+(?:\.\d+)+\b|\b\d+(?:[.,]\d+)?\s?(?:%|ms|s|kb|mb|gb|x)?\b",
    re.IGNORECASE,
)
SOURCE_OPS = ("add_claim", "merge_claim", "supersede_claim", "retract_claim", "add_relation")


@dataclass
class Validation:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    review: list[str] = field(default_factory=list)
    cited: set[str] = field(default_factory=set)
    skipped: set[str] = field(default_factory=set)
    pending: list[str] = field(default_factory=list)  # episode handles neither cited nor skipped

    @property
    def ok(self) -> bool:
        return not self.errors

    def to_json(self) -> dict[str, Any]:
        return {
            "errors": self.errors,
            "warnings": self.warnings,
            "review": self.review,
            "pending": self.pending,
        }


def anchors(text: str) -> set[str]:
    return {m.group(0).lower().strip() for m in _ANCHOR.finditer(text)}


def validate(engine: Engine, packet: Packet, payload: Any, profile: Profile) -> Validation:
    result = Validation()
    result.errors = schema_errors(payload)
    if result.errors:
        return result
    ops: list[dict[str, Any]] = payload["ops"]
    manifest = engine.manifest
    created_topics: dict[str, str] = {}  # slug -> folder; a sub-topic goes inside its parent
    for op in ops:
        if op["op"] == "create_topic":
            parent = op.get("parent")
            base = (
                packet.topics[parent].path
                if parent in packet.topics
                else created_topics.get(parent or "", manifest.layout.topics_dir)
            )
            created_topics[op["slug"]] = f"{base}/{op['slug']}"
    new_refs = Counter(op["ref"] for op in ops if op["op"] == "create_note")
    for ref, count in new_refs.items():
        if count > 1:
            result.errors.append(f"{ref} is created more than once")
    touched_claims: Counter[str] = Counter()
    superseded_per_note: Counter[str] = Counter()
    relations: list[tuple[str, str, str]] = []

    def err(index: int, message: str) -> None:
        result.errors.append(f"ops[{index}] ({ops[index]['op']}): {message}")

    def note_rank_and_topic(ref: str) -> tuple[int, str | None] | None:
        if ref in packet.notes:
            note = packet.notes[ref]
            return note.privacy_rank, note.topic
        if ref.startswith("new:") and ref in new_refs:
            topic = ref[4:].split("/", 1)[0]
            topic_ref = packet.topics.get(topic)
            return (topic_ref.privacy_rank if topic_ref else manifest.privacy_rank(None)), topic
        return None

    def sources(index: int, srcs: list[str]) -> int:
        """V3; returns the most restrictive privacy rank among the cited episodes."""
        rank = 0
        for src in srcs:
            match = _SRC.match(src)
            assert match is not None  # the schema already checked the pattern
            handle, start = match.group(1), int(match.group(2))
            end = int(match.group(3) or start)
            episode = packet.episodes.get(handle)
            if episode is None:
                err(index, f"source {src}: no episode {handle} in this packet")
                continue
            if not (episode.first_line <= start <= end <= episode.last_line):
                err(
                    index,
                    f"source {src}: lines must be within {episode.first_line}-{episode.last_line}",
                )
                continue
            result.cited.add(handle)
            rank = max(rank, episode.privacy_rank)
            if episode.taint != "false" and manifest.consolidate.review_tainted:
                result.review.append(f"{handle} is unverified and review_tainted is on")
        return rank

    def check_text(index: int, text: str, what: str = "claim text") -> None:
        if "\n" in text or "\r" in text:
            err(index, f"{what} must be one line")
        if "<!--" in text or "-->" in text:
            err(index, f"{what} must not contain <!-- or -->")

    def target_ok(index: int, ref: str, rank: int) -> None:
        info = note_rank_and_topic(ref)
        if info is None:
            err(index, f"{ref} is neither a note in the packet nor created in this batch")
            return
        note_rank, topic = info
        if not engine.topic_allowed(topic, profile):
            err(index, f"topic {topic!r} is outside this backend's profile")
        if rank > note_rank and not ref.startswith("new:"):
            err(
                index,
                f"would copy {manifest.privacy.levels[rank]} episode content into a "
                f"{manifest.privacy.levels[note_rank]} note; cite it in a note at that level instead",
            )
        if topic and packet.topics.get(topic) and packet.topics[topic].review == "always":
            result.review.append(f"topic {topic} requires review")

    created_earlier: set[str] = set()
    for index, op in enumerate(ops):
        kind = op["op"]
        if kind in ("add_claim", "supersede_claim"):
            check_text(index, op["text"])
        if kind == "create_topic":
            slug = op["slug"]
            parent = op.get("parent")
            if "*" not in profile.topics:
                err(index, "creating topics needs a profile with topics = ['*']")
            if parent and parent not in packet.topics and parent not in created_earlier:
                err(
                    index, f"unknown parent topic {parent!r}; create a parent before its sub-topics"
                )
            created_earlier.add(slug)
            if (
                slug in packet.topics
                or slug in engine.topics.paths
                or engine.store.exists(created_topics[slug])
            ):
                err(index, f"topic {slug!r} already exists")
            if not SLUG_RE.match(slug):
                err(index, f"invalid slug {slug!r}")
            check_text(index, op["title"], "title")
        elif kind == "create_note":
            topic, slug = op["ref"][4:].split("/", 1)
            if topic not in packet.topics and topic not in created_topics:
                err(
                    index,
                    f"unknown topic {topic!r}; create it first with create_topic or use an existing one",
                )
            elif not engine.topic_allowed(topic, profile):
                err(index, f"topic {topic!r} is outside this backend's profile")
            folder = (
                packet.topics[topic].path
                if topic in packet.topics
                else created_topics.get(topic, f"{manifest.layout.topics_dir}/{topic}")
            )
            if engine.store.exists(f"{folder}/{slug}.md"):
                err(index, f"{folder}/{slug}.md already exists; add claims to it instead")
            check_text(index, op["title"], "title")
            for claim in op["claims"]:
                check_text(index, claim["text"])
                sources(index, claim["sources"])
        elif kind == "add_claim":
            target_ok(index, op["note"], sources(index, op["sources"]))
        elif kind in ("merge_claim", "supersede_claim", "retract_claim"):
            claim = packet.claims.get(op["claim"])
            if claim is None:
                err(index, f"no claim {op['claim']} in this packet")
                continue
            touched_claims[op["claim"]] += 1
            if kind != "merge_claim" and touched_claims[op["claim"]] > 1:
                err(index, f"{op['claim']} is changed more than once")
            target_ok(index, claim.note, sources(index, op["sources"]))
            if kind != "merge_claim":
                superseded_per_note[claim.note] += 1
            if kind == "supersede_claim":
                lost = anchors(claim.text) - anchors(op["text"])
                if lost:
                    result.warnings.append(
                        f"ops[{index}]: the new text of {op['claim']} drops {', '.join(sorted(lost))}"
                    )
        elif kind == "add_relation":
            verb, _ = canonical_verb(op["verb"])
            if verb is None:
                err(
                    index,
                    f"unknown relation verb {op['verb']!r}; use one of {', '.join(CANONICAL)}",
                )
                continue
            if op["from"] == op["to"]:
                err(index, "a note cannot relate to itself")
            rank = sources(index, op["sources"]) if op.get("sources") else 0
            target_ok(index, op["from"], rank)
            if note_rank_and_topic(op["to"]) is None:
                err(index, f"{op['to']} is neither a note in the packet nor created in this batch")
            for text in (op.get("qualifier") or "", op.get("comment") or ""):
                check_text(index, text, "qualifier and comment")
            relations.append((op["from"], verb, op["to"]))
        elif kind == "skip_episode":
            if op["episode"] not in packet.episodes:
                err(index, f"no episode {op['episode']} in this packet")
            result.skipped.add(op["episode"])

    _supersession_cycles(engine, packet, relations, result)
    for note_handle, changed in superseded_per_note.items():
        before = next(
            (c.active_claims_in_note for c in packet.claims.values() if c.note == note_handle), 0
        )
        if before >= 4 and changed / before > manifest.consolidate.max_supersede_ratio:
            result.review.append(
                f"{packet.notes[note_handle].path}: {changed} of {before} active claims superseded or retracted"
            )
    if manifest.consolidate.review == "always":
        result.review.append("this brain reviews every consolidation")
    result.pending = sorted(
        set(packet.episodes) - result.cited - result.skipped, key=lambda h: int(h[1:])
    )
    result.review = list(dict.fromkeys(result.review))
    return result


def _supersession_cycles(
    engine: Engine, packet: Packet, relations: list[tuple[str, str, str]], result: Validation
) -> None:
    """V5: new supersedes edges must not close a cycle with existing ones."""
    graph: dict[str, set[str]] = defaultdict(set)

    def node(ref: str) -> str:
        return packet.notes[ref].id if ref in packet.notes else ref

    new_edges = []
    for src, verb, dst in relations:
        if verb == "supersedes":
            new_edges.append((node(src), node(dst)))
        elif verb == "superseded_by":
            new_edges.append((node(dst), node(src)))
    if not new_edges:
        return
    for row in engine.db.execute(
        "SELECT src, dst FROM edges WHERE rel = 'supersedes' AND src IS NOT NULL AND dst IS NOT NULL"
    ):
        graph[row["src"]].add(row["dst"])
    for a, b in new_edges:
        graph[a].add(b)
    for a, b in new_edges:
        stack, seen = [b], set()
        while stack:
            current = stack.pop()
            if current == a:
                result.errors.append("supersedes relations would form a cycle")
                return
            if current in seen:
                continue
            seen.add(current)
            stack.extend(graph.get(current, ()))
