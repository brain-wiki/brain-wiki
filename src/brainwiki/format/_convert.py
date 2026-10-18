"""Older notes into format 4 (brain-format.md §13).

Claims become body Markdown (`## Facts`, `## History`), and the episodes and URLs they cited
become `bw-sources`. A format 2 relation becomes a link in its format 4 field (`bw-part_of`,
`bw-depends_on`, `bw-conflicts_with`, `bw-superseded_by`) on the note that field belongs on; what
was written after the link, and relations format 4 has no field for, become prose under
`## Relations`. Format 3 wrote typed relations as `## Related` bullets; in a brain that declares
format 3 or older, those bullets also become fields, and stay where they are as prose.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from brainwiki import FORMAT_VERSION
from brainwiki.format._claims import parse_claim_block
from brainwiki.format._edit import append_to_section
from brainwiki.format._fields import (
    CLAIMS,
    FIELDS,
    LINK_FIELDS,
    PREFIX,
    RELATION_FIELDS,
    SUPERSEDED,
    V2_ALIAS_KEYS,
    V2_VERB_KEYS,
    add_items,
    as_items,
    item_lines,
    list_values,
    quote,
    set_items,
    split_claim,
)
from brainwiki.format._frontmatter import remove_field, set_fields, set_raw, split
from brainwiki.format._links import mask_code
from brainwiki.format._relations import RelationError, canonical_verb, parse_relation_line

_HEADING = re.compile(r"^(?P<hashes>#{1,6})\s+(?P<text>.+?)\s*#*\s*$")
_ITEM = re.compile(r"^\s*[-*+]\s+\S")
_ONE_LINK = re.compile(r"^\[\[[^\[\]\n]+\]\]$")
# A bullet format 3's converter wrote: `- Depends on [[Target]] …`.
_V3_BULLET = re.compile(r"^\s*[-*+]\s+(?P<phrase>[A-Za-z][A-Za-z ]*?)\s+(?P<link>\[\[[^\[\]]+\]\])")
SUPERSEDED_BY = f"{PREFIX}superseded_by"
SOURCES = f"{PREFIX}sources"
NOTE_FIELDS = frozenset({*LINK_FIELDS, FIELDS["stage"]})
# Format 2 verb -> (format 4 field, whether the field goes on the other note). Verbs left out,
# `related_to` and causation, become prose.
_ROUTES = {
    "part_of": ("bw-part_of", False),
    "has_part": ("bw-part_of", True),
    "depends_on": ("bw-depends_on", False),
    "enables": ("bw-depends_on", True),
    "conflicts_with": ("bw-conflicts_with", False),
    "superseded_by": (SUPERSEDED_BY, False),
    "supersedes": (SUPERSEDED_BY, True),
}
_CAUSATION = {"caused_by", "causes"}  # "caused by" stays prose (relations analysis, depends_on)


@dataclass
class Legacy:
    """What a note still holds from older formats, each with the line it sits on."""

    fields: list[tuple[str, int]] = field(default_factory=list)  # format 2 claim, relation keys
    sections: list[tuple[str, int]] = field(default_factory=list)  # format 1 `## Claims`
    bullets: list[tuple[str, int]] = field(default_factory=list)  # format 3 bullets: (field, line)
    # (field, target): fields the linked note gets, pointing back here. They change other notes,
    # so they alone do not make this one need converting.
    stage: bool = False  # `stage:` written without the prefix
    inverse: list[tuple[str, str]] = field(default_factory=list)

    def __bool__(self) -> bool:
        return bool(self.fields or self.sections or self.bullets or self.stage)


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


def _route(written: str) -> tuple[str, bool] | None:
    """Where a relation written with `written` goes in format 4; None for prose."""
    word = written.lower().replace(" ", "_").replace("-", "_")
    if word in _CAUSATION:
        return None
    verb, _ = canonical_verb(word)
    return _ROUTES.get(verb or "")


def _v2_verb(key: str) -> str | None:
    return V2_VERB_KEYS.get(key) or V2_ALIAS_KEYS.get(key)


def _is_legacy(key: str, value: Any) -> bool:
    """A format 2 claim or relation key. A format 4 relation field counts only while one of its
    items holds more than a link, as format 2's `"[[Target]] — note"` did."""
    if key in (CLAIMS, SUPERSEDED):
        return True
    if _v2_verb(key) is None:
        return False
    if key in RELATION_FIELDS:
        return any(
            isinstance(v, str) and not _ONE_LINK.match(v.strip()) and _link_target(v) is not None
            for v in as_items(value)
        )
    return True


def _target(written: str, value: str) -> str | None:
    parsed = parse_relation_line(f"- {written} {value}", 1)
    return None if isinstance(parsed, RelationError) else parsed.target


def _link_target(value: str) -> str | None:
    """The note a `"[[Target]] …"` value names."""
    return _target("related_to", value)


def _v3_bullets(lines: list[str], first_body: int) -> list[tuple[int, str, str, bool]]:
    """Format 3's typed bullets under `## Related`: (line, field, target, on the other note)."""
    masked = mask_code(lines[first_body - 1 :])
    out = []
    for name, heading, end in _sections(lines, first_body):
        if name != "related":
            continue
        for n in range(heading + 1, end + 1):
            match = _V3_BULLET.match(masked[n - first_body])
            route = _route(match.group("phrase")) if match else None
            if route == (SUPERSEDED_BY, True):
                continue  # format 3's converter already marked the replaced note
            if match and route:
                target = _link_target(match.group("link"))
                if target:
                    out.append((n, route[0], target, route[1]))
    return out


def _norm(target: str) -> str:
    return target.strip().removesuffix(".md").casefold()


def _has_link(text: str, key: str, target: str) -> bool:
    held = {_norm(t) for v in list_values(text, key) if (t := _link_target(str(v)))}
    return _norm(target) in held


def legacy(text: str, *, brain_format: int = FORMAT_VERSION) -> Legacy:
    """The older-format constructs in a note; empty for a format 4 note or bad YAML.

    `brain_format` is the format the brain declares: format 3's `## Related` bullets are read only
    in a brain that has not moved past format 3."""
    fm = split(text)
    found = Legacy()
    if fm.error:
        return found
    for key in fm.raw:
        if not _is_legacy(key, fm.raw[key]):
            continue
        found.fields.append((key, item_lines(text, key, 1)[0]))
        verb = _v2_verb(key)
        route = _route(verb) if verb else None
        if route and route[1]:
            for value in as_items(fm.raw[key]):
                target = _target(verb or "", value) if isinstance(value, str) else None
                if target:
                    found.inverse.append((route[0], target))
    found.stage = "stage" in fm.legacy_fields
    lines = text.splitlines()
    for name, heading, end in _sections(lines, fm.body_start_line):
        if name == "claims" and any(_ITEM.match(lines[n - 1]) for n in range(heading + 1, end + 1)):
            found.sections.append((name, heading))
    if brain_format <= 3:
        for line, key, target, other in _v3_bullets(lines, fm.body_start_line):
            if other:
                found.inverse.append((key, target))
            elif not _has_link(text, key, target):
                found.bullets.append((key, line))
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


def add_link(text: str, key: str, link: str) -> str:
    """The note with a link to `link` in field `key`: one link as one value, several as a list.
    A link the field already holds is left alone."""
    item = link if link.startswith("[[") else f"[[{link}]]"
    current = list_values(text, key)
    target = _link_target(item)
    if target and _has_link(text, key, target):
        return text
    values = [*current, item]
    if len(values) == 1:
        return set_raw(text, key, quote(item))
    return set_items(text, key, values)


def remove_link(text: str, key: str, target: str) -> str:
    """The note without the link to `target` in field `key`; the field goes when it empties."""
    kept = [v for v in list_values(text, key) if _norm(_link_target(v) or v) != _norm(target)]
    if not kept:
        return remove_field(text, key)
    if len(kept) == 1:
        return set_raw(text, key, quote(kept[0]))
    return set_items(text, key, kept)


def upgrade(
    text: str,
    *,
    page_names: frozenset[str] = frozenset(),
    inbox: str = "inbox",
    archive: str = "archive",
    brain_format: int = FORMAT_VERSION,
) -> str:
    """The note in format 4. `page_names` are the link targets that name the page of the note's
    own topic (its path without `.md`, its folder's name); a `part_of` link to one is dropped,
    since the folder already says it. Fields that belong on other notes are left to the caller
    (`legacy(...).inverse`)."""
    fm = split(text)
    if fm.error or not legacy(text, brain_format=brain_format):
        return text
    newline = "\r\n" if "\r\n" in text else "\n"
    pages = {_norm(p) for p in page_names}
    facts: list[str] = []
    history: list[str] = []
    prose: list[str] = []
    sources: list[str] = []
    links: list[tuple[str, str]] = []  # (field, target) for this note

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

    def relation(written: str, value: str) -> None:
        parsed = parse_relation_line(f"- {written} {value}", 1)
        route = _route(written)
        if isinstance(parsed, RelationError) or route is None:
            prose.append(f"- {_phrase(written)} {value}")
            return
        key, other = route
        if key == "bw-part_of" and not other and _norm(parsed.target) in pages:
            return
        if not other:
            links.append((key, parsed.target))
        if other or parsed.qualifier or parsed.note or parsed.attrs:
            prose.append(f"- {_phrase(written)} {value}")

    legacy_keys = [k for k, v in fm.raw.items() if _is_legacy(k, v)]
    for key in legacy_keys:
        verb = _v2_verb(key)
        if verb is None:
            continue
        for value in as_items(fm.raw[key]):
            if isinstance(value, str):
                relation(key[len(PREFIX) :], value)

    lines = text.splitlines()
    drop: set[int] = set()
    for name, heading, end in _sections(lines, fm.body_start_line):
        if name != "claims":
            continue
        body = [(n, lines[n - 1]) for n in range(heading + 1, end + 1)]
        claims, _ = parse_claim_block(body)
        for claim in claims:
            sources += _sources_of(claim.meta, inbox, archive)
            if claim.status == "active":
                facts.append(_fact(claim.text))
            else:
                history.append(_struck(claim.text, claim.meta))
            drop.update(range(claim.line, claim.last_line + 1))
        if not [n for n, line in body if n not in drop and line.strip()]:
            drop.update([heading, *(n for n, _ in body)])
    if brain_format <= 3:
        links += [
            (key, target)
            for _, key, target, other in _v3_bullets(lines, fm.body_start_line)
            if not other
        ]

    kept = [line for n, line in enumerate(lines, start=1) if n not in drop]
    while kept and not kept[-1].strip():
        kept.pop()
    out = newline.join(_collapse_blank(kept)) + newline
    present = {name for name, _, _ in _sections(out.splitlines(), split(out).body_start_line)}
    for title, items in (("Facts", facts), ("History", history), ("Relations", prose)):
        if items and title.lower() in present:  # a body the user already started
            out = append_to_section(out, title.lower(), items)
        elif items:
            out += newline.join(["", f"## {title}", "", *items]) + newline

    for key in legacy_keys:
        out = remove_field(out, key)
    if "stage" in fm.legacy_fields:
        out = set_fields(remove_field(out, "stage"), {FIELDS["stage"]: fm.raw.get("stage")})
    for key, target in links:
        out = add_link(out, key, target)
    replaced = any(key == SUPERSEDED_BY for key, _ in links)
    if replaced and str(fm.raw.get("status") or "active") == "active":
        out = set_fields(out, {"status": "superseded"}, order_first=("id", "type", "title"))
    new_sources = [s for s in dict.fromkeys(sources) if s not in list_values(out, SOURCES)]
    if new_sources:
        out = add_items(out, SOURCES, new_sources)
    return out


def link_back(key: str) -> Any:
    """An edit that gives a note a link back in field `key`, for a relation the other note held
    in the inverse direction; `bw-superseded_by` also sets `status: superseded`."""

    def edit(text: str, link: str) -> str:
        out = add_link(text, key, link)
        if key == SUPERSEDED_BY:
            out = set_fields(out, {"status": "superseded"}, order_first=("id", "type", "title"))
        return out

    return edit


def mark_superseded(text: str, link: str) -> str:
    """The note with `status: superseded` and a link to `link` in `bw-superseded_by`."""
    return link_back(SUPERSEDED_BY)(text, link)


def _collapse_blank(lines: list[str]) -> list[str]:
    out: list[str] = []
    for line in lines:
        if not line.strip() and out and not out[-1].strip():
            continue
        out.append(line)
    return out
