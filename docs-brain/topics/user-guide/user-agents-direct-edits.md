---
id: 01M3250V00XATT20Z0R61BFF7G
type: guide
title: "Direct edits"
tags: [user-guide]
source: "docs/user/agents.md#direct-edits"
bw-part_of:
  - "[[user-agents]]"
---
# Direct edits

An agent whose profile includes `edit` may correct a note directly (a
person's new role, a wrong fact) and then run `brain_check`. The check
compares the file with the note's last recorded version and refuses deleted
or reworded claims (claims change only by superseding), lowered privacy,
protected files, and large removals. A clean check is recorded as a run, so
`brain undo` reverses it; claims the agent added are marked unverified.
Per topic, `agent_edits = "review"` sends agent edits to you
(`brain review accept`), and `"deny"` refuses them.

Your own edits in Obsidian or an editor are never blocked. `brain check`
lists notes that differ from their recorded version, `brain check --adopt
PATH` records one as yours (with an undo point), and `brain restore PATH`
puts a note back.
