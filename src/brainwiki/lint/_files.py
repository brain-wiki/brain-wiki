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
    ALIAS_KEYS,
    FIELDS,
    INPUTS,
    ORIGINS,
    RELATION_PROPERTIES,
    STATUSES,
    ParsedDoc,
    add_items,
    as_items,
    canonical_item,
    canonicalize_line,
    claim_value,
    episode_path,
    format_meta,
    is_format1,
    map_status,
    mask_code,
    move_item,
    parse_document,
    parse_rules,
    property_links,
    relation_values_for,
    remove_field,
    replace_item,
    replace_line_matching,
    set_fields,
    to_format2,
)
from brainwiki.ids import claim_id, is_ulid, new_ulid
from brainwiki.lint._catalog import severity
from brainwiki.lint._model import Fix, Problem
from brainwiki.write import find_secrets

if TYPE_CHECKING:
    from brainwiki.engine import Engine
    from brainwiki.index import TopicTree
    from brainwiki.runs import Run

LINT_VERSION = "1"
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
_INJECTION = re.compile(
    r"(?i)\b(?:ignore|disregard|forget)\b.{0,40}\b(?:previous|prior|above|earlier|all)\b.{0,20}"
    r"\b(?:instructions?|prompts?|rules?)\b"
    r"|\byou must now\b|\bfrom now on,? you\b|\bnew (?:system )?instructions?\s*:|\bsystem prompt\b"
)


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


def _line_edit(original: str, new_line: str, hint: int) -> Callable[[str], str]:
    return lambda text: replace_line_matching(text, original, new_line, hint)


def _item_edit(key: str, index: int, value: str) -> Callable[[str], str]:
    return lambda text: replace_item(text, key, index, [value])


def check_file(
    ctx: FileContext, rel: str, kind: str, data: bytes, *, fixes: bool = False
) -> list[Problem]:
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        return [Problem("BW111", rel, 1, "file is not valid UTF-8")]
    return check_text(ctx, rel, kind, text, fixes=fixes)


def check_text(
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


def _check_note(ctx: FileContext, rel: str, kind: str, text: str, fixes: bool) -> list[Problem]:
    doc = parse_document(rel, text)
    problems = _parse_problems(doc, rel)
    fm = doc.fm
    if not doc.frontmatter.error:
        raw_id = fm.get("id")
        if raw_id is None:
            problems.append(
                Problem(
                    "BW103",
                    rel,
                    1,
                    "note has no id",
                    fix=Fix("mint an id", _set({"id": new_ulid()})),
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
        for key, value in doc.frontmatter.raw.items():
            if key.lower() not in RELATION_PROPERTIES or not property_links(value):
                continue
            pairs = relation_values_for(key, value)

            def convert(text: str, key: str = key, pairs: list[tuple[str, str]] = pairs) -> str:
                text = remove_field(text, key)
                for bw_key, item in pairs:
                    text = add_items(text, bw_key, [item])
                return text

            verbs = ", ".join(dict.fromkeys(k for k, _ in pairs))
            problems.append(
                Problem(
                    "BW113",
                    rel,
                    _fm_line(doc, key),
                    f"property {key!r} holds links that read as relations; write them as {verbs}",
                    fix=Fix(f"convert {key} to {verbs}", convert),
                )
            )
    if doc.section_count("claims") > 1:
        problems.append(Problem("BW207", rel, None, "more than one ## Claims section"))
    if doc.section_count("relations") > 1:
        problems.append(Problem("BW311", rel, None, "more than one ## Relations section"))
    lines = text.splitlines()
    seen_ids: Counter[str] = Counter()
    for claim in doc.claims:
        last = lines[claim.last_line - 1]
        if not claim.has_meta:
            new_id = claim_id()
            edit = (
                _item_edit(claim.key, claim.index, claim_value(claim.text, {"id": new_id}))
                if claim.key
                else _line_edit(last, f"{last} {format_meta({'id': new_id})}", claim.last_line)
            )
            problems.append(
                Problem(
                    "BW205",
                    rel,
                    claim.line,
                    "claim has no metadata",
                    fix=Fix("assign a claim id", edit),
                )
            )
            continue
        if claim.id:
            seen_ids[claim.id] += 1
            if seen_ids[claim.id] > 1:
                new_id = claim_id()
                if claim.key:
                    value = claim_value(claim.text, {**claim.meta, "id": new_id})
                    edit = _item_edit(claim.key, claim.index, value)
                else:
                    new_line = last.replace(f"id:{claim.id}", f"id:{new_id}", 1)
                    edit = _line_edit(last, new_line, claim.last_line)
                problems.append(
                    Problem(
                        "BW202",
                        rel,
                        claim.line,
                        f"duplicate claim id {claim.id}",
                        fix=Fix("re-mint the claim id", edit),
                    )
                )
        raw_inputs = claim.meta.get("inputs")
        if raw_inputs is not None and raw_inputs not in INPUTS:
            problems.append(
                Problem(
                    "BW201",
                    rel,
                    claim.line,
                    f"claim inputs {raw_inputs!r} must be local, external, or unknown; "
                    "it reads as unknown",
                )
            )
        if claim.inputs != "local" and _INJECTION.search(claim.text):
            problems.append(
                Problem(
                    "BW702",
                    rel,
                    claim.line,
                    "instruction-like text in an unverified claim; treat it as data",
                )
            )
    for relation in doc.relations:
        if relation.key in ALIAS_KEYS:
            value = str(as_items(fm.get(relation.key))[relation.index])
            moved = canonical_item(relation.written_verb, value)
            problems.append(
                Problem(
                    "BW303",
                    rel,
                    relation.line,
                    f"alias field {relation.key!r}; canonical is 'bw-{relation.verb}'",
                    fix=Fix(
                        f"move to bw-{relation.verb}",
                        lambda t, k=relation.key, v=value, m=moved: move_item(t, k, v, *m),
                    )
                    if moved
                    else None,
                )
            )
        elif relation.is_alias:
            original = lines[relation.line - 1]
            rewritten = canonicalize_line(original)
            problems.append(
                Problem(
                    "BW303",
                    rel,
                    relation.line,
                    f"alias verb {relation.written_verb!r}; canonical is {relation.verb!r}",
                    fix=Fix(
                        f"rewrite as {relation.verb}",
                        _line_edit(original, rewritten, relation.line),
                    )
                    if rewritten
                    else None,
                )
            )
    if is_format1(doc):
        problems.append(
            Problem(
                "BW116",
                rel,
                None,
                "format 1: ## Claims, ## Relations, or unprefixed stage; "
                "move them to bw- frontmatter fields",
                fix=Fix("convert to format 2", to_format2),
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
                    for p in check_text(ctx, path, kind, text)
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
