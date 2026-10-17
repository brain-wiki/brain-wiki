---
id: 01M3250V000H9PHAH6N4836ACJ
type: proposal
title: "Telling the user what happened"
aliases: ["Episodes: quick capture, per-agent consolidation §5.4"]
source: "docs/proposal/episode-lifecycle.md#54-telling-the-user-what-happened"
---
# Telling the user what happened

- Orientation for the owner shows the last consolidation per host, and what is pending per agent: "claude-code, last night: 7 episodes; 2 records, 1 playbook, 3 filed, 1 skipped. Pending: claude-code 4, cursor 12 (oldest 9 days)."
- `reports/consolidation.md` lists recent runs with the episodes, their patterns, the notes they changed, and failures.
- `brain doctor` reports a scheduled run that failed, and pending episodes per agent with the oldest one's age.
- Review is the git diff of the run's snapshot commit. `brain undo` of the `--done` run returns the episodes to the inbox; note edits are restored from git.
