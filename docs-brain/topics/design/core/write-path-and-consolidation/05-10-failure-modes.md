---
id: 01M3250V007RWZW40MB8M8M2R1
type: design
title: "Failure modes (Write path and consolidation)"
aliases: ["05 §10"]
source: "docs/design/05-write-path-and-consolidation.md#10-failure-modes"
---
# Failure modes (Write path and consolidation)

| Failure | Result |
|---|---|
| Agent writes invalid frontmatter | `brain validate` reports the field, the value, and what is allowed; the agent fixes it. Nothing blocks the file: lint keeps reporting it until it is fixed. |
| Agent edits a protected file | `brain validate` on that path reports BW121; restore it from git. |
| Agent edits a note badly | Recovery is git (§5). Without git, there is no copy to restore. |
| Crash during a run | Writes are per-file atomic. On restart, a record left in `applying` is detected; `brain doctor` restores pre-images for files whose hash matches the recorded `after`, so a half-applied run is rolled back. |
| Index stale or busy | Prepare forces a fresh scan; runs verify file hashes from disk, not from the index. |
| Origin transcript missing or unreadable | `brain_read_origin` returns `not_available`; consolidation uses the episode alone. |
| Host changes its transcript format | The session reader skips what it cannot parse; harvest reports the session as unreadable. |
| `brain commit` hits a rebase conflict | The rebase is aborted, files stay as they were, exit 1 names the files; later rounds keep committing locally (§5.1). |
