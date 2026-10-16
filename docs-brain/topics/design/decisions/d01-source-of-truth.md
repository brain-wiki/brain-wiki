---
id: 01M3250V00HQ6D1ZX2P3HQX80B
type: decision
title: "D1: Files are the source of truth"
aliases: ["D1"]
source: "docs/decision/d01-source-of-truth.md"
---
# D1: Files are the source of truth

Status: accepted.
Argued in: [[brain-format-2-directory-layout|brain format §2]], [[index-and-search|index and search]].

The brain directory is the only source of truth; the SQLite index is a rebuildable cache stored outside the brain.

### Alternatives considered

Database as source of truth; index inside the brain
