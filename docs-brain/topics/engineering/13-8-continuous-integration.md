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

`uv run scripts/check.py` is the one entry point, locally and in CI. It
runs, and reports each step:

1. `ruff check` and `ruff format --check` on `src`, `tests`, and `scripts`.
2. The test suite (`pytest`).
3. Minimal visibility (`scripts/check_visibility.py`): a module-level name
   is public only when another module, a test, or a script uses it, it names
   a class in a public signature, or it is on the script's short allowlist.
4. Version consistency (`scripts/sync_versions.py --check`, §4).
5. The docs brain is current (`scripts/build_docs_brain.py --check`).
6. Visualizer bundle check (`scripts/check_viz.py`): the committed bundle
   is complete and `BUILD_INFO.json` names a clean brain-wiki-viz commit.
   With `--source <checkout>` (a brain-wiki-viz checkout at that commit,
   after `npm ci`) it also rebuilds the bundle and fails if the result
   differs. brain-wiki-viz's own CI runs its type check, unit tests, and
   the public-registry lockfile check (`npm run check`).
7. Package contents: builds the wheel and sdist and checks that the
   plugin files, prompts, skills, and visualizer are in the wheel and that
   the sdist holds only allowed top-level entries.
8. The offline bench: `retrieval` and `lint` on a 300-note brain.

GitHub Actions runs `scripts/check.py` on Ubuntu and macOS with Python 3.11
and 3.13 on every push and pull request.
