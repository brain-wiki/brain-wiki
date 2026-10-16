---
id: 01M3250V00GE5V6YNP9CGGAKVX
type: design
title: "Testing (Visualizer)"
aliases: ["Visualizer §9"]
source: "docs/design/visualizer.md#9-testing"
---
# Testing (Visualizer)

- Server: token or cookie required on every route; loopback by default,
  and `--host` binds beyond it with the token still required; CSP; every
  API shape on fixture brains.
- Constellations: deterministic, size limits, single constellation for
  small brains.
- Export: titles containing HTML and script are inert; CSP hashes match.
- Front end (in brain-wiki-viz): type check and unit tests for layout
  determinism and level selection (`npm run check`). Here: the bundle is
  complete and stamped with a clean commit, and matches a rebuild of it.
- Browser: headless Chrome screenshots of each level on the fixture and a
  generated 10k brain, interaction scripts (search, fly to a topic, select a
  note, `Esc`), and frame time. Scripts drive the app through
  `window.__brainViz` (the controller, the scene, and a `ready` flag), and
  wait for `body[data-ready]`.
