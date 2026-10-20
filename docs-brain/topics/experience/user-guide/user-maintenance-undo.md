---
id: 01M3250V00ED098SDTQ806G0ZE
type: guide
title: "Undo (Maintenance)"
source: "docs/user/maintenance.md#undo"
---
# Undo (Maintenance)

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
