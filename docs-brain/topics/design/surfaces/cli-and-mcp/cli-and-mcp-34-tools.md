---
id: 01M3250V0070GB0FTC6R338PDM
type: design
title: "Tools"
aliases: ["CLI and MCP §3.4"]
source: "docs/design/cli-and-mcp.md#34-tools"
---
# Tools

All tools except `brain_list` and `brain_harvest_apply` (which takes the run
from `brain_harvest_prepare`) accept an optional `brain` argument (a brain
name allowed for this host). Unknown arguments are rejected. All return structured content plus a text rendering.

| Tool | Annotations | Purpose |
|---|---|---|
| `brain_list` | read-only, idempotent, closed-world | Brains this host may use ([[index-and-search-91-brain-list\|index and search §9.1]]) |
| `brain_orient` | read-only, idempotent, closed-world | One brain's briefing ([[index-and-search-8-orientation-the-briefing\|index and search §8]]) |
| `brain_search` | read-only, idempotent, closed-world | Search or browse with filters and supersession guards ([[index-and-search-6-search\|index and search §6]]) |
| `brain_read` | read-only, idempotent, closed-world | Read a note, hub, or episode, with handles on every link and backlink ([[index-and-search-7-read\|index and search §7]]) |
| `brain_neighbors` | read-only, idempotent, closed-world | Follow a note's links in either direction ([[index-and-search-92-neighbors\|index and search §9.2]]) |
| `brain_validate` | read-only, idempotent, closed-world | Check the frontmatter of notes the agent created or edited; needs no capability ([[write-path-23-direct-edits\|write path §2.3]]) |
| `brain_log_episode` | not read-only, not destructive, idempotent (with `dedupe_key`), closed-world | Write an episode ([[write-path-21-ways-an-episode-is-written\|write path §2.1]]) |
| `brain_propose_rule` | destructive, not idempotent, closed-world; `_meta["anthropic/requiresUserInteraction"] = true` | Add or replace a rule with user confirmation ([[write-path-6-rules\|write path §6]]) |
| `brain_consolidate_prepare` | read-only, idempotent, closed-world | Gather pending episodes with candidate notes; returns the guidance and the packet ([[write-path-43-selecting-and-packaging-work\|write path §4.3]]) |
| `brain_consolidate_done` | not read-only, not destructive (reversible), not idempotent, closed-world | Archive the episodes the agent handled as one run; requires `edit` ([[write-path-44-archiving-handled-episodes\|write path §4.4]]) |
| `brain_read_origin` | read-only, idempotent, closed-world | Read a bounded window of the conversation an episode came from; requires `read_origin` ([[write-path-46-origin-context\|write path §4.6]]) |
| `brain_harvest_prepare` | not read-only, not destructive, closed-world | Start an agent-backend harvest of the calling host's sessions; returns instructions and a packet of condensed, scrubbed turns; requires `harvest` ([[write-path-22-harvesting-sessions\|write path §2.2]]) |
| `brain_harvest_apply` | not read-only, not destructive, idempotent per run, closed-world | Validate the agent's per-session results and write episodes with server-set provenance |

Input schemas (JSON Schema 2020-12; output schemas follow the result shapes
in 04 and 05):

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
      "brain":        {"type": "string"}}},

  "brain_consolidate_done": {"type": "object", "additionalProperties": false, "required": ["episodes"],
    "properties": {
      "episodes": {"type": "array", "minItems": 1, "maxItems": 200, "items": {"type": "string"},
                   "description": "Episode paths (inbox/...) or ids, as brain_consolidate_prepare listed them."},
      "brain":    {"type": "string"}}},

  "brain_read_origin": {"type": "object", "additionalProperties": false, "required": ["episode"],
    "properties": {
      "episode":             {"type": "string", "description": "Episode id or path."},
      "turns":               {"type": "string", "pattern": "^[0-9]+-[0-9]+$",
                              "description": "Turn range; default: the episode's range plus context."},
      "brain":               {"type": "string"}}},

  "brain_harvest_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "since":        {"type": "string", "pattern": "^[0-9]+[hdw]$", "default": "7d"},
      "max_sessions": {"type": "integer", "minimum": 1, "maximum": 50, "default": 10},
      "project":      {"type": "string", "description": "Only sessions whose working directory is under this path."},
      "brain":        {"type": "string"}}},

  "brain_harvest_apply": {"type": "object", "additionalProperties": false, "required": ["run", "sessions"],
    "properties": {
      "run":      {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "sessions": {"type": "array", "maxItems": 50, "items": {
        "type": "object", "additionalProperties": false, "required": ["session"],
        "properties": {
          "session":           {"type": "string", "pattern": "^S[0-9]+$", "description": "Handle from the packet."},
          "skip":              {"type": "boolean", "default": false},
          "reason":            {"type": "string", "maxLength": 200},
          "summary":           {"type": "string", "maxLength": 20000},
          "claims":            {"type": "array", "maxItems": 50, "items": {
                                  "type": "object", "required": ["text", "turns"],
                                  "properties": {"text":  {"type": "string", "maxLength": 500},
                                                 "turns": {"type": "string", "pattern": "^[0-9]+-[0-9]+$"}}}},
          "negative_findings": {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "open_questions":    {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "topics":            {"type": "array", "maxItems": 5, "items": {"type": "string", "maxLength": 100}}}}}}}
}
```

Notes:

- `brain_log_episode` assembles the episode body from `summary`, `claims`,
  and `open_questions`; `claims` become a `## Claims` list in the body,
  plain text that nothing parses later. The provenance fields are set by
  the server, never by arguments ([[write-path-3-provenance-and-inputs|write path §3]]).
- `session` and `origin_turns` on `brain_log_episode` are hints from the
  model (used by the fallback harvest recipe); the episode records them but
  keeps `bw-captured: mcp` and `bw-inputs: unknown`. In `brain_harvest_apply`, by
  contrast, every provenance field comes from the server's own parse of the
  session.
- `brain_validate` writes nothing and checks no capability: any agent may
  check files. It returns the lint result (`problems`, counts) plus
  `checked`, the paths it checked (`null` for the whole brain).
- `brain_consolidate_prepare` returns the guidance and packet as text and
  counts (`episodes`, `pending`, `notes`) as structured content. Notes are
  edited with the agent's own file tools; no MCP tool writes a note.
- `brain_consolidate_done` returns `{run, archived}`; `brain undo RUN` puts
  the episodes back.
