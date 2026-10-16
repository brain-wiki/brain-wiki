---
id: 01M3250V00BH7PC91942XS1XF6
type: threat
title: "T10: Command injection"
aliases: ["threat T10"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T10: Command injection

**Command injection.** Transcript or note content reaches a shell.

**Mitigations:** Nothing read from a brain or a session is ever interpolated into a command line; headless presets pass the prompt on stdin; no `shell=True` anywhere.
