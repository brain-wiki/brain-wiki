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

Git keeps the history of direct edits. `brain commit` commits changed files, fetches and rebases onto `origin`, and with `--push` pushes. `brain schedule add commit` runs it from crontab on Linux or a LaunchAgent on macOS. There is one job per brain, keyed by the brain's id, and the OS scheduler is the only record of the jobs.

### Alternatives considered

- Run records for checked edits, restored with `brain restore`.
- Schedule settings in brain-wiki's own config.
- A sync tool that copies `.git` between machines.
