---
id: 01M3250V00CA1EC3E8GJ2S1MGD
type: design
title: "Requirements (Index and search)"
aliases: ["Index and search §1"]
source: "docs/design/index-and-search.md#1-requirements"
---
# Requirements (Index and search)

| # | Requirement | Why |
|---|---|---|
| R1 | The index is derived entirely from the brain folder and can be deleted at any time. | Files are the truth ([[d01-source-of-truth\|D1]]). Users rebuild an index, never repair it. |
| R2 | Results reflect edits made a moment ago by any tool (Obsidian, git pull, another agent). | Agents act on what they retrieve. Stale results cause wrong actions. |
| R3 | Filters (topic, type, tag, property, date) apply before ranking. | Filtering after top-k can starve results. |
| R4 | A superseded note always comes with the note that replaced it, and an active note with the active notes it conflicts with ([[brain-format-7-guards\|brain format §7]]). | Correctness about change and disagreement is the core retrieval promise (G5). |
| R5 | Search p95 under 50 ms and a freshness check under 150 ms at 10k notes. | Agents search and read many times in one task (G7). |
| R6 | Lexical search works without any model. | No required services (G6). |
