---
id: 01M3250V005HEY5EVHXW13ZM2W
type: design
title: "Apply"
aliases: ["05 §7.3"]
source: "docs/design/05-write-path-and-consolidation.md#73-apply"
---
# Apply

1. Take the brain's write lock (`<state>/locks/<brain-key>.lock`, an OS
   advisory lock held for the duration of the apply; waits up to 30
   seconds, then `busy`).
2. Check that every file the run read still has the content it read. A file
   edited since (by an agent, a person, or a sync tool) makes the run
   `stale`; nothing is written.
3. Run the lint gate (§7.2), if any.
4. Stage the run's entry at the end of `log.md`.
5. Save a pre-image of every file the run changes and the run record with
   status `applying`.
6. Write each file atomically (temporary file, `fsync`, rename); moves keep
   the relative path. A failure rolls back what the run wrote and marks the
   record `failed`.
7. Raise `brain.toml`'s `format` when the run wrote notes into a brain that
   declares an older one (one-way; [[02-13-format-versioning|02 §13]]).
8. Update the index (write-through) and mark the record `applied`.
9. If the brain is a git work tree and `[git] mode = "auto"`, stage exactly
   the files the run touched (plus `brain.toml` when step 7 changed it) and
   commit, e.g. `brain: consolidate 6 episodes` with trailers
   `Brain-Run: run-…` and `Brain-Agent: claude-code` (`owner` from the
   CLI), using the user's git identity and hooks. Never push. A refused
   commit leaves the run applied and its files staged; the record keeps
   git's error and `brain doctor` lists it.

Run records older than the retention window are pruned after each run
(§8).
