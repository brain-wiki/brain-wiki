# Maintenance

## Commit direct edits

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

## Share a brain between machines

Push the brain to a private git remote and clone it on each machine. With a
commit job that pushes on every machine, each one fetches, rebases, and
pushes, so origin is how changes move between them.

Do not keep a git brain in a folder that a sync tool (iCloud, Dropbox,
Syncthing, …) copies between machines: two machines committing into the same
`.git` folder can corrupt it. A brain without git can live in a synced
folder, but then direct edits have no history.

## Consolidate

The inbox holds episodes nobody has organized yet. Consolidation folds them
into notes. It is optional, and runs when you ask.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; the agent needs `edit` |
| `brain consolidate --prepare`, edit notes, `brain validate`, then `brain consolidate --done EPISODE…` | By hand or from your own tooling |

`--prepare` lists pending episodes, oldest first, each with the notes it
most likely belongs to, plus guidance on writing them in. Once the notes are
edited and valid, `--done` moves the handled episodes to `archive/` as one
run; `brain undo` returns them to the inbox. Notes cite an episode in
`bw-sources`, so the archived episode stays the source.

## Rule proposals

Agents can propose rules. They wait for you:

```sh
brain review list
brain review show ID
brain review accept ID      # or: brain rules accept ID
brain review reject ID
```

## Lint and reports

```sh
brain validate                   # frontmatter of the notes git sees as changed
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW405  # info-level suggestions run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

`brain validate` runs lint's frontmatter rules on the files you just edited
(every note without git). The lint summary counts only what
`brain lint --fix` would repair. Info-level fixes are listed separately with
the `--select` that turns them on. An unknown code or prefix in `--select`
or `--ignore` is a usage error, and so is `--dry-run` without `--fix`.
Running `--install-hook` again over its own hook does nothing; it never
overwrites a hook someone else wrote.

`reports/` holds pages you can browse in Obsidian: an index, stale links
(active notes that link to superseded or archived notes), the inbox,
orphans, and the latest lint results.

## Convert notes from brain-wiki 0.1

brain-wiki 0.1 kept facts and relations in `bw-claims` and `bw-<verb>`
fields (format 2) or in `## Claims` and `## Relations` sections (format 1).
Those notes still work and stay searchable; lint reports them as BW117.
Convert them in one undoable run:

```sh
brain lint --fix --dry-run       # the diff
brain lint --fix
```

| Before | After |
|---|---|
| `bw-claims` | `## Facts` bullets (the text only) |
| `bw-claims-superseded` | `## History` bullets, struck through |
| Claim sources | `bw-sources` links; inbox paths point to `archive/` |
| `bw-depends_on`, `bw-related_to`, … | `## Related` bullets, such as `- Depends on [[x]]` |
| `bw-supersedes` / `bw-superseded_by` | `status: superseded` and `bw-superseded_by` on the older note |

Episodes are not converted.

## Move a note

```sh
brain mv topics/search/old-name.md topics/search/new-name.md --dry-run
brain mv topics/search/old-name.md topics/search/new-name.md
```

Links that named the note by path or file name are rewritten in the same
run. Moving a topic folder (`brain mv topics/storage topics/persistence`)
also renames its `[topics.storage]` table in `brain.toml` (or updates its
`path`) and refreshes the `AGENTS.md` topic table, in that same run. Moving files in another tool
is fine too: links keep resolving through the index's path history, and
`brain lint --fix` rewrites them.

## Undo

```sh
brain runs                 # this device's runs, newest first
brain runs show RUN
brain undo                 # the latest run
brain undo RUN [--force]   # --force keeps a copy of files changed since
```

Runs are the changes brain-wiki itself makes (`lint --fix`, `mv`,
`consolidate --done`, rules, profiles, imports). In a git brain, undo
reverts the run's commit. Elsewhere it restores the files the run changed,
and refuses if you edited them since unless you pass `--force`.

Direct edits are not runs: revert them with git. Without git there is no
history to go back to.

## Git

When the brain is a git work tree, each run commits exactly the files it
touched, with your identity and hooks and `Brain-Run:` / `Brain-Agent:`
trailers. Direct edits are committed by `brain commit`, the only command
that fetches, rebases, or pushes; brain-wiki never switches branches.
Episodes are committed with the run that archives them.

If git refuses a run's commit (for example, the pre-commit hook from
`brain lint --install-hook` finds an error), the run is still applied and
the command warns on stderr with git's message. The files stay staged: fix
what git reported, then `git commit`.
