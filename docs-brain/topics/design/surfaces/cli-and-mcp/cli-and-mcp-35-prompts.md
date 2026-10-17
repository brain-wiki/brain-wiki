---
id: 01M3250V007T5P1DXTYMYZ8JW4
type: design
title: "Prompts"
aliases: ["CLI and MCP §3.5"]
source: "docs/design/cli-and-mcp.md#35-prompts"
---
# Prompts

Three MCP prompts give hosts that show prompts as slash commands a
one-step entry point, for example `/brain:harvest`, depending on the
host's naming:

| Prompt | Asks the agent to |
|---|---|
| `consolidate` | Call `brain_consolidate_prepare`, edit or create notes by pattern, run `brain_validate`, call `brain_consolidate_done` with the outcomes, repeat while the agent's episodes remain, and report what changed |
| `capture` | Summarize the session's durable learnings and log them with one `brain_log_episode` call |
| `harvest` | Run prepare, file the sessions into notes, and done, at most 3 rounds; on `unsupported_host`, ask the user before reading its own session history |
