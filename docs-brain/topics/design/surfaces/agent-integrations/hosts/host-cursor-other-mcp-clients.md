---
id: 01M3250V002QVYP9SWHF1RE9ZB
type: design
title: "Other MCP clients"
source: "docs/design/hosts/cursor.md#other-mcp-clients"
---
# Other MCP clients

`brain connect generic` (with or without `--print`) prints a stdio server
entry (`type`, `command`, `args`) to paste into the client's MCP
configuration, and the instruction block to add wherever the client reads
instructions in every session. Clients that pass MCP server instructions
to the model get the same policy without it. A client whose reported name
contains `opencode` is recorded as that host id
([[agent-integrations-2-host-ids|agent integrations §2]]).
