---
id: 01M3250V00DZMWY1R0K83HN2R0
type: design
title: "Committing direct edits"
aliases: ["05 §5"]
source: "docs/design/05-write-path-and-consolidation.md#5-committing-direct-edits"
---
# Committing direct edits

brain-wiki's own runs commit as they apply (§7.3). Direct edits are
committed by a snapshot command, run by hand or by an OS job, one job per
brain. `brain validate` stays free of side effects. Every command acts on
one brain: `--brain NAME|PATH`, else the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list                      # bare `brain schedule` lists too
```

## Subsections
- [[05-51-brain-commit]]: `brain commit`
- [[05-52-brain-schedule]]: `brain schedule`
