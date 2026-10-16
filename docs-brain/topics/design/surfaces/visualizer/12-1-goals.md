---
id: 01M3250V00YSBJ103YNB7SVR2Z
type: design
title: "Goals (Visualizer)"
aliases: ["12 §1"]
source: "docs/design/12-visualizer.md#1-goals"
---
# Goals (Visualizer)

`brain viz` opens a local, interactive map of a brain. It exists to help a
person **understand and audit** their brain:

| Question | What the view shows |
|---|---|
| What is in here? | Topics as nebulae grouped into constellations; zooming in reveals notes as stars |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, lint errors |
| What changed recently? | Brightness by recency; recent consolidation runs, highlighted where they landed |

Non-goals: editing notes, collaboration, public hosting. The view is
read-only and local.

Lessons from the first design (a 3D force graph of every note):

- Rendering 10k notes and 90k links at once is slow (19.5 MB of JSON, a
  global layout in the browser) and unreadable: overlapping labels and a
  hairball.
- A flat list of 250 topic checkboxes is not navigation.

The second design works like a map: it shows a little at every zoom level,
reveals detail as you approach, and keeps positions stable so places stay
where you left them. Every visual element encodes data; there is no
decoration for its own sake.
