---
id: 01M3250V00CE74WEWS5M5D69JY
type: design
title: "Server instructions"
aliases: ["CLI and MCP §3.3"]
source: "docs/design/cli-and-mcp.md#33-server-instructions"
---
# Server instructions

The server sends the static instruction block
([[agent-integrations-3-the-plugin-bundle|agent integrations §3.2]])
without its skill pointer, so clients without an instruction file follow
the same policy.

- The edit sentence follows the host's profile, as in the block. The
  server picks it when it starts, for the host it detects then.
- Codex gets the policy only this way and weighs the first 512 characters
  most, so the first bullet ends within them
  ([[host-codex|Codex]]).
