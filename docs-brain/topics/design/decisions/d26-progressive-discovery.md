---
id: 01M3250V00HBK8146VTY5KZRZ6
type: decision
title: "D26: Progressive discovery"
aliases: ["D26"]
source: "docs/decision/d26-progressive-discovery.md"
---
# D26: Progressive discovery

Status: accepted.
Argued in: [[index-and-search-6-search|index and search §6–§9]], [[cli-and-mcp-34-tools|CLI and MCP §3.4]].

Agents explore a brain step by step, with a few general tools:

1. `brain_list` names the brains.
2. `brain_orient` briefs on one.
3. `brain_search` finds entry points; an empty query browses.
4. `brain_read` opens a note, and its outline lists the note's links.
5. `brain_neighbors` follows links.

The tools borrow the Obsidian CLI's conventions: targets written like wikilinks or exactly, counts and facets before fetching, and a `paths` output. The CLI has the same commands (`brain search`, `brain read --mode outline`, `brain neighbors`) plus small listings: `links`, `backlinks`, `tags`, `types`, `orphans`, and `unresolved`.

### Alternatives considered

- One tool per question. Every tool description costs context.
- Search only.
