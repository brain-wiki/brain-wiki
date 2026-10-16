---
id: 01M3250V0065XR26HNE1WHPDD3
type: design
title: "The skills (Skills and onboarding)"
aliases: ["Skills and onboarding §2"]
source: "docs/design/skills-and-onboarding.md#2-the-skills"
---
# The skills (Skills and onboarding)

The plugin ships three skills under `skills/`
([[d22-three-skills|D22]]):

| Skill | Purpose | Loaded when |
|---|---|---|
| `brain` | Everyday use: recall, read supersession warnings, edit and validate notes, log what has no place yet, propose rules only on request | Questions about past work, preferences, or decisions; "remember…"; the end of meaningful work |
| `brain-setup` | Onboarding and reconfiguration: install, create or adopt a brain, connect agents, permissions, harvest, a commit job | "Set up / install / connect / import brain-wiki", or brain-wiki reports it is not configured |
| `brain-maintain` | Upkeep: harvest, consolidation, rule proposals, lint and reports, commit, undo | "Consolidate / harvest / clean up / review / check / commit my brain" |

Each skill's `description` in its `SKILL.md` frontmatter is the trigger
text. It says first what the skill does, then when to use it.

Every skill follows the Agent Skills specification, and
`tests/test_plugin.py` checks it:

- the frontmatter holds only `name` and `description`;
- `name` matches the folder and is lowercase words joined by hyphens;
- the description is under 1,024 characters;
- the body is under 500 lines;
- every relative link in the body points to a file that exists.

Hosts load every skill's name and description up front (about 100 tokens
each) and the body only when the skill triggers. Three small skills with
distinct trigger phrases match the user's intent better than one broad
skill, and the long setup text never loads during everyday work. Hosts
that turn skills into slash commands (Claude Code plugins as
`/brain-wiki:brain-setup`, Antigravity as `/brain-setup`) get three
commands.

```text
skills/
├── brain/
│   ├── SKILL.md
│   └── references/format.md        frontmatter fields, body conventions, episode sections
├── brain-setup/
│   ├── SKILL.md                    the onboarding flow (§3)
│   └── references/
│       ├── hosts.md                per-host connect and permission notes
│       └── privacy.md              separate brains and profiles, in plain words
└── brain-maintain/
    ├── SKILL.md
    └── references/
        ├── consolidate.md          the consolidation guidance
        └── harvest.md              the harvest recipe and the self-read fallback
```

`consolidate.md` and `harvest.md` are generated from
`src/brainwiki/assets/prompts/` by `scripts/sync_versions.py`, so the skill
and the engine give agents the same text. CI runs the script with
`--check`. The other references are written by hand.
