---
id: 01M3250V00KCQ7ST1E0DPFN1A2
type: design
title: "Triggers"
aliases: ["Write path §4.2"]
source: "docs/design/write-path.md#42-triggers"
---
# Triggers

| Trigger | How |
|---|---|
| The user asks their agent ("consolidate my brain") | The skill or the `consolidate` MCP prompt drives prepare, edits, `brain_validate`, and `brain_consolidate_done`, repeating while episodes remain |
| The user works from a terminal | `brain consolidate --prepare`, then any model or person edits notes, then `brain consolidate --done EPISODE[:PATTERN:NOTE]…` |

`--prepare` prints the guidance followed by the packet. `--json` prints the
packet alone, and `--out FILE` writes `{guidance, packet}` as JSON.

brain-wiki never consolidates on its own. Running an LLM costs money and
attention, and the user chooses when. Scheduled consolidation is a
[[proposal-episode-lifecycle|proposal]].
