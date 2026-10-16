---
id: 01M3250V0061HQZEAKKV007JMD
type: decision
title: "D23: Plugin MCP entries stay plain uvx"
aliases: ["D23"]
source: "docs/decision/d23-plain-uvx-entry.md"
---
# D23: Plugin MCP entries stay plain uvx

Status: accepted.
Argued in: [[agent-integrations-3-the-plugin-bundle|agent integrations §3]].

Plugin MCP entries stay a plain `uvx` command that works on every platform, accepting a slow first start behind a slow package index; `brain connect` is the fast path.

### Alternatives considered

Wrapping the MCP entry in `sh -c` with an installed-command and offline fallback (breaks Windows)
