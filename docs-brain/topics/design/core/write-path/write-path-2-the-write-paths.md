---
id: 01M3250V00P7E2QBHX37BV2JCK
type: design
title: "The write paths"
aliases: ["Write path §2"]
source: "docs/design/write-path.md#2-the-write-paths"
---
# The write paths

There are three ways to write, plus rules, which have their own path.

```
                     PATH 1: inbox (append-only, any agent)
  agent (MCP) ───────► inbox/episodes/YYYY/MM/<ulid>.md     never edited again
  host memory feature ─► inbox/agents/<agent>/…               treated as episodes

                     PATH 2: direct edits (agents with `edit`, and people)
  agent edits topics/… ─► brain validate <paths> ─► fix what it reports
        ─► brain commit (by hand or from brain schedule) ─► git history (§5)
  host session stores ─► (harvest: read, filter, scrub) ─► agent files notes (§2.2)

                     PATH 3: brain-wiki's own writers (runs)
  consolidate --done, lint --fix, mv, import, rules, agents grant, undo
        ─► Run: lock, verify, lint gate, pre-images, apply, log.md, git commit (§7)

  rules.md ◄── only: user via CLI, or agent via MCP with user confirmation (§6)
  any file ◄── a person with an editor (picked up by the index and by lint)
```

The inbox is optional. An agent may log an episode and let consolidation
fold it in later (§4), or edit the right note itself.

Agents with file tools can write anywhere. The instruction block, the
skill, `AGENTS.md`, orientation, and the MCP tools describe the documented
ways to write, and lint and `brain validate` report changed episodes,
edited protected files, and unknown frontmatter fields. People can always
edit any file.

## Subsections
- [[write-path-21-ways-an-episode-is-written]]: Ways an episode is written
- [[write-path-22-harvesting-sessions]]: Harvesting sessions
- [[write-path-23-direct-edits]]: Direct edits (Write path)
