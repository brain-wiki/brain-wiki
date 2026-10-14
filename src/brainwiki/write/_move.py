"""`brain mv`: move a note, or a topic folder with its notes, and rewrite the links that break.

Links by file name keep working when only folders change; links that name a path, and relative
Markdown links into or out of what moved, are rewritten. Topics are known by their slug, so
moving a topic folder re-parents it without breaking topic policies (design doc 02 §2).
"""

from __future__ import annotations

import contextlib
import os
import posixpath
import re
from typing import TYPE_CHECKING
from urllib.parse import quote

from brainwiki.errors import Conflict, NotFound, UsageError
from brainwiki.index import norm_key
from brainwiki.runs import Check, Run, RunRecord

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
            "mv moves notes, hubs, and topic folders; inbox, archive, and reports are managed by brain-wiki"
        )
    if engine.store.abspath(src).is_dir():
        return _plan_folder(engine, src, dst)
    if not dst.lower().endswith(".md"):
        raise UsageError("the destination must be a .md path (or a folder, to move a topic)")
    node = engine.db.execute("SELECT id, kind FROM nodes WHERE path=?", (src,)).fetchone()
    if node is None or node["kind"] not in ("note", "hub"):
        raise NotFound(f"{src} is not a note in this brain")
    if engine.store.exists(dst):
        raise Conflict(f"{dst} already exists")
    engine.store.abspath(dst)  # refuses paths outside the brain
    run = Run(engine, "mv", summary=f"mv {src} → {dst}")
    run.move(src, dst)
    _rewrite_links(engine, run, {src: dst})
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
    for old, new in mapping.items():
        run.move(old, new)
    _rewrite_links(engine, run, mapping)
    return run


def _rewrite_links(engine: Engine, run: Run, mapping: dict[str, str]) -> None:
    """Rewrite links that named a moved note by path (or by a file name that changed), and
    relative Markdown links whose two ends no longer sit where they did."""
    conn = engine.db
    moved: dict[str, tuple[str, str]] = {}  # node id -> (old path, new path)
    for chunk in _chunks(list(mapping)):
        for row in conn.execute(
            f"SELECT id, path FROM nodes WHERE kind IN ('note', 'hub') AND path IN ({','.join('?' * len(chunk))})",  # noqa: S608 - placeholders only
            chunk,
        ):
            moved[row["id"]] = (row["path"], mapping[row["path"]])
    if not moved:
        return
    link_text: dict[str, tuple[str, bool]] = {}  # node id -> (new link, links by name still work)
    for node_id, (old, new) in moved.items():
        others = conn.execute(
            "SELECT COUNT(*) FROM names WHERE kind='stem' AND key=? AND node_id != ?",
            (norm_key(_stem(new)), node_id),
        ).fetchone()[0]
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
                line = re.sub(
                    r"\[\[\s*" + re.escape(raw) + r"(?=\s*(?:\||#|\]\]))", "[[" + wiki, line
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
    run = plan_move(engine, src, dst)
    rewritten = [e.path for e in run.entries if e.moved_to is None]
    moved = sum(1 for e in run.entries if e.moved_to is not None)
    head = f"- {src} → {dst}" + (f" ({moved} files)" if moved > 1 else "")
    record = run.commit(
        check=check, log_lines=[head] + [f"- rewrote links in {p}" for p in rewritten]
    )
    root = engine.store.abspath(src.rstrip("/"))
    if root.is_dir():  # a folder move leaves its emptied directories behind
        for folder, _, _ in os.walk(root, topdown=False):
            with contextlib.suppress(OSError):  # not empty: something besides notes lives there
                os.rmdir(folder)
    return record
