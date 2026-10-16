---
id: 01M3250V00873ZJJTC7Z7RCZKX
type: design
title: "BW1xx: files and frontmatter"
source: "docs/design/06-lint-and-reports.md#bw1xx-files-and-frontmatter"
---
# BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 † | Frontmatter is not valid YAML. | error / error | — |
| BW102 † | Frontmatter contains a nested mapping. | error / warning | — |
| BW103 † | Note has no `id`. | error / info | mint ULID |
| BW104 † | `id` is not a ULID. | error / warning | re-mint |
| BW105 † | Two files share an `id`. | error / error | re-mint the newer file's id (the oldest file keeps it; not offered for episodes) |
| BW106 † | `status` is not `active`, `superseded`, or `archived`. | error / info | move the value to `bw-stage`, set `status` (mapping table in [[import\|09]]) |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy (Syncthing, Dropbox, iCloud, OneDrive, Google Drive naming). | warning / warning | — (needs a person) |
| BW114 | Leftover merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) outside code. | error / error | — |
| BW115 | A database or lock file (`*.sqlite`, `*.db`, `*-wal`, `*-shm`) inside the brain; sync tools corrupt these. | warning / warning | — |
| BW117 † | Note is in format 1 or 2: claims or relations outside the body (`bw-claims`, `bw-claims-superseded`, `bw-<verb>` relations, `## Claims` or `## Relations` sections, an unprefixed `stage`) ([[02-13-format-versioning\|02 §13]]). A `bw-supersedes` relation adds a second BW117 for the note it names. | error / warning | convert to format 3 (§5.1) |
| BW118 † | Unknown `bw-` field in a note. | error / warning | — |
| BW119 † | `bw-superseded_by` is not one link, does not resolve, names its own note, or is set without `status: superseded`. | error / warning | set `status: superseded` (the status case only) |
| BW120 † | A `bw-sources` item is neither a link nor a URL. | error / warning | — |
| BW121 † | A protected file was edited ([[05-23-direct-edits\|05 §2.3]]). Reported only by `brain validate`, for a protected path it is asked to check. | error / error | — (restore it) |
| BW122 † | A `bw-sources` link does not resolve. Skipped while the cited episode is still in the inbox (§4). | warning / info | — |
