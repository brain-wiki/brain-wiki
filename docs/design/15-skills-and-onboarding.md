# 15 · Skills and onboarding

Status: draft for review

## 1. Goals

| # | Goal | How we will know |
|---|---|---|
| O1 | A new user goes from "plugin installed" to a working brain connected to their agents in one guided conversation, without reading docs. | The onboarding scenario (§5) completes on a fresh machine. |
| O2 | Everyday use needs no manual: the agent knows when to recall, when to record, and what never to do. | Skill trigger tests (§5) pass for every supported host. |
| O3 | Every step can be inspected and undone. | Each setup action prints a dry run first and records how to reverse it. |

## 2. The skills

The plugin ships three skills under `skills/`, all conforming to the Agent
Skills specification (name matches its folder, description under 1,024
characters, body under 500 lines, details in `references/` loaded on
demand, no host-specific frontmatter keys).

| Skill | Purpose | Loaded when |
|---|---|---|
| `brain` | Everyday use: recall, read warnings, record, propose rules only on request | Questions about past work, preferences, decisions; "remember…"; end of meaningful work |
| `brain-setup` | Onboarding and reconfiguration: install, create or adopt a brain, connect agents, permissions, harvest | "Set up / install / connect / import brain-wiki"; or brain-wiki reports it is not configured |
| `brain-maintain` | Upkeep: harvest, consolidate, review proposals, health check, undo | "Consolidate / harvest / clean up / review / check my brain" |

**Why three skills, not one.** Hosts load every skill's name and
description into context up front (about 100 tokens each) and the body only
when it triggers. Three small skills with distinct trigger phrases match
user intent more reliably than one broad one, and the setup instructions,
which are long and used rarely, never load during everyday work. Hosts
that expose skills as slash commands (Claude Code plugins as
`/brain-wiki:brain-setup`, Antigravity as `/brain-setup`) also get three
memorable commands.

**Draft descriptions** (the trigger text matters most; each leads with what
and when):

> **brain**: Use the user's long-term memory (brain-wiki), shared across
> their AI agents. Consult it before answering questions about past
> decisions, preferences, project history, people, or anything the user
> expects you to remember; explore it step by step from brain_list and
> brain_orient. Record durable learnings when meaningful work ends or the
> user says "remember", and correct notes directly with brain_check
> afterwards. Prefer current notes over superseded or conflicting ones.
> Never write rules unless the user explicitly asks.

> **brain-setup**: Set up, connect, or reconfigure brain-wiki: install the
> CLI, create a brain or adopt an existing Obsidian or Markdown vault,
> connect other agents (Claude Code, Codex, Antigravity, OpenClaw, Cursor),
> choose which agents see which brain and what each may do, and turn on
> harvest. Use when the user asks to install, set up, onboard, connect, or
> import brain-wiki, or when brain-wiki says it is not configured.

> **brain-maintain**: Maintain a brain-wiki brain: harvest recent agent
> sessions into the inbox, consolidate pending episodes into notes, review
> proposals, check health (contradictions, stale notes, lint), and undo a
> bad run. Use when the user asks to consolidate, harvest, clean up,
> review, or check their brain.

**Layout:**

```text
skills/
├── brain/
│   ├── SKILL.md
│   └── references/format.md            relation verbs, claim syntax, episode sections (for hand edits)
├── brain-setup/
│   ├── SKILL.md                        the onboarding flow (§3)
│   └── references/
│       ├── hosts.md                    per-host connect and permission notes
│       └── privacy.md                  separate brains and profiles, in plain words
└── brain-maintain/
    ├── SKILL.md
    └── references/
        ├── consolidate.md              the instruction contract (05 §4.5) and op examples
        └── harvest.md                  the harvest recipe and the self-read fallback
```

The instruction texts are generated from the same
sources the engine uses (`brainwiki/assets/`), so the skill and the CLI can
never disagree. `scripts/sync_versions.py` regenerates them at release.

## 3. Onboarding

### 3.1 Entry points

A user can arrive at setup from several places, and every one leads to the
same flow:

| Entry | What happens |
|---|---|
| Plugin installed from a marketplace, no brain yet | MCP tools return `not_configured` with a hint to ask the agent to set brain-wiki up. |
| User asks the agent | `brain-setup` triggers. |
| Terminal, no agent | `brain setup` runs the same flow as an interactive wizard, minus the install and permissions steps. |
| Re-running later | Setup is idempotent: it reads the current state and offers only what is missing or worth changing. |

### 3.2 The flow

```
detect ─► install ─► brain ─► connect ─► permissions ─► harvest ─► verify ─► summary
  │          │          │         │            │             │          │
doctor   CLI on PATH  create or  other     which brains,   opt-in per test episode,
--json   (uv tool     adopt      agents    what each       host, with search,
         install)     (import)   found     agent may do    routes, a  orientation
                                 on disk                   dry run
```

| Step | The agent | Asks the user | Writes |
|---|---|---|---|
| Detect | Runs `brain doctor --json` (§3.4); if the CLI is missing, notes it | — | nothing |
| Install | Proposes `uv tool install brain-wiki` (or `pipx`); explains that marketplace installs can also run through `uvx` without installing | "Install the brain-wiki command?" | the tool install |
| Brain | If none exists: explains what a brain is and suggests a location outside any code repository (default `~/brains/personal`), a name, and git (recommended: every change is a commit, the brain can be pushed to a private remote); the user decides. If the user has a vault: runs `brain import <path> --overlay --dry-run`, summarizes the report, applies phase 0, and mentions later phases | Location, name, git; which existing vault, if any | `brain init` (with `--git`, a first commit) or import phase 0; user config |
| Connect | Lists agents `doctor` found installed and not yet connected; runs `brain connect <host> --dry-run` for each and shows the change | Which agents to connect | each host's config, with backups |
| Permissions | Which brains: one brain is fine to start; every connected agent reads all of it; separate brains for separate lives (work and personal). What each agent may do: logging and checked edits are on by default; `consolidate` and `propose_rules` are granted per app | Keep defaults, or set up a second brain / host limits; which apps may consolidate or propose rules | `brain.toml` (`[agents.<host>]`), user config |
| Harvest | Explains in plain terms what is read and what may be sent to a model; runs a dry run and shows how many past sessions exist and an estimated cost of backfill; explains routing and, with one brain, offers a route for every folder under the home folder | Per host: harvest on/off, backfill now/later/never; the route | user config; episodes if backfill runs |
| Verify | Logs a test episode, searches for it, and shows orientation; the test episode stays in the inbox, and consolidation skips it as holding nothing durable | — | one episode |
| Summary | Lists everything configured, where it lives, and how to undo each part (`brain connect --uninstall`, `brain brains remove`, removing an `[agents.<host>]` table) | — | nothing |

### 3.3 Rules for the setup skill

- **One decision at a time, batched sensibly.** Ask the few questions a step
  needs together, then act; never a wall of questions up front.
- **Dry run before any write outside the brain** (host configs), and show
  the diff.
- **Nothing that reads sessions or sends content to a model is turned on
  without an explicit yes**, and the explanation comes first.
- **Never move, rename, or delete the user's files.** Import is overlay
  only; later phases are offered, not applied.
- **Resumable.** If the session ends halfway, the next run of setup picks up
  from `doctor`'s view of the state.
- **Plain language.** No internal terms (provenance, profiles, ops) unless the
  user asks; the references hold the details.

### 3.4 `brain doctor --json`

The contract the setup skill reads. Stable within a minor version.

```json
{
  "version": "0.1.0",
  "device": "laptop",
  "config": {"path": "~/.config/brain-wiki/config.toml", "exists": true},
  "cli": {"on_path": true, "path": "~/.local/bin/brain"},
  "brains": [
    {"name": "personal", "path": "~/brains/personal", "ok": true, "format": 2,
     "git": true, "id": "01J…", "pending_episodes": 7, "notes": 412, "open_proposals": 1,
     "recovered_runs": [], "uncommitted_runs": [], "default": true}
  ],
  "hosts": [
    {"id": "claude-code", "installed": true, "connected": true, "plugin": "0.1.0",
     "instructions": true, "harvest": true},
    {"id": "codex", "installed": true, "connected": false, "harvest": false}
  ],
  "sqlite": {"version": "3.53.4", "fts5": true, "trigram": true},
  "problems": [
    {"code": "host_not_connected", "severity": "info", "host": "codex",
     "message": "codex is installed but not connected.", "fix": "brain connect codex"}
  ],
  "next_steps": ["connect codex"]
}
```

Hosts count as installed when their command is on `PATH` or their
configuration directory exists. Nothing in `doctor` contacts the network.

## 4. Skill bodies (outlines)

**`brain`**

1. What the brain is (shared memory, plain files) and the rules: never add
   rules unless the user explicitly asks; edit notes only with a `brain
   check` afterwards, and never rules, episodes, or `log.md`.
2. Start with `brain_list`, then `brain_orient` for the brain that fits.
3. Explore step by step: search or browse (an empty query with filters),
   read the outline, follow relations with `brain_neighbors`, or read files
   directly when `brain_list` gives a path. A query recipe table maps
   questions to calls (why → intent `why`; latest X → `type` and
   `sort: recent`; what changed → `since`; who → the people topic; what
   depends on X → `brain_neighbors`; exact strings across many notes →
   grep). How to read results: warnings for superseded or conflicting notes
   come first; prefer current notes; say so when relying on an unverified
   claim.
4. When to record and what makes a good episode (decisions with reasons,
   facts, negative findings, open questions; not chatter), with one example.
5. Editing a note directly: when it fits (a correction or update to an
   existing note, not new knowledge), supersede claims instead of deleting
   them, then `brain_check` and fix what it reports.
6. Proposing a rule: only on an explicit request, with the user's exact
   words; expect a confirmation prompt.
7. If brain-wiki says it is not configured: hand over to `brain-setup`,
   which also offers `brain connect` to add the static instruction block
   ([08 §3.2](08-agent-integrations.md#32-the-static-instruction-block)).

**`brain-maintain`**

1. Harvest: the recipe ([05 §2.2](05-write-path-and-consolidation.md#22-harvesting-sessions)),
   and the self-read fallback for hosts without a session reader.
2. Consolidate: prepare, reason with the instruction contract, apply;
   handling `invalid`, `stale`, and `review` results; when to consult an
   origin.
3. Review proposals with the user: show, accept, or reject.
4. Health: `brain lint`, `brain report`, what each report means, which fixes
   are safe.
5. Undo: find the run, explain what it will restore, undo on confirmation.

## 5. Testing

| Test | How |
|---|---|
| Skill conformance | `tests/test_plugin.py` checks every skill folder against the Agent Skills rules (name, description length, body length, links into `references/`) |
| Triggering | By hand before releases: for each skill, prompts that should trigger it and near-misses that should not, in at least two hosts |
| Onboarding end to end | By hand before releases: a fresh `HOME` with the plugin installed; the agent is asked to "set up brain-wiki"; success means a brain exists, the host is connected, a test search works, and every write was preceded by a dry run |
| Doctor contract | Unit tests on `brain doctor --json` output (problems, recovered runs); no JSON Schema yet |

Automating triggering and onboarding is part of the planned bench `agent`
suite ([proposal](../proposals/consolidation-bench.md#9-the-agent-suite)).

## 6. Alternatives considered

| Option | Why not |
|---|---|
| One skill covering everything | Broad triggers misfire, and the long setup text would load during everyday work. |
| Setup only through a terminal wizard | Users already talk to an agent; the wizard remains for those who do not. |
| Running maintenance inside every session automatically | Costs tokens and attention in sessions meant for other work; maintenance runs when the user asks. |
| Scheduled maintenance (routine templates, a headless consolidation backend) | Built, then removed before 0.1: see [the proposal](../proposals/scheduled-maintenance.md). |
