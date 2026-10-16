---
id: 01M3250V00WH02FZ8QX3ZGHYJF
type: design
title: "How inputs are determined"
aliases: ["05 §3.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#32-how-inputs-are-determined"
---
# How inputs are determined

| Path | Mechanism |
|---|---|
| Harvest | `external` if any tool call in the harvested turn range matches the host's untrusted-tool list (web fetch and search, browser tools, MCP servers other than brain-wiki, network shell commands; [[08-63-detecting-external-inputs\|08 §6.3]]), else `local`; a transcript the reader cannot fully parse yields `unknown`. |
| MCP | `unknown`. The MCP protocol does not tell a server what else happened in the session, and the model's own claims about it are not evidence. |
| Human CLI | `local`. |

`unknown` is treated like `external` everywhere it matters for safety (§3.3).
This makes MCP-only hosts slightly less convenient (their episodes need
review before becoming rules, which they never could anyway) and keeps
the guarantee simple.
