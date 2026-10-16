---
id: 01M3250V00K6YCCZGBPC502WTJ
type: threat
title: "T2: Poisoned knowledge"
aliases: ["threat T2"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T2: Poisoned knowledge

**Poisoned knowledge.** False facts written into notes, directly or while consolidating.

**Mitigations:** Weaker than in format 2: there is no per-fact provenance and no `[unverified]` marking. A note may cite where its facts came from in `bw-sources`; orientation lists the field to agents that may edit, and the consolidation guidance asks them to cite each episode they fold in. Episodes keep their `inputs`, and the consolidation packet marks episodes with external or unknown inputs as untrusted. Git history shows what changed and when. Instructions tell the model to treat episode text as data.

**Residual risk:** A false fact an agent writes directly looks like one the user wrote. That is a knowledge-quality risk, not a control risk: it never becomes a rule.
