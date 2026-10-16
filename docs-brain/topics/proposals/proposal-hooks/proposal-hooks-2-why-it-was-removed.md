---
id: 01M3250V00TM70FT8ZV0A9EA9F
type: proposal
title: "Why it was removed (Host hooks: briefing, capture, and recall)"
aliases: ["Host hooks: briefing, capture, and recall §2"]
source: "docs/proposal/hooks.md#2-why-it-was-removed"
---
# Why it was removed (Host hooks: briefing, capture, and recall)

- **The briefing hook duplicated the instruction block.** The block tells
  agents to call `brain_orient` before work that may depend on the brain,
  which delivers the same briefing. The only loss is that `rules.md` is not
  in context in a session where the agent never orients.
- **Capture duplicated harvest.** Harvest reads the same transcripts after
  the fact with the same readers, skip rules, and dedupe keys, and the
  instruction block already tells agents to log as they go.
- **It was the least verified surface.** Only Antigravity's hooks ran on a
  real host (T-1, T-9). Claude Code and Codex hooks were built from their
  documentation and tested with synthetic payloads.
- **Codex skips plugin hooks until the user trusts them in `/hooks`**, and in
  the ChatGPT desktop app runs them only for manually installed plugins.
- **Input tracking had gaps.** The `PostToolUse` matcher (`WebFetch|WebSearch|mcp__.*`)
  never saw shell commands, which Claude Code and Codex report as `Bash`, and
  Codex's hosted web search does not reach tool hooks at all.

Without hooks, MCP writes are recorded with `bw-inputs: unknown`, which is
never trusted, and every rule still needs the user's confirmation.
