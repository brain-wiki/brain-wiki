---
id: 01M3250V00J3V9FFNNDFKRJNQ2
type: threat
title: "T17: A direct agent edit damages a note"
aliases: ["threat T17"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T17: A direct agent edit damages a note

**A direct agent edit damages a note.** A manipulated or careless agent rewrites a note or drops facts. Direct edits are the main write path in format 3.

**Mitigations:** Only profiles with `edit` are told they may edit (agents have it by default; a profile can drop it), and brain-wiki's own writers enforce it. `brain validate` checks frontmatter and reports protected files (BW121). Recovery is git: `brain commit` snapshots direct edits, by hand or from a job `brain schedule` installs, and setup recommends git and offers the job ([[write-path-23-direct-edits|write path §2.3]], [[config-and-storage-62-v01-local-folder-with-optional-git|config and storage §6.2]]).

**Residual risk:** There is no loss guard: nothing blocks deleting or rewording facts, because files are the user's. Edits made since the last snapshot have no history yet, and a brain without git has no recovery for direct edits.
