---
id: 01M3250V00EKHC3VRWKMFTJVSE
type: design
title: "Concurrency and multiple devices"
aliases: ["05 §9"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#9-concurrency-and-multiple-devices"
---
# Concurrency and multiple devices

| Situation | Behavior |
|---|---|
| Several agents log episodes at once | Unique ULID file names; no locks needed. |
| Consolidation while agents log | New episodes are simply not in the packet. |
| Two consolidations on one device | The second waits for the write lock (bounded), then usually finds its notes stale and re-prepares. |
| Human edits a note mid-run | The hash check in §7.3 makes the run stale; nothing is overwritten. |
| Two devices consolidate the same episodes before syncing | Both runs succeed locally; after sync the notes have duplicate claims citing the same span. Lint reports BW206 and `reports/duplicates.md` lists them. Mitigation: consolidate on one device. |
| Episode already archived by another device | Skipped at selection (it is no longer pending). |
