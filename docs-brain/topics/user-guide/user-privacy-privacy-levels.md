---
id: 01M3250V002GM5P8H31FYGAQRK
type: guide
title: "Privacy levels"
tags: [user-guide]
source: "docs/user/privacy.md#privacy-levels"
---
# Privacy levels

`brain.toml` declares levels from least to most restrictive:

```toml
[privacy]
levels  = ["default", "sensitive", "secret"]
default = "default"

[topics.health]
privacy = "sensitive"
```

A note's level is the higher of its topic's level and its own `privacy:`
property (a note can raise its level, never lower it). Agents see only
notes up to their profile's `max_privacy`. When a hidden note supersedes or
contradicts a visible one, the agent is told that such a note exists, not
what it says.

## Relations
- part_of [[user-privacy]]
