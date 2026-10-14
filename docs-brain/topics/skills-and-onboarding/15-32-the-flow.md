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
detect ─► install ─► brain ─► connect ─► privacy ─► harvest ─► verify ─► summary
  │          │          │         │          │           │          │
doctor   CLI on PATH  create or  other     defaults or  opt-in per test episode,
--json   (uv tool     adopt      agents    separate     host, with search,
         install)     (import)   found     brains, host a dry run  orientation
                                 on disk   limits
```

| Step | The agent | Asks the user | Writes |
|---|---|---|---|
| Detect | Runs `brain doctor --json` (§3.4); if the CLI is missing, notes it | — | nothing |
| Install | Proposes `uv tool install brain-wiki` (or `pipx`); explains that marketplace installs can also run through `uvx` without installing | "Install the brain-wiki command?" | the tool install |
| Brain | If none exists: proposes a location outside any code repository (default `~/brains/personal`), a name, and git (recommended). If the user has a vault: runs `brain import <path> --overlay --dry-run`, summarizes the report, applies phase 0, and mentions later phases | Location, name, git; which existing vault, if any | `brain init` or import phase 0; user config |
| Connect | Lists agents `doctor` found installed and not yet connected; runs `brain connect <host> --dry-run` for each and shows the change | Which agents to connect | each host's config, with backups |
| Privacy | Explains in three sentences: one brain is fine to start; every connected agent reads all of it; separate brains for separate lives (work and personal). Offers a second brain and host limits | Keep defaults, or set up a second brain / limits | `brain.toml`, user config |
| Harvest | Explains in plain terms what is read and what may be sent to a model; runs a dry run and shows how many past sessions exist and an estimated cost of backfill | Per host: harvest on/off, backfill now/later/never | user config; episodes if backfill runs |
| Verify | Logs a test episode, searches for it, and shows orientation; the test episode stays in the inbox, and consolidation skips it as holding nothing durable | — | one episode |
| Summary | Lists everything configured, where it lives, and how to undo each part (`brain connect --uninstall`, `brain brains remove`) | — | nothing |
