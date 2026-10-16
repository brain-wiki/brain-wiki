---
id: 01M3250V0019JP1NV2VZH1C0PY
type: design
title: "Prompts"
aliases: ["07 §3.5"]
source: "docs/design/07-interfaces.md#35-prompts"
---
# Prompts

Three MCP prompts give hosts that surface prompts as slash commands a
one-step entry point (for example `/brain:harvest`, depending on the host's
naming):

| Prompt | Does |
|---|---|
| `consolidate` | Asks the agent to call `brain_consolidate_prepare`, edit or create notes, run `brain_validate`, call `brain_consolidate_done`, repeat while episodes remain, and report what changed. |
| `capture` | Asks the agent to summarize the current session's durable learnings and log them as one episode. |
| `harvest` | Asks the agent to run the harvest recipe: prepare, distill each session, apply, repeat until no sessions remain or the user stops; fall back to the self-read recipe if the host is unsupported. |
