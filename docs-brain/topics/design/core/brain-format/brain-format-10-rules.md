---
id: 01M3250V003Z6FZG03X3RXQANK
type: design
title: "Rules (Brain format)"
aliases: ["Brain format §10"]
source: "docs/design/brain-format.md#10-rules"
---
# Rules (Brain format)

`rules.md` holds the user's standing directives. Every orientation
includes it, so it is short by construction.

```markdown
# Rules
- Prefer pytest over unittest for new tests. <!-- id:r-01JA0C…; origin:owner; at:2026-10-10; quote:"from now on use pytest" -->
- Write US English in code and docs. <!-- id:r-01JA0D…; origin:owner; at:2026-10-10; quote:"US spelling please" -->
```

- A rule is a list item followed by a metadata comment. A comment that
  does not parse is BW603.
- Hard limits are `budgets.rules_max_lines` and
  `budgets.rules_max_chars`. A write that would exceed them fails with an
  error that names the longest rules. Lint reports a file over budget
  (BW402).
- Every rule carries `quote`, the user's verbatim words that justify it
  (BW601), and `origin`. A rule whose `origin` is not `owner` is invalid
  (BW602). A rule added from a proposal also carries `via`.
- Replacing a rule moves the old line to `archive/rules.md` with
  `status:superseded; by:<new id>`.
- Agents never edit `rules.md` directly, and `brain validate` reports
  BW121 when asked to check it. Consolidation never writes it. The user
  adds rules through the CLI. An agent proposes one through an MCP tool,
  which writes `inbox/proposals/rule-<id>.md`, and the rule takes effect
  when the user runs `brain rules accept`
  ([[write-path-6-rules|write path §6]]).
