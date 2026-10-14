---
id: 01M3250V00DDKG00VE4SVHD47J
type: design
title: "Two uses"
aliases: ["01 §2.1"]
tags: [overview]
source: "docs/design/01-overview.md#21-two-uses"
bw-part_of:
  - "[[01-2-what-brain-wiki-is]]"
---
# Two uses

A brain serves two uses, and one brain can serve both:

| Use | Who writes most of it | What agents do with it | What matters most |
|---|---|---|---|
| **The user's second brain, as context** | The user: notes in Obsidian or any editor, an imported vault | Read it at session start and during tasks; propose additions only through the inbox | The user's words stay authoritative and are never rewritten silently |
| **The agents' own memory of the world** | Agents: what they observe and learn while working, captured as episodes and consolidated into notes | Log what they learn, consolidate it, recall it later, across hosts | Every claim traceable to its source; unverified knowledge marked; world facts kept current as the world changes |

Provenance keeps the two apart where they meet: every claim records its
`origin` (`owner`, `agent`, `import`, `system`) and `inputs`, and only the
user can add rules. A user who wants a hard line keeps them in separate
named brains. Open decisions about how far to separate and trust
agent-learned knowledge are Q9–Q12 in
[[14-2-decisions-needed-from-the-maintainer|14 §2]].

Agents interact through three surfaces, each optional:

1. **Files.** Any agent that can read files can use a brain directly; the
   brain carries its own `AGENTS.md`.
2. **MCP server.** Tools to orient, search, read, log an episode, propose a
   rule, and drive consolidation.
3. **Plugin.** A plugin bundle for each supported host adds the skills and
   the MCP server, and `brain connect` writes a short instruction block that
   tells the agent when to consult the brain.

Writes take one of three paths:

- **Inbox (any agent, any time):** append a new episode file. Nothing is
  overwritten, so concurrent agents and devices never conflict.
- **Curated notes (validated):** an LLM reads pending episodes and proposes
  a small set of typed operations (add a claim, merge evidence, supersede a
  claim, add a relation, create a note). The engine validates them
  deterministically, applies them, lints the result, records an undo point,
  and commits if the brain is a git repo.
- **Checked edits (agents with `edit`):** an agent edits a note directly,
  for example a person's role, then runs `brain check`, which validates the
  change and records it with an undo point like any other run.

The LLM that proposes operations is whatever the user already runs: the
host agent itself, through MCP tools and a skill. brain-wiki needs no API
keys.
