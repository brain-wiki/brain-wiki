"""File-local lint rules: everything decidable from one file's content plus the manifest.

Results depend only on (content, manifest), so the runner caches them by content hash.
"""

from __future__ import annotations

import re
from collections import Counter
from collections.abc import Callable
from dataclasses import dataclass
from typing import TYPE_CHECKING

from brainwiki.config import Manifest
from brainwiki.format import (
    FIELDS,
    INPUTS,
    NOTE_FIELDS,
    ORIGINS,
    SOURCES,
    STATUSES,
    SUPERSEDED_BY,
    ParsedDoc,
    episode_path,
    legacy,
    map_status,
    mark_superseded,
    mask_code,
    parse_document,
    parse_rules,
    set_fields,
    to_format3,
)
from brainwiki.ids import is_ulid, new_ulid
from brainwiki.lint._catalog import severity
from brainwiki.lint._model import Fix, Problem
from brainwiki.write import find_secrets

if TYPE_CHECKING:
    from brainwiki.engine import Engine
    from brainwiki.index import TopicTree
    from brainwiki.runs import Run

LINT_VERSION = "2"
_NOTE_KINDS = ("note", "hub")
_EPISODE_KINDS = ("episode", "archived_episode")
_SECRET_KINDS = (
    "note",
    "hub",
    "episode",
    "archived_episode",
    "agent_file",
    "rules",
    "agents_md",
    "proposal",
)
_MARKER_KINDS = (*_NOTE_KINDS, "rules", "agents_md", "log")

_CONFLICT_MARKER = re.compile(r"^(?:<{7}|>{7})(?: |$)|^={7}$")
_ONE_LINK = re.compile(r"^\[\[[^\[\]\n]+\]\]$")
_URL = re.compile(r"^[a-z][a-z0-9+.-]*://\S+$", re.IGNORECASE)


@dataclass
class FileContext:
    manifest: Manifest
    tree: TopicTree

    @property
    def topics(self) -> dict[str, str]:  # slug -> folder
        return self.tree.paths

    @classmethod
    def for_engine(cls, engine: Engine) -> FileContext:
        return cls(engine.manifest, engine.topics)


def _fm_line(doc: ParsedDoc, key: str) -> int:
    """The line of `key` in the frontmatter, or of its `bw-` field (`stage` -> `bw-stage`)."""
    if not doc.frontmatter.present:
        return 1
    lines = doc.text.splitlines()
    for name in (key, FIELDS.get(key)):
        if name is None:
            continue
        pattern = re.compile(rf"^{re.escape(name)}\s*:")
        for idx in range(1, doc.frontmatter.end_line - 1):
            if pattern.match(lines[idx]):
                return idx + 1
    return 1


def _set(values: dict[str, object]) -> Callable[[str], str]:
    return lambda text: set_fields(text, values, order_first=("id", "type", "title"))


def check_file(
    ctx: FileContext, rel: str, kind: str, data: bytes, *, fixes: bool = False
) -> list[Problem]:
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        return [Problem("BW111", rel, 1, "file is not valid UTF-8")]
    return _check_text(ctx, rel, kind, text, fixes=fixes)


def _check_text(
    ctx: FileContext, rel: str, kind: str, text: str, *, fixes: bool = False
) -> list[Problem]:
    problems: list[Problem] = []
    if kind in _NOTE_KINDS:
        problems += _check_note(ctx, rel, kind, text, fixes)
    elif kind in _EPISODE_KINDS:
        problems += _check_episode(ctx, rel, kind, text, fixes)
    elif kind == "rules":
        problems += _check_rules(ctx, rel, text)
    if kind in _MARKER_KINDS:
        problems += _conflict_markers(rel, text)
    if kind in _SECRET_KINDS:
        for hit in find_secrets(text):
            problems.append(
                Problem(
                    "BW701",
                    rel,
                    hit.line,
                    f"looks like a {hit.kind}; remove it and rotate the secret (git history may still hold it)",
                )
            )
    if not fixes:
        for p in problems:
            p.fix = None
    return problems


def _conflict_markers(rel: str, text: str) -> list[Problem]:
    for idx, line in enumerate(mask_code(text.splitlines()), start=1):
        if _CONFLICT_MARKER.match(line):
            return [
                Problem("BW114", rel, idx, "leftover merge conflict markers; resolve them by hand")
            ]
    return []


def _parse_problems(doc: ParsedDoc, rel: str) -> list[Problem]:
    out = []
    for line, code, message in doc.problems:
        out.append(Problem(code, rel, line, message))
    for key in doc.frontmatter.nested_keys:
        out.append(
            Problem(
                "BW102", rel, _fm_line(doc, key), f"frontmatter key {key!r} holds a nested mapping"
            )
        )
    return out


def _hub_names(ctx: FileContext, rel: str, kind: str) -> frozenset[str]:
    """Link targets naming the hub a note belongs to (a hub's: its parent topic's hub)."""
    from brainwiki.index import hub_name

    tree = ctx.tree
    slug = tree.for_path(rel)
    if kind == "hub" and slug:
        slug = tree.parent(slug)
    if not slug or slug not in tree.paths:
        return frozenset()
    folder = tree.paths[slug]
    hub = f"{folder}/{hub_name(ctx.manifest.layout, folder)}"
    return frozenset({hub.removesuffix(".md"), folder.rsplit("/", 1)[-1], slug})


def _check_note(ctx: FileContext, rel: str, kind: str, text: str, fixes: bool) -> list[Problem]:
    doc = parse_document(rel, text)
    problems = _parse_problems(doc, rel)
    if doc.frontmatter.error:
        return problems
    fm, raw = doc.fm, doc.frontmatter.raw
    raw_id = fm.get("id")
    if raw_id is None:
        minted = new_ulid()  # in the message too, so an agent can add the line itself
        problems.append(
            Problem(
                "BW103",
                rel,
                1,
                f"note has no id; add `id: {minted}` to its frontmatter",
                fix=Fix("mint an id", _set({"id": minted})),
            )
        )
    elif not is_ulid(str(raw_id)):
        problems.append(
            Problem(
                "BW104",
                rel,
                _fm_line(doc, "id"),
                f"id {raw_id!r} is not a ULID",
                fix=Fix("re-mint the id", _set({"id": new_ulid()})),
            )
        )
    status = fm.get("status")
    if status is not None and str(status) not in STATUSES:
        new_status, stage = map_status(str(status))
        values: dict[str, object] = {"status": new_status}
        if stage and fm.get("stage") is None:
            values[FIELDS["stage"]] = stage
        problems.append(
            Problem(
                "BW106",
                rel,
                _fm_line(doc, "status"),
                f"status {status!r} is not active, superseded, or archived; it belongs in stage",
                fix=Fix(f"status: {new_status}, stage: {stage}", _set(values)),
            )
        )
    found = legacy(text)
    if found:
        what = [k for k, _ in found.fields] + [f"## {n.title()}" for n, _ in found.sections]
        what += ["unprefixed stage"] if found.stage else []
        layout = ctx.manifest.layout
        hubs = _hub_names(ctx, rel, kind)
        line = (found.fields or found.sections or [("", None)])[0][1]
        problems.append(
            Problem(
                "BW117",
                rel,
                line,
                f"format 1 or 2 ({', '.join(what)}): facts and relations belong in the body "
                "and frontmatter holds metadata only; `brain lint --fix` converts the note",
                fix=Fix(
                    "convert to format 3",
                    lambda t: to_format3(
                        t, hub_names=hubs, inbox=layout.inbox_dir, archive=layout.archive_dir
                    ),
                ),
            )
        )
        for target in dict.fromkeys(found.supersedes):
            problems.append(
                Problem(
                    "BW117",
                    rel,
                    line,
                    f"supersedes [[{target}]]: that note gets status: superseded and "
                    f"{SUPERSEDED_BY} linking here",
                    fix=Fix(
                        "mark the replaced note superseded",
                        target_link=target,
                        link_edit=mark_superseded,
                    ),
                )
            )
    legacy_keys = {k for k, _ in found.fields}
    for key in raw:
        if key.startswith("bw-") and key not in NOTE_FIELDS and key not in legacy_keys:
            problems.append(
                Problem(
                    "BW118",
                    rel,
                    _fm_line(doc, key),
                    f"unknown field {key!r}; a note's brain-wiki fields are "
                    f"{', '.join(sorted(NOTE_FIELDS))}",
                )
            )
    if SUPERSEDED_BY in raw:
        value = raw[SUPERSEDED_BY]
        if not (isinstance(value, str) and _ONE_LINK.match(value.strip())):
            problems.append(
                Problem(
                    "BW119",
                    rel,
                    _fm_line(doc, SUPERSEDED_BY),
                    f'{SUPERSEDED_BY} must be one link, like "[[newer note]]"',
                )
            )
        elif str(status or "active") != "superseded":
            problems.append(
                Problem(
                    "BW119",
                    rel,
                    _fm_line(doc, SUPERSEDED_BY),
                    f"{SUPERSEDED_BY} is set but status is {str(status or 'active')!r}",
                    fix=Fix("set status: superseded", _set({"status": "superseded"})),
                )
            )
    if SOURCES in raw:
        value = raw[SOURCES]
        items = value if isinstance(value, list) else [value]
        bad = [
            v
            for v in items
            if not (isinstance(v, str) and (_ONE_LINK.match(v.strip()) or _URL.match(v.strip())))
        ]
        if bad:
            problems.append(
                Problem(
                    "BW120",
                    rel,
                    _fm_line(doc, SOURCES),
                    f'{SOURCES} items must be links or URLs, like "[[archive/episodes/…]]" '
                    f"or https://…; not {bad[0]!r}",
                )
            )
    return problems


def _check_episode(ctx: FileContext, rel: str, kind: str, text: str, fixes: bool) -> list[Problem]:
    doc = parse_document(rel, text)
    problems = _parse_problems(doc, rel)
    layout = ctx.manifest.layout
    if doc.frontmatter.error or rel.startswith(layout.archive_dir + "/agents/"):
        return problems  # archived host memory files keep their own format
    fm = doc.fm
    base = layout.episodes_dir if kind == "episode" else layout.archive_episodes_dir
    raw_id = fm.get("id")
    values: dict[str, object] = {}
    missing = []
    if raw_id is None:
        missing.append("id")
        values["id"] = new_ulid()
    if str(fm.get("origin")) not in ORIGINS:
        missing.append("origin")
        values["origin"] = "agent"
    if str(fm.get("inputs")) not in INPUTS:
        missing.append("inputs")
        values["inputs"] = "unknown"
    if missing:
        move_to = episode_path(base, str(values["id"])) if "id" in values else None
        legacy = doc.frontmatter.legacy_fields
        written = {k if k == "id" or k in legacy else FIELDS[k]: v for k, v in values.items()}
        problems.append(
            Problem(
                "BW503",
                rel,
                1,
                f"episode lacks or has invalid provenance fields: {', '.join(missing)}",
                fix=Fix("fill provenance fields", _set(written), move_to=move_to),
            )
        )
    if raw_id is not None:
        if not is_ulid(str(raw_id)):
            problems.append(
                Problem("BW502", rel, _fm_line(doc, "id"), f"episode id {raw_id!r} is not a ULID")
            )
        else:
            expected = episode_path(base, str(raw_id))
            if rel != expected:
                problems.append(
                    Problem(
                        "BW502",
                        rel,
                        None,
                        f"episode path should be {expected}",
                        fix=Fix(f"move to {expected}", move_to=expected),
                    )
                )
    return problems


def _check_rules(ctx: FileContext, rel: str, text: str) -> list[Problem]:
    budgets = ctx.manifest.budgets
    problems: list[Problem] = []
    line_count = len(text.splitlines())
    if line_count > budgets.rules_max_lines or len(text) > budgets.rules_max_chars:
        problems.append(
            Problem(
                "BW402",
                rel,
                None,
                f"rules.md has {line_count} lines and {len(text)} characters "
                f"(budget {budgets.rules_max_lines} lines, {budgets.rules_max_chars} characters)",
            )
        )
    rules, malformed = parse_rules(text)
    for line, message in malformed:
        problems.append(Problem("BW603", rel, line, message))
    bad_lines = {line for line, _ in malformed}
    for rule in rules:
        if rule.line in bad_lines:
            continue
        if not rule.meta.get("quote"):
            problems.append(
                Problem("BW601", rel, rule.line, "rule has no quote (the user's own words)")
            )
        if rule.meta.get("origin") != "owner":
            problems.append(
                Problem(
                    "BW602",
                    rel,
                    rule.line,
                    f"rule origin is {rule.meta.get('origin')!r}, not 'owner'",
                )
            )
    return problems


_GATED_KINDS = (*_NOTE_KINDS, *_EPISODE_KINDS, "rules")


def run_gate(engine: Engine) -> Callable[[Run], list[Problem]]:
    """The V11 check for runs: strict errors a change introduces in the files it touches.

    Errors already present before the change do not block it, so one broken note written by
    hand cannot stall every later run that touches it.
    """
    from brainwiki.index import classify

    ctx = FileContext.for_engine(engine)

    def check(run: Run) -> list[Problem]:
        introduced: list[Problem] = []
        for path, before, after in run.text_changes():
            if after is None:
                continue
            kind = classify(engine, path, ctx.topics)
            if kind not in _GATED_KINDS:
                continue

            def errors(text: str | None, path: str = path, kind: str = kind) -> list[Problem]:
                if text is None:
                    return []
                return [
                    p
                    for p in _check_text(ctx, path, kind, text)
                    if severity(p.code, "strict") == "error"
                ]

            old = Counter((p.code, p.message) for p in errors(before))
            for problem in errors(after):
                key = (problem.code, problem.message)
                if old[key]:
                    old[key] -= 1
                else:
                    introduced.append(problem)
        return introduced

    return check
