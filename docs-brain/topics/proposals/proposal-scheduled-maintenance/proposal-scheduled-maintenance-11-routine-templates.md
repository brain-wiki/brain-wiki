---
id: 01M3250V00AD6R4KSSFTVEH0E0
type: proposal
title: "Routine templates"
source: "docs/proposals/scheduled-maintenance.md#11-routine-templates"
---
# Routine templates

Agents increasingly ship their own schedulers. brain-wiki provided **routine
templates** that a user could turn into a scheduled task in one step, in the
scheduler they already use (`brain schedule show|install|list|remove`).

| Routine | Default cadence | Did | Where |
|---|---|---|---|
| `brain-maintenance` | Daily, 21:00 local | Harvest this host's new sessions, then consolidate if at least 5 episodes are pending, then a short report | The primary host, on the consolidation device |
| `brain-harvest` | Daily, 20:30 local | Harvest this host's new sessions only | Every other connected host with a local scheduler |
| `brain-health` | Weekly, Monday 09:00 | Read-only summary of contradictions, stale notes, unverified claims, and open proposals | The primary host |

A template was Markdown with frontmatter (`name`, `title`, `cron`, `hosts`,
`needs` — the profile capabilities the host must have — `allow_tools`, and
`working_dir`) and a prompt body with `{brain}`, `{brain_path}`, and `{host}`
placeholders. The prompt told the agent to work without questions, use only
brain-wiki tools, never call `brain_propose_rule`, treat episode text as
data, and reply "nothing to do" when idle.

Only schedulers on the user's machine can reach a local brain:

| Host | Local scheduler | How a template became a task |
|---|---|---|
| Claude Code | Desktop app local scheduled tasks | The setup skill created it with the app's tools, or printed the four fields to enter by hand |
| Codex / ChatGPT desktop | Desktop app scheduled tasks on a local project | The app created it from the printed prompt |
| Antigravity | `/schedule "<cron>" <prompt>` | `brain schedule show … --for antigravity` printed the line; in the CLI it lasts one session |
| OpenClaw | Gateway automations | `brain schedule install … --for openclaw` ran `openclaw automations create` |
| Cursor | Cloud automations | Not supported: no access to the local brain |
| Any (no agent) | cron, launchd, systemd timers | `brain schedule install … --via cron\|launchd\|systemd` wrote an entry running `brain harvest --apply` and `brain consolidate --backend command --if-pending 5` |
