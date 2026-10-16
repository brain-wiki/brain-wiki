---
id: 01M3250V00DXJEH8DSFHYTQMXN
type: guide
title: "Git"
source: "docs/user/maintenance.md#git"
---
# Git

When the brain is a git work tree, each run commits exactly the files it
touched, with your identity and hooks and `Brain-Run:` / `Brain-Agent:`
trailers. Direct edits are committed by `brain commit`, the only command
that fetches, rebases, or pushes; brain-wiki never switches branches.
Episodes are committed with the run that archives them.

If git refuses a run's commit (for example, the pre-commit hook from
`brain lint --install-hook` finds an error), the run is still applied and
the command warns on stderr with git's message. The files stay staged: fix
what git reported, then `git commit`.
