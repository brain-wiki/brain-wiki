---
id: 01M3250V008ZC63SZ4YNRBKEXA
type: design
title: "Guard relations"
aliases: ["02 §7"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#7-guard-relations"
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
top-k results. The only exception is privacy. If a guard neighbor is above
the caller's privacy level, the caller is told that a hidden superseding or
conflicting note exists, but not its content ([[04-5-guard-co-retrieval|04]]).

Claim-level supersession (§6.3) is shown inline: superseded claims are
marked as such in every read and are excluded from search snippets.

## Relations
- part_of [[brain-format]]
