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
- To record something, create `inbox/episodes/YYYY/MM/<ULID>.md` (format …).
  Do not edit files under `topics/` directly.
- Relations: part_of, depends_on, conflicts_with, supersedes, related_to …
<!-- brain-wiki:end -->
```

`brain lint --fix` and every consolidation run regenerate the block. Total
length is limited by `budgets.agents_md_max_lines`. When the topic table
would not fit, it is truncated to the most recently updated topics with a
pointer to the hubs.

## Relations
- part_of [[brain-format]]
