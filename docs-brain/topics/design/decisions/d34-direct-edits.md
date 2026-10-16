---
id: 01M3250V00VK0CKAJ8E8CS98ZC
type: decision
title: "D34: Agents edit notes directly"
aliases: ["D34"]
source: "docs/decision/d34-direct-edits.md"
---
# D34: Agents edit notes directly

Status: accepted.
Argued in: [[write-path|write path]].

Agents whose profile has `edit` create and edit notes with their own file tools, then run `brain validate`, which checks frontmatter against the schema. Orientation shows those agents a short "Writing notes" guide. Consolidation is an optional helper (`brain consolidate --prepare`, then `--done`), and the inbox is optional capture.

### Alternatives considered

- Validated ops as the way agents change notes (D7).
- `brain check`, with a loss guard and a run per edit (D28).

## Related
- [[d07-json-ops]]: D7: The model proposes JSON ops
- [[d28-checked-edits]]: D28: Checked agent edits
