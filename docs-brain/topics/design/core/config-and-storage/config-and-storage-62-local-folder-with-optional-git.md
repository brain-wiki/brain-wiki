---
id: 01M3250V003Z1G9GWRNNZ16GEZ
type: design
title: "Local folder with optional git"
aliases: ["Config and storage §6.2"]
source: "docs/design/config-and-storage.md#62-local-folder-with-optional-git"
---
# Local folder with optional git

When the brain is a git work tree and `[git] mode` in `brain.toml` is
`"auto"` (the default) or `"on"`, every brain-wiki run is committed as it
applies ([[write-path-73-apply|write path §7.3]]):

- exactly the files the run touched are staged, so the user's unrelated
  work in progress is never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers;
- the user's own git identity and hooks are used;
- a run never pushes, pulls, or changes branches.

Direct edits by agents and people are not runs. `brain commit` snapshots
them, by hand or from an OS job that `brain schedule` installs, and is the
only command that talks to a remote. Episodes are not committed one at a
time; the next snapshot picks them up, as does the `consolidate --done` run
that archives them. See
[[write-path-5-committing-direct-edits|write path §5]] for the snapshot,
sync, conflict handling, and job details.

Git is driven through the `git` command line with porcelain output. The CLI
is the reference implementation, honors the user's hooks and credential
helpers, and keeps no long-running library state in the MCP server. Without
a `git` binary, no brain counts as a git work tree, so runs are not
committed and `brain commit` refuses.

`brain init` writes this `.gitattributes`:

```gitattributes
log.md merge=union
reports/** -diff
```

`log.md` is appended to from several devices, and a union merge avoids
conflicts. Reports are generated. Episodes need no merge rule, because each
is a new, uniquely named file. Notes keep git's normal three-way merge, and
lint catches leftover conflict markers (BW114).

Share a git brain through origin, not a sync tool. Two machines committing
into one `.git` folder that a sync tool copies between them can corrupt the
repository.
