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
| Concentric rings for a topic with many notes, each restarting at 12 o'clock, or one arm coiling outward | Rings read as a stack of hoops. One continuous arm keeps file order on a single path but looks much like the rings from a distance; galaxy arms read as one shape and put the newest dated notes at the rim. |
| Sunflower clusters inside folder outlines | No crossings, but golden-angle spacing laid notes out evenly, so a folder of 200 daily notes read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| Groups of topics clustered by their links, and each topic's notes as a star cluster around its page (the second design) | The folder tree already says how topics group, and clustering put topics in groups nobody made. A scatter showed neither a note's length nor its place in its folder, and the cluster around each folder note only hinted at the tree. |
| Sub-topics packed around their parent's own notes, with the parent's ring as the center of the packing | A small center lands at the edge of the packing, so each level could double a footprint; a tree seven folders deep took most of the map. |
| Sub-topics packed inside their parent's footprint, around its ring | Stems ran across siblings and sub-topics sat under their parent's ring: 29 of 168 stems and 64 sub-topics on a 181-topic brain. In orbit, each sub-topic keeps a wedge of its own. |
| A topic's details with a button that opens its topic page as a note | Three views of one thing, each a click from the next: the topic's counts, the page's summary and links, and the page's text in the preview. A topic of five notes or fewer listed none of them. |
| Stems that start at the edge of the parent's ring | They stay off the parent's own notes, but the ring draws only close up, so from farther out a topic's stems started on an invisible circle around its star. |
| A fixed gap between planes | Deep sub-topics are small, so a gap that reads at the top made their stems long vertical spikes; the gap shrinks with depth instead. |
| A 2.5D terrain atlas, with topics as territories and notes as towns | Easiest to navigate, but the map keeps depth for separating levels. Both would use the same levels and API. |
| No build step, with vendored ES modules and hand-written JavaScript | Keeps contributors off Node, but panels of this size and custom shaders are much harder to maintain without types and a bundler. Committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | It shows no supersession, relation kinds, citations, or health flags. It works alongside this map. |
| Rendering images on the server | No interaction. |
