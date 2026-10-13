---
id: 01M3250V004EW02G284WTKMDA5
type: design
title: "Pipeline (Write path and consolidation)"
aliases: ["05 §4.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#41-pipeline"
bw-part_of:
  - "[[05-4-consolidation]]"
---
# Pipeline (Write path and consolidation)

```
 select ──► packet ──► propose ──► validate ──► apply ──► lint ──► record ──► commit
   │          │           │            │           │        │         │          │
 pending   filtered    backend     §7 checks   in-memory  strict   run JSON   git (if any)
 episodes  by backend  (agent or   (schema,    writer,    on all   + pre-     or proposal
 (inbox)   profile     command)    refs, loss, atomic     touched  images     file for
                                    budgets)   rename     files               review
```

Each stage is deterministic except **propose**. A failure before **apply**
leaves the brain untouched. A failure during **apply** or **lint** is
rolled back from in-memory pre-images before the lock is released.
