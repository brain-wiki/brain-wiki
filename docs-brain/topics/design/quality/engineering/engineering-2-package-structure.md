---
id: 01M3250V00NB2846RDS3DMX8GX
type: design
title: "Package structure"
aliases: ["Engineering §2"]
source: "docs/design/engineering.md#2-package-structure"
---
# Package structure

```text
src/brainwiki/
├── cli/            Typer entry point; one module per command; lazy imports
├── config/         user config, brain.toml, brain resolution, platform dirs
├── format/         parsers and writers: frontmatter, links, episodes, rules, the AGENTS.md block;
│                   format 1/2 → 3 conversion (_convert.py; legacy claim and relation parsers read the old formats)
├── store/          LocalStore (atomic writes, O_EXCL creates, expected-hash writes)
├── index/          SQLite schema, scanner, queries (search, supersession guard, read, neighbors, orient)
├── lint/           rules, profiles, fixes, reports, `brain validate` (_validate.py)
├── write/          episode writer, secret scrubber, rule writer, agent profiles, mv
├── consolidate/    --prepare (episodes with candidate notes, _prepare.py), --done (archive as a run, _done.py)
├── schedule/       `brain commit` (snapshot and sync), crontab and LaunchAgent jobs, doctor checks
├── runs/           run records, pre-images, undo, locks, git integration
├── importer/       overlay, into, to-episodes, from-host presets
├── mcp/            MCP server (the only package that imports the SDK)
├── hosts/          per-host knowledge: transcript readers, host detection, connect writers, instruction blocks
├── viz/            graph export, level-of-detail API, local server; app/ is the built front end (committed)
├── bench/          generator, suites with their graders and scenarios, report
├── assets/         prompts (consolidate, distill, harvest); plugin files are copied in at build time
└── *.py            top-level modules: engine, lifecycle, harvest, presets (headless host CLIs for harvest
                    distillation), origin, doctor, setup_wizard, obsidian, ids, errors, logs
```

Dependency direction (an arrow means "may import"):

```
cli ─► mcp, hosts, viz, bench, importer ─► consolidate, lint, schedule ─► index, write, runs ─► format, store, config
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
