"""Parse a Markdown note, hub, or episode into its structured parts."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from brainwiki.format.claims import Claim, parse_claim_block
from brainwiki.format.frontmatter import Frontmatter, split
from brainwiki.format.links import Link, extract_links, mask_code
from brainwiki.format.meta import strip_meta_comments
from brainwiki.format.relations import Relation, RelationError, parse_relation_line

HEADING_RE = re.compile(r"^(?P<hashes>#{1,6})\s+(?P<text>.+?)\s*#*\s*$")
CLAIMS = "claims"
RELATIONS = "relations"
_LIST_ITEM_RE = re.compile(r"^\s*[-*+]\s+\S")


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
    claims: list[Claim] = field(default_factory=list)
    relations: list[Relation] = field(default_factory=list)
    links: list[Link] = field(default_factory=list)
    problems: list[tuple[int, str, str]] = field(default_factory=list)  # (line, code, message)
    body_text: str = ""
    history_text: str = ""
    line_count: int = 0

    @property
    def fm(self) -> dict[str, Any]:
        return self.frontmatter.data

    def section(self, name: str) -> Section | None:
        found = [s for s in self.sections if s.name == name and s.level == 2]
        return found[0] if found else None

    def section_count(self, name: str) -> int:
        return sum(1 for s in self.sections if s.name == name and s.level == 2)


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

    def lines_of(section: Section) -> list[tuple[int, str]]:
        return [
            (n, all_lines[n - 1]) for n in range(section.heading_line + 1, section.end_line + 1)
        ]

    relation_lines: set[int] = set()
    history: list[str] = []
    superseded_lines: set[int] = set()
    claims_section = doc.section(CLAIMS)
    if claims_section:
        claims, problems = parse_claim_block(lines_of(claims_section))
        doc.claims = claims
        for line_no, message in problems:
            doc.problems.append((line_no, "BW201", message))
        for claim in claims:
            if claim.status != "active":
                history.append(claim.text)
                superseded_lines.update(range(claim.line, claim.last_line + 1))
    relations_section = doc.section(RELATIONS)
    if relations_section:
        for line_no, line in lines_of(relations_section):
            if not _LIST_ITEM_RE.match(line):
                continue
            parsed = parse_relation_line(line, line_no)
            relation_lines.add(line_no)
            if isinstance(parsed, RelationError):
                doc.problems.append((parsed.line, parsed.code, parsed.message))
            else:
                doc.relations.append(parsed)

    doc.links = extract_links(body_lines, first_body, skip_lines=relation_lines)

    body_for_index = [
        line for n, line in enumerate(body_lines, start=first_body) if n not in superseded_lines
    ]
    doc.body_text = strip_meta_comments("\n".join(body_for_index))
    doc.history_text = "\n".join(history)
    return doc
