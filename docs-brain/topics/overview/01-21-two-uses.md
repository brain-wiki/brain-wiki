---
id: 01M3250V00DDKG00VE4SVHD47J
type: design
title: "Two uses"
aliases: ["01 §2.1"]
tags: [overview]
source: "docs/design/01-overview.md#21-two-uses"
---
# Two uses

A brain serves two uses, and one brain can serve both:

| Use | Who writes most of it | What agents do with it | What matters most |
|---|---|---|---|
| **The user's second brain, as context** | The user: notes in Obsidian or any editor, an imported vault | Read it at session start and during tasks; propose additions only through the inbox | The user's words stay authoritative and are never rewritten silently |
| **The agents' own memory of the world** | Agents: what they observe and learn while working, written into notes directly or captured as episodes first | Log or write down what they learn, recall it later, across hosts | Notes cite their sources; git shows what changed and when; world facts kept current as the world changes |

Provenance keeps the two apart where they meet: every episode records its
`origin` (`owner`, `agent`, `import`, `system`) and `inputs`, notes cite
the episodes and pages they came from in `bw-sources`, and only the user
can add rules. A user who wants a hard line keeps them in separate
named brains. Open decisions about how far to separate and trust
agent-learned knowledge are Q9–Q12 in
[[14-2-decisions-needed-from-the-maintainer|14 §2]].

Agents interact through three surfaces, each optional:

1. **Files.** Any agent that can read files can use a brain directly; the
   brain carries its own `AGENTS.md`.
2. **MCP server.** Tools to orient, search, read, follow links, validate an
   edit, log an episode, propose a rule, and help with consolidation.
3. **Plugin.** A plugin bundle for each supported host adds the skills and
   the MCP server, and `brain connect` writes a short instruction block that
   tells the agent when to consult the brain.

Writes take one of three paths:

- **Direct edits (people, and agents with `edit`):** edit or create a note
  under `topics/` with any editor or file tool, then run `brain validate`,
  which checks the frontmatter of the changed files. Git is the history:
  `brain commit` snapshots direct edits, by hand or on a schedule
  (`brain schedule`).
- **Inbox (any agent, any time):** append a new episode file for something
  nobody has organized yet. Nothing is overwritten, so concurrent agents
  and devices never conflict.
- **Consolidation (optional):** `brain consolidate --prepare` hands an
  agent the pending episodes with candidate notes; the agent edits notes
  directly and validates them, then `brain consolidate --done` archives the
  episodes in one undoable run.

Each change brain-wiki makes itself (`brain mv`, `brain lint --fix`,
`brain consolidate --done`) is one run: it records an undo point and
commits if the brain is a git repo.

The LLM that writes notes is whatever the user already runs: the host agent
itself, through its file tools, MCP tools, and a skill. brain-wiki needs no
API keys.
