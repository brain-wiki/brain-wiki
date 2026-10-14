---
id: 01M3250V00K6YCCZGBPC502WTJ
type: threat
title: "T2: Poisoned knowledge"
aliases: ["threat T2"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
---
# T2: Poisoned knowledge

**Poisoned knowledge.** False facts consolidated into notes.

**Mitigations:** Claims carry provenance, including their inputs; claims with external or unknown inputs read as `[unverified]`. Optional review routing for sources with external inputs (`review_external`). Supersession keeps history; undo restores. Instructions tell the model to treat episode text as data.

**Residual risk:** A plausible false fact from a source with external inputs can become a claim marked unverified. That is a knowledge-quality risk, not a control risk.
