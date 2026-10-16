---
id: 01M3250V00Z97CP3JQ932QAAVV
type: design
title: "v0.1: local folder with optional git"
aliases: ["03 §6.2"]
source: "docs/design/03-config-and-storage.md#62-v01-local-folder-with-optional-git"
---
# v0.1: local folder with optional git

**Git mode** (`[git] mode = "auto"` in `brain.toml`): when the brain is a
git work tree, every brain-wiki run (`consolidate --done`, rule accept or
change, `agents grant`, `lint --fix`, import apply, `mv`) is committed:

- exactly the files that operation touched are staged, so unrelated
  changes the user has in progress are never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers ([[05-7-runs|05 §7]]);
- the user's own git identity is used;
- a run never pushes, pulls, or changes branches.

**Direct edits** (agents and people editing notes with their own tools) are
not runs. `brain commit` snapshots them, by hand or from an OS job; it is the
only command that talks to a remote
([[05-5-committing-direct-edits|05 §5]]):

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list
```

1. Take the brain's write lock without waiting; if a run holds it, skip
   this round (`busy`).
2. Snapshot: stage the files `git status` reports as changed, new, or
   deleted, except those modified within `--settle` (default 2 minutes), so
   a half-finished multi-file edit waits for the next round. Commit them
   with the subject `brain: snapshot N notes in <topic>` (or `in N
   topics`), one body line per file with git's status letter, and the
   trailer `Brain-Agent: schedule` (or the host under `--as HOST`). Never
   amend.
3. Sync, when the branch tracks a branch on `origin` (`--no-fetch` skips
   it): fetch without prompting, rebase local commits onto the upstream
   with `--autostash`, and with `--push` push. A rebase conflict is aborted,
   leaving commits and files as before, and exits 1 naming the files; later
   rounds keep committing locally and report the conflict until the user
   runs `git pull --rebase` in the brain. A network or authentication
   failure keeps the local commit and exits 0 with a warning (`offline`).
4. Record the time and outcome under the brain's id in
   `<state>/schedule/<brain-id>.json` (§4).

- Validation is not a gate: history must hold broken states too, so they
  can be restored.
- A brain that is not a git work tree is refused with a note.
- `--as HOST` needs `edit`, and `--push` is refused under `--as`, since
  pushing publishes the brain.

`brain schedule` installs one job per brain, keyed by the brain's id, with
the platform's own scheduler:

| Platform | Job |
|---|---|
| Linux | A user crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>`; other crontab lines stay byte for byte |
| macOS | A LaunchAgent labeled `io.github.brain-wiki.commit.<brain-id>` in `~/Library/LaunchAgents/` |
| Windows | Not yet |

- **The OS scheduler is the source of truth.** No schedule settings live in
  brain-wiki's config. `brain schedule list` (or bare `brain schedule`)
  reads the crontab blocks or LaunchAgents and shows, per job, the brain
  (resolved by id), its interval, whether it pushes, and its last run.
- Each job runs `brain commit --brain <name>` on its own interval and logs
  to `<state>/logs/schedule-<brain-id>.log`, so a slow or failing brain
  never blocks another.
- `--every` takes 5m, 10m, 15m, 20m, 30m, or 1h, 2h, 3h, 4h, 6h, 8h, 12h,
  24h, values cron and launchd express alike. Adding again replaces the
  brain's job; `--push` is chosen per job and off by default.
- The job calls `brain` by the absolute path resolved at install time, and
  carries the `BRAIN_WIKI_*` overrides set then, because cron and launchd
  start with a minimal environment.
- `brain brains rename` rewrites the job and `brain brains remove` deletes
  it (§5). A moved folder breaks the registration, not the job: re-pointing
  the registration fixes both.
- Scheduling is the user's decision: `brain schedule` is refused under
  `--as HOST`.
- `--dry-run` prints the crontab block or plist and the commands it would
  run; where no backend works (no `crontab`), it prints what to add by hand.

Episodes written by agents are not committed one at a time by the writer
(that would be a commit per capture). The next `brain commit` snapshot
picks them up, as does the `consolidate --done` run that archives them.

Git is driven through the `git` command line (subprocess with porcelain
output). It is the reference implementation, honors the user's hooks and
credential helpers, and avoids long-running library state in the MCP
server. If no `git` binary is found, git mode is off and `brain doctor`
says so.

Suggested `.gitattributes`, written by `brain init` when the user opts
into git:

```gitattributes
log.md merge=union        # append-only from several devices; union avoids conflicts
reports/** -diff          # generated
```

Episodes need no special merge rule: each is a new, uniquely named file.
Curated notes keep git's normal three-way merge; leftover conflict markers
are caught by lint.

**Share through origin, not a sync tool.** With a commit job that pushes on
each machine, every machine fetches, rebases, and pushes, so origin is how a
git brain moves between machines. Two machines committing into one `.git`
folder that a sync tool copies between them can corrupt the repository.
