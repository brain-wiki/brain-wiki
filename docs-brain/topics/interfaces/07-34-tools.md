---
id: 01M3250V00P3JS39KYK4N0M761
type: design
title: "Tools"
aliases: ["07 §3.4"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#34-tools"
bw-part_of:
  - "[[07-3-mcp-server]]"
---
# Tools

All tools accept an optional `brain` argument (a brain name allowed for this
host). All return structured content plus a text rendering.

| Tool | Annotations | Purpose |
|---|---|---|
| `brain_list` | read-only, idempotent, closed-world | Brains this host may use ([[04-91-brain-list\|04 §9.1]]) |
| `brain_orient` | read-only, idempotent, closed-world | One brain's briefing ([[04-8-orientation-the-briefing\|04 §8]]) |
| `brain_search` | read-only, idempotent, closed-world | Search or browse with filters, expansion, and guards ([[04-6-search\|04 §6]]) |
| `brain_read` | read-only, idempotent, closed-world | Read a note, hub, or episode, with handles on every relation ([[04-7-read\|04 §7]]) |
| `brain_neighbors` | read-only, idempotent, closed-world | Follow a node's relations ([[04-92-neighbors\|04 §9.2]]) |
| `brain_check` | not read-only, not destructive (reversible), idempotent, closed-world | Validate and record direct edits; requires `edit` ([[05-23-checked-agent-edits\|05 §2.3]]) |
| `brain_log_episode` | not read-only, not destructive, idempotent (with `dedupe_key`), closed-world | Write an episode ([[05-21-ways-an-episode-is-written\|05 §2.1]]) |
| `brain_propose_rule` | destructive, not idempotent, closed-world; `_meta["anthropic/requiresUserInteraction"] = true` | Add or replace a rule with user confirmation ([[05-6-rules\|05 §6]]) |
| `brain_consolidate_prepare` | not read-only, not destructive, closed-world | Start an agent-backend run; returns instructions and packet |
| `brain_consolidate_apply` | destructive (reversible), idempotent per run, closed-world | Validate and apply ops for a run |
| `brain_read_origin` | read-only, idempotent, closed-world | Read a bounded window of the conversation an episode came from; requires `read_origin` ([[05-46-origin-context\|05 §4.6]]) |
| `brain_harvest_prepare` | not read-only, not destructive, closed-world | Start an agent-backend harvest of the calling host's sessions; returns instructions and a packet of condensed, scrubbed turns; requires `harvest` ([[05-22-harvesting-sessions\|05 §2.2]]) |
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
      "intent": {"enum": ["none", "context", "why", "impact", "history", "related"], "default": "context"},
      "include_episodes": {"type": "boolean", "description": "Default: on for a query, off when browsing."},
      "include_archived": {"type": "boolean", "default": false},
      "brain":  {"type": "string"}}},

  "brain_neighbors": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":    {"type": "string", "description": "id, path, file name, alias, or title"},
      "relations": {"type": "array", "items": {"enum": ["part_of", "depends_on", "conflicts_with", "supersedes", "related_to", "links_to"]}},
      "direction": {"enum": ["out", "in", "both"], "default": "both"},
      "depth":     {"type": "integer", "minimum": 1, "maximum": 3, "default": 1},
      "limit":     {"type": "integer", "minimum": 1, "maximum": 100, "default": 30},
      "brain":     {"type": "string"}}},

  "brain_check": {"type": "object", "additionalProperties": false,
    "properties": {
      "paths": {"type": "array", "items": {"type": "string"}, "maxItems": 50,
                "description": "Brain-relative paths you edited; empty lists pending edits without recording."},
      "allow_shrink": {"type": "boolean", "default": false},
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
      "topics":         {"type": "array", "maxItems": 5, "items": {"type": "string"}},
      "dedupe_key":     {"type": "string", "maxLength": 200},
      "session":        {"type": "string", "maxLength": 200,
                         "description": "Host session id this episode summarizes, if known (recorded as a hint)."},
      "origin_turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$"},
      "brain":          {"type": "string"}}},

  "brain_propose_rule": {"type": "object", "additionalProperties": false, "required": ["text", "user_quote"],
    "properties": {
      "text":       {"type": "string", "minLength": 1, "maxLength": 300},
      "user_quote": {"type": "string", "minLength": 1, "maxLength": 500,
                     "description": "The user's exact words asking for this rule."},
      "replaces":   {"type": "string", "pattern": "^r-[0-9A-HJKMNP-TV-Z]{26}$"},
      "session":    {"type": "string", "maxLength": 200,
                     "description": "Host session id, if known; a session the host's hooks saw read untrusted content may not propose rules."},
      "brain":      {"type": "string"}}},

  "brain_consolidate_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "topic":        {"type": "string"},
      "max_episodes": {"type": "integer", "minimum": 1, "maximum": 100},
      "brain":        {"type": "string"}}},

  "brain_consolidate_apply": {"type": "object", "additionalProperties": false, "required": ["run", "ops"],
    "properties": {
      "run":     {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "ops":     {"type": "array", "description": "Operations, see the instructions from prepare."},
      "dry_run": {"type": "boolean", "default": false},
      "brain":   {"type": "string", "description": "Optional; the server finds the brain that holds the run."}}},

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
          "topics":            {"type": "array", "maxItems": 5, "items": {"type": "string"}}}}}}}
}
```

Notes:

- `brain_log_episode` assembles the episode body from `summary`, `claims`,
  and `open_questions`; the provenance fields are set by the server, never
  by arguments ([[05-3-provenance-and-taint|05 §3]]).
- `session` and `origin_turns` on `brain_log_episode` are hints from the
  model (used by the fallback harvest recipe); the episode records them but
  keeps `bw-captured: mcp` and `bw-taint: unknown`. In `brain_harvest_apply`, by
  contrast, every provenance field comes from the server's own parse of the
  session.
- `brain_consolidate_apply` validates `ops` against the schema in
  [[05-5-operations|05 §5]] itself, so a
  malformed op produces a precise, model-correctable error rather than a
  generic protocol failure.
