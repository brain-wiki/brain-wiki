---
id: 01M3250V00HG8FC473YA2BW5Q9
type: design
title: "Instructions come from the MCP server"
source: "docs/design/agents/codex.md#1-instructions-come-from-the-mcp-server"
---
# Instructions come from the MCP server

Codex reads the `instructions` field an MCP server returns during
initialization and uses it as guidance alongside the server's tools; its
documentation asks servers to keep the first 512 characters self-contained
([Codex MCP docs](https://learn.chatgpt.com/docs/extend/mcp)).
brain-wiki's server instructions are the static policy
([[08-32-the-static-instruction-block|08 §3.2]])
without the skill pointer. Its first bullet, which says to call
`brain_list` and `brain_orient` before work that may depend on the brain,
ends within those 512 characters, and a test keeps it there.

`brain connect codex` therefore writes no instruction file:

- **Codex reads exactly one global file**: `$CODEX_HOME/AGENTS.override.md`
  if it is non-empty, else `AGENTS.md`
  ([Codex AGENTS.md docs](https://learn.chatgpt.com/docs/agent-configuration/agents-md)).
  An override replaces `AGENTS.md` instead of adding to it, and users create
  and delete overrides as temporary swaps, so a block in either file can
  disappear without notice.
- **That file is often managed elsewhere**: a symlink into a dotfiles
  repository, or a file a script regenerates. Writing through the symlink
  puts brain-wiki's block into the user's dotfiles; a regeneration erases it.
- **A repository's `AGENTS.md` is shared with its team**, so project scope
  is no alternative.

Users who want the policy in their own instruction file can copy it from
`brain connect codex --print`.
