---
id: 01M3250V00MHN3KPWCH9HG5GMW
type: design
title: "The write paths"
aliases: ["05 §2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#2-the-write-paths"
bw-part_of:
  - "[[write-path-and-consolidation]]"
---
# The write paths

```
                     PATH 1: inbox (append-only, any agent)
  agent / hook / CLI ──► inbox/episodes/YYYY/MM/<ulid>.md     never edited again
  host session stores ─► (brain harvest: read, filter, distill) ─► inbox/episodes/…
  host memory feature ─► inbox/agents/<agent>/…               treated as episodes

                     PATH 2: curated (validated)
  pending episodes ─► packet ─► LLM proposes ops ─► engine validates
        ─► apply + lint + undo record + git commit ─► episodes move to archive/
                     (or ─► proposal file for human review)

                     PATH 3: checked edits (agents with `edit`)
  agent edits a note ─► brain check <paths> ─► validate (schema, links, claims,
        privacy, protected files, loss guard) ─► record as a run (undo, log.md, git)
                     (or ─► errors, nothing recorded; fix, or brain restore)

  rules.md ◄── only: user via CLI, or agent via MCP with user confirmation (§6)
  any file ◄── a human with an editor (first-class, picked up by freshness + lint)
```

Agents with file tools can technically write anywhere. The sanctioned paths
are what the static instruction block, the skill, `AGENTS.md`, and MCP tools
teach, and the engine makes deviations visible (an episode that changed, a
claim without provenance, a note changed since its last recorded version).
Human edits are always allowed: it is the user's brain.

## Subsections
- [[05-21-ways-an-episode-is-written]]: Ways an episode is written
- [[05-22-harvesting-sessions]]: Harvesting sessions
- [[05-23-checked-agent-edits]]: Checked agent edits
