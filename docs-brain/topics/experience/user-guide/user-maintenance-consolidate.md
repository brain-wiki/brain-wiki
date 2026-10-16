---
id: 01M3250V009ZMZN5MP2HS4PMJK
type: guide
title: "Consolidate"
source: "docs/user/maintenance.md#consolidate"
---
# Consolidate

Consolidation folds inbox episodes into notes. It runs only when you ask.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; the agent needs `edit` |
| `brain consolidate --prepare`, edit, `brain validate`, `brain consolidate --done EPISODE…` | By hand or from your own tooling |

1. `--prepare` lists pending episodes, oldest first, each with the notes it
   most likely belongs to, plus guidance on writing them in. `--max-episodes`
   caps the count; the default is 50 (`[consolidate] max_episodes_per_run`
   in `brain.toml`).
2. You or the agent edit the notes and cite each episode in `bw-sources`.
3. `--done` moves the handled episodes to `archive/` as one run. The
   archived episode stays the note's source. `brain undo` returns them to
   the inbox.
