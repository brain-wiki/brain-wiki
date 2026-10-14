"""Checked edits: validate direct edits of notes, then record them as runs (design doc 05 §2.3).

An agent (or the user) edits a note's file, then runs `brain check` on it. The edit is compared
with the note's last recorded version, kept in the index, and either recorded as a run of kind
`edit` with that version as its pre-image, routed to review, or refused with every problem.
"""

from __future__ import annotations

import difflib
import json
import re
import zlib
from collections import Counter
from dataclasses import dataclass, field
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.errors import Conflict, Forbidden, FormatError, NotFound, UsageError
from brainwiki.format import (
    Claim,
    clean_claim_text,
    format_meta,
    format_value,
    parse_document,
    split,
    strip_meta_comments,
)
from brainwiki.ids import claim_id, is_prefixed
from brainwiki.ids import run_id as new_run_id
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_PROTECTED_FILES = ("rules.md", "log.md", "brain.toml", "AGENTS.md")
_LOSS_WARN = 0.10
_LOSS_ERROR = 0.50
_DIFF_LINES = 60
_SYNC_COPY = re.compile(r"(?i)\.sync-conflict-|\(conflicted copy|\bconflict(ed)?[- ]copy\b")
_JSON_BLOCK = re.compile(r"```json\n(?P<body>.*?)\n```", re.S)


@dataclass
class _Problem:
    path: str
    code: str
    message: str
    severity: str = "error"
    line: int | None = None

    def to_json(self) -> dict[str, Any]:
        return {
            "path": self.path,
            "line": self.line,
            "code": self.code,
            "severity": self.severity,
            "message": self.message,
        }

    def __str__(self) -> str:
        where = f"{self.path}:{self.line}" if self.line else self.path
        return f"{where} {self.severity} {self.code}: {self.message}"


@dataclass
class _Change:
    path: str
    base: bytes | None  # last recorded version; None when recorded as absent
    current: bytes | None  # the file now; None when deleted
    final: bytes | None = None  # what to record: current plus stamps
    added_claims: int = 0
    problems: list[_Problem] = field(default_factory=list)

    @property
    def kind(self) -> str:
        if self.base is None:
            return "created"
        return "deleted" if self.current is None else "changed"


# -- baselines -------------------------------------------------------------------------


def _baseline(engine: Engine, rel: str) -> tuple[bool, bytes | None]:
    """(whether a recorded version exists, its content; None when recorded as absent)."""
    row = engine.db.execute("SELECT sha256, content FROM baselines WHERE path=?", (rel,)).fetchone()
    if row is None:
        return False, None
    return True, zlib.decompress(row["content"]) if row["content"] is not None else None


def _read(engine: Engine, rel: str) -> bytes | None:
    path = engine.store.abspath(rel)
    return path.read_bytes() if path.is_file() else None


def _normalize_path(engine: Engine, raw: str) -> str:
    """A brain-relative path from a relative or absolute one; never outside the brain."""
    text = raw.strip()
    if not text:
        raise UsageError("empty path")
    candidate = Path(text).expanduser()
    root = engine.brain.root
    if candidate.is_absolute():
        try:
            rel = candidate.resolve().relative_to(root)
        except ValueError:
            raise UsageError(f"{raw} is outside the brain at {root}") from None
        text = rel.as_posix()
    text = text.removeprefix("./")
    if text.startswith("../") or "/../" in text or text == "..":
        raise UsageError(f"{raw} is outside the brain")
    return text


def _protected_reason(engine: Engine, rel: str) -> str | None:
    layout = engine.manifest.layout
    if rel in _PROTECTED_FILES:
        return f"{rel} is never edited directly"
    for folder, what in (
        (layout.inbox_dir, "inbox files (episodes and proposals)"),
        (layout.archive_dir, "the archive"),
        (layout.reports_dir, "reports, which brain-wiki regenerates"),
    ):
        if rel.startswith(folder + "/"):
            return f"{what} are never edited directly"
    return None


def _pending_edits(engine: Engine) -> list[dict[str, Any]]:
    """Notes whose file differs from their last recorded version, with diffs."""
    engine.scan()
    rows = engine.db.execute(
        """SELECT b.path, b.sha256 AS base, b.since, f.sha256 AS current
           FROM baselines b LEFT JOIN files f ON f.path = b.path
           WHERE f.sha256 IS NOT b.sha256 ORDER BY b.path"""
    ).fetchall()
    out = []
    for row in rows:
        rel = row["path"]
        _, base = _baseline(engine, rel)
        current = _read(engine, rel)
        if current is None and base is None:
            continue
        change = _Change(rel, base, current)
        out.append(
            {"path": rel, "change": change.kind, "since": row["since"], "diff": _diff(change)}
        )
    return out


# -- checks ----------------------------------------------------------------------------


def _text(data: bytes | None) -> str:
    return data.decode("utf-8", "replace") if data is not None else ""


def _diff(change: _Change, limit: int = _DIFF_LINES) -> str:
    lines = list(
        difflib.unified_diff(
            _text(change.base).splitlines(keepends=True),
            _text(change.final if change.final is not None else change.current).splitlines(
                keepends=True
            ),
            fromfile=f"a/{change.path}" if change.base is not None else "/dev/null",
            tofile=f"b/{change.path}" if change.current is not None else "/dev/null",
        )
    )
    if len(lines) > limit:
        lines = [*lines[:limit], f"… {len(lines) - limit} more diff lines\n"]
    return "".join(lines)


def _words(data: bytes | None) -> list[str]:
    if data is None:
        return []
    doc = parse_document("x.md", _text(data))
    return strip_meta_comments(doc.frontmatter.body).split()


def _loss(change: _Change) -> float:
    """The share of the recorded version's words that the edit removed."""
    before = _words(change.base)
    if not before:
        return 0.0
    after = _words(change.current)
    matcher = difflib.SequenceMatcher(None, before, after, autojunk=False)
    removed = sum(
        i2 - i1 for tag, i1, i2, _, _ in matcher.get_opcodes() if tag in ("delete", "replace")
    )
    return removed / len(before)


def _claims(data: bytes | None) -> list[Claim]:
    return parse_document("x.md", _text(data)).claims if data is not None else []


_SUPERSEDE = "move it to bw-claims-superseded with `by: <new claim id>`, then add the new claim"


def _check_claims(change: _Change) -> list[Claim]:
    """Problems for deleted or reworded claims; returns the claims the edit added."""
    before, after = _claims(change.base), _claims(change.current)
    after_ids = {c.id: c for c in after if c.id}
    after_texts = {clean_claim_text(c.text) for c in after}
    for claim in before:
        text = clean_claim_text(claim.text)
        if claim.id:
            now = after_ids.get(claim.id)
            if now is None:
                change.problems.append(
                    _Problem(
                        change.path,
                        "claim_deleted",
                        f'claim "{_short(text)}" was deleted; supersede it instead ({_SUPERSEDE})',
                        line=claim.line,
                    )
                )
            elif (
                claim.status == "active"
                and now.status == "active"
                and clean_claim_text(now.text) != text
            ):
                change.problems.append(
                    _Problem(
                        change.path,
                        "claim_reworded",
                        f'claim "{_short(text)}" was reworded in place; supersede it instead '
                        f"({_SUPERSEDE}), so its history is kept",
                        line=now.line,
                    )
                )
        elif claim.status == "active" and text not in after_texts:
            change.problems.append(
                _Problem(
                    change.path,
                    "claim_deleted",
                    f'claim "{_short(text)}" was deleted or reworded; supersede it instead',
                    line=claim.line,
                )
            )
    before_ids = {c.id for c in before if c.id}
    before_texts = {clean_claim_text(c.text) for c in before}
    return [
        c
        for c in after
        if (c.id and c.id not in before_ids)
        or (not c.id and clean_claim_text(c.text) not in before_texts)
    ]


def _short(text: str, width: int = 60) -> str:
    return text if len(text) <= width else text[: width - 1] + "…"


def _stamp_claims(data: bytes, claims: list[Claim]) -> bytes:
    """Mark claims an agent added as its own and unverified (05 §3)."""
    from brainwiki.format import claim_value, replace_item

    text = data.decode("utf-8")
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    for claim in claims:
        meta = dict(claim.meta)
        meta.setdefault("id", claim_id())
        meta.setdefault("origin", "agent")
        meta.setdefault("inputs", "unknown")
        meta.setdefault("at", today)
        if claim.key is not None:
            text = replace_item(text, claim.key, claim.index, [claim_value(claim.text, meta)])
            continue
        lines = text.splitlines(keepends=True)  # a format 1 note: the claim is a body line
        idx = claim.last_line - 1
        if not 0 <= idx < len(lines):
            continue
        line = lines[idx]
        ending = "\n" if line.endswith("\n") else ""
        body = re.sub(r"\s*<!--.*?-->\s*$", "", line.rstrip("\n"))
        lines[idx] = f"{body} {format_meta(meta)}{ending}"
        text = "".join(lines)
    return text.encode("utf-8")


def _lint_new(engine: Engine, change: _Change) -> None:
    """File-rule problems the edit introduced (problems the note already had are not its fault)."""
    from brainwiki.lint import lint_text

    if change.current is None:
        return
    before = (
        Counter((p.code, p.message) for p in lint_text(engine, change.path, _text(change.base)))
        if change.base is not None
        else Counter()
    )
    for problem in lint_text(engine, change.path, _text(change.current)):
        key = (problem.code, problem.message)
        if before[key]:
            before[key] -= 1
            continue
        change.problems.append(
            _Problem(
                change.path,
                problem.code,
                problem.message,
                "error" if problem.severity == "error" else "warning",
                problem.line,
            )
        )


def _check_ids(engine: Engine, change: _Change) -> None:
    if change.current is None:
        return
    after_id = parse_document(change.path, _text(change.current)).fm.get("id")
    if change.base is not None:
        before_id = parse_document(change.path, _text(change.base)).fm.get("id")
        if before_id and str(before_id) != str(after_id or ""):
            change.problems.append(
                _Problem(
                    change.path,
                    "id_changed",
                    f"the note's id changed from {before_id}; put it back",
                )
            )
    if after_id:
        clash = engine.db.execute(
            "SELECT path FROM nodes WHERE fm_id=? AND path != ?", (str(after_id), change.path)
        ).fetchone()
        if clash:
            change.problems.append(
                _Problem(
                    change.path, "id_duplicate", f"id {after_id} is already used by {clash['path']}"
                )
            )


def _check_links(engine: Engine, change: _Change) -> None:
    if change.current is None:
        return
    before = _text(change.base)
    for row in engine.db.execute(
        """SELECT DISTINCT e.raw_target, e.line FROM edges e JOIN nodes n ON n.id = e.declared_in
           WHERE n.path = ? AND e.other IS NULL""",
        (change.path,),
    ):
        if row["raw_target"] not in before:
            change.problems.append(
                _Problem(
                    change.path,
                    "link_unresolved",
                    f"[[{row['raw_target']}]] does not resolve to a note",
                    "warning",
                    row["line"],
                )
            )


def _validate(engine: Engine, change: _Change, *, allow_shrink: bool) -> list[Claim]:
    rel = change.path
    if _SYNC_COPY.search(rel.rsplit("/", 1)[-1]):
        change.problems.append(
            _Problem(
                rel, "sync_debris", "this looks like a sync-conflict copy; merge it and delete it"
            )
        )
    added = _check_claims(change)
    loss = _loss(change)
    if loss > _LOSS_ERROR and not allow_shrink:
        change.problems.append(
            _Problem(
                rel,
                "loss",
                f"the edit removed {loss:.0%} of the note's text; restore what was lost, or pass "
                "allow_shrink if the removal is intended",
            )
        )
    elif loss > _LOSS_WARN:
        change.problems.append(
            _Problem(rel, "loss", f"the edit removed {loss:.0%} of the note's text", "warning")
        )
    _check_ids(engine, change)
    _lint_new(engine, change)
    _check_links(engine, change)
    return added


def _policy(engine: Engine, rel: str) -> str:
    from brainwiki.config import AGENT_EDITS

    policy = engine.topics.setting(engine.topics.for_path(rel), "agent_edits") or "allow"
    return policy if policy in AGENT_EDITS else "deny"


# -- the command -----------------------------------------------------------------------


def check_edits(
    engine: Engine,
    paths: list[str] | None = None,
    *,
    allow_shrink: bool = False,
    adopt: bool = False,
) -> dict[str, Any]:
    """Validate and record direct edits of `paths`; without paths, list pending edits.

    Agents need the `edit` capability and follow each topic's `agent_edits` policy. `adopt`
    (owner only) records the edits as the user's even when checks report problems.
    """
    from brainwiki.index import NOTE_KINDS, classify, discovered_topics

    if not paths:
        pending = _pending_edits(engine)
        return {"brain": engine.brain.display_name, "status": "pending", "pending": pending}
    owner = engine.profile.name == "owner"
    if adopt and not owner:
        raise Forbidden("only the user can adopt edits (`brain check --adopt` from a terminal)")
    if not owner and not engine.profile.can("edit"):
        raise Forbidden(
            f"the {engine.profile.name!r} profile may not edit notes; log an episode instead, "
            f'or the user can add "edit" to [agents.{engine.host}] write in brain.toml'
        )
    engine.scan(force=True)
    topics = discovered_topics(engine)
    changes: list[_Change] = []
    problems: list[_Problem] = []
    unchanged: list[str] = []
    for raw in dict.fromkeys(paths):
        rel = _normalize_path(engine, raw)
        reason = _protected_reason(engine, rel)
        if reason:
            problems.append(_Problem(rel, "protected", reason))
            continue
        if classify(engine, rel, topics) not in NOTE_KINDS:
            problems.append(
                _Problem(rel, "not_a_note", "brain_check records edits of notes and hubs only")
            )
            continue
        known, base = _baseline(engine, rel)
        current = _read(engine, rel)
        if not known and current is None:
            raise NotFound(f"no note at {rel}")
        if known and (sha256_bytes(base) if base is not None else None) == (
            sha256_bytes(current) if current is not None else None
        ):
            unchanged.append(rel)
            continue
        changes.append(_Change(rel, base, current))
    review: list[_Change] = []
    for change in changes:
        added = _validate(engine, change, allow_shrink=allow_shrink)
        change.final = change.current
        if change.current is not None and added and not owner:
            change.final = _stamp_claims(change.current, added)
        change.added_claims = len(added)
        if not owner:
            policy = _policy(engine, change.path)
            if policy == "deny":
                change.problems.append(
                    _Problem(
                        change.path,
                        "edits_denied",
                        "this topic does not accept agent edits; restore the file "
                        "(`brain restore`) and log an episode instead",
                    )
                )
            elif policy == "review":
                review.append(change)
        problems += change.problems
    errors = [p for p in problems if p.severity == "error"]
    result: dict[str, Any] = {
        "brain": engine.brain.display_name,
        "unchanged": unchanged,
        "problems": [p.to_json() for p in problems],
    }
    if errors and not adopt:
        result.update(
            status="failed",
            files=[{"path": c.path, "change": c.kind} for c in changes],
        )
        return result
    if not changes:
        result["status"] = "unchanged" if not problems else "failed"
        return result
    recorded = [c for c in changes if c not in review]
    if review:
        result["proposal"] = _propose(engine, review)
    if recorded:
        record = _record(engine, recorded, owner=owner)
        result["run"] = record.run
    result.update(
        status="review" if review and not recorded else "recorded",
        files=[
            {
                "path": c.path,
                "change": c.kind,
                "added_claims": c.added_claims,
                "outcome": "review" if c in review else "recorded",
            }
            for c in changes
        ],
    )
    return result


def _record(engine: Engine, changes: list[_Change], *, owner: bool) -> Any:
    from brainwiki.runs import Run

    paths = [c.path for c in changes]
    run = Run(
        engine,
        "edit",
        agent=None if owner else engine.host,
        summary=f"checked edit of {', '.join(paths[:3])}" + (" …" if len(paths) > 3 else ""),
    )
    for change in changes:
        run.adopt(change.path, change.base, change.final)
    return run.commit(subject=f"brain: edit {', '.join(paths[:3])}")


def restore(engine: Engine, raw: str) -> dict[str, Any]:
    """Put back a note's last recorded version. The discarded file is kept in the state dir."""
    from brainwiki.config import brain_state_dir

    engine.scan(force=True)
    rel = _normalize_path(engine, raw)
    known, base = _baseline(engine, rel)
    if not known:
        raise NotFound(f"no recorded version of {rel}")
    current = _read(engine, rel)
    if current == base:
        return {"path": rel, "status": "unchanged"}
    saved = None
    if current is not None:
        stamp = datetime.now(UTC).strftime("%Y%m%dT%H%M%SZ")
        target = brain_state_dir(engine.brain.key) / "restored" / stamp / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(current)
        saved = str(target)
    if base is None:
        engine.store.delete(rel)
    else:
        engine.store.write_bytes(rel, base)
    engine.scan(paths=[rel])
    return {"path": rel, "status": "restored", "saved": saved, "deleted": base is None}


# -- review ----------------------------------------------------------------------------


def _propose(engine: Engine, changes: list[_Change]) -> str:
    """Stage edits to topics with `agent_edits = "review"` as a proposal; restore the files."""
    from brainwiki.consolidate import proposal_path
    from brainwiki.format import now_iso

    run = new_run_id()
    rel = proposal_path(engine, run)
    head = {"type": "edit-proposal", "run": run, "agent": engine.host, "created": now_iso()}
    payload = {
        "files": [
            {
                "path": c.path,
                "base": sha256_bytes(c.base) if c.base is not None else None,
                "content": _text(c.final) if c.final is not None else None,
            }
            for c in changes
        ]
    }
    lines = ["---", *[f"{k}: {format_value(v)}" for k, v in head.items() if v], "---"]
    lines += [f"# Edit proposal {run}", "", "Review needed because:", ""]
    lines += sorted({f"- topic of {c.path} requires review for agent edits" for c in changes})
    lines += ["", f"Accept: `brain review accept {run}` · Reject: `brain review reject {run}`", ""]
    lines += ["## Diff", "", "```diff", *[_diff(c, 400).rstrip("\n") for c in changes], "```", ""]
    lines += ["## Edit", "", "```json", json.dumps(payload, ensure_ascii=False), "```", ""]
    engine.store.write_text(rel, "\n".join(lines))
    for change in changes:
        if change.base is None:
            if engine.store.exists(change.path):
                engine.store.delete(change.path)
        else:
            engine.store.write_bytes(change.path, change.base)
    engine.scan(paths=[c.path for c in changes] + [rel])
    return rel


def is_edit_proposal(engine: Engine, run: str) -> bool:
    from brainwiki.consolidate import proposal_path

    rel = proposal_path(engine, run)
    if not is_prefixed(run, "run-") or not engine.store.exists(rel):
        return False
    return split(engine.store.read_text(rel)).data.get("type") == "edit-proposal"


def _load(engine: Engine, run: str) -> tuple[str, dict[str, Any], str | None]:
    from brainwiki.consolidate import proposal_path

    rel = proposal_path(engine, run)
    text = engine.store.read_text(rel)
    blocks = list(_JSON_BLOCK.finditer(text))
    try:
        payload = json.loads(blocks[-1].group("body"))
        payload["files"]  # noqa: B018 - validate shape
    except (IndexError, ValueError, KeyError, TypeError) as exc:
        raise FormatError(f"{rel}: the edit block is not valid ({exc}); nothing applied") from exc
    agent = split(text).data.get("agent")
    return rel, payload, str(agent) if agent else None


def accept_proposal(engine: Engine, run: str) -> Any:
    from brainwiki.runs import Run

    rel, payload, agent = _load(engine, run)
    record_run = Run(engine, "edit", agent=agent, backend="review", summary=f"accepted {run}")
    for item in payload["files"]:
        path, base, content = item["path"], item.get("base"), item.get("content")
        if engine.store.sha(path) != base:
            raise Conflict(f"{path} changed since the proposal; ask the agent to edit it again")
        if content is None:
            record_run.delete(path)
        else:
            record_run.write(path, content)
    record_run.delete(rel)
    return record_run.commit(
        log_lines=[f"- accepted edit proposal {run} (agent: {agent or 'unknown'})"]
    )


def reject_proposal(engine: Engine, run: str) -> Any:
    from brainwiki.runs import Run

    rel, _, _ = _load(engine, run)
    record_run = Run(engine, "review-reject", summary=f"rejected proposal {run}")
    record_run.delete(rel)
    return record_run.commit(log_lines=[f"- rejected edit proposal {run}"])


def format_check_text(result: dict[str, Any]) -> str:
    status = result["status"]
    if status == "pending":
        items = result["pending"]
        if not items:
            return "No pending edits: every note matches its last recorded version."
        lines = [f"{len(items)} pending edit(s):"]
        for item in items:
            lines += [f"- {item['path']} ({item['change']})", item["diff"].rstrip("\n")]
        lines.append("Record with `brain check PATH`, or put back with `brain restore PATH`.")
        return "\n".join(lines)
    lines = []
    if status == "recorded":
        lines.append(f"Recorded as {result['run']} (undo: brain undo {result['run']}).")
    elif status == "review":
        lines.append(f"Sent to the user for review: {result['proposal']}. The files were restored.")
    elif status == "unchanged":
        lines.append("Nothing to record: the files match their last recorded version.")
    else:
        lines.append("Not recorded. Fix these problems and check again, or `brain restore PATH`:")
    if result.get("proposal") and status == "recorded":
        lines.append(f"Some edits went to review: {result['proposal']}; those files were restored.")
    for item in result.get("files") or []:
        if item.get("added_claims"):
            lines.append(
                f"- {item['path']}: {item['added_claims']} new claim(s) marked unverified (origin agent)."
            )
    for problem in result.get("problems") or []:
        where = f"{problem['path']}:{problem['line']}" if problem["line"] else problem["path"]
        lines.append(f"- {where} {problem['severity']} {problem['code']}: {problem['message']}")
    return "\n".join(lines)
