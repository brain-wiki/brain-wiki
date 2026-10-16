# D34: Agents edit notes directly

Status: accepted.
Argued in: [write path](../design/write-path.md).

Agents with `edit` edit notes directly and run `brain validate`, which checks frontmatter against the schema; orientation teaches the schema to agents that may edit. Consolidation is an optional helper (`--prepare`, then `--done`), and the inbox is optional capture.

## Alternatives considered

Validated ops as the curated write path; `brain check` with a loss guard and a run per edit
