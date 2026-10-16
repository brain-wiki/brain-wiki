---
id: 01M3250V00H4J077K4ZFD40JHF
type: threat
title: "T10: Command injection"
aliases: ["threat T10"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T10: Command injection

**Command injection.** Transcript or note content reaches a shell.

**Mitigations:** Nothing read from a brain or a session is ever interpolated into a command line; headless presets pass the prompt on stdin; no `shell=True` anywhere.
