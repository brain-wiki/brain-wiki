---
id: 01M3250V00NAPS398GM6NRRKY2
type: proposal
title: "Capture (Episodes: quick capture, per-agent consolidation)"
aliases: ["Episodes: quick capture, per-agent consolidation §2"]
source: "docs/proposal/episode-lifecycle.md#2-capture"
---
# Capture (Episodes: quick capture, per-agent consolidation)

Capture records what happened, in the agent's words, and returns at once.
The agent does not search the brain or decide where the knowledge goes.

- Agents write episodes, through MCP `brain_log_episode`. Almost every
  agent host speaks MCP. Every connected host may capture; no permission
  is needed.
- People do not write episodes. A person records knowledge by editing a
  note, in Obsidian or any editor, or by telling an agent "remember this".
  `brain log` goes away.
- An episode file written by hand into `inbox/episodes/` is still
  accepted. Its owner is the `bw-agent` it names, or none. brain-wiki
  cannot tell a hand-written file from one written on another machine, and
  permissions are not a security boundary (§6), so ownership is what the
  file says. The brain's `AGENTS.md` block stops suggesting hand-written
  episodes.
- The writer always sets `bw-agent` to the calling host. An agent cannot
  write an episode as another agent. `bw-session`, `bw-turns`, and
  `bw-device` stay as today, so the owner can reopen the conversation.
- `brain_log_episode` keeps its fields (`summary`, `claims`,
  `open_questions`, `topics`) and gains one optional hint, `pattern`: the
  agent's quick guess at how the episode should be consolidated (`record`,
  `playbook`, `file`, `distill`). Consolidation may ignore it.
- The tool description and orientation tell agents: capture raw, do not
  organize now; consolidation happens later.

Every episode has an owner, or none:

| Written by | Owner |
|---|---|
| MCP `brain_log_episode` | The calling host |
| A file written by hand into `inbox/episodes/` | The `bw-agent` it names, or none |
| An episode harvested before this change (`bw-captured: harvest`) | The host in its `bw-agent` |
| An episode imported before this change (`bw-captured: import`) | None |

## Subsections
- [[proposal-episode-lifecycle-21-importing-is-agent-work]]: Importing is agent work
- [[proposal-episode-lifecycle-22-harvesting-is-agent-work]]: Harvesting is agent work
