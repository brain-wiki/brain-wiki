---
id: 01M3250V008NSZ6WWMJZGK8TZT
type: design
title: "Committing direct edits"
aliases: ["Write path §5"]
source: "docs/design/write-path.md#5-committing-direct-edits"
---
# Committing direct edits

brain-wiki's own runs commit as they apply (§7.3). Direct edits are
committed by a snapshot command, run by hand or by an OS job, one job per
brain ([[d35-git-history|D35]]). `brain validate` stays free
of side effects. Every command acts on one brain: `--brain NAME|PATH`, else
the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list                      # bare `brain schedule` lists too
```


### 5.1 `brain commit`

When the brain is a git work tree:

1. Take the brain's write lock without waiting. If it is held, skip this
   round (outcome `busy`). If git is in the middle of a rebase or merge,
   commit nothing and report it (outcome `conflict`).
2. Snapshot. Collect changed, new, and deleted files from `git status`,
   leaving out files modified within `--settle` (default 2 minutes; takes
   `30s`, `2m`, `1h`), so a half-finished multi-file edit waits for the
   next round. Stage exactly those files and commit them (format below).
   Never amend.
3. Sync with origin, when the current branch tracks a branch on `origin`.
   Otherwise this is skipped with a note. `--no-fetch` skips it too.
   1. `git fetch origin`, non-interactive (`GIT_TERMINAL_PROMPT=0`, ssh
      `BatchMode=yes`), so a job never waits for a password.
   2. Rebase local commits onto the upstream with `--autostash`. Files
      left out by `--settle` are set aside and put back.
   3. On a conflict, run `git rebase --abort`, so commits and files are
      exactly as before, and exit 1 naming the conflicting files. Later
      runs keep committing locally and report the conflict until the user
      resolves it (`git pull --rebase` in the brain).
   4. With `--push`, push to the upstream. If origin moved since the
      fetch, fetch and rebase once more, then push. A second rejection
      exits 1.
4. Record the time, the outcome (`committed`, `nothing`, `fetched`,
   `pushed`, `conflict`, `rejected`, `offline`, or `busy`), the commit, any
   conflicting files, and the time of the last successful sync in
   `<state>/schedule/<brain-id>.json`.

The commit message:

```
brain: snapshot 3 notes in search

M topics/search/fts5.md
M topics/search/trigram.md
A topics/search/sqlite-version-policy.md

Brain-Agent: schedule
```

- The subject is `brain: snapshot N notes in <topic>` when every note is in
  one topic, and `… in 3 topics` otherwise. A note is a `.md` file in a
  topic. Other files are counted after the notes: `brain: snapshot 2 notes
  in lumen and 1 file`, or `brain: snapshot 2 files`.
- The body has one line per file with git's status letter: `A`, `M`, `D`,
  or `R old -> new`.
- The trailer is `Brain-Agent: schedule`, or the host under `--as HOST`. It
  names who committed, not who edited.

Failures and limits:

- A conflict or a second push rejection (`rejected`) exits 1. A network or
  authentication failure keeps the local commit, records `offline`, and
  exits 0 with a warning. `busy` also exits 0.
- Validation is not a gate, because history must hold broken states too.
  `brain commit` sets `BRAIN_WIKI_SNAPSHOT=1`, and `brain lint --staged`
  (the hook `brain lint --install-hook` installs) exits 0 when it sees it.
  Other hooks run as usual, and one that fails stops the commit with git's
  error.
- A brain that is not a git work tree is refused. With nothing to commit,
  the command still fetches and rebases.
- `brain commit --as HOST` needs `edit`, and `--push` is refused under
  `--as`, since pushing publishes the brain.


### 5.2 `brain schedule`

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
  minimal environment. It also carries `DBUS_SESSION_BUS_ADDRESS` when set:
  git credential helpers that keep the token in the desktop keyring (`gh`,
  libsecret) need the session bus to fetch from or push to a private
  origin. That works while the user's session runs (systemd lingering keeps
  it up after logout, and the keyring must be unlocked); a fetch or push
  that fails is reported by `brain doctor` after a day.
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
