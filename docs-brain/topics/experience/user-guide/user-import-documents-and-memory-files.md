---
id: 01M3250V00479WADSEBPPZNAR9
type: guide
title: "Documents and memory files (Import)"
source: "docs/user/import.md#documents-and-memory-files"
---
# Documents and memory files (Import)

Ask an agent that can edit notes:

- "Bring in my meeting notes from ~/meetings."
- "Import your memory files into my brain."

The agent reads the files, searches the brain, and files each piece where
it belongs: a meeting becomes a dated record, a decision goes into the
project's notes, a procedure becomes a howto. Every note it changes cites
its source in `bw-sources`. Review the result with `git diff`, and undo
with git.

- Say what the files are. Text you did not write, such as clippings or
  other people's documents, is filed with its source but never becomes a
  statement about you.
- Asking again changes nothing already filed: the agent searches first.
- A large folder costs agent time in proportion to its size. To copy notes
  as they are, use `--into` instead.

Where the apps keep their memory files:

| App | Files |
|---|---|
| `claude-code` | `~/.claude/projects/*/memory/*.md` and `~/.claude/CLAUDE.md` |
| `codex` | `~/.codex/memories/` and `~/.codex/AGENTS.md` |
| `antigravity` | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/` |
| `openclaw` | `MEMORY.md`, `USER.md`, and `memory/` in `~/.openclaw/workspace/` |

`CLAUDE_CONFIG_DIR` and `CODEX_HOME` move the Claude Code and Codex
folders. Conversation history is harvested instead. See
[[user-agents-harvest|Agents]].
