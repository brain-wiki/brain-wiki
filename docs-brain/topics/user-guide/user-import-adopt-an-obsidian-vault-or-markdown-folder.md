---
id: 01M3250V00YN69QA7BQ6DWQ7WA
type: guide
title: "Adopt an Obsidian vault or Markdown folder"
tags: [user-guide]
source: "docs/user/import.md#adopt-an-obsidian-vault-or-markdown-folder"
---
# Adopt an Obsidian vault or Markdown folder

```sh
brain import ~/notes --overlay                 # report: topics, hubs, counts, what would change
brain import ~/notes --overlay --apply         # phase 0: adopt in place
```

Phase 0 adds `brain.toml`, an `AGENTS.md` block, `rules.md`, `log.md`, and
the `inbox/`, `archive/`, and `reports/` folders. **No note is moved or
changed.** Top-level folders become topics; templates and attachment
folders are ignored; lint starts in the lenient `migrate` profile. The
brain is searchable right away. In a git repository, phase 0 commits
everything it added, including the plan in `reports/import-plan.md`.
Running phase 0 again on an adopted folder tells you it is already a brain.

Later phases are optional, each one a separate undoable run:

| Phase | Changes |
|---|---|
| `--phase 1` | Relation-like properties (`up`, `parent`, `related`, …) also become `bw-` relations (`bw-part_of`, `bw-related_to`, …); the properties are kept |
| `--phase 2` | Notes without an `id` get one; non-standard `status` values (`draft`, `done`, …) move to `bw-stage` |
| `--phase 3` | Topics without a hub get one; notes missing from their hub are listed |

```sh
brain import ~/notes --overlay --phase 2            # see the diff
brain import ~/notes --overlay --phase 2 --apply
```

The ids a phase 2 dry run shows are the ids the apply writes.

If the folder is a git repository with uncommitted changes, apply stops so
the import diff stays clean.
