"""Episode documents: immutable inbox files (design doc 02 §9)."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Any

from brainwiki.format.fields import field as bw_field
from brainwiki.format.frontmatter import format_value
from brainwiki.ids import ulid_datetime

_FIELD_ORDER = (
    "id",
    "type",
    "agent",
    "session",
    "origin_turns",
    "device",
    "origin",
    "taint",
    "captured",
    "created",
    "topics",
    "dedupe",
    "source",
)
ORIGINS = ("owner", "agent", "import", "system")
TAINTS = ("true", "false", "unknown")
CAPTURED = ("mcp", "harvest", "cli", "import", "file")


@dataclass
class EpisodeContent:
    summary: str = ""
    claims: list[str] = field(default_factory=list)
    negative_findings: list[str] = field(default_factory=list)
    open_questions: list[str] = field(default_factory=list)


def episode_path(episodes_dir: str, ulid: str) -> str:
    when = ulid_datetime(ulid)
    return f"{episodes_dir}/{when:%Y}/{when:%m}/{ulid}.md"


def render_episode(fields: dict[str, Any], content: EpisodeContent) -> str:
    lines = ["---"]
    keys = [k for k in _FIELD_ORDER if fields.get(k) not in (None, "", [])]
    keys += sorted(k for k in fields if k not in _FIELD_ORDER and fields[k] not in (None, "", []))
    for key in keys:
        lines.append(f"{bw_field(key)}: {format_value(fields[key])}")
    lines.append("---")
    if content.summary.strip():
        lines.append(content.summary.strip())
    for heading, items in (
        ("Claims", content.claims),
        ("Negative findings", content.negative_findings),
        ("Open questions", content.open_questions),
    ):
        cleaned = [" ".join(i.split()) for i in items if i and i.strip()]
        if cleaned:
            lines.extend(["", f"## {heading}", *[f"- {i}" for i in cleaned]])
    return "\n".join(lines) + "\n"


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
