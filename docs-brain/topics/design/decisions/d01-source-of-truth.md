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

The brain directory holds everything brain-wiki knows. The SQLite index is a cache in the user cache directory, outside the brain, and `brain index --rebuild` recreates it from the files. People read, edit, diff, and sync a brain with their own tools, and deleting the index loses nothing.

### Alternatives considered

- A database as the source of truth, with files as an export. People could not edit or sync their memory with ordinary tools.
- The index inside the brain. Git and sync tools would copy a binary cache between machines.
