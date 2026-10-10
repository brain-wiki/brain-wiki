"""File-local lint rules: everything decidable from one file's content plus the manifest.

Results depend only on (content, manifest), so the runner caches them by content hash.
"""

from __future__ import annotations

import re
from collections import Counter
from collections.abc import Callable
from dataclasses import dataclass
from typing import TYPE_CHECKING

from brainwiki.config.manifest import Manifest
from brainwiki.format.document import ParsedDoc, parse_document
from brainwiki.format.edit import append_to_section, replace_line_matching
from brainwiki.format.episode import ORIGINS, TAINTS, episode_path
from brainwiki.format.frontmatter import remove_field, set_fields
from brainwiki.format.links import mask_code
from brainwiki.format.meta import format_meta
from brainwiki.format.normalize import (
    RELATION_PROPERTIES,
    STATUSES,
    map_status,
    property_links,
    relation_lines_for,
)
from brainwiki.format.relations import canonicalize_line
from brainwiki.format.rules import parse_rules
from brainwiki.ids import claim_id, is_ulid, new_ulid
from brainwiki.lint.catalog import severity
from brainwiki.lint.model import Fix, Problem
from brainwiki.write.secrets import find_secrets

if TYPE_CHECKING:
    from brainwiki.engine import Engine
    from brainwiki.runs import Run

LINT_VERSION = "1"
NOTE_KINDS = ("note", "hub")
EPISODE_KINDS = ("episode", "archived_episode")
SECRET_KINDS = (
    "note",
    "hub",
    "episode",
    "archived_episode",
    "agent_file",
    "rules",
    "agents_md",
    "proposal",
)
MARKER_KINDS = (*NOTE_KINDS, "rules", "agents_md", "log")

_CONFLICT_MARKER = re.compile(r"^(?:<{7}|>{7})(?: |$)|^={7}$")
_INJECTION = re.compile(
    r"(?i)\b(?:ignore|disregard|forget)\b.{0,40}\b(?:previous|prior|above|earlier|all)\b.{0,20}"
    r"\b(?:instructions?|prompts?|rules?)\b"
    r"|\byou must now\b|\bfrom now on,? you\b|\bnew (?:system )?instructions?\s*:|\bsystem prompt\b"
)


@dataclass
class FileContext:
    manifest: Manifest
    topics: dict[str, str]  # slug -> folder

    @classmethod
    def for_engine(cls, engine: Engine) -> FileContext:
        from brainwiki.index.scanner import discovered_topics

        return cls(engine.manifest, discovered_topics(engine))

    def topic_privacy(self, rel: str) -> str | None:
        slug = self.manifest.topic_for_path(rel, self.topics)
        topic = self.manifest.topics.get(slug) if slug else None
        return topic.privacy if topic else None


def _fm_line(doc: ParsedDoc, key: str) -> int:
    if not doc.frontmatter.present:
        return 1
    lines = doc.text.splitlines()
    pattern = re.compile(rf"^{re.escape(key)}\s*:")
    for idx in range(1, doc.frontmatter.end_line - 1):
        if pattern.match(lines[idx]):
            return idx + 1
    return 1


def _set(values: dict[str, object]) -> Callable[[str], str]:
    return lambda text: set_fields(text, values, order_first=("id", "type", "title"))


def _line_edit(original: str, new_line: str, hint: int) -> Callable[[str], str]:
    return lambda text: replace_line_matching(text, original, new_line, hint)


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
    if kind in NOTE_KINDS:
        problems += _check_note(ctx, rel, kind, text, fixes)
    elif kind in EPISODE_KINDS:
        problems += _check_episode(ctx, rel, kind, text, fixes)
    elif kind == "rules":
        problems += _check_rules(ctx, rel, text)
    if kind in MARKER_KINDS:
        problems += _conflict_markers(rel, text)
    if kind in SECRET_KINDS:
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
    manifest = ctx.manifest
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
                values["stage"] = stage
            problems.append(
                Problem(
                    "BW106",
                    rel,
                    _fm_line(doc, "status"),
                    f"status {status!r} is not active, superseded, or archived; it belongs in stage",
                    fix=Fix(f"status: {new_status}, stage: {stage}", _set(values)),
                )
            )
        privacy = fm.get("privacy")
        if privacy is not None:
            topic_level = ctx.topic_privacy(rel)
            if not isinstance(privacy, str) or not manifest.is_privacy_level(privacy):
                problems.append(
                    Problem(
                        "BW107",
                        rel,
                        _fm_line(doc, "privacy"),
                        f"privacy {privacy!r} is not a declared level",
                    )
                )
            elif topic_level and manifest.privacy_rank(privacy) < manifest.privacy_rank(
                topic_level
            ):
                problems.append(
                    Problem(
                        "BW108",
                        rel,
                        _fm_line(doc, "privacy"),
                        f"privacy {privacy!r} is lower than the topic's {topic_level!r}",
                        fix=Fix(f"privacy: {topic_level}", _set({"privacy": topic_level})),
                    )
                )
        for key, value in fm.items():
            if key.lower() not in RELATION_PROPERTIES or not property_links(value):
                continue
            lines = relation_lines_for(key, value)

            def convert(text: str, key: str = key, lines: list[str] = lines) -> str:
                return append_to_section(remove_field(text, key), "relations", lines)

            problems.append(
                Problem(
                    "BW113",
                    rel,
                    _fm_line(doc, key),
                    f"property {key!r} holds links that read as relations; write them under ## Relations",
                    fix=Fix(f"convert {key} to relation lines", convert),
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
            problems.append(
                Problem(
                    "BW205",
                    rel,
                    claim.line,
                    "claim has no metadata",
                    fix=Fix(
                        "assign a claim id",
                        _line_edit(
                            last, f"{last} {format_meta({'id': claim_id()})}", claim.last_line
                        ),
                    ),
                )
            )
            continue
        if claim.id:
            seen_ids[claim.id] += 1
            if seen_ids[claim.id] > 1:
                new_line = last.replace(f"id:{claim.id}", f"id:{claim_id()}", 1)
                problems.append(
                    Problem(
                        "BW202",
                        rel,
                        claim.line,
                        f"duplicate claim id {claim.id}",
                        fix=Fix(
                            "re-mint the claim id", _line_edit(last, new_line, claim.last_line)
                        ),
                    )
                )
        if claim.meta.get("taint") in ("true", "unknown") and _INJECTION.search(claim.text):
            problems.append(
                Problem(
                    "BW702",
                    rel,
                    claim.line,
                    "instruction-like text in an unverified claim; treat it as data",
                )
            )
    for relation in doc.relations:
        if relation.is_alias:
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
    is_hub = kind == "hub" or str(fm.get("type") or "") == "hub"
    if is_hub and doc.line_count > manifest.budgets.hub_max_lines:
        problems.append(
            Problem(
                "BW401",
                rel,
                None,
                f"hub has {doc.line_count} lines (budget {manifest.budgets.hub_max_lines}); move detail to child notes",
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
    taint = fm.get("taint")
    taint_text = str(taint).lower() if isinstance(taint, bool) else str(taint)
    if taint_text not in TAINTS:
        missing.append("taint")
        values["taint"] = "unknown"
    if missing:
        move_to = episode_path(base, str(values["id"])) if "id" in values else None
        problems.append(
            Problem(
                "BW503",
                rel,
                1,
                f"episode lacks or has invalid provenance fields: {', '.join(missing)}",
                fix=Fix("fill provenance fields", _set(values), move_to=move_to),
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
    privacy = fm.get("privacy")
    if privacy is not None and (
        not isinstance(privacy, str) or not ctx.manifest.is_privacy_level(privacy)
    ):
        problems.append(
            Problem(
                "BW107",
                rel,
                _fm_line(doc, "privacy"),
                f"privacy {privacy!r} is not a declared level",
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


GATED_KINDS = (*NOTE_KINDS, *EPISODE_KINDS, "rules")


def run_gate(engine: Engine) -> Callable[[Run], list[Problem]]:
    """The V12 check for runs: strict errors a change introduces in the files it touches.

    Errors already present before the change do not block it, so one broken note written by
    hand cannot stall every later run that touches it.
    """
    from brainwiki.index.scanner import classify

    ctx = FileContext.for_engine(engine)

    def check(run: Run) -> list[Problem]:
        introduced: list[Problem] = []
        for path, before, after in run.text_changes():
            if after is None:
                continue
            kind = classify(engine, path, ctx.topics)
            if kind not in GATED_KINDS:
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
