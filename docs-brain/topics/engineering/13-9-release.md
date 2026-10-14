---
id: 01M3250V00GNP1PEE7KP19H4AY
type: design
title: "Release"
aliases: ["13 §9"]
tags: [engineering]
source: "docs/design/13-engineering.md#9-release"
bw-part_of:
  - "[[engineering]]"
---
# Release

1. Set the version, date its `CHANGELOG.md` entry, run
   `scripts/sync_versions.py`, and commit.
2. Push the tag `vX.Y.Z`. `.github/workflows/release.yml` checks the tag
   against the version and the changelog, runs `scripts/check.py`, builds the
   sdist and wheel, publishes them to PyPI with trusted publishing, publishes
   `server.json` to the MCP Registry (GitHub OIDC), and creates the GitHub
   release from the changelog entry.
3. Move `main` to the next `.devN` version. The plugin files keep pointing at
   the newest dated release (`scripts/sync_versions.py`), because the Claude
   Code and Codex marketplaces read the repository directly and Antigravity
   installs from the repository URL: a pin to an unreleased version would
   break every install.
