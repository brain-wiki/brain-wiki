"""Text-level normalization shared by overlay phase 1 and `--into` (import.md §4)."""

from __future__ import annotations

from collections.abc import Callable

from brainwiki.format import (
    STATUSES,
    field,
    map_status,
    parse_document,
    set_fields,
)
from brainwiki.ids import new_ulid

_ORDER = ("id", "type", "title")


def identity_and_status(text: str, *, mint: Callable[[], str] = new_ulid) -> str:
    """Phase 1: mint missing ids, move non-standard status values to `stage`, fix list fields."""
    doc = parse_document("x.md", text)
    if doc.frontmatter.error:
        return text
    values: dict[str, object] = {}
    if doc.fm.get("id") is None:
        values["id"] = mint()
    status = doc.fm.get("status")
    if status is not None and str(status) not in STATUSES:
        new_status, stage = map_status(str(status))
        values["status"] = new_status
        if stage and doc.fm.get("stage") is None:
            values[field("stage")] = stage
    for key in ("tags", "aliases"):
        raw = doc.fm.get(key)
        if isinstance(raw, str):
            values[key] = [p.strip().lstrip("#") for p in raw.split(",") if p.strip()]
    return set_fields(text, values, order_first=_ORDER) if values else text
