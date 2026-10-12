---
id: 01M3250V00EZYV1ESKAMQBANRH
type: design
title: "Format versioning"
aliases: ["02 §13"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#13-format-versioning"
---
# Format versioning

- `format` in `brain.toml` is an integer. This document defines format 1.
- A tool MUST refuse to write to a brain with a higher format than it
  supports, and SHOULD still read it on a best-effort basis.
- Format changes ship with a `brain migrate` step that has a dry run and
  writes a single commit (or undo point) per migration.

## Relations
- part_of [[brain-format]]
