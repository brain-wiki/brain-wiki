"""Small browsing commands in the Obsidian CLI's style (docs/design/cli-and-mcp.md §2.2).

Targets resolve like wikilinks; every line names the exact path, the handle for the next
command. Listings share --count, --paths, --limit, and --cursor.
"""

from __future__ import annotations

import sys
from collections.abc import Callable
from typing import Any

from brainwiki.cli._output import emit, warn
from brainwiki.engine import Engine, open_engine
from brainwiki.index import node_filters, parse_cursor

_NOTE_KINDS = ["note", "hub"]
_STATUSES = ["active", "superseded"]


def _engine(args: Any) -> Engine:
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def _note_where(engine: Engine) -> tuple[str, list[Any]]:
    """Bring the index up to date, then filter to curated notes, for a query over the index."""
    engine.scan()
    return node_filters(engine, _NOTE_KINDS, _STATUSES, None)


def _listing(
    args: Any,
    rows: list[dict[str, Any]],
    line: Callable[[dict[str, Any]], str],
    *,
    empty: str,
    path_key: str = "path",
) -> int:
    """Print a list with the shared flags; JSON carries the page plus the total."""
    total = len(rows)
    offset = parse_cursor(getattr(args, "cursor", None))
    limit = getattr(args, "limit", None) or total
    page = rows[offset : offset + limit]
    more = offset + len(page) < total
    data = {"total": total, "items": page, "next_cursor": str(offset + len(page)) if more else None}
    if getattr(args, "count", False):
        emit(args, data, str(total))
        return 0
    hint = f"… {total - offset - len(page)} more (--cursor {offset + len(page)})"
    if getattr(args, "paths", False):
        text = "\n".join(dict.fromkeys(str(r[path_key]) for r in page if r.get(path_key)))
        emit(args, data, text)
        if more and not getattr(args, "json", False):
            sys.stdout.flush()
            warn(hint)  # stderr, so a pipe gets only paths
        return 0
    text = "\n".join(line(r) for r in page) or empty
    if more:
        text += "\n" + hint
    emit(args, data, text)
    return 0


def topics(args: Any) -> int:
    """The topic tree: slug, title, notes, and sub-topics indented below."""
    from brainwiki.errors import NotFound
    from brainwiki.index import topic_rows

    with _engine(args) as engine:
        engine.scan()
        rows = {r["slug"]: r for r in topic_rows(engine)}
    if args.topic:
        slug = {s.lower(): s for s in rows}.get(args.topic.lower())
        if slug is None:
            raise NotFound(f"no topic {args.topic!r}; `brain topics` lists them")
        starts = [slug]
    else:
        starts = sorted(s for s, r in rows.items() if r["parent"] is None)
    items: list[dict[str, Any]] = []

    def walk(slug: str, depth: int) -> None:
        items.append({**rows[slug], "depth": depth})
        for child in sorted(s for s, r in rows.items() if r["parent"] == slug):
            walk(child, depth + 1)

    for slug in starts:
        walk(slug, 0)

    def line(r: dict[str, Any]) -> str:
        own = f"{r['notes']} note{'' if r['notes'] == 1 else 's'}"
        if r["sub_topics"]:
            own += f", {r['total_notes']} with sub-topics"
        return f"{'  ' * r['depth']}- {r['slug']}: {r['title']}  ({own})  [{r['path']}]"

    return _listing(args, items, line, empty="(no topics)")


_FORWARD = {"links_to": "links_to", "superseded_by": "superseded_by", "source": "cites"}
_BACKWARD = {"links_to": "linked_from", "superseded_by": "supersedes", "source": "cited_by"}


def links(args: Any) -> int:
    """Everything a note links to: body links and metadata links, resolved or not."""
    from brainwiki.index import resolve_target

    with _engine(args) as engine:
        node = resolve_target(engine, args.target)
        rows = []
        for edge in engine.db.execute(
            """SELECT e.rel, e.raw_target, e.line, n.id, n.title, n.path
               FROM edges e LEFT JOIN nodes n ON n.id = e.other
               WHERE e.declared_in = ? ORDER BY e.line""",
            (node["id"],),
        ):
            rows.append(
                {
                    "relation": _FORWARD.get(edge["rel"], edge["rel"]),
                    "target": edge["raw_target"],
                    "line": edge["line"],
                    "id": edge["id"],
                    "title": edge["title"],
                    "path": edge["path"],
                    "resolved": edge["id"] is not None,
                }
            )
    return _listing(
        args,
        rows,
        lambda r: (
            f'- {r["relation"]} "{r["title"]}" ({r["path"]})'
            if r["path"]
            else f"- {r['relation']} [[{r['target']}]]"
            + ("" if r["resolved"] else " (unresolved)")
            + f"  line {r['line']}"
        ),
        empty="No links.",
    )


def backlinks(args: Any) -> int:
    from brainwiki.index import resolve_target

    with _engine(args) as engine:
        node = resolve_target(engine, args.target)
        rows, seen = [], set()
        for edge in engine.db.execute(
            """SELECT e.rel, n.id, n.title, n.path
               FROM edges e JOIN nodes n ON n.id = e.declared_in
               WHERE e.other = ? AND e.declared_in != ?
               ORDER BY e.rel != 'superseded_by', n.updated DESC, n.path""",
            (node["id"], node["id"]),
        ):
            key = (edge["id"], edge["rel"])
            if key in seen:
                continue
            seen.add(key)
            rows.append(
                {
                    "relation": _BACKWARD.get(edge["rel"], edge["rel"]),
                    "id": edge["id"],
                    "title": edge["title"],
                    "path": edge["path"],
                }
            )
    return _listing(
        args,
        rows,
        lambda r: f'- {r["relation"]} "{r["title"]}" ({r["path"]})',
        empty="No backlinks.",
    )


def _counts(args: Any, select: str, source: str, what: str) -> int:
    with _engine(args) as engine:
        where, params = _note_where(engine)
        rows = [
            {"name": r["k"], "count": r["c"]}
            for r in engine.db.execute(
                f"SELECT {select} AS k, COUNT(DISTINCT n.id) AS c FROM {source} WHERE {where} "  # noqa: S608
                f"AND {select} IS NOT NULL GROUP BY {select} ORDER BY c DESC, k",
                params,
            )
        ]
    return _listing(
        args,
        rows,
        lambda r: f"{r['name']}  {r['count']}" if args.counts else str(r["name"]),
        empty=f"No {what}.",
        path_key="name",
    )


def tags(args: Any) -> int:
    return _counts(args, "lower(t.value)", "nodes n, json_each(n.tags) t", "tags")


def types(args: Any) -> int:
    return _counts(args, "n.type", "nodes n", "types")


def orphans(args: Any) -> int:
    """Notes nothing else links to (hubs are entry points, so they are not listed)."""
    with _engine(args) as engine:
        where, params = _note_where(engine)
        rows = []
        for row in engine.db.execute(
            f"""SELECT n.id, n.title, n.path, n.type FROM nodes n WHERE {where} AND n.kind = 'note'
                AND NOT EXISTS (SELECT 1 FROM edges e JOIN nodes s ON s.id = e.declared_in
                                WHERE e.other = n.id AND e.declared_in != n.id)
                ORDER BY n.path""",  # noqa: S608
            params,
        ):
            rows.append(dict(row))
    return _listing(args, rows, lambda r: f'- "{r["title"]}" ({r["path"]})', empty="No orphans.")


def unresolved(args: Any) -> int:
    """Links that resolve to no note."""
    with _engine(args) as engine:
        where, params = _note_where(engine)
        rows = [
            {
                "target": r["raw_target"],
                "path": r["path"],
                "line": r["line"],
                "relation": _FORWARD.get(r["rel"], r["rel"]),
            }
            for r in engine.db.execute(
                f"""SELECT e.raw_target, e.line, e.rel, n.path FROM edges e
                    JOIN nodes n ON n.id = e.declared_in
                    WHERE e.other IS NULL AND {where} ORDER BY e.raw_target, n.path, e.line""",  # noqa: S608
                params,
            )
        ]
    return _listing(
        args,
        rows,
        lambda r: f"[[{r['target']}]]  {r['path']}:{r['line']} ({r['relation']})",
        empty="Every link resolves.",
    )
