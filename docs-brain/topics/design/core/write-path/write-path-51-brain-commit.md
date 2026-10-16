---
id: 01M3250V00NYS38AT1EQ67GRQA
type: design
title: "`brain commit`"
aliases: ["Write path §5.1"]
source: "docs/design/write-path.md#51-brain-commit"
---
# `brain commit`

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
