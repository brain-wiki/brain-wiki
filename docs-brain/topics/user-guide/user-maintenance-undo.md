---
id: 01M3250V00ED098SDTQ806G0ZE
type: guide
title: "Undo (Maintenance)"
tags: [user-guide]
source: "docs/user/maintenance.md#undo"
---
# Undo (Maintenance)

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
