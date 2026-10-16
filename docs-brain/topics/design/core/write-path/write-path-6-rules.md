---
id: 01M3250V00A2X8D076ETMTNY7D
type: design
title: "Rules (Write path)"
aliases: ["Write path §6"]
source: "docs/design/write-path.md#6-rules"
---
# Rules (Write path)

Rules are the most powerful thing in a brain: they are loaded into every
session. They get the strictest path.

| Path | Flow |
|---|---|
| `brain rules add "…"` | The person running the CLI is the user. Written immediately, `origin: owner`, `quote` defaults to the text. With `--as <host>`, it needs `propose_rules` and is saved as a proposal instead ([[cli-and-mcp-1-agent-profiles\|CLI and MCP §1]]). |
| MCP `brain_propose_rule {text, user_quote, replaces?}` | Requires `propose_rules` in the profile's `write` list. The server asks the user to confirm, showing the exact rule: through an input-required result carrying an elicitation request on 2026-07-28 connections, or a pushed elicitation on older sessions, whichever the client advertises. The tool is also annotated as destructive and, for hosts that honor it, as requiring user interaction (`_meta["anthropic/requiresUserInteraction"]`), so the call itself is approved by the user. Confirmed → written with `origin: owner`, `via: mcp`. Declined → nothing. If the client supports neither form of confirmation, the rule is written as a proposal (`inbox/proposals/rule-<id>.md`) and orientation shows "1 rule awaiting confirmation: `brain rules accept <id>`". |
| Direct edits | Never: `rules.md` is protected (§2.3), and `brain validate` reports an edit to it (BW121). |
| Consolidation | Never. If an episode looks like a preference ("user prefers X"), the guidance says to record it in a note in a `preferences` topic; promoting it to a rule is a separate, user-confirmed step. |

Replacing a rule (`replaces: r-…`) moves the old line to `archive/rules.md`.
Budget overflow is an error that tells the user which rules are longest.
Adding, proposing, or accepting a rule is refused with `not_found` when
`replaces` names no rule, and with `conflict` when an existing rule already
says the same thing (compared ignoring case and spacing).

A proposal is known by its file name (`rule-<id>.md`): `brain rules list`
and `brain review list` show that id, and the rule it replaces, and `accept`
and `reject` take it (`brain rules accept ID` or `brain review accept ID`).
Accepting and rejecting are the user's decisions: no profile allows them.
