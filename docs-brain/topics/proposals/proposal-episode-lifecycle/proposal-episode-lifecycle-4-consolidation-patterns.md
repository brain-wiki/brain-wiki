---
id: 01M3250V00HHN8PH4XHGJ04SW4
type: proposal
title: "Consolidation patterns"
aliases: ["Episodes: quick capture, per-agent consolidation §4"]
source: "docs/proposal/episode-lifecycle.md#4-consolidation-patterns"
---
# Consolidation patterns

Each episode gets one or more outcomes. The guidance
(`prompts/consolidate.md`) is rewritten around these patterns, with an
example of each.

| Pattern | Use it when | Result |
|---|---|---|
| Record | Something happened that is worth looking up later as it was: an incident, a benchmark run, a release, a meeting | A `type: record` note, dated, close to the episode's own words, in the topic it concerns, citing the episode in `bw-sources` |
| Playbook | The agent did a task it or another agent will do again | A new `type: howto` note when the brain has none for the task, or an update to the existing howto for the same task. Either way: the steps, the commands, what failed and why |
| File | The episode holds a fact or decision that belongs with existing knowledge | The best existing note is edited, or a new note goes in the right topic. A note it replaces is marked superseded |
| Distill | Several episodes show something stable about the user, a person, or a project: a preference, a role, a constraint | A note in `preferences`, a person note, or a project note, citing every episode it rests on. Never a rule |
| Skip | Nothing durable: small talk, or already in the brain | Archived, with the reason |

- Every episode is archived after consolidation, never deleted, whatever
  its pattern, skip included. `--done` moves it from `inbox/` to
  `archive/episodes/YYYY/MM/<id>.md`, where it stays unchanged.
- Every note a consolidation creates or changes links back to its
  episodes in `bw-sources` (`"[[archive/episodes/2026/10/01JA…]]"`). The
  agent writes the archive path before `--done` moves the file; lint
  accepts the link while the episode is still in the inbox. From an
  episode, the reverse is the index's `cited_by` backlinks.
- Record, playbook, and file cover most episodes. Distill is rare and
  usually draws on several episodes at once.
- Distill uses only episodes with `inputs: local`. Text an agent read from
  the web or email can be recorded or filed with its source, but cannot
  become a statement about the user.
- A preference that should bind every session becomes a rule only through
  the user (`brain_propose_rule` in an interactive session).

## Subsections
- [[proposal-episode-lifecycle-41-recording-outcomes]]: Recording outcomes
