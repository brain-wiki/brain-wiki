# Maintenance

## Consolidate

Consolidation turns inbox episodes into claims on notes. A model proposes
small operations (add a claim, confirm one, supersede one, add a relation,
create a note); brain-wiki validates every one and applies them as one
undoable run.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; needs `consolidate` in the host's profile |
| `brain consolidate --prepare` then `--apply OPS.json --run RUN` | Driving it from your own tooling |

Nothing is ever deleted: superseded claims move to the note's
`bw-claims-superseded` list, with the id of what replaced them. Episodes move to `archive/` with the run.

## Review

Some runs wait for you instead of applying: many claims superseded at
once, a topic marked `review = "always"`, or a brain with
`[consolidate] review = "always"`.

```sh
brain review list
brain review show RUN
brain review accept RUN     # re-validated against the notes as they are now
brain review reject RUN     # its episodes stay in the inbox
```

Agents can propose rules too; those wait for `brain rule accept ID`.

## Lint and reports

```sh
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW205  # info-level suggestions run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

`reports/` holds pages you can browse in Obsidian: contradictions, stale
dependencies, unverified claims, the inbox, duplicate claims, orphans, and
the latest lint results.

Notes written before format 2 keep claims and relations in `## Claims` and
`## Relations` sections. They still work; lint reports them as BW116, and
`brain lint --fix` moves them into `bw-` fields in one undoable run.

## Move a note

```sh
brain mv topics/search/old-name.md topics/search/new-name.md --dry-run
brain mv topics/search/old-name.md topics/search/new-name.md
```

Links that named the note by path or file name are rewritten in the same
run. Moving files in another tool is fine too: links keep resolving through
the index's path history, and `brain lint --fix` rewrites them.

## Undo

```sh
brain runs                 # this device's runs, newest first
brain runs show RUN
brain undo                 # the latest run
brain undo RUN [--force]   # --force keeps a copy of files changed since
```

In a git brain, undo reverts the run's commit. Elsewhere it restores the
files the run changed, and refuses if you edited them since unless you pass
`--force`.

## Git

When the brain is a git work tree, each run commits exactly the files it
touched, with your identity and hooks and `Brain-Run:` / `Brain-Agent:`
trailers. brain-wiki never pushes, pulls, or switches branches. Episodes
are committed with the run that consolidates them.
