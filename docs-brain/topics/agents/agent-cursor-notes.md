---
id: 01M3250V009T11GK2J20XW2CS8
type: design
title: "Notes (Cursor and other MCP clients)"
tags: [agents]
source: "docs/design/agents/cursor.md#notes"
---
# Notes (Cursor and other MCP clients)

- Cursor does not expand the Agent Plugins `${PLUGIN_ROOT}` variables (it
  has its own), which does not matter because brain-wiki's MCP entry uses
  none.
