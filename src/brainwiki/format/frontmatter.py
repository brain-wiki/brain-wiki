"""YAML frontmatter: tolerant parsing and edits that touch only the lines they must."""

from __future__ import annotations

import datetime as dt
import re
from dataclasses import dataclass, field
from functools import cache
from typing import Any

from brainwiki.format.fields import alias_fields


@cache
def _yaml() -> tuple[Any, type]:
    """PyYAML, imported on first use: a scan that parses nothing should not pay ~40 ms for it."""
    import yaml

    return yaml, getattr(yaml, "CSafeLoader", yaml.SafeLoader)


_MAX_FRONTMATTER_BYTES = 64 * 1024
_KEY_RE = re.compile(r"^([A-Za-z0-9_][A-Za-z0-9_.-]*)\s*:")


@dataclass
class Frontmatter:
    data: dict[str, Any] = field(default_factory=dict)
    present: bool = False
    error: str | None = None
    nested_keys: list[str] = field(default_factory=list)
    raw: dict[str, Any] = field(default_factory=dict)  # as written, before `bw-` fields are mapped
    legacy_fields: list[str] = field(default_factory=list)  # brain-wiki fields written unprefixed
    end_line: int = 0  # 1-based line number of the closing delimiter; 0 when absent
    body: str = ""
    body_start_line: int = 1


def _normalize(value: Any) -> Any:
    if isinstance(value, dt.datetime):
        return value.isoformat()
    if isinstance(value, dt.date):
        return value.isoformat()
    if isinstance(value, list):
        return [_normalize(v) for v in value]
    if isinstance(value, dict):
        return {str(k): _normalize(v) for k, v in value.items()}
    return value


def split(text: str) -> Frontmatter:
    """Separate frontmatter from body. Never raises: problems are reported in `.error`."""
    if text.startswith("\ufeff"):
        text = text[1:]
    if not (text.startswith("---\n") or text.startswith("---\r\n")):
        return Frontmatter(body=text, body_start_line=1)
    lines = text.splitlines(keepends=True)
    for idx in range(1, len(lines)):
        if lines[idx].rstrip("\r\n") in ("---", "..."):
            raw = "".join(lines[1:idx])
            body = "".join(lines[idx + 1 :])
            fm = Frontmatter(present=True, end_line=idx + 1, body=body, body_start_line=idx + 2)
            if len(raw.encode("utf-8")) > _MAX_FRONTMATTER_BYTES:
                fm.error = "frontmatter larger than 64 KiB"
                return fm
            yaml, loader = _yaml()
            try:
                loaded = yaml.load(raw, Loader=loader)  # noqa: S506 - safe loader
            except yaml.YAMLError as exc:
                fm.error = f"invalid YAML: {str(exc).splitlines()[0]}"
                return fm
            if loaded is None:
                loaded = {}
            if not isinstance(loaded, dict):
                fm.error = "frontmatter is not a mapping"
                return fm
            fm.data = {str(k): _normalize(v) for k, v in loaded.items()}
            fm.raw = dict(fm.data)
            fm.legacy_fields = alias_fields(fm.data)
            fm.nested_keys = [
                k
                for k, v in fm.data.items()
                if isinstance(v, dict)
                or (isinstance(v, list) and any(isinstance(i, (dict, list)) for i in v))
            ]
            return fm
    return Frontmatter(body=text, body_start_line=1, error="frontmatter is not closed")


_ISO_DATE = re.compile(
    r"^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?$"
)


def format_value(value: Any) -> str:
    if isinstance(value, str) and _ISO_DATE.match(value):
        return value  # YAML reads it back as a date; parsing normalizes it to the same string
    if isinstance(value, list):
        return "[" + ", ".join(format_value(v) for v in value) + "]"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    dumped = _yaml()[0].safe_dump(
        str(value), default_flow_style=True, allow_unicode=True, width=10_000
    )
    dumped = dumped.strip()
    if dumped.endswith("\n..."):
        dumped = dumped[: -len("\n...")]
    if dumped.endswith("..."):
        dumped = dumped[:-3].strip()
    return dumped


def _key_span(lines: list[str], start: int, end: int, key: str) -> tuple[int, int] | None:
    """Return [first, last) line indexes holding `key` and its continuation lines."""
    for idx in range(start, end):
        match = _KEY_RE.match(lines[idx])
        if match and match.group(1) == key:
            stop = idx + 1
            while stop < end and lines[stop].strip() and lines[stop].startswith((" ", "\t", "-")):
                stop += 1
            return idx, stop
    return None


def set_fields(text: str, values: dict[str, Any], *, order_first: tuple[str, ...] = ()) -> str:
    """Set frontmatter keys, editing only their lines. Creates frontmatter if absent."""
    newline = "\r\n" if "\r\n" in text else "\n"
    if not (text.startswith("---\n") or text.startswith("---\r\n")):
        keys = [k for k in order_first if k in values] + [k for k in values if k not in order_first]
        block = ["---"] + [f"{k}: {format_value(values[k])}" for k in keys] + ["---"]
        return newline.join(block) + newline + text
    lines = text.splitlines(keepends=True)
    close = next(
        (i for i in range(1, len(lines)) if lines[i].rstrip("\r\n") in ("---", "...")), None
    )
    if close is None:
        raise ValueError("frontmatter is not closed")
    for key, value in values.items():
        rendered = f"{key}: {format_value(value)}{newline}"
        span = _key_span(lines, 1, close, key)
        if span:
            first, last = span
            lines[first:last] = [rendered]
            close -= (last - first) - 1
        else:
            insert_at = close
            if key in order_first:
                insert_at = 1 + sum(
                    1
                    for k in order_first[: order_first.index(key)]
                    if _key_span(lines, 1, close, k)
                )
            elif not key.startswith("bw-"):  # brain-wiki's fields stay together, at the end
                insert_at = next((i for i in range(1, close) if lines[i].startswith("bw-")), close)
            lines.insert(insert_at, rendered)
            close += 1
    return "".join(lines)


def remove_field(text: str, key: str) -> str:
    if not text.startswith("---"):
        return text
    lines = text.splitlines(keepends=True)
    close = next(
        (i for i in range(1, len(lines)) if lines[i].rstrip("\r\n") in ("---", "...")), None
    )
    if close is None:
        return text
    span = _key_span(lines, 1, close, key)
    if not span:
        return text
    del lines[span[0] : span[1]]
    return "".join(lines)
