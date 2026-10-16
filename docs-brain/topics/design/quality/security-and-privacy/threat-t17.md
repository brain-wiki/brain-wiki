---
id: 01M3250V00NQN6MJNSBCGS2XX6
type: threat
title: "T17: A direct agent edit damages a note"
aliases: ["threat T17"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T17: A direct agent edit damages a note

**A direct agent edit damages a note.** A manipulated or careless agent rewrites a note or drops facts. Direct edits are the main write path in format 3.

**Mitigations:** Only profiles with `edit` are told they may edit (agents have it by default; a profile can drop it), and brain-wiki's own writers enforce it. `brain validate` checks frontmatter and reports protected files (BW121). Recovery is git: `brain commit` snapshots direct edits, by hand or from a job `brain schedule` installs, and setup recommends git and offers the job ([[05-23-direct-edits|05 §2.3]], [[03-62-v01-local-folder-with-optional-git|03 §6.2]]).

**Residual risk:** There is no loss guard: nothing blocks deleting or rewording facts, because files are the user's. Edits made since the last snapshot have no history yet, and a brain without git has no recovery for direct edits.
