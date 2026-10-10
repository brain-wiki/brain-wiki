"""connect, hook, mcp, schedule."""

from __future__ import annotations

from typing import Any


def mcp(args: Any) -> int:
    from brainwiki.mcp.server import serve

    serve(args.host, args.brain)
    return 0


def hook(args: Any) -> int:
    import sys

    from brainwiki.hosts.hooks import handle

    data = "" if sys.stdin is None or sys.stdin.isatty() else sys.stdin.read()
    out = handle(args.host, args.event, data)
    if out:
        sys.stdout.write(out + "\n")
    return 0
