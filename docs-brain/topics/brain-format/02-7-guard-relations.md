---
id: 01M3250V008ZC63SZ4YNRBKEXA
type: design
title: "Guard relations"
aliases: ["02 §7"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#7-guard-relations"
bw-part_of:
  - "[[brain-format]]"
---
# Guard relations

Two families change what retrieval must return:

- **`supersedes`**: when a search or read returns a note that has been
  superseded, the superseding note MUST be returned with it, and the old
  note MUST be labeled as superseded. When the newer note is returned, the
  note it replaced is listed as history.
- **`conflicts_with`**: when either side is returned, the other side MUST
  be returned with it.

This holds regardless of which side declared the relation, of search
scores, and of result limits: guard neighbors are added on top of the
top-k results ([[04-5-guard-co-retrieval|04]]).

Claim-level supersession (§6.3) stays out of the way: reads list current
claims and say how many were superseded or retracted, and superseded claims
are excluded from search snippets.
