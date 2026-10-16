---
id: 01M3250V00HCCR6TX929BJ8826
type: design
title: "Continuous integration"
aliases: ["Engineering §8"]
source: "docs/design/engineering.md#8-continuous-integration"
---
# Continuous integration

`uv run scripts/check.py` is the one entry point, locally and in CI. It
runs each step and reports pass or fail:

1. `ruff check` and `ruff format --check` on `src`, `tests`, and `scripts`.
2. The test suite (`pytest`).
3. Minimal visibility (`scripts/check_visibility.py`, §2).
4. Version consistency (`scripts/sync_versions.py --check`, §4).
5. The docs brain is current (`scripts/build_docs_brain.py --check`).
6. The visualizer bundle (`scripts/check_viz.py`): the committed bundle is
   complete, and `BUILD_INFO.json` names the brain-wiki-viz commit it was
   built from, from a clean tree.
7. Package contents: builds the wheel and sdist, checks that the wheel
   holds the plugin files, the consolidate prompt, the `brain` skill, and
   the visualizer, and that the sdist holds only allowed top-level entries.
8. The offline bench: `retrieval` and `lint` on a 300-note brain.

GitHub Actions (`ci.yml`) runs on pushes to `main` and on pull requests:

- `scripts/check.py` on Ubuntu and macOS with Python 3.11 and 3.13;
- a visualizer job that checks out brain-wiki-viz at the commit in
  `BUILD_INFO.json`, runs `npm ci` and `npm run check` (type check, unit
  tests, and the public-registry lockfile check, since brain-wiki-viz has no
  CI of its own), then `scripts/check_viz.py --source` to rebuild the
  bundle and fail on any difference.
