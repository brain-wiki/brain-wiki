---
id: 01M3250V001VPSHGC8R75A9E66
type: design
title: "Alternatives considered (Visualizer)"
aliases: ["12 §10"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#10-alternatives-considered"
bw-part_of:
  - "[[visualizer]]"
---
# Alternatives considered (Visualizer)

| Option | Why not |
|---|---|
| The first design: one 3D force graph of everything (`3d-force-graph`) | Did not scale: global layout and payload, hairball, no navigation. |
| 2.5D terrain atlas (topics as territories, notes as towns) | Easiest to navigate, but the galaxy keeps depth for separating dense clusters and matches the brain metaphor; both use the same levels and API. |
| No build step (vendored ES modules, hand-written JS) | Keeps contributors off Node, but a HUD of this size and custom shaders are much harder to maintain without types and a bundler; committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | No typed relations, guards, or health flags; fine as a complement. |
| Server-side rendering to images | No interaction. |
