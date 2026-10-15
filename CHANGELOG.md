# Changelog

## 0.1.0.dev1 (unreleased)

- `brain setup --guide` prints the setup steps for an AI agent, so any agent
  that can run commands can set brain-wiki up from one prompt, without the
  plugin. Without a terminal, `brain setup` points to it, and an agent that
  finds no brain is told to use the `brain-setup` skill or the guide.
- Every setup step is now a command, so the guide never edits config files:
  `brain agents [list | grant | revoke]` changes what an app may do as an
  undoable run, and `brain harvest enable | disable | route` configures
  harvest. A refusal names the `brain agents grant` command that allows it.
  `brain brains limit HOST BRAIN...` and `unlimit HOST` set which brains an
  app may use.
- `brain setup` also asks what each connected app may do, grants the
  `harvest` ability with harvest, and ends with what to try next.
- The CLI is built on Typer. Action commands are real subcommands with their
  own help (`brain rules add --help`), and `brain --install-completion`
  installs tab completion. `--brain`, `--as`, and `--json` still work before
  or after the command. `brain --version` also prints the file format.
- Removed commands, and what replaces them: `brain version` → `brain
  --version`; `brain list` → `brain brains` (also with `--as HOST`); `brain
  notes` and `brain recent` → `brain search ""` with filters (e.g. `brain
  search "" --since 7d`; browsing sorts by `recent`); `brain outline TARGET` →
  `brain read TARGET --mode outline`.
- `brain rule` is now `brain rules`; `rule` still works as a hidden alias.
- `brain review` also covers rule proposals: `review list` shows them with
  consolidation and edit proposals, marking each one's kind, and `review
  show`, `accept`, and `reject` take a rule proposal's id.
- `brain import --phase` given with a mode other than `--overlay` is a usage
  error even when it is `--phase 0`.

## 0.1.0.dev0 (2026-10-14)

First release.

- **Brain format**: plain Markdown notes with frontmatter, claims with
  provenance, and typed relations (`part_of`, `depends_on`,
  `conflicts_with`, `supersedes`, `related_to`, and their inverses);
  topics as folders, nested to any depth; immutable inbox episodes;
  `rules.md`; a managed `AGENTS.md` block.
- **Index and retrieval**: SQLite FTS5 index outside the brain, freshness
  checks, guard co-retrieval (superseding and conflicting notes come with
  every hit), search filters, facets, and intents, orientation, and
  Obsidian-style browsing (`brain topics`, `notes`, `links`, `backlinks`,
  `tags`, and more).
- **Write path**: one episode writer with server-set provenance, secret
  redaction, size caps, and dedupe; episodes dropped in by hand count as
  untrusted; checked direct edits (`brain check`, `brain restore`, a
  per-topic `agent_edits` policy), which agents may make by default; rules
  that need the user's words and confirmation; `brain mv`.
- **Runs**: every curated change is locked, gated by lint, recorded with
  pre-images, committed to git when the brain is a repository, and
  undoable.
- **Consolidation**: packets with short handles, a per-op validator, a
  deterministic writer that never deletes text, and review proposals. Your
  agent consolidates in its session over MCP; `brain consolidate --prepare`
  and `--apply` drive it by hand.
- **Lint and reports**: the BW rule catalog with strict and migrate
  profiles, cached whole-brain lint, safe fixes as one run, staged-file
  lint and a pre-commit hook, and browsable reports.
- **Agents**: a stdio MCP server with thirteen tools and three prompts;
  `brain connect` for Claude Code, Codex, Antigravity, OpenClaw, and
  Cursor, with instructions placed where each host reads them; session readers and
  harvest for Claude Code, Codex, and Antigravity, with headless presets
  for large backfills; origin lookup; a plugin bundle with three skills;
  `brain setup` and `brain doctor`.
- **Import**: overlay adoption of Obsidian vaults in phases, copying into
  a brain, documents and agent memory files as episodes.
- **Visualizer**: `brain viz`, a local read-only 3D map of groups,
  topics, folders, and notes with typed relations and issue highlighting,
  and HTML, JSON, and GraphML export.
- **Bench**: offline retrieval, lint, and performance suites, and
  model-backed consolidation scenarios through headless presets.

Known limitations:

- No privacy levels inside a brain: every agent that may use a brain
  reads all of it. Keep separate lives in separate brains
  ([proposal](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposals/privacy.md)).
- Maintenance runs when you ask your agent; there is no scheduler
  ([proposal](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposals/scheduled-maintenance.md)).
- Chat apps that need a remote MCP server (ChatGPT, claude.ai, the Gemini
  app) are not supported ([proposal](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposals/remote-mcp.md)).
