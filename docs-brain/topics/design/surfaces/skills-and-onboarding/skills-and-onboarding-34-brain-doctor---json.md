---
id: 01M3250V00SKS20ZD17NVTWYMT
type: design
title: "`brain doctor --json`"
aliases: ["Skills and onboarding §3.4"]
source: "docs/design/skills-and-onboarding.md#34-brain-doctor---json"
---
# `brain doctor --json`

`brain doctor --json` is what the setup skill reads. Its shape is stable
within a minor version.

```json
{
  "version": "0.2.0",
  "device": "laptop",
  "config": {"path": "/home/ada/.config/brain-wiki/config.toml", "exists": true},
  "cli": {"on_path": true, "path": "/home/ada/.local/bin/brain"},
  "brains": [
    {"name": "personal", "path": "/home/ada/brains/personal", "ok": true, "format": 3,
     "git": true, "id": "01J…", "pending_episodes": 7, "open_proposals": 1, "notes": 412,
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
     "message": "codex is installed but not connected.", "fix": "brain connect codex"}
  ],
  "next_steps": ["connect codex"]
}
```

- A brain that cannot be opened has `ok: false` and an `error` instead of
  the counts.
- `hosts` lists `claude-code`, `codex`, `antigravity`, `openclaw`, and
  `cursor`. A host counts as installed when its command (`claude`,
  `codex`, `agy`, `openclaw`, `cursor-agent` or `cursor`) is on `PATH` or
  its folder exists (`~/.claude`, `~/.codex`, `~/.gemini/antigravity` or
  `~/.gemini/antigravity-cli`, `~/.openclaw`, `~/.cursor`).
- `connected` means `brain connect` connected the host for the user
  scope. A project-scope connection, or a plugin installed from a
  marketplace, does not count.
- `plugin` is the brain-wiki version that connected the host.
  `instructions` is false when a file `connect` wrote no longer holds the
  block.
- `doctor` contacts no network. Its only write rolls back runs a crash
  left half-applied ([[write-path-10-failure-modes|write path §10]]).

Problems `doctor` reports:

| Code | Severity | When |
|---|---|---|
| `brain_unreadable` | error | A registered brain cannot be opened |
| `no_fts5` | error | Python's SQLite lacks FTS5, so search cannot work |
| `no_brain` | warning | No brain is registered |
| `no_default_brain` | warning | No default brain is set, or it is not registered |
| `stale_brain_reference` | warning | The user config names a brain that is not registered |
| `run_rolled_back` | warning | An interrupted run was rolled back |
| `instructions_missing` | warning | A connected host's instruction file lost the block |
| `schedule_unregistered` | warning | A commit job runs for a brain id that is no longer registered |
| `brain_not_synced` | warning | The last `brain commit` ended `offline`, `conflict`, or `rejected`, and the last successful sync is over a day old or never happened |
| `run_not_committed` | info | A run was applied but its git commit failed |
| `uncommitted_edits` | info | A git brain has files changed over a day ago and not committed, and no commit job |
| `host_not_connected` | info | A host is installed but not connected, and a brain exists |

Each problem has a `message`, and most have a `fix` command.
