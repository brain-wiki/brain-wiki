---
id: 01M3250V00V70AEJ4MCQXK4Q5C
type: design
title: "Phases"
aliases: ["Import §3.2"]
source: "docs/design/import.md#32-phases"
---
# Phases

| Phase | Changes | Touches existing notes? |
|---|---|---|
| 0, adopt | Adds `brain.toml`, `AGENTS.md`, `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain; commits in git | No |
| 1, ids and status | Mints missing `id:`; maps non-standard `status` (§4.1); turns string `tags` and `aliases` into lists (§4.3) | Frontmatter lines only |
| 2, hubs | Creates missing hubs; adds missing notes to hub `## Notes` lists | Hubs only |

Phase 0:

- Writes `AGENTS.md`, or a managed block in an existing one, with the
  topic table filled in from the folders found.
- Does not overwrite an existing `rules.md` or `log.md`.
- In a git repository, commits every file it added, including
  `reports/import-plan.md`, so the tree is clean for phases 1 and 2.
- Is not a run. To undo it, remove the brain (`brain brains remove`) and
  the files it added, or revert its commit.

Phase 0 alone gives a searchable brain: notes without ids are indexed
under `path:` ids, `migrate` lint keeps legacy issues at `info`, and agents
can log episodes at once. Phases 1 and 2 are each a separate
`--phase N --apply` run, so the user can stop at any point and review each
diff on its own.

The diff a dry run shows is the diff the apply makes. Phase 1 ids are
therefore not random. Each is a ULID whose time part is the brain id's
(the adoption time) and whose random part is a hash of the brain id, the
note's path, and its text. A note edited between the dry run and the apply
gets a different id, since its diff differs anyway. Phase 1 skips notes
whose frontmatter fails to parse.
