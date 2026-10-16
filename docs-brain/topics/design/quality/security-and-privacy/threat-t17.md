---
id: 01M3250V00J3V9FFNNDFKRJNQ2
type: threat
title: "T17: A direct agent edit damages a note"
aliases: ["threat T17"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T17: A direct agent edit damages a note

A direct agent edit damages a note. A manipulated or careless agent rewrites a note or drops facts.

**Mitigations:** Only profiles with `edit` are told they may edit. Agents have it by default, a profile can drop it, and brain-wiki's own writers enforce it. `brain validate` checks frontmatter and reports protected files (BW121). Recovery is git: `brain commit` snapshots direct edits, by hand or from a `brain schedule` job, and setup recommends git and offers the job ([[write-path-23-direct-edits|write path §2.3]], [[write-path-5-committing-direct-edits|§5]]).

**Residual risk:** Nothing blocks deleting or rewording facts, because files are the user's. Edits since the last snapshot have no history yet, and a brain without git has no recovery for direct edits.
