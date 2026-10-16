---
id: 01M3250V00EZYV1ESKAMQBANRH
type: design
title: "Format versioning"
aliases: ["02 §13"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#13-format-versioning"
---
# Format versioning

- `format` in `brain.toml` is an integer: the newest file format the brain
  may contain. This document defines format 3.
- A tool MUST refuse to open a brain with a higher format than it supports.
  A best-effort read is not safe: an older reader misreads fields whose
  meaning changed (format 2 reads `bw-superseded_by` as a relation list),
  and its writers would put old-format content into a newer brain.
- A tool that writes files in a newer format first raises `format`. The
  change is one-way: undoing the run that raised it does not lower it,
  because other files in the new format may remain.
- Readers accept every older format. A format change ships with a fix that
  converts files, has a dry run, and writes one undo point.

**Format 2** kept claims and typed relations in frontmatter lists:

```yaml
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-supersedes:
  - "[[Use ripgrep for search]]"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9…; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; at: 2026-10-07}"
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8…; by: c-01J9…; reason: too slow}"
```

**Format 1** kept claims and relations in the body, under reserved
`## Claims` and `## Relations` headings (claims could wrap onto indented
continuation lines), wrote `stage` without the prefix, and wrote episode
provenance without it:

```markdown
## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9…; src:…; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8…; status:superseded; by:c-01J9… -->

## Relations
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
```

**Conversion to format 3.** Lint reports a format 1 or 2 note as BW117, and
`brain lint --fix` converts it:

| Format 1 or 2 | Format 3 |
|---|---|
| `bw-claims` items, or format 1 `## Claims` items | `## Facts` bullets, text only; claim metadata (`id`, `origin`, `inputs`, `at`) is dropped |
| `bw-claims-superseded` items, or struck-through format 1 claims | `## History` bullets: `- ~~text~~ (reason)` |
| Claim `src` | `bw-sources` items: an episode path becomes a link (`inbox/` mapped to `archive/`, `.md` dropped); URLs are kept; conversation references (`host:session#T…`) are dropped; items are deduplicated and merged with an existing `bw-sources` |
| `bw-<verb>` relations, or format 1 `## Relations` items | `## Related` bullets such as `- Depends on [[SQLite version policy]] — needs the trigram tokenizer` |
| `bw-part_of` naming the note's own hub (its folder or hub path) | Dropped: membership is the folder (§2) |
| `bw-superseded_by` relation | The `bw-superseded_by` field (one link) and `status: superseded` |
| `bw-supersedes: X`, or a format 1 `supersedes` line | A `## Related` bullet, plus a second BW117 fix on note X: `status: superseded` and `bw-superseded_by` linking back by the shortest link (file name when unique, else path) |
| A relation item that does not parse | Moved unchanged to `## Related` |
| Unprefixed `stage` | `bw-stage` |

```markdown
## Facts

- SQLite FTS5 is the default search backend.

## History

- ~~Search shells out to ripgrep.~~ (too slow)

## Related

- Depends on [[SQLite version policy]] — needs the trigram tokenizer
- Supersedes [[Use ripgrep for search]]
```

- Items are appended to an existing `## Facts`, `## History`, or
  `## Related` section rather than adding a second one.
- All fixes form one undoable run; `brain lint --fix --dry-run` shows the
  diff first. The run raises `format` to 3.
- Until a note is converted, the text of its format 2 claims stays
  searchable, and lint keeps reporting the conversion command.
- Episodes are immutable and are never converted. Readers accept their
  format 1 provenance names (§9), and their `## Claims` sections are body
  text.
