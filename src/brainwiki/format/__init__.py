"""Parsers and line-preserving writers for the brain format (brain-format.md)."""

from __future__ import annotations

from brainwiki.format._agents_md import extract_block, replace_block
from brainwiki.format._convert import (
    NOTE_FIELDS,
    SOURCES,
    SUPERSEDED_BY,
    legacy,
    mark_superseded,
    to_format3,
)
from brainwiki.format._document import ParsedDoc, parse_document
from brainwiki.format._edit import append_to_section
from brainwiki.format._episode import (
    CAPTURED,
    INPUTS,
    ORIGINS,
    PATTERNS,
    EpisodeContent,
    episode_path,
    now_iso,
    render_episode,
)
from brainwiki.format._fields import (
    FIELDS,
    add_items,
    field,
    item_lines,
    list_values,
    quote,
)
from brainwiki.format._frontmatter import format_value, set_fields, split
from brainwiki.format._links import mask_code
from brainwiki.format._meta import split_meta, strip_meta_comments
from brainwiki.format._normalize import STATUSES, map_status
from brainwiki.format._rules import RULES_HEADER, format_rule, parse_rules
from brainwiki.format._session import parse_session_url, session_url

__all__ = [
    "CAPTURED",
    "FIELDS",
    "INPUTS",
    "NOTE_FIELDS",
    "ORIGINS",
    "PATTERNS",
    "RULES_HEADER",
    "SOURCES",
    "STATUSES",
    "SUPERSEDED_BY",
    "EpisodeContent",
    "ParsedDoc",
    "add_items",
    "append_to_section",
    "episode_path",
    "extract_block",
    "field",
    "format_rule",
    "format_value",
    "item_lines",
    "legacy",
    "list_values",
    "map_status",
    "mark_superseded",
    "mask_code",
    "now_iso",
    "parse_document",
    "parse_rules",
    "parse_session_url",
    "quote",
    "render_episode",
    "replace_block",
    "session_url",
    "set_fields",
    "split",
    "split_meta",
    "strip_meta_comments",
    "to_format3",
]
