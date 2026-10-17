---
id: 01M3250V00WPRFWS3HZFSGMFK0
type: proposal
title: "On a schedule"
aliases: ["Episodes: quick capture, per-agent consolidation §5.2"]
source: "docs/proposal/episode-lifecycle.md#52-on-a-schedule"
---
# On a schedule

`brain schedule` gains a second job kind, one job per brain and host:

```
brain schedule add consolidate --host claude-code [--at 21:30] [--harvest]
                               [--include cursor|unowned]… [--dry-run]
brain schedule remove consolidate --host claude-code
```

Like `brain schedule add commit`, it installs an OS job: a block in the
user's crontab on Linux, a LaunchAgent on macOS. On Linux:

```
# >>> brain-wiki consolidate 01M51PF8… claude-code
30 21 * * * /home/me/.local/bin/brain consolidate --run --host claude-code --brain weisun-brain >> /home/me/.local/state/brain-wiki/logs/consolidate-01M51PF8…-claude-code.log 2>&1
# <<< brain-wiki consolidate 01M51PF8… claude-code
```

At 21:30 cron starts brain-wiki, and brain-wiki starts the Claude Code CLI
(`claude -p`) in the brain folder, the way a person would run it, with
brain-wiki's MCP server attached. brain-wiki calls no model itself
([[d08-no-model-calls|D8]]).

- Claude Code must be installed and signed in on that machine. The run
  uses the user's Claude plan or API key, like any session.
- It runs only while the machine is on. cron skips a missed time;
  launchd runs it at the next wake.

`brain consolidate --run --host claude-code` does this:

1. Checks before it starts: the host's profile has `edit`, the host CLI is
   installed and has an unattended agent mode (§7), and the brain's write
   lock is free.
2. Selects the host's own episodes (§3.1), plus those of the agents the
   user named with `--include`. With `--harvest`, it also finds the host's
   new sessions (harvest must be on for that host). With neither, it
   records "nothing to do" and stops.
3. Starts the host's CLI unattended in the brain folder, with brain-wiki's
   MCP server and file tools limited to the brain, and gives it the
   guidance, the selected episodes, and with `--harvest` the instruction
   to harvest (§2.2).
4. After the agent exits, validates the files it changed and, in a git
   brain, runs `brain commit`.
5. Records the outcome per host: when, episodes and sessions done by
   pattern, notes changed, and any failure.
