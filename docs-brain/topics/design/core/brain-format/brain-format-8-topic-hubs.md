---
id: 01M3250V00Y9EF7VA485NZWMCS
type: design
title: "Topic hubs"
aliases: ["Brain format §8"]
source: "docs/design/brain-format.md#8-topic-hubs"
---
# Topic hubs

A hub is the file named `layout.hub_filename` at the root of a topic
folder. It gives a person or an agent a one-page entry point. A note with
`type: hub` elsewhere in a topic is indexed as a hub too.

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

- With `hub_filename = "{folder}.md"`, the hub of `topics/search/` is
  `topics/search/search.md`.
- Hubs have no length limit. Detail belongs in notes in the topic's
  folder, and the hub links them, one line each.
- A parent topic's hub need not list its sub-topics, since the folders
  already form the topic tree (§2). A crowded topic splits into
  sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. A note it does not list, and that no listed note
  reaches through body links, is BW405.
  `brain lint --fix --select BW405` appends the missing entries and never
  removes lines a person wrote.
- An optional `description` property on the hub is the topic's one-line
  description when `brain.toml` does not declare one.
