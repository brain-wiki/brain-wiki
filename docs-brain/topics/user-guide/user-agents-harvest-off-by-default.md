---
id: 01M3250V00P8VQH5CDVK8NH49M
type: guide
title: "Harvest (off by default)"
tags: [user-guide]
source: "docs/user/agents.md#harvest-off-by-default"
bw-part_of:
  - "[[user-agents]]"
---
# Harvest (off by default)

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is the way to give a new brain real history.

```toml
[harvest]
enabled = true
hosts = ["claude-code", "codex", "antigravity"]
```

```sh
brain harvest --status           # per host: sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with your configured agent CLI
brain harvest --apply --raw      # no model: excerpts that consolidation distills later
```

Inside an agent, "harvest my recent sessions" runs the same steps with the
agent itself doing the distilling (the host's profile needs `harvest`).
Sessions are routed to the brain their working directory belongs to; a
session that belongs to no brain is skipped, never filed into your default
brain. Claude Code deletes transcripts after 30 days by default, so harvest
at least weekly.
