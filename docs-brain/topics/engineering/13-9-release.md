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

1. Update `CHANGELOG.md`; bump the version; run `scripts/sync_versions.py`.
2. Tag; CI builds the sdist and wheel and publishes to PyPI with trusted
   publishing.
3. Publish `server.json` to the MCP Registry from CI.
4. The Claude Code and Codex marketplaces read the repository directly;
   Antigravity installs from the repository URL.
