---
id: 01M3250V00RX9KJY4VECMH97SW
type: design
title: "Package structure"
aliases: ["13 §2"]
tags: [engineering]
source: "docs/design/13-engineering.md#2-package-structure"
bw-part_of:
  - "[[engineering]]"
---
# Package structure

```text
src/brainwiki/
├── cli/            argparse entry point; one module per command; lazy imports
├── config/         user config, brain.toml, brain resolution, platform dirs
├── format/         parsers and writers: frontmatter, claims, relations, links, episodes, rules
├── store/          LocalStore (atomic writes, O_EXCL creates, expected-hash writes)
├── index/          SQLite schema, scanner, queries (search, guards, read, orient)
├── lint/           rules, profiles, fixes, reports
├── write/          episode writer, secret scrubber, rule writer
├── consolidate/    selection, packets, ops schema and validator, applier, backends, prompts
├── runs/           run records, pre-images, undo, locks, git integration
├── importer/       overlay, into, to-episodes, from-host presets
├── mcp/            MCP server (imports the SDK; never imported by hooks)
├── hosts/          per-host knowledge: hook payload parsing, transcript readers, connect writers, headless presets
├── viz/            graph export, level-of-detail API, local server; app/ is the built front end (committed)
├── bench/          generator, suites with their graders and scenarios, report
└── assets/         templates (brain.toml, AGENTS.md, hub), prompts, plugin files (copied at build time)
```

Dependency direction (an arrow means "may import"):

```
cli ─► mcp, hosts, viz, bench, importer ─► consolidate, lint ─► index, write, runs ─► format, store, config
```

`format`, `store`, and `config` import nothing from the rest. The MCP SDK,
the visualizer, and the bench are leaves: nothing in the core imports them.
