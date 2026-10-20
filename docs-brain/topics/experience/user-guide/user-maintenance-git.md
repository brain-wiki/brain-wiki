---
id: 01M3250V00DXJEH8DSFHYTQMXN
type: guide
title: "Git"
source: "docs/user/maintenance.md#git"
---
# Git

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
