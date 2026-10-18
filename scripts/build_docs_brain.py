"""Build docs-brain/: the brain-wiki docs as a brain-wiki brain, organized by what each piece is.

The topic tree (TREE) follows the kind of content: `overview` (goals, concepts, prior art);
`experience` (scenarios, the user guide); `design` (the design documents, grouped into core,
surfaces, and quality, and the decisions); `roadmap` (milestones, open questions,
verification items); `proposals`, one topic each; and `ideas`.

A note is a page worth opening on its own, so notes follow size (NOTE_LIMIT). A document that
fits is one note; a longer one is one note per `##` section, and a `###` subsection gets its own
note only when its `##` section is still too long. A short document that would fill a topic of
its own becomes a note in the parent topic, and one whose topic holds entities (terms,
milestones, questions) puts its text in the topic's page. Every row of an ID table people look
up by id (goals, scenarios, milestones, questions, verification items), every glossary term,
and every idea becomes a typed note of its own, filed in the topic for its kind; requirement
and threat tables stay tables, since they are read together. Each decision file is one decision
note; one a later decision replaced is `status: superseded` with `bw-superseded_by`. Links
between documents become wikilinks. The docs stay the source of truth, so the brain is
regenerated, never edited by hand.

    uv run scripts/build_docs_brain.py           # write docs-brain/
    uv run scripts/build_docs_brain.py --check   # change nothing; exit 1 if docs-brain/ is stale
"""

from __future__ import annotations

import argparse
import difflib
import hashlib
import os
import posixpath
import re
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs-brain"
NAME = "brain-wiki-docs"
DESCRIPTION = "The brain-wiki design and user guide, generated from docs/ (do not edit by hand)"
ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
EPOCH_MS = 1_790_000_000_000  # a fixed time for generated ids, so they never change
HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")
NUMBERED = re.compile(r"^(\d+(?:\.\d+)*)\.?\s+(.*)$")
LINK = re.compile(r"(?<!!)\[([^\]\n]+)\]\(([^)\s]+)\)")
TABLE_RULE = re.compile(r"^\|[\s:|-]+\|$")
CELL_SPLIT = re.compile(r"(?<!\\)\|")
ROW_ID = re.compile(r"^(T-|[A-Z])(\d+)([a-z]?)$")
MENTION = re.compile(r"\b([DGMQ]\d{1,2})\b")  # ids unambiguous in prose (not S3, R2, …)
DESIGN = "docs/design"
OVERVIEW = f"{DESIGN}/overview.md"
GLOSSARY = f"{DESIGN}/glossary.md"
DECISIONS = "docs/decision"
PROPOSALS = "docs/proposal/README.md"
IDEAS = "docs/roadmap/ideas.md"
# Up to this many bytes, a document (or a `##` section of a longer one) is one note.
NOTE_LIMIT = 10 * 1024

# The topic tree, in the order topic pages list it: (slug, parent, title, description). An empty
# title or description comes from the document that fills the topic (its `#` heading, and its row
# in the design README's reading order).
TREE: list[tuple[str, str | None, str, str]] = [
    (
        "overview",
        None,
        "Overview",
        "What brain-wiki is and why: the problem, principles, goals, concepts, and prior art",
    ),
    ("goals", "overview", "Goals", "What brain-wiki must achieve, each with how it is measured"),
    ("concepts", "overview", "Concepts", "The vocabulary, one note per term"),
    ("prior-art", "overview", "", "What brain-wiki borrows from other projects, and the sources"),
    (
        "experience",
        None,
        "User experience",
        "What using brain-wiki is like: the journeys it serves, and the user guide",
    ),
    (
        "scenarios",
        "experience",
        "Scenarios",
        "User and agent journeys, each with the design that serves it",
    ),
    (
        "user-guide",
        "experience",
        "User guide",
        "How to install, connect, use, and maintain brain-wiki",
    ),
    (
        "design",
        None,
        "Technical design",
        "How brain-wiki works and why: the design documents and the decisions",
    ),
    (
        "core",
        "design",
        "Core engine",
        "The brain format, configuration and storage, the index, the write path, and lint",
    ),
    ("brain-format", "core", "", ""),
    ("config-and-storage", "core", "", ""),
    ("index-and-search", "core", "", ""),
    ("write-path", "core", "", ""),
    ("lint-and-reports", "core", "", ""),
    (
        "surfaces",
        "design",
        "Interfaces and integrations",
        "How people and agents reach a brain: the CLI and MCP tools, agent hosts, import, "
        "the visualizer, and onboarding",
    ),
    ("cli-and-mcp", "surfaces", "", ""),
    ("agent-integrations", "surfaces", "", ""),
    (
        "hosts",
        "agent-integrations",
        "Agent hosts",
        "One page per host: install, instructions, harvest, and verification",
    ),
    ("import", "surfaces", "", ""),
    ("visualizer", "surfaces", "", ""),
    ("skills-and-onboarding", "surfaces", "", ""),
    (
        "quality",
        "design",
        "Quality and safety",
        "Security and privacy, the eval bench, and engineering practice",
    ),
    ("security-and-privacy", "quality", "", ""),
    ("eval-bench", "quality", "", ""),
    ("engineering", "quality", "", ""),
    (
        "decisions",
        "design",
        "Decisions",
        "What was decided, what was rejected, and where the design argues it",
    ),
    ("roadmap", None, "", "What is built, what comes next, and what is still open"),
    ("milestones", "roadmap", "", "Implementation milestones and the build status"),
    ("questions", "roadmap", "", "Decisions needed from the maintainer"),
    (
        "verification",
        "roadmap",
        "",
        "Assumptions about hosts and dependencies to check, and what checking found",
    ),
    ("ideas", "roadmap", "", "Ideas without a design yet, one note each, grouped by area"),
    ("proposals", None, "Proposals", "Designs not built yet, one topic each"),
]
# Documents that fill a topic of a different name; any other design document fills the topic
# named after its file.
DOCS = {
    OVERVIEW: "overview",
    GLOSSARY: "concepts",
    f"{DESIGN}/README.md": "design",
    f"{DECISIONS}/README.md": "decisions",
    "docs/roadmap/README.md": "roadmap",
    "docs/roadmap/milestones.md": "milestones",
    "docs/roadmap/open-questions.md": "questions",
    "docs/roadmap/verification.md": "verification",
    IDEAS: "ideas",
    PROPOSALS: "proposals",
}
# Sections filed in a topic other than their document's: (document, anchor) -> topic. Their
# subsections follow them.
SECTION_TOPICS = {
    (OVERVIEW, "3-goals"): "goals",
    (OVERVIEW, "6-users-and-scenarios"): "scenarios",
}
# ID tables whose rows become notes: id prefix -> (note type, topic or None for the table's own,
# the document). Requirement and threat tables (C, R, W, I, T, O, P) stay tables.
ROW_FAMILIES = {
    "G": ("goal", "goals", OVERVIEW),
    "S": ("scenario", "scenarios", OVERVIEW),
    "M": ("milestone", None, "docs/roadmap/milestones.md"),
    "Q": ("question", None, "docs/roadmap/open-questions.md"),
    "T-": ("verification", None, "docs/roadmap/verification.md"),
}
# Folders whose documents become one note each (with their sections below it when long):
# folder -> (topic, note type, stem prefix).
GROUPS = {
    "docs/user": ("user-guide", "guide", "user"),
    f"{DESIGN}/hosts": ("hosts", "design", "host"),
}


def ulid(key: str) -> str:
    """A valid, stable ULID for `key`."""
    value = (EPOCH_MS << 80) | int.from_bytes(hashlib.sha256(key.encode()).digest()[:10], "big")
    return "".join(ALPHABET[(value >> (5 * i)) & 31] for i in reversed(range(26)))


def github_anchor(text: str) -> str:
    text = re.sub(r"[`*_~]", "", text).strip().lower()
    text = re.sub(r"[^\w\- ]", "", text, flags=re.UNICODE)
    return text.replace(" ", "-")


def plain(text: str) -> str:
    text = LINK.sub(lambda m: m.group(1), text)
    return re.sub(r"[`*]", "", text).strip()


def yaml_str(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def short(text: str, width: int = 72) -> str:
    text = plain(text)
    for stop in (". ", "; ", ": "):
        if stop in text[: width + 1]:
            text = text.split(stop, 1)[0]
            break
    if len(text) > width:
        text = text[:width].rsplit(" ", 1)[0] + "…"
    return text.rstrip(".")


def capital(text: str) -> str:
    return text[:1].upper() + text[1:]


# -- parsing ---------------------------------------------------------------------------------


@dataclass
class Section:
    doc: Doc
    level: int
    heading: str  # the heading text as written
    number: str | None
    title: str
    anchor: str
    lines: list[str] = field(default_factory=list)
    children: list[Section] = field(default_factory=list)
    parent: Section | None = None
    stem: str = ""
    note_title: str = ""
    topic: str = ""
    rows: list[Row] = field(default_factory=list)
    inline: bool = False  # its text is in another note (its document's, or its parent section's)

    @property
    def size(self) -> int:
        own = sum(len(line.encode("utf-8")) + 1 for line in self.lines)
        return own + sum(c.size for c in self.children)


@dataclass
class Row:
    """One entity from a table: an ID row, a glossary term, or an idea."""

    id: str  # D3, S2b, T-4; the term; the idea's title
    kind: str  # note type
    topic: str  # topic slug, or "" for the table's own
    cells: dict[str, str]  # column -> text; the first is the note's opening paragraph
    section: Section
    stem: str
    title: str
    aliases: list[str] = field(default_factory=list)


@dataclass
class Doc:
    path: Path  # relative to ROOT
    topic: str
    title: str
    key: str  # stem prefix
    description: str = ""
    intro: list[str] = field(default_factory=list)  # lines between the title and the first `##`
    lead: Section | None = None  # the intro, for tables in it
    sections: list[Section] = field(default_factory=list)
    anchors: dict[str, Section] = field(default_factory=dict)
    note: Section | None = None  # the document's own note (GROUPS, decisions, short documents)
    # decision: one decision note; note: one note holds the text; page: the topic's page holds
    # it; split: one note per `##` section (under the document's note, or its topic's page)
    layout: str = "split"
    size: int = 0
    note_type: str = "reference"

    @property
    def posix(self) -> str:
        return self.path.as_posix()


def parse(path: Path, topic: str, key: str) -> Doc:
    text = (ROOT / path).read_text(encoding="utf-8")
    doc = Doc(path, topic, "", key, size=len(text.encode("utf-8")))
    fence = None
    current: Section | None = None
    top: Section | None = None
    for line in text.splitlines():
        marker = re.match(r"^\s*(```+|~~~+)", line)
        if marker:
            fence = (
                None
                if fence and marker.group(1).startswith(fence[:3])
                else (fence or marker.group(1))
            )
        match = None if fence or marker else HEADING.match(line)
        if match and len(match.group(1)) == 1 and not doc.title:
            doc.title = match.group(2)
            continue
        if match and len(match.group(1)) in (2, 3):
            level, heading = len(match.group(1)), match.group(2)
            numbered = NUMBERED.match(heading)
            section = Section(
                doc,
                level,
                heading,
                numbered.group(1) if numbered else None,
                numbered.group(2) if numbered else heading,
                github_anchor(heading),
            )
            if level == 2 or top is None:
                doc.sections.append(section)
                top = section
            else:
                section.parent = top
                top.children.append(section)
            doc.anchors[section.anchor] = section
            current = section
            continue
        if match and current is not None:
            doc.anchors[github_anchor(match.group(2))] = current
        if current is not None:
            current.lines.append(line)
        elif doc.title:
            doc.intro.append(line)
    doc.lead = Section(doc, 1, doc.title, None, doc.title, "", lines=list(doc.intro), topic=topic)
    return doc


def cells_of(line: str) -> list[str] | None:
    if not line.startswith("|"):
        return None
    return [c.strip().replace("\\|", "|") for c in CELL_SPLIT.split(line.strip().strip("|"))]


def collect_rows(section: Section) -> None:
    """Turn the entity rows of the section's tables into Rows, and drop the table from the
    section's text when nothing else is left in it."""
    kept: list[str] = []
    header: list[str] | None = None
    for line in section.lines:
        cells = cells_of(line)
        if cells is None:
            header = None
            kept.append(line)
            continue
        if header is None:
            header = cells
            kept.append(line)
            continue
        rows = None if TABLE_RULE.match(line) else _rows(section, header, cells)
        if rows is None:
            kept.append(line)
        else:
            section.rows += rows
    if section.rows:
        section.lines = [
            line
            for i, line in enumerate(kept)
            if not (line.startswith("|") and _table_without_rows(kept, i))
        ]


def _rows(section: Section, header: list[str], cells: list[str]) -> list[Row] | None:
    doc = section.doc.posix
    first = header[0].strip("* ").lower()
    if doc == GLOSSARY and first == "term":
        term = plain(cells[0])
        return [
            Row(
                term,
                "concept",
                "concepts",
                {"Meaning": cells[1]},
                section,
                stem=f"concept-{github_anchor(term)}",
                title=capital(term),
                aliases=[term] if capital(term) != term else [],
            )
        ]
    if doc == IDEAS and first == "area":
        return _ideas(section, dict(zip(header, cells, strict=False)))
    match = ROW_ID.match(cells[0])
    if not match:
        return None
    family = ROW_FAMILIES.get(match.group(1))
    if family is None or family[2] != doc:
        return None
    kind, topic, _ = family
    rid = cells[0]
    values = dict(zip(header[1:], cells[1:], strict=False))
    first_cell = next(iter(values.values()), "")
    return [
        Row(
            rid,
            kind,
            topic or "",
            values,
            section,
            stem=rid.lower(),
            title=f"{rid}: {short(first_cell)}",
            aliases=[rid],
        )
    ]


def _split_ideas(text: str) -> list[str]:
    """A backlog cell holds several ideas separated by `;` outside parentheses and code."""
    parts, current, depth, code = [], "", 0, False
    for ch in text:
        if ch == "`":
            code = not code
        elif not code and ch in "([":
            depth += 1
        elif not code and ch in ")]":
            depth -= 1
        if ch == ";" and depth == 0 and not code:
            parts.append(current)
            current = ""
        else:
            current += ch
    parts.append(current)
    return [p.strip() for p in parts if p.strip()]


def _idea_title(text: str) -> str:
    title = plain(text)
    for stop in (" (", ": "):
        if stop in title:
            title = title.split(stop, 1)[0]
    for stop in (", ", " with "):
        if len(title) > 60 and stop in title:
            title = title.split(stop, 1)[0]
    title = short(title, 90)
    return title if text.startswith("`") else capital(title)  # a command keeps its case


def _slug(text: str, words: int = 6) -> str:
    return "-".join(re.findall(r"[a-z0-9]+", plain(text).lower())[:words])


def _ideas(section: Section, row: dict[str, str]) -> list[Row]:
    area = plain(row.get("Area", ""))
    out = []
    for text in _split_ideas(row.get("Idea", "")):
        title = _idea_title(text)
        cells = {"Idea": capital(text), "Area": area}
        if row.get("Related design", "—") not in ("", "—"):
            cells["Related design"] = row["Related design"]
        stem = f"idea-{_slug(title)}"
        out.append(Row(title, "idea", "ideas", cells, section, stem=stem, title=title))
    return out


def _table_without_rows(lines: list[str], i: int) -> bool:
    start = i
    while start > 0 and lines[start - 1].startswith("|"):
        start -= 1
    end = i
    while end + 1 < len(lines) and lines[end + 1].startswith("|"):
        end += 1
    return end - start <= 1  # only the header and the rule are left


def row_key(row: Row) -> tuple:
    match = ROW_ID.match(row.id)
    if match:
        return (match.group(1), int(match.group(2)), match.group(3))
    return ("", 0, row.title.lower())


# -- rendering -------------------------------------------------------------------------------


@dataclass
class Topic:
    slug: str
    parent: str | None
    title: str
    description: str
    source: str = "docs/"
    intro: list[str] = field(default_factory=list)
    entries: list[tuple[str | None, str, int]] = field(default_factory=list)  # (stem, text, depth)


class Brain:
    def __init__(self) -> None:
        self.docs: dict[str, Doc] = {}  # posix path -> Doc
        self.files: dict[str, str] = {}
        self.mentions: dict[str, tuple[str, str]] = {}  # D5, M3, … -> (stem, title)
        self.topics: dict[str, Topic] = {}

    def folder(self, slug: str) -> str:
        parts = []
        while slug:
            parts.append(slug)
            slug = self.topics[slug].parent or ""
        return "topics/" + "/".join(reversed(parts))

    def link(self, doc: Doc, href: str, label: str) -> str:
        if re.match(r"^[a-z]+://", href) or href.startswith("mailto:"):
            return f"[{label}]({href})"
        target, _, anchor = href.partition("#")
        path = (
            doc.posix
            if not target
            else posixpath.normpath(posixpath.join(doc.path.parent.as_posix(), target))
        )
        other = self.docs.get(path)
        if other is None:
            return label
        if anchor and anchor in other.anchors:
            stem = other.anchors[anchor].stem  # the note that holds the section
        else:
            stem = other.note.stem if other.note else other.topic
        return f"[[{stem}|{label}]]"

    def body(self, doc: Doc, lines: list[str], *, demote: bool = True) -> list[str]:
        """Note text from document lines: links become wikilinks, and with `demote`,
        sub-headings stay below the `##` sections the note adds (Items, Related)."""
        out, fence = [], None
        for line in lines:
            marker = re.match(r"^\s*(```+|~~~+)", line)
            if marker:
                fence = (
                    None
                    if fence and marker.group(1).startswith(fence[:3])
                    else (fence or marker.group(1))
                )
                out.append(line)
                continue
            if fence:
                out.append(line)
                continue
            heading = HEADING.match(line)
            if heading and demote:
                line = "#" * max(3, len(heading.group(1)) - 1) + " " + heading.group(2)
            parts = re.split(r"(`[^`]*`)", line)
            converted = "".join(
                p
                if p.startswith("`")
                else LINK.sub(lambda m: self.link(doc, m.group(2), m.group(1)), p)
                for p in parts
            )
            if line.lstrip().startswith("|"):  # a bare pipe would end the table cell
                converted = re.sub(r"\[\[([^\]|]+)\|", lambda m: f"[[{m.group(1)}\\|", converted)
            out.append(converted)
        while out and not out[0].strip():
            out.pop(0)
        while out and not out[-1].strip():
            out.pop()
        return out

    def related(self, text: str, own: str) -> list[str]:
        """Links to the ids `text` mentions (D5, G2, M3, Q4), other than `own`."""
        mentions = {m for m in MENTION.findall(text) if m != own and m in self.mentions}
        return [
            f"- [[{self.mentions[m][0]}]]: {self.mentions[m][1]}"
            for m in sorted(mentions, key=lambda m: (m[0], int(m[1:])))
        ]

    def note(
        self,
        topic: str,
        stem: str,
        *,
        key: str,
        kind: str,
        title: str,
        source: str,
        body: list[str],
        related: list[str] | None = None,
        aliases: list[str] | None = None,
        stage: str | None = None,
        superseded_by: str | None = None,
    ) -> None:
        fm = ["---", f"id: {ulid(key)}", f"type: {kind}", f"title: {yaml_str(title)}"]
        if superseded_by:
            fm.append("status: superseded")
        if aliases:
            fm.append("aliases: [" + ", ".join(yaml_str(a) for a in aliases) + "]")
        fm.append(f"source: {yaml_str(source)}")
        if stage:
            fm.append(f"bw-stage: {stage}")
        if superseded_by:
            fm.append(f"bw-superseded_by: {yaml_str(f'[[{superseded_by}]]')}")
        text = [*fm, "---", f"# {title}", ""]
        if body:
            text += [*body, ""]
        if related:
            text += ["## Related", *related, ""]
        rel = f"{self.folder(topic)}/{stem}.md"
        assert rel not in self.files, f"two notes at {rel}"
        self.files[rel] = "\n".join(text).rstrip("\n") + "\n"


def name_sections(doc: Doc, sections: list[Section]) -> None:
    for s in sections:
        s.stem = f"{doc.key}-{s.anchor}"
        name_sections(doc, s.children)


def walk(sections: list[Section]):
    for s in sections:
        yield s
        yield from walk(s.children)


def load_docs(brain: Brain) -> list[Doc]:
    docs: list[Doc] = []

    def add(path: Path, topic: str, key: str, note_type: str) -> Doc:
        doc = parse(path.relative_to(ROOT), topic, key)
        doc.note_type = note_type
        docs.append(doc)
        return doc

    for path in sorted((ROOT / DESIGN).glob("*.md")):
        rel = path.relative_to(ROOT).as_posix()
        add(
            path,
            DOCS.get(rel, path.stem),
            "design" if path.stem == "README" else path.stem,
            "design",
        )
    for folder, (topic, note_type, prefix) in GROUPS.items():
        for path in sorted((ROOT / folder).glob("*.md")):
            doc = add(path, topic, f"{prefix}-{path.stem.lower()}", note_type)
            doc.note = Section(doc, 1, doc.title, None, doc.title, "", stem=doc.key)
    for path in sorted((ROOT / "docs/roadmap").glob("*.md")):
        rel = path.relative_to(ROOT).as_posix()
        key = "roadmap" if path.stem == "README" else f"roadmap-{path.stem}"
        add(path, DOCS[rel], key, "reference")
    add(ROOT / DECISIONS / "README.md", "decisions", "decisions", "reference")
    for path in sorted((ROOT / DECISIONS).glob("d[0-9]*.md")):
        doc = add(path, "decisions", path.stem, "decision")
        doc.note = Section(doc, 1, doc.title, None, doc.title, "", stem=doc.key)
        doc.layout = "decision"
    add(ROOT / PROPOSALS, "proposals", "proposals", "reference")
    for path in sorted((ROOT / "docs/proposal").glob("*.md")):
        if path.name != "README.md":
            add(path, f"proposal-{path.stem}", f"proposal-{path.stem}", "proposal")
    for doc in docs:
        brain.docs[doc.posix] = doc
        name_sections(doc, doc.sections)
    return docs


def _reading_order() -> dict[str, str]:
    """Design document path -> what it settles, from the design README's table."""
    out = {}
    for line in (ROOT / DESIGN / "README.md").read_text(encoding="utf-8").splitlines():
        cells = cells_of(line) or []
        for i, cell in enumerate(cells[:-1]):
            match = LINK.fullmatch(cell)
            if match and match.group(2).endswith(".md"):
                out[posixpath.normpath(f"{DESIGN}/{match.group(2)}")] = cells[i + 1]
                break
    return out


# Documents whose topic holds entity notes (terms, ideas, milestones, …); short ones put their
# text in the topic's page rather than in a note beside those entities.
ENTITY_DOCS = {GLOSSARY, IDEAS, *(family[2] for family in ROW_FAMILIES.values())}


def choose_layout(brain: Brain, doc: Doc) -> None:
    """How the document becomes notes (Doc.layout), and which note holds each section."""
    if doc.layout != "decision":
        elsewhere = any(path == doc.posix for path, _ in SECTION_TOPICS)
        if doc.size > NOTE_LIMIT or elsewhere:
            doc.layout = "split"
        elif doc.note is not None:  # a grouped document
            doc.layout = "note"
        elif (
            doc.posix in ENTITY_DOCS
            or doc.path.name == "README.md"
            or any(t.parent == doc.topic for t in brain.topics.values())
        ):
            doc.layout = "page"
        else:  # a short document that would fill a topic alone: a note in the parent topic
            parent = brain.topics.pop(doc.topic).parent
            doc.note = Section(doc, 1, doc.title, None, doc.title, "", stem=doc.topic)
            doc.topic = parent or ""
            doc.layout = "note"
    holder = doc.topic if doc.layout == "page" else doc.note.stem if doc.note else None
    for s in walk(doc.sections):
        if doc.layout != "split":
            s.stem, s.inline = holder or s.stem, True
        elif s.parent is not None and s.parent.size <= NOTE_LIMIT:
            s.stem, s.inline = s.parent.stem, True


def build() -> dict[str, str]:
    brain = Brain()
    docs = load_docs(brain)
    for slug, parent, title, description in TREE:
        brain.topics[slug] = Topic(slug, parent, title, description)
    statuses = _proposal_statuses()
    reading = _reading_order()
    for doc in docs:
        if doc.topic.startswith("proposal-"):
            changes = statuses.get(doc.path.name, "")
            brain.topics[doc.topic] = Topic(doc.topic, "proposals", doc.title, changes)
    for doc in docs:
        choose_layout(brain, doc)
    for doc in docs:  # a topic a whole document fills takes its title, intro, and source
        if doc.note is not None:
            continue
        if doc.topic not in brain.topics:
            raise SystemExit(f"build_docs_brain: {doc.posix} has no topic in TREE ({doc.topic})")
        topic = brain.topics[doc.topic]
        topic.title = topic.title or doc.title
        topic.description = topic.description or reading.get(doc.posix, "")
        topic.source = doc.posix
        topic.intro = _intro(brain, doc)
    for folder, (topic, _, _) in GROUPS.items():
        brain.topics[topic].source = f"{folder}/"
    for (path, anchor), slug in SECTION_TOPICS.items():
        if anchor not in brain.docs[path].anchors:  # a renamed heading must not refile silently
            raise SystemExit(
                f"build_docs_brain: no section #{anchor} in {path}; update SECTION_TOPICS"
            )
        if brain.topics[slug].source == "docs/":  # a topic one section fills names it
            brain.topics[slug].source = f"{path}#{anchor}"

    # Titles must read well in search results, so repeated section names get their document.
    counts: dict[str, int] = {}
    for doc in docs:
        for s in walk(doc.sections):
            if not s.inline:
                counts[s.title.lower()] = counts.get(s.title.lower(), 0) + 1
    for doc in docs:
        if doc.layout == "decision":
            rid = doc.title.split(":", 1)[0]
            brain.mentions[rid] = (doc.key, doc.title)
            continue
        for s in [doc.lead, *walk(doc.sections)]:
            if s is not doc.lead:
                s.note_title = (
                    s.title if counts.get(s.title.lower(), 1) == 1 else f"{s.title} ({doc.title})"
                )
                inherited = s.parent.topic if s.parent else doc.topic
                s.topic = SECTION_TOPICS.get((doc.posix, s.anchor), inherited)
            collect_rows(s)
            for row in s.rows:
                row.topic = row.topic or s.topic
                if ROW_ID.match(row.id):
                    brain.mentions[row.id] = (row.stem, row.title)

    for doc in docs:
        render_doc(brain, doc)
    for topic in brain.topics.values():
        render_topic_page(brain, topic)
    brain.files["brain.toml"] = manifest(brain)
    return brain.files


def _proposal_statuses() -> dict[str, str]:
    """Proposal file name -> what it changes, from the proposals README's table."""
    out = {}
    for line in (ROOT / PROPOSALS).read_text(encoding="utf-8").splitlines():
        cells = cells_of(line)
        match = LINK.match(cells[0]) if cells and len(cells) >= 3 else None
        if match:
            out[match.group(2)] = cells[2]
    return out


def _intro(brain: Brain, doc: Doc) -> list[str]:
    """The document's opening text, without a table the topic's own notes replace."""
    return brain.body(doc, [line for line in doc.intro if not line.startswith("|")])


def _text(sections: list[Section]) -> list[str]:
    """Sections as written, headings included: the text of a note or topic page that holds them."""
    lines: list[str] = []
    for s in sections:
        lines += ["", "#" * s.level + " " + s.heading, *s.lines, *_text(s.children)]
    return lines


def _rows_within(s: Section) -> list[Row]:
    """The section's entity rows, with those of the subsections it holds."""
    return [*s.rows, *(r for c in s.children if c.inline for r in _rows_within(c))]


def render_doc(brain: Brain, doc: Doc) -> None:
    if doc.layout == "decision":
        render_whole(brain, doc)
        return
    if doc.posix == IDEAS:
        render_ideas(brain, doc, doc.lead.rows)
    else:
        for row in sorted(doc.lead.rows, key=row_key):
            brain.topics[row.topic].entries.append((row.stem, row.title, 0))
            render_row(brain, doc, row)
    inner = [r for s in walk(doc.sections) for r in s.rows]
    if doc.layout in ("note", "page"):
        depth = 1 if doc.layout == "note" else 0
        if doc.layout == "note":
            brain.topics[doc.topic].entries.append((doc.note.stem, doc.title, 0))
            brain.note(
                doc.topic,
                doc.note.stem,
                key=f"note:{doc.path}",
                kind=doc.note_type,
                title=doc.title,
                source=doc.posix,
                body=brain.body(doc, [*doc.lead.lines, *_text(doc.sections)], demote=False),
            )
        else:
            text = brain.body(doc, _text(doc.sections), demote=False)
            brain.topics[doc.topic].intro += [*text, ""] if text else []
        for row in sorted(inner, key=row_key):
            brain.topics[row.topic].entries.append((row.stem, row.title, depth))
            render_row(brain, doc, row)
        return

    def tree(sections: list[Section], depth: int, parent_topic: str) -> None:
        for s in sections:  # every note is listed in its topic page, nested under its parent there
            if s.inline:
                continue
            here = depth if s.topic == parent_topic else 0
            entries = brain.topics[s.topic].entries
            entries.append((s.stem, s.note_title, here))
            for row in sorted((r for r in _rows_within(s) if r.topic == s.topic), key=row_key):
                entries.append((row.stem, row.title, here + 1))
            tree(s.children, here + 1, s.topic)

    if doc.note is not None:  # a grouped document: its note, then its sections below it
        brain.topics[doc.topic].entries.append((doc.note.stem, doc.title, 0))
        tree(doc.sections, 1, doc.topic)
        body = brain.body(doc, doc.lead.lines, demote=False)
        body += ["", "## Sections", *[f"- [[{s.stem}]]: {s.note_title}" for s in doc.sections]]
        brain.note(
            doc.topic,
            doc.note.stem,
            key=f"note:{doc.path}",
            kind=doc.note_type,
            title=doc.title,
            source=doc.posix,
            body=body,
        )
    else:
        tree(doc.sections, 0, doc.topic)
    for s in walk(doc.sections):
        if s.inline:
            continue
        held = [c for c in s.children if c.inline]
        body = brain.body(doc, [*s.lines, *_text(held)])
        notes = [c for c in s.children if not c.inline]
        if notes:
            body += ["", "## Subsections", *[f"- [[{c.stem}]]: {c.note_title}" for c in notes]]
        rows = sorted(_rows_within(s), key=row_key)
        if rows:
            body += ["", "## Items", *[f"- [[{r.stem}]]: {r.title}" for r in rows]]
        aliases = [f"{doc.title} §{s.number}"] if s.number else None
        brain.note(
            s.topic,
            s.stem,
            key=f"section:{doc.path}#{s.anchor}",
            kind=doc.note_type,
            title=s.note_title,
            source=f"{doc.posix}#{s.anchor}",
            body=body,
            aliases=aliases,
        )
    for row in inner:
        render_row(brain, doc, row)


def render_whole(brain: Brain, doc: Doc) -> None:
    """A decision: one note with all of its text; superseded when its status says so."""
    lines = list(doc.intro)
    for s in walk(doc.sections):
        lines += ["#" * s.level + " " + s.heading, *s.lines]
    text = "\n".join(lines)
    replaced = re.search(r"Superseded by \[?(D\d+)", text)
    successor = brain.mentions.get(replaced.group(1)) if replaced else None
    rid = doc.title.split(":", 1)[0]
    brain.topics[doc.topic].entries.append((doc.key, doc.title, 0))
    brain.note(
        doc.topic,
        doc.key,
        key=f"row:{DESIGN}/README.md#{rid}",  # the id it had in the old decision log
        kind=doc.note_type,
        title=doc.title,
        source=doc.posix,
        body=brain.body(doc, lines),
        related=brain.related(text, rid),
        aliases=[rid],
        superseded_by=successor[0] if successor else None,
    )


def render_row(brain: Brain, doc: Doc, row: Row) -> None:
    related = []
    body = []
    for i, (column, value) in enumerate(row.cells.items()):
        text = brain.body(doc, [value])[0] if value.strip("— ") else ""
        if i == 0:
            body += [text, ""]
        elif text:
            body += [f"**{column}:** {text}", ""]
    if row.kind == "milestone" and int(row.id[1:]) > 0:
        previous = brain.mentions.get(f"M{int(row.id[1:]) - 1}")
        if previous is not None:
            related.append(f"- Follows [[{previous[0]}]]: {previous[1]}")
    joined = " ".join(row.cells.values())
    related += brain.related(joined, row.id)
    stage = None
    if row.kind == "question":
        stage = "decided" if "Decided" in joined else "open"
    elif row.kind == "verification":
        stage = "answered" if re.search(r"\*\*(Verified|No|Antigravity|CLI)", joined) else "open"
    brain.note(
        row.topic,
        row.stem,
        key=f"row:{doc.path}#{row.id}",
        kind=row.kind,
        title=row.title,
        source=f"{doc.posix}#{row.section.anchor}" if row.section.anchor else doc.posix,
        body=body[:-1],
        related=list(dict.fromkeys(related)),
        aliases=row.aliases,
        stage=stage,
    )


def render_ideas(brain: Brain, doc: Doc, ideas: list[Row]) -> None:
    """Idea notes, listed on the ideas topic page under their area, in the table's order."""
    entries = brain.topics["ideas"].entries
    area = None
    for row in ideas:
        if row.cells["Area"] != area:
            area = row.cells["Area"]
            entries.append((None, area, 0))
        entries.append((row.stem, row.title, 1))
        render_row(brain, doc, row)


def render_topic_page(brain: Brain, topic: Topic) -> None:
    children = [t for t in brain.topics.values() if t.parent == topic.slug]
    body = [topic.description, ""] if topic.description else []
    if topic.intro:
        body += [*topic.intro, ""]
    body += [f"Generated from `{topic.source}`.", "", "## Notes"]
    body += [f"- [[{c.slug}]]: {c.title} (sub-topic)" for c in children]
    for stem, text, depth in topic.entries:
        body.append(f"{'  ' * depth}- [[{stem}]]: {text}" if stem else f"{'  ' * depth}- {text}")
    brain.note(
        topic.slug,
        topic.slug,
        key=f"hub:{topic.slug}",  # the id seed from when topic pages were hubs; ids never change
        kind="topic",
        title=topic.title,
        source=topic.source,
        body=body,
    )


def manifest(brain: Brain) -> str:
    lines = [
        "# Generated by scripts/build_docs_brain.py from docs/. Do not edit; rerun the script.",
        "format = 4",
        f'id = "{ulid("brain:" + NAME)}"',
        f'name = "{NAME}"',
        f"description = {yaml_str(DESCRIPTION)}",
        "",
        "[layout]",
        'topic_page = "{folder}.md"',
    ]
    for topic in brain.topics.values():
        lines += [
            "",
            f"[topics.{topic.slug}]",
            f"title = {yaml_str(topic.title)}",
            f"path = {yaml_str(brain.folder(topic.slug))}",
        ]
        if topic.description:
            lines.append(f"description = {yaml_str(plain(topic.description))}")
    lines += [
        "",
        "[agents.default]",
        "write = []",
    ]
    return "\n".join(lines) + "\n"


def with_brain_files(files: dict[str, str]) -> dict[str, str]:
    """Add the files every brain has, generated by brain-wiki itself."""
    from brainwiki.config import open_brain
    from brainwiki.engine import Engine
    from brainwiki.format import replace_block
    from brainwiki.index import agents_block
    from brainwiki.lifecycle import LOG_HEADER, RULES_HEADER

    files = dict(files)
    files["rules.md"] = RULES_HEADER
    files["log.md"] = LOG_HEADER
    files[".gitattributes"] = "log.md merge=union\nreports/** -diff\n"
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "brain"
        write_tree(root, files)
        with Engine(open_brain(root)) as engine:
            engine.scan(force=True)
            block = agents_block(engine)
    files["AGENTS.md"] = (
        "# brain-wiki docs\n\n"
        "This brain is generated from `docs/` by `scripts/build_docs_brain.py`. Edit the docs and\n"
        "rerun the script; edits made here are overwritten.\n\n"
    )
    files["AGENTS.md"] = replace_block(files["AGENTS.md"], block)
    return files


def write_tree(root: Path, files: dict[str, str]) -> None:
    for rel, content in files.items():
        target = root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")


def current_tree(root: Path) -> dict[str, str]:
    if not root.is_dir():
        return {}
    return {  # dot directories (.git, .obsidian) are the user's, never generated
        p.relative_to(root).as_posix(): p.read_text(encoding="utf-8")
        for p in sorted(root.rglob("*"))
        if p.is_file() and not any(d.startswith(".") for d in p.relative_to(root).parts[:-1])
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="change nothing; exit 1 if stale")
    args = parser.parse_args(argv)
    with tempfile.TemporaryDirectory() as home:  # keep the index and state out of the user's dirs
        for var, sub in (("CONFIG", "config.toml"), ("CACHE_DIR", "cache"), ("STATE_DIR", "state")):
            os.environ[f"BRAIN_WIKI_{var}"] = str(Path(home) / sub)
        sys.path.insert(0, str(ROOT / "src"))
        expected = with_brain_files(build())
    existing = current_tree(OUT)
    stale = sorted(
        set(existing) ^ set(expected) | {k for k in expected if existing.get(k) != expected[k]}
    )
    if args.check:
        for rel in stale[:20]:
            print(f"out of date: docs-brain/{rel}")
            if rel in existing and rel in expected:
                sys.stdout.writelines(
                    list(
                        difflib.unified_diff(
                            existing[rel].splitlines(keepends=True),
                            expected[rel].splitlines(keepends=True),
                            f"docs-brain/{rel} (current)",
                            f"docs-brain/{rel} (expected)",
                        )
                    )[:30]
                )
        if stale:
            print("run: uv run scripts/build_docs_brain.py")
            return 1
        print(f"docs-brain/ matches docs/ ({len(expected)} files)")
        return 0
    for rel in set(existing) - set(expected):
        (OUT / rel).unlink()
    write_tree(OUT, expected)
    for directory in sorted((p for p in OUT.rglob("*") if p.is_dir()), reverse=True):
        if not any(directory.iterdir()):
            directory.rmdir()
    notes = sum(1 for rel in expected if rel.startswith("topics/"))
    print(f"wrote docs-brain/: {notes} notes in {len(expected) - notes} other files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
