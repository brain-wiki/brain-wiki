---
id: 01M3250V00YFCZVNBFPHAKGE6B
type: design
title: "Graph expansion"
aliases: ["Index and search §6.4"]
source: "docs/design/index-and-search.md#64-graph-expansion"
---
# Graph expansion

Removed in format 3. Search returns matching notes plus their guard notes
(§5) and nothing else: there is no `intent` parameter and no expansion
along links. To see what a hit links to, what links to it, or how it
evolved, follow it with `brain_neighbors` (§9.2).
