"""Small browsing commands in the Obsidian CLI's style (design doc 07 §2.2).

Targets resolve like wikilinks; every line names the exact path, the handle for the next
command. Listings share --count, --paths, --limit, and --cursor.
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import Engine, open_engine
from brainwiki.index.search import node_filters, parse_cursor

NOTE_KINDS = ["note", "hub"]
STATUSES = ["active", "superseded"]


def _engine(args: Any) -> Engine:
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def _note_where(engine: Engine) -> tuple[str, list[Any]]:
    return node_filters(engine, NOTE_KINDS, STATUSES, None)


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
    if getattr(args, "paths", False):
        text = "\n".join(dict.fromkeys(str(r[path_key]) for r in page if r.get(path_key)))
    else:
        text = "\n".join(line(r) for r in page) or empty
        if more:
            text += f"\n… {total - offset - len(page)} more (--cursor {offset + len(page)})"
    emit(args, data, text)
    return 0


def topics(args: Any) -> int:
    """The topic tree: slug, title, notes, and sub-topics indented below."""
    from brainwiki.errors import NotFound
    from brainwiki.index.orient import topic_rows

    with _engine(args) as engine:
        engine.scan()
        rows = {r["slug"]: r for r in topic_rows(engine)}
    if args.topic and args.topic not in rows:
        raise NotFound(f"no topic {args.topic!r}")
    starts = (
        [args.topic] if args.topic else sorted(s for s, r in rows.items() if r["parent"] is None)
    )
    items: list[dict[str, Any]] = []

    def walk(slug: str, depth: int) -> None:
        items.append({**rows[slug], "depth": depth})
        for child in sorted(s for s, r in rows.items() if r["parent"] == slug):
            walk(child, depth + 1)

    for slug in starts:
        walk(slug, 0)

    def line(r: dict[str, Any]) -> str:
        own = f"{r['notes']} notes"
        if r["sub_topics"]:
            own += f", {r['total_notes']} with sub-topics"
        return f"{'  ' * r['depth']}- {r['slug']}: {r['title']}  ({own})  [{r['path']}]"

    return _listing(args, items, line, empty="(no topics)")


def notes(args: Any) -> int:
    from brainwiki.index.search import format_search_text, search

    with _engine(args) as engine:
        result = search(
            engine,
            "",
            limit=args.limit,
            topics=args.topic,
            types=args.types,
            tags=args.tags,
            sort=args.sort,
            cursor=args.cursor,
            count_only=args.count,
            facets=args.facets,
            intent="none",
        )
    if args.count and not args.json and not args.facets:
        print(result["total"])
        return 0
    emit(args, result, format_search_text(result, "paths" if args.paths else "text"))
    return 0


def recent(args: Any) -> int:
    args.topic, args.types, args.tags, args.sort, args.facets = None, None, None, "recent", False
    from brainwiki.index.search import format_search_text, search

    with _engine(args) as engine:
        result = search(
            engine,
            "",
            limit=args.limit,
            since=args.since,
            cursor=args.cursor,
            count_only=args.count,
        )
    if args.count and not args.json:
        print(result["total"])
        return 0
    emit(args, result, format_search_text(result, "paths" if args.paths else "text"))
    return 0


def outline(args: Any) -> int:
    from brainwiki.format.document import parse_document
    from brainwiki.index.read import resolve_target

    with _engine(args) as engine:
        node = resolve_target(engine, args.target)
        doc = parse_document(node["path"], engine.store.read_text(node["path"]))
    headings = [{"line": line, "level": level, "text": text} for line, level, text in doc.headings]
    text = "\n".join(
        [f"{node['title']}  [{node['path']}]"]
        + [f"{'  ' * (h['level'] - 1)}- {h['text']}  (line {h['line']})" for h in headings]
    )
    emit(args, {"path": node["path"], "headings": headings}, text)
    return 0


def links(args: Any) -> int:
    """Everything a note links to: typed relations and body links, resolved or not."""
    from brainwiki.index.read import resolve_target

    with _engine(args) as engine:
        node = resolve_target(engine, args.target)
        rows = []
        for edge in engine.db.execute(
            """SELECT e.verb, e.rel, e.raw_target, e.line, n.id, n.title, n.path
               FROM edges e LEFT JOIN nodes n ON n.id = e.other
               WHERE e.declared_in = ? ORDER BY e.line""",
            (node["id"],),
        ):
            rows.append(
                {
                    "relation": edge["verb"],
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
    from brainwiki.index.read import resolve_target

    with _engine(args) as engine:
        node = resolve_target(engine, args.target)
        rows, seen = [], set()
        for edge in engine.db.execute(
            """SELECT e.verb, n.id, n.title, n.path
               FROM edges e JOIN nodes n ON n.id = e.declared_in
               WHERE e.other = ? AND e.declared_in != ?
               ORDER BY e.rel = 'links_to', n.updated DESC""",
            (node["id"], node["id"]),
        ):
            key = (edge["id"], edge["verb"])
            if key in seen:
                continue
            seen.add(key)
            rows.append(
                {
                    "relation": edge["verb"],
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
    """Links and relations that resolve to no note."""
    with _engine(args) as engine:
        where, params = _note_where(engine)
        rows = [
            {"target": r["raw_target"], "path": r["path"], "line": r["line"], "relation": r["verb"]}
            for r in engine.db.execute(
                f"""SELECT e.raw_target, e.line, e.verb, n.path FROM edges e
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
