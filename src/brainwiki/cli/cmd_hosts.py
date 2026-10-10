"""connect, hook, mcp, schedule."""

from __future__ import annotations

from typing import Any


def mcp(args: Any) -> int:
    from brainwiki.mcp.server import serve

    serve(args.host, args.brain)
    return 0
