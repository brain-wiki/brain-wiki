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
├── cli/            Typer entry point; one module per command; lazy imports
├── config/         user config, brain.toml, brain resolution, platform dirs
├── format/         parsers and writers: frontmatter, claims, relations, links, episodes, rules
├── store/          LocalStore (atomic writes, O_EXCL creates, expected-hash writes)
├── index/          SQLite schema, scanner, queries (search, guards, read, orient)
├── lint/           rules, profiles, fixes, reports
├── write/          episode writer, secret scrubber, rule writer, checked edits, mv
├── consolidate/    selection, packets, ops schema and validator, applier, review, headless presets
├── runs/           run records, pre-images, undo, locks, git integration
├── importer/       overlay, into, to-episodes, from-host presets
├── mcp/            MCP server (the only package that imports the SDK)
├── hosts/          per-host knowledge: transcript readers, host detection, connect writers, instruction blocks
├── viz/            graph export, level-of-detail API, local server; app/ is the built front end (committed)
├── bench/          generator, suites with their graders and scenarios, report
├── assets/         prompts (consolidate, distill, harvest); plugin files are copied in at build time
└── *.py            top-level modules: engine, lifecycle, harvest, origin, doctor, setup_wizard, ids, errors, logs
```

Dependency direction (an arrow means "may import"):

```
cli ─► mcp, hosts, viz, bench, importer ─► consolidate, lint ─► index, write, runs ─► format, store, config
```

`format`, `store`, and `config` import nothing from the rest. The MCP SDK,
the visualizer, and the bench are leaves: nothing in the core imports them.

**Package boundaries.** Every module inside a package is private
(`index/_search.py`). A package's API is what its `__init__.py` re-exports,
listed in `__all__`, and code outside the package imports only that:
`from brainwiki.index import search`, never `brainwiki.index._search`.
Where a group of operations reads better qualified, the package exports the
module as a namespace (`from brainwiki.hosts import connect`, then
`connect.plan(...)`). Inside a package, modules import each other's private
modules directly, never their own package's `__init__`, which loads every
module of the package. The modules directly under `brainwiki/` (`engine`,
`errors`, `ids`, and the like) stay public: re-exporting them from the root
would load the whole package on any import. Tests may import private
modules. `scripts/check_visibility.py` enforces all of this, and that every
re-export is used outside its package.
