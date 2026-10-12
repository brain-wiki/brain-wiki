---
id: 01M3250V00KBD5Q07M1MMBPGNF
type: threat
title: "T19: A direct agent edit damages a note"
aliases: ["threat T19"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T19: A direct agent edit damages a note

**A direct agent edit damages a note.** A manipulated or careless agent rewrites a note, drops claims, or lowers its privacy.

**Mitigations:** Only profiles with `edit`, and only in topics whose `agent_edits` allows it; `brain check` refuses deleted or reworded claims (they must be superseded), lowered privacy, protected files, and large deletions; every recorded edit is a run with an undo point and a git commit; claims an agent adds are marked unverified ([[05-23-checked-agent-edits|05 §2.3]]).

**Residual risk:** An agent can skip `brain check`: the change then shows as a pending edit with its diff until it is adopted or restored, but nothing blocks the write itself, because files are the user's.

## Relations
- part_of [[10-3-threats-and-mitigations]]
- related_to [[05-23-checked-agent-edits]]
