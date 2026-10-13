"""brain-wiki's frontmatter fields: relations, claims, and `bw-` metadata (design doc 02 §4, §6).

Everything brain-wiki parses lives in frontmatter, in fields named `bw-…`, so the body stays
prose. Relations are one list per verb (`bw-depends_on: ["[[note]] (qualifier) — note"]`);
claims are strings with a trailing meta block (`"text {id: c-…; src: …}"`). All values are
flat: strings or lists of strings, which Obsidian's Properties UI can show and edit.
"""

from __future__ import annotations

import json
import re
from typing import TYPE_CHECKING, Any

from brainwiki.format.meta import parse_meta
from brainwiki.format.relations import (
    _LINE_RE,
    ALIASES,
    CANONICAL,
    canonical_verb,
    canonicalize_line,
)

if TYPE_CHECKING:
    from brainwiki.format.document import ParsedDoc

PREFIX = "bw-"
CLAIMS = "bw-claims"
SUPERSEDED = "bw-claims-superseded"
RELATION_KEYS = {f"{PREFIX}{verb}": verb for verb in CANONICAL}
ALIAS_KEYS = {f"{PREFIX}{alias}": alias for alias in ALIASES}
# Unprefixed name -> field. Readers keep using the plain name; `split()` maps the field onto it.
FIELDS = {
    "stage": "bw-stage",
    "origin": "bw-origin",
    "taint": "bw-taint",
    "agent": "bw-agent",
    "session": "bw-session",
    "origin_turns": "bw-turns",
    "device": "bw-device",
    "captured": "bw-captured",
    "topics": "bw-topics",
    "dedupe": "bw-dedupe",
    "source": "bw-source",
}
NOTE_FIELDS = ("stage",)  # the unprefixed names a note may still use (format 1)
KNOWN = {CLAIMS, SUPERSEDED, *RELATION_KEYS, *FIELDS.values()}
_META_KEYS = {"id", "src", "origin", "taint", "at", "status", "by", "reason", "quote", "via"}
_META_TAIL = re.compile(r"\s*\{(?P<body>[^{}]*)\}\s*$")
_ORDER = ("id", "status", "by", "reason", "src", "origin", "taint", "at")
# Characters outside YAML's printable set (YAML 1.1 §5.1), as PyYAML's reader checks them.
_NOT_YAML = re.compile("[^\x09\x0a\x0d\x20-\x7e\x85\xa0-\ud7ff\ue000-\ufffd\U00010000-\U0010ffff]")


def field(name: str) -> str:
    """The frontmatter key brain-wiki writes for `name` (`stage` -> `bw-stage`)."""
    return FIELDS.get(name, name)


def alias_fields(data: dict[str, Any]) -> list[str]:
    """Expose `bw-` fields under their plain names; return plain names written unprefixed."""
    legacy = [name for name in FIELDS if name in data and FIELDS[name] not in data]
    for name, key in FIELDS.items():
        if key in data:
            data[name] = data[key]
    return legacy


# -- values ----------------------------------------------------------------------------------


def quote(value: str) -> str:
    """A YAML double-quoted scalar: a JSON string, with what YAML will not read escaped."""
    text = json.dumps(" ".join(value.split()), ensure_ascii=False)
    return _NOT_YAML.sub(lambda m: f"\\u{ord(m.group()):04x}", text)


def claim_value(text: str, meta: dict[str, str] | None = None) -> str:
    """`"claim text {id: c-…; src: …}"`, the form a claim takes in `bw-claims`."""
    body = " ".join(text.replace("{", "(").replace("}", ")").split())
    if not meta:
        return body
    keys = [k for k in _ORDER if k in meta] + sorted(k for k in meta if k not in _ORDER)
    parts = []
    for key in keys:
        value = " ".join(str(meta[key]).replace("{", "(").replace("}", ")").split())
        if not value:
            continue
        if ";" in value or '"' in value:
            value = '"' + value.replace('"', '\\"') + '"'
        parts.append(f"{key}: {value}")
    return f"{body} {{{'; '.join(parts)}}}" if parts else body


def split_claim(value: str) -> tuple[str, dict[str, str] | None]:
    """(claim text, meta or None). A trailing `{…}` counts as meta only with known keys."""
    match = _META_TAIL.search(value)
    if match:
        meta = parse_meta(match.group("body"))
        if (
            meta
            and set(meta) <= _META_KEYS | {k for k in meta if k.isidentifier()}
            and (set(meta) & _META_KEYS)
        ):
            return value[: match.start()].strip(), meta
    return value.strip(), None


def relation_value(
    target_link: str,
    *,
    qualifier: str | None = None,
    attrs: dict[str, str] | None = None,
    note: str | None = None,
) -> str:
    """`"[[target]] (qualifier) — note"`, the form a relation takes in `bw-<verb>`."""
    value = f"[[{target_link}]]"
    quals = ([qualifier] if qualifier else []) + [
        f"{k}={v}" for k, v in (attrs or {}).items() if k != "tags"
    ]
    if quals:
        value += " (" + ", ".join(quals) + ")"
    if note:
        value += " — " + " ".join(note.split())
    return value


def canonical_item(alias: str, value: str) -> tuple[str, str] | None:
    """(`bw-<verb>`, value) for an item written under an alias key, the alias kept as qualifier."""
    verb, is_alias = canonical_verb(alias)
    line = canonicalize_line(f"- {alias} {value}") if is_alias else None
    if verb is None or line is None:
        return None
    return f"{PREFIX}{verb}", line[len(f"- {verb} ") :]


def as_items(value: Any) -> list[Any]:
    if value is None:
        return []
    return value if isinstance(value, list) else [value]


# -- where values sit --------------------------------------------------------------------------

_KEY = re.compile(r"^([A-Za-z0-9_][A-Za-z0-9_.-]*)\s*:(.*)$")


def _block(lines: list[str]) -> int | None:
    """Index of the closing delimiter, or None when there is no frontmatter."""
    if not lines or lines[0].rstrip("\r\n") != "---":
        return None
    return next(
        (i for i in range(1, len(lines)) if lines[i].rstrip("\r\n") in ("---", "...")), None
    )


def _span(lines: list[str], close: int, key: str) -> tuple[int, int, str] | None:
    """(key line, end exclusive, inline value) for `key` inside the frontmatter."""
    for idx in range(1, close):
        match = _KEY.match(lines[idx].rstrip("\r\n"))
        if match and match.group(1) == key:
            stop = idx + 1
            while stop < close and lines[stop].strip() and lines[stop].startswith((" ", "\t", "-")):
                stop += 1
            return idx, stop, match.group(2).strip()
    return None


def item_lines(text: str, key: str, count: int) -> list[int]:
    """1-based line numbers of a list field's `count` items (the key line for inline values)."""
    lines = text.splitlines(keepends=True)
    close = _block(lines)
    span = _span(lines, close, key) if close else None
    if span is None:
        return [1] * count
    first, stop, inline = span
    if inline:
        return [first + 1] * count
    found = [i + 1 for i in range(first + 1, stop) if lines[i].lstrip().startswith("- ")]
    if len(found) != count:
        return [first + 1] * count
    return found


# -- edits (line-local, block lists) -------------------------------------------------------------


def _newline(text: str) -> str:
    return "\r\n" if "\r\n" in text else "\n"


def _items_of(lines: list[str], span: tuple[int, int, str]) -> list[str]:
    """The current values of a list field, re-read from its lines."""
    from brainwiki.format.frontmatter import _yaml

    first, stop, inline = span
    yaml, loader = _yaml()
    raw = "".join(lines[first:stop])
    try:
        loaded = yaml.load(raw, Loader=loader)  # noqa: S506 - safe loader
    except yaml.YAMLError:
        return []
    value = next(iter(loaded.values()), None) if isinstance(loaded, dict) else None
    return [str(v) for v in as_items(value) if v is not None]


def set_list(text: str, key: str, values: list[str], *, after: tuple[str, ...] = ()) -> str:
    """Write `key` as a block list of `values` (removing it when empty); creates frontmatter."""
    newline = _newline(text)
    block = [f"{key}:{newline}", *[f"  - {quote(v)}{newline}" for v in values]] if values else []
    lines = text.splitlines(keepends=True)
    close = _block(lines)
    if close is None:
        if not values:
            return text
        return "".join([f"---{newline}", *block, f"---{newline}"]) + text
    span = _span(lines, close, key)
    if span:
        lines[span[0] : span[1]] = block
        return "".join(lines)
    if not values:
        return text
    insert_at = close
    for anchor in after:  # keep brain-wiki fields together, after the note's own fields
        found = _span(lines, close, anchor)
        if found:
            insert_at = max(insert_at if insert_at != close else 0, found[1])
    lines[insert_at:insert_at] = block
    return "".join(lines)


def list_values(text: str, key: str) -> list[str]:
    lines = text.splitlines(keepends=True)
    close = _block(lines)
    span = _span(lines, close, key) if close else None
    return _items_of(lines, span) if span else []


def add_items(text: str, key: str, values: list[str]) -> str:
    return set_list(text, key, [*list_values(text, key), *values], after=tuple(_field_order(key)))


def replace_item(text: str, key: str, index: int, new: list[str]) -> str:
    values = list_values(text, key)
    if not 0 <= index < len(values):
        return text
    values[index : index + 1] = new
    return set_list(text, key, values)


def move_item(text: str, key: str, value: str, new_key: str, new_value: str) -> str:
    """Move one item (found by value, so earlier edits cannot shift it) to another list."""
    values = list_values(text, key)
    if value not in values:
        return text
    values.remove(value)
    return add_items(set_list(text, key, values), new_key, [new_value])


def _field_order(key: str) -> list[str]:
    """Fields that come before `key`, so new fields land in a stable order."""
    order = [*RELATION_KEYS, CLAIMS, SUPERSEDED]
    return order[: order.index(key)] if key in order else order


# -- format 1 -> format 2 ----------------------------------------------------------------------


def to_format2(text: str) -> str:
    """Move a note's `## Claims` and `## Relations` sections and its unprefixed brain-wiki
    fields into `bw-` frontmatter. Lines that do not parse stay where they are."""
    from brainwiki.format.document import parse_document
    from brainwiki.format.frontmatter import remove_field, set_fields

    doc = parse_document("x.md", text)
    if doc.frontmatter.error:
        return text
    lines = text.splitlines()
    drop: set[int] = set()
    claims: list[str] = []
    superseded: list[str] = []
    relations: dict[str, list[str]] = {}
    for claim in doc.claims:
        if claim.key is not None:
            continue
        meta = {k: v for k, v in claim.meta.items() if (k, v) != ("status", "superseded")}
        value = claim_value(claim.text, meta or None)
        (claims if claim.status == "active" else superseded).append(value)
        drop.update(range(claim.line, claim.last_line + 1))
    for relation in doc.relations:
        if relation.key is not None:
            continue
        line = lines[relation.line - 1]
        line = canonicalize_line(line) or line
        match = _LINE_RE.match(line)
        if not match:
            continue
        relations.setdefault(f"{PREFIX}{relation.verb}", []).append(
            line[match.end("verb") :].strip()
        )
        drop.add(relation.line)
    for name in ("claims", "relations"):
        for section in [s for s in doc.sections if s.name == name and s.level == 2]:
            body = range(section.heading_line + 1, section.end_line + 1)
            leftover = [n for n in body if n not in drop and lines[n - 1].strip()]
            if not leftover:
                drop.update([section.heading_line, *body])
    new_lines = [line for n, line in enumerate(lines, start=1) if n not in drop]
    while new_lines and not new_lines[-1].strip():
        new_lines.pop()
    out = "\n".join(_collapse_blank(new_lines)) + "\n"
    if "\r\n" in text:
        out = out.replace("\n", "\r\n")
    for key, values in relations.items():
        out = add_items(out, key, values)
    if claims:
        out = add_items(out, CLAIMS, claims)
    if superseded:
        out = add_items(out, SUPERSEDED, superseded)
    for name in NOTE_FIELDS:
        if name in doc.frontmatter.legacy_fields:
            value = doc.frontmatter.raw.get(name)
            out = set_fields(remove_field(out, name), {FIELDS[name]: value})
    return out


def is_format1(doc: ParsedDoc) -> bool:
    """Whether a parsed note still holds body claims or relations, or unprefixed fields."""
    if doc.frontmatter.error:
        return False
    return (
        any(c.key is None for c in doc.claims)
        or any(r.key is None for r in doc.relations)
        or any(n in doc.frontmatter.legacy_fields for n in NOTE_FIELDS)
    )


def needs_format2(text: str) -> bool:
    from brainwiki.format.document import parse_document

    return is_format1(parse_document("x.md", text))


def _collapse_blank(lines: list[str]) -> list[str]:
    out: list[str] = []
    for line in lines:
        if not line.strip() and out and not out[-1].strip():
            continue
        out.append(line)
    return out
