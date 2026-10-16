---
id: 01M3250V00D69RZ5JKGF8DR4ZN
type: design
title: "What is a run"
aliases: ["05 §7.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#71-what-is-a-run"
---
# What is a run

Every change brain-wiki itself makes to a brain goes through one
transaction, `Run` (`brainwiki.runs`), so all of them get the same
guarantees. Direct edits and episode writes are not runs.

| Kind | Made by |
|---|---|
| `consolidate` | `brain consolidate --done` / `brain_consolidate_done` |
| `lint-fix` | `brain lint --fix`, including the format 1 and 2 conversion |
| `mv` | `brain mv` |
| `import` | `brain import --into`, `brain import --overlay --phase 1` and `--phase 2` |
| `rule`, `rule-reject` | `brain rules add`, a confirmed `brain_propose_rule`, accepting or rejecting a rule proposal |
| `config` | `brain agents grant` / `revoke` |
| `undo` | `brain undo` (§8) |
