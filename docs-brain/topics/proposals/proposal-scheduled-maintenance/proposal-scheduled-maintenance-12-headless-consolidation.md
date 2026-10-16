---
id: 01M3250V00ZM0689CSRC7CD8PC
type: proposal
title: "Headless consolidation"
aliases: ["Scheduled maintenance §1.2"]
source: "docs/proposal/scheduled-maintenance.md#12-headless-consolidation"
---
# Headless consolidation

A `command` backend ran consolidation without an agent session: one
subprocess per packet, through the same presets `brain harvest --apply`
uses ([[agent-integrations-7-headless-presets|agent integrations §7]]):

```toml
[consolidate]
backend   = "command"
command   = "claude-code"         # preset name, or a full argv list
model     = ""
timeout_s = 600
device    = "laptop"              # the one device that consolidates this brain
```

It rendered instructions plus the packet, ran the preset in an empty
directory with tools disabled, extracted the first JSON object with an `ops`
array, and retried once with the validator's errors. Routines checked
`[consolidate] device` through orientation and stopped on other devices.
