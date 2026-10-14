---
id: 01M3250V00XEQTVNF764G1W1QA
type: guide
title: "Troubleshooting"
tags: [user-guide]
source: "docs/user/reference.md#troubleshooting"
bw-part_of:
  - "[[user-reference]]"
---
# Troubleshooting

| Symptom | Try |
|---|---|
| An agent says brain-wiki is not configured | `brain doctor`; then `brain init` or `brain brains add` |
| Search misses a note you just edited | Wait a second (freshness checks run at most once per second), or `brain index --rebuild` |
| A run was interrupted | `brain doctor` rolls it back |
| A git commit failed after a run | The files changed anyway; `brain doctor` lists the run; commit by hand |
