"""The derived SQLite index and the queries over it (docs/design/index-and-search.md)."""

from __future__ import annotations

from brainwiki.index import _written as written
from brainwiki.index._brains import format_brain_list, list_brains
from brainwiki.index._db import open_index
from brainwiki.index._guards import stale_links
from brainwiki.index._neighbors import format_neighbors_text, neighbors
from brainwiki.index._orient import agents_block, orient, topic_rows
from brainwiki.index._read import format_read_text, read, resolve_target
from brainwiki.index._resolver import LinkNamer, Resolver, link_text, norm_key
from brainwiki.index._scanner import classify, scan
from brainwiki.index._search import (
    format_search_text,
    known_topics,
    node_filters,
    parse_cursor,
    search,
)
from brainwiki.index._topics import TopicTree, hub_name, slugify, topic_tree

__all__ = [
    "LinkNamer",
    "Resolver",
    "TopicTree",
    "agents_block",
    "classify",
    "format_brain_list",
    "format_neighbors_text",
    "format_read_text",
    "format_search_text",
    "hub_name",
    "known_topics",
    "link_text",
    "list_brains",
    "neighbors",
    "node_filters",
    "norm_key",
    "open_index",
    "orient",
    "parse_cursor",
    "read",
    "resolve_target",
    "scan",
    "search",
    "slugify",
    "stale_links",
    "topic_rows",
    "topic_tree",
    "written",
]
