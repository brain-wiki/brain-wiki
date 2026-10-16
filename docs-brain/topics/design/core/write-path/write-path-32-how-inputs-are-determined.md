---
id: 01M3250V009N7WTM9W3HY3XQ7N
type: design
title: "How inputs are determined"
aliases: ["Write path §3.2"]
source: "docs/design/write-path.md#32-how-inputs-are-determined"
---
# How inputs are determined

| Path | Mechanism |
|---|---|
| Harvest | `external` if any tool call in the harvested turn range matches the host's untrusted-tool list (web fetch and search, browser tools, MCP servers other than brain-wiki, network shell commands; [[agent-integrations-63-detecting-external-inputs\|agent integrations §6.3]]), else `local`; a transcript the reader cannot fully parse yields `unknown`. |
| MCP | `unknown`. The MCP protocol does not tell a server what else happened in the session, and the model's own claims about it are not evidence. |
| Human CLI | `local`. |

`unknown` is treated like `external` everywhere it matters for safety (§3.3).
This makes MCP-only hosts slightly less convenient (their episodes need
review before becoming rules, which they never could anyway) and keeps
the guarantee simple.
