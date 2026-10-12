"""orient, search, read, neighbors, index."""

from __future__ import annotations

from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError


def _engine(args: Any):
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def orient(args: Any) -> int:
    from brainwiki.index.orient import orient as run

    with _engine(args) as engine:
        result = run(engine)
    emit(args, result, result["text"])
    return 0


def search(args: Any) -> int:
    from brainwiki.index.search import format_search_text
    from brainwiki.index.search import search as run

    include = {part.strip() for part in (args.include or "").split(",") if part.strip()}
    with _engine(args) as engine:
        result = run(
            engine,
            args.query,
            limit=args.limit,
            topics=args.topic,
            types=args.types,
            tags=args.tags,
            where=parse_where(args.where),
            since=args.since,
            until=args.until,
            sort=args.sort,
            cursor=args.cursor,
            count_only=args.count,
            facets=args.facets,
            intent=args.intent,
            include_episodes=True
            if "episodes" in include
            else (False if args.no_episodes else None),
            include_archived="archived" in include,
            include_archived_episodes="archived_episodes" in include,
        )
    if args.count and not args.json and not args.facets:
        print(result["total"])
        return 0
    emit(args, result, format_search_text(result, "paths" if args.paths else "text"))
    return 0


def parse_where(items: list[str]) -> dict[str, str]:
    where = {}
    for item in items or []:
        key, sep, value = item.partition("=")
        if not sep or not key.strip():
            raise UsageError(f"--where takes KEY=VALUE, not {item!r}")
        where[key.strip()] = value.strip()
    return where


def read(args: Any) -> int:
    from brainwiki.index.read import format_read_text
    from brainwiki.index.read import read as run

    with _engine(args) as engine:
        result = run(engine, args.target, mode=args.mode, section=args.section)
    emit(args, result, format_read_text(result))
    return 0


def neighbors(args: Any) -> int:
    from brainwiki.index.neighbors import format_neighbors_text
    from brainwiki.index.neighbors import neighbors as run

    with _engine(args) as engine:
        result = run(
            engine,
            args.target,
            relations=args.relations,
            direction=args.direction,
            depth=args.depth,
            limit=args.limit,
        )
    text = (
        "\n".join(n["path"] for n in result["nodes"][1:])
        if args.paths
        else format_neighbors_text(result)
    )
    emit(args, result, text)
    return 0


def index(args: Any) -> int:
    with _engine(args) as engine:
        stats = engine.rebuild() if args.rebuild else engine.scan(force=True)
        counts = {
            row["kind"]: row["c"]
            for row in engine.db.execute("SELECT kind, COUNT(*) AS c FROM files GROUP BY kind")
        }
        edges = engine.db.execute("SELECT COUNT(*) FROM edges").fetchone()[0]
        unresolved = engine.db.execute("SELECT COUNT(*) FROM edges WHERE other IS NULL").fetchone()[
            0
        ]
    data = {
        "files": counts,
        "edges": edges,
        "unresolved_links": unresolved,
        "scan": {
            "added": stats.added,
            "changed": stats.changed,
            "removed": stats.removed,
            "seconds": round(stats.seconds, 3),
        },
    }
    text = (
        "Index "
        + ("rebuilt" if args.rebuild else "up to date")
        + f" in {stats.seconds:.2f}s: "
        + ", ".join(f"{k}={v}" for k, v in sorted(counts.items()))
        + f"; edges={edges} (unresolved {unresolved})"
    )
    emit(args, data, text)
    return 0
