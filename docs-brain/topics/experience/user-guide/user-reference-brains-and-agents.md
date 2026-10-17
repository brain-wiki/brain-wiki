---
id: 01M3250V00XEWJE16B5MBX426V
type: guide
title: "Brains and agents"
source: "docs/user/reference.md#brains-and-agents"
---
# Brains and agents

- Bare `brain brains` lists the brains you may use, or that `--as HOST` may
  use, with what each holds.
- Brain names use lowercase letters, digits, and hyphens.
- `brain brains rename` also renames the brain in the default, in
  `[hosts.*]`, in harvest routes, and in its commit job.
- `brain brains remove` leaves the folder alone. It drops the name from the
  default, host defaults, host brain limits, and harvest routes, and deletes
  the brain's commit job. A host whose limit listed only this brain keeps an
  empty list, so it sees no brain. `--purge-state` also deletes the brain's
  index and run history on this machine.
- `brain agents grant` and `revoke` take `edit`, `propose_rules`,
  `harvest`, or `read_origin`, for a host id or `default`. Logging episodes
  needs no capability.
  Each change is an undoable run. An unknown host id gets a warning.
