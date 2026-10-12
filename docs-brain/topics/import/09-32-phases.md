---
id: 01M3250V00FBK5G9EDBR1V44PM
type: design
title: "Phases"
aliases: ["09 §3.2"]
tags: [import]
source: "docs/design/09-import.md#32-phases"
---
# Phases

| Phase | Changes | Touches existing notes? |
|---|---|---|
| 0 · Adopt | Adds `brain.toml`, `AGENTS.md` (or a managed block in an existing one), `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain. | **No** |
| 1 · Relations | Converts relation-like frontmatter into `## Relations` lines (§4.2), keeps the original properties unless `--drop-converted` is given. | Yes, appends a section |
| 2 · Identity and status | Mints `id:` for notes without one; maps non-standard `status` values into `status` + `stage` (§4.1). | Yes, frontmatter lines only |
| 3 · Structure | Creates missing hubs, adds missing notes to hub `## Notes` lists. | Hubs only |

Phase 0 alone gives a fully searchable brain: notes without ids are
indexed under `path:` ids, `migrate` lint keeps legacy issues at `info`,
and agents can start logging episodes immediately. Phases 1–3 are each a
separate `--apply --phase N` run, so the user can stop at any point and
review each diff on its own.

## Relations
- part_of [[09-3-overlay]]
