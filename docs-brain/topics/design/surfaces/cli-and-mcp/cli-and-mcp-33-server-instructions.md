---
id: 01M3250V00CE74WEWS5M5D69JY
type: design
title: "Server instructions"
aliases: ["CLI and MCP §3.3"]
source: "docs/design/cli-and-mcp.md#33-server-instructions"
---
# Server instructions

Sent once per connection:

The static instruction block ([[agent-integrations-32-the-static-instruction-block|agent integrations §3.2]])
without its skill pointer, so clients without an instruction file follow
the same policy. Its file-access and edit sentences follow the host's
profile, as in the block. Codex gets the policy only this way, and weighs
the first 512 characters most, so the first bullet ends within them
([[host-codex-1-instructions-come-from-the-mcp-server|Codex]]).
