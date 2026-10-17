---
id: 01M3250V00F36T4NV8VQBVYMPN
type: hub
title: "Episodes: quick capture, per-agent consolidation"
source: "docs/proposal/episode-lifecycle.md"
---
# Episodes: quick capture, per-agent consolidation

Capture is one MCP call recorded under the calling agent; each agent consolidates its own episodes, in a session or on a schedule, through five named patterns; another agent's episodes only when the user asks; harvest and import file straight into notes; `brain log`, the `episodes` capability, `import --to-episodes`, `import --from`, and `harvest --apply` removed

Status: decided 2026-10-16 (§9). Phase 1 (capture) is built; phases 2 to 4 are not.

An episode has two moments with different needs. An agent captures it in
the middle of a task, so capture must be fast and raw. Later, off the busy
path, the agent that captured it turns it into a note, because that agent
can reopen the conversation it came from. This proposal designs around
those two moments: agents capture, each agent consolidates its own
episodes, in a session or on a schedule, and the work of turning an episode
into a note follows a few named patterns. An agent takes another agent's
episodes only when the user asks. Work that is already off the busy path,
harvesting past sessions and importing documents, skips the inbox: the
agent files straight into notes.

It also removes a permission gap instead of patching it. Today
`brain log` and `brain_log_episode` check an `episodes` permission that
`brain import` and `brain harvest` skip. Under this design capture needs no
permission at all (§6), so there is nothing to skip.

Generated from `docs/proposal/episode-lifecycle.md`.

## Notes
- [[proposal-episode-lifecycle-1-lifecycle]]: Lifecycle (Episodes: quick capture, per-agent consolidation)
- [[proposal-episode-lifecycle-2-capture]]: Capture (Episodes: quick capture, per-agent consolidation)
  - [[proposal-episode-lifecycle-21-importing-is-agent-work]]: Importing is agent work
  - [[proposal-episode-lifecycle-22-harvesting-is-agent-work]]: Harvesting is agent work
- [[proposal-episode-lifecycle-3-consolidation-scope]]: Consolidation scope
  - [[proposal-episode-lifecycle-31-an-agent-consolidates-its-own-episodes]]: An agent consolidates its own episodes
  - [[proposal-episode-lifecycle-32-other-agents-episodes-only-when-the-user-asks]]: Other agents' episodes, only when the user asks
- [[proposal-episode-lifecycle-4-consolidation-patterns]]: Consolidation patterns
  - [[proposal-episode-lifecycle-41-recording-outcomes]]: Recording outcomes
- [[proposal-episode-lifecycle-5-running-consolidation]]: Running consolidation
  - [[proposal-episode-lifecycle-51-in-a-session]]: In a session
  - [[proposal-episode-lifecycle-52-on-a-schedule]]: On a schedule
  - [[proposal-episode-lifecycle-53-answers-to-why-scheduled-maintenance-was-removed]]: Answers to why scheduled maintenance was removed
  - [[proposal-episode-lifecycle-54-telling-the-user-what-happened]]: Telling the user what happened
- [[proposal-episode-lifecycle-6-permissions]]: Permissions
- [[proposal-episode-lifecycle-7-unattended-agent-mode-per-host]]: Unattended agent mode, per host
- [[proposal-episode-lifecycle-8-cujs]]: CUJs
- [[proposal-episode-lifecycle-9-decisions]]: Decisions
- [[proposal-episode-lifecycle-10-plan]]: Plan
