---
id: 01M3250V008MEJBTVYPJ6E49D5
type: guide
title: "Commit direct edits"
tags: [user-guide]
source: "docs/user/maintenance.md#commit-direct-edits"
---
# Commit direct edits

You and your agents edit notes directly. In a git brain, `brain commit`
snapshots those edits into history:

```sh
brain commit --dry-run       # what it would commit
brain commit                 # commit, then fetch and rebase onto origin
brain commit --push          # and push
```

- Files changed in the last 2 minutes wait for the next round
  (`--settle 2m`), so a half-finished edit across several notes is not split.
- Each commit lists its files and ends with a `Brain-Agent:` trailer. It
  never amends, and it commits notes that fail validation too, so any state
  can be restored.
- When the branch tracks one on `origin`, it fetches and rebases your
  commits onto it (`--no-fetch` skips this). On a conflict it puts
  everything back as it was and exits 1, naming the files; resolve it with
  `git pull --rebase` in the brain. Without a network, it keeps the local
  commit and warns.

To run it on a schedule, one job per brain:

```sh
brain schedule add commit --dry-run          # show the crontab block or LaunchAgent
brain schedule add commit --every 15m        # 5m to 24h; --push to push too
brain schedule                               # every brain's job: interval, push, last run
brain schedule remove commit
```

| Platform | The job |
|---|---|
| Linux | A block in your user crontab |
| macOS | A LaunchAgent in `~/Library/LaunchAgents/` |
| Windows | Not supported yet |

- Auto-push is off by default; add the job again with `--push` to turn it
  on. Each job has its own log under brain-wiki's state folder.
- `brain brains rename` updates the brain's job, and `brain brains remove`
  deletes it. `brain doctor` reports a job whose brain is no longer
  registered, a brain that has not synced with origin for a day, and a git
  brain with old uncommitted edits and no job.
