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

Agents edited notes directly when their profile had `edit` and the topic allowed it, then ran `brain check`, which validated the change (schema, links, claims only superseded, protected files, loss guard) and recorded it as a run with an undo point; git now keeps that history (D35).

### Alternatives considered

Episodes and consolidation only (they cannot express prose or property updates); unchecked edits

## Related
- [[d34-direct-edits]]: D34: Agents edit notes directly
- [[d35-git-history]]: D35: Git is the history of direct edits
