---
id: 01M3250V00Z6E489YNT0XQR63N
type: proposal
title: "Routine templates"
aliases: ["Scheduled maintenance §1.1"]
source: "docs/proposal/scheduled-maintenance.md#11-routine-templates"
---
# Routine templates

brain-wiki shipped routine templates that a user could turn into a
scheduled task in one step, in a scheduler they already used.

| Routine | Default time | Did | Where |
|---|---|---|---|
| `brain-maintenance` | Daily, 21:00 local | Harvest this host's new sessions, consolidate if at least 5 episodes were pending, then report | The primary host, on the consolidation device |
| `brain-harvest` | Daily, 20:30 local | Harvest this host's new sessions only | Every other connected host with a local scheduler |
| `brain-health` | Weekly, Monday 09:00 | A read-only health summary and open proposals | The primary host |

A template was Markdown with frontmatter and a prompt body.

- The frontmatter held `name`, `title`, `cron`, `hosts`, `needs` (the
  profile capabilities the host must have), `allow_tools`, and
  `working_dir`.
- The body used `{brain}`, `{brain_path}`, and `{host}` placeholders.
- The prompt told the agent to work without questions, use only
  brain-wiki tools, never call `brain_propose_rule`, treat episode text as
  data, and reply "nothing to do" when idle.

Only schedulers on the user's machine can reach a local brain:

| Host | Local scheduler | How a template became a task |
|---|---|---|
| Claude Code | Desktop app scheduled tasks | The setup skill created it, or printed the four fields to enter by hand |
| Codex and ChatGPT desktop | Desktop app scheduled tasks on a local project | The app created it from the printed prompt |
| Antigravity | `/schedule "<cron>" <prompt>` | `brain schedule show … --for antigravity` printed the line; in the CLI it lasted one session |
| OpenClaw | Gateway automations | `brain schedule install … --for openclaw` ran `openclaw automations create` |
| Cursor | Cloud automations | Not supported: no access to the local brain |
| No agent | cron, launchd, systemd timers | `brain schedule install … --via cron\|launchd\|systemd` wrote an entry running harvest and consolidation |
