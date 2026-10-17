---
id: 01M3250V00DQEQ061PRXHHWTAH
type: design
title: "Scheduled consolidation"
aliases: ["Write path §4.8"]
source: "docs/design/write-path.md#48-scheduled-consolidation"
---
# Scheduled consolidation

`brain schedule add consolidate --host H` installs a daily OS job, like the
commit job (§5.2), that runs `brain consolidate --run --host H`. That
command starts the host's own CLI unattended in the brain, the way a
person would run it, with brain-wiki's MCP server attached. brain-wiki
calls no model itself ([[d08-no-model-calls|D8]]).

```
brain schedule add consolidate --host claude-code [--at 21:30] [--harvest]
                               [--include AGENT|unowned]… [--dry-run]
brain schedule remove consolidate --host claude-code [--dry-run]
brain consolidate --run --host claude-code [--harvest] [--include …] [--dry-run]
```

`brain consolidate --run --host H`:

1. Checks before it starts: H's profile has `edit`, H has an unattended
   mode and its CLI is on `PATH`
   ([[agent-integrations-7-unattended-agent-mode|agent integrations §7]]),
   and the brain's write lock is free.
2. Selects H's own episodes (§4.3), plus those of the agents `--include`
   names (`unowned` for the unowned ones). With `--harvest`, it also
   counts H's new sessions; harvest must be on for H, or the run notes
   that it is off. With nothing to do, it records `nothing` and stops.
3. Starts H's CLI with a prompt that asks it to call
   `brain_consolidate_prepare` (with the included agents), follow the
   guidance, and call `brain_consolidate_done`, repeating up to 5 rounds,
   then the same for harvest with `--harvest`. The prompt says nobody is
   watching: no questions, nothing outside the brain, no rules.
4. After the agent exits, validates the files it changed (`brain
   validate`). In a git brain, frontmatter errors fail the run and nothing
   is committed; otherwise it runs `brain commit`.
5. Records the outcome per brain and host: when, status (`ok`, `nothing`,
   `failed`), the summary of the `consolidate` runs the agent made, the
   error, and notes. The record is in brain-wiki's state directory, because
   it describes this machine.

`--dry-run` makes the checks and counts and starts nothing. The command is
the user's: it is refused under `--as`.

`brain schedule add consolidate` makes the same checks with a dry run and
refuses when one fails, so a job cannot fail silently every night the way
the scheduled maintenance removed before 0.1 did. The job runs only while
the machine is on: cron skips a missed time, and launchd runs it at the
next wake. It uses the user's plan or API key for that host, like any
session.

A failed run shows in orientation ("Scheduled consolidation by claude-code
failed at …"), in `brain doctor` (`scheduled_consolidation_failed`, with
the dry run to try), and in `reports/consolidation.md`. Review is the git
diff of the snapshot commit; `brain undo` of a `consolidate` run returns its
episodes to the inbox.
