---
id: 01M3250V00XAYKC8FEZVP0RG10
type: design
title: "Reports"
aliases: ["Lint and reports §7"]
source: "docs/design/lint-and-reports.md#7-reports"
---
# Reports

Reports render index queries as Markdown pages a person can browse. They
live in `reports/`, start with a "do not edit" comment, and use wikilinks
so every entry is clickable. They are never indexed as knowledge or put
into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts, last consolidation, lint totals, links to the other reports |
| `reports/stale.md` | Active notes that link to superseded or archived notes |
| `reports/inbox.md` | Pending episodes by owner and age, and open proposals |
| `reports/consolidation.md` | The last 20 consolidation runs from `log.md`, newest first: agent, summary, and each episode's pattern and notes |
| `reports/orphans.md` | Notes no other note links to |
| `reports/lint.md` | The latest lint results |

`stale.md` leaves out hubs, which list their topic's history, and a link
from a note to the note it replaced. The visualizer's `stale` flag uses the
same query ([[index-and-search-9-other-queries|index and search §9]]).

`brain report` regenerates the reports, and so does
`brain consolidate --done` when `[reports] after_consolidate = true` (the
default). `index.md` is rewritten every time, since it carries the
generation time. The others are rewritten only when their content
changed.

Both commands write the files directly, outside any run, so brain-wiki's
run commits never include them. A `brain commit` snapshot
([[write-path-5-committing-direct-edits|write path §5]]) includes them
like any other changed file. `brain init` marks `reports/**` as `-diff` in
`.gitattributes`, because they change often.
