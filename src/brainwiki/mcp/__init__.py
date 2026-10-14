"""The MCP server. The SDK is imported only here, never by the core."""

from __future__ import annotations

from brainwiki.mcp._server import main, serve

__all__ = ["main", "serve"]
