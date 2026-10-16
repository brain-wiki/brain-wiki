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
| 0 · Adopt | Adds `brain.toml`, `AGENTS.md` (or a managed block in an existing one, with the topic table filled in from the folders found), `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain; in a git repository, commits every file it added (including `reports/import-plan.md`), so the tree is clean for phases 1–2. Not a run: it is undone by removing the brain and the added files, or by reverting its commit. | **No** |
| 1 · Ids and status | Mints `id:` for notes without one; maps non-standard `status` values into `status` + `bw-stage` (§4.1); turns `tags` and `aliases` written as strings into lists (§4.3). | Yes, frontmatter lines only |
| 2 · Hubs | Creates missing hubs, adds missing notes to hub `## Notes` lists. | Hubs only |

Phase 0 alone gives a fully searchable brain: notes without ids are
indexed under `path:` ids, `migrate` lint keeps legacy issues at `info`,
and agents can start logging episodes immediately. Phases 1 and 2 are each
a separate `--apply --phase N` run, so the user can stop at any point and
review each diff on its own.

The diff a dry run shows is the diff the apply makes. Phase 1 ids are
therefore not random: each is a ULID whose time part is the brain id's
(the adoption time, as a freshly minted id would have) and whose random
part is a hash of the brain id, the note's path, and its text. A note
edited between the dry run and the apply gets a different id, as its diff
differs anyway.
