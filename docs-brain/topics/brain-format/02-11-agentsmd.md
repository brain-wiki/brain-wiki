---
id: 01M3250V00ZZWWMNAE1ATJMDSQ
type: design
title: "`AGENTS.md`"
aliases: ["02 §11"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#11-agentsmd"
---
# `AGENTS.md`

`AGENTS.md` lets an agent that can only read files use the brain. It
contains a generated block between markers, and anything the user writes
outside the markers is preserved.

```markdown
<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: personal
- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a hub (`index.md`).
- To add or correct knowledge, edit or create a note, then run
  `brain validate <path>` (MCP: `brain_validate`) and fix what it reports. Something
  not organized yet goes in `inbox/episodes/YYYY/MM/<ULID>.md` (or the MCP tool
  `brain_log_episode`). Never edit `rules.md`, episodes, or `log.md`.
- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. A note
  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.

(table of topic slug, hub, and description)
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`: without `edit` in its `write` list, the
correction sentence becomes "To record something, add a new file under
`inbox/episodes/YYYY/MM/<ULID>.md` (or call `brain_log_episode`). Never
edit `topics/` or `rules.md` directly." This matches the host instruction
block ([[08-32-the-static-instruction-block|08 §3.2]]).

Agents never edit `AGENTS.md`, inside or outside the markers; the user
may. `brain lint --fix`, `brain mv`, and a grant or revoke that changes
whether `[agents.default]` has `edit` regenerate the block. Total
length is limited by `budgets.agents_md_max_lines`. When the topic table
would not fit, it is truncated to the most recently updated topics with a
pointer to the hubs.
