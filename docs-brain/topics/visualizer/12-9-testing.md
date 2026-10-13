---
id: 01M3250V00H0ABE00PT7N36XEC
type: design
title: "Testing (Visualizer)"
aliases: ["12 §9"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#9-testing"
bw-part_of:
  - "[[visualizer]]"
---
# Testing (Visualizer)

- Server: token or cookie required on every route; loopback only; CSP;
  every API shape on fixture brains; profile filtering (hidden notes absent
  from world, topic, flows, health, search).
- Constellations: deterministic, size limits, single constellation for
  small brains.
- Export: titles containing HTML and script are inert; CSP hashes match.
- Front end (in brain-wiki-viz): type check and unit tests for layout
  determinism and level selection (`npm run check`). Here: the bundle is
  complete and stamped with a clean commit, and matches a rebuild of it.
- Browser: headless Chrome screenshots of each level on the fixture and a
  generated 10k brain, interaction scripts (search, fly to a topic, select a
  note, `Esc`), and frame time.
