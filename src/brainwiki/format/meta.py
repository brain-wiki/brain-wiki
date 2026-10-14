"""The `<!-- key:value; key:value -->` metadata comment used by rules and format 1 claims."""

from __future__ import annotations

import re

_META_RE = re.compile(r"\s*<!--\s*(?P<body>.*?)\s*-->\s*$")


def parse_meta(body: str) -> dict[str, str]:
    """Split `k:v; k:"quoted; value"` into a dict. Values keep everything after the first colon."""
    pairs: dict[str, str] = {}
    buf, in_quote = [], False
    parts: list[str] = []
    for ch in body:
        if ch == '"':
            in_quote = not in_quote
            buf.append(ch)
        elif ch == ";" and not in_quote:
            parts.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
    if buf:
        parts.append("".join(buf))
    for part in parts:
        part = part.strip()
        if not part or ":" not in part:
            continue
        key, value = part.split(":", 1)
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] == '"':
            value = value[1:-1].replace('\\"', '"')
        pairs[key.strip()] = value
    return pairs


_ORDER = ("id", "src", "origin", "inputs", "at", "status", "by", "reason", "quote", "via")


def _clean(value: str) -> str:
    return value.replace("-->", "- ->").replace("\n", " ").replace("\r", " ").strip()


def format_meta(meta: dict[str, str]) -> str:
    keys = [k for k in _ORDER if k in meta] + sorted(k for k in meta if k not in _ORDER)
    rendered = []
    for key in keys:
        value = _clean(str(meta[key]))
        if not value:
            continue
        if ";" in value or '"' in value or key == "quote":
            value = '"' + value.replace('"', '\\"') + '"'
        rendered.append(f"{key}:{value}")
    return "<!-- " + "; ".join(rendered) + " -->"


def split_meta(line: str) -> tuple[str, dict[str, str] | None]:
    """Return (text without the trailing comment, meta or None)."""
    match = _META_RE.search(line)
    if not match:
        return line.rstrip(), None
    return line[: match.start()].rstrip(), parse_meta(match.group("body"))


def strip_meta_comments(text: str) -> str:
    return re.sub(r"<!--.*?-->", "", text, flags=re.S)
