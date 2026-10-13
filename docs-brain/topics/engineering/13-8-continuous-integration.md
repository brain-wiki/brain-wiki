---
id: 01M3250V0011AMEB62ANDCR824
type: design
title: "Continuous integration"
aliases: ["13 §8"]
tags: [engineering]
source: "docs/design/13-engineering.md#8-continuous-integration"
bw-part_of:
  - "[[engineering]]"
---
# Continuous integration

When the repository is published, GitHub Actions jobs:

1. Lint and type check.
2. Tests on the platform and Python matrix.
3. Plugin manifest validation: JSON schemas for Agent Plugins and
   Antigravity manifests; `claude plugin validate .` when the CLI is
   available.
4. Visualizer bundle check: check out brain-wiki-viz at the commit in
   `src/brainwiki/viz/app/BUILD_INFO.json`, `npm ci`, then
   `scripts/check_viz.py --source <checkout>` rebuilds it and fails if the
   result differs from the committed bundle. brain-wiki-viz's own CI runs its
   type check, unit tests, and the public-registry lockfile check
   (`npm run check`).
5. Version consistency (§4).
6. Bench offline suites and the 1k perf suite.

Until then, the same steps run locally through `uv run scripts/check.py`.
