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
| What is in here? | Topics as glowing clouds grouped into constellations; zooming in shows notes as stars |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, files that failed to parse |
| What changed recently? | Brightness by recency, and recent runs highlighted where they changed notes |

The map is read-only and local. It does not edit notes, support collaboration, or get hosted publicly.

This is the second design. The first drew every note in one 3D force graph. At 10k notes and 90k links that meant 19.5 MB of JSON, a global layout in the browser, overlapping labels, and a tangle of lines, and its flat list of 250 topic checkboxes did not help anyone navigate. The second design works like a map: it shows a little at every zoom level, adds detail as you approach, and keeps positions stable. Every visual element encodes data.
