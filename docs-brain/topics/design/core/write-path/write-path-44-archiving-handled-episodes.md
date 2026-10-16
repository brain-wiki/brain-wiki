---
id: 01M3250V00T37AFJ7ZC8TW9464
type: design
title: "Archiving handled episodes"
aliases: ["Write path §4.4"]
source: "docs/design/write-path.md#44-archiving-handled-episodes"
---
# Archiving handled episodes

`brain consolidate --done EPISODE…` (MCP `brain_consolidate_done
{episodes}`) needs `edit`. Episodes are named by path or id, as prepare
listed them. Each must be pending, or the command fails with `not_found`.

The command moves them from `inbox/` to the same relative path under
`archive/` as one run of kind `consolidate` (§7), with one `log.md` entry
and one git commit, `brain: consolidate N episodes`. `brain undo` returns
them to the inbox. It regenerates `reports/` when `[reports]
after_consolidate = true`, the default.

Episodes the agent found nothing durable in go to `--done` too, and
episodes left out stay pending. A note may cite an episode's `archive_to`
path in `bw-sources` before `--done` moves it there. Lint does not report
that link until the episode is archived
([[lint-and-reports-4-how-lint-works|lint §4]]).
