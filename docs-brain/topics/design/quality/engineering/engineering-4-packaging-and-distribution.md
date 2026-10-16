---
id: 01M3250V00AVQJMD0GS8KB4RPN
type: design
title: "Packaging and distribution"
aliases: ["Engineering §4"]
source: "docs/design/engineering.md#4-packaging-and-distribution"
---
# Packaging and distribution

- The build backend is `hatchling`. The wheel force-includes the root
  plugin files (`plugin.json`, `mcp.json`, `.mcp.json`, `mcp_config.json`,
  `server.json`, `.claude-plugin/`, `rules/`, `skills/`) under
  `brainwiki/assets/plugin/`, so `brain connect` installs the same files
  the marketplaces serve.
- The sdist is built from an allowlist in `pyproject.toml`, so local drafts
  and caches never reach it.
- Console scripts are `brain`, `brain-wiki` (the same entry point), and
  `brain-wiki-mcp` (the same as `brain mcp`, for registries and configs
  that expect a dedicated server binary).
- Users are told to install with `uv tool install brain-wiki` or `pipx
  install brain-wiki`, or to run `uvx --from brain-wiki brain …` with no
  install.
- On PyPI, `brain-wiki` is the package. `brainwiki` is published as a thin
  alias that depends on it.
- The README carries the `mcp-name:` marker the MCP Registry uses to verify
  PyPI ownership. `server.json` declares the PyPI package, run with `uvx`
  and the `mcp` argument over stdio.
- The only hand-maintained version is in `pyproject.toml`.
  `scripts/sync_versions.py` writes the release version into the plugin
  manifests, `server.json`, and the `brain-wiki==<version>` pins in the MCP
  configs. It also regenerates the skill references that mirror
  `src/brainwiki/assets/` and the Antigravity rule. CI fails on drift
  (`--check`).
- An npm launcher package (`npx brain-wiki`, delegating to `uvx`) is
  deferred until there is demand.
