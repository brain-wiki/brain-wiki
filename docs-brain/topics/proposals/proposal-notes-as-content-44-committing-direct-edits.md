---
id: 01M3250V00VM2VBQE139JG9K9K
type: proposal
title: "Committing direct edits"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#44-committing-direct-edits"
---
# Committing direct edits

brain-wiki's own runs commit as today (`git.mode = "auto"`). Direct edits
are committed by a snapshot command, run by hand or by an OS job, one job
per brain. `brain validate` stays free of side effects. Every command acts
on one brain: `--brain NAME|PATH`, else the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list
```

**`brain commit`**, when the brain is a git work tree:

1. Take the brain's write lock without waiting; if it is held, skip this
   round.
2. **Snapshot.** Collect changed, new, and deleted files (`git status`),
   leaving out files modified within `--settle` (default 2 minutes), so a
   half-finished multi-file edit waits for the next round. Stage exactly
   those files and commit them (format below). Never amend.
3. **Sync with origin**, when the current branch tracks a branch on
   `origin` (otherwise skipped with a note; `--no-fetch` skips it):
   1. `git fetch origin`, non-interactive (`GIT_TERMINAL_PROMPT=0`, ssh
      `BatchMode=yes`), so a job never waits for a password.
   2. Rebase local commits onto the upstream with `--autostash`; files left
      out by `--settle` are set aside and put back.
   3. On a conflict: `git rebase --abort`, so commits and files are exactly
      as before; exit 1, naming the conflicting files. Later runs keep
      committing locally and report the conflict until the user resolves it
      (`git pull --rebase` in the brain).
   4. With `--push`: push to the upstream. If origin moved since the fetch,
      fetch and rebase once more, then push; a second rejection exits 1.
4. Record the time and the outcome (committed, fetched, pushed, conflict,
   offline) under the brain's id in `<state>/schedule/<brain-id>.json`.

The commit message:

```
brain: snapshot 3 notes in lumen/sync

M topics/lumen/sync/crdt.md
M topics/lumen/sync/offline.md
A topics/lumen/sync/conflicts.md

Brain-Agent: schedule
```

| Part | Rule |
|---|---|
| Subject | `brain: snapshot N notes in <topic>` when every file is in one topic, `… in 3 topics` otherwise; files that are not notes count as `files` |
| Body | One line per file with git's status letter: `A`, `M`, `D`, or `R old -> new` |
| Trailer | `Brain-Agent: schedule` from the OS job, or the host with `--as HOST`. It names who committed, not who edited |

- **Failures.** A conflict or a second push rejection exits 1. A network or
  authentication failure keeps the local commit, records `offline`, and
  exits 0 with a warning; `brain doctor` reports a brain that has not
  synced for a day.
- Validation is not a gate: the history must hold broken states too, so
  they can be restored.
- A brain without git is refused with a note. With nothing to commit, it
  still fetches and rebases.
- An agent with `edit` may run it after editing; `brain commit --as HOST`
  needs `edit`, and `--push` is refused under `--as`, since pushing
  publishes the brain.

**`brain schedule`** installs one job per brain with the scheduler native to
the platform. Jobs are keyed by the brain's id, so adding again replaces the
brain's job and a rename does not orphan it:

| Platform | One job per brain | Install | Remove |
|---|---|---|---|
| Linux | A user crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` | Read `crontab -l`, replace or add the brain's block, write it back with `crontab -`; other lines stay byte for byte | Drop the brain's block |
| macOS | A LaunchAgent labeled `io.github.brain-wiki.commit.<brain-id>` | Write `~/Library/LaunchAgents/<label>.plist` (`ProgramArguments`, `StartInterval`, `StandardOutPath`/`StandardErrorPath`), then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Task Scheduler (`schtasks`), later | — | — |

- **Isolation.** Each job runs `brain commit --brain <name>` on its own
  interval, with its own log (`<state>/logs/schedule-<brain-id>.log`) and
  state file. A slow or failing brain never delays or blocks another.
- **Auto-push is chosen per job.** `--push` adds `--push` to the job's
  command; without it the job commits and fetches but never pushes. To
  change it, add the job again. Off by default.
- **The OS scheduler is the source of truth.** No schedule settings live in
  brain-wiki's config, so there is nothing to drift. `brain schedule list`
  reads the crontab blocks or LaunchAgents and shows, per job, the brain
  (resolved by id), its interval, whether it pushes, and its last run and
  outcome.
- **Brain lifecycle.** The job names the brain, so it follows the
  registration: `brain brains rename` rewrites the brain's job (found by
  id) along with its other references, and `brain brains remove` removes it.
  A moved folder breaks the registration, not the job: re-pointing the
  registration fixes both. `brain doctor` reports a job whose brain is no
  longer registered.
- The job calls the `brain` executable by the absolute path resolved at
  install time, because cron and launchd start with a minimal `PATH`.
  `BRAIN_WIKI_*` overrides set at install time are written into the job.
- `--every` takes minutes that divide an hour or hours that divide a day
  (5m to 24h), so cron and launchd agree.
- `--dry-run` prints the crontab block or the plist and the commands it
  would run. Where no backend works (no `crontab` binary), it prints what
  to add by hand.
- **Share through origin, not a sync tool.** With jobs that push on each
  machine, every machine fetches, rebases, and pushes, so origin is how a
  brain moves between machines. Two machines committing into one `.git`
  that a sync tool copies between them can corrupt it; the docs say so.
- Scheduling is the user's decision: refused under `--as HOST`, like
  `agents grant`.
- Setup offers the job when the brain uses git and asks whether it should
  push (default no); `brain doctor` reports a git brain with old
  uncommitted changes and no job.
- Tests drive the backends through an injected command runner and never
  touch the real crontab or launchd.
