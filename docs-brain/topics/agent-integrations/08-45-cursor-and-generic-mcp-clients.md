---
id: 01M3250V006JTNEXQDCHYD342T
type: design
title: "Cursor and generic MCP clients"
aliases: ["08 §4.5"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#45-cursor-and-generic-mcp-clients"
bw-part_of:
  - "[[08-4-per-host-notes]]"
---
# Cursor and generic MCP clients

- Cursor loads plugins that follow the Agent Plugins specification, so the
  repo's root `plugin.json`, `mcp.json`, and `skills/` work there. Cursor
  does not expand the standard's `${PLUGIN_ROOT}` variables (it has its own),
  which does not matter because brain-wiki's MCP entry uses none.
- `brain connect generic --print` prints a stdio server entry (`command`,
  `args`, `env`) to paste into any client's MCP configuration.
