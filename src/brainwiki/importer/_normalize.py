"""Text-level normalization shared by overlay phases and `--into` (design doc 09 §4)."""

from __future__ import annotations

from collections.abc import Callable

from brainwiki.format import (
    STATUSES,
    add_items,
    field,
    map_status,
    parse_document,
    relation_values_for,
    remove_field,
    set_fields,
)
from brainwiki.ids import new_ulid

_ORDER = ("id", "type", "title")


def convert_relations(text: str, *, drop: bool = False) -> str:
    """Phase 1: relation-like frontmatter (`related:`, `up:`, …) becomes `bw-<verb>` relations
    (the original properties are kept unless `drop`)."""
    doc = parse_document("x.md", text)
    if doc.frontmatter.error:
        return text
    have = {(r.key, r.target) for r in doc.relations}
    adds: dict[str, list[str]] = {}
    converted: list[str] = []
    for key, value in doc.frontmatter.raw.items():
        pairs = relation_values_for(key, value)
        if pairs:
            converted.append(key)
        for bw_key, item in pairs:
            target = item[2 : item.index("]]")]
            if (bw_key, target) not in have:
                adds.setdefault(bw_key, []).append(item)
                have.add((bw_key, target))
    for bw_key, items in adds.items():
        text = add_items(text, bw_key, items)
    if drop:
        for key in converted:
            text = remove_field(text, key)
    return text


def identity_and_status(text: str, *, mint: Callable[[], str] = new_ulid) -> str:
    """Phase 2: mint missing ids, move non-standard status values to `stage`, fix list fields."""
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
