---
id: 01M3250V00HXDNBZVTYESG6GDQ
type: design
title: "`brain schedule`"
aliases: ["Write path §5.2"]
source: "docs/design/write-path.md#52-brain-schedule"
---
# `brain schedule`

`brain schedule` installs jobs with the platform's own scheduler: one
commit job per brain, and one consolidate job per brain and host (§4.8).
Jobs are keyed by the brain's id (and the host), so adding again replaces
the job and a rename does not orphan it.

| Platform | Job | Install | Remove |
|---|---|---|---|
| Linux | User crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` (`consolidate <brain-id>.<host>` for a consolidate job) | Read `crontab -l`, replace or add the block, write with `crontab -` | Drop the block |
| macOS | LaunchAgent `io.github.brain-wiki.commit.<brain-id>` (`io.github.brain-wiki.consolidate.<brain-id>.<host>`) | Write `~/Library/LaunchAgents/<label>.plist`, then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Not supported | — | — |

- Other crontab lines stay byte for byte. On Windows, `add` and `remove`
  are usage errors that suggest running `brain commit` from Task Scheduler.
- Each job runs `brain commit --brain <name> [--push]` on its own interval,
  with its own log (`<state>/logs/schedule-<brain-id>.log`) and state file,
  so a failing brain never delays another.
- `--push` is chosen per job and off by default. Without it the job commits
  and fetches but never pushes. To change it, add the job again.
- A consolidate job runs daily at `--at` (default 21:30): a cron line
  `MM HH * * *`, or a LaunchAgent `StartCalendarInterval`. Its log is
  `<state>/logs/consolidate-<brain-id>-<host>.log`, and it also carries
  `PATH`, so the host CLI is found as it was at install time.
- Schedules live only in the OS scheduler, so there is nothing in
  brain-wiki's config to drift. `brain schedule list` reads every crontab
  block or LaunchAgent (it ignores `--brain`) and shows, per job, the kind,
  the brain (by id, or `unregistered`), the interval and whether it pushes,
  or the host, time, and options, and the last run and outcome.
- `brain brains rename` rewrites the brain's jobs, found by id, and `brain
  brains remove` removes them. A moved folder breaks the registration, not
  the job, and re-pointing the registration fixes both.
- The job calls `brain` by the absolute path resolved at install time, and
  carries the `BRAIN_WIKI_CONFIG`, `_STATE_DIR`, `_CACHE_DIR`, and
  `_DATA_DIR` values set then, because cron and launchd start with a
  minimal environment.
- `--every` (default `15m`) takes minutes that divide an hour or hours that
  divide a day (`5m`, `10m`, `15m`, `20m`, `30m`, `1h`, `2h`, `3h`, `4h`,
  `6h`, `8h`, `12h`, `24h`), so cron and launchd agree.
- `--dry-run` prints the crontab block or plist and the commands it would
  run. Without a `crontab` command, `add` prints the block to add by hand
  and exits 1. An unregistered brain, a brain that is not a git work tree,
  or an `--every` outside the list is a usage error (exit 2).
- `add` and `remove` are refused under `--as HOST`, like `agents grant`.
  `list` is allowed.
- Setup offers a 15-minute job for a git brain that has none (default yes),
  and asks whether it should push when the brain has an `origin` remote
  (default no).
- Tests drive the backends through an injected command runner, never the
  real crontab or launchd.

Share a git brain through origin, not a sync tool. With pushing jobs on
each machine, every machine fetches, rebases, and pushes. Two machines
committing into one `.git` that a sync tool copies between them can
corrupt it.

`brain doctor` reports:

| Code | When |
|---|---|
| `schedule_unregistered` | A job's brain id is no longer registered |
| `brain_not_synced` | The last `brain commit` ended `offline`, `conflict`, or `rejected`, and the last successful sync is over a day old |
| `uncommitted_edits` | A git brain with no job has uncommitted files last changed over a day ago |
