---
id: 01M3250V000TWJS4P3WSA86XCQ
type: design
title: "Flow"
aliases: ["Write path §4.1"]
source: "docs/design/write-path.md#41-flow"
---
# Flow

```
 prepare ──────────────► agent edits notes ──► validate ──► done
   │                         │                    │           │
 pending episodes,        direct edits        brain        archive the handled
 candidate notes,         under topics/       validate     episodes as one run
 guidance (read-only)                                      (undo puts them back)
```

Prepare writes nothing. Done moves files and nothing else, so a failure
between the steps leaves notes edited and episodes still pending; running
prepare again shows what is left.
