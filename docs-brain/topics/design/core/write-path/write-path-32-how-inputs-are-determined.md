---
id: 01M3250V009N7WTM9W3HY3XQ7N
type: design
title: "How inputs are determined"
aliases: ["Write path §3.2"]
source: "docs/design/write-path.md#32-how-inputs-are-determined"
---
# How inputs are determined

| Path | Value |
|---|---|
| Harvest | `external` when any tool call in the session matches the host's untrusted-tool list, else `local` |
| MCP | `unknown` |

The untrusted-tool list covers web fetch and search, browser tools, MCP
servers other than brain-wiki, and shell commands that reach the network
([[agent-integrations-63-detecting-external-inputs|agent integrations §6.3]]).
Harvest checks the whole transcript, not only the harvested turns. An MCP
server cannot see the rest of the session, and the model's claims about it
are not evidence.

`unknown` is treated like `external` everywhere it matters for safety
(§3.3).
