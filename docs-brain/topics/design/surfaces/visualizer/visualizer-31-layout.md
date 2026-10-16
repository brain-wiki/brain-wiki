---
id: 01M3250V00WYW2JZFVX453G77Q
type: design
title: "Layout"
aliases: ["Visualizer §3.1"]
source: "docs/design/visualizer.md#31-layout"
---
# Layout

The layout is deterministic and local. The same brain always produces the same map, and no layout spans the whole brain.

- Constellations sit on a disk along a golden-angle spiral, pushed apart where they collide. Topics sit on a spiral inside their constellation, with a parent topic at the center of the constellation its sub-topics form.
- Inside a topic, the map's tree is the folder tree, as Obsidian shows it. Each sub-folder is a branch, and its folder note (`x/x.md`, `x/index.md`, or `x/readme.md`) is its core, where its links meet. A folder without a folder note uses its longest note as the core, or is an empty junction when it holds only sub-folders.
- A folder's notes form a star cluster around its core, on a projected Plummer profile in order of length, so the core is dense, the edge sparse, and long notes sink toward the middle. Each note's direction is random but seeded by its id, so stars clump instead of spacing evenly. Links inside a folder pull notes together, gravity holds each at its depth, and close neighbors push apart. A note's space grows with the fourth root of its line count.
- Sub-folders orbit their parent's core, each in its own wedge, largest first, and an empty wedge keeps the way in from the parent clear. A line runs from each folder's core to its parent's core. Because every folder stays inside its wedge, no tree line crosses another or runs through a folder it does not join.
- Each nesting level sits one step farther from the camera, straight along the view, so depth never moves a star on screen. Links between folders are drawn but do not move stars, so a link to a note in another folder never changes where that note sits.
- Each folder is labeled directly above its topmost note. A label drops the leading ` · ` parts that its parent folders' titles already say, so "Lumen guide · Sync · Conflicts" reads "Conflicts".
