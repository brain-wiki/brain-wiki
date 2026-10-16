---
id: 01M3250V00QBRKFMC5MRB6YHF4
type: proposal
title: "Index and retrieval"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#6-index-and-retrieval"
---
# Index and retrieval

The index is derived and lives outside the brain, in
`<cache>/brain-wiki/brains/<brain-id>/index.sqlite` (04 §1). Links are rows
of its `edges` table, written by the scanner: today one row per body link
(`rel = links_to`) or typed relation. Format 3 keeps the `links_to` rows and
drops the typed ones.

| Kept | Removed |
|---|---|
| Notes with their metadata; FTS over title, aliases, headings, and body | `claims` table and claim snippets |
| Untyped link edges: backlinks, orphans, unresolved links, link repair after renames, visualizer edges | Typed relation edges and `brain neighbors --rel` |
| Supersession guard: a hit on a superseded note returns its `bw-superseded_by` target and labels the old note; `status_factor` demotes it | Guard co-retrieval for `conflicts_with` |
| `brain_neighbors` as links and backlinks, with depth | Relation-based expansions in search intents (intents keep their type boosts) |
| `brain_read` outline: metadata, summary, headings, links, backlinks, banners | Claims and relations in outlines |
