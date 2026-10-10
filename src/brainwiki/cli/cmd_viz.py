"""viz: open the 3D brain map, or export it."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError

_FORMATS = {".html": "html", ".htm": "html", ".json": "json", ".graphml": "graphml"}


def viz(args: Any) -> int:
    with open_engine(args.brain, host=args.as_host) as engine:
        if args.export:
            return _export(args, engine)
        from brainwiki.viz.server import serve

        serve(engine, args.port, not args.no_open, topics=args.topic)
    return 0


def _export(args: Any, engine: Any) -> int:
    from brainwiki.viz.export import (
        build_graph,
        privacy_levels,
        to_graphml,
        to_json,
        to_standalone_html,
    )

    out = Path(args.export).expanduser()
    fmt = _FORMATS.get(out.suffix.lower())
    if fmt is None:
        raise UsageError(
            f"--export: unknown format {out.suffix or '(none)'!r}; use .html, .json or .graphml"
        )
    graph = build_graph(engine, topics=args.topic)
    render = {"html": to_standalone_html, "json": to_json, "graphml": to_graphml}[fmt]
    out.write_text(render(graph), encoding="utf-8")
    levels = privacy_levels(graph, engine.manifest.privacy.levels)
    data = {
        "path": str(out),
        "format": fmt,
        "profile": graph["profile"],
        "nodes": len(graph["nodes"]),
        "links": len(graph["links"]),
        "privacy_levels": levels,
    }
    text = (
        f"Wrote {out} ({fmt}, {data['nodes']} nodes, {data['links']} links, "
        f"profile {graph['profile']}).\n"
        f"Contains note titles at privacy levels: {', '.join(levels) or '(none)'}."
    )
    emit(args, data, text)
    return 0
