---
id: 01M3250V00SGMQB0MQMYNHA0KV
type: design
title: "Reports"
aliases: ["06 §7"]
source: "docs/design/06-lint-and-reports.md#7-reports"
---
# Reports

Reports turn index queries into Markdown pages a person can browse, in
Obsidian or anywhere else. They live in `reports/`, start with a
"generated, do not edit" line, use wikilinks so every entry is clickable,
and are never indexed as knowledge or injected into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts (notes, hubs, links, pending and archived episodes), last consolidation, lint totals, links to the other reports |
| `reports/stale.md` | Active notes (not hubs) that link to superseded or archived notes, except a link from a note to the note it replaced. Hubs list their topic's history, and a successor naming its predecessor is not stale. The visualizer's `stale` flag uses the same query |
| `reports/inbox.md` | Pending episodes by agent and age; open proposals |
| `reports/orphans.md` | Notes nothing links to and no hub lists |
| `reports/lint.md` | The latest lint results |

`brain report` regenerates them, and `brain consolidate --done` does when
`[reports] after_consolidate = true` (default). Both write the files
directly, outside any run, so brain-wiki's run commits never include them;
a `brain commit` snapshot ([[05-5-committing-direct-edits|05 §5]])
includes them like any other changed file. `brain init` marks
`reports/**` as `-diff` in `.gitattributes`, because they churn.
