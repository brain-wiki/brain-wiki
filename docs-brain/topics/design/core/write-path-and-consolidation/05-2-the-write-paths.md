---
id: 01M3250V00MHN3KPWCH9HG5GMW
type: design
title: "The write paths"
aliases: ["05 §2"]
source: "docs/design/05-write-path-and-consolidation.md#2-the-write-paths"
---
# The write paths

```
                     PATH 1: inbox (append-only, any agent)
  agent / CLI ───────► inbox/episodes/YYYY/MM/<ulid>.md     never edited again
  host session stores ─► (brain harvest: read, filter, distill) ─► inbox/episodes/…
  host memory feature ─► inbox/agents/<agent>/…               treated as episodes

                     PATH 2: direct edits (agents with `edit`, and people)
  agent edits topics/… ─► brain validate <paths> ─► fix what it reports
        ─► brain commit (by hand or from brain schedule) ─► git history (§5)

                     PATH 3: brain-wiki's own writers (runs)
  consolidate --done, lint --fix, mv, import, rules, agents grant, undo
        ─► Run: lock, verify, lint gate, pre-images, apply, log.md, git commit (§7)

  rules.md ◄── only: user via CLI, or agent via MCP with user confirmation (§6)
  any file ◄── a human with an editor (first-class, picked up by freshness + lint)
```

The inbox is optional capture: an agent may log an episode and let
consolidation fold it in later (§4), or edit the right note itself. Agents
with file tools can technically write anywhere. The sanctioned paths are
what the static instruction block, the skill, `AGENTS.md`, orientation, and
MCP tools teach; lint and `brain validate` make deviations visible (an
episode that changed, a protected file edited, a frontmatter field brain-wiki
does not know). Human edits are always allowed: it is the user's brain.

## Subsections
- [[05-21-ways-an-episode-is-written]]: Ways an episode is written
- [[05-22-harvesting-sessions]]: Harvesting sessions
- [[05-23-direct-edits]]: Direct edits (Write path and consolidation)
