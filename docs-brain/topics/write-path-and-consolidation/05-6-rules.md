---
id: 01M3250V00ZKRAPNP58G79KRX6
type: design
title: "Rules (Write path and consolidation)"
aliases: ["05 §6"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#6-rules"
---
# Rules (Write path and consolidation)

Rules are the most powerful thing in a brain: they are loaded into every
session. They get the strictest path.

| Path | Flow |
|---|---|
| `brain rule add "…"` | The person running the CLI is the user. Written immediately, `origin: owner`, `quote` defaults to the text. |
| MCP `brain_propose_rule {text, user_quote, replaces?}` | Requires `propose_rules` in the profile's `write` list. If the session is known to be tainted, rejected. Otherwise the server asks the user to confirm, showing the exact rule: through an input-required result carrying an elicitation request on 2026-07-28 connections, or a pushed elicitation on older sessions, whichever the client advertises. The tool is also annotated as destructive and, for hosts that honor it, as requiring user interaction (`_meta["anthropic/requiresUserInteraction"]`), so the call itself is approved by the user. Confirmed → written with `origin: owner`, `via: mcp`. Declined → nothing. If the client supports neither form of confirmation, the rule is written as a proposal (`inbox/proposals/rule-<id>.md`) and orientation shows "1 rule awaiting confirmation: `brain rule accept <id>`". |
| Consolidation | Never. If an episode looks like a preference ("user prefers X"), the instructions say to record it as a claim in a `preferences` topic; promoting it to a rule is a separate, user-confirmed step. |

Replacing a rule (`replaces: r-…`) moves the old line to `archive/rules.md`.
Budget overflow is an error that tells the user which rules are longest.

## Relations
- part_of [[write-path-and-consolidation]]
