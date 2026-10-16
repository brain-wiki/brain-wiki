# D1: Files are the source of truth

Status: accepted.
Argued in: [brain format §2](../design/brain-format.md#2-directory-layout), [index and search](../design/index-and-search.md).

The brain directory is the only source of truth; the SQLite index is a rebuildable cache stored outside the brain.

## Alternatives considered

Database as source of truth; index inside the brain
