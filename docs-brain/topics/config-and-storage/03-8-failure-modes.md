---
id: 01M3250V00QJY6NKJK6Q8BKQR5
type: design
title: "Failure modes (Config and storage)"
aliases: ["03 §8"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#8-failure-modes"
---
# Failure modes (Config and storage)

| Failure | Behavior |
|---|---|
| Config file missing | Commands that need a brain explain how to create or register one. |
| Registered path does not exist (unmounted drive, moved folder) | Clear error with the path; `brain brains add` re-points it. |
| Path exists but `brain.toml` has a different id than before | No warning; index and state are keyed by the new id, so the brain starts with a fresh index and no undo history. |
| `brain.toml` has a newer `format` | Refused with a message to upgrade brain-wiki ([[02-13-format-versioning\|02 §13]]). |
| State directory lost | Undo history gone; everything else works. |
| Git commit fails (hook rejects, detached HEAD, merge in progress) | The write itself already succeeded; the run is recorded with `git_commit: null` and the error; `brain doctor` lists uncommitted runs. |
