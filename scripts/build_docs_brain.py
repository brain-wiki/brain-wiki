"""Build docs-brain/: the brain-wiki docs as a brain-wiki brain, organized by what each piece is.

The topic tree (TREE) does not follow the files. `overview` holds what brain-wiki is, with its
goals and concepts; `experience` the scenarios and the user guide; `design` the design
documents, grouped into core, surfaces, and quality, and the decision log; `roadmap` the
milestones, open questions, and verification items; `proposals` one topic per proposal; and
`ideas` the backlog.

Each `##` and `###` section becomes a note. Every row of an ID table (goals, scenarios,
requirements, decisions, threats, milestones, questions, verification items), every glossary
term, and every backlog idea becomes a typed note of its own, filed in the topic for its kind.
A decision a later one replaced is `status: superseded` with `bw-superseded_by`. Links between
documents become wikilinks. The docs stay the source of truth, so the brain is regenerated,
never edited by hand.

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
OVERVIEW = "docs/design/01-overview.md"
ROADMAP = "docs/design/14-roadmap-and-open-questions.md"
DECISION_LOG = "docs/design/README.md"
PROPOSALS = "docs/proposals/README.md"

# The topic tree, in the order hubs list it: (slug, parent, title, description). An empty title
# or description comes from the document that fills the topic (its `#` heading, and its row in
# the design README's reading order).
TREE: list[tuple[str, str | None, str, str]] = [
    (
        "overview",
        None,
        "Overview",
        "What brain-wiki is and why: the problem, principles, goals, concepts, and prior art",
    ),
    ("goals", "overview", "Goals", "What brain-wiki must achieve, each with how it is measured"),
    ("concepts", "overview", "Concepts", "The vocabulary, one note per term"),
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
        "How brain-wiki works and why: the design documents and the decision log",
    ),
    (
        "core",
        "design",
        "Core engine",
        "The brain format, configuration and storage, the index, the write path, and lint",
    ),
    ("brain-format", "core", "", ""),
    ("config-and-storage", "core", "", ""),
    ("index-and-retrieval", "core", "", ""),
    ("write-path-and-consolidation", "core", "", ""),
    ("lint-and-reports", "core", "", ""),
    (
        "surfaces",
        "design",
        "Interfaces and integrations",
        "How people and agents reach a brain: the CLI and MCP tools, agent hosts, import, "
        "the visualizer, and onboarding",
    ),
    ("interfaces", "surfaces", "", ""),
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
        "The decision log: what was decided, what was rejected, and where it is argued",
    ),
    ("roadmap", None, "", "What is built, what comes next, and what is still open"),
    ("milestones", "roadmap", "Milestones", "Implementation milestones and the build status"),
    ("questions", "roadmap", "Open questions", "Decisions needed from the maintainer"),
    (
        "verification",
        "roadmap",
        "Verification items",
        "Assumptions about hosts and dependencies to check, and what checking found",
    ),
    ("proposals", None, "Proposals", "Designs not built yet, one topic each"),
    ("ideas", None, "Ideas", "Ideas without a design yet, one note each, grouped by area"),
]
# Numbered design documents whose topic slug is not their file name.
DOC_SLUGS = {"roadmap-and-open-questions": "roadmap"}
# Sections filed in a topic other than their document's: (document, anchor) -> topic. Their
# subsections follow them.
SECTION_TOPICS = {
    (OVERVIEW, "3-goals"): "goals",
    (OVERVIEW, "6-users-and-scenarios"): "scenarios",
    (OVERVIEW, "7-glossary"): "concepts",
    (DECISION_LOG, "decision-log"): "decisions",
    (ROADMAP, "1-implementation-milestones-stage-2"): "milestones",
    (ROADMAP, "2-decisions-needed-from-the-maintainer"): "questions",
    (ROADMAP, "3-verification-items"): "verification",
}
# ID tables: id prefix -> (note type, topic or None for the section's own, the document).
ROW_FAMILIES = {
    "G": ("goal", "goals", OVERVIEW),
    "S": ("scenario", "scenarios", OVERVIEW),
    "C": ("requirement", None, "docs/design/03-config-and-storage.md"),
    "R": ("requirement", None, "docs/design/04-index-and-retrieval.md"),
    "W": ("requirement", None, "docs/design/05-write-path-and-consolidation.md"),
    "I": ("requirement", None, "docs/design/09-import.md"),
    "T": ("threat", None, "docs/design/10-security-and-privacy.md"),
    "M": ("milestone", "milestones", ROADMAP),
    "Q": ("question", "questions", ROADMAP),
    "T-": ("verification", "verification", ROADMAP),
    "O": ("requirement", None, "docs/design/15-skills-and-onboarding.md"),
    "D": ("decision", "decisions", DECISION_LOG),
    "P": ("requirement", None, "docs/proposals/privacy.md"),
}
# Folders whose documents become one note each, with their sections below it:
# folder -> (topic, note type, stem prefix).
GROUPS = {
    "docs/user": ("user-guide", "guide", "user"),
    "docs/design/agents": ("hosts", "design", "agent"),
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
    rendered: bool = True  # False when its content became notes of another kind (ideas)


@dataclass
class Row:
    """One entity from a table: an ID row, a glossary term, or a backlog idea."""

    id: str  # D3, S2b, T-4; the term; the idea's title
    kind: str  # note type
    topic: str  # topic slug
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
    number: str | None
    key: str  # stem prefix
    description: str = ""
    intro: list[str] = field(default_factory=list)  # lines between the title and the first `##`
    sections: list[Section] = field(default_factory=list)
    anchors: dict[str, Section] = field(default_factory=dict)
    note: Section | None = None  # grouped docs (GROUPS): one note for the whole document
    note_type: str = "reference"

    @property
    def posix(self) -> str:
        return self.path.as_posix()


def parse(path: Path, topic: str, key: str, number: str | None) -> Doc:
    text = (ROOT / path).read_text(encoding="utf-8")
    doc = Doc(path, topic, "", number, key)
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
            doc.title = re.sub(r"^\d+\s*·\s*", "", match.group(2))
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
    if doc == OVERVIEW and first == "term":
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
    if doc == PROPOSALS and first == "area":
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
    first_cell = re.sub(r"^\**Superseded by D\d+\.\**\s*", "", first_cell)  # what it decided
    return [
        Row(
            rid,
            kind,
            topic or "",
            values,
            section,
            stem=f"threat-{rid.lower()}" if kind == "threat" else rid.lower(),
            title=f"{rid}: {short(first_cell)}",
            aliases=[f"threat {rid}"] if kind == "threat" else [rid],
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
        self.rows: dict[str, Row] = {}  # ID-table rows by id (threats as threat-T1)
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
            stem = other.anchors[anchor].stem
        else:
            stem = other.note.stem if other.note else other.topic
        return f"[[{stem}|{label}]]"

    def body(self, doc: Doc, lines: list[str]) -> list[str]:
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
            if heading:  # sub-headings stay below the note's own `##` sections
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
        s.stem = f"{doc.number}-{s.anchor}" if doc.number else f"{doc.key}-{s.anchor}"
        name_sections(doc, s.children)


def walk(sections: list[Section]):
    for s in sections:
        yield s
        yield from walk(s.children)


def load_docs(brain: Brain) -> list[Doc]:
    reading = {}  # design doc file name -> what it settles (from the README's reading order)
    readme = (ROOT / DECISION_LOG).read_text(encoding="utf-8")
    for match in re.finditer(r"^\| \d+ \| \[[^\]]+\]\(([^)]+)\) \| (.+?) \|$", readme, re.M):
        reading[match.group(1)] = match.group(2)
    docs: list[Doc] = []
    for path in sorted((ROOT / "docs/design").glob("[0-9][0-9]-*.md")):
        number, slug = path.stem.split("-", 1)
        doc = parse(path.relative_to(ROOT), DOC_SLUGS.get(slug, slug), number, number)
        doc.description = reading.get(path.name, "")
        doc.note_type = "design"
        docs.append(doc)
    docs.append(parse(Path(DECISION_LOG), "design", "design", None))
    for folder, (topic, note_type, prefix) in GROUPS.items():
        for path in sorted((ROOT / folder).glob("*.md")):
            doc = parse(path.relative_to(ROOT), topic, f"{prefix}-{path.stem.lower()}", None)
            doc.note = Section(doc, 1, doc.title, None, doc.title, "", stem=doc.key)
            doc.note_type = note_type
            docs.append(doc)
    docs.append(parse(Path(PROPOSALS), "proposals", "proposals", None))
    for path in sorted((ROOT / "docs/proposals").glob("*.md")):
        if path.name != "README.md":
            doc = parse(
                path.relative_to(ROOT), f"proposal-{path.stem}", f"proposal-{path.stem}", None
            )
            doc.note_type = "proposal"
            docs.append(doc)
    for doc in docs:
        brain.docs[doc.posix] = doc
        name_sections(doc, doc.sections)
    return docs


def build() -> dict[str, str]:
    brain = Brain()
    docs = load_docs(brain)
    for slug, parent, title, description in TREE:
        brain.topics[slug] = Topic(slug, parent, title, description)
    statuses = _proposal_statuses()
    for doc in docs:  # a topic a whole document fills takes its title, intro, and source
        if doc.note is not None:
            continue
        if doc.topic.startswith("proposal-"):
            status, changes = statuses.get(doc.path.name, ("", ""))
            brain.topics[doc.topic] = Topic(doc.topic, "proposals", doc.title, changes)
        topic = brain.topics[doc.topic]
        topic.title = topic.title or doc.title
        topic.description = topic.description or doc.description
        topic.source = doc.posix
        topic.intro = _intro(brain, doc)
    for folder, (topic, _, _) in GROUPS.items():
        brain.topics[topic].source = f"{folder}/"

    for (doc, anchor), slug in SECTION_TOPICS.items():
        if anchor not in brain.docs[doc].anchors:  # a renamed heading must not refile silently
            raise SystemExit(
                f"build_docs_brain: no section #{anchor} in {doc}; update SECTION_TOPICS"
            )
        if brain.topics[slug].source == "docs/":  # a topic one section fills names it
            brain.topics[slug].source = f"{doc}#{anchor}"

    # Titles must read well in search results, so repeated section names get their document.
    counts: dict[str, int] = {}
    for doc in docs:
        for s in walk(doc.sections):
            counts[s.title.lower()] = counts.get(s.title.lower(), 0) + 1
    for doc in docs:
        for s in walk(doc.sections):
            s.note_title = s.title if counts[s.title.lower()] == 1 else f"{s.title} ({doc.title})"
            inherited = s.parent.topic if s.parent else doc.topic
            s.topic = SECTION_TOPICS.get((doc.posix, s.anchor), inherited)
            collect_rows(s)
            for row in s.rows:
                row.topic = row.topic or s.topic
                if ROW_ID.match(row.id):
                    brain.rows[f"threat-{row.id}" if row.kind == "threat" else row.id] = row
    backlog = brain.docs[PROPOSALS].anchors.get("backlog")
    if backlog is not None:  # its table became the idea notes; the ideas hub takes its intro
        backlog.rendered = False
        backlog.stem = "ideas"
        brain.topics["ideas"].source = f"{PROPOSALS}#backlog"

    for doc in docs:
        render_doc(brain, doc)
    render_ideas(brain, [r for s in walk(brain.docs[PROPOSALS].sections) for r in s.rows])
    for topic in brain.topics.values():
        render_hub(brain, topic)
    brain.files["brain.toml"] = manifest(brain)
    return brain.files


def _proposal_statuses() -> dict[str, tuple[str, str]]:
    """Proposal file name -> (status, what it changes), from the proposals README's table."""
    out = {}
    text = (ROOT / PROPOSALS).read_text(encoding="utf-8")
    for line in text.splitlines():
        cells = cells_of(line)
        match = LINK.match(cells[0]) if cells and len(cells) >= 3 else None
        if match:
            out[match.group(2)] = (cells[1], cells[2])
    return out


def _intro(brain: Brain, doc: Doc) -> list[str]:
    """The document's opening text, without a table the topic's own notes replace."""
    lines = [line for line in doc.intro if not line.startswith("|")]
    return brain.body(doc, lines)


def render_doc(brain: Brain, doc: Doc) -> None:
    def tree(sections: list[Section], depth: int, parent_topic: str) -> None:
        for s in sections:  # every note is listed in its hub, nested under its parent there
            if not s.rendered:
                continue
            here = depth if s.topic == parent_topic else 0
            entries = brain.topics[s.topic].entries
            entries.append((s.stem, s.note_title, here))
            for row in sorted((r for r in s.rows if r.topic == s.topic), key=row_key):
                entries.append((row.stem, row.title, here + 1))
            tree(s.children, here + 1, s.topic)

    if doc.note is not None:  # a grouped document: one note, its sections below it
        brain.topics[doc.topic].entries.append((doc.note.stem, doc.title, 0))
        tree(doc.sections, 1, doc.topic)
        body = _intro(brain, doc)
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
        if not s.rendered:
            continue
        body = brain.body(doc, s.lines)
        if s.children:
            body += ["", "## Subsections", *[f"- [[{c.stem}]]: {c.note_title}" for c in s.children]]
        if s.rows:
            items = sorted(s.rows, key=row_key)
            body += ["", "## Items", *[f"- [[{r.stem}]]: {r.title}" for r in items]]
        aliases = [f"{doc.number} §{s.number}"] if doc.number and s.number else None
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
        for row in s.rows:
            render_row(brain, doc, row)


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
        previous = brain.rows.get(f"M{int(row.id[1:]) - 1}")
        if previous is not None:
            related.append(f"- Follows [[{previous.stem}]]: {previous.title}")
    joined = " ".join(row.cells.values())
    mentions = {m for m in MENTION.findall(joined) if m != row.id}
    for other in sorted(mentions, key=lambda m: (m[0], int(m[1:]))):
        if other in brain.rows:
            related.append(f"- [[{brain.rows[other].stem}]]: {brain.rows[other].title}")
    stage = None
    if row.kind == "question":
        stage = "decided" if "Decided" in joined else "open"
    elif row.kind == "verification":
        stage = "answered" if re.search(r"\*\*(Verified|No|Antigravity|CLI)", joined) else "open"
    replaced = re.match(r"^Superseded by (D\d+)", plain(next(iter(row.cells.values()), "")))
    successor = brain.rows.get(replaced.group(1)) if replaced else None
    brain.note(
        row.topic,
        row.stem,
        key=f"row:{doc.path}#{row.id}",
        kind=row.kind,
        title=row.title,
        source=f"{doc.posix}#{row.section.anchor}",
        body=body[:-1],
        related=list(dict.fromkeys(related)),
        aliases=row.aliases,
        stage=stage,
        superseded_by=successor.stem if successor else None,
    )


def render_ideas(brain: Brain, ideas: list[Row]) -> None:
    """Idea notes, listed in the ideas hub under their area."""
    entries = brain.topics["ideas"].entries
    doc = brain.docs[PROPOSALS]
    area = None
    for row in ideas:
        if row.cells["Area"] != area:
            area = row.cells["Area"]
            entries.append((None, area, 0))
        entries.append((row.stem, row.title, 1))
        render_row(brain, doc, row)


def render_hub(brain: Brain, topic: Topic) -> None:
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
        key=f"hub:{topic.slug}",
        kind="hub",
        title=topic.title,
        source=topic.source,
        body=body,
    )


def manifest(brain: Brain) -> str:
    lines = [
        "# Generated by scripts/build_docs_brain.py from docs/. Do not edit; rerun the script.",
        "format = 3",
        f'id = "{ulid("brain:" + NAME)}"',
        f'name = "{NAME}"',
        f"description = {yaml_str(DESCRIPTION)}",
        "",
        "[layout]",
        'hub_filename = "{folder}.md"',
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
        'write = ["episodes"]',
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
