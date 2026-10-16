---
id: 01M3250V002QF8E05NR0J774BE
type: design
title: "Notes (Cursor and other MCP clients)"
source: "docs/design/hosts/cursor.md#notes"
---
# Notes (Cursor and other MCP clients)

- Cursor does not expand the Agent Plugins `${PLUGIN_ROOT}` variables (it
  has its own), which does not matter because brain-wiki's MCP entry uses
  none.
