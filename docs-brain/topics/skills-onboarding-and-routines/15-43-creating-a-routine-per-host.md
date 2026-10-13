---
id: 01M3250V003WAW6Y61S2MV5Q94
type: design
title: "Creating a routine, per host"
aliases: ["15 §4.3"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#43-creating-a-routine-per-host"
bw-part_of:
  - "[[15-4-routines]]"
---
# Creating a routine, per host

Only schedulers that run **on the user's machine** can reach a local brain
and local session stores. Cloud schedulers start in a fresh environment
without them, so they are not targets until remote storage exists
([[03-6-storage-and-sync|03 §6]]).

| Host | Local scheduler | How the template becomes a task |
|---|---|---|
| Claude Code | Desktop app local scheduled tasks (run while the app is open and the computer awake; one catch-up run after sleep) | The setup skill creates it with the app's scheduling tools when it runs inside the desktop app; otherwise `brain schedule show brain-maintenance --for claude-code` prints the prompt and the four fields to enter under Routines → New routine → Local (name, schedule, instructions, folder = the brain). The CLI's `/loop` is session-scoped and not used for routines. |
| Codex / ChatGPT desktop | Desktop app scheduled tasks on a local project (app running) | The skill asks the app to create a scheduled task from the template with the brain folder as the project; otherwise the printed prompt and steps. |
| Antigravity | `/schedule "<cron>" <prompt>` (desktop and CLI), backed by its scheduled-task runner | `brain schedule show … --for antigravity` prints the exact `/schedule` line to paste or for the agent to run. |
| OpenClaw | Gateway automations (`openclaw automations create "<cron>" "<prompt>" --name … --session isolated --no-deliver`) | `brain schedule install brain-maintenance --for openclaw` runs that command after showing it. |
| Cursor | Automations run as cloud agents | Not supported in v0.1 (no access to the local brain). |
| Any (no agent) | cron, launchd, systemd timers, Windows Task Scheduler | `brain schedule install brain-maintenance --via cron\|launchd\|systemd` writes an entry that runs `brain harvest --apply` and `brain consolidate --backend command --if-pending 5` with the configured headless preset. |

`brain schedule list` shows the routines brain-wiki created or printed, per
host; `brain schedule remove` reverses the ones it can (OpenClaw, OS
schedulers) and prints steps for the ones it cannot (desktop apps).
