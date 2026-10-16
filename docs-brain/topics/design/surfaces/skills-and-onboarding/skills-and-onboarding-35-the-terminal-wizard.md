---
id: 01M3250V00HPY1K85R416CVDVB
type: design
title: "The terminal wizard"
aliases: ["Skills and onboarding §3.5"]
source: "docs/design/skills-and-onboarding.md#35-the-terminal-wizard"
---
# The terminal wizard

`brain setup` runs the same flow in a terminal, calling the same code as
the subcommands. Without a terminal it prints that an agent should run
`brain setup --guide`, and exits 2.

It differs from the skill:

- It skips install, the format conversion, host limits, the harvest dry
  run, and backfill.
- To create a brain it asks new or adopt, a folder, and a name. Adopting
  shows the overlay report and applies phase 0 after a yes. A new brain
  gets git after a yes (default yes).
- It offers the commit job for a git brain with none yet, every 15
  minutes, and asks about pushing only when the brain has an `origin`
  remote. It installs the job after the yes without showing it first.
  Without a scheduler, it prints the crontab line to add.
- It asks for each installed, unconnected host (default no), shows the
  `connect` plan, and applies it for the user scope after a yes.
- It offers `propose_rules` per connected host and shows the `brain.toml`
  diff before writing.
- It offers harvest for each connected host that has a session reader,
  grants `harvest` with a diff, and with one brain and no routes offers the
  `~/**` route.
- Its verify step writes a test episode, searches for it, and deletes it.
- It ends with the summary, each part with its undo command, and next
  steps.
