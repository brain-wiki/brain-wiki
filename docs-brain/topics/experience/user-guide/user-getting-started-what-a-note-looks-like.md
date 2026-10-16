---
id: 01M3250V006ZC4TDJSCRN1H2S8
type: guide
title: "What a note looks like"
source: "docs/user/getting-started.md#what-a-note-looks-like"
---
# What a note looks like

A note is a Markdown page in `topics/<topic>/`. Frontmatter holds metadata
only. What the note knows, and how it connects to other notes, goes in the
body:

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: decision
title: Use SQLite FTS5 for local search
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
updated: 2026-10-09
---
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- `status` (`active`, `superseded`, or `archived`) and `bw-superseded_by`
  mark a note that a newer one replaced. Search then shows the newer note
  first.
- `bw-sources` lists where the note's knowledge came from.
- brain-wiki reads the body's headings and links, never its meaning. The
  suggested shape (a summary paragraph, one fact per bullet, links inside
  sentences) is a convention, not a rule.

Edit notes in any editor, then check them:

- `brain validate` checks the frontmatter of the notes git sees as changed,
  or of the paths you name. It reports a missing `id` and gives one to add.
- `brain lint` checks the whole brain.
- `brain lint --fix` repairs what is safe to repair, as one undoable run.

Notes from brain-wiki 0.1 (format 1 or 2) still work, and `brain lint --fix`
converts them. See
[[user-maintenance-convert-notes-from-brain-wiki-01|Maintenance]].
