---
id: 01M3250V00T37AFJ7ZC8TW9464
type: design
title: "Archiving handled episodes"
aliases: ["Write path §4.4"]
source: "docs/design/write-path.md#44-archiving-handled-episodes"
---
# Archiving handled episodes

`brain consolidate --done EPISODE[:PATTERN:NOTE]…` (MCP
`brain_consolidate_done {episodes}`) needs `edit`. Episodes are named by
path or id, as prepare listed them. Each must be pending, or the command
fails with `not_found`.

Each episode comes with what came of it:

| Form | CLI | MCP item |
|---|---|---|
| A pattern and the note it changed | `EP:file:topics/lumen/sync.md` | `{"episode": EP, "pattern": "file", "notes": ["topics/lumen/sync.md"]}` |
| Skipped, with the reason | `"EP:skip:already in topics/lumen/sync.md"` | `{"episode": EP, "pattern": "skip", "reason": "already in …"}` |
| No outcome | `EP` | `"EP"` |

- Patterns are `record`, `playbook`, `file`, `distill`, and `skip` (§4.5).
  The CLI repeats an episode for a second outcome; MCP takes a list of
  notes.
- Before anything moves, each note named for an episode must exist and
  cite the episode in `bw-sources`, by its archive path, inbox path, or
  file name. A missing note or citation fails the whole call with `usage`,
  naming the note and the link to add, and archives nothing. A skip needs
  a reason and names no notes, and an episode cannot be both skipped and
  consolidated.
- A plain reference archives the episode without a check, for terminal use
  and older agents.

The command moves them from `inbox/` to the same relative path under
`archive/` as one run of kind `consolidate` (§7), with one `log.md` entry
and one git commit, `brain: consolidate N episodes`. Every episode is
archived, never deleted, whatever its pattern. The `log.md` entry's summary
counts the patterns, and it has one line per episode:

```
## 2026-10-16T21:30:02Z · consolidate · run-01JA…
- agent: claude-code
- archived 3 episodes: 1 file, 1 playbook, 1 skip
- inbox/episodes/2026/10/01JA….md: playbook → topics/lumen/release-howto.md
- inbox/episodes/2026/10/01JB….md: file → topics/lumen/sync.md
- inbox/episodes/2026/10/01JC….md: skip (already in topics/lumen/sync.md)
```

The run record keeps the same outcomes as `ops`. `brain undo` returns the
episodes to the inbox; note edits are restored from git. It regenerates
`reports/` when `[reports] after_consolidate = true`, the default.

Episodes the agent found nothing durable in go to `--done` too, as skips,
and episodes left out stay pending. A note may cite an episode's `archive_to`
path in `bw-sources` before `--done` moves it there. Lint does not report
that link until the episode is archived
([[lint-and-reports-4-how-lint-works|lint §4]]).
