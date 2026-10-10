"""`brain mv`: move a note and rewrite the links that named it by path or file name."""

from __future__ import annotations

import posixpath
import re
from typing import TYPE_CHECKING
from urllib.parse import quote

from brainwiki.errors import Conflict, NotFound, UsageError
from brainwiki.index.resolver import norm_key
from brainwiki.runs import Run, RunRecord
from brainwiki.runs.transaction import Check

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def _stem(path: str) -> str:
    name = path.rsplit("/", 1)[-1]
    return name[:-3] if name.lower().endswith(".md") else name


def _bare(path: str) -> str:
    return path[:-3] if path.lower().endswith(".md") else path


def plan_move(engine: Engine, src: str, dst: str) -> Run:
    engine.scan(force=True)
    layout = engine.manifest.layout
    if not dst.lower().endswith(".md"):
        raise UsageError("the destination must be a .md path")
    protected = (layout.inbox_dir + "/", layout.archive_dir + "/", layout.reports_dir + "/")
    if dst.startswith(protected) or src.startswith(protected):
        raise UsageError(
            "mv moves notes and hubs; inbox, archive, and reports are managed by brain-wiki"
        )
    node = engine.db.execute("SELECT id, kind FROM nodes WHERE path=?", (src,)).fetchone()
    if node is None or node["kind"] not in ("note", "hub"):
        raise NotFound(f"{src} is not a note in this brain")
    if engine.store.exists(dst):
        raise Conflict(f"{dst} already exists")
    engine.store.abspath(dst)  # refuses paths outside the brain

    run = Run(engine, "mv", summary=f"mv {src} → {dst}")
    run.move(src, dst)
    old_stem, new_stem = _stem(src), _stem(dst)
    others = engine.db.execute(
        "SELECT COUNT(*) FROM names WHERE kind='stem' AND key=? AND node_id != ?",
        (norm_key(new_stem), node["id"]),
    ).fetchone()[0]
    new_link = new_stem if others == 0 else _bare(dst)
    path_keys = {norm_key(src)}
    by_stem_ok = old_stem == new_stem and others == 0

    edits: dict[str, list[tuple[int, str, str]]] = {}
    for edge in engine.db.execute(
        """SELECT e.line, e.raw_target, e.written, n.path FROM edges e JOIN nodes n ON n.id = e.declared_in
           WHERE e.other = ? AND e.declared_in != ?""",
        (node["id"], node["id"]),
    ):
        raw = edge["raw_target"]
        key = norm_key(raw)
        by_path = key in path_keys or ("/" in key and norm_key(src).endswith("/" + key))
        by_stem = key == norm_key(old_stem)
        if not by_path and not (by_stem and not by_stem_ok):
            continue
        edits.setdefault(edge["path"], []).append((edge["line"], raw, edge["written"]))

    for path, items in edits.items():
        text = run.read(path)
        if text is None:
            continue
        newline = "\r\n" if "\r\n" in text else "\n"
        lines = text.split(newline)
        for line_no, raw, written in items:
            if line_no - 1 >= len(lines):
                continue
            line = lines[line_no - 1]
            line = re.sub(
                r"\[\[\s*" + re.escape(raw) + r"(?=\s*(?:\||#|\]\]))", "[[" + new_link, line
            )
            if written == "md" or "](" in line:
                target = posixpath.relpath(dst, posixpath.dirname(path) or ".")
                for href in {raw, quote(raw)}:
                    line = re.sub(
                        r"\]\(" + re.escape(href) + r"(#[^)]*)?\)",
                        lambda m, target=target: "](" + quote(target) + (m.group(1) or "") + ")",
                        line,
                    )
            lines[line_no - 1] = line
        run.write(path, newline.join(lines))
    return run


def move_note(engine: Engine, src: str, dst: str, *, check: Check | None = None) -> RunRecord:
    run = plan_move(engine, src, dst)
    rewritten = [e.path for e in run.entries if e.moved_to is None]
    log = [f"- {src} → {dst}"] + [f"- rewrote links in {p}" for p in rewritten]
    return run.commit(check=check, log_lines=log)
