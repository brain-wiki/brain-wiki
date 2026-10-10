"""Text-level normalization shared by overlay phases and `--into` (design doc 09 §4)."""

from __future__ import annotations

from brainwiki.format.document import parse_document
from brainwiki.format.edit import append_to_section
from brainwiki.format.frontmatter import remove_field, set_fields
from brainwiki.format.normalize import STATUSES, map_status, relation_lines_for
from brainwiki.ids import new_ulid

_ORDER = ("id", "type", "title")


def convert_relations(text: str, *, drop: bool = False) -> str:
    """Phase 1: relation-like frontmatter becomes `## Relations` lines (properties kept unless `drop`)."""
    doc = parse_document("x.md", text)
    if doc.frontmatter.error:
        return text
    existing = {" ".join(line.split()) for line in text.splitlines()}
    lines: list[str] = []
    converted: list[str] = []
    for key, value in doc.fm.items():
        new = [
            line
            for line in relation_lines_for(key, value)
            if " ".join(line.split()) not in existing
        ]
        if relation_lines_for(key, value):
            converted.append(key)
        lines += new
    if lines:
        text = append_to_section(text, "relations", lines)
    if drop:
        for key in converted:
            text = remove_field(text, key)
    return text


def identity_and_status(text: str) -> str:
    """Phase 2: mint missing ids, move non-standard status values to `stage`, fix list fields."""
    doc = parse_document("x.md", text)
    if doc.frontmatter.error:
        return text
    values: dict[str, object] = {}
    if doc.fm.get("id") is None:
        values["id"] = new_ulid()
    status = doc.fm.get("status")
    if status is not None and str(status) not in STATUSES:
        new_status, stage = map_status(str(status))
        values["status"] = new_status
        if stage and doc.fm.get("stage") is None:
            values["stage"] = stage
    for key in ("tags", "aliases"):
        raw = doc.fm.get(key)
        if isinstance(raw, str):
            values[key] = [p.strip().lstrip("#") for p in raw.split(",") if p.strip()]
    return set_fields(text, values, order_first=_ORDER) if values else text
