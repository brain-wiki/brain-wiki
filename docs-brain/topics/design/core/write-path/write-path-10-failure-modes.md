---
id: 01M3250V00VVXMYX325R1FVKSB
type: design
title: "Failure modes (Write path)"
aliases: ["Write path §10"]
source: "docs/design/write-path.md#10-failure-modes"
---
# Failure modes (Write path)

| Failure | Result |
|---|---|
| Agent writes invalid frontmatter or edits a protected file | `brain validate` reports it; lint keeps reporting it until fixed. Restore from git (§2.3). |
| Crash during a run | `brain doctor` finds records left in `applying` and restores the pre-images of files whose hash matches `after`. |
| Index stale or busy | Prepare forces a fresh scan. Runs verify file hashes on disk, not in the index. |
| Origin transcript missing | `brain_read_origin` returns `not_available`; consolidation uses the episode alone. |
| Host changes its transcript format | The reader skips lines it cannot parse. Harvest skips a mostly unparsable session as unreadable. |
| `brain commit` hits a rebase conflict | The rebase is aborted and exit 1 names the files (§5.1). |
