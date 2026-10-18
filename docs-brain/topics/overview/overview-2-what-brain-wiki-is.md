---
id: 01M3250V009Y8JG2NZMZ7HF3SR
type: design
title: "What brain-wiki is"
aliases: ["Overview §2"]
source: "docs/design/overview.md#2-what-brain-wiki-is"
---
# What brain-wiki is

brain-wiki is a local-first memory that any agent can read and write. It is stored as plain Markdown in a folder the user owns.

```
            ┌────────────────────── agent hosts ───────────────────────┐
            │ Claude Code    Codex    Antigravity    OpenClaw    Cursor │
            │      any MCP client          a person in Obsidian or vim  │
            └───────┬──────────────┬──────────────────┬────────────────┘
               plugin│        MCP (stdio)│        plain files│
            ┌───────▼──────────────▼──────────────────▼────────────────┐
            │                  brain-wiki engine (Python)              │
            │  config · parse · index · search · lint · consolidate    │
            └───────┬──────────────────────────────────┬───────────────┘
                    │ read/write Markdown              │ derived cache
            ┌───────▼───────────────────┐   ┌──────────▼──────────────┐
            │ brain directory (owned by │   │ SQLite index + run log  │
            │ the user, anywhere on disk│   │ in the user cache/state │
            │ optionally a git repo)    │   │ directories (rebuildable)│
            └───────────────────────────┘   └─────────────────────────┘
```

A brain is a directory of Markdown files with a small manifest, `brain.toml`. It holds:

- Topic notes. Each topic is a folder of Markdown pages with a short topic page. Frontmatter holds metadata, and facts and wikilinks to other notes are ordinary Markdown in the body.
- Supersession. A note that a newer note replaced says so in its metadata (`status: superseded`, `bw-superseded_by`), and retrieval always returns the newer note with it.
- Relations. A note may name the whole it is part of, the notes it rests on, and the notes it disagrees with, in link-only fields. Retrieval returns both sides of a conflict, and notes resting on outdated notes are listed for review.
- An inbox of episodes. Episodes are raw observations that agents or the user write during work. They are only ever added, never edited.
- Rules. A short list of standing directives from the user.


### 2.1 Two uses

A brain serves two uses, and one brain can serve both:

| Use | Who writes most of it | What agents do with it | What matters most |
|---|---|---|---|
| The user's second brain | The user, in Obsidian or any editor, or by importing a vault | Read it when a task needs it; add to it through the inbox | The user's words stay authoritative and are never rewritten behind the user's back |
| The agents' own memory | Agents, writing notes directly or logging episodes first | Write down what they learn and recall it later, on any host | Notes cite their sources, git shows what changed and when, and facts about the world stay current |

Provenance keeps the two apart where they meet:

- Every episode records its `origin` (`owner`, `agent`, `import`, or `system`) and its `inputs`.
- Notes cite the episodes and pages they came from in `bw-sources`.
- Only the user can add rules.

A user who wants a hard line keeps the two in separate brains. How far to separate and trust what agents learn is still open (Q9–Q12 in [[questions|open questions]]).

Agents reach a brain in three ways, each optional:

1. Files. Any agent that can read files can use a brain directly. The brain carries its own `AGENTS.md`.
2. The MCP server. Its tools list brains, orient, search, read, follow links, validate edits, log episodes, propose rules, help with consolidation and harvest, and read the conversation behind an episode.
3. The plugin. A plugin for each supported host adds the skills and the MCP server, and `brain connect` writes a short instruction block that tells the agent when to consult the brain.

Notes change in three ways:

- Direct edits. People, and agents whose profile has `edit`, edit or create notes under `topics/` with any editor or file tool. `brain validate` then checks the frontmatter of the changed files. Git is the history: `brain commit` commits direct edits, by hand or on a schedule set with `brain schedule`.
- The inbox. Any agent may append an episode for something nobody has organized yet. Nothing is overwritten, so concurrent agents and devices never conflict.
- Consolidation, which is optional. `brain consolidate --prepare` gives an agent the pending episodes with candidate notes. The agent edits and validates the notes, and `brain consolidate --done` archives the episodes in one undoable run.

Each change brain-wiki makes itself, such as `brain mv`, `brain lint --fix`, or `brain consolidate --done`, is one run. A run records an undo point and commits if the brain is a git repository.

The model that writes notes is the agent the user already runs, working through its file tools, the MCP tools, and a skill. brain-wiki needs no API keys.
