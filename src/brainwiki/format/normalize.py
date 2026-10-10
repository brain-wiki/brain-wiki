"""Normalization tables shared by lint fixes and import (design doc 09 §4)."""

from __future__ import annotations

import re
from typing import Any

STATUSES = ("active", "superseded", "archived")
_ARCHIVED = {"abandoned", "paused", "on hold", "cancelled", "canceled", "inactive"}
_SUPERSEDED = {"deprecated", "obsolete", "replaced", "outdated"}

# property (lowercase) -> (verb, qualifier)
RELATION_PROPERTIES: dict[str, tuple[str, str | None]] = {
    "parent": ("part_of", None),
    "up": ("part_of", None),
    "part_of": ("part_of", None),
    "topic": ("part_of", None),
    "moc": ("part_of", None),
    "children": ("has_part", None),
    "down": ("has_part", None),
    "has_part": ("has_part", None),
    "related": ("related_to", None),
    "see_also": ("related_to", None),
    "links": ("related_to", None),
    "depends_on": ("depends_on", None),
    "requires": ("depends_on", None),
    "prerequisite": ("depends_on", None),
    "supersedes": ("supersedes", None),
    "replaces": ("supersedes", None),
    "superseded_by": ("superseded_by", None),
    "replaced_by": ("superseded_by", None),
    "next": ("related_to", "next"),
    "prev": ("related_to", "previous"),
    "previous": ("related_to", "previous"),
    "source": ("depends_on", "source"),
    "sources": ("depends_on", "source"),
}
_WIKILINK = re.compile(r"\[\[([^\[\]\n]+?)\]\]")


def map_status(value: str) -> tuple[str, str | None]:
    """Map a free-form status to (status, stage). The original value is kept as the stage."""
    lowered = value.strip().lower()
    if lowered in STATUSES:
        return lowered, None
    if lowered in _ARCHIVED:
        return "archived", value
    if lowered in _SUPERSEDED:
        return "superseded", value
    return "active", value


def property_links(value: Any) -> list[str]:
    """Wikilink targets (inner text) held by a frontmatter value: a list, or a string of links."""
    items = value if isinstance(value, list) else [value]
    found: list[str] = []
    for item in items:
        if isinstance(item, str):
            found += [m.strip() for m in _WIKILINK.findall(item)]
    return found


def relation_lines_for(key: str, value: Any) -> list[str]:
    mapping = RELATION_PROPERTIES.get(key.lower())
    if not mapping:
        return []
    verb, qualifier = mapping
    suffix = f" ({qualifier})" if qualifier else ""
    return [f"- {verb} [[{target}]]{suffix}" for target in property_links(value)]
