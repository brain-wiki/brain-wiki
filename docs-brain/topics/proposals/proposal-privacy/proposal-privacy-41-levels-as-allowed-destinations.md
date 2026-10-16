---
id: 01M3250V000K9TJMDZVTFJKJ24
type: proposal
title: "Levels as allowed destinations"
aliases: ["Privacy §4.1"]
source: "docs/proposal/privacy.md#41-levels-as-allowed-destinations"
---
# Levels as allowed destinations

| Destination | `open` (default) | `private` | `secret` |
|---|---|---|---|
| S1: a model reads it | Any model | Models the owner trusts (§4.3) | Local models only |
| S2: passed to tools | Any tool | Local tools; external tools after the user confirms | None |
| S3: written into outputs | Yes | Only when the user asks | Never |
| S4: transcripts and harvest | Yes | Yes; harvested episodes become `private` | The agent never reads it |
| S5: injected automatically | Yes | No; only on an explicit read | No |
| S6: exports and sync | Yes | Left out unless requested | Never |
| Consolidated by | Any agent | Trusted agents, into `private` topics only | Local models only |

Most people need only `open` and `private`. `secret` is for notes no cloud
model should see, such as finances or health, which the owner reads in an
editor.
