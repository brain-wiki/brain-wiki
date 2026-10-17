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
├── cli/            Typer app (_main.py); handlers grouped in _cmd_*.py modules, imported lazily
├── config/         user config, brain.toml, brain resolution, platform directories
├── format/         parsers and writers: frontmatter, links, episodes, rules, the AGENTS.md block;
│                   format 1 and 2 to 3 conversion (_convert.py, with legacy _claims.py and _relations.py)
├── store/          LocalStore: path checks, atomic writes, O_EXCL creates, expected-hash writes
├── index/          SQLite schema, scanner, search, supersession guards, read, neighbors, orientation
├── lint/           rules, profiles, fixes, reports, the pre-commit hook, `brain validate` (_validate.py)
├── write/          episode writer, secret scrubber, rules and proposals, agent profiles, mv, path checks
├── consolidate/    --prepare (_prepare.py) and --done (_done.py)
├── schedule/       `brain commit`, crontab and LaunchAgent jobs, doctor checks for jobs
├── runs/           run transactions, records, pre-images, undo, locks, git integration
├── importer/       overlay and into
├── mcp/            MCP server, the only package that imports the SDK
├── hosts/          per-host knowledge: session readers, detection, connect writers, instruction blocks
├── viz/            graph export, level-of-detail API, local server; app/ is the built front end (committed)
├── bench/          generator, suites with their graders, report
├── assets/         prompts (consolidate, distill, harvest)
└── *.py            top-level modules: engine, lifecycle, harvest, presets, origin, doctor,
                    setup_wizard, obsidian, ids, errors, logs
```

`presets.py` starts host CLIs unattended for scheduled consolidation ([[agent-integrations-7-unattended-agent-mode|agent integrations §7]]). The wheel
also carries the root plugin files under `brainwiki/assets/plugin/` (§4).

Dependency direction (an arrow means "may import"):

```
cli ─► mcp, viz, bench, importer, setup_wizard, doctor
         ─► consolidate, lint, schedule, harvest, origin
               ─► write, runs, index, engine, lifecycle
                     ─► format, store, config, hosts, ids, errors
```

`format`, `store`, `config`, and `hosts` import nothing above them. Only
the CLI imports `mcp`, `viz`, and `bench`, so the MCP SDK, the visualizer,
and the bench stay out of the core.

Package boundaries:

- Every module inside a package is private (`index/_search.py`).
- A package's API is what its `__init__.py` re-exports and lists in
  `__all__`. Code outside the package imports only that: `from
  brainwiki.index import search`, never `brainwiki.index._search`.
- Where a group of operations reads better qualified, the package exports
  the module as a namespace (`from brainwiki.hosts import connect`, then
  `connect.plan(...)`).
- Inside a package, modules import each other's private modules directly,
  never their own package's `__init__`, which loads every module of the
  package.
- The modules directly under `brainwiki/` (`engine`, `errors`, `ids`, and
  the like) stay public. Re-exporting them from the root would load the
  whole package on any import.
- Tests may import private modules.

`scripts/check_visibility.py` enforces these rules, and also that every
re-export is used outside its package and that a module-level name is
public only when another module, a test, or a script uses it, it appears in
a public signature, or it is on the script's short allowlist.
