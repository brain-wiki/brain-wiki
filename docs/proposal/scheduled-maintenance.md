# Scheduled maintenance

Status: built during development and removed before 0.1. Not scheduled;
the design below needs rethinking first (§3). Since format 3, `brain schedule`
exists for one job only: running `brain commit` from crontab or a
LaunchAgent ([write path §5.2](../design/write-path.md#52-brain-schedule)).
Maintenance routines remain unbuilt.

Maintenance today runs when the user asks for it: an agent harvests and
consolidates in the session ([write path §4](../design/write-path.md#4-consolidation)),
and edits notes directly, then validates them
([write path §2.3](../design/write-path.md#23-direct-edits)).
This proposal is what ran maintenance on a schedule instead. Its command
name, `brain schedule show|install|list|remove`, described the removed
design; the name `brain schedule` now belongs to the commit jobs, so a
revival needs another name or new subcommands.

## 1. What was built

### 1.1 Routine templates

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

### 1.2 Headless consolidation

A `command` backend ran consolidation without an agent session: one
subprocess per packet, through the same presets `brain harvest --apply`
uses ([agent integrations §7](../design/agent-integrations.md#7-headless-presets)):

```toml
[consolidate]
backend   = "command"
command   = "claude-code"         # preset name, or a full argv list
model     = ""
timeout_s = 600
device    = "laptop"              # the one device that consolidates this brain
```

It rendered instructions plus the packet, ran the preset in an empty
directory with tools disabled, extracted the first JSON object with an `ops`
array, and retried once with the validator's errors. Routines checked
`[consolidate] device` through orientation and stopped on other devices.

## 2. Why it was removed

- **It failed silently by default.** A new brain lets agents only log
  episodes, so the nightly `brain consolidate --backend command` was refused
  every night, and nobody saw the error in a cron log.
- **Device names were brittle.** `[consolidate] device` coupled the brain to
  a machine name; synced dotfiles made two machines claim the same name, and
  replacing a machine stopped consolidation without warning.
- **Desktop schedulers are not configurable from outside.** Most routines
  were printed steps for the user to click through, with per-host quirks
  (session-scoped schedules, catch-up runs, tool approval prompts).
- **In-session work fits the product better.** Agents now edit notes
  directly, and consolidate when the user asks, where the user can see and
  steer it.

## 3. Open questions

1. Who may consolidate unattended, and how does the user grant it without
   granting every agent?
2. How does one device claim a brain for scheduled runs: a lease recorded in
   the brain, instead of a device name?
3. How does a failed scheduled run reach the user (orientation, a report
   file, the host's notification)?
4. Do harvest and health checks need schedules at all, or does orientation's
   nudge ("N sessions not harvested", "N episodes pending") suffice?
