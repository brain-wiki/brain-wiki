---
id: 01M3250V00JNRYHDANQSX47FV3
type: design
title: "Body"
aliases: ["Brain format §6.2"]
source: "docs/design/brain-format.md#62-body"
---
# Body

The body is free Markdown with no reserved headings. brain-wiki reads only
its headings and links, and its words for search. It never extracts
meaning from it. Orientation recommends this shape, and nothing enforces
it:

```markdown
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- The first paragraph is the summary. Search snippets and outlines use
  it.
- One fact per bullet, specific (numbers, versions, dates). Failed
  approaches are facts too.
- Connections are wikilinks inside sentences, so the reason sits next to
  the link. A link has no type. The sentence says why it is there.
- A fact that changed MAY be kept as history, for example as a
  struck-through bullet under `## History`:
  `- ~~Search shells out to ripgrep.~~ (too slow)`.
- The conversion from format 2 writes `## Facts`, `## History`, and
  `## Related` sections (§13). They are ordinary headings that a person or
  agent may rename, merge, or remove.
