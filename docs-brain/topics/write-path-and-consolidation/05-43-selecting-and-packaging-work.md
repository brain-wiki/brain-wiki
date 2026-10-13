---
id: 01M3250V00AT39C0D1GZJFG26H
type: design
title: "Selecting and packaging work"
aliases: ["05 §4.3"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#43-selecting-and-packaging-work"
bw-part_of:
  - "[[05-4-consolidation]]"
---
# Selecting and packaging work

**Selection.** Pending episodes (everything under `inbox/episodes/` and
`inbox/agents/`), oldest first, up to `max_episodes_per_run`. The backend's
model provider sees every episode and candidate note in the packet; keeping
a body of notes away from a cloud model means keeping it in a separate
brain ([[privacy|16]]).

**Grouping.** For each episode, the engine finds candidate notes:
topic hints, then an FTS query over the episode text (top 5), then the
hubs of candidate topics. Episodes with overlapping candidates form one
packet; packets are cut to a token budget (default 30k tokens for
`command`; 15k for `agent`, because hosts cap tool results, for example
Claude Code at 25k tokens by default; the tool raises its own cap with
`_meta["anthropic/maxResultSizeChars"]` where supported). Leftover episodes wait for the next run.

**Packet.** A JSON document that is the complete input to the LLM.
Handles replace paths and ids so models never copy long identifiers:

```json
{
  "run": "run-01JA0D7F9G1H3J5K7M9N1P3Q5R",
  "brain": "personal",
  "instructions_version": 1,
  "limits": {"max_ops": 60, "claim_max_chars": 500},
  "relations": ["part_of", "has_part", "depends_on", "enables",
                "conflicts_with", "supersedes", "superseded_by", "related_to"],
  "topics": [
    {"slug": "search", "title": "Search", "description": "…", "hub": "N1",
     "notes": ["N2", "N3"]}
  ],
  "notes": [
    {"handle": "N2", "path": "topics/search/fts5.md",
     "title": "Use SQLite FTS5 for local search", "type": "decision", "status": "active",
     "summary": "first paragraph of prose",
     "claims": [{"handle": "C1", "text": "SQLite FTS5 is the default search backend.",
                 "status": "active", "sources": 1}],
     "relations": [{"verb": "part_of", "target": "N1"}],
     "hash": "sha256:…"}
  ],
  "episodes": [
    {"handle": "E1", "agent": "claude-code", "created": "2026-10-10T19:22:11Z",
     "origin": "agent", "taint": "unknown", "candidates": ["N2"],
     "origin_available": true,
     "lines": ["1| Switched the search path to FTS5 after …", "2| …"]}
  ]
}
```

Episode `lines` are numbered exactly as in the file body, so a citation
`E1#L3-L4` maps to a real span. Note `hash` values pin the version the
proposal was made against (§7.3).
