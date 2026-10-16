# Maintenance

## Commit direct edits

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

## Share a brain between machines

Push the brain to a private git remote and clone it on each machine. Give
each machine a commit job with `--push`. Each one then fetches, rebases, and
pushes, and origin carries changes between them.

Do not keep a git brain in a folder that a sync tool (iCloud, Dropbox,
Syncthing) copies between machines. Two machines committing into the same
`.git` folder can corrupt it. A brain without git can live in a synced
folder, but then direct edits have no history.

## Consolidate

Consolidation folds inbox episodes into notes. It runs only when you ask.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; the agent needs `edit` |
| `brain consolidate --prepare`, edit, `brain validate`, `brain consolidate --done EPISODE…` | By hand or from your own tooling |

1. `--prepare` lists pending episodes, oldest first, each with the notes it
   most likely belongs to, plus guidance on writing them in. `--max-episodes`
   caps the count; the default is 50 (`[consolidate] max_episodes_per_run`
   in `brain.toml`).
2. You or the agent edit the notes and cite each episode in `bw-sources`.
3. `--done` moves the handled episodes to `archive/` as one run. The
   archived episode stays the note's source. `brain undo` returns them to
   the inbox.

## Rule proposals

Agents with `propose_rules` can propose rules. A proposal waits in
`inbox/proposals/` until you decide:

```sh
brain review list
brain review show ID
brain review accept ID      # or: brain rules accept ID
brain review reject ID
```

`brain rules list` shows your rules and the proposals still waiting.

## Lint and reports

```sh
brain validate                   # frontmatter of the notes git sees as changed
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW405  # info-level fixes run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

- `brain validate` runs lint's frontmatter rules on the files you just
  edited, or on every note in a brain without git.
- The lint summary counts only what `brain lint --fix` would repair.
  Info-level fixes are listed separately, with the `--select` that turns
  them on.
- `--install-hook` does nothing when its own hook is already there, and
  never overwrites a hook someone else wrote. The hook does not block
  `brain commit`.

`reports/` holds pages you can browse in Obsidian: an index, stale links
(active notes that link to superseded or archived notes), the inbox,
orphans, and the latest lint results.

## Convert notes from brain-wiki 0.1

brain-wiki 0.1 kept facts and relations in `bw-claims` and `bw-<verb>`
fields (format 2), or in `## Claims` and `## Relations` sections (format
1). Those notes still work and stay searchable. Lint reports them as BW117.
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
| `bw-depends_on`, `bw-related_to`, and other verbs | `## Related` bullets, such as `- Depends on [[x]]` |
| `bw-supersedes`, `bw-superseded_by` | `status: superseded` and `bw-superseded_by` on the older note |

Episodes are not converted.

## Move a note

```sh
brain mv topics/search/old-name.md topics/search/new-name.md --dry-run
brain mv topics/search/old-name.md topics/search/new-name.md
```

- Links that name the note by path or file name are rewritten in the same
  run.
- Moving a topic folder (`brain mv topics/storage topics/persistence`) also
  renames its `[topics.storage]` table in `brain.toml`, or updates its
  `path`, and refreshes the `AGENTS.md` topic table.
- Moving files in another tool works too. Links keep resolving through the
  index's path history, and `brain lint --fix` rewrites them.

## Undo

```sh
brain runs                 # this device's runs, newest first
brain runs show RUN
brain undo                 # the latest run
brain undo RUN --force     # even if its files changed since
```

A run is a change brain-wiki itself makes: `lint --fix`, `mv`,
`consolidate --done`, rules, profile changes, and imports.

- Undo puts back the files from copies saved when the run was made, as a new
  run. In a git brain that run is committed too.
- If you edited the files since, undo refuses. `--force` undoes anyway and
  saves the current versions first.
- Only runs made on this device can be undone here.

Direct edits are not runs. Revert them with git. Without git there is no
history to go back to.

## Git

When the brain is a git work tree, each run commits exactly the files it
touched. The commit uses your git identity and hooks, and has `Brain-Run:`
and `Brain-Agent:` trailers.

- `brain commit` commits direct edits. It is the only command that fetches,
  rebases, or pushes.
- brain-wiki never switches branches.
- `[git] mode = "off"` in `brain.toml` stops runs from committing.

If git refuses a run's commit, the run is still applied and the command
warns on stderr with git's message. This happens, for example, when the
hook from `brain lint --install-hook` finds an error. The files stay staged.
Fix what git reported, then run `git commit`.
