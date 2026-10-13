"""Build docs-brain/: the design docs and user guide as a brain-wiki brain.

Each document becomes a topic with a hub; each `##` and `###` section becomes a note that is
`part_of` its parent; rows of the ID tables (decisions, milestones, open questions,
verification items, threats) become typed notes with their own relations; links between
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
ROW_ID = re.compile(r"^(D\d+|M\d+|Q\d+|T-\d+|T\d+)$")
ROW_KINDS = {
    "D": "decision",
    "M": "milestone",
    "Q": "question",
    "T-": "verification",
    "T": "threat",
}
MENTION = re.compile(r"\b(D\d{1,2}|M\d{1,2}|Q\d{1,2})\b")


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
    rows: list[Row] = field(default_factory=list)


@dataclass
class Row:
    id: str
    kind: str
    cells: dict[str, str]
    section: Section
    stem: str = ""
    title: str = ""


@dataclass
class Doc:
    path: Path  # relative to ROOT
    topic: str
    title: str
    number: str | None
    key: str  # stem prefix
    description: str = ""
    sections: list[Section] = field(default_factory=list)
    anchors: dict[str, Section] = field(default_factory=dict)
    hub: str = ""
    note: Section | None = None  # user docs: one note for the whole document


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
    return doc


def collect_rows(section: Section) -> None:
    """Rows of tables whose first column is an id like D3, M7, Q2, T-4, or T12."""
    kept: list[str] = []
    header: list[str] | None = None
    for line in section.lines:
        cells = (
            [c.strip() for c in line.strip().strip("|").split("|")]
            if line.startswith("|")
            else None
        )
        if cells and header is None and not re.match(r"^\|[\s:|-]+\|$", line):
            header = cells
        if cells and header and ROW_ID.match(cells[0]):
            rid = cells[0]
            prefix = "T-" if rid.startswith("T-") else rid[0]
            section.rows.append(
                Row(rid, ROW_KINDS[prefix], dict(zip(header[1:], cells[1:], strict=False)), section)
            )
            continue
        if not line.startswith("|"):
            header = None
        kept.append(line)
    if section.rows:  # the table now lives in the row notes; drop its header and rule lines
        section.lines = [
            line
            for i, line in enumerate(kept)
            if not (line.startswith("|") and _table_without_rows(kept, i))
        ]


def _table_without_rows(lines: list[str], i: int) -> bool:
    start = i
    while start > 0 and lines[start - 1].startswith("|"):
        start -= 1
    end = i
    while end + 1 < len(lines) and lines[end + 1].startswith("|"):
        end += 1
    return end - start <= 1  # only the header and the rule are left


# -- rendering -------------------------------------------------------------------------------


class Brain:
    def __init__(self) -> None:
        self.docs: dict[str, Doc] = {}  # posix path -> Doc
        self.files: dict[str, str] = {}
        self.rows: dict[str, Row] = {}

    def link(self, doc: Doc, href: str, label: str) -> str:
        if re.match(r"^[a-z]+://", href) or href.startswith("mailto:"):
            return f"[{label}]({href})"
        target, _, anchor = href.partition("#")
        path = (
            doc.path.as_posix()
            if not target
            else posixpath.normpath(posixpath.join(doc.path.parent.as_posix(), target))
        )
        other = self.docs.get(path)
        if other is None:
            return label
        if anchor and anchor in other.anchors:
            stem = other.anchors[anchor].stem
        else:
            stem = other.note.stem if other.note else other.hub
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
        rel: str,
        *,
        key: str,
        kind: str,
        title: str,
        source: str,
        body: list[str],
        relations: list[tuple[str, str]],
        aliases: list[str] | None = None,
        tags: list[str] | None = None,
        stage: str | None = None,
    ) -> None:
        fm = ["---", f"id: {ulid(key)}", f"type: {kind}", f"title: {yaml_str(title)}"]
        if aliases:
            fm.append("aliases: [" + ", ".join(yaml_str(a) for a in aliases) + "]")
        if tags:
            fm.append("tags: [" + ", ".join(tags) + "]")
        fm.append(f"source: {yaml_str(source)}")
        if stage:
            fm.append(f"bw-stage: {stage}")
        by_verb: dict[str, list[str]] = {}  # relations, one bw-<verb> list each (02 §6.4)
        for verb, target in dict.fromkeys(relations):
            by_verb.setdefault(verb, []).append(target)
        for verb, targets in by_verb.items():
            fm += [f"bw-{verb}:", *[f"  - {yaml_str(f'[[{t}]]')}" for t in targets]]
        text = [*fm, "---", f"# {title}", ""]
        if body:
            text += [*body, ""]
        self.files[rel] = "\n".join(text).rstrip("\n") + "\n"


def name_sections(doc: Doc, sections: list[Section]) -> None:
    for s in sections:
        if doc.number:
            s.stem = f"{doc.number}-{s.anchor}"
        else:
            s.stem = f"{doc.key}-{s.anchor}"
        name_sections(doc, s.children)


def walk(sections: list[Section]):
    for s in sections:
        yield s
        yield from walk(s.children)


def build() -> dict[str, str]:
    brain = Brain()
    reading = {}  # design doc file name -> what it settles (from the README's reading order)
    readme = (ROOT / "docs/design/README.md").read_text(encoding="utf-8")
    for match in re.finditer(r"^\| \d+ \| \[[^\]]+\]\(([^)]+)\) \| (.+?) \|$", readme, re.M):
        reading[match.group(1)] = match.group(2)

    docs: list[Doc] = []
    for path in sorted((ROOT / "docs/design").glob("[0-9][0-9]-*.md")):
        number, slug = path.stem.split("-", 1)
        doc = parse(path.relative_to(ROOT), slug, number, number)
        doc.description = reading.get(path.name, "")
        docs.append(doc)
    design = parse(Path("docs/design/README.md"), "decisions", "design", None)
    design.title, design.description = (
        "Design overview and decisions",
        (
            "How the design documents fit together, and the decision log with what each decision "
            "rejected and where it is argued"
        ),
    )
    docs.append(design)
    for path in sorted((ROOT / "docs/user").glob("*.md")):
        doc = parse(path.relative_to(ROOT), "user-guide", f"user-{path.stem.lower()}", None)
        docs.append(doc)
    for doc in docs:
        brain.docs[doc.path.as_posix()] = doc
        name_sections(doc, doc.sections)
        doc.hub = doc.topic
        if doc.topic == "user-guide":
            doc.note = Section(doc, 1, doc.title, None, doc.title, "", stem=doc.key)

    # Titles must read well in search results, so repeated section names get their document.
    counts: dict[str, int] = {}
    for doc in docs:
        for s in walk(doc.sections):
            counts[s.title.lower()] = counts.get(s.title.lower(), 0) + 1
    for doc in docs:
        for s in walk(doc.sections):
            s.note_title = s.title if counts[s.title.lower()] == 1 else f"{s.title} ({doc.title})"
            collect_rows(s)
            for row in s.rows:
                brain.rows[row.id if row.kind != "threat" else f"threat-{row.id}"] = row

    for row in brain.rows.values():
        row.stem = row.id.lower() if row.kind != "threat" else f"threat-{row.id.lower()}"
        first = next(iter(row.cells.values()), "")
        row.title = f"{row.id}: {short(first)}"

    topics: dict[str, tuple[str, str, list[tuple[str, str, int]]]] = {}
    for doc in docs:
        render_doc(brain, doc, topics)
    for slug, (title, description, children) in topics.items():
        source = (
            "docs/user/"
            if slug == "user-guide"
            else (
                "docs/design/README.md"
                if slug == "decisions"
                else next(d.path.as_posix() for d in docs if d.topic == slug)
            )
        )
        body = [description, "", f"Generated from `{source}`.", "", "## Notes"]
        body += [f"{'  ' * depth}- [[{stem}]]: {name}" for stem, name, depth in children]
        brain.note(
            f"topics/{slug}/{slug}.md",
            key=f"hub:{slug}",
            kind="hub",
            title=title,
            source=source,
            body=body,
            relations=[],
        )

    brain.files["brain.toml"] = manifest(topics)
    return brain.files


def render_doc(brain: Brain, doc: Doc, topics: dict) -> None:
    slug = doc.topic
    if slug == "user-guide":
        title, description = "User guide", "How to install, connect, use, and maintain brain-wiki"
    else:
        title, description = doc.title, doc.description
    entry = topics.setdefault(slug, (title, description, []))
    folder = f"topics/{slug}"

    def tree(sections: list[Section], depth: int) -> None:
        for s in sections:  # every note is listed in its hub, nested under its parent
            entry[2].append((s.stem, s.note_title, depth))
            entry[2].extend((r.stem, r.title, depth + 1) for r in s.rows)
            tree(s.children, depth + 1)

    if doc.note is not None:  # a user-guide document: one note, its sections below it
        entry[2].append((doc.note.stem, doc.title, 0))
        tree(doc.sections, 1)
        brain.note(
            f"{folder}/{doc.note.stem}.md",
            key=f"note:{doc.path}",
            kind="guide",
            title=doc.title,
            source=doc.path.as_posix(),
            body=["## Sections", *[f"- [[{s.stem}]]: {s.note_title}" for s in doc.sections]],
            relations=[("part_of", slug)],
            tags=["user-guide"],
        )
    else:
        tree(doc.sections, 0)
    for s in walk(doc.sections):
        parent = s.parent.stem if s.parent else (doc.note.stem if doc.note else slug)
        body = brain.body(doc, s.lines)
        if s.children:
            body += ["", "## Subsections", *[f"- [[{c.stem}]]: {c.note_title}" for c in s.children]]
        if s.rows:
            body += ["", "## Items", *[f"- [[{r.stem}]]: {r.title}" for r in s.rows]]
        aliases = [f"{doc.number} §{s.number}"] if doc.number and s.number else None
        kind = "guide" if doc.note else ("design" if doc.number else "reference")
        brain.note(
            f"{folder}/{s.stem}.md",
            key=f"section:{doc.path}#{s.anchor}",
            kind=kind,
            title=s.note_title,
            source=f"{doc.path.as_posix()}#{s.anchor}",
            body=body,
            relations=[("part_of", parent)],
            aliases=aliases,
            tags=[slug],
        )
        for row in s.rows:
            render_row(brain, doc, row, folder)


def render_row(brain: Brain, doc: Doc, row: Row, folder: str) -> None:
    relations = [("part_of", row.section.stem)]
    body = []
    first = True
    for column, value in row.cells.items():
        text = brain.body(doc, [value])[0] if value else ""
        if first:
            body += [text, ""]
            first = False
        elif text:
            body.append(f"**{column}:** {text}")
            body.append("")
        for href in re.findall(r"\]\(([^)\s]+)\)", value):
            converted = brain.link(doc, href, "x")
            if converted.startswith("[["):
                relations.append(("related_to", converted[2:].split("|", 1)[0]))
    mentions = {m for m in MENTION.findall(" ".join(row.cells.values())) if m != row.id}
    for other in sorted(mentions, key=lambda m: (m[0], int(m[1:]))):
        if other in brain.rows:
            relations.append(("related_to", brain.rows[other].stem))
    if row.kind == "milestone" and int(row.id[1:]) > 0:
        previous = f"M{int(row.id[1:]) - 1}"
        if previous in brain.rows:
            relations.append(("depends_on", brain.rows[previous].stem))
    stage = None
    joined = " ".join(row.cells.values())
    if row.kind == "question":
        stage = "decided" if "Decided" in joined else "open"
    elif row.kind == "verification":
        stage = "answered" if re.search(r"\*\*(Verified|No|Antigravity|CLI)", joined) else "open"
    brain.note(
        f"{folder}/{row.stem}.md",
        key=f"row:{doc.path}#{row.id}",
        kind=row.kind,
        title=row.title,
        source=f"{doc.path.as_posix()}#{row.section.anchor}",
        body=[line for line in body if line is not None][:-1] if body else [],
        relations=relations,
        aliases=[row.id] if row.kind != "threat" else [f"threat {row.id}"],
        tags=[row.section.doc.topic],
        stage=stage,
    )


def manifest(topics: dict) -> str:
    lines = [
        "# Generated by scripts/build_docs_brain.py from docs/. Do not edit; rerun the script.",
        "format = 2",
        f'id = "{ulid("brain:" + NAME)}"',
        f'name = "{NAME}"',
        f"description = {yaml_str(DESCRIPTION)}",
        "",
        "[layout]",
        'hub_filename = "{folder}.md"',
    ]
    for slug, (title, description, _) in topics.items():
        lines += ["", f"[topics.{slug}]", f"title = {yaml_str(title)}"]
        if description:
            lines.append(f"description = {yaml_str(plain(description))}")
    lines += [
        "",
        "[agents.default]",
        'max_privacy = "default"',
        'topics = ["*"]',
        'write = ["episodes"]',
    ]
    return "\n".join(lines) + "\n"


def with_brain_files(files: dict[str, str]) -> dict[str, str]:
    """Add the files every brain has, generated by brain-wiki itself."""
    from brainwiki.config.resolve import open_brain
    from brainwiki.engine import Engine
    from brainwiki.format.agents_md import replace_block
    from brainwiki.index.orient import agents_block
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
