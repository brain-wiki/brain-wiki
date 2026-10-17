---
id: 01M3250V00TV7JJGXWY9WR8K0C
type: guide
title: "Consolidate on a schedule"
source: "docs/user/maintenance.md#consolidate-on-a-schedule"
---
# Consolidate on a schedule

Claude Code can consolidate its episodes every night without you:

```sh
brain schedule add consolidate --host claude-code --dry-run   # checks, and what it would install
brain schedule add consolidate --host claude-code --at 21:30  # --harvest to file new sessions too
brain consolidate --run --host claude-code --dry-run          # what tonight's run would take
brain schedule remove consolidate --host claude-code
```

- At that time, brain-wiki starts Claude Code (`claude -p`) with only its
  file tools and brain-wiki's MCP server, limited to the brain. Claude Code
  must be installed and signed in, and the machine must be on. The run uses
  your Claude plan or API key.
- It takes Claude Code's own episodes. `--include cursor` or
  `--include unowned` adds others'; that is your consent.
- Afterwards it validates the changed notes and, in a git brain, commits
  them. Review with `git log -p`, and undo a consolidation with
  `brain undo RUN`.
- A failed run shows in the next orientation and in `brain doctor`.
- Other agent apps consolidate in their sessions for now.
