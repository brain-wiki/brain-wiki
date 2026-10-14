---
id: 01M3250V00W39KXR0HPKV80R76
type: design
title: "Design principles"
aliases: ["01 §5"]
tags: [overview]
source: "docs/design/01-overview.md#5-design-principles"
bw-part_of:
  - "[[overview]]"
---
# Design principles

1. **Files are the API.** The on-disk format is the contract. Every other
   component (index, MCP, plugins, visualizer) is a view over it and can be
   rebuilt or replaced.
2. **The write path is the security boundary.** We cannot stop an agent
   with file access from editing files. We can make the sanctioned paths
   safe, make every curated change attributable and reversible, and make
   lint catch what bypasses them.
3. **The engine decides; the LLM proposes.** Everything that must be
   correct (parsing, validation, budgets, provenance, undo) is deterministic
   code. The LLM only produces structured proposals that the engine accepts
   or rejects.
4. **Change is first-class.** Supersession and contradiction are typed
   relations with retrieval rules, not prose.
5. **Small core, optional edges.** The core is format + index + CLI + MCP.
   Plugins, the visualizer, the bench, and importers depend on the
   core, never the other way round.
6. **Boring technology.** Markdown, YAML frontmatter, TOML, SQLite, git,
   Python. Novelty needs a reason that the boring option failed.
7. **Respect the user's other tools.** Obsidian, git, and sync tools see a
   normal folder. brain-wiki does not hide state in the brain that those
   tools would mangle.
