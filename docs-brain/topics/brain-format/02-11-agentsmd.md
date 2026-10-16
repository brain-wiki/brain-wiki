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
# This folder is a brain-wiki brain
- Read `rules.md` first. Topics: (table of slug, title, description)
- To record something new, add `inbox/episodes/YYYY/MM/<ULID>.md` (or call
  `brain_log_episode`). To correct a note, edit it, then run `brain check <path>`
  and fix what it reports. Never edit `rules.md`, episodes, or `log.md`.
- Relations are `bw-<verb>` fields: part_of, depends_on, conflicts_with, …
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`: without `edit` in its `write` list, the
correction sentence becomes "Never edit `topics/` or `rules.md` directly;
consolidation folds episodes into notes." This matches the host instruction
block ([[08-32-the-static-instruction-block|08 §3.2]]).

`brain lint --fix` and every consolidation run regenerate the block. Total
length is limited by `budgets.agents_md_max_lines`. When the topic table
would not fit, it is truncated to the most recently updated topics with a
pointer to the hubs.
