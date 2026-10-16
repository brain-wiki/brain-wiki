---
id: 01M3250V008NSZ6WWMJZGK8TZT
type: design
title: "Committing direct edits"
aliases: ["Write path §5"]
source: "docs/design/write-path.md#5-committing-direct-edits"
---
# Committing direct edits

brain-wiki's own runs commit as they apply (§7.3). Direct edits are
committed by a snapshot command, run by hand or by an OS job, one job per
brain ([[d35-git-history|D35]]). `brain validate` stays free
of side effects. Every command acts on one brain: `--brain NAME|PATH`, else
the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list                      # bare `brain schedule` lists too
```

## Subsections
- [[write-path-51-brain-commit]]: `brain commit`
- [[write-path-52-brain-schedule]]: `brain schedule`
