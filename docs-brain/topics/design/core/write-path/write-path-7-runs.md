---
id: 01M3250V00VZ5SM6GXNNCSGBQ9
type: design
title: "Runs"
aliases: ["Write path §7"]
source: "docs/design/write-path.md#7-runs"
---
# Runs

### 7.1 What is a run

Every change brain-wiki itself makes to a brain goes through one
transaction, `Run` (`brainwiki.runs`), so all of them get the same
guarantees. Direct edits and episode writes are not runs, and neither is
saving a rule proposal.

| Kind | Made by |
|---|---|
| `consolidate` | `brain consolidate --done`, `brain_consolidate_done` |
| `lint-fix` | `brain lint --fix`, including the format 1 and 2 conversion |
| `mv` | `brain mv` |
| `import` | `brain import --into`, `brain import --overlay --phase 1` and `--phase 2` |
| `rule`, `rule-reject` | `brain rules add`, a confirmed `brain_propose_rule`, accepting or rejecting a proposal |
| `config` | `brain agents grant`, `brain agents revoke` |
| `undo` | `brain undo` (§8) |


### 7.2 Lint gate

Runs that rewrite notes in bulk (`lint --fix`, `mv`, `import --into`) pass a
check to `commit`: strict lint errors the run would introduce in the files
it touches, computed in memory before anything is written. Errors already
in a file before the run do not count, so one note a person broke by hand
does not stall every later run that touches it. A failing check raises
`invalid_ops` and writes nothing.


### 7.3 Apply

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
