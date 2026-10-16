"""Parsers and line-preserving writers for the brain format (design doc 02)."""

from __future__ import annotations

from brainwiki.format._agents_md import extract_block, replace_block
from brainwiki.format._claims import Claim
from brainwiki.format._document import ParsedDoc, parse_document
from brainwiki.format._edit import append_to_section, replace_line_matching
from brainwiki.format._episode import (
    CAPTURED,
    INPUTS,
    ORIGINS,
    EpisodeContent,
    episode_path,
    now_iso,
    render_episode,
)
from brainwiki.format._fields import (
    ALIAS_KEYS,
    FIELDS,
    add_items,
    as_items,
    canonical_item,
    claim_value,
    field,
    is_format1,
    item_lines,
    list_values,
    move_item,
    quote,
    relation_value,
    replace_item,
    to_format2,
)
from brainwiki.format._frontmatter import format_value, remove_field, set_fields, split
from brainwiki.format._links import mask_code
from brainwiki.format._meta import format_meta, split_meta, strip_meta_comments
from brainwiki.format._normalize import (
    RELATION_PROPERTIES,
    STATUSES,
    map_status,
    property_links,
    relation_values_for,
)
from brainwiki.format._relations import (
    INVERSE,
    SYMMETRIC_RELS,
    canonicalize_line,
)
from brainwiki.format._rules import RULES_HEADER, format_rule, parse_rules

__all__ = [
    "ALIAS_KEYS",
    "CAPTURED",
    "Claim",
    "EpisodeContent",
    "FIELDS",
    "INPUTS",
    "INVERSE",
    "ORIGINS",
    "ParsedDoc",
    "RELATION_PROPERTIES",
    "RULES_HEADER",
    "STATUSES",
    "SYMMETRIC_RELS",
    "add_items",
    "append_to_section",
    "as_items",
    "canonical_item",
    "canonicalize_line",
    "claim_value",
    "episode_path",
    "extract_block",
    "field",
    "format_meta",
    "format_rule",
    "format_value",
    "is_format1",
    "item_lines",
    "list_values",
    "map_status",
    "mask_code",
    "move_item",
    "now_iso",
    "parse_document",
    "parse_rules",
    "property_links",
    "quote",
    "relation_value",
    "relation_values_for",
    "remove_field",
    "render_episode",
    "replace_block",
    "replace_item",
    "replace_line_matching",
    "set_fields",
    "split",
    "split_meta",
    "strip_meta_comments",
    "to_format2",
]
