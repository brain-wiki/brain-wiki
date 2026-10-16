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

In format 2 the model only proposed changes as JSON ops. The engine validated and applied them, ran lint, recorded an undo point, and committed. D34 replaced this: agents edit notes as Markdown and run `brain validate`.

### Alternatives considered

- The model rewrites whole files. Details disappear a little at a time, and nobody notices.

## Related
- [[d34-direct-edits]]: D34: Agents edit notes directly
