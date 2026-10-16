---
id: 01M3250V0031EB619MCGX3G65V
type: design
title: "Failure modes (Config and storage)"
aliases: ["Config and storage §8"]
source: "docs/design/config-and-storage.md#8-failure-modes"
---
# Failure modes (Config and storage)

| Failure | Behavior |
|---|---|
| Config file missing | Commands that need a brain say how to set one up (`brain setup`). |
| Registered path missing (unmounted drive, moved folder) | An error with the path. `brain doctor` reports it and suggests `brain brains add NAME NEW_PATH`. |
| `brain.toml` has a different id than before | No warning. Index and state are keyed by the new id, so the brain starts with a fresh index and no undo history. |
| `brain.toml` has a newer `format` | Refused with a message to upgrade brain-wiki ([[brain-format-13-format-versioning\|brain format §13]]). |
| State directory lost | Undo history is gone; everything else works. |
| A run's git commit fails (hook, detached HEAD, merge in progress) | The run is applied. Its record keeps `git_commit: null` and the error, the CLI prints a warning, and `brain doctor` lists it. |
| `brain commit` hits a conflict, cannot reach origin, or the job names an unregistered brain | See [[write-path-5-committing-direct-edits\|write path §5]]. |
