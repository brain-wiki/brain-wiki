---
id: 01M3250V00EZYV1ESKAMQBANRH
type: design
title: "Format versioning"
aliases: ["02 §13"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#13-format-versioning"
bw-part_of:
  - "[[brain-format]]"
---
# Format versioning

- `format` in `brain.toml` is an integer: the newest file format the brain
  may contain. This document defines format 2.
- A tool MUST refuse to open a brain with a higher format than it supports.
  A best-effort read is not safe: an older reader ignores fields it does
  not know, such as `bw-privacy`, and would show what it should hide.
- A tool that writes files in a newer format first raises `format`. The
  change is one-way: undoing the run that raised it does not lower it,
  because other files in the new format may remain.
- Readers accept every older format. A format change ships with a fix that
  converts files, has a dry run, and writes one undo point.

**Format 1** kept claims and relations in the body, wrote `privacy` and
`stage` without the prefix, and wrote episode provenance without it:

```markdown
## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9…; src:…; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8…; status:superseded; by:c-01J9… -->

## Relations
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
```

`## Claims` and `## Relations` were reserved headings, at most once each;
claims could wrap onto indented continuation lines. `brain lint --fix`
(BW116) converts such notes to format 2, and consolidation converts a note
before it edits it. Episodes keep format 1 because they are immutable.
