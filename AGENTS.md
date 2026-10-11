# AGENTS.md

If you are not developing brain-wiki itself, ignore this file. To use the
user's brain, use the brain-wiki MCP tools or the `brain` skill.

## Developing brain-wiki

- Setup: `uv sync`. Run everything CI runs: `uv run scripts/check.py`.
- Design first: behavior is specified in `docs/design/`; change the
  relevant document together with the code.
- Every curated change goes through `brainwiki.runs.Run`; writers change
  only the lines they must.
- `brain hook` must stay fast and must never import the MCP SDK.
- Fixtures are synthetic (the fictional notes app "Lumen"). Never add real
  personal data or credential-shaped strings.
- After editing `src/brainwiki/assets/` or the version, run
  `uv run scripts/sync_versions.py`.
- The visualizer's source is the separate `brain-wiki-viz` repository; this
  repository commits only its build in `src/brainwiki/viz/app/`. Rebuild there
  (`npm run build` writes this checkout when the two are siblings), never edit
  the bundle by hand.
