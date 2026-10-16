---
id: 01M3250V0024QEW419JH29NEDS
type: design
title: "BW1xx: files and frontmatter"
source: "docs/design/lint-and-reports.md#bw1xx-files-and-frontmatter"
---
# BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 † | Frontmatter is not valid YAML, not a mapping, not closed, or over 64 KiB. | error / error | — |
| BW102 † | Frontmatter holds a nested mapping or a list of lists. | error / warning | — |
| BW103 † | Note has no `id`. | error / info | Mint an id |
| BW104 † | `id` is not a ULID. | error / warning | Mint a new id |
| BW105 † | Two files share an `id`. | error / error | Mint new ids for the newer notes or hubs |
| BW106 † | `status` is not `active`, `superseded`, or `archived`. | error / info | Map it, keeping the old value in `bw-stage` |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy. | warning / warning | — |
| BW114 | Leftover merge conflict markers outside code. | error / error | — |
| BW115 | `*.sqlite`, `*.sqlite3`, `*.db`, `*-wal`, or `*-shm` file inside the brain. | warning / warning | — |
| BW117 † | Note is in format 1 or 2. | error / warning | Convert to format 3 (§5.1) |
| BW118 † | Unknown `bw-` field in a note. | error / warning | — |
| BW119 † | `bw-superseded_by` is malformed, unresolved, names its own note, or is set without `status: superseded`. | error / warning | Set `status: superseded` (last case only) |
| BW120 † | A `bw-sources` item is neither a link nor a URL. | error / warning | — |
| BW121 † | A protected file was edited. | error / error | — |
| BW122 † | A `bw-sources` link does not resolve. | warning / info | — |

- The BW103 message includes a fresh `id:` line an agent can paste.
- BW105 keeps the id on the file with the oldest modification time.
  Duplicate episode ids get no fix.
- BW106 maps status values as [[import-4-normalization-rules|import §4]]
  describes, and leaves an existing `bw-stage` alone.
- BW112 matches common sync-tool conflict names, and `note (1).md` or
  `note 2.md` when `note.md` exists with different content.
- BW114 checks notes, hubs, `rules.md`, `AGENTS.md`, and `log.md`.
- BW117 lists what makes the note format 1 or 2
  ([[brain-format-13-format-versioning|brain format §13]]). A
  `bw-supersedes` relation adds a second BW117 whose fix marks the note it
  names as superseded.
- BW121 comes only from `brain validate`, for a path that
  [[write-path-23-direct-edits|write path §2.3]] protects.
