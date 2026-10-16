---
id: 01M3250V00M0G7SMM7S7C3A8HV
type: design
title: "Supersession guard (Brain format)"
aliases: ["Brain format §7"]
source: "docs/design/brain-format.md#7-supersession-guard"
---
# Supersession guard (Brain format)

`bw-superseded_by` (§6.3) changes what retrieval must return:

- When a search or read returns a note that names a replacement in
  `bw-superseded_by`, the replacement MUST be returned with it, and the old
  note MUST be labeled superseded. A chain is followed to the newest note.
- When a search or read returns a note that other notes name in
  `bw-superseded_by`, those notes are listed as the history it replaced.

This holds regardless of search scores and result limits: the guard's notes
are added on top of the top-k results
([[index-and-search-5-supersession-guard|index and search §5]]).

Format 2 also had a `conflicts_with` relation whose two sides were always
retrieved together. Format 3 has no conflict relation: a note that
disagrees with another says so in a sentence with a link.
