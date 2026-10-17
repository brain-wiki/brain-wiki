---
id: 01M3250V0074KPHGBJ2GSH6SAQ
type: design
title: "Topic pages"
aliases: ["Brain format §8"]
source: "docs/design/brain-format.md#8-topic-pages"
---
# Topic pages

A topic page is the file named `layout.topic_page` at the root of a topic
folder. It is the topic's own page, a one-page entry point for a person or
an agent. Only that file is a topic page: a note's `type` never makes it
one ([[d38-topic-pages|D38]]).

```markdown
---
id: 01J9Z7M3…
type: topic
title: Search
---
# Search

How local search works in this project and why. Storage details are in
[[storage]].

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks
```

- `type` defaults to `topic` on a topic page. Like every `type`, it is
  open vocabulary, so a page written with `type: hub` keeps working.
- With `topic_page = "{folder}.md"`, the page of `topics/search/` is
  `topics/search/search.md`.
- Topic pages have no length limit. Detail belongs in notes in the
  topic's folder, and the page links them, one line each.
- A parent topic's page need not list its sub-topics, since the folders
  already form the topic tree (§2). A crowded topic splits into
  sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. A note it does not list, and that no listed note
  reaches through body links, is BW405.
  `brain lint --fix --select BW405` appends the missing entries and never
  removes lines a person wrote.
- An optional `description` property on the page is the topic's one-line
  description when `brain.toml` does not declare one.
