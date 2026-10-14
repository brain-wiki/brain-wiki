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
| Harvest | `true` if any tool call in the harvested turn range matches the host's untrusted-tool list (web fetch and search, browser tools, MCP servers other than brain-wiki, network shell commands; [[08-63-taint-detection\|08 §6.3]]), else `false`; a transcript the reader cannot fully parse yields `unknown`. |
| MCP | `unknown`. The MCP protocol does not tell a server what else happened in the session, and the model's own claims about it are not evidence. |
| Human CLI | `false`. |

`unknown` is treated like `true` everywhere it matters for safety (§3.3).
This makes MCP-only hosts slightly less convenient (their episodes need
review before becoming rules, which they never could anyway) and keeps
the guarantee simple.
