---
id: 01M3250V00DXJEH8DSFHYTQMXN
type: guide
title: "Git"
tags: [user-guide]
source: "docs/user/maintenance.md#git"
bw-part_of:
  - "[[user-maintenance]]"
---
# Git

When the brain is a git work tree, each run commits exactly the files it
touched, with your identity and hooks and `Brain-Run:` / `Brain-Agent:`
trailers. brain-wiki never pushes, pulls, or switches branches. Episodes
are committed with the run that consolidates them.

If git refuses a run's commit (for example, the pre-commit hook from
`brain lint --install-hook` finds an error), the run is still applied and
the command warns on stderr with git's message. The files stay staged: fix
what git reported, then `git commit`.
