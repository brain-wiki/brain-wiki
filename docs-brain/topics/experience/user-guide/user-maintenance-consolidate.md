---
id: 01M3250V009ZMZN5MP2HS4PMJK
type: guide
title: "Consolidate"
source: "docs/user/maintenance.md#consolidate"
---
# Consolidate

Consolidation turns inbox episodes into notes. It runs only when you ask.
Each agent consolidates the episodes it captured, because it can reopen
the conversations they came from.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; the agent needs `edit` |
| "Take Cursor's episodes too", "fold in the unowned episodes", "consolidate everything" | An agent that never consolidates, or episodes no agent owns |
| `brain consolidate --prepare`, edit, `brain validate`, `brain consolidate --done EPISODE:PATTERN:NOTE…` | By hand or from your own tooling |

1. `--prepare` lists the caller's pending episodes, each with the notes it
   most likely belongs to, plus guidance. An agent gets its own episodes,
   those whose conversation is on this machine first. From your terminal
   you get every episode, or only those of `--agent HOST` and
   `--unowned`. `--max-episodes` caps the count; the default is 50
   (`[consolidate] max_episodes_per_run` in `brain.toml`).
2. Each episode gets a pattern: a dated **record**, a **playbook** (a new
   or updated howto), **file** (into the note it belongs to), **distill**
   (a preference, person, or project note), or **skip** with a reason.
   The notes cite the episode in `bw-sources`.
3. `--done` checks those citations, then moves the episodes to `archive/`
   as one run. Every episode is archived, none deleted, and stays the
   note's source. `brain undo` returns them to the inbox.

Orientation and `brain doctor` show the pending episodes per agent and
each agent's last consolidation. `reports/consolidation.md` lists recent
runs with what came of each episode.

## Subsections
- [[user-maintenance-consolidate-on-a-schedule]]: Consolidate on a schedule
