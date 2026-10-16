---
id: 01M3250V00XATT20Z0R61BFF7G
type: guide
title: "Direct edits (Agents)"
tags: [user-guide]
source: "docs/user/agents.md#direct-edits"
---
# Direct edits (Agents)

An agent whose profile includes `edit` writes knowledge straight into notes
with its own file tools: it updates a note (a person's new role, a wrong
fact) or creates one under `topics/<topic>/`, then runs `brain_validate` and
fixes what it reports. Orientation shows such an agent the frontmatter
fields and the suggested body shape.

- Agents never edit `rules.md`, `brain.toml`, `log.md`, `AGENTS.md`, or
  anything under `inbox/`, `archive/`, or `reports/`; `brain validate`
  reports it when one of those is passed to it.
- Direct edits are not runs, so `brain undo` does not reverse them. In a git
  brain, `brain commit` (or its scheduled job) records them, and git
  reverts them ([[user-maintenance-commit-direct-edits|Maintenance]]). Without
  git there is no record of them.
- Your own edits in Obsidian or an editor follow the same path.
