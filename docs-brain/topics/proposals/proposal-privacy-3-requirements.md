---
id: 01M3250V00PNCRGN5Q230BC7K9
type: proposal
title: "Requirements (Privacy)"
tags: [proposals]
source: "docs/proposals/privacy.md#3-requirements"
---
# Requirements (Privacy)

| # | Requirement | Why |
|---|---|---|
| P1 | Only the owner sets or changes privacy. Agents never do, in either direction. | Agents cannot know what the owner considers sensitive, and a manipulated agent should not be able to hide or expose a topic. |
| P2 | A level is defined by the sinks it allows (§2), not by an abstract degree of sensitivity. | So every level answers "may a model read this, may it go to a tool, may it end up in an output". |
| P3 | brain-wiki enforces a level where it controls the flow, and tells the host where it does not. | It controls its tools, hooks, packets, writes, and exports; it does not control the host's model or tool calls. |
| P4 | Nothing an agent writes moves content to a less private place. | Consolidation, harvest, and checked edits would otherwise launder private facts into open notes. |
| P5 | The level is visible where the owner reads: in the topic's `index.md` frontmatter. | One place to look, shown in Obsidian, carried along when the folder moves. |
| P6 | With no settings, a brain behaves as it does today. | Privacy is opt-in; most brains never need it. |
| P7 | An unknown host or backend gets only open content. | Trust is granted, never assumed. |
