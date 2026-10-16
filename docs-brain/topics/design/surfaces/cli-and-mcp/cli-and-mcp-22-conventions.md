---
id: 01M3250V0034V259P2C5YDW70X
type: design
title: "Conventions"
aliases: ["CLI and MCP §2.2"]
source: "docs/design/cli-and-mcp.md#22-conventions"
---
# Conventions

- Human-readable output by default; `--json` gives a stable, documented
  shape (the same shapes as the MCP structured results).
- Commands that change many files or files outside the brain support
  `--dry-run`, which prints what they would change: `lint --fix`, `mv`,
  `agents grant|revoke`, `harvest`, `import`, `connect`, `commit`, and
  `schedule`. Single-step writes (`log`, `rules`, `consolidate --done`,
  `review accept`, `undo`) have none; every one of them except `log` is a
  run that `brain undo` reverses.
- Paths printed are brain-relative; `--json` also includes absolute paths.
- Targets follow the Obsidian CLI convention: a title, alias, or file name
  resolves like a wikilink, and an exact path or id resolves exactly. Results
  always print the exact path, the handle for the next command.
- Listing commands share `--count` (print only the total), `--paths` (one
  path per line, for piping into file tools), `--limit`, and `--cursor`;
  `search` also takes `--facets` (counts by type, topic, and tag).
- `brain init --git` runs `git init` and commits the new files. `init` and
  `brains add` refuse a name or folder already registered to another brain,
  so a typo never re-points a brain; a moved brain may take its name along
  ([[config-and-storage-5-brain-lifecycle|config and storage §5]]).
- `--topic T` (and the MCP `topic` filter) includes T's sub-topics (brain format §2).
- `brain log -` reads the episode body from stdin, so other tools can pipe
  into the inbox.
- `brain mcp` never prints anything to stdout except its protocol output; diagnostics go to stderr and to
  `<state>/logs/brain-wiki.log`.
