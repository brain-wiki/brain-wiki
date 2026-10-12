---
id: 01M3250V00CAAXHAZS4PT3K42E
type: guide
title: "Create a brain"
tags: [user-guide]
source: "docs/user/getting-started.md#create-a-brain"
---
# Create a brain

```sh
brain init ~/brains/personal --name personal
```

Keep brains outside code repositories. A brain is an ordinary folder: put it
under git (recommended), or in a synced folder.

```text
~/brains/personal/
├── brain.toml          settings that travel with the brain
├── AGENTS.md           how agents that only read files should use it
├── rules.md            your standing rules, loaded into every session
├── log.md              a readable history of changes brain-wiki made
├── topics/<topic>/     curated notes; each topic has a hub (index.md)
├── inbox/episodes/     raw observations from agents and from you
├── archive/            consolidated episodes, kept as provenance
└── reports/            generated pages: contradictions, stale notes, lint
```

Already have notes? See [[user-import|Import]] to adopt an Obsidian vault in
place.

## Relations
- part_of [[user-getting-started]]
