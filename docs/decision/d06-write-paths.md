# D6: Two write paths

Status: accepted.
Argued in: [write path](../design/write-path.md).

Notes change in two ways:

- Any agent may append an episode to the inbox. Nothing is overwritten, so concurrent agents never conflict.
- People, and agents whose profile has `edit`, edit notes directly and check them with `brain validate` (D34).

People can always edit the files. Format 2's validated ops and checked edits no longer exist.

## Alternatives considered

- Ops as the only way to change notes. Too heavy for small changes, and agents with file access write files anyway.
- Direct edits with no check.
