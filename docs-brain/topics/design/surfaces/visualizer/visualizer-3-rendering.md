---
id: 01M3250V00EREQHKVW32J0S2J8
type: design
title: "Rendering"
aliases: ["Visualizer §3"]
source: "docs/design/visualizer.md#3-rendering"
---
# Rendering

The scene uses three.js on WebGL2:

- Clouds are additive glow particles, one draw call for all topics.
- Stars are instanced glow points drawn by one shader. Size shows how much a note holds (the fourth root of its line count), color its topic, and brightness its recency. Superseded and archived notes look faded, and each health flag adds a halo ring.
- Trails are solid thick lines. Supersession adds slow pulses running from the old note to the new one, so the line shows direction without breaking into dashes.
- Post-processing adds bloom, tone mapping, a vignette, depth fog, and a starfield backdrop. Camera moves are eased flights, not jumps.

Navigation is a 2.5D map, not a free 3D camera. The view keeps a fixed tilt and heading, dragging pans across the map, and the wheel or a trackpad pinch zooms toward the point under the cursor. The camera's target stays on the map's plane, so a zoom never stalls in empty space above it. A touchscreen pinch zooms toward the middle of the view. Depth still separates dense clusters, but nobody ends up upside down. Bloom and the constellation dust fade at the topic and note levels, where full strength would merge a cluster into one white blob.

Other rendering behavior:

- Highlight issues (`I`) recolors the map. Each topic cloud and constellation takes a tint from cool through amber to red by its share of flagged notes, ranked against the other flagged topics, so a brain where every topic has some flags still shows where the trouble concentrates. Unflagged topics turn grey and faint, flows fade, unflagged stars dim, and flagged stars show their halo rings. A legend explains the colors, and the minimap uses them too.
- Graphics quality has three settings. Low, the default, draws without post-processing. High adds bloom, the vignette, and grain. Auto ignores the first 1.5 s after load, samples 2.5 s of frames, and picks Low when the median frame takes longer than 1/30 s. The setting is in the dock's ⋯ menu, the browser remembers it, and `?quality=` in the URL overrides it. `prefers-reduced-motion` turns off flows and flights.
- Without WebGL2 (hardware acceleration off, or a remote desktop or VM without a GPU), the stage says why the map could not start and how to check. The topic list, search, and details panel keep working.
- When a note or topic is gone or fails to load, its panel says so instead of loading forever. When `brain viz` stops, the map backs off from topics it could not fetch, for up to a minute, and a message says the connection was lost. A failure at start-up says whether the server is unreachable or the link's token is wrong. A mangled link opens the overview.


### 3.1 Layout

The layout is deterministic and local. The same brain always produces the same map, and no layout spans the whole brain.

- Constellations sit on a disk along a golden-angle spiral, pushed apart where they collide. Topics sit on a spiral inside their constellation, with a parent topic at the center of the constellation its sub-topics form.
- Inside a topic, the map's tree is the folder tree, as Obsidian shows it. Each sub-folder is a branch, and its folder note (`x/x.md`, `x/index.md`, or `x/readme.md`) is its core, where its links meet. A folder without a folder note uses its longest note as the core, or is an empty junction when it holds only sub-folders.
- A folder's notes form a star cluster around its core, on a projected Plummer profile in order of length, so the core is dense, the edge sparse, and long notes sink toward the middle. Each note's direction is random but seeded by its id, so stars clump instead of spacing evenly. Links inside a folder pull notes together, gravity holds each at its depth, and close neighbors push apart. A note's space grows with the fourth root of its line count.
- Sub-folders orbit their parent's core, each in its own wedge, largest first, and an empty wedge keeps the way in from the parent clear. A line runs from each folder's core to its parent's core. Because every folder stays inside its wedge, no tree line crosses another or runs through a folder it does not join.
- Each nesting level sits one step farther from the camera, straight along the view, so depth never moves a star on screen. Links between folders are drawn but do not move stars, so a link to a note in another folder never changes where that note sits.
- Each folder is labeled directly above its topmost note. A label drops the leading ` · ` parts that its parent folders' titles already say, so "Lumen guide · Sync · Conflicts" reads "Conflicts".


### 3.2 Words and lines

The galaxy is the look, not the vocabulary. The interface says Overview, Group (of topics), Topic, and Note, never galaxy or constellation. It says issues, not flags; session captures, not episodes; and Sources, not `bw-sources`. Links read as plain verbs (Links to, Replaced by, Cites, and from the other end links here, replaced by this, cites this), and every number names its unit.

The folder tree is always drawn, as one line from each folder's core to its parent's, brighter at the parent end. Links between notes come in three kinds. Each has a chip in the dock, and all are on by default:

| Kind (dock chip) | From | Trail |
|---|---|---|
| Links | A wikilink in the body (`links_to`) | Faint violet, the main structure |
| Replaces | `bw-superseded_by` (`superseded_by`) | Amber, pulsing from old to new |
| Sources | A `bw-sources` entry (`source`) | Faint grey-blue, from the citing note to the cited one |
