---
id: 01M3250V009ZMZN5MP2HS4PMJK
type: guide
title: "Consolidate"
source: "docs/user/maintenance.md#consolidate"
---
# Consolidate

The inbox holds episodes nobody has organized yet. Consolidation folds them
into notes. It is optional, and runs when you ask.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; the agent needs `edit` |
| `brain consolidate --prepare`, edit notes, `brain validate`, then `brain consolidate --done EPISODE…` | By hand or from your own tooling |

`--prepare` lists pending episodes, oldest first, each with the notes it
most likely belongs to, plus guidance on writing them in. Once the notes are
edited and valid, `--done` moves the handled episodes to `archive/` as one
run; `brain undo` returns them to the inbox. Notes cite an episode in
`bw-sources`, so the archived episode stays the source.
