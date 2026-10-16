---
id: 01M3250V00ZM0689CSRC7CD8PC
type: proposal
title: "Headless consolidation"
aliases: ["Scheduled maintenance §1.2"]
source: "docs/proposal/scheduled-maintenance.md#12-headless-consolidation"
---
# Headless consolidation

A `command` backend ran consolidation without an agent session: one
subprocess per packet, through the presets `brain harvest --apply` uses
([[agent-integrations-7-headless-presets|agent integrations §7]]).

```toml
[consolidate]
backend   = "command"
command   = "claude-code"         # preset name, or a full argv list
model     = ""
timeout_s = 600
device    = "laptop"              # the one device that consolidates this brain
```

It ran the preset in an empty folder with tools disabled and parsed the
reply as JSON operations, retrying once with the validator's errors.
Routines read `[consolidate] device` from orientation and stopped on other
devices. Consolidation is now direct edits by an agent
([[d34-direct-edits|D34]]), so this backend cannot return as
it was.
