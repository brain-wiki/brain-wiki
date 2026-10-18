---
id: 01M3250V0049WHX7281D87R095
type: design
title: "Guards (Brain format)"
aliases: ["Brain format §7"]
source: "docs/design/brain-format.md#7-guards"
---
# Guards (Brain format)

Two relations change what retrieval must return.

- When a search or read returns a note that names a replacement in
  `bw-superseded_by` (§6.3), the replacement MUST be returned with it, and
  the old note MUST be labeled superseded. A chain is followed to the
  newest note.
- When a search or read returns a note that other notes name in
  `bw-superseded_by`, those notes are listed as the history it replaced.
- When a search or read returns an active note in a `bw-conflicts_with`
  relation (§6.6) with another active note, held on either of them, the
  other note MUST be returned with it, labeled as a conflict. Once either
  note is superseded or archived, the conflict guard stops and the
  supersession guard carries the reader to the current note.

This holds regardless of search scores and result limits. The guard's
notes come on top of the top-k results
([[index-and-search-5-guards|index and search §5]]).

`bw-depends_on` adds no guard. A note that rests on a superseded or
archived note is listed for review instead
([[index-and-search-9-other-queries|index and search §9]]).
