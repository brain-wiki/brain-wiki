---
id: 01M3250V00TZNDHHW9QMSB7DBT
type: design
title: "Packaging and distribution"
aliases: ["13 §4"]
tags: [engineering]
source: "docs/design/13-engineering.md#4-packaging-and-distribution"
bw-part_of:
  - "[[engineering]]"
---
# Packaging and distribution

- Build backend: `hatchling`. The plugin files at the repo root are copied
  into `brainwiki/assets/plugin/` at build time, so `brain connect` can
  install exactly the same files the marketplaces serve.
- Console scripts: `brain`, `brain-wiki` (same entry point), and
  `brain-wiki-mcp` (equivalent to `brain mcp`, for registries and configs
  that expect a dedicated server binary).
- Install paths users are told about: `uv tool install brain-wiki`,
  `pipx install brain-wiki`, or `uvx --from brain-wiki brain …` with no
  install.
- PyPI: `brain-wiki` is the package; `brainwiki` is published as a thin
  alias that depends on it, so either name installs the same thing.
- The README carries the `mcp-name:` marker the MCP Registry uses to verify
  PyPI ownership, and `server.json` declares the PyPI package with stdio
  transport.
- One version number, in `pyproject.toml`. `scripts/sync_versions.py`
  writes it into every plugin manifest and `server.json`; CI fails if they
  disagree.
- An npm launcher package (`npx brain-wiki`, delegating to `uvx`) is
  deferred until there is demand.
