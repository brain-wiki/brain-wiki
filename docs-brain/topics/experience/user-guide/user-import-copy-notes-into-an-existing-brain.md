---
id: 01M3250V00RFYCPB84G857GK2R
type: guide
title: "Copy notes into an existing brain"
source: "docs/user/import.md#copy-notes-into-an-existing-brain"
---
# Copy notes into an existing brain

```sh
brain import ~/old-notes --into personal [--topic archive] --apply
```

Top-level folders become topics (or everything goes into `--topic`), path
links are rewritten, and the source is left untouched.
