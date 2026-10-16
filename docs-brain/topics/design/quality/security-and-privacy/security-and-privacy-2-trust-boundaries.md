---
id: 01M3250V00SZ31FVDHK4262K2Y
type: design
title: "Trust boundaries"
aliases: ["Security and privacy §2"]
source: "docs/design/security-and-privacy.md#2-trust-boundaries"
---
# Trust boundaries

```
 trusted ─────────────────────────────────────────────────────────────── untrusted
  the user      brain-wiki code   local brain files   agents/hosts    consolidator   external content
  (CLI, editor) (engine, server)  (user-owned)        (capable, can   LLM (sees      (web, email, issues,
                                                       be manipulated) packets)       others' documents)
```

- Agents follow instructions in what they read, so they can be
  manipulated. brain-wiki keeps agent writes out of `rules.md` and
  `AGENTS.md`. Agents with `edit` change notes directly, so git is how those
  edits are reviewed and reverted.
- External content is untrusted. It enters through agents, and the
  `inputs` provenance field tracks it
  ([[write-path-3-provenance-and-inputs|write path §3]]).
- Model providers see what is sent to them. The host's model receives brain
  content. Every host that may use a brain reads all of it, and which
  brains a host may use is the only limit (finer control is a
  [[proposal-privacy|proposal]]).
- Any program running as the user can read and write the brain directly.
  Agent profiles govern brain-wiki's own interfaces and are not a sandbox.
  Keeping a brain from a host that has file access means storing it where
  that host cannot reach.
