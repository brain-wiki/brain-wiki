"""brain-wiki's frontmatter fields and line-local list edits (brain-format.md §4, §6).

brain-wiki's own metadata lives in fields named `bw-…`. Values are flat: strings or lists of
strings, which Obsidian's Properties UI can show and edit. The claim and relation fields of
format 2 are named here only so the conversion to format 3 can find them.
"""

from __future__ import annotations

import json
import re
from typing import Any

from brainwiki.format._meta import parse_meta
from brainwiki.format._relations import ALIASES, CANONICAL

PREFIX = "bw-"
CLAIMS = "bw-claims"
SUPERSEDED = "bw-claims-superseded"
RELATION_KEYS = {f"{PREFIX}{verb}": verb for verb in CANONICAL}
ALIAS_KEYS = {f"{PREFIX}{alias}": alias for alias in ALIASES}
# Unprefixed name -> field. Readers keep using the plain name; `split()` maps the field onto it.
FIELDS = {
    "stage": "bw-stage",
    "origin": "bw-origin",
    "inputs": "bw-inputs",
    "agent": "bw-agent",
    "session": "bw-session",
    "origin_turns": "bw-turns",
    "device": "bw-device",
    "captured": "bw-captured",
    "topics": "bw-topics",
    "dedupe": "bw-dedupe",
    "source": "bw-source",
    "pattern": "bw-pattern",
}
_META_KEYS = {"id", "src", "origin", "inputs", "at", "status", "by", "reason", "quote", "via"}
_META_TAIL = re.compile(r"\s*\{(?P<body>[^{}]*)\}\s*$")
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
    from brainwiki.format._frontmatter import _yaml

    first, stop, inline = span
    yaml, loader = _yaml()
    raw = "".join(lines[first:stop])
    try:
        loaded = yaml.load(raw, Loader=loader)  # noqa: S506 - safe loader
    except yaml.YAMLError:
        return []
    value = next(iter(loaded.values()), None) if isinstance(loaded, dict) else None
    return [str(v) for v in as_items(value) if v is not None]


def _set_list(text: str, key: str, values: list[str], *, after: tuple[str, ...] = ()) -> str:
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
    return _set_list(text, key, [*list_values(text, key), *values])
