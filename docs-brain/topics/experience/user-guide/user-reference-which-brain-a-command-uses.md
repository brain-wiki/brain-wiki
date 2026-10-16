---
id: 01M3250V000HXP7T4MZX6B8KDC
type: guide
title: "Which brain a command uses"
source: "docs/user/reference.md#which-brain-a-command-uses"
---
# Which brain a command uses

A command that needs one brain takes the first of these that is set:

1. `--brain NAME|PATH`.
2. The `BRAIN_WIKI_BRAIN` environment variable.
3. A `.brain-wiki.toml` with `brain = "NAME"` in the current folder or above
   it.
4. The agent app's `brain` in `[hosts.<host>]` of the user config.
5. The default brain.
6. The brain the current folder is inside.

An agent app limited with `brain brains limit` is refused any other brain.
