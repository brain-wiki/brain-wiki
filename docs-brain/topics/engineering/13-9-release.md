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

1. Set the version (a final `X.Y.Z` or a development release such as
   `X.Y.Z.devN`; the first release is `0.1.0.dev0`), date its `CHANGELOG.md`
   entry, run `scripts/sync_versions.py`, and commit.
2. Push `main` and the tag `vX.Y.Z` together. `.github/workflows/release.yml` checks the tag
   against the version and the changelog, runs `scripts/check.py`, builds the
   sdist and wheel, publishes them to PyPI with trusted publishing, publishes
   `server.json` to the MCP Registry (GitHub OIDC) for final versions only,
   and creates the GitHub release from the changelog entry, marked a
   pre-release for a development version. Development releases stay out of
   the Registry because it is a public catalog that clients browse; listing
   waits for a final release.
3. Move `main` to the next `.devN` version. The plugin files keep pointing at
   the newest dated release, final or development (`scripts/sync_versions.py`),
   because the Claude Code and Codex marketplaces read the repository
   directly and Antigravity installs from the repository URL: a pin to an
   unreleased version would break every install.
