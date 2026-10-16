---
id: 01M3250V00XEQTVNF764G1W1QA
type: guide
title: "Troubleshooting"
source: "docs/user/reference.md#troubleshooting"
---
# Troubleshooting

| Symptom | Try |
|---|---|
| An agent says brain-wiki is not configured | `brain doctor`; then `brain init` or `brain brains add` |
| Search misses a note you just edited | Wait a second (freshness checks run at most once per second), or `brain index --rebuild` |
| A run was interrupted | `brain doctor` rolls it back |
| A git commit failed after a run | The files changed anyway; `brain doctor` lists the run; commit by hand |
| `brain commit` reports a conflict | Run `git pull --rebase` in the brain, resolve, and commit; later runs commit locally until then |
| Lint reports BW117 | The note is from brain-wiki 0.1: `brain lint --fix --dry-run`, then `brain lint --fix` |
