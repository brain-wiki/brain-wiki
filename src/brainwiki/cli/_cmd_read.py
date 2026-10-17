"""orient, search, read, neighbors, index."""

from __future__ import annotations

import sys
from typing import Any

from brainwiki.cli._output import emit, warn
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError


def _engine(args: Any):
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def orient(args: Any) -> int:
    from brainwiki.index import orient as run

    with _engine(args) as engine:
        result = run(engine)
    emit(args, result, result["text"])
    return 0


_INCLUDES = ("archived", "episodes", "archived_episodes")
_SEARCH_LIMIT = 50


def _check_range(flag: str, value: int, low: int, high: int) -> None:
    """Refuse an out-of-range number rather than quietly clamping it."""
    if not low <= value <= high:
        raise UsageError(f"{flag} takes {low}-{high}, not {value}")


def _print_results(args: Any, result: dict[str, Any]) -> None:
    """A search or browse result in the form the flags ask for. With --paths the next-page
    hint goes to stderr, so a pipe gets only paths but a person still sees rows were left."""
    from brainwiki.index import format_search_text

    if args.count:
        emit(args, result, format_search_text(result, "count"))
        return
    emit(args, result, format_search_text(result, "paths" if args.paths else "text"))
    if args.paths and not args.json and result.get("next_cursor"):
        left = result["total"] - int(result["next_cursor"])
        sys.stdout.flush()  # after the paths on a terminal
        warn(f"… {left} more (--cursor {result['next_cursor']})")


def search(args: Any) -> int:
    from brainwiki.index import search as run

    include = {part.strip() for part in (args.include or "").split(",") if part.strip()}
    unknown = sorted(include - set(_INCLUDES))
    if unknown:
        raise UsageError(
            f"--include takes a comma list of {', '.join(_INCLUDES)}, not {', '.join(unknown)}"
        )
    if "episodes" in include and args.no_episodes:
        raise UsageError("--include episodes and --no-episodes contradict each other")
    _check_range("--limit", args.limit, 1, _SEARCH_LIMIT)
    with _engine(args) as engine:
        result = run(
            engine,
            args.query,
            limit=args.limit,
            topics=args.topic,
            types=args.types,
            tags=args.tags,
            where=_parse_where(args.where),
            since=args.since,
            until=args.until,
            sort=args.sort,
            cursor=args.cursor,
            count_only=args.count,
            facets=args.facets,
            include_episodes=True
            if "episodes" in include
            else (False if args.no_episodes else None),
            include_archived="archived" in include,
            include_archived_episodes="archived_episodes" in include,
        )
    _print_results(args, result)
    return 0


def _parse_where(items: list[str]) -> dict[str, str]:
    where = {}
    for item in items or []:
        key, sep, value = item.partition("=")
        if not sep or not key.strip():
            raise UsageError(f"--where takes KEY=VALUE, not {item!r}")
        where[key.strip()] = value.strip()
    return where


def read(args: Any) -> int:
    from brainwiki.index import format_read_text
    from brainwiki.index import read as run

    with _engine(args) as engine:
        result = run(engine, args.target, mode=args.mode, section=args.section)
    if result["mode"] == "raw" and result["kind"] in ("note", "topic") and not args.json:
        sys.stdout.write(format_read_text(result))  # byte for byte: no added newline
        return 0
    emit(args, result, format_read_text(result))
    return 0


def neighbors(args: Any) -> int:
    from brainwiki.index import format_neighbors_text
    from brainwiki.index import neighbors as run

    _check_range("--depth", args.depth, 1, 3)
    _check_range("--limit", args.limit, 1, 100)
    with _engine(args) as engine:
        result = run(
            engine,
            args.target,
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
    if args.rebuild and args.status:
        raise UsageError("--rebuild and --status are alternatives; pass one")
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
