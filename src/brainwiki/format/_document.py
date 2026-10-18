"""Parse a Markdown note, topic page, or episode into its structured parts (brain-format.md §6).

Frontmatter holds metadata only; the body is free Markdown. brain-wiki reads from the body only
its headings and links, never what it means.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from brainwiki.format._fields import CLAIMS, LINK_FIELDS, as_items, item_lines, split_claim
from brainwiki.format._frontmatter import Frontmatter, split
from brainwiki.format._links import Link, extract_links, mask_code
from brainwiki.format._meta import strip_meta_comments

HEADING_RE = re.compile(r"^(?P<hashes>#{1,6})\s+(?P<text>.+?)\s*#*\s*$")
# Metadata fields whose values link to notes: (field, edge relation).
_LINK_FIELDS = tuple(LINK_FIELDS.items())


@dataclass
class Section:
    name: str  # lowercased heading text
    level: int
    heading_line: int  # 1-based
    end_line: int  # last line (inclusive) of the section content


@dataclass
class ParsedDoc:
    path: str
    text: str
    frontmatter: Frontmatter
    title: str
    headings: list[tuple[int, int, str]] = field(default_factory=list)  # (line, level, text)
    sections: list[Section] = field(default_factory=list)
    links: list[Link] = field(default_factory=list)  # body links
    meta_links: list[tuple[str, Link]] = field(default_factory=list)  # (relation, link)
    problems: list[tuple[int, str, str]] = field(default_factory=list)  # (line, code, message)
    body_text: str = ""
    line_count: int = 0

    @property
    def fm(self) -> dict[str, Any]:
        return self.frontmatter.data

    def section(self, name: str) -> Section | None:
        found = [s for s in self.sections if s.name == name and s.level == 2]
        return found[0] if found else None


def _stem(path: str) -> str:
    name = path.rsplit("/", 1)[-1]
    return name[:-3] if name.lower().endswith(".md") else name


def parse_document(path: str, text: str) -> ParsedDoc:
    fm = split(text)
    all_lines = text.splitlines()
    first_body = fm.body_start_line  # 1-based
    body_lines = all_lines[first_body - 1 :]
    masked = mask_code(body_lines)

    headings: list[tuple[int, int, str]] = []
    for offset, line in enumerate(masked):
        match = HEADING_RE.match(line)
        if match:
            headings.append(
                (first_body + offset, len(match.group("hashes")), match.group("text").strip())
            )

    last_line = len(all_lines)
    sections: list[Section] = []
    for idx, (line_no, level, heading) in enumerate(headings):
        end = last_line
        for later_line, later_level, _ in headings[idx + 1 :]:
            if later_level <= level:
                end = later_line - 1
                break
        sections.append(Section(heading.lower(), level, line_no, end))

    title = str(fm.data.get("title") or "").strip()
    if not title:
        h1 = next((h for h in headings if h[1] == 1), None)
        title = h1[2] if h1 else _stem(path)

    doc = ParsedDoc(
        path=path, text=text, frontmatter=fm, title=title, headings=headings, sections=sections
    )
    doc.line_count = last_line
    if fm.error:
        doc.problems.append((1, "BW101", fm.error))
    doc.links = extract_links(body_lines, first_body)
    legacy_text: list[str] = []
    if fm.present and not fm.error:
        for key, rel in _LINK_FIELDS:
            values = as_items(fm.raw.get(key))
            for value, line in zip(values, item_lines(text, key, len(values)), strict=True):
                if isinstance(value, str):
                    doc.meta_links += [(rel, link) for link in extract_links([value], line)]
        # Claims of an unconverted format 2 note stay searchable until `brain lint --fix`.
        legacy_text = [
            split_claim(v)[0] for v in as_items(fm.raw.get(CLAIMS)) if isinstance(v, str)
        ]
    doc.body_text = strip_meta_comments("\n".join([*body_lines, *legacy_text]))
    return doc
