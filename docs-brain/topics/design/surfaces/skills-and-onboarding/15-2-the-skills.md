---
id: 01M3250V00XMBAFECBHG44KPY6
type: design
title: "The skills (Skills and onboarding)"
aliases: ["15 §2"]
source: "docs/design/15-skills-and-onboarding.md#2-the-skills"
---
# The skills (Skills and onboarding)

The plugin ships three skills under `skills/`, all conforming to the Agent
Skills specification (name matches its folder, description under 1,024
characters, body under 500 lines, details in `references/` loaded on
demand, no host-specific frontmatter keys).

| Skill | Purpose | Loaded when |
|---|---|---|
| `brain` | Everyday use: recall, read supersession warnings, write knowledge by editing notes directly and validating them, log what has no place yet, propose rules only on request | Questions about past work, preferences, decisions; "remember…"; end of meaningful work |
| `brain-setup` | Onboarding and reconfiguration: install, create or adopt a brain, connect agents, permissions, harvest, a commit job for git brains | "Set up / install / connect / import brain-wiki"; or brain-wiki reports it is not configured |
| `brain-maintain` | Upkeep: harvest, fold the inbox into notes with the consolidation helper, review rule proposals, lint and reports, commit direct edits, undo a run | "Consolidate / harvest / clean up / review / check / commit my brain" |

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
> user says "remember" by editing or creating notes directly, then run
> brain_validate on what changed. Prefer current notes over superseded
> ones. Never write rules unless the user explicitly asks.

> **brain-setup**: Set up, connect, or reconfigure brain-wiki: install the
> CLI, create a brain or adopt an existing Obsidian or Markdown vault,
> connect other agents (Claude Code, Codex, Antigravity, OpenClaw, Cursor),
> choose which agents see which brain and what each may do, turn on
> harvest, and schedule commits for a git brain. Use when the user asks to install, set up, onboard, connect, or
> import brain-wiki, or when brain-wiki says it is not configured.

> **brain-maintain**: Maintain a brain-wiki brain: harvest recent agent
> sessions into the inbox, fold pending episodes into notes, review rule
> proposals, check health (lint, stale links, orphans), commit direct edits
> to git, and undo a bad run. Use when the user asks to consolidate,
> harvest, clean up, review, check, or commit their brain.

**Layout:**

```text
skills/
├── brain/
│   ├── SKILL.md
│   └── references/format.md            frontmatter fields, body conventions, episode sections (for hand edits)
├── brain-setup/
│   ├── SKILL.md                        the onboarding flow (§3)
│   └── references/
│       ├── hosts.md                    per-host connect and permission notes
│       └── privacy.md                  separate brains and profiles, in plain words
└── brain-maintain/
    ├── SKILL.md
    └── references/
        ├── consolidate.md              the consolidation guidance (from assets/prompts/consolidate.md)
        └── harvest.md                  the harvest recipe and the self-read fallback
```

The instruction texts are generated from the same
sources the engine uses (`brainwiki/assets/`), so the skill and the CLI can
never disagree. `scripts/sync_versions.py` regenerates them at release.
