---
id: 01M3250V00DHPJC7P8PSFKQWBR
type: design
title: "Prior art and what we take from it"
aliases: ["01 §8"]
tags: [overview]
source: "docs/design/01-overview.md#8-prior-art-and-what-we-take-from-it"
bw-part_of:
  - "[[overview]]"
---
# Prior art and what we take from it

The design borrows ideas, not code. Details and sources are in the research
notes summarized in [[14-prior-art|14]].

| Prior art | What we take | Where we differ |
|---|---|---|
| Host-native memories (instruction files, auto-memory folders) | Plain files, hard size budgets for always-loaded context | One store shared by all hosts; typed relations; validated writes |
| Markdown + SQLite knowledge tools (e.g. Basic Memory, AGPL-3.0) | Relations as Markdown bullets with wikilinks; a rebuildable local index | Canonical relation vocabulary with inverses and retrieval rules; consolidation; Apache-2.0 |
| LLM-maintained wikis ("LLM wiki" pattern, OpenClaw memory-wiki) | Raw sources compiled into curated pages; claims with provenance; health reports | Host-neutral; guard co-retrieval; edits only through ops |
| Hosted memory layers (Mem0, Zep/Graphiti, Letta) | Supersession instead of deletion; temporal validity | No service or database to run; files remain the truth |
