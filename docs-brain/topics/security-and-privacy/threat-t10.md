---
id: 01M3250V00BH7PC91942XS1XF6
type: threat
title: "T10: Hook command injection"
aliases: ["threat T10"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T10: Hook command injection

**Hook command injection.** Transcript content reaches a shell.

**Mitigations:** Hooks are invoked as `brain hook <host> <event>` with JSON on stdin; nothing from the payload is ever interpolated into a command line; no `shell=True` anywhere.

**Residual risk:** —

## Relations
- part_of [[10-3-threats-and-mitigations]]
