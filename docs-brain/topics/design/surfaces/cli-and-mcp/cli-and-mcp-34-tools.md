---
id: 01M3250V0070GB0FTC6R338PDM
type: design
title: "Tools"
aliases: ["CLI and MCP §3.4"]
source: "docs/design/cli-and-mcp.md#34-tools"
---
# Tools

Every tool except `brain_list` takes an optional `brain` argument: a brain
this host may use, or its default when omitted. `brain_harvest_done`
refuses a run prepared for another brain. Unknown top-level
arguments are rejected with an error that names them. Every tool returns
structured content and a text rendering.

All tools are closed-world. "Read-only" below means read-only, not
destructive, and idempotent.

| Tool | Annotations | Purpose |
|---|---|---|
| `brain_list` | read-only | Brains this host may use ([[index-and-search-9-other-queries\|index and search §9.1]]) |
| `brain_orient` | read-only | One brain's briefing ([[index-and-search-8-orientation-the-briefing\|index and search §8]]) |
| `brain_search` | read-only | Search or browse with filters and supersession guards ([[index-and-search-6-search\|index and search §6]]) |
| `brain_read` | read-only | A note, topic page, or episode, with handles on every link and backlink ([[index-and-search-7-read\|index and search §7]]) |
| `brain_neighbors` | read-only | Follow a note's links in either direction ([[index-and-search-9-other-queries\|index and search §9.2]]) |
| `brain_validate` | read-only | Check the frontmatter of notes the agent created or edited ([[write-path-23-direct-edits\|write path §2.3]]) |
| `brain_log_episode` | writes, idempotent with `dedupe_key` | Write an episode ([[write-path-21-ways-an-episode-is-written\|write path §2.1]]) |
| `brain_propose_rule` | destructive, not idempotent, needs user interaction | Add or replace a rule after the user confirms ([[write-path-6-rules\|write path §6]]) |
| `brain_consolidate_prepare` | read-only | Pending episodes with candidate notes, and the guidance ([[write-path-43-selecting-and-packaging-work\|write path §4.3]]) |
| `brain_consolidate_done` | writes, not idempotent | Archive the handled episodes as one run ([[write-path-44-archiving-handled-episodes\|write path §4.4]]) |
| `brain_read_origin` | read-only | A bounded window of the conversation an episode came from ([[write-path-46-origin-context\|write path §4.6]]) |
| `brain_harvest_prepare` | writes, not idempotent | Start a harvest of the calling host's sessions ([[write-path-22-harvesting-sessions\|write path §2.2]]) |
| `brain_harvest_done` | writes, idempotent per run | Check each session's outcome and advance the watermarks of those whose notes cite them |

"Writes" means not read-only and not destructive. `brain_propose_rule`
carries `_meta["anthropic/requiresUserInteraction"] = true`.

Capabilities each tool needs:

| Tool | Needs |
|---|---|
| `brain_propose_rule` | `propose_rules` |
| `brain_consolidate_done` | `edit` |
| `brain_read_origin` | `read_origin` |
| `brain_harvest_prepare` | `harvest`, and harvest turned on for the host in the user config |
| `brain_harvest_done` | `edit`, and harvest still turned on for the host |
| Others | Nothing |

Input schemas (JSON Schema 2020-12; output shapes are in
[[index-and-search|index and search]] and [[write-path|write path]]):

```json
{
  "brain_list": {"type": "object", "additionalProperties": false, "properties": {}},

  "brain_orient": {"type": "object", "additionalProperties": false,
    "properties": {"brain": {"type": "string"}}},

  "brain_search": {"type": "object", "additionalProperties": false,
    "properties": {
      "query":  {"type": "string", "maxLength": 500, "default": "",
                 "description": "Keywords; empty to browse within the filters."},
      "limit":  {"type": "integer", "minimum": 1, "maximum": 50, "default": 8},
      "topic":  {"type": "array", "items": {"type": "string"}},
      "type":   {"type": "array", "items": {"type": "string"}},
      "tag":    {"type": "array", "items": {"type": "string"}},
      "where":  {"type": "object", "additionalProperties": {"type": "string"}},
      "since":  {"type": "string", "description": "Date (YYYY-MM-DD) or 7d, 4w, 3m."},
      "until":  {"type": "string"},
      "sort":   {"enum": ["relevance", "recent"]},
      "cursor": {"type": "string"},
      "count_only": {"type": "boolean", "default": false},
      "facets": {"type": "boolean", "default": false},
      "format": {"enum": ["text", "paths"], "default": "text"},
      "include_episodes": {"type": "boolean", "description": "Default: on for a query, off when browsing."},
      "include_archived": {"type": "boolean", "default": false},
      "brain":  {"type": "string"}}},

  "brain_neighbors": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":    {"type": "string", "description": "id, path, file name, alias, or title"},
      "direction": {"enum": ["out", "in", "both"], "default": "both"},
      "depth":     {"type": "integer", "minimum": 1, "maximum": 3, "default": 1},
      "limit":     {"type": "integer", "minimum": 1, "maximum": 100, "default": 30},
      "brain":     {"type": "string"}}},

  "brain_validate": {"type": "object", "additionalProperties": false,
    "properties": {
      "paths": {"type": "array", "items": {"type": "string"}, "maxItems": 100, "default": [],
                "description": "Brain-relative paths you created or edited; empty checks the notes git sees as changed (every note without git)."},
      "brain": {"type": "string"}}},

  "brain_read": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":  {"type": "string", "description": "id, path, file name, alias, or title"},
      "mode":    {"enum": ["outline", "full", "section", "raw"]},
      "section": {"type": "string"},
      "brain":   {"type": "string"}}},

  "brain_log_episode": {"type": "object", "additionalProperties": false, "required": ["summary"],
    "properties": {
      "summary":        {"type": "string", "minLength": 1, "maxLength": 20000,
                         "description": "What happened and what was learned, in Markdown."},
      "claims":         {"type": "array", "maxItems": 50, "items": {"type": "string", "maxLength": 500}},
      "open_questions": {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
      "topics":         {"type": "array", "maxItems": 5, "items": {"type": "string", "maxLength": 100}},
      "dedupe_key":     {"type": "string", "maxLength": 200},
      "session":        {"type": "string", "pattern": "^[A-Za-z0-9._:-]{1,200}$",
                         "description": "Host session id this episode summarizes, if known (recorded as a hint)."},
      "origin_turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$"},
      "pattern":        {"enum": ["record", "playbook", "file", "distill"],
                         "description": "The agent's guess at how to consolidate it (a hint)."},
      "brain":          {"type": "string"}}},

  "brain_propose_rule": {"type": "object", "additionalProperties": false, "required": ["text", "user_quote"],
    "properties": {
      "text":       {"type": "string", "minLength": 1, "maxLength": 300},
      "user_quote": {"type": "string", "minLength": 1, "maxLength": 500,
                     "description": "The user's exact words asking for this rule."},
      "replaces":   {"type": "string", "pattern": "^r-[0-9A-HJKMNP-TV-Z]{26}$"},
      "brain":      {"type": "string"}}},

  "brain_consolidate_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "topic":        {"type": "string"},
      "max_episodes": {"type": "integer", "minimum": 1, "maximum": 100},
      "agents":       {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 64},
                       "description": "Also take these agents' episodes, only when the user asked."},
      "unowned":      {"type": "boolean"},
      "all":          {"type": "boolean"},
      "brain":        {"type": "string"}}},

  "brain_consolidate_done": {"type": "object", "additionalProperties": false, "required": ["episodes"],
    "properties": {
      "episodes": {"type": "array", "minItems": 1, "maxItems": 200,
                   "items": {"anyOf": [
                     {"type": "object", "required": ["episode", "pattern"],
                      "properties": {
                        "episode": {"type": "string"},
                        "pattern": {"enum": ["record", "playbook", "file", "distill", "skip"]},
                        "notes":   {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
                        "reason":  {"type": "string", "maxLength": 200}}},
                     {"type": "string"}]},
                   "description": "One outcome per episode; a plain path or id records no outcome."},
      "brain":    {"type": "string"}}},

  "brain_read_origin": {"type": "object", "additionalProperties": false, "required": ["episode"],
    "properties": {
      "episode": {"type": "string", "description": "Episode id or path."},
      "turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$",
                  "description": "Turn range; default: the episode's range plus context."},
      "brain":   {"type": "string"}}},

  "brain_harvest_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "since":        {"type": "string", "pattern": "^[0-9]+[hdw]$", "default": "7d"},
      "max_sessions": {"type": "integer", "minimum": 1, "maximum": 50, "default": 10},
      "project":      {"type": "string", "description": "Only sessions whose working directory is under this path."},
      "brain":        {"type": "string"}}},

  "brain_harvest_done": {"type": "object", "additionalProperties": false, "required": ["run", "sessions"],
    "properties": {
      "run":      {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "sessions": {"type": "array", "maxItems": 50, "items": {
        "type": "object", "required": ["session", "pattern"],
        "properties": {
          "session": {"type": "string", "pattern": "^S[0-9]+$", "description": "Handle from the packet."},
          "pattern": {"enum": ["record", "playbook", "file", "distill", "skip"]},
          "notes":   {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "reason":  {"type": "string", "maxLength": 200}}}},
      "brain":    {"type": "string"}}}
}
```

Notes:

- Unknown fields inside a `brain_harvest_done` or `brain_consolidate_done`
  item are dropped, not rejected. Only top-level arguments are checked.
- `brain_log_episode` builds the episode body from `summary`, `claims`,
  and `open_questions`. Claims become a `## Claims` list, plain text that
  nothing parses later. The server sets the provenance fields
  (`bw-origin: agent`, `bw-captured: mcp`, `bw-inputs: unknown`, the host as
  agent), never the arguments
  ([[write-path-3-provenance-and-inputs|write path §3]]). `pattern` is
  stored as `bw-pattern`.
- `session` and `origin_turns` on `brain_log_episode` are hints from the
  model. The episode records them. In a harvest packet, by contrast, the
  session URL, turn range, and inputs come from the server's own parse of
  the session.
- `brain_propose_rule` asks the user through elicitation when the client
  offers it. A confirmed rule is added as a run, and a declined one writes
  nothing. Without a way to ask (including Antigravity, which declines
  every request unseen, T-8), the rule is saved as a proposal for
  `brain rules accept`.
- `brain_validate` writes nothing and needs no capability: any agent may
  check files. It returns the lint result (`problems`, counts) plus
  `checked`, the paths it checked (`null` for the whole brain).
- The packet tools return the guidance and packet as text, and counts as
  structured content: `{episodes, pending, notes}` for consolidation,
  `{run, sessions, remaining}` for harvest. No MCP tool writes a note; the
  agent edits notes with its own file tools.
- `brain_consolidate_done` returns `{run, archived}`, and its text gives
  the run's summary ("archived 3 episodes: 1 file, 1 playbook, 1 skip").
  A note that does not cite its episode fails the call with `usage` and
  archives nothing. `brain undo RUN` puts the episodes back.
- With nothing of the caller's pending, `brain_consolidate_prepare` returns
  `{episodes: 0}` and names whose episodes are waiting.
- `brain_harvest_done` records the sessions that pass and lists the
  problems for the rest, which stay unharvested. It fails with `usage` only
  when nothing was recorded.
