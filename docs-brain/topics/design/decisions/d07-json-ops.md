---
id: 01M3250V00B8VXNRX6T8B99R2Q
type: decision
title: "D7: The model proposes JSON ops"
status: superseded
aliases: ["D7"]
source: "docs/decision/d07-json-ops.md"
bw-superseded_by: "[[d34-direct-edits]]"
---
# D7: The model proposes JSON ops

Status: Superseded by [[d34-direct-edits|D34]].
Argued in: [[write-path|write path]].

The LLM only proposed JSON ops; the engine validated, applied, linted, recorded undo, and committed.

### Alternatives considered

LLM rewrites whole files

## Related
- [[d34-direct-edits]]: D34: Agents edit notes directly
