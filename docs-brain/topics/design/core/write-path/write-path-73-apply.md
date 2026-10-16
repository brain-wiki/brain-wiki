---
id: 01M3250V00XZJBZXZVTEQKNHD2
type: design
title: "Apply"
aliases: ["Write path §7.3"]
source: "docs/design/write-path.md#73-apply"
---
# Apply

1. Take the brain's write lock (`<state>/locks/<brain-key>.lock`, an OS
   advisory lock held for the whole apply). Wait up to 30 seconds, then
   fail with `busy`.
2. Check that every file the run read still has the content it read. A
   file edited since, by an agent, a person, or a sync tool, makes the run
   `stale`, and nothing is written.
3. Run the lint gate (§7.2), if any.
4. Stage the run's entry at the end of `log.md`.
5. Save a pre-image of every file the run changes, and the run record with
   status `applying`.
6. Write each file atomically (temporary file, `fsync`, rename). Moves keep
   the relative path. A failure rolls back what the run wrote and marks the
   record `failed`.
7. Raise `brain.toml`'s `format` when the run wrote notes into a brain that
   declares an older one. This is one-way
   ([[brain-format-13-format-versioning|brain format §13]]).
8. Update the index and mark the record `applied`.
9. If the brain is a git work tree and `[git] mode` is `"auto"` (the
   default) or `"on"`, stage exactly the files the run touched, plus
   `brain.toml` when step 7 changed it, and commit. The subject names the
   operation, for example `brain: consolidate 6 episodes`, with trailers
   `Brain-Run: run-…` and `Brain-Agent: claude-code` (`owner` from the
   CLI). The commit uses the user's git identity and hooks, and never
   pushes. A refused commit leaves the run applied and its files staged.
   The record keeps git's error, the CLI prints it, and `brain doctor`
   lists it.

Run records outside the retention window are pruned after each run (§8).
