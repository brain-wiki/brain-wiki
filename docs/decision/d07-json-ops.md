# D7: The model proposes JSON ops

Status: Superseded by [D34](d34-direct-edits.md).
Argued in: [write path](../design/write-path.md).

In format 2 the model only proposed changes as JSON ops. The engine validated and applied them, ran lint, recorded an undo point, and committed. D34 replaced this: agents edit notes as Markdown and run `brain validate`.

## Alternatives considered

- The model rewrites whole files. Details disappear a little at a time, and nobody notices.
