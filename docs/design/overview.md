# Overview

Status: draft for review · Applies to: v0.1

## 1. Problem

People now work with several AI agents at once: a coding agent in the
terminal, another in the editor, a chat app on the phone, an autonomous
assistant on a home machine. Each one keeps its own memory, if it keeps any:

| Problem | What goes wrong |
|---|---|
| **Silos** | Every host has its own memory store (instruction files, auto-memory folders, proprietary knowledge bases). What one agent learns, the others never see. Switching agents means starting over. |
| **Opaque stores** | Memory layers built on vector databases or hosted services are hard to read, edit, diff, or move. Users cannot see or correct what their agents "know". |
| **Unsafe writes** | Agents write to memory while reading untrusted text (web pages, issues, email). An instruction planted in that text can end up in long-term memory and steer every later session. |
| **Stale retrieval** | Similarity search returns the best-matching note, not the current one. A decision that was later reversed, or a rule with an exception, is retrieved without its correction. |
| **Silent decay** | When an LLM rewrites a memory file to "clean it up", details disappear a little at a time. Nobody notices until a fact is gone. |

## 2. What brain-wiki is

brain-wiki is a local-first memory layer that any agent can read from and
write to, stored as plain Markdown in a folder the user owns.

```
            ┌────────────────────── agent hosts ───────────────────────┐
            │ Claude Code    Codex    Antigravity    OpenClaw    Cursor │
            │      any MCP client          a human in Obsidian / vim    │
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

A **brain** is a directory of Markdown files with a small manifest. It holds:

- **Topic notes**: curated, self-contained Markdown pages grouped into
  topic folders, each topic with a short hub page. Frontmatter holds
  metadata; facts and wikilinks to other notes are ordinary Markdown in the
  body.
- **Supersession**: a note that a newer note replaced says so in its
  metadata (`status: superseded`, `bw-superseded_by`), and retrieval always
  returns the newer note with it.
- **An inbox of episodes**: raw, append-only observations written by agents
  (or the user) during work.
- **Rules**: a short list of standing directives from the user.

### 2.1 Two uses

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
[open questions](../roadmap/open-questions.md).

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

## 3. Goals

| ID | Goal | How we will know (v0.1) |
|---|---|---|
| G1 | **Files are the source of truth.** Everything the system knows is in the brain directory, readable and editable by humans with any editor, and works in Obsidian. | Deleting the index and rebuilding it loses nothing. A brain round-trips through Obsidian edits without lint errors. |
| G2 | **Works with the agents people use.** One brain serves Claude Code, Codex, Antigravity, OpenClaw (bundle mode), Cursor, and generic MCP clients. | The plugin loads in each host; `brain connect <host>` wires it; an end-to-end smoke test per host passes (see [agent integrations](agent-integrations.md)). |
| G3 | **Code and data are separate.** The repo holds only source. Brains live at user-chosen locations; one user can have several named brains. | No brain content in the repo; config selects brains by name per project, per host, or per call. |
| G4 | **Writes are safe.** Untrusted content cannot become a standing directive automatically; every change to a note is reversible. | Rules change only with the user's verbatim words and confirmation; `brain undo` restores the exact prior bytes of a run; git restores a direct edit that `brain commit` recorded. |
| G5 | **Retrieval is correct about change.** When a note has been superseded, retrieving it also retrieves the newer note. | Guard recall is 100% on the bench retrieval suite. |
| G6 | **No required services or keys.** Runs offline on a laptop with Python and SQLite. | Core features pass tests with no network access. |
| G7 | **Fast enough to call on every turn.** | At 10,000 notes: search p95 < 50 ms warm; unchanged-tree freshness check < 150 ms. See [engineering](engineering.md). |
| G8 | **Measurable.** Retrieval quality, lint accuracy, and performance are measured by a reproducible bench. | `brain bench` runs offline on synthetic data and produces a JSON and Markdown report. |

## 4. Non-goals for v0.1

- **Hosted service or multi-user collaboration.** A brain belongs to one
  person. Sharing happens through the user's own sync (git, a cloud drive).
- **Remote MCP for chat apps** (ChatGPT web, claude.ai, the Gemini app). The
  design is a [proposal](../proposal/remote-mcp.md); the implementation is
  not in v0.1.
- **Built-in LLM API clients.** Consolidation goes through the host agent.
  A direct-API backend is a later addition behind the same interface.
- **Scheduled maintenance.** Harvest and consolidation run when the user
  asks; the scheduled version was removed before 0.1
  ([proposal](../proposal/scheduled-maintenance.md)). The one scheduled
  job, `brain schedule`, only commits direct edits to git.
- **Required embeddings.** Search is lexical (SQLite FTS5) plus the
  supersession guard. Vector search is an optional later addition.
- **Remote storage backends.** v0.1 supports a local directory, optionally a
  git repo; `brain commit` can fetch from and push to the repo's own
  `origin`. Managed private git remotes and object storage (GCS, S3 via
  fsspec) are designed in a [proposal](../proposal/remote-sync.md) but not
  built.
- **Automatic web ingestion, email or chat importers.** Importers in v0.1
  cover existing Markdown folders (including Obsidian vaults) only.
- **Encryption.** Documented recipes only ([security](security-and-privacy.md)).
- **A replacement for Obsidian or any editor.**

## 5. Design principles

1. **Files are the API.** The on-disk format is the contract. Every other
   component (index, MCP, plugins, visualizer) is a view over it and can be
   rebuilt or replaced.
2. **Validate edits; gate only what steers every session.** An agent with
   file access edits files anyway, so direct edits are the sanctioned path:
   `brain validate` checks them, git records them, and lint catches what
   slips through. Rules, which load into every session, still need the
   user's own words.
3. **The engine checks; the LLM writes.** Everything that must be correct
   (parsing, validation, budgets, episode provenance, undo) is
   deterministic code. The LLM writes notes as Markdown. The engine reads
   frontmatter, headings, and links, and never extracts meaning from the
   body.
4. **Change is first-class.** Supersession is metadata with a retrieval
   rule, not prose.
5. **Small core, optional edges.** The core is format + index + CLI + MCP.
   Plugins, the visualizer, the bench, and importers depend on the
   core, never the other way round.
6. **Boring technology.** Markdown, YAML frontmatter, TOML, SQLite, git,
   Python. Novelty needs a reason that the boring option failed.
7. **Respect the user's other tools.** Obsidian, git, and sync tools see a
   normal folder. brain-wiki does not hide state in the brain that those
   tools would mangle.

## 6. Users and scenarios

Primary user: an individual who works with two or more AI agents and wants
them to share durable, correct, inspectable memory: both the user's own
knowledge as context and what the agents learn on their own (§2.1).
Secondary: an Obsidian user who wants their existing vault to become
agent-readable without restructuring it.

| # | Scenario | Flow (details in) |
|---|---|---|
| S0 | **Onboarding.** The user installs the plugin and says "set up brain-wiki". | The setup skill walks through install, brain creation or vault import, connecting other agents, which brains each may use, and harvest, with a dry run before every write. [skills and onboarding](skills-and-onboarding.md) |
| S1 | **Session start.** An agent starts in a project. | The static instructions `brain connect` set up tell it to call `brain_list` and `brain_orient` when the task may depend on the user's knowledge; the briefing (what the brain holds, rules, topics, recent changes) fits a fixed budget. [index and search](index-and-search.md), [agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block) |
| S2 | **Recall during a task.** The agent asks about a past decision. | `search` returns the matching notes plus the newer note for every superseded hit; the agent opens one with `read` and follows its links with `neighbors`, or reads files directly when allowed. [index and search](index-and-search.md) |
| S2b | **An agent updates a note.** The user says "Maya moved to the platform team." | The agent edits the person's note and runs `brain validate` on it; `brain commit` records the change in git. [write path](write-path.md) |
| S3 | **Record.** The agent learned something worth keeping. | It logs an episode (MCP or CLI). [write path](write-path.md) |
| S3b | **Harvest and backfill.** The agent logged nothing in a session, or sessions happened before brain-wiki existed. | `brain harvest` reads finished sessions from the hosts' own stores, routes each to a brain by project, and distills them into episodes, after a dry run. [write path §2.2](write-path.md#22-harvesting-sessions) |
| S4 | **Consolidation.** Pending episodes are folded into topic notes. | The user asks their agent to consolidate: `brain consolidate --prepare` hands it the pending episodes with candidate notes, it edits and validates the notes in the session, where the user can watch and steer, and `--done` archives the episodes. [write path](write-path.md) |
| S5 | **Human editing.** The user edits notes in Obsidian. | Edits are picked up by the next freshness check; lint reports problems. [lint](lint-and-reports.md) |
| S6 | **Bring an existing vault.** | `brain import --overlay` adopts a folder in place, with a dry-run report before any change. [import](import.md) |
| S7 | **Work and personal.** | Two named brains; a project file or host setting picks the right one; agents can be limited to a subset. [config and storage](config-and-storage.md) |
| S8 | **A bad edit.** | A brain-wiki run (`lint --fix`, `mv`, `consolidate --done`) is reverted exactly with `brain undo <run>`; a direct edit is restored from git. [write path](write-path.md) |
| S9 | **Inspect the brain.** | `brain viz` opens a 3D map of topics, notes, and links. [visualizer](visualizer.md) |
| S10 | **Measure.** | `brain bench` runs retrieval, lint, and performance suites offline on generated brains and reports regressions. [eval bench](eval-bench.md) |
| S11 | **An agent builds its own knowledge.** A long-running assistant learns how the user's tools, services, and projects behave. | It writes what it learns into notes directly, citing episodes and pages in `bw-sources` and validating each edit, or logs episodes to consolidate later; later sessions on any host recall the notes with their sources. [write path](write-path.md), [skills and onboarding](skills-and-onboarding.md) |
