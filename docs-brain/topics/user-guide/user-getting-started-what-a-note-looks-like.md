---
id: 01M3250V006ZC4TDJSCRN1H2S8
type: guide
title: "What a note looks like"
tags: [user-guide]
source: "docs/user/getting-started.md#what-a-note-looks-like"
bw-part_of:
  - "[[user-getting-started]]"
---
# What a note looks like

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
title: Use SQLite FTS5 for local search
bw-part_of: "[[search]]"
bw-supersedes: "[[ripgrep]]"
bw-conflicts_with: "[[vector-only]] (unless: embeddings enabled)"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-…; src: inbox/episodes/2026/10/….md#L11-L12; at: 2026-10-07}"
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-…; by: c-…}"
---
# Use SQLite FTS5 for local search

Free prose. brain-wiki never rewrites it.
```

Claims and relations are frontmatter fields named `bw-…`, so Obsidian shows
them as properties, and its links work. The body stays yours.

You can edit notes by hand in any editor. `brain lint` tells you if
something no longer follows the format, and `brain lint --fix` repairs what
is safe to repair, as one undoable run.
