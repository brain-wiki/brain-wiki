---
id: 01M3250V00DBMEF9GQ8GPEKG6D
type: design
title: "Requirements (Index and retrieval)"
aliases: ["04 §1"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#1-requirements"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Requirements (Index and retrieval)

| # | Requirement | Why |
|---|---|---|
| R1 | The index is derived entirely from the brain directory and can be deleted at any time. | D1: files are the truth. Users never repair an index; they rebuild it. |
| R2 | Results reflect edits made a moment ago by any tool (Obsidian, git pull, another agent). | Agents act on what they retrieve; stale results cause wrong actions. |
| R3 | Privacy and topic restrictions are applied before ranking, never after. | Filtering after top-k leaks counts and can starve results; filtering before is simpler to prove correct. |
| R4 | Guard neighbors are always returned (02 §7). | Correctness about change is the core retrieval promise (G5). |
| R5 | Fast enough for hooks: search p95 < 50 ms, freshness check < 150 ms at 10k notes. | Hooks run on every session start and, optionally, every prompt (G7). |
| R6 | Lexical search works with zero models; embeddings are optional and later. | G6: no required services. |
