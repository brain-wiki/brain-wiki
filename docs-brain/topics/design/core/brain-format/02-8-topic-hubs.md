---
id: 01M3250V0045EKF0X0C2X8CV23
type: design
title: "Topic hubs"
aliases: ["02 §8"]
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

How local search works in this project and why. Storage details are in
[[storage]].

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks
```

- Hubs have no length limit. Detail belongs in notes in the topic's
  folder; the hub links them, one line each.
- A parent topic's hub need not list its sub-topics: the folders already
  form the topic tree (§2). A crowded topic splits into sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. `brain lint --fix` can add missing entries; it
  never removes lines a person wrote.
