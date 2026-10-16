"""Status normalization shared by lint fixes and import (import.md §4)."""

from __future__ import annotations

STATUSES = ("active", "superseded", "archived")
_ARCHIVED = {"abandoned", "paused", "on hold", "cancelled", "canceled", "inactive"}
_SUPERSEDED = {"deprecated", "obsolete", "replaced", "outdated"}


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
