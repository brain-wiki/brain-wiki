---
id: 01M3250V00873ZJJTC7Z7RCZKX
type: design
title: "BW1xx: files and frontmatter"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw1xx-files-and-frontmatter"
---
# BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 | Frontmatter is not valid YAML. | error / error | — |
| BW102 | Frontmatter contains a nested mapping. | error / warning | — |
| BW103 | Note has no `id`. | error / info | mint ULID |
| BW104 | `id` is not a ULID. | error / warning | re-mint |
| BW105 | Two files share an `id`. | error / error | re-mint the newer file's id (the oldest file keeps it; not offered for episodes) |
| BW106 | `status` is not `active`, `superseded`, or `archived`. | error / info | move the value to `bw-stage`, set `status` (mapping table in [[import\|09]]) |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy (Syncthing, Dropbox, iCloud, OneDrive, Google Drive naming). | warning / warning | — (needs a person) |
| BW113 | A frontmatter property holds wikilinks that look like relations (`related`, `parent`, `up`…). | info / info | convert to `bw-<verb>` relations |
| BW114 | Leftover merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) outside code. | error / error | — |
| BW115 | A database or lock file (`*.sqlite`, `*.db`, `*-wal`, `*-shm`) inside the brain; sync tools corrupt these. | warning / warning | — |
| BW116 | Note is in format 1: `## Claims` or `## Relations` sections, or an unprefixed `stage` ([[02-13-format-versioning\|02 §13]]). | warning / info | convert to format 2 |
