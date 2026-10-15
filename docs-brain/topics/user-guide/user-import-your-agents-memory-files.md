---
id: 01M3250V006X0JKJG6T9XMTPPH
type: guide
title: "Your agents' memory files"
tags: [user-guide]
source: "docs/user/import.md#your-agents-memory-files"
bw-part_of:
  - "[[user-import]]"
---
# Your agents' memory files

```sh
brain import --from claude-code          # project memory and CLAUDE.md
brain import --from codex --apply        # ~/.codex/memories and AGENTS.md
```

Memory files become episodes attributed to the agent. For other hosts, or
files kept elsewhere, give the location: `brain import ~/agent-notes --from
myagent`. Conversation history
is imported by `brain harvest` instead (see [[user-agents|Agents]]).
