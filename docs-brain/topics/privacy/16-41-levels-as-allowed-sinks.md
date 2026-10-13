---
id: 01M3250V00G8EXMZB3M2VC5PVG
type: design
title: "Levels as allowed sinks"
aliases: ["16 §4.1"]
tags: [privacy]
source: "docs/design/16-privacy.md#41-levels-as-allowed-sinks"
bw-part_of:
  - "[[16-4-draft-model]]"
---
# Levels as allowed sinks

| Sink | `open` (default) | `private` | `secret` |
|---|---|---|---|
| S1 Model reads it | any model | models the owner trusts (§4.3) | local models only |
| S2 Passed to tools | any tool | local tools; external tools need the user's confirmation | none |
| S3 Written into outputs | yes | only when the user asks | never |
| S4 Host transcripts and harvest | yes | yes; harvested episodes inherit `private` | the agent never reads it, so nothing reaches a transcript |
| S5 Injected automatically | yes | no; only on an explicit read | no |
| S6 Exports and sync | yes | excluded unless requested | never |
| Consolidated by | any backend | trusted backends, into `private` topics only | local backend only |

Three levels keep the common case simple: most people need only `open` and
`private`. `secret` is for notes no cloud model should see (finances,
health), which the owner reads in an editor.
