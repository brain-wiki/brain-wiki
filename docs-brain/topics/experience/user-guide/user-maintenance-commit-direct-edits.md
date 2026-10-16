---
id: 01M3250V008MEJBTVYPJ6E49D5
type: guide
title: "Commit direct edits"
source: "docs/user/maintenance.md#commit-direct-edits"
---
# Commit direct edits

You and your agents edit notes directly. In a git brain, `brain commit`
records those edits in git history:

```sh
brain commit --dry-run       # what it would commit
brain commit                 # commit, then fetch and rebase onto origin
brain commit --push          # and push
```

- It commits every changed file in the brain, new episodes included.
- Files changed in the last 2 minutes wait for the next round (`--settle
  2m`), so a half-finished edit across several notes is not split.
- Each commit lists its files and ends with a `Brain-Agent:` trailer. It
  never amends.
- It commits notes that fail validation too, so any state can be restored.
- When the branch tracks a branch on `origin`, it fetches and rebases onto
  it. `--no-fetch` skips this.
- On a rebase conflict it aborts the rebase, names the files, and exits 1.
  Resolve it with `git pull --rebase` in the brain.
- If it cannot reach origin, it keeps the local commit and warns.

To run it on a schedule, add one job per brain:

```sh
brain schedule add commit --dry-run          # show the crontab block or LaunchAgent
brain schedule add commit --every 15m        # --push to push too
brain schedule                               # every brain's job: interval, push, last run
brain schedule remove commit
```

| Platform | The job |
|---|---|
| Linux | A block in your user crontab |
| macOS | A LaunchAgent in `~/Library/LaunchAgents/` |
| Windows | Not supported yet |

- `--every` takes `5m`, `10m`, `15m`, `20m`, `30m`, `1h`, `2h`, `3h`, `4h`,
  `6h`, `8h`, `12h`, or `24h`.
- The job does not push by default. To turn pushing on, add the job again
  with `--push`.
- Each job writes its own log under brain-wiki's state folder.
- `brain brains rename` updates the brain's job, and `brain brains remove`
  deletes it.
- `brain doctor` warns about a job whose brain is no longer registered, and
  a brain that has not synced with origin for over a day. It also points out
  a git brain without a job that has edits older than a day.
