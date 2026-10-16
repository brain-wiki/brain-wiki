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

**Mitigations:** brain-wiki's writers change only the lines they must; atomic per-file writes; a run never overwrites a file changed since it read it; pre-images and undo; git commits per run; crash recovery via run records ([[write-path-and-consolidation|05]]).

**Residual risk:** —
