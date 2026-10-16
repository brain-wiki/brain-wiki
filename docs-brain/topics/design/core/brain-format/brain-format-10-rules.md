---
id: 01M3250V003Z6FZG03X3RXQANK
type: design
title: "Rules (Brain format)"
aliases: ["Brain format §10"]
source: "docs/design/brain-format.md#10-rules"
---
# Rules (Brain format)

`rules.md` holds the user's standing directives. It is injected into every
orientation, so it is short by construction.

```markdown
# Rules
- Prefer pytest over unittest for new tests. <!-- id:r-01JA0C…; quote:"from now on use pytest"; at:2026-10-10; origin:owner -->
- Write US English in code and docs. <!-- id:r-01JA0D…; quote:"US spelling please"; at:2026-10-10; origin:owner -->
```

- Hard limits: `budgets.rules_max_lines` and `budgets.rules_max_chars`.
  Writes that would exceed them fail with an error that says so.
- Every rule carries `quote`, the user's verbatim words that justify it,
  and `origin`. Rules with `origin` other than `owner` are invalid.
- Replacing a rule moves the old line to `archive/rules.md` with
  `status:superseded; by:<new id>`.
- Agents never edit `rules.md` directly (`brain validate` reports BW121
  when asked to check it), and consolidation never writes it. Rules are
  added by the user through the CLI, or by an agent through an MCP tool that the host gates
  with a user confirmation ([[write-path-6-rules|write path §6]]).
