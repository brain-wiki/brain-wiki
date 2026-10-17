"""Formats 1 and 2 into format 3 (brain-format.md §13).

Claims and typed relations become body Markdown (`## Facts`, `## History`, `## Related`); the
episodes and URLs claims cited become `bw-sources`; a note superseded through a relation gets
`status: superseded` and `bw-superseded_by`. A relation item that does not parse moves to
`## Related` unchanged; other lines stay where they are.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from brainwiki.format._claims import parse_claim_block
from brainwiki.format._edit import append_to_section
from brainwiki.format._fields import (
    ALIAS_KEYS,
    CLAIMS,
    FIELDS,
    PREFIX,
    RELATION_KEYS,
    SUPERSEDED,
    add_items,
    as_items,
    item_lines,
    list_values,
    quote,
    split_claim,
)
from brainwiki.format._frontmatter import remove_field, set_fields, set_raw, split
from brainwiki.format._links import mask_code
from brainwiki.format._relations import ALIASES, RelationError, parse_relation_line

_HEADING = re.compile(r"^(?P<hashes>#{1,6})\s+(?P<text>.+?)\s*#*\s*$")
_ITEM = re.compile(r"^\s*[-*+]\s+\S")
_LEGACY_SECTIONS = ("claims", "relations")
_SUPERSEDED_BY = "superseded_by"
SUPERSEDED_BY = f"{PREFIX}superseded_by"
SOURCES = f"{PREFIX}sources"
NOTE_FIELDS = frozenset({SUPERSEDED_BY, SOURCES, FIELDS["stage"]})


@dataclass
class Legacy:
    """What a note still holds from formats 1 and 2, each with the line it sits on."""

    fields: list[tuple[str, int]] = field(default_factory=list)  # claim and relation keys
    sections: list[tuple[str, int]] = field(default_factory=list)  # `## Claims`, `## Relations`
    stage: bool = False  # `stage:` written without the prefix
    supersedes: list[str] = field(default_factory=list)  # link targets this note replaces

    def __bool__(self) -> bool:
        return bool(self.fields or self.sections or self.stage)


def _sections(lines: list[str], first_body: int) -> list[tuple[str, int, int]]:
    """(lowercased name, heading line, last line) of level-2 sections, both 1-based."""
    masked = mask_code(lines[first_body - 1 :])
    heads = []
    for offset, line in enumerate(masked):
        match = _HEADING.match(line)
        if match:
            heads.append((first_body + offset, len(match.group("hashes")), match.group("text")))
    out = []
    for idx, (line_no, level, text) in enumerate(heads):
        if level != 2:
            continue
        end = len(lines)
        for later, later_level, _ in heads[idx + 1 :]:
            if later_level <= 2:
                end = later - 1
                break
        out.append((text.strip().lower(), line_no, end))
    return out


def _verb_of(key: str) -> str | None:
    return RELATION_KEYS.get(key) or ALIAS_KEYS.get(key)


def _is_legacy(key: str, value: Any) -> bool:
    """A claim or relation key; `bw-superseded_by` only as format 2's list, since format 3 writes
    it as one link."""
    if key == SUPERSEDED_BY:
        return isinstance(value, list)
    return key in (CLAIMS, SUPERSEDED) or _verb_of(key) is not None


def legacy(text: str) -> Legacy:
    """The format 1 and 2 constructs in a note; empty for a format 3 note or bad YAML."""
    fm = split(text)
    found = Legacy()
    if fm.error:
        return found
    for key in fm.raw:
        if not _is_legacy(key, fm.raw[key]):
            continue
        found.fields.append((key, item_lines(text, key, 1)[0]))
        verb = _verb_of(key)
        canonical = ALIASES.get(verb or "", verb)
        if canonical == "supersedes":
            for value in as_items(fm.raw[key]):
                if isinstance(value, str):
                    parsed = parse_relation_line(f"- {verb} {value}", 1)
                    if not isinstance(parsed, RelationError):
                        found.supersedes.append(parsed.target)
    found.stage = "stage" in fm.legacy_fields
    lines = text.splitlines()
    for name, heading, end in _sections(lines, fm.body_start_line):
        if name in _LEGACY_SECTIONS and any(
            _ITEM.match(lines[n - 1]) for n in range(heading + 1, end + 1)
        ):
            found.sections.append((name, heading))
            if name == "relations":
                for n in range(heading + 1, end + 1):
                    parsed = parse_relation_line(lines[n - 1], n)
                    if not isinstance(parsed, RelationError) and parsed.verb == "supersedes":
                        found.supersedes.append(parsed.target)
    return found


def _sources_of(meta: dict[str, str], inbox: str, archive: str) -> list[str]:
    """`bw-sources` items for a claim's `src`: archived episodes and URLs."""
    out = []
    for raw in meta.get("src", "").split(","):
        item = raw.strip()
        if not item:
            continue
        if "://" in item:
            out.append(item)
            continue
        path = item.split("#", 1)[0]
        if "/" not in path:
            continue  # `<host>:<session>#T…`: a conversation, which a note cannot link to
        if path.startswith(f"{inbox}/"):
            path = f"{archive}/{path[len(inbox) + 1 :]}"
        out.append(f"[[{path.removesuffix('.md')}]]")
    return out


def _phrase(verb: str) -> str:
    return verb.replace("_", " ").capitalize()


def _fact(text: str) -> str:
    return f"- {' '.join(text.split())}"


def _struck(text: str, meta: dict[str, Any]) -> str:
    line = f"- ~~{' '.join(text.split())}~~"
    if meta.get("reason"):
        line += f" ({meta['reason']})"
    return line


def _norm(target: str) -> str:
    return target.strip().removesuffix(".md").casefold()


def to_format3(
    text: str,
    *,
    page_names: frozenset[str] = frozenset(),
    inbox: str = "inbox",
    archive: str = "archive",
) -> str:
    """The note in format 3. `page_names` are the link targets that name the page of the note's
    own topic (its path without `.md`, its folder's name); a `part_of` link to one is dropped,
    since the folder already says it."""
    fm = split(text)
    if fm.error or not legacy(text):
        return text
    newline = "\r\n" if "\r\n" in text else "\n"
    pages = {_norm(p) for p in page_names}
    facts: list[str] = []
    history: list[str] = []
    related: list[str] = []
    sources: list[str] = []
    superseded_by: str | None = None

    for key in (CLAIMS, SUPERSEDED):
        for value in as_items(fm.raw.get(key)):
            if not isinstance(value, str):
                continue
            body, meta = split_claim(value)
            meta = meta or {}
            sources += _sources_of(meta, inbox, archive)
            (facts if key == CLAIMS else history).append(
                _fact(body) if key == CLAIMS else _struck(body, meta)
            )

    def relation(verb: str, value: str, written: str) -> None:
        nonlocal superseded_by
        parsed = parse_relation_line(f"- {verb} {value}", 1)
        if isinstance(parsed, RelationError):
            related.append(f"- {_phrase(written)} {value}")
            return
        if parsed.verb == "part_of" and _norm(parsed.target) in pages:
            return
        if parsed.verb == _SUPERSEDED_BY and superseded_by is None:
            superseded_by = f"[[{parsed.target}]]"
            return
        related.append(f"- {_phrase(written)} {value}")

    for key, raw_values in fm.raw.items():
        verb = _verb_of(key)
        if verb is None or not _is_legacy(key, raw_values):
            continue
        for value in as_items(raw_values):
            if isinstance(value, str):
                relation(verb, value, key[len(PREFIX) :])

    lines = text.splitlines()
    drop: set[int] = set()
    for name, heading, end in _sections(lines, fm.body_start_line):
        if name not in _LEGACY_SECTIONS:
            continue
        body = [(n, lines[n - 1]) for n in range(heading + 1, end + 1)]
        if name == "claims":
            claims, _ = parse_claim_block(body)
            for claim in claims:
                sources += _sources_of(claim.meta, inbox, archive)
                if claim.status == "active":
                    facts.append(_fact(claim.text))
                else:
                    history.append(_struck(claim.text, claim.meta))
                drop.update(range(claim.line, claim.last_line + 1))
        else:
            for n, line in body:
                parsed = parse_relation_line(line, n)
                if isinstance(parsed, RelationError):
                    if _ITEM.match(line):  # a list item like any other in format 3
                        related.append(line.strip())
                        drop.add(n)
                    continue
                rest = line.split(parsed.written_verb, 1)[1].strip()
                relation(parsed.verb, rest, parsed.written_verb)
                drop.add(n)
        leftover = [n for n, line in body if n not in drop and line.strip()]
        if not leftover:
            drop.update([heading, *(n for n, _ in body)])

    kept = [line for n, line in enumerate(lines, start=1) if n not in drop]
    while kept and not kept[-1].strip():
        kept.pop()
    out = newline.join(_collapse_blank(kept)) + newline
    present = {name for name, _, _ in _sections(out.splitlines(), split(out).body_start_line)}
    for title, items in (("Facts", facts), ("History", history), ("Related", related)):
        if items and title.lower() in present:  # a body the user already started
            out = append_to_section(out, title.lower(), items)
        elif items:
            out += newline.join(["", f"## {title}", "", *items]) + newline

    for key in [k for k, v in fm.raw.items() if _is_legacy(k, v)]:
        out = remove_field(out, key)
    if "stage" in fm.legacy_fields:
        out = set_fields(remove_field(out, "stage"), {FIELDS["stage"]: fm.raw.get("stage")})
    if superseded_by:
        if str(fm.raw.get("status") or "active") == "active":
            out = set_fields(out, {"status": "superseded"}, order_first=("id", "type", "title"))
        out = set_raw(out, SUPERSEDED_BY, quote(superseded_by))
    new_sources = [s for s in dict.fromkeys(sources) if s not in list_values(out, SOURCES)]
    if new_sources:
        out = add_items(out, SOURCES, new_sources)
    return out


def mark_superseded(text: str, link: str) -> str:
    """The note with `status: superseded` and `bw-superseded_by: "[[link]]"`."""
    out = set_fields(text, {"status": "superseded"}, order_first=("id", "type", "title"))
    return set_raw(out, SUPERSEDED_BY, quote(f"[[{link}]]"))


def _collapse_blank(lines: list[str]) -> list[str]:
    out: list[str] = []
    for line in lines:
        if not line.strip() and out and not out[-1].strip():
            continue
        out.append(line)
    return out
