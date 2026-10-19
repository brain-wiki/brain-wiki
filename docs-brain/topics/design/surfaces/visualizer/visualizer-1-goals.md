---
id: 01M3250V00D3T9C8FD0K3R1G54
type: design
title: "Goals (Visualizer)"
aliases: ["Visualizer §1"]
source: "docs/design/visualizer.md#1-goals"
---
# Goals (Visualizer)

`brain viz` opens a local, interactive map of a brain. It helps a person understand and audit their brain:

| Question | What the map shows |
|---|---|
| What is in here? | The topic tree, one plane per level; zooming in shows each topic's notes as a ring of slices around its topic page |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, files that failed to parse |
| What changed recently? | Brightness by recency, and recent runs highlighted where they changed notes |

The map is read-only and local. It does not edit notes, support collaboration, or get hosted publicly.

This is the third design ([[d41-map-of-the-topic-tree|D41]]):

- The first drew every note in one 3D force graph. At 10k notes and 90k links that meant 19.5 MB of JSON, a global layout in the browser, overlapping labels, and a tangle of lines.
- The second grouped topics into clusters by their links and scattered each topic's notes as stars around its page. The groups were not anything the user made, and a scatter showed neither how long a note is nor where it sits in its folder.
- The third draws the folder tree itself. It works like a map: it shows a little at every zoom level, adds detail as you approach, and keeps positions stable. Every visual element encodes data.
