---
id: 01M3250V00D6FNR7PDSPBTD68F
type: design
title: "Operations"
aliases: ["05 §5"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#5-operations"
bw-part_of:
  - "[[write-path-and-consolidation]]"
---
# Operations

The response schema (JSON Schema 2020-12, abbreviated):

```json
{
  "type": "object",
  "required": ["ops"],
  "properties": {
    "ops": {"type": "array", "maxItems": 200, "items": {"oneOf": [
      {"$ref": "#/$defs/add_claim"},      {"$ref": "#/$defs/merge_claim"},
      {"$ref": "#/$defs/supersede_claim"},{"$ref": "#/$defs/retract_claim"},
      {"$ref": "#/$defs/add_relation"},   {"$ref": "#/$defs/create_note"},
      {"$ref": "#/$defs/create_topic"},   {"$ref": "#/$defs/skip_episode"}
    ]}}
  },
  "$defs": {
    "src":  {"type": "string", "pattern": "^E[0-9]+#L[0-9]+(-L[0-9]+)?$"},
    "srcs": {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/src"}},
    "note_ref": {"type": "string", "pattern": "^(N[0-9]+|new:[a-z0-9-]+/[a-z0-9-]+)$"},
    "text": {"type": "string", "minLength": 1, "maxLength": 500},

    "add_claim":       {"required": ["op","note","text","sources"],
                        "properties": {"op": {"const": "add_claim"}, "note": {"$ref": "#/$defs/note_ref"},
                                       "text": {"$ref": "#/$defs/text"}, "sources": {"$ref": "#/$defs/srcs"}}},
    "merge_claim":     {"required": ["op","claim","sources"],
                        "properties": {"op": {"const": "merge_claim"}, "claim": {"pattern": "^C[0-9]+$"},
                                       "sources": {"$ref": "#/$defs/srcs"}}},
    "supersede_claim": {"required": ["op","claim","text","sources","reason"],
                        "properties": {"op": {"const": "supersede_claim"}, "claim": {"pattern": "^C[0-9]+$"},
                                       "text": {"$ref": "#/$defs/text"}, "sources": {"$ref": "#/$defs/srcs"},
                                       "reason": {"type": "string", "maxLength": 300}}},
    "retract_claim":   {"required": ["op","claim","sources","reason"],
                        "properties": {"op": {"const": "retract_claim"}, "claim": {"pattern": "^C[0-9]+$"},
                                       "sources": {"$ref": "#/$defs/srcs"},
                                       "reason": {"type": "string", "maxLength": 300}}},
    "add_relation":    {"required": ["op","from","verb","to"],
                        "properties": {"op": {"const": "add_relation"}, "from": {"$ref": "#/$defs/note_ref"},
                                       "verb": {"type": "string"}, "to": {"$ref": "#/$defs/note_ref"},
                                       "qualifier": {"type": "string", "maxLength": 60},
                                       "attrs": {"type": "object"}, "comment": {"type": "string", "maxLength": 200},
                                       "sources": {"$ref": "#/$defs/srcs"}}},
    "create_note":     {"required": ["op","ref","title","claims"],
                        "properties": {"op": {"const": "create_note"},
                                       "ref": {"pattern": "^new:[a-z0-9-]+/[a-z0-9-]+$"},
                                       "title": {"type": "string", "maxLength": 200},
                                       "type": {"type": "string"}, "summary": {"type": "string", "maxLength": 1500},
                                       "claims": {"type": "array", "items": {
                                         "required": ["text","sources"],
                                         "properties": {"text": {"$ref": "#/$defs/text"},
                                                        "sources": {"$ref": "#/$defs/srcs"}}}}}},
    "create_topic":    {"required": ["op","slug","title"],
                        "properties": {"op": {"const": "create_topic"}, "slug": {"pattern": "^[a-z0-9][a-z0-9-]{0,63}$"},
                                       "title": {"type": "string"}, "description": {"type": "string", "maxLength": 300},
                                       "parent": {"pattern": "^[a-z0-9][a-z0-9-]{0,63}$"}}},
    "skip_episode":    {"required": ["op","episode","reason"],
                        "properties": {"op": {"const": "skip_episode"}, "episode": {"pattern": "^E[0-9]+$"},
                                       "reason": {"type": "string", "maxLength": 200}}}
  }
}
```

Semantics (what the deterministic writer does):

| Op | Effect on disk |
|---|---|
| `add_claim` | Appends `"text {id; src; origin; taint; at}"` to the note's `bw-claims`. |
| `merge_claim` | Adds the new sources to the claim's `src` and updates `at`. The text is unchanged. |
| `supersede_claim` | Puts the new claim in the old one's place in `bw-claims` and moves the old one to `bw-claims-superseded` with `by: <new id>`, the reason, and the date. |
| `retract_claim` | Moves the claim to `bw-claims-superseded` with `status: retracted` and the reason, citing sources that show it was wrong. |
| `add_relation` | Appends a canonical relation to the `from` note's `bw-<verb>` field. `supersedes` also sets the target note's `status: superseded`. A relation that already exists becomes a no-op. |
| `create_note` | Creates `topics/<topic>/<slug>.md` with frontmatter (new id, type, title, `bw-part_of` the hub, `bw-claims`, and `bw-privacy` only when a source episode is more private than the topic), `# title`, and the summary; adds a line to the hub's `## Notes`. |
| `create_topic` | Creates the folder and a hub, inside the `parent` topic's folder when given (a sub-topic, 02 §2); adds the topic to the `AGENTS.md` block. Allowed only when the profile's `topics` is `*`. |
| `skip_episode` | Nothing, except that the episode is archived with the run. |

`new:<topic>/<slug>` refs let ops in one batch point at notes created in the
same batch. Every op that changes a note also sets its `updated` field; the
hub line `create_note` adds is bookkeeping and does not, so a hub's
`updated` still dates its own text. An op that edits a format 1
note first converts it to format 2 in the same run
([[02-13-format-versioning|02 §13]]), and a run that writes
format 2 files into a brain that declares format 1 raises the declaration.
