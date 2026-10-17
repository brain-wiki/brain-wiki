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
| The first design, one 3D force graph of every note (`3d-force-graph`) | It did not scale: a global layout and payload, a tangle of lines, and no navigation. |
| A force layout per topic, seeded by its folder tree | Deep or lopsided folder trees crossed themselves: 77 of 175 tree lines crossed on a 176-note topic five folders deep, and the 3D scatter hid how deep a folder sat. |
| A radial tree per topic, with a slice per folder and a line per note | No crossings, but a folder of 200 daily notes became a spiky ball, lines routed along rings read as bent polylines, and nothing showed how much a note holds. |
| Circle packing per topic, nested circles with no lines | Compact, but containment alone did not read as levels, the topic page often landed at the edge, and lines from a folder to its sub-folders ran through sibling circles (7 of 33 on a 176-note topic). Orbits around each folder's core fix both, at some cost in space when a folder has many sub-folders. |
| Sunflower clusters inside folder outlines | No crossings, but golden-angle spacing laid notes out evenly, so a folder of 200 daily notes read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| A 2.5D terrain atlas, with topics as territories and notes as towns | Easiest to navigate, but the galaxy keeps depth for separating dense clusters. Both would use the same levels and API. |
| No build step, with vendored ES modules and hand-written JavaScript | Keeps contributors off Node, but panels of this size and custom shaders are much harder to maintain without types and a bundler. Committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | It shows no supersession, citations, or health flags. It works alongside this map. |
| Rendering images on the server | No interaction. |
