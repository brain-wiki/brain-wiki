---
id: 01M3250V00YFCZVNBFPHAKGE6B
type: design
title: "Graph expansion"
aliases: ["Index and search §6.4"]
source: "docs/design/index-and-search.md#64-graph-expansion"
---
# Graph expansion

Search does not follow links. It returns matching notes plus their guard
notes (§5) and nothing else. To see what a hit links to, what links to it,
or how it evolved, call `brain_neighbors` on it (§9.2).
