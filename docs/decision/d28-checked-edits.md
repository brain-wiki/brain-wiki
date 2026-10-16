# D28: Checked agent edits

Status: Superseded by [D34](d34-direct-edits.md).
Argued in: [write path §2.3](../design/write-path.md#23-direct-edits).

Agents edited notes directly when their profile had `edit` and the topic allowed it, then ran `brain check`, which validated the change (schema, links, claims only superseded, protected files, loss guard) and recorded it as a run with an undo point; git now keeps that history (D35).

## Alternatives considered

Episodes and consolidation only (they cannot express prose or property updates); unchecked edits
