---
id: 01M3250V00YER2W156BCT1GTGN
type: proposal
title: "Migration"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#12-migration"
bw-part_of:
  - "[[proposal-notes-as-content]]"
---
# Migration

- `brain lint --fix` converts format 1 and 2 notes as one run, with
  `--dry-run`, and raises `format = 3`:
  - `bw-claims` → a `## Facts` list (text only); `bw-claims-superseded` →
    `## History`, struck through.
  - Claim sources → `bw-sources`, deduplicated, inbox paths mapped to
    `archive/`.
  - `bw-<verb>` relations → a `## Related` list
    (`- Depends on [[x]] — needs the trigram tokenizer`). `bw-part_of` to
    the note's own hub is dropped.
  - `bw-supersedes: X` → `X` gets `status: superseded` and
    `bw-superseded_by`.
- Until converted, the index treats format-2 claim and relation text as
  searchable content, and lint reports the conversion command. A writer
  converts a note before editing it, as format 1 → 2 does today.
- Episodes are not converted (immutable).
