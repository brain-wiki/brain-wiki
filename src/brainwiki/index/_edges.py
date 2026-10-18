"""How each kind of edge reads, from either end, and in what order (index-and-search.md §3)."""

from __future__ import annotations

# rel -> (read from the note holding the link, read from the note it points to)
_LABELS: dict[str, tuple[str, str]] = {
    "superseded_by": ("superseded_by", "supersedes"),
    "conflicts_with": ("conflicts_with", "conflicts_with"),
    "depends_on": ("depends_on", "depended_on_by"),
    "part_of": ("part_of", "has_part"),
    "links_to": ("links_to", "linked_from"),
    "source": ("cites", "cited_by"),
}
# Order within a list of neighbors: guards first, then typed relations, plain links, citations.
PRIORITY: dict[str, int] = {rel: rank for rank, rel in enumerate(_LABELS)}


def edge_label(rel: str, outgoing: bool) -> str:
    """The name of an edge seen from one end: its holder (`outgoing`) or its target."""
    forward, backward = _LABELS.get(rel, (rel, rel))
    return forward if outgoing else backward
