# D5: The supersession guard

Status: accepted.
Argued in: [brain format §7](../design/brain-format.md#7-guards), [index and search §5](../design/index-and-search.md#5-guards).

When retrieval returns a superseded note, it also returns the note that replaced it, following `bw-superseded_by` to the newest note in the chain. When it returns a note that replaced others, it names the notes it replaced. Search ranks by similarity, which says nothing about which note is current, so this rule makes retrieval correct about change.

Format 2 also returned notes linked by `conflicts_with`. Format 3 has no conflict relation.

## Alternatives considered

- Ranking alone. A superseded note can still rank first, with nothing saying it is out of date.
- Contradiction reports after the fact. By then the agent has already used the old note.
