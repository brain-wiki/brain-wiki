---
id: 01M3250V005ZMX89HXTNDPTK8G
type: design
title: "Protocol target"
aliases: ["CLI and MCP §3.1"]
source: "docs/design/cli-and-mcp.md#31-protocol-target"
---
# Protocol target

- Python SDK `mcp` 2.x, high-level `MCPServer` API, stdio transport.
- It serves clients on the current stateless revision (2026-07-28) and
  clients still on the 2025-11-25 handshake, which is most hosts today.
- The server keeps no per-connection state. Anything that spans calls
  (harvest runs) is a server-minted handle passed as a tool argument, which is how the current revision expects cross-call state to
  work.
- No sampling, no roots, no reliance on server-to-client requests or
  logging notifications, all deprecated in the current revision.
- `tools/list` returns tools in a fixed order with a public cache hint (1
  hour), which helps client caches and prompt caching.
