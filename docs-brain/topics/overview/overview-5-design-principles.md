---
id: 01M3250V00PHFKJRPS75FWCZRS
type: design
title: "Design principles"
aliases: ["Overview §5"]
source: "docs/design/overview.md#5-design-principles"
---
# Design principles

1. Files are the API. Everything else depends on the on-disk format. The index, MCP server, plugins, and visualizer are views over it, and each can be rebuilt or replaced.
2. Check edits, and guard only what steers every session. An agent with file access edits files anyway, so direct edits are allowed: `brain validate` checks them, git records them, and lint catches what slips through. Rules load into every session, so they still need the user's own words.
3. The engine checks and the model writes. Everything that must be correct is deterministic code: parsing, validation, budgets, episode provenance, and undo. The model writes notes as Markdown. The engine reads frontmatter, headings, and links, and never extracts meaning from the body.
4. Change is part of the format. Supersession is metadata with a retrieval rule, not prose.
5. A small core with optional parts. The core is the format, the index, the CLI, and the MCP server. Plugins, the visualizer, the bench, and importers depend on the core, never the other way round.
6. Boring technology: Markdown, YAML frontmatter, TOML, SQLite, git, and Python. Anything new needs a reason the boring option failed.
7. Respect the user's other tools. Obsidian, git, and sync tools see a normal folder, and brain-wiki keeps no state in the brain that those tools would damage.
