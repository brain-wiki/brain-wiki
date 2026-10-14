"""viz: open the brain map, or export it."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError

_FORMATS = {".html": "html", ".htm": "html", ".json": "json", ".graphml": "graphml"}


def viz(args: Any) -> int:
    with open_engine(args.brain, host=args.as_host) as engine:
        if args.export:
            return _export(args, engine)
        from brainwiki.viz import serve

        serve(engine, args.port, not args.no_open, topics=args.topic)
    return 0


def _export(args: Any, engine: Any) -> int:
    from brainwiki.viz import build_graph, to_graphml, to_json, to_standalone_html

    out = Path(args.export).expanduser()
    fmt = _FORMATS.get(out.suffix.lower())
    if fmt is None:
        raise UsageError(
            f"--export: unknown format {out.suffix or '(none)'!r}; use .html, .json or .graphml"
        )
    graph = build_graph(engine, topics=args.topic)
    if fmt == "html":
        from brainwiki.viz import Atlas

        try:
            body = to_standalone_html(Atlas(graph))
        except FileNotFoundError as exc:
            raise UsageError(f"--export: the visualizer app is not built ({exc.filename})") from exc
    else:
        body = to_json(graph) if fmt == "json" else to_graphml(graph)
    out.write_text(body, encoding="utf-8")
    data = {
        "path": str(out),
        "format": fmt,
        "profile": graph["profile"],
        "nodes": len(graph["nodes"]),
        "links": len(graph["links"]),
    }
    text = (
        f"Wrote {out} ({fmt}, {data['nodes']} nodes, {data['links']} links, "
        f"profile {graph['profile']})."
    )
    emit(args, data, text)
    return 0
