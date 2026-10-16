---
id: 01M3250V00PW1ZE4R63KBM0HEP
type: decision
title: "D35: Git is the history of direct edits"
aliases: ["D35"]
source: "docs/decision/d35-git-history.md"
---
# D35: Git is the history of direct edits

Status: accepted.
Argued in: [[write-path|write path]], [[config-and-storage|config and storage]].

Git is the history of direct edits: `brain commit` snapshots changed files, fetches and rebases onto origin, and optionally pushes; `brain schedule` runs it from crontab or a LaunchAgent, one job per brain, keyed by brain id, with the OS scheduler as the only record.

### Alternatives considered

Run records for checked edits and `brain restore`; schedule settings in brain-wiki's config; a sync tool copying `.git` between machines
