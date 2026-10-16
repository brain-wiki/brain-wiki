---
id: 01M3250V001EX3PWGVNKJ8HEZC
type: design
title: "Archiving handled episodes"
aliases: ["05 §4.4"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#44-archiving-handled-episodes"
---
# Archiving handled episodes

`brain consolidate --done EPISODE…` (MCP `brain_consolidate_done
{episodes}`) needs `edit`. Episodes are named by path or id, as prepare
listed them; every one must be pending (`not_found` otherwise). The command
moves them from `inbox/` to the same relative path under `archive/` as one
run of kind `consolidate` (§7): one `log.md` entry, one git commit
`brain: consolidate N episodes`, and `brain undo` returns them to the inbox.
It regenerates `reports/` when `[reports] after_consolidate = true`
(default).

Episodes the agent read and found nothing durable in are passed to `--done`
too; episodes left out stay pending. A note citing an episode in
`bw-sources` before `--done` archives it points at the `archive/` path the
packet gave; lint does not report that link until the episode is archived
([[06-4-how-lint-works|06 §4]]).
