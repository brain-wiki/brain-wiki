---
id: 01M3250V0055R548VPK0SHEFWC
type: design
title: "Selecting and packaging work"
aliases: ["Write path §4.3"]
source: "docs/design/write-path.md#43-selecting-and-packaging-work"
---
# Selecting and packaging work

`brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST]…
[--unowned] [--all] [--out FILE]` (MCP `brain_consolidate_prepare {topic,
max_episodes, agents, unowned, all}`) needs no capability. It rescans the
brain first.

Selection:

- Pending episodes are everything under `inbox/episodes/` and
  `inbox/agents/`. Episodes with an empty body are skipped.
- An episode's owner is its `bw-agent`; a file in `inbox/agents/<agent>/`
  belongs to that agent. An episode without one (written by hand, or by the
  user or an import in earlier versions) is unowned. brain-wiki cannot tell
  a file written by hand from one written on another machine, and profiles
  are not a security boundary ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]),
  so ownership is what the file says.
- A host (MCP, or `--as HOST`) gets its own episodes: first those whose
  conversation is on this machine (the host's session reader finds the
  transcript), then the rest, each group oldest first. No device name is
  configured; a renamed or replaced machine needs nothing.
- `agents`, `unowned`, and `all` add other agents' episodes, the unowned
  ones, or everything, after the host's own. The guidance and the tool
  description say to pass them only when the user asked ("take Cursor's
  episodes too"); the request is the consent, and there is no confirmation
  step, which could not stop an agent that reads the files anyway.
- The user's own CLI, without `--as`, gets every pending episode, or only
  the ones `--agent` and `--unowned` name.
- The packet holds up to `--max-episodes` (default `[consolidate]
  max_episodes_per_run`, 50; MCP allows 1 to 100) within a budget of about
  15k tokens, because hosts cap tool results. The first episode is always
  included. The MCP tool raises Claude Code's cap with
  `_meta["anthropic/maxResultSizeChars"]`.
- `--topic` keeps episodes whose topic hints include T. An unknown topic is
  `not_found`.
- Leftover episodes wait for the next round. `not_included` in the packet
  counts the pending episodes of owners outside the scope, with the oldest
  one's date, so the agent can tell the user who else is waiting. With
  nothing in scope, prepare says the same in text: "Nothing of yours to
  consolidate. Pending: cursor 12 (oldest 2026-10-07)."

The model the agent runs on sees every episode and candidate note in the
packet. Keeping notes away from a cloud model means keeping them in a
separate brain ([[proposal-privacy|privacy proposal]]).

Candidates for each episode are the hubs of its hinted topics, then up to 5
notes or hubs found by an FTS query over the episode's 12 most frequent
words. Archived notes are excluded.

The packet is JSON with brain-relative paths. The guidance comes before it:

```json
{
  "brain": "personal",
  "root": "/home/me/brains/personal",
  "scope": {"agent": "claude-code", "agents": [], "unowned": false, "all": false},
  "pending": 9,
  "episodes": [
    {"path": "inbox/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "archive_to": "archive/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "agent": "claude-code", "created": "2026-10-10T19:22:11Z",
     "inputs": "unknown", "session_inputs": "local", "topics": ["search"],
     "candidates": ["topics/search/index.md", "topics/search/fts5.md"],
     "origin_available": true, "pattern": "file",
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
  ],
  "not_included": {"cursor": {"count": 12, "oldest": "2026-10-07"}}
}
```

- Each note appears once, with its summary (the first paragraph, at most
  600 characters), so the agent can decide which to open in full. A topic
  entry has `parent` when the topic is nested.
- `origin_available` is true when the transcript was found on this
  machine.
- `session_inputs` is brain-wiki's own reading of that transcript (as
  harvest computes inputs, §3.2), given when the episode's `inputs` is not
  `local`. An MCP episode is always `inputs: unknown`, because the server
  cannot see the session; the transcript can. An episode is marked
  `"untrusted": true` unless one of the two is `local`.
- `pattern` is the capturing agent's hint (§2.1).
