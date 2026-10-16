---
id: 01M3250V00KAB7JABCBTY326D3
type: threat
title: "T12: Corruption or loss by a buggy run"
aliases: ["threat T12"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T12: Corruption or loss by a buggy run

**Corruption or loss by a buggy run.**

**Mitigations:** brain-wiki's writers change only the lines they must; atomic per-file writes; a run never overwrites a file changed since it read it; pre-images and undo; git commits per run; crash recovery via run records ([[write-path|write path]]).
