---
id: 01M3250V00GE5V6YNP9CGGAKVX
type: design
title: "Testing (Visualizer)"
aliases: ["Visualizer §9"]
source: "docs/design/visualizer.md#9-testing"
---
# Testing (Visualizer)

- Server: the token or cookie is required on every route; loopback is the default, and `--host` binds beyond it with the token still required; the CSP; every API shape on fixture brains.
- The topic tree: depth-first order with numbers compared as numbers, content totals, and flows of typed links only.
- Export: titles containing HTML and script are inert, and the CSP hashes match.
- Front end, in brain-wiki-viz: type checks and unit tests for layout determinism, footprint containment, ring order and wrapping, and level selection (`npm run check`). Here: the bundle is complete, stamped with a clean commit, and matches a rebuild.
- Browser: headless Chrome screenshots of each level on the fixture brain and a generated 10k brain, interaction scripts (search, fly to a topic, select a note, `Esc`), and frame time. Scripts drive the app through `window.__brainViz` (the controller, the scene, and a `ready` flag) and wait for `body[data-ready]`.
