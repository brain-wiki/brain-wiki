# AGENTS.md

If you are not developing brain-wiki itself, ignore this file. To use the
user's brain, use the brain-wiki MCP tools or the `brain` skill.

## Developing brain-wiki

- Setup: `uv sync`. Run everything CI runs: `uv run scripts/check.py`.
- Design first: implemented behavior is specified in `docs/design/`; change
  the relevant document together with the code. Unbuilt designs live in
  `docs/proposals/`; when one is built, move its content into `docs/design/`
  and delete the proposal.
- Every curated change goes through `brainwiki.runs.Run`; writers change
  only the lines they must.
- Only `brain mcp` may import the MCP SDK; the CLI imports subcommand
  modules lazily so every command starts fast.
- Fixtures are synthetic (the fictional notes app "Lumen"). Never add real
  personal data or credential-shaped strings.
- After editing `src/brainwiki/assets/` or the version, run
  `uv run scripts/sync_versions.py`.
- `docs-brain/` is the docs as a brain, generated from `docs/`: after editing
  `docs/`, run `uv run scripts/build_docs_brain.py`; never edit it by hand.
- The visualizer's source is the separate `brain-wiki-viz` repository; this
  repository commits only its build in `src/brainwiki/viz/app/`. Rebuild there
  (`npm run build` writes this checkout when the two are siblings), never edit
  the bundle by hand.
