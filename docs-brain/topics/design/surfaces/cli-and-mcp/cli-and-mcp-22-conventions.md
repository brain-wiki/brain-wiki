---
id: 01M3250V0034V259P2C5YDW70X
type: design
title: "Conventions"
aliases: ["CLI and MCP §2.2"]
source: "docs/design/cli-and-mcp.md#22-conventions"
---
# Conventions

- Output is human-readable by default. `--json` prints a stable,
  documented shape, the same as the MCP structured results.
- Commands that change many files, or files outside the brain, take
  `--dry-run` and print what they would change: `lint --fix`, `mv`,
  `agents grant|revoke`, `import`, `connect`, `commit`, and
  `schedule add|remove`. `import` defaults to a dry run and writes only
  with `--apply`.
- Single-step writes have no `--dry-run`: `rules`, `consolidate --done`,
  `review accept|reject`, and `undo`. All of them are runs that
  `brain undo` reverses.
- Printed paths are brain-relative. `--json` also includes absolute paths.
- Targets follow the Obsidian CLI convention. A title, alias, or file name
  resolves like a wikilink, and an exact path or id resolves exactly.
  Results always print the exact path, which is the handle for the next
  command.
- Listing commands share `--count` (print only the total), `--paths` (one
  path per line, for piping into file tools), `--limit`, and `--cursor`.
  `search` also takes `--facets` (counts by type, topic, and tag).
- `brain init --git` runs `git init` and commits the new files.
- `init` and `brains add` refuse a name or folder already registered to
  another brain, so a typo never points a name at a different brain. A
  moved brain may take its name along
  ([[config-and-storage-5-brain-lifecycle|config and storage §5]]).
- `--topic T`, and the MCP `topic` filter, include T's sub-topics
  ([[brain-format-2-directory-layout|brain format §2]]).
- `brain mcp` writes only protocol messages to stdout. Diagnostics go to
  stderr and to `<state>/logs/brain-wiki.log`.
