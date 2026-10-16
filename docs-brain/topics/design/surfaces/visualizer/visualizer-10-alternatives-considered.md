---
id: 01M3250V00GNCJ0612AK1EQ0X5
type: design
title: "Alternatives considered (Visualizer)"
aliases: ["Visualizer §10"]
source: "docs/design/visualizer.md#10-alternatives-considered"
---
# Alternatives considered (Visualizer)

| Option | Why not |
|---|---|
| The first design: one 3D force graph of everything (`3d-force-graph`) | Did not scale: global layout and payload, hairball, no navigation. |
| A force layout per topic, seeded by its folder tree (strong tree springs, sub-folders in random directions) | Deep or lopsided folder trees crossed themselves: 77 of 175 tree lines crossed on a 176-note topic five folders deep, and the 3D scatter hid how deep a folder sat. |
| A radial tree per topic (a slice per folder, a line per note) | No crossings, but a line per note turned a folder of 200 dailies into a spiky ball, lines routed along rings to avoid crossings read as bent polylines, and nothing showed how much a note holds. |
| Plain circle packing per topic (nested circles, no lines) | Compact, but containment alone did not read as levels, the topic index often landed at the edge of the topic, and lines added from a folder to its sub-folders ran through sibling circles (7 of 33 on a 176-note topic). Orbits around each folder's core fix both, at some cost in space when a folder has many sub-folders. |
| Sunflower clusters inside folder outlines | No crossings, but the golden-angle spacing laid notes out evenly (a folder of 200 dailies became a uniform disc), which read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| 2.5D terrain atlas (topics as territories, notes as towns) | Easiest to navigate, but the galaxy keeps depth for separating dense clusters and matches the brain metaphor; both use the same levels and API. |
| No build step (vendored ES modules, hand-written JS) | Keeps contributors off Node, but a HUD of this size and custom shaders are much harder to maintain without types and a bundler; committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | No supersession, citations, or health flags; fine as a complement. |
| Server-side rendering to images | No interaction. |
