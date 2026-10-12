---
id: 01M3250V005HEY5EVHXW13ZM2W
type: design
title: "Apply"
aliases: ["05 §7.3"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#73-apply"
---
# Apply

1. Take the brain's write lock (`<state>/locks/<brain-id>.lock`, an OS
   advisory lock held for the duration of the apply).
2. Check that every note the ops touch still has the hash recorded in the
   packet. A note edited since then makes the run stale: the agent backend
   gets a `stale` error and re-prepares; the command backend re-prepares
   once.
3. Compute new contents for every touched file in memory; keep pre-images.
4. Lint the new contents (V12).
5. Write each file atomically (temporary file, `fsync`, rename); move
   episodes to `archive/` with the same relative path; regenerate hub
   `## Notes` lines for created notes and the `AGENTS.md` block; append to
   `log.md`.
6. Update the index (write-through), record the run (§8), release the lock.
7. If the brain is a git work tree and `git.mode = "auto"`, stage exactly
   the files the run touched and commit:
   `brain: consolidate 6 episodes into 3 notes` with trailers
   `Brain-Run: run-…` and `Brain-Agent: claude-code`, using the user's git
   identity. Never push.

## Relations
- part_of [[05-7-validation-and-apply]]
