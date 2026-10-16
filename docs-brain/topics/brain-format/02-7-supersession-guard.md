---
id: 01M3250V0056APJ7DY85JR84EW
type: design
title: "Supersession guard (Brain format)"
aliases: ["02 §7"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#7-supersession-guard"
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
([[04-5-supersession-guard|04 §5]]).

Format 2 also had a `conflicts_with` relation whose two sides were always
retrieved together. Format 3 has no conflict relation: a note that
disagrees with another says so in a sentence with a link.
