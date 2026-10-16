# D12: ULIDs as identifiers

Status: accepted.
Argued in: [brain format §5](../design/brain-format.md#5-identifiers).

Brains, notes, episodes, rules, and runs are identified by ULIDs. Rules and runs add an `r-` or `run-` prefix. A ULID sorts by creation time and needs no coordination between devices. An id never changes when a file is renamed or moved, so links resolve by file name the way Obsidian resolves them, and the id finds a note again after it moves.

## Alternatives considered

- The path as the only identity. Every rename would break references.
- UUIDv4. It does not sort by time.
