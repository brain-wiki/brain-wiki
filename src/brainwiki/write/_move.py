"""`brain mv`: move a note, or a topic folder with its notes, and rewrite the links that break.

Links by file name keep working when only folders change; links that name a path, and relative
Markdown links into or out of what moved, are rewritten. Topics are known by their slug, so
moving a topic folder re-parents it without breaking topic policies (brain-format.md §2); renaming
one renames its brain.toml entry in the same run.
"""

from __future__ import annotations

import contextlib
import os
import posixpath
import re
import tomllib
from collections import Counter
from typing import TYPE_CHECKING
from urllib.parse import quote

from brainwiki.config import MANIFEST
from brainwiki.errors import Conflict, NotFound, UsageError
from brainwiki.format import extract_block, replace_block
from brainwiki.index import norm_key, slugify
from brainwiki.runs import Check, Run, RunRecord
from brainwiki.write._profiles import require

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def _stem(path: str) -> str:
    name = path.rsplit("/", 1)[-1]
    return name[:-3] if name.lower().endswith(".md") else name


def _bare(path: str) -> str:
    return path[:-3] if path.lower().endswith(".md") else path


def plan_move(engine: Engine, src: str, dst: str) -> Run:
    engine.scan(force=True)
    src, dst = src.rstrip("/"), dst.rstrip("/")
    layout = engine.manifest.layout
    managed = (layout.inbox_dir, layout.archive_dir, layout.reports_dir)
    if any(p == m or p.startswith(m + "/") for p in (src, dst) for m in managed):
        raise UsageError(
            "mv moves notes, topic pages, and topic folders; inbox, archive, and reports are managed by brain-wiki"
        )
    if engine.store.abspath(src).is_dir():
        return _plan_folder(engine, src, dst)
    if not dst.lower().endswith(".md"):
        raise UsageError("the destination must be a .md path (or a folder, to move a topic)")
    node = engine.db.execute("SELECT id, kind FROM nodes WHERE path=?", (src,)).fetchone()
    if node is None or node["kind"] not in ("note", "topic"):
        raise NotFound(f"{src} is not a note in this brain")
    if engine.store.exists(dst):
        raise Conflict(f"{dst} already exists")
    engine.store.abspath(dst)  # refuses paths outside the brain
    run = Run(engine, "mv", summary=f"mv {src} → {dst}")
    run.move(src, dst)
    rewrite_links(engine, run, {src: dst})
    return run


def _plan_folder(engine: Engine, src: str, dst: str) -> Run:
    """Move every file under `src` to the same place under `dst`: a topic and what it holds."""
    if dst == src or dst.startswith(src + "/"):
        raise UsageError(f"cannot move {src} into itself")
    if engine.store.abspath(dst).exists():  # abspath also refuses paths outside the brain
        raise Conflict(f"{dst} already exists")
    root = engine.store.abspath(src)
    files = sorted(
        posixpath.join(src, os.path.relpath(os.path.join(folder, name), root).replace(os.sep, "/"))
        for folder, _, names in os.walk(root)
        for name in names
    )
    if not files:
        raise NotFound(f"{src} holds no files")
    run = Run(engine, "mv", summary=f"mv {src}/ → {dst}/")
    mapping = {path: dst + path[len(src) :] for path in files}
    topic_page = engine.manifest.layout.topic_page
    if "{folder}" in topic_page:  # a page named after its folder follows the folder's name
        old_page = f"{src}/{topic_page.replace('{folder}', posixpath.basename(src))}"
        new_page = f"{dst}/{topic_page.replace('{folder}', posixpath.basename(dst))}"
        if old_page in mapping and new_page not in mapping.values():
            mapping[old_page] = new_page
    for old, new in mapping.items():
        run.move(old, new)
    rewrite_links(engine, run, mapping)
    _move_topics(engine, run, src, dst, mapping)
    return run


def _moved(path: str, src: str, dst: str) -> str:
    return dst + path[len(src) :] if path == src or path.startswith(src + "/") else path


def _move_topics(engine: Engine, run: Run, src: str, dst: str, mapping: dict[str, str]) -> None:
    """Keep brain.toml's topic entries on the folders that moved, and the AGENTS.md topic table
    current. A declared path follows its folder; a topic declared without one is found by its
    folder's name, so renaming that folder renames the topic's table."""
    declared = engine.manifest.topics
    renames: dict[str, str] = {}
    paths: dict[str, str] = {}
    for slug, path in engine.topics.paths.items():
        new_path = _moved(path, src, dst)
        cfg = declared.get(slug)
        if new_path == path or cfg is None:
            continue
        if cfg.path_declared:
            paths[slug] = new_path
        elif slugify(posixpath.basename(new_path)) != slug:
            renames[slug] = slugify(posixpath.basename(new_path))
    for old, new in renames.items():
        if new in declared or new in engine.topics.paths:
            raise Conflict(
                f"moving {src} renames topic {old!r} to {new!r}, which already exists; "
                "pick another folder name"
            )
    if renames or paths:
        before = run.read(MANIFEST) or ""
        run.write(MANIFEST, _retopic(before, renames, paths))
    agents = run.read("AGENTS.md")
    if agents is not None and extract_block(agents) is not None:
        block = _agents_block_after(engine, agents, src, dst, mapping, renames)
        if extract_block(agents) != block:
            run.write("AGENTS.md", replace_block(agents, block))


def _retopic(text: str, renames: dict[str, str], paths: dict[str, str]) -> str:
    """brain.toml text with topic tables renamed and declared paths changed, comments kept."""
    import tomlkit

    out = text
    for old, new in renames.items():  # rename the table headers in place when they are plain
        out = re.sub(
            r'(?m)^(\s*\[\s*topics\s*\.\s*)"?' + re.escape(old) + r'"?(\s*[\].])',
            lambda m, new=new: m.group(1) + new + m.group(2),
            out,
        )
    expected = tomllib.loads(text)
    expected["topics"] = {renames.get(k, k): v for k, v in expected["topics"].items()}
    if renames and tomllib.loads(out) != expected:
        doc = tomlkit.parse(text)  # dotted keys or inline tables: rebuild the topics table
        table = tomlkit.table(is_super_table=True)
        for key, value in doc["topics"].items():
            table.add(renames.get(key, key), value)
        doc["topics"] = table
        out = tomlkit.dumps(doc)
    if paths:
        doc = tomlkit.parse(out)
        for slug, path in paths.items():
            doc["topics"][slug]["path"] = path
        out = tomlkit.dumps(doc)
    return out


def _agents_block_after(
    engine: Engine,
    agents: str,
    src: str,
    dst: str,
    mapping: dict[str, str],
    renames: dict[str, str],
) -> str:
    """The AGENTS.md block as `index.agents_block` will render it once the move is applied: the
    index still describes the brain before it, so the move is applied to its topic rows."""
    from brainwiki.index import topic_rows
    from brainwiki.lifecycle import default_agents_block

    declared = engine.manifest.topics
    rows = []
    for row in topic_rows(engine):
        path = _moved(row["path"], src, dst)
        slug = row["slug"]
        if path != row["path"] and not (slug in declared and declared[slug].path_declared):
            slug = renames.get(slug) or (
                slug if slug in declared else slugify(posixpath.basename(path))
            )
        about = row["description"] or (slug if row["title"] == row["slug"] else row["title"])
        rows.append((slug, path, mapping.get(row["page"], row["page"]) or path, about))
    table = []
    for slug, path, page, about in rows:
        if any(path.startswith(other + "/") for _, other, _, _ in rows):
            continue  # a sub-topic now
        below = sum(1 for _, other, _, _ in rows if other.startswith(path + "/"))
        table.append((slug, page, about + (f" ({below} sub-topics)" if below else "")))
    name = engine.brain.display_name
    edit = engine.manifest.profile("default").can("edit")
    old_block = extract_block(agents) or ""
    outside = len(agents.splitlines()) - (len(old_block.splitlines()) + 2 if old_block else 0)
    budget = engine.manifest.budgets.agents_md_max_lines - max(outside, 0) - 2
    keep = len(table)  # rows are most recently updated first, as agents_block trims them
    while True:
        shown = sorted(table[:keep])
        if keep < len(table):
            shown.append((f"… {len(table) - keep} more", "see the topic pages under topics/", ""))
        block = default_agents_block(name, shown, edit=edit, layout=engine.manifest.layout)
        if keep == 0 or len(block.splitlines()) <= budget:
            return block
        keep -= 1


def rewrite_links(engine: Engine, run: Run, mapping: dict[str, str]) -> None:
    """Rewrite links that named a moved note by path (or by a file name that changed), and
    relative Markdown links whose two ends no longer sit where they did."""
    conn = engine.db
    moved: dict[str, tuple[str, str]] = {}  # node id -> (old path, new path)
    for chunk in _chunks(list(mapping)):
        for row in conn.execute(
            f"SELECT id, path FROM nodes WHERE kind IN ('note', 'topic') AND path IN ({','.join('?' * len(chunk))})",  # noqa: S608 - placeholders only
            chunk,
        ):
            moved[row["id"]] = (row["path"], mapping[row["path"]])
    if not moved:
        return
    layout = engine.manifest.layout
    # Every topic page shares these names, so a link by name alone breaks once another topic
    # has a page: name them by path.
    shared = {
        norm_key(_stem(name))
        for name in (layout.topic_page, layout.legacy_topic_page)
        if name and "{folder}" not in name
    }
    arriving = Counter(norm_key(_stem(new)) for _, new in moved.values())
    link_text: dict[str, tuple[str, bool]] = {}  # node id -> (new link, links by name still work)
    for node_id, (old, new) in moved.items():
        key = norm_key(_stem(new))
        staying = [
            row[0]
            for row in conn.execute(
                "SELECT node_id FROM names WHERE kind='stem' AND key=? AND node_id != ?",
                (key, node_id),
            )
            if row[0] not in moved
        ]
        others = len(staying) + arriving[key] - 1 + (key in shared)
        link_text[node_id] = (
            _stem(new) if others == 0 else _bare(new),
            _stem(old) == _stem(new) and others == 0,
        )

    # (line, raw target, written form, new wikilink text or None, new target path for md links)
    edits: dict[str, list[tuple[int, str, str, str | None, str | None]]] = {}
    for chunk in _chunks(list(moved)):
        marks = ",".join("?" * len(chunk))
        for edge in conn.execute(  # links into what moved
            f"""SELECT e.line, e.raw_target, e.written, e.other, n.path FROM edges e
                JOIN nodes n ON n.id = e.declared_in
                WHERE e.other IN ({marks}) AND e.declared_in != e.other AND e.line > 0""",  # noqa: S608
            chunk,
        ):
            old, new = moved[edge["other"]]
            key = norm_key(edge["raw_target"])
            by_path = key == norm_key(old) or ("/" in key and norm_key(old).endswith("/" + key))
            by_stem = key == norm_key(_stem(old))
            link, name_ok = link_text[edge["other"]]
            wiki = link if by_path or (by_stem and not name_ok) else None
            edits.setdefault(edge["path"], []).append(
                (edge["line"], edge["raw_target"], edge["written"], wiki, new)
            )
        for edge in conn.execute(  # relative Markdown links out of what moved
            f"""SELECT e.line, e.raw_target, e.other, t.path AS target, n.path FROM edges e
                JOIN nodes n ON n.id = e.declared_in JOIN nodes t ON t.id = e.other
                WHERE e.declared_in IN ({marks}) AND e.written = 'md' AND e.line > 0""",  # noqa: S608
            chunk,
        ):
            if edge["other"] not in moved:
                edits.setdefault(edge["path"], []).append(
                    (edge["line"], edge["raw_target"], "md", None, edge["target"])
                )

    for path, items in edits.items():
        where = mapping.get(path, path)  # a file that moved is edited at its new place
        text = run.read(where)
        if text is None:
            continue
        newline = "\r\n" if "\r\n" in text else "\n"
        lines = text.split(newline)
        for line_no, raw, written, wiki, target in items:
            if line_no - 1 >= len(lines):
                continue
            line = lines[line_no - 1]
            if wiki is not None:
                # `\|` is Obsidian's escaped pipe in a table row: `[[note\|label]]`.
                line = re.sub(
                    r"\[\[\s*" + re.escape(raw) + r"(?=\s*(?:\\?\||#|\]\]))", "[[" + wiki, line
                )
            if target is not None and (written == "md" or "](" in line):
                href_new = posixpath.relpath(target, posixpath.dirname(where) or ".")
                for href in {raw, quote(raw)}:
                    line = re.sub(
                        r"\]\(" + re.escape(href) + r"(#[^)]*)?\)",
                        lambda m, h=href_new: "](" + quote(h) + (m.group(1) or "") + ")",
                        line,
                    )
            lines[line_no - 1] = line
        joined = newline.join(lines)
        if joined != text:
            run.write(where, joined)


def _chunks(items: list[str], size: int = 500) -> list[list[str]]:
    return [items[i : i + size] for i in range(0, len(items), size)]


def move_note(engine: Engine, src: str, dst: str, *, check: Check | None = None) -> RunRecord:
    require(engine, "edit", "move notes")
    run = plan_move(engine, src, dst)
    edited = [e.path for e in run.entries if e.moved_to is None]
    moved = sum(1 for e in run.entries if e.moved_to is not None)
    head = f"- {src} → {dst}" + (f" ({moved} files)" if moved > 1 else "")
    lines = [head] + [
        f"- {'updated topics' if p in (MANIFEST, 'AGENTS.md') else 'rewrote links'} in {p}"
        for p in edited
    ]
    record = run.commit(check=check, log_lines=lines)
    root = engine.store.abspath(src.rstrip("/"))
    if root.is_dir():  # a folder move leaves its emptied directories behind
        for folder, _, _ in os.walk(root, topdown=False):
            with contextlib.suppress(OSError):  # not empty: something besides notes lives there
                os.rmdir(folder)
    return record
