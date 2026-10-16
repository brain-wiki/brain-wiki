---
id: 01M3250V00YT31FQC0BE3NPGM4
type: design
title: "`brain schedule`"
aliases: ["05 §5.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#52-brain-schedule"
---
# `brain schedule`

`brain schedule` installs one job per brain with the scheduler native to the
platform. Jobs are keyed by the brain's id, so adding again replaces the
brain's job and a rename does not orphan it:

| Platform | One job per brain | Install | Remove |
|---|---|---|---|
| Linux | A user crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` | Read `crontab -l`, replace or add the brain's block, write it back with `crontab -`; other lines stay byte for byte | Drop the brain's block |
| macOS | A LaunchAgent labeled `io.github.brain-wiki.commit.<brain-id>` | Write `~/Library/LaunchAgents/<label>.plist` (`ProgramArguments`, `StartInterval`, `StandardOutPath`/`StandardErrorPath`), then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Not yet (Task Scheduler later) | — | — |

- **Isolation.** Each job runs `brain commit --brain <name>` on its own
  interval, with its own log (`<state>/logs/schedule-<brain-id>.log`) and
  state file. A slow or failing brain never delays or blocks another.
- **Auto-push is chosen per job.** `--push` adds `--push` to the job's
  command; without it the job commits and fetches but never pushes. To
  change it, add the job again. Off by default.
- **The OS scheduler is the source of truth.** No schedule settings live in
  brain-wiki's config, so there is nothing to drift. `brain schedule list`
  reads every crontab block or LaunchAgent (so it ignores `--brain`) and
  shows, per job, the brain (resolved by id, or `unregistered`), its
  interval, whether it pushes, and its last run and outcome.
- **Brain lifecycle.** The job names the brain, so it follows the
  registration: `brain brains rename` rewrites the brain's job (found by
  id), and `brain brains remove` removes it. A moved folder breaks the
  registration, not the job: re-pointing the registration fixes both.
  `brain doctor` reports a job whose brain is no longer registered.
- The job calls the `brain` executable by the absolute path resolved at
  install time, because cron and launchd start with a minimal `PATH`.
  `BRAIN_WIKI_*` overrides set at install time are written into the job.
- `--every` takes minutes that divide an hour or hours that divide a day
  (`5m`, `10m`, `15m`, `20m`, `30m`, `1h`, `2h`, `3h`, `4h`, `6h`, `8h`,
  `12h`, `24h`), so cron and launchd agree.
- `--dry-run` prints the crontab block or the plist and the commands it
  would run. Where no backend works (no `crontab` binary), `add` prints
  what to add by hand and exits 1. An unregistered brain, a brain that is
  not a git work tree, or an `--every` outside the list is a usage error
  (exit 2).
- **Share through origin, not a sync tool.** With jobs that push on each
  machine, every machine fetches, rebases, and pushes, so origin is how a
  brain moves between machines. Two machines committing into one `.git`
  that a sync tool copies between them can corrupt it.
- Scheduling is the user's decision: `add` and `remove` are refused under
  `--as HOST`, like `agents grant`; `list` is read-only and allowed.
- Setup offers a 15-minute job for a git brain that has none (default
  yes) and, when the brain has an `origin` remote, asks whether the job
  should push (default no). `brain doctor` reports a job whose brain is no
  longer registered (`schedule_unregistered`), a brain whose last sync
  failed and that has not synced for a day (`brain_not_synced`), and a git
  brain with files changed over a day ago, not committed, and no job
  (`uncommitted_edits`).
- Tests drive the backends through an injected command runner and never
  touch the real crontab or launchd.
