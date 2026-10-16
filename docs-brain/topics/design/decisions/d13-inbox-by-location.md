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

Pending vs consolidated episodes is encoded by location (`inbox/` vs `archive/`), not by a watermark file.

### Alternatives considered

Watermark in machine state
