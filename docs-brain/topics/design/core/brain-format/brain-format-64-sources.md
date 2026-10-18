---
id: 01M3250V00K6FPP5YZ2A1Z0HDV
type: design
title: "Sources"
aliases: ["Brain format §6.4"]
source: "docs/design/brain-format.md#64-sources"
---
# Sources

`bw-sources` records where a note's knowledge came from.

```yaml
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "[[SQLite version policy]]"
  - "https://sqlite.org/fts5.html"
  - "session://claude-code/5f2c9a1e-…#turns=12-48"
```

- Each item MUST be a quoted link to a note or episode, or a URL (BW120).
- A session URL, `session://<host>/<session id>#turns=A-B`, cites the
  agent session a note was harvested from
  ([[write-path-22-harvesting-sessions|write path §2.2]]). It holds no
  file path; `brain origin` shows those turns on the machine that has the
  transcript.
- A link SHOULD resolve (BW122, a warning). A link to an episode's
  `archive/` path is not reported while that episode is still in the
  inbox, so a note can cite an episode before `brain consolidate --done`
  moves it.
- Sources are per note, not per fact, and carry no trust flags. The
  episode a source names keeps its own provenance (`bw-origin`,
  `bw-inputs`, §9), so following the link answers who wrote it and what
  they had read.
