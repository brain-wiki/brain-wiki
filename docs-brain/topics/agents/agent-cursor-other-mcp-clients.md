---
id: 01M3250V00MZCRSM88Z01A3KK1
type: design
title: "Other MCP clients"
tags: [agents]
source: "docs/design/agents/cursor.md#other-mcp-clients"
bw-part_of:
  - "[[agent-cursor]]"
---
# Other MCP clients

`brain connect generic --print` prints a stdio server entry (`command`,
`args`) to paste into the client's MCP configuration, and the instruction
block to add wherever the client reads instructions in every session.
Clients that pass MCP server instructions to the model get the same policy
without it.
