---
id: 01M3250V0075253DMWV3ZYKVWH
type: threat
title: "T12: Corruption or loss by a buggy run"
aliases: ["threat T12"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T12: Corruption or loss by a buggy run

**Corruption or loss by a buggy run.**

**Mitigations:** Ops cannot delete text; strict lint before writing; atomic per-file writes; pre-images and undo; git commits per run; crash recovery via run records ([[05-10-failure-modes|05 §10]]).

**Residual risk:** —
