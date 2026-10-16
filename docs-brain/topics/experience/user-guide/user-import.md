---
id: 01M3250V002NJ2V3Z977FWHA1S
type: guide
title: "Import"
source: "docs/user/import.md"
---
# Import

`brain import` has four modes. Choose one per command:


- Every mode is a dry run until you add `--apply`. `--dry-run` wins over
  `--apply`.
- A flag the mode does not use is an error, not ignored. For example,
  `--agent` needs `--to-episodes`, and `--phase` needs `--overlay`.

## Sections
- [[user-import-adopt-an-obsidian-vault-or-markdown-folder]]: Adopt an Obsidian vault or Markdown folder
- [[user-import-copy-notes-into-an-existing-brain]]: Copy notes into an existing brain
- [[user-import-documents-as-episodes]]: Documents as episodes
- [[user-import-your-agents-memory-files]]: Your agents' memory files
