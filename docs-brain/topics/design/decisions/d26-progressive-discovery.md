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

The tools follow progressive discovery (list, orient, search or browse, read with handles, follow links with `brain_neighbors`) and borrow the Obsidian CLI's conventions: wikilink-style or exact targets, counts and facets before fetching, `paths` output. The CLI mirrors them: `brain search` (an empty query browses), `brain read --mode outline`, `brain neighbors`, and small listings (`links`, `backlinks`, `tags`, `types`, `orphans`, `unresolved`).

### Alternatives considered

One tool per question (every tool description costs context); search only
