---
id: 01M3250V005ZMX89HXTNDPTK8G
type: design
title: "Protocol target"
aliases: ["CLI and MCP §3.1"]
source: "docs/design/cli-and-mcp.md#31-protocol-target"
---
# Protocol target

- Python SDK `mcp` 2.x (`mcp>=2.3,<3`), the high-level `MCPServer` API,
  stdio transport.
- The server serves clients on the current stateless revision (2026-07-28)
  and clients still on the 2025-11-25 handshake, which is most hosts today.
- The server keeps no per-connection state. State that spans calls (a
  harvest run) is a handle the server mints and the agent passes back as a
  tool argument, as the current revision expects.
- The server does not rely on sampling, roots, server-to-client requests,
  or logging notifications, all deprecated in the current revision.
  Rule confirmation uses elicitation when the client offers it (§3.4).
- `tools/list` and `prompts/list` return items in a fixed order with a
  public cache hint of one hour, which helps client caches and prompt
  caching.
