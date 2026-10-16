---
id: 01M3250V00S3Q75T0HJEQ08292
type: decision
title: "D28: Checked agent edits"
status: superseded
aliases: ["D28"]
source: "docs/decision/d28-checked-edits.md"
bw-superseded_by: "[[d34-direct-edits]]"
---
# D28: Checked agent edits

Status: Superseded by [[d34-direct-edits|D34]].
Argued in: [[write-path-23-direct-edits|write path §2.3]].

Agents edited notes directly when their profile had `edit` and the topic allowed it. They then ran `brain check`, which validated the change (schema, links, claims only superseded and never deleted, protected files, and a loss guard) and recorded it as a run with an undo point. D34 replaced `brain check` with `brain validate`, and git now keeps the history (D35).

### Alternatives considered

- Episodes and consolidation only. They could not express prose or property updates.
- Unchecked edits.

## Related
- [[d34-direct-edits]]: D34: Agents edit notes directly
- [[d35-git-history]]: D35: Git is the history of direct edits
