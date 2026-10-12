---
id: 01M3250V0045EKF0X0C2X8CV23
type: design
title: "Topic hubs"
aliases: ["02 §8"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#8-topic-hubs"
---
# Topic hubs

A hub is the file named `layout.hub_filename` at the root of a topic
folder. Hubs give a person or an agent a one-page entry point.

```markdown
---
id: 01J9Z7M3…
type: hub
title: Search
---
# Search

How local search works in this project and why.

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks

## Relations
- related_to [[storage]]
```

- Hubs MUST stay within `budgets.hub_max_lines`. When consolidation would
  push a hub over budget, it must create a child note
  (`part_of [[hub]]`) instead, and the hub gains one link line.
- `## Notes` lists the topic's notes with a short gloss. `brain lint --fix`
  can add missing entries; it never removes lines a person wrote.

## Relations
- part_of [[brain-format]]
