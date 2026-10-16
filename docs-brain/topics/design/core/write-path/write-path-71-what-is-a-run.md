---
id: 01M3250V0061BCQX8J4FDSCH3E
type: design
title: "What is a run"
aliases: ["Write path §7.1"]
source: "docs/design/write-path.md#71-what-is-a-run"
---
# What is a run

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
