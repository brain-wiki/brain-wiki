---
id: 01M3250V00ZS5SA7FFBM1RF3A8
type: design
title: "Conventions"
aliases: ["07 §2.2"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#22-conventions"
bw-part_of:
  - "[[07-2-cli]]"
---
# Conventions

- Human-readable output by default; `--json` gives a stable, documented
  shape (the same shapes as the MCP structured results).
- Commands that change many files or files outside the brain support
  `--dry-run`, which prints what they would change: `lint --fix`, `mv`,
  `consolidate --apply`, `harvest`, `import`, and `connect`. Single-step
  writes (`log`, `rule`, `check`, `restore`, `review accept`, `undo`) have
  none; every curated one is a run that `brain undo` reverses.
- Paths printed are brain-relative; `--json` also includes absolute paths.
- Targets follow the Obsidian CLI convention: a title, alias, or file name
  resolves like a wikilink, and an exact path or id resolves exactly. Results
  always print the exact path, the handle for the next command.
- Listing commands share `--count` (print only the total), `--facets` (counts
  by type, topic, and tag), `--paths` (one path per line, for piping into
  file tools), `--limit`, and `--cursor`.
- `--topic T` (and the MCP `topic` filter) includes T's sub-topics (02 §2).
- `brain log -` reads the episode body from stdin, so other tools can pipe
  into the inbox.
- `brain mcp` never prints anything to stdout except its protocol output; diagnostics go to stderr and to
  `<state>/logs/brain-wiki.log`.
