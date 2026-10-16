---
id: 01M3250V00A2X8D076ETMTNY7D
type: design
title: "Rules (Write path)"
aliases: ["Write path §6"]
source: "docs/design/write-path.md#6-rules"
---
# Rules (Write path)

Rules are loaded into every session, so they get the strictest path.

| Path | Flow |
|---|---|
| `brain rules add "…"` | Written at once as the user, `origin: owner`. `--quote` defaults to the text. |
| `brain rules add --as <host>` | Needs `propose_rules`. Saved as a proposal. |
| MCP `brain_propose_rule {text, user_quote, replaces?}` | Needs `propose_rules`. The user confirms first (below). |
| Direct edits | Never. `rules.md` is protected (§2.3), and `brain validate` reports an edit to it (BW121). |
| Consolidation | Never. A preference goes in a note in a `preferences` topic. Making it a rule is a separate step the user confirms. |

`brain_propose_rule` asks the user through MCP elicitation, showing the
exact rule and the user's quote:

- Confirmed: the rule is written with `origin: owner` and `via: mcp`.
- Declined: nothing is written.
- No way to ask: the rule is saved as a proposal
  (`inbox/proposals/rule-<id>.md`), and orientation shows "1 rule awaiting
  the user's confirmation: `brain rules accept <id>`". Clients that declare
  elicitation but decline every request without showing it (Antigravity)
  get the proposal path too.

The tool is annotated as destructive and carries
`_meta["anthropic/requiresUserInteraction"]`, so hosts that honor it ask
the user to approve the call itself.

Limits and checks:

- A rule is 1 to 300 characters, and its quote 1 to 500.
- `rules.md` must stay within `[budgets] rules_max_lines` (100) and
  `rules_max_chars` (4000). Going over is `budget_exceeded`, and the
  message names the longest rules.
- Replacing a rule (`replaces: r-…`) moves the old line to
  `archive/rules.md`, marked superseded.
- Adding, proposing, or accepting fails with `not_found` when `replaces`
  names no rule, and with `conflict` when a rule already says the same
  thing (compared ignoring case and spacing).

A proposal is known by its file name (`rule-<id>.md`). `brain rules list`
and `brain review list` show that id and the rule it replaces. `brain rules
accept|reject ID` and `brain review accept|reject ID` act on it. Accepting
and rejecting are the user's decisions, and no profile allows them.
