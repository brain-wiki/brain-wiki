---
id: 01M3250V006X0JKJG6T9XMTPPH
type: guide
title: "Your agents' memory files"
source: "docs/user/import.md#your-agents-memory-files"
---
# Your agents' memory files

```sh
brain import --from claude-code          # a dry run
brain import --from codex --apply
```

Memory files become episodes attributed to the agent. brain-wiki knows
where these apps keep them:

| App | Files |
|---|---|
| `claude-code` | `~/.claude/projects/*/memory/*.md` and `~/.claude/CLAUDE.md` |
| `codex` | `~/.codex/memories/` and `~/.codex/AGENTS.md` |
| `antigravity` | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/` |
| `openclaw` | `MEMORY.md`, `USER.md`, and `memory/` in `~/.openclaw/workspace/` |

- `CLAUDE_CONFIG_DIR` and `CODEX_HOME` move the Claude Code and Codex
  folders.
- For other agents, or files kept elsewhere, give the location:
  `brain import ~/agent-notes --from myagent`.
- Conversation history is imported by `brain harvest` instead. See
  [[user-agents-harvest|Agents]].
