---
id: 01M3250V00ZZBJS8HD92D2SPMB
type: design
title: "`brain commit`"
aliases: ["05 §5.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#51-brain-commit"
---
# `brain commit`

When the brain is a git work tree:

1. Take the brain's write lock without waiting; if it is held, skip this
   round (outcome `busy`). If git is in the middle of a rebase or merge,
   commit nothing and report it (outcome `conflict`).
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
4. Record the time, the outcome (`committed`, `nothing`, `fetched`,
   `pushed`, `conflict`, `rejected`, `offline`, or `busy`), the commit, any
   conflicting files, and the time of the last successful sync under the
   brain's id in `<state>/schedule/<brain-id>.json`.

The commit message:

```
brain: snapshot 3 notes in search

M topics/search/fts5.md
M topics/search/trigram.md
A topics/search/sqlite-version-policy.md

Brain-Agent: schedule
```

| Part | Rule |
|---|---|
| Subject | `brain: snapshot N notes in <topic>` when every note is in one topic, `… in 3 topics` otherwise. Files that are not notes (a note is a `.md` file in a topic) are counted after them: `brain: snapshot 2 notes in lumen and 1 file`, or `brain: snapshot 2 files` |
| Body | One line per file with git's status letter: `A`, `M`, `D`, or `R old -> new` |
| Trailer | `Brain-Agent: schedule` from the OS job, or the host with `--as HOST`. It names who committed, not who edited |

- **Failures.** A conflict or a second push rejection (`rejected`) exits 1.
  A network or authentication failure keeps the local commit, records
  `offline`, and exits 0 with a warning; `busy` also exits 0. `brain
  doctor` reports a brain that has not synced for a day.
- Validation is not a gate: the history must hold broken states too, so
  they can be restored. brain-wiki's own pre-commit hook (`brain lint
  --install-hook`) lets a snapshot through: `brain commit` sets
  `BRAIN_WIKI_SNAPSHOT=1`, and `brain lint --staged` exits 0 when it sees
  it. Other hooks run as usual; one that fails stops the commit with git's
  error.
- A brain without git is refused with a note. With nothing to commit, it
  still fetches and rebases.
- An agent with `edit` may run it after editing; `brain commit --as HOST`
  needs `edit`, and `--push` is refused under `--as`, since pushing
  publishes the brain.
