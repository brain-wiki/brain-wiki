---
id: 01M3250V00NTAYK7CSP5KHWAHQ
type: design
title: "Non-goals"
aliases: ["Overview §4"]
source: "docs/design/overview.md#4-non-goals"
---
# Non-goals

- A hosted service or collaboration between people. A brain belongs to one person, who shares it through their own sync, such as git or a cloud drive.
- Remote MCP for chat apps such as ChatGPT, claude.ai, or the Gemini app. The design is a [[proposal-remote-mcp|proposal]] and is not built.
- A model client inside brain-wiki. Consolidation, harvest, and import go through the host agent, and a scheduled consolidation starts an agent CLI the user already has (D8).
- Unattended maintenance by default. Harvest and consolidation run when the user asks; a schedule runs only if the user installs one with `brain schedule`, per brain and host ([[d37-per-agent-consolidation|D37]]).
- Required embeddings. Search is lexical (SQLite FTS5) plus the supersession guard. Vector search is an [[ideas|idea]].
- Remote storage backends. A brain is a local folder, optionally a git repository, and `brain commit` can fetch from and push to its `origin`. Managed git remotes and object storage are a [[proposal-remote-sync|proposal]].
- Web ingestion and importers for email or chat. Importers cover Markdown folders, including Obsidian vaults, and hosts' own memory files.
- Encryption. The [[security-and-privacy|security]] design documents recipes only.
- Replacing Obsidian or any editor.
