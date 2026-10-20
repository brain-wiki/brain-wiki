---
id: 01M3250V00FDDDW5WVE3EYBK1E
type: guide
title: "Rule proposals"
source: "docs/user/maintenance.md#rule-proposals"
---
# Rule proposals

Agents with `propose_rules` can propose rules. A proposal waits in
`inbox/proposals/` until you decide:

```sh
brain review list
brain review show ID
brain review accept ID      # or: brain rules accept ID
brain review reject ID
```

`brain rules list` shows your rules and the proposals still waiting.
