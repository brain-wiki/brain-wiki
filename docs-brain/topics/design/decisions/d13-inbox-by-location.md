---
id: 01M3250V00F1GKJAA9KJ6KFDA6
type: decision
title: "D13: Pending episodes are known by location"
aliases: ["D13"]
source: "docs/decision/d13-inbox-by-location.md"
---
# D13: Pending episodes are known by location

Status: accepted.
Argued in: [[brain-format-9-episodes|brain format §9]].

An episode is pending while it is in `inbox/episodes/` and consolidated once it moves to `archive/episodes/`. No watermark file records which episodes are done, so the state is visible in any file browser and survives sync.

### Alternatives considered

- A watermark in machine state. It would differ between devices and be invisible in the brain.
