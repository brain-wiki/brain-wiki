# D28: Checked agent edits

Status: Superseded by [D34](d34-direct-edits.md).
Argued in: [write path §2.3](../design/write-path.md#23-direct-edits).

Agents edited notes directly when their profile had `edit` and the topic allowed it. They then ran `brain check`, which validated the change (schema, links, claims only superseded and never deleted, protected files, and a loss guard) and recorded it as a run with an undo point. D34 replaced `brain check` with `brain validate`, and git now keeps the history (D35).

## Alternatives considered

- Episodes and consolidation only. They could not express prose or property updates.
- Unchecked edits.
