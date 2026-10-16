# Scheduled maintenance

Status: built during development and removed before 0.1. Not scheduled; the
design needs rethinking first (§3). Today `brain schedule` runs one kind of
job, `brain commit`, from crontab or a LaunchAgent
([write path §5.2](../design/write-path.md#52-brain-schedule)). Scheduled
harvest and consolidation are not built.

Today maintenance runs when the user asks. An agent harvests and
consolidates in the session
([write path §4](../design/write-path.md#4-consolidation)), and edits notes
directly, then validates them
([write path §2.3](../design/write-path.md#23-direct-edits)). This proposal
records the design that ran maintenance on a schedule instead.

The removed design used `brain schedule show|install|list|remove`. The name
`brain schedule` now belongs to commit jobs, so a revival needs another name
or new subcommands.

## 1. What was built

### 1.1 Routine templates

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

### 1.2 Headless consolidation

A `command` backend ran consolidation without an agent session: one
subprocess per packet, through the presets `brain harvest --apply` uses
([agent integrations §7](../design/agent-integrations.md#7-headless-presets)).

```toml
[consolidate]
backend   = "command"
command   = "claude-code"         # preset name, or a full argv list
model     = ""
timeout_s = 600
device    = "laptop"              # the one device that consolidates this brain
```

It ran the preset in an empty folder with tools disabled and parsed the
reply as JSON operations, retrying once with the validator's errors.
Routines read `[consolidate] device` from orientation and stopped on other
devices. Consolidation is now direct edits by an agent
([D34](../decision/d34-direct-edits.md)), so this backend cannot return as
it was.

## 2. Why it was removed

- It failed silently by default. A new brain then let agents only log
  episodes, so the nightly consolidation was refused every night, and
  nobody saw the error in a cron log.
- Device names were brittle. `[consolidate] device` tied the brain to a
  machine name. Synced dotfiles made two machines claim the same name, and
  replacing a machine stopped consolidation without warning.
- Desktop schedulers cannot be configured from outside. Most routines were
  printed steps for the user to click through, with per-host quirks:
  session-scoped schedules, catch-up runs, and tool approval prompts.
- In-session work fits the product better. Agents edit notes directly and
  consolidate when the user asks, where the user can see and steer them.

## 3. Open questions

1. Who may consolidate unattended, and how does the user allow it without
   allowing every agent?
2. How does one device claim a brain for scheduled runs? A lease recorded
   in the brain could replace a device name.
3. How does a failed scheduled run reach the user: orientation, a report
   file, or the host's notification?
4. Do harvest and health checks need schedules at all, or do orientation's
   inbox reminder ("N pending episodes") and `brain harvest --status`
   suffice? Orientation does not report unharvested sessions today.
