---
id: 01M3250V00G64VX3J6JTZMCKCJ
type: design
title: "The flow"
aliases: ["15 §3.2"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#32-the-flow"
bw-part_of:
  - "[[15-3-onboarding]]"
---
# The flow

```
detect ─► install ─► brain ─► connect ─► permissions ─► harvest ─► verify ─► summary
  │          │          │         │            │             │          │
doctor   CLI on PATH  create or  other     which brains,   opt-in per test episode,
--json   (uv tool     adopt      agents    what each       host, with search,
         install)     (import)   found     agent may do    routes, a  orientation
                                 on disk                   dry run
```

| Step | The agent | Asks the user | Writes |
|---|---|---|---|
| Detect | Runs `brain doctor --json` (§3.4); if the CLI is missing, notes it | — | nothing |
| Install | Proposes `uv tool install brain-wiki` (or `pipx`); explains that marketplace installs can also run through `uvx` without installing | "Install the brain-wiki command?" | the tool install |
| Brain | If none exists: explains what a brain is and suggests a location outside any code repository (default `~/brains/personal`), a name, and git (recommended: every change is a commit, the brain can be pushed to a private remote); the user decides. If the user has a vault: runs `brain import <path> --overlay --dry-run`, summarizes the report, applies phase 0, and mentions later phases | Location, name, git; which existing vault, if any | `brain init` (with `--git`, a first commit) or import phase 0; user config |
| Connect | Lists agents `doctor` found installed and not yet connected; runs `brain connect <host> --dry-run` for each and shows the change | Which agents to connect | each host's config, with backups |
| Permissions | Which brains: one brain is fine to start; every connected agent reads all of it; separate brains for separate lives (work and personal). What each agent may do: logging and checked edits are on by default; `consolidate` and `propose_rules` are granted per app | Keep defaults, or set up a second brain / host limits; which apps may consolidate or propose rules | `brain.toml` (`[agents.<host>]`), user config |
| Harvest | Explains in plain terms what is read and what may be sent to a model; runs a dry run and shows how many past sessions exist and an estimated cost of backfill; explains routing and, with one brain, offers a route for every folder under the home folder | Per host: harvest on/off, backfill now/later/never; the route | user config; episodes if backfill runs |
| Verify | Logs a test episode, searches for it, and shows orientation; the test episode stays in the inbox, and consolidation skips it as holding nothing durable | — | one episode |
| Summary | Lists everything configured, where it lives, and how to undo each part (`brain connect --uninstall`, `brain brains remove`, removing an `[agents.<host>]` table) | — | nothing |
