---
id: 01M3250V00DVYXDD0EHM6MY86A
type: threat
title: "T2: Poisoned knowledge"
aliases: ["threat T2"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T2: Poisoned knowledge

Poisoned knowledge. False facts written into notes, directly or while consolidating.

**Mitigations:** Notes have no per-fact provenance. A note may cite its sources in `bw-sources`, and orientation and the consolidation guidance ask agents to cite each episode they fold in. Episodes keep their `inputs`, and the consolidation packet marks episodes with external or unknown inputs as untrusted. The guidance tells the model to treat episode text as data. Git shows what changed and when.

**Residual risk:** A false fact an agent writes looks like one the user wrote. That is a knowledge-quality risk, not a control risk, because it never becomes a rule.
