---
id: 01M3250V00DHPJC7P8PSFKQWBR
type: design
title: "Prior art and what we take from it"
aliases: ["01 §8"]
source: "docs/design/01-overview.md#8-prior-art-and-what-we-take-from-it"
---
# Prior art and what we take from it

The design borrows ideas, not code. Details and sources are in the research
notes summarized in [[14-prior-art|14]].

| Prior art | What we take | Where we differ |
|---|---|---|
| Host-native memories (instruction files, auto-memory folders) | Plain files, hard size budgets for always-loaded context | One store shared by all hosts; validated edits; supersession with a retrieval rule |
| Markdown + SQLite knowledge tools (e.g. Basic Memory, AGPL-3.0) | Notes as Markdown with wikilinks; a rebuildable local index | Supersession as metadata with a retrieval rule; an inbox and a consolidation helper; Apache-2.0 |
| LLM-maintained wikis ("LLM wiki" pattern, OpenClaw memory-wiki) | Raw sources compiled into curated pages; source citations; health reports | Host-neutral; supersession guard; direct edits checked by `brain validate` and kept in git |
| Hosted memory layers (Mem0, Zep/Graphiti, Letta) | Supersession instead of deletion; temporal validity | No service or database to run; files remain the truth |
