---
id: 01M3250V00RFYCPB84G857GK2R
type: guide
title: "Copy notes into an existing brain"
source: "docs/user/import.md#copy-notes-into-an-existing-brain"
---
# Copy notes into an existing brain

```sh
brain import ~/old-notes --into personal --apply
brain import ~/old-notes --into personal --topic archive --apply
```

- Top-level folders become topics, or everything goes into `--topic`.
- Notes get ids, `status` values are mapped as in phase 1, and path links
  are rewritten.
- New topics get hubs, and the `AGENTS.md` topic table is refreshed, in
  separate runs. Undo all of them to revert.
- The source folder is left untouched.
