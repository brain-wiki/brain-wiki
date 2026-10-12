---
id: 01M3250V006ZC4TDJSCRN1H2S8
type: guide
title: "What a note looks like"
tags: [user-guide]
source: "docs/user/getting-started.md#what-a-note-looks-like"
---
# What a note looks like

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
title: Use SQLite FTS5 for local search
---
# Use SQLite FTS5 for local search

Free prose. brain-wiki never rewrites it.

## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-…; src:inbox/episodes/2026/10/….md#L11-L12; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-…; status:superseded; by:c-… -->

## Relations
- part_of [[search]]
- supersedes [[ripgrep]]
- conflicts_with [[vector-only]] (unless: embeddings enabled)
```

You can edit notes by hand in any editor. `brain lint` tells you if
something no longer follows the format, and `brain lint --fix` repairs what
is safe to repair, as one undoable run.

## Relations
- part_of [[user-getting-started]]
