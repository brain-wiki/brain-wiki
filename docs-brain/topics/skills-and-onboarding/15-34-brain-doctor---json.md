---
id: 01M3250V001WXZTEB3GH00BGBM
type: design
title: "`brain doctor --json`"
aliases: ["15 §3.4"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#34-brain-doctor---json"
bw-part_of:
  - "[[15-3-onboarding]]"
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
    {"name": "personal", "path": "~/brains/personal", "ok": true, "format": 2,
     "git": true, "id": "01J…", "pending_episodes": 7, "notes": 412, "open_proposals": 1,
     "recovered_runs": [], "uncommitted_runs": [], "default": true}
  ],
  "hosts": [
    {"id": "claude-code", "installed": true, "connected": true, "plugin": "0.1.0",
     "instructions": true, "harvest": true},
    {"id": "codex", "installed": true, "connected": false, "harvest": false}
  ],
  "sqlite": {"version": "3.53.4", "fts5": true, "trigram": true},
  "problems": [
    {"code": "host_not_connected", "severity": "info", "host": "codex",
     "message": "codex is installed but not connected.", "fix": "brain connect codex"}
  ],
  "next_steps": ["connect codex"]
}
```

Hosts count as installed when their command is on `PATH` or their
configuration directory exists. Nothing in `doctor` contacts the network.
