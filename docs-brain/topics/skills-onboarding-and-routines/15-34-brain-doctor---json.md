---
id: 01M3250V00NKR3HC0A1T33SHMT
type: design
title: "`brain doctor --json`"
aliases: ["15 §3.4"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#34-brain-doctor---json"
---
# `brain doctor --json`

The contract the setup skill reads. Stable within a minor version.

```json
{
  "version": "0.1.0",
  "device": "laptop",
  "config": {"path": "~/.config/brain-wiki/config.toml", "exists": true},
  "cli": {"on_path": true, "path": "~/.local/bin/brain"},
  "brains": [
    {"name": "personal", "path": "~/brains/personal", "default": true, "ok": true,
     "format": 1, "git": true, "notes": 412, "pending_episodes": 7, "open_proposals": 1}
  ],
  "hosts": [
    {"id": "claude-code", "installed": true, "connected": true, "plugin": "0.1.0",
     "mcp_ok": true, "capture": false, "harvest": true, "routines": ["brain-maintenance"]},
    {"id": "codex", "installed": true, "connected": false}
  ],
  "sqlite": {"version": "3.53.4", "fts5": true, "trigram": true},
  "problems": [
    {"code": "host_not_connected", "host": "codex",
     "message": "Codex is installed but not connected.", "fix": "brain connect codex"}
  ],
  "next_steps": ["connect codex", "schedule brain-harvest on codex"]
}
```

Hosts count as installed when their command is on `PATH` or their
configuration directory exists. Nothing in `doctor` contacts the network.

## Relations
- part_of [[15-3-onboarding]]
