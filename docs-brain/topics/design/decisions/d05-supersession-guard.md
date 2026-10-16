---
id: 01M3250V0074BEREVT9EQYN9TE
type: decision
title: "D5: The supersession guard"
aliases: ["D5"]
source: "docs/decision/d05-supersession-guard.md"
---
# D5: The supersession guard

Status: accepted.
Argued in: [[brain-format-7-supersession-guard|brain format §7]], [[index-and-search-5-supersession-guard|index and search §5]].

The supersession guard: a hit on a superseded note always comes with the note that replaced it (followed through `bw-superseded_by` to the newest), and a hit on a successor names the notes it replaced. Format 2 also co-retrieved `conflicts_with` notes; format 3 has no conflict relation.

### Alternatives considered

Rank-based retrieval only; post-hoc contradiction reports only
