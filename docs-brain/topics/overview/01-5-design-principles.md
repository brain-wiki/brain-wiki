---
id: 01M3250V00W39KXR0HPKV80R76
type: design
title: "Design principles"
aliases: ["01 §5"]
source: "docs/design/01-overview.md#5-design-principles"
---
# Design principles

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
