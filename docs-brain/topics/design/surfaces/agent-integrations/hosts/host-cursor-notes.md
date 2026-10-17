---
id: 01M3250V002QF8E05NR0J774BE
type: design
title: "Notes (Cursor and other MCP clients)"
source: "docs/design/hosts/cursor.md#notes"
---
# Notes (Cursor and other MCP clients)

- `brain connect cursor` adds a `brain-wiki` server, running the installed
  `brain` with `--host cursor`, to Cursor's MCP config. A config that is
  not plain JSON is refused with a `format` error.
- `brain connect cursor` registers no skills. The skills reach Cursor only
  when it loads the bundle.
- Cursor keeps user rules in its settings, so user-scope `connect` prints
  the block to paste. With `--scope project`, it writes
  `.cursor/rules/brain-wiki.mdc` with `alwaysApply: true`.
- Cursor does not expand the Agent Plugins `${PLUGIN_ROOT}` variables (it
  has its own). brain-wiki's MCP entry uses none.
