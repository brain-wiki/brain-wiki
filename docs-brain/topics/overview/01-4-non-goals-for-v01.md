---
id: 01M3250V00P1JYW0NK5TDVNCFG
type: design
title: "Non-goals for v0.1"
aliases: ["01 §4"]
tags: [overview]
source: "docs/design/01-overview.md#4-non-goals-for-v01"
---
# Non-goals for v0.1

- **Hosted service or multi-user collaboration.** A brain belongs to one
  person. Sharing happens through the user's own sync (git, a cloud drive).
- **Remote MCP for chat apps** (ChatGPT web, claude.ai, the Gemini app). The
  design is a [[proposal-remote-mcp|proposal]]; the implementation is
  not in v0.1.
- **Built-in LLM API clients.** Consolidation goes through the host agent.
  A direct-API backend is a later addition behind the same interface.
- **Scheduled maintenance.** Harvest and consolidation run when the user
  asks; the scheduled version was removed before 0.1
  ([[proposal-scheduled-maintenance|proposal]]).
- **Required embeddings.** Search is lexical (SQLite FTS5) plus graph
  expansion. Vector search is an optional later addition.
- **Remote storage backends.** v0.1 supports a local directory, optionally a
  git repo. Private git remotes and object storage (GCS, S3 via fsspec) are
  designed in a [[proposal-remote-sync|proposal]] but not built.
- **Automatic web ingestion, email or chat importers.** Importers in v0.1
  cover existing Markdown folders (including Obsidian vaults) only.
- **Encryption.** Documented recipes only ([[security-and-privacy|10]]).
- **A replacement for Obsidian or any editor.**
