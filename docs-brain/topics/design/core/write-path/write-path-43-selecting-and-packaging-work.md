---
id: 01M3250V0055R548VPK0SHEFWC
type: design
title: "Selecting and packaging work"
aliases: ["Write path §4.3"]
source: "docs/design/write-path.md#43-selecting-and-packaging-work"
---
# Selecting and packaging work

`brain consolidate --prepare [--topic T] [--max-episodes N] [--out FILE]`
(MCP `brain_consolidate_prepare {topic, max_episodes}`) needs no capability.

**Selection.** Pending episodes (everything under `inbox/episodes/` and
`inbox/agents/`), oldest first, up to `--max-episodes` (default `[consolidate]
max_episodes_per_run`, 50) and a budget of about 15k tokens, because hosts
cap tool results (Claude Code at 25k tokens by default; the tool raises its
own cap with `_meta["anthropic/maxResultSizeChars"]` where supported). The
first episode is always included. `--topic` keeps episodes whose topic hints
include T. Leftover episodes wait for the next round. The model the agent
runs on sees every episode and candidate note in the packet; keeping a body
of notes away from a cloud model means keeping it in a separate brain
([[proposal-privacy|privacy proposal]]).

**Candidates.** For each episode: the hubs of its hinted topics, then up to
5 notes or hubs found by an FTS query over the episode's most frequent
words (archived notes excluded).

**Packet.** A JSON document with brain-relative paths; the guidance comes
before it:

```json
{
  "brain": "personal",
  "root": "/home/me/brains/personal",
  "pending": 9,
  "episodes": [
    {"path": "inbox/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "archive_to": "archive/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "agent": "claude-code", "created": "2026-10-10T19:22:11Z",
     "inputs": "unknown", "untrusted": true, "topics": ["search"],
     "candidates": ["topics/search/index.md", "topics/search/fts5.md"],
     "origin_available": true,
     "text": "Switched Lumen's search path to FTS5 after …"}
  ],
  "notes": [
    {"path": "topics/search/fts5.md", "title": "Use SQLite FTS5 for local search",
     "type": "decision", "status": "active",
     "summary": "Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep."}
  ],
  "topics": [
    {"slug": "search", "path": "topics/search", "title": "Search",
     "description": "How local search works and why."}
  ]
}
```

Notes appear once, with their summary (the first paragraph), so the agent
can decide which to open in full.
