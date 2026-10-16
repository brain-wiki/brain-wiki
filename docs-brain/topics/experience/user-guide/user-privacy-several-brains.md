---
id: 01M3250V005KYAT6YF1W8EDNXB
type: guide
title: "Several brains"
source: "docs/user/privacy.md#several-brains"
---
# Several brains

Separate brains are the boundary between parts of your life, such as work
and personal. Limit which brains an agent may use:

```sh
brain brains limit cursor work         # cursor sees only the work brain
brain brains --as cursor               # check what it may use
brain brains unlimit cursor            # every brain again
brain connect cursor --brain work      # the brain its MCP server starts with
```

The limits live in the user config, `~/.config/brain-wiki/config.toml`,
under `[hosts.<app>] brains`.
