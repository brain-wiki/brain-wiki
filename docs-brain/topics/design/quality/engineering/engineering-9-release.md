---
id: 01M3250V00RYXBNANGFKTKJME7
type: design
title: "Release"
aliases: ["Engineering §9"]
source: "docs/design/engineering.md#9-release"
---
# Release

1. Set the version, a final `X.Y.Z` or a development release such as
   `X.Y.Z.devN`. Date its `CHANGELOG.md` entry as `## X.Y.Z (YYYY-MM-DD)`,
   run `scripts/sync_versions.py`, and commit.
2. Push `main` and wait for CI to pass. Then push the tag `vX.Y.Z`. There
   is no approval step, so the tag publishes.
3. `.github/workflows/release.yml` checks that the tag matches the version
   and that the changelog has a dated entry, runs `scripts/check.py`,
   builds the sdist and wheel, publishes them to PyPI with trusted
   publishing, and creates the GitHub release from the changelog entry.
4. Move `main` to the next `.devN` version.

- GitHub labels a release the way pip treats it. A dev, alpha, beta, or rc
  version is marked Latest while no final release exists, and a
  pre-release once one does.
- The job that publishes `server.json` to the MCP Registry (GitHub OIDC) is
  turned off until the project decides to be listed, with the repository
  public first. A Registry install gets only the MCP server, and its first
  run depends on the `not_configured` hint leading to `uvx --from
  brain-wiki brain setup --guide`
  ([[skills-and-onboarding-31-entry-points|skills and onboarding §3.1]]).
  When turned on, it lists final versions only.
- The plugin files point at the newest dated release, final or development
  (`scripts/sync_versions.py`). The Claude Code and Codex marketplaces read
  the repository directly, and Antigravity installs from the repository
  URL, so a pin to an unreleased version would break every install.
