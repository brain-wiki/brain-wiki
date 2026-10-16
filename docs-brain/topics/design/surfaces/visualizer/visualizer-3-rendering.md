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

## Subsections
- [[visualizer-31-layout]]: Layout
- [[visualizer-32-words-and-lines]]: Words and lines
