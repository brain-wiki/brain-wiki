---
id: 01M3250V00VCVHF0RQ9JVPABHY
type: design
title: "Review (Write path and consolidation)"
aliases: ["05 §7.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#72-review"
---
# Review (Write path and consolidation)

A run routed to review writes `inbox/proposals/<run>.md`: a human-readable
summary, the rendered diff, warnings, and the ops as a fenced JSON block.
Nothing else changes; the episodes stay pending (and are excluded from new
packets while a proposal references them).

- `brain review list | show <id> | accept <id> | reject <id>`, the one queue
  for consolidation and edit proposals (`run-…`) and rule proposals (§6);
  `list` marks each proposal's kind. Review is CLI-only: there are no MCP review tools, so an agent can point the user
  at a proposal but cannot accept it (MCP review tools are in the
  [[proposal-readme-backlog|backlog]]).
- Accept re-validates the stored ops against the current brain (notes may
  have changed) and applies them as a normal run. The proposal is a file
  anything with access to the brain can write, so the packet embedded in it
  is never trusted: accept rebuilds the packet from the current brain with
  the code `prepare` uses, keeping only which handle names which note,
  claim, and episode (from the packet saved in `<state>/runs/<run>/` when
  this device prepared the run, else from the proposal). Every note must be
  a note or hub outside `rules.md`, `log.md`, `brain.toml`, `AGENTS.md`,
  `inbox/`, `archive/`, and `reports/`, at the path and id the proposal
  names; every episode a pending one whose archive target is its computed
  archive location. A proposal that names anything else is refused with a
  `format` error (exit 1) and nothing is written. Hashes, line ranges,
  provenance (`origin`, `inputs`), and topic review policies come from the
  files. A note, claim, or episode the ops use that has changed or gone
  makes the accept stale (exit 4): reject the proposal and consolidate
  again.
- `show` prints what accepting would do, computed the same way: the review
  reasons, one line per op with handles resolved to paths, and the diff
  against the brain as it is now (or why accepting would fail). It never
  prints the packet.
- Proposals are files in the brain, so they sync to the user's other
  devices and can be reviewed in Obsidian.
