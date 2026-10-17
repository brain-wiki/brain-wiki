---
id: 01M3250V002NJ2V3Z977FWHA1S
type: guide
title: "Import"
source: "docs/user/import.md"
---
# Import

`brain import` has two modes. Choose one per command:


- Every mode is a dry run until you add `--apply`. `--dry-run` wins over
  `--apply`.
- A flag the mode does not use is an error, not ignored. For example,
  `--phase` needs `--overlay`.
- Documents and your agents' memory files are imported by an agent, not
  by a command. See [[user-import-documents-and-memory-files|Documents and memory files]].

## Sections
- [[user-import-adopt-an-obsidian-vault-or-markdown-folder]]: Adopt an Obsidian vault or Markdown folder
- [[user-import-copy-notes-into-an-existing-brain]]: Copy notes into an existing brain
- [[user-import-documents-and-memory-files]]: Documents and memory files (Import)
