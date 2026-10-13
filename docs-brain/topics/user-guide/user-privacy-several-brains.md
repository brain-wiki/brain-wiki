---
id: 01M3250V005KYAT6YF1W8EDNXB
type: guide
title: "Several brains"
tags: [user-guide]
source: "docs/user/privacy.md#several-brains"
bw-part_of:
  - "[[user-privacy]]"
---
# Several brains

Separate brains are the boundary between parts of your life (work and
personal, for example). Limit which brains an agent may use in the user
config:

```toml
# ~/.config/brain-wiki/config.toml
[hosts.cursor]
brain = "work"
brains = ["work"]
```
