---
id: 01M3250V00X03S8DA9XCESPJRV
type: threat
title: "T18: Unattended routines act without the user watching"
aliases: ["threat T18"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T18: Unattended routines act without the user watching

**Unattended routines act without the user watching.**

**Mitigations:** Routines use only brain-wiki tools the user pre-approved for that task; they never propose rules (that tool always needs a person); consolidation results that trip a check go to review; every run is logged, committed, and undoable; one consolidation device.

**Residual risk:** A pre-approved routine can still consolidate tainted episodes into claims marked unverified, the same as an interactive run.

## Relations
- part_of [[10-3-threats-and-mitigations]]
