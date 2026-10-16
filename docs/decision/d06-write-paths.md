# D6: Two write paths

Status: accepted.
Argued in: [write path](../design/write-path.md).

Two write paths: an append-only inbox open to any agent, and direct edits to notes by agents whose profile has `edit`, checked with `brain validate` (D34). Human edits are always allowed. Format 2's validated ops and checked edits are gone.

## Alternatives considered

Ops as the only curated path (heavy for the common case, and agents with file access write files anyway); unchecked direct edits
