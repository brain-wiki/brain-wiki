# Overview

## 1. Problem

People now work with several AI agents at once: a coding agent in the terminal, another in the editor, a chat app on the phone, an assistant running on a home machine. Each keeps its own memory, if it keeps any, and that causes five problems:

| Problem | What goes wrong |
|---|---|
| Silos | Every host has its own memory store. What one agent learns, the others never see, and switching agents means starting over. |
| Opaque stores | Memory built on vector databases or hosted services is hard to read, edit, diff, or move. Users cannot see or correct what their agents know. |
| Unsafe writes | Agents write memory while reading untrusted text such as web pages, issues, and email. An instruction planted in that text can reach long-term memory and steer every later session. |
| Stale retrieval | Similarity search returns the best-matching note, not the current one. A reversed decision comes back without its correction. |
| Silent decay | When an LLM rewrites a memory file to clean it up, details disappear a little at a time, and nobody notices until a fact is gone. |

## 2. What brain-wiki is

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

A user who wants a hard line keeps the two in separate brains. How far to separate and trust what agents learn is still open (Q9–Q12 in [open questions](../roadmap/open-questions.md)).

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

## 3. Goals

| ID | Goal | How we check it |
|---|---|---|
| G1 | Files are the source of truth. Everything the system knows is in the brain directory, people can read and edit it with any editor, and it works in Obsidian. | Deleting and rebuilding the index loses nothing. A brain edited in Obsidian passes lint. |
| G2 | One brain works with the agents people use: Claude Code, Codex, Antigravity, OpenClaw (as a bundle), Cursor, and other MCP clients. | The plugin loads in each host, `brain connect <host>` wires it, and a smoke test per host passes ([agent integrations](agent-integrations.md)). |
| G3 | Code and data are separate. The repository holds only source, brains live where the user chooses, and one user can have several. | No brain content in the repository. Config selects a brain by name for each project, host, or call. |
| G4 | Writes are safe. Untrusted content cannot become a standing directive, and every change to a note can be undone. | Rules change only from the user's own words, with confirmation. `brain undo` restores the exact bytes from before a run, and git restores a direct edit that `brain commit` recorded. |
| G5 | Retrieval is correct about change. Retrieving a superseded note also retrieves the newer note. | Guard recall is 100% in the bench's retrieval suite. |
| G6 | No required services or keys. brain-wiki runs offline on a laptop with Python and SQLite. | Core features pass tests with no network access. |
| G7 | Fast enough to call on every turn. | At 10,000 notes, warm search p95 is under 50 ms and a freshness check of an unchanged tree is under 150 ms ([engineering](engineering.md)). |
| G8 | Measurable. A reproducible bench measures retrieval quality, lint accuracy, and performance. | `brain bench` runs offline on synthetic data and writes a JSON and a Markdown report. |

## 4. Non-goals

- A hosted service or collaboration between people. A brain belongs to one person, who shares it through their own sync, such as git or a cloud drive.
- Remote MCP for chat apps such as ChatGPT, claude.ai, or the Gemini app. The design is a [proposal](../proposal/remote-mcp.md) and is not built.
- A model client inside brain-wiki. Consolidation, harvest, and import go through the host agent, and a scheduled consolidation starts an agent CLI the user already has (D8).
- Unattended maintenance by default. Harvest and consolidation run when the user asks; a schedule runs only if the user installs one with `brain schedule`, per brain and host ([D37](../decision/d37-per-agent-consolidation.md)).
- Required embeddings. Search is lexical (SQLite FTS5) plus the supersession guard. Vector search is an [idea](../roadmap/ideas.md).
- Remote storage backends. A brain is a local folder, optionally a git repository, and `brain commit` can fetch from and push to its `origin`. Managed git remotes and object storage are a [proposal](../proposal/remote-sync.md).
- Web ingestion and importers for email or chat. Importers cover Markdown folders, including Obsidian vaults, and hosts' own memory files.
- Encryption. The [security](security-and-privacy.md) design documents recipes only.
- Replacing Obsidian or any editor.

## 5. Design principles

1. Files are the API. Everything else depends on the on-disk format. The index, MCP server, plugins, and visualizer are views over it, and each can be rebuilt or replaced.
2. Check edits, and guard only what steers every session. An agent with file access edits files anyway, so direct edits are allowed: `brain validate` checks them, git records them, and lint catches what slips through. Rules load into every session, so they still need the user's own words.
3. The engine checks and the model writes. Everything that must be correct is deterministic code: parsing, validation, budgets, episode provenance, and undo. The model writes notes as Markdown. The engine reads frontmatter, headings, and links, and never extracts meaning from the body.
4. Change is part of the format. Supersession is metadata with a retrieval rule, not prose.
5. A small core with optional parts. The core is the format, the index, the CLI, and the MCP server. Plugins, the visualizer, the bench, and importers depend on the core, never the other way round.
6. Boring technology: Markdown, YAML frontmatter, TOML, SQLite, git, and Python. Anything new needs a reason the boring option failed.
7. Respect the user's other tools. Obsidian, git, and sync tools see a normal folder, and brain-wiki keeps no state in the brain that those tools would damage.

## 6. Users and scenarios

The primary user works with two or more AI agents and wants them to share durable, correct memory that the user can inspect. That memory holds both the user's own knowledge and what the agents learn on their own (§2.1). A secondary user has an Obsidian vault and wants agents to read it without restructuring it.

| # | Scenario | What happens | Details |
|---|---|---|---|
| S0 | Onboarding | The user installs the plugin and says "set up brain-wiki". The setup skill walks through installing, creating a brain or importing a vault, connecting other agents, choosing which brains each may use, and turning on harvest, with a dry run before every write. | [skills and onboarding](skills-and-onboarding.md) |
| S1 | Session start | An agent starts in a project. The instructions `brain connect` installed tell it to call `brain_list` and `brain_orient` when the task may depend on the user's knowledge. The briefing (rules, what the brain holds, topics, the inbox, recent changes) fits a fixed budget. | [index and search](index-and-search.md), [agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block) |
| S2 | Recall during a task | The agent asks about a past decision. `brain_search` returns the matching notes, plus the newer note for every superseded hit. The agent opens one with `brain_read`, follows its links with `brain_neighbors`, or reads the files directly. | [index and search](index-and-search.md) |
| S2b | An agent updates a note | The user says "Maya moved to the platform team." The agent edits Maya's note and runs `brain validate` on it, and `brain commit` records the change in git. | [write path](write-path.md) |
| S3 | Recording | The agent learned something worth keeping and logs an episode with `brain_log_episode`, raw and in one call, for consolidation to file later. | [write path](write-path.md) |
| S3b | Harvest and backfill | The agent logged nothing in a session, or the sessions happened before brain-wiki was set up. The user asks the agent to harvest: brain-wiki reads the agent's finished sessions from its host's own store and routes each to a brain by project, and the agent files them into notes that cite each session. | [write path §2.2](write-path.md#22-harvesting-sessions) |
| S4 | Consolidation | The user asks their agent to consolidate. `brain consolidate --prepare` gives it the pending episodes with candidate notes, it edits and validates the notes in the session while the user watches, and `--done` archives the episodes. | [write path](write-path.md) |
| S5 | Editing by hand | The user edits notes in Obsidian. The next freshness check picks up the edits, and lint reports problems. | [lint](lint-and-reports.md) |
| S6 | Bringing an existing vault | `brain import --overlay` adopts a folder in place and shows a dry run before any change. | [import](import.md) |
| S7 | Work and personal | The user keeps two brains. A project's `.brain-wiki.toml` or a host setting picks the right one, and `brain brains limit` keeps a host to some of them. | [config and storage](config-and-storage.md) |
| S8 | A bad edit | `brain undo <run>` reverts a brain-wiki run (`lint --fix`, `mv`, `consolidate --done`) exactly. A direct edit is restored from git. | [write path](write-path.md) |
| S9 | Inspecting the brain | `brain viz` opens a map of topics, notes, and links in the browser. | [visualizer](visualizer.md) |
| S10 | Measuring | `brain bench` runs retrieval, lint, and performance suites offline on generated brains, and `brain bench --compare` reports regressions between two runs. | [eval bench](eval-bench.md) |
| S11 | An agent builds its own knowledge | A long-running assistant learns how the user's tools, services, and projects behave. It writes what it learns into notes, cites episodes and pages in `bw-sources`, and validates each edit, or logs episodes to consolidate later. Later sessions on any host recall the notes with their sources. | [write path](write-path.md), [skills and onboarding](skills-and-onboarding.md) |
