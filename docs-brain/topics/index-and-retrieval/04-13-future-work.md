---
id: 01M3250V00VHK8CV3R1QA70AT2
type: design
title: "Future work"
aliases: ["04 §13"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#13-future-work"
---
# Future work

- **Embeddings.** Optional `sqlite-vec` table, local embedding model,
  reciprocal-rank fusion with the lexical score. Guards and privacy apply
  the same way.
- **File watcher.** An optional watcher in long-running processes (MCP
  server, `brain viz`) to replace polling on very large brains.
- **Cross-brain search.** For profiles allowed to read several brains;
  each brain's results stay labeled with its name.

## Relations
- part_of [[index-and-retrieval]]
