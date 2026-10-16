---
id: 01M3250V00SGMQB0MQMYNHA0KV
type: design
title: "Reports"
aliases: ["06 §7"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#7-reports"
---
# Reports

Reports turn index queries into Markdown pages a person can browse, in
Obsidian or anywhere else. They live in `reports/`, start with a
"generated, do not edit" line, use wikilinks so every entry is clickable,
and are never indexed as knowledge or injected into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts, last consolidation, links to the other reports |
| `reports/contradictions.md` | Active `conflicts_with` pairs, with the qualifier and note |
| `reports/stale.md` | Active notes that depend on superseded or archived notes |
| `reports/unverified.md` | Notes with claims whose `inputs` are external or unknown, by count |
| `reports/inbox.md` | Pending episodes by age and agent; open proposals |
| `reports/duplicates.md` | Claims citing the same source span (BW206) |
| `reports/orphans.md` | Notes with no incoming links and not in a hub |
| `reports/lint.md` | The latest lint results |

`brain report` regenerates them; consolidation runs regenerate them when
`[reports] after_consolidate = true` (default). Report files are excluded
from git commits made by brain-wiki unless the user opts in, because they
churn on every run.
