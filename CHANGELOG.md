# Changelog

## 0.1.0 (unreleased)

First release.

- **Brain format**: plain Markdown notes with frontmatter, claims with
  provenance, and typed relations (`part_of`, `depends_on`,
  `conflicts_with`, `supersedes`, `related_to`, and their inverses);
  immutable inbox episodes; `rules.md`; a managed `AGENTS.md` block.
- **Index and retrieval**: SQLite FTS5 index outside the brain, freshness
  checks, guard co-retrieval (superseding and conflicting notes come with
  every hit), privacy-filtered search, read, and orientation.
- **Write path**: one episode writer with server-set provenance, secret
  redaction, size caps, and dedupe; rules that need the user's words and
  confirmation; `brain mv`.
- **Runs**: every curated change is locked, gated by lint, recorded with
  pre-images, committed to git when the brain is a repository, and
  undoable.
- **Consolidation**: packets with short handles, a per-op validator, a
  deterministic writer that never deletes text, review proposals, an
  in-agent backend over MCP, and headless presets for Claude Code, Codex,
  Antigravity, Cursor, and Ollama.
- **Lint and reports**: the BW rule catalog with strict and migrate
  profiles, cached whole-brain lint, safe fixes as one run, staged-file
  lint and a pre-commit hook, and browsable reports.
- **Agents**: a stdio MCP server with ten tools and three prompts; hooks
  for orientation, taint tracking, and opt-in capture; session readers and
  harvest for Claude Code, Codex, and Antigravity; origin lookup; `brain
  connect` for Claude Code, Codex, Antigravity, OpenClaw, and Cursor; a
  plugin bundle with three skills.
- **Import**: overlay adoption of Obsidian vaults in phases, copying into
  a brain, documents and agent memory files as episodes.
- **Visualizer**: `brain viz`, a local read-only 3D map with guard halos
  and health flags, and HTML, JSON, and GraphML export.
- **Bench**: offline retrieval, lint, consolidation, and performance
  suites.
