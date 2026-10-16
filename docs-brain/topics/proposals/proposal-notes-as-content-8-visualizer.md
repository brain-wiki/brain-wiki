---
id: 01M3250V001X8F0VRSCE7V40PC
type: proposal
title: "Visualizer"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#8-visualizer"
---
# Visualizer

- Nodes: topics, hubs, notes; edges: wikilinks. Topic flows count links
  between topics instead of typed relations.
- Flags: lint errors, orphans, superseded. Claim counts, typed relations,
  `conflict`, and `unverified` go away.
- The preview shows metadata as properties and renders the body.
- The API change lands here first, then in brain-wiki-viz, then as a new
  bundle (12 §5).
