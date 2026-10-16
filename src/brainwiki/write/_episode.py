"""`write_episode()`: the one function every episode writer goes through (docs/design/write-path.md §2.1)."""

from __future__ import annotations

import hashlib
import os
import re
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

from brainwiki.config import brain_state_dir
from brainwiki.errors import UsageError
from brainwiki.format import (
    CAPTURED,
    INPUTS,
    ORIGINS,
    EpisodeContent,
    episode_path,
    now_iso,
    render_episode,
)
from brainwiki.ids import new_ulid
from brainwiki.index import written
from brainwiki.lifecycle import declare_format
from brainwiki.store import sha256_bytes
from brainwiki.write._secrets import scrub

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_MAX_EPISODE_BYTES = 64 * 1024
_TURNS = re.compile(r"^[0-9]+-[0-9]+$")
_SESSION = re.compile(r"^[A-Za-z0-9._:-]{1,200}$")  # host session ids; also glob-safe
_PLAIN = re.compile(r"^[^\r\n\x00]{1,200}$")


@dataclass
class EpisodeResult:
    id: str
    path: str
    deduped: bool = False
    redacted: list[str] = field(default_factory=list)
    truncated: bool = False

    def to_json(self) -> dict[str, object]:
        return {
            "id": self.id,
            "path": self.path,
            "deduped": self.deduped,
            "redacted": self.redacted,
            "truncated": self.truncated,
        }


def _check(name: str, value: str | None, pattern: re.Pattern[str] = _PLAIN) -> None:
    if value is not None and not pattern.match(value):
        what = (
            "letters, digits, and . _ : - (at most 200)"
            if pattern is _SESSION
            else "a single line of at most 200 characters"
        )
        raise UsageError(f"{name} must be {what}")


def _cap(text: str, limit: int) -> tuple[str, bool]:
    data = text.encode("utf-8")
    if len(data) <= limit:
        return text, False
    cut = data[:limit].decode("utf-8", errors="ignore")
    cut = cut[: cut.rfind("\n")] if "\n" in cut[-2000:] else cut
    return (
        cut.rstrip() + f"\n\n[truncated: {len(data) - len(cut.encode('utf-8'))} bytes cut]\n",
        True,
    )


def _dedupe_marker(engine: Engine, key: str) -> str:
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()[:32]
    directory = brain_state_dir(engine.brain.key) / "dedupe"
    directory.mkdir(parents=True, exist_ok=True)
    return str(directory / digest)


def _existing(engine: Engine, key: str) -> tuple[str, str] | None:
    """An episode already written with this dedupe key: (id, path)."""
    marker = _dedupe_marker(engine, key)
    try:
        with open(marker, encoding="utf-8") as fh:
            ulid, _, rel = fh.read().partition(" ")
        if ulid and engine.store.exists(rel.strip()):
            return ulid, rel.strip()
    except OSError:
        pass
    engine.scan()
    row = engine.db.execute(
        """SELECT fm_id, path FROM nodes WHERE kind IN ('episode', 'archived_episode')
           AND json_extract(props, '$.dedupe') = ? LIMIT 1""",
        (key,),
    ).fetchone()
    return (row["fm_id"], row["path"]) if row else None


def _claim_marker(engine: Engine, key: str, ulid: str, rel: str) -> bool:
    """Atomically claim a dedupe key on this device. False when another writer holds it."""
    marker = _dedupe_marker(engine, key)
    try:
        fd = os.open(marker, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        return False
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        fh.write(f"{ulid} {rel}")
    return True


def write_episode(
    engine: Engine,
    content: EpisodeContent,
    *,
    origin: str,
    inputs: str,
    captured: str,
    agent: str | None = None,
    session: str | None = None,
    origin_turns: str | None = None,
    device: str | None = None,
    topics: list[str] | None = None,
    dedupe: str | None = None,
    source: str | None = None,
) -> EpisodeResult:
    """Write one immutable episode. Provenance comes from the caller's code path, never from text."""
    if origin not in ORIGINS or inputs not in INPUTS or captured not in CAPTURED:
        raise UsageError("invalid provenance values")
    for name, value in (
        ("agent", agent),
        ("device", device),
        ("dedupe", dedupe),
    ):
        _check(name, value)
    _check("session", session, _SESSION)
    _check("origin_turns", origin_turns, _TURNS)
    if not (content.summary.strip() or content.claims):
        raise UsageError("an episode needs a summary or at least one claim")
    manifest = engine.manifest
    if dedupe:
        found = _existing(engine, dedupe)
        if found:
            return EpisodeResult(found[0], found[1], deduped=True)

    hints = [t.strip() for t in topics or [] if t and t.strip()][:5]

    redacted: list[str] = []

    def clean(text: str) -> str:
        cleaned, kinds = scrub(text)
        redacted.extend(kinds)
        return cleaned

    scrubbed = EpisodeContent(
        summary=clean(content.summary),
        claims=[clean(c) for c in content.claims],
        negative_findings=[clean(c) for c in content.negative_findings],
        open_questions=[clean(c) for c in content.open_questions],
    )
    ulid = new_ulid()
    rel = episode_path(manifest.layout.episodes_dir, ulid)
    fields = {
        "id": ulid,
        "type": "episode",
        "agent": agent,
        "session": session,
        "origin_turns": origin_turns,
        "device": device or engine.user.device_name,
        "origin": origin,
        "inputs": inputs,
        "captured": captured,
        "created": now_iso(),
        "topics": hints,
        "dedupe": dedupe,
        "source": source,
    }
    rendered = render_episode(fields, scrubbed)
    head, sep, body = rendered.partition("\n---\n")
    body, truncated = _cap(body, _MAX_EPISODE_BYTES - len(head) - len(sep))
    text = head + sep + body
    if dedupe and not _claim_marker(engine, dedupe, ulid, rel):
        found = _existing(engine, dedupe)
        if found:
            return EpisodeResult(found[0], found[1], deduped=True)
    if engine.store.exists(rel):
        raise UsageError(f"{rel} already exists")
    declare_format(engine)
    engine.store.write_text(rel, text)
    written.mark(engine.brain.key, ulid, sha256_bytes(text.encode("utf-8")))
    engine.scan(paths=[rel])
    return EpisodeResult(ulid, rel, redacted=sorted(set(redacted)), truncated=truncated)
