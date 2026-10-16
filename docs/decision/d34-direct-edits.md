# D34: Agents edit notes directly

Status: accepted.
Argued in: [write path](../design/write-path.md).

Agents whose profile has `edit` create and edit notes with their own file tools, then run `brain validate`, which checks frontmatter against the schema. Orientation shows those agents a short "Writing notes" guide. Consolidation is an optional helper (`brain consolidate --prepare`, then `--done`), and the inbox is optional capture.

## Alternatives considered

- Validated ops as the way agents change notes (D7).
- `brain check`, with a loss guard and a run per edit (D28).
