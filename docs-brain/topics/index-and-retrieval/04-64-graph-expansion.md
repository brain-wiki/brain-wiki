---
id: 01M3250V00YNTEATJS913JVDMF
type: design
title: "Graph expansion"
aliases: ["04 §6.4"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#64-graph-expansion"
bw-part_of:
  - "[[04-6-search]]"
---
# Graph expansion

After ranking, each of the top results may pull in one hop of neighbors by
intent. Expanded results carry `via: {relation, from}` and a score of half
their source's score. At most 3 per result and 10 in total.

| Intent | Adds | Use when the agent asks |
|---|---|---|
| `none` | nothing (guards still apply) | exact lookup |
| `context` (default) | the hub the hit is `part_of` | "what is this about?" |
| `why` | `depends_on` targets (prerequisites) | "why is it this way?" |
| `impact` | notes that `depends_on` the hit | "what breaks if this changes?" |
| `history` | `supersedes` neighbors in both directions (one hop; guards already follow the chain to the newest note, §5) | "how did this evolve?" |
| `related` | `related_to` and `links_to` neighbors | exploration |
