---
id: 01M3250V00SKS20ZD17NVTWYMT
type: design
title: "`brain doctor --json`"
aliases: ["Skills and onboarding §3.4"]
source: "docs/design/skills-and-onboarding.md#34-brain-doctor---json"
---
# `brain doctor --json`

The contract the setup skill reads. Stable within a minor version.

```json
{
  "version": "0.2.0",
  "device": "laptop",
  "config": {"path": "~/.config/brain-wiki/config.toml", "exists": true},
  "cli": {"on_path": true, "path": "~/.local/bin/brain"},
  "brains": [
    {"name": "personal", "path": "~/brains/personal", "ok": true, "format": 3,
     "git": true, "id": "01J…", "pending_episodes": 7, "notes": 412, "open_proposals": 1,
     "recovered_runs": [], "uncommitted_runs": [], "default": true}
  ],
  "hosts": [
    {"id": "claude-code", "installed": true, "connected": true, "plugin": "0.2.0",
     "instructions": true, "harvest": true},
    {"id": "codex", "installed": true, "connected": false, "harvest": false}
  ],
  "sqlite": {"version": "3.53.4", "fts5": true, "trigram": true},
  "problems": [
    {"code": "host_not_connected", "severity": "info", "host": "codex",
     "message": "codex is installed but not connected.", "fix": "brain connect codex"},
    {"code": "uncommitted_edits", "severity": "info",
     "message": "brain 'personal' has 4 file(s) changed over a day ago and not committed, and no commit job",
     "fix": "brain schedule add commit --brain personal (or `brain commit`)"}
  ],
  "next_steps": ["connect codex"]
}
```

Hosts count as installed when their command is on `PATH` or their
configuration directory exists. Nothing in `doctor` contacts the network.

Commit-job problems `doctor` reports:

| Code | Severity | When |
|---|---|---|
| `schedule_unregistered` | warning | A commit job runs for a brain id that is no longer registered; the fix names `brain brains add` or `brain schedule remove commit` |
| `brain_not_synced` | warning | The brain's last `brain commit` ended `offline`, `conflict`, or `rejected`, and its last successful sync is over a day old |
| `uncommitted_edits` | info | A git brain with files changed over a day ago and not committed, and no commit job |
