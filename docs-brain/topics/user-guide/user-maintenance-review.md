---
id: 01M3250V00WF8ZKSX4J00YW1G1
type: guide
title: "Review (Maintenance)"
tags: [user-guide]
source: "docs/user/maintenance.md#review"
---
# Review (Maintenance)

Some runs wait for you instead of applying: many claims superseded at
once, a topic marked `review = "always"`, or a brain with
`[consolidate] review = "always"`.

```sh
brain review list
brain review show RUN
brain review accept RUN     # re-validated against the notes as they are now
brain review reject RUN     # its episodes stay in the inbox
```

Agents can propose rules too. Those wait in the same list, marked `rule`:
`brain review accept ID` (or `brain rules accept ID`) adds the rule.
