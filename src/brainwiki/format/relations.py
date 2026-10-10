"""The `## Relations` grammar: five families, eight canonical verbs, aliases (design doc 02 §6.4)."""

from __future__ import annotations

import re
from dataclasses import dataclass, field

# verb -> (stored relation, flip): flip means the edge is stored from target to declaring note.
CANONICAL: dict[str, tuple[str, bool]] = {
    "part_of": ("part_of", False),
    "has_part": ("part_of", True),
    "depends_on": ("depends_on", False),
    "enables": ("depends_on", True),
    "conflicts_with": ("conflicts_with", False),
    "supersedes": ("supersedes", False),
    "superseded_by": ("supersedes", True),
    "related_to": ("related_to", False),
}
ALIASES: dict[str, str] = {
    "parent": "part_of",
    "child_of": "part_of",
    "member_of": "part_of",
    "in": "part_of",
    "contains": "has_part",
    "parent_of": "has_part",
    "requires": "depends_on",
    "builds_on": "depends_on",
    "uses": "depends_on",
    "caused_by": "depends_on",
    "drives": "enables",
    "causes": "enables",
    "supports": "enables",
    "unblocks": "enables",
    "contradicts": "conflicts_with",
    "unless": "conflicts_with",
    "invalidated_by": "conflicts_with",
    "refutes": "conflicts_with",
    "exception": "conflicts_with",
    "replaces": "supersedes",
    "obsoletes": "supersedes",
    "replaced_by": "superseded_by",
    "obsoleted_by": "superseded_by",
    "related": "related_to",
    "see_also": "related_to",
    "similar_to": "related_to",
    "analogous_to": "related_to",
}
GUARD_RELS = frozenset({"conflicts_with", "supersedes"})
SYMMETRIC_RELS = frozenset({"conflicts_with", "related_to"})
INVERSE: dict[str, str] = {
    "part_of": "has_part",
    "has_part": "part_of",
    "depends_on": "enables",
    "enables": "depends_on",
    "conflicts_with": "conflicts_with",
    "supersedes": "superseded_by",
    "superseded_by": "supersedes",
    "related_to": "related_to",
}

_LINE_RE = re.compile(
    r"^\s*[-*+]\s+(?P<verb>[A-Za-z_][\w-]*)\s+"
    r"(?P<target>!?\[\[[^\[\]]+\]\]|\[[^\]]*\]\([^)\s]+\))"
    r"(?:\s+\((?P<qual>[^)]*)\))?"
    r"(?:\s+(?:—|–|--|-|:)\s+(?P<note>.*?))?\s*$"
)
_WIKI_INNER = re.compile(r"^!?\[\[(?P<inner>[^\[\]]+)\]\]$")
_MD_INNER = re.compile(r"^\[(?P<label>[^\]]*)\]\((?P<href>[^)\s]+)\)$")


@dataclass
class Relation:
    line: int
    written_verb: str
    verb: str  # canonical verb as written from the declaring note's point of view
    rel: str  # stored relation family
    flip: bool
    target: str  # raw link target (without heading or label)
    label: str | None = None
    qualifier: str | None = None
    attrs: dict[str, str] = field(default_factory=dict)
    note: str | None = None
    is_alias: bool = False

    @property
    def is_guard(self) -> bool:
        return self.rel in GUARD_RELS

    @property
    def symmetric(self) -> bool:
        return self.rel in SYMMETRIC_RELS


@dataclass
class RelationError:
    line: int
    code: str
    message: str


def canonical_verb(word: str) -> tuple[str | None, bool]:
    lowered = word.lower().replace("-", "_")
    if lowered in CANONICAL:
        return lowered, False
    if lowered in ALIASES:
        return ALIASES[lowered], True
    return None, False


def parse_target(target: str) -> tuple[str, str | None]:
    """Return (link target without heading, label)."""
    wiki = _WIKI_INNER.match(target)
    if wiki:
        inner = wiki.group("inner")
        label = None
        if "|" in inner:
            inner, label = inner.split("|", 1)
        inner = inner.split("#", 1)[0]
        return inner.strip(), (label.strip() if label else None)
    md = _MD_INNER.match(target)
    if md:
        from urllib.parse import unquote

        href = unquote(md.group("href").split("#", 1)[0])
        return href.strip(), md.group("label") or None
    return target, None


def parse_qualifiers(raw: str | None) -> tuple[str | None, dict[str, str]]:
    if not raw:
        return None, {}
    qualifier = None
    attrs: dict[str, str] = {}
    for part in raw.split(","):
        part = part.strip()
        if not part:
            continue
        if "=" in part:
            key, value = part.split("=", 1)
            attrs[key.strip()] = value.strip()
        elif ": " in part or part.endswith(":"):
            key, value = part.split(":", 1)
            attrs[key.strip()] = value.strip()
        elif qualifier is None:
            qualifier = part
        else:
            attrs.setdefault("tags", "")
            attrs["tags"] = (attrs["tags"] + " " + part).strip()
    return qualifier, attrs


def parse_relation_line(text: str, line: int) -> Relation | RelationError:
    match = _LINE_RE.match(text)
    if not match:
        return RelationError(
            line,
            "BW301",
            "relation line does not parse: expected `- verb [[Target]] (qualifier) — note`",
        )
    written = match.group("verb")
    verb, is_alias = canonical_verb(written)
    if verb is None:
        return RelationError(line, "BW302", f"unknown relation verb {written!r}")
    target, label = parse_target(match.group("target"))
    qualifier, attrs = parse_qualifiers(match.group("qual"))
    if is_alias and qualifier is None:
        qualifier = written.lower()
    rel, flip = CANONICAL[verb]
    return Relation(
        line=line,
        written_verb=written,
        verb=verb,
        rel=rel,
        flip=flip,
        target=target,
        label=label,
        qualifier=qualifier,
        attrs=attrs,
        note=(match.group("note") or None),
        is_alias=is_alias,
    )


def format_relation(
    verb: str,
    target_link: str,
    *,
    qualifier: str | None = None,
    attrs: dict[str, str] | None = None,
    note: str | None = None,
) -> str:
    """Render one relation line. `target_link` is the text inside [[...]]."""
    parts = [f"- {verb} [[{target_link}]]"]
    quals = ([qualifier] if qualifier else []) + [
        f"{k}={v}" for k, v in (attrs or {}).items() if k != "tags"
    ]
    if quals:
        parts.append("(" + ", ".join(quals) + ")")
    line = " ".join(parts)
    if note:
        line += " — " + note.replace("\n", " ").strip()
    return line
