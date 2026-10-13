---
id: 01M3250V00CYQG448T3Z7CAYDD
type: design
title: "How taint is determined"
aliases: ["05 §3.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#32-how-taint-is-determined"
bw-part_of:
  - "[[05-3-provenance-and-taint]]"
---
# How taint is determined

| Path | Mechanism |
|---|---|
| Hook capture | The hook reads the turn's transcript and sets `bw-taint: true` if any tool call matches the host's untrusted-tool list (web fetch and search, browser tools, MCP servers not in `trusted_mcp_servers`). Lists ship per host and are configurable ([[agent-integrations\|08]]). |
| Harvest | Same rule over every tool call in the harvested turn range; a transcript the reader cannot fully parse yields `unknown`. |
| Hook-observed sessions | A post-tool-use hook (where the host has one) records `tainted: true` in `<state>/sessions/<host>/<session>.json` the moment an untrusted tool runs. MCP calls that can be tied to that session use it. |
| MCP without session state | `unknown`. The MCP protocol does not tell a server what else happened in the session, and the model's own claims about it are not evidence. |
| Human CLI | `false`. |

`unknown` is treated like `true` everywhere it matters for safety (§3.3).
This makes MCP-only hosts slightly less convenient (their episodes need
review before becoming rules, which they never could anyway) and keeps
the guarantee simple.
