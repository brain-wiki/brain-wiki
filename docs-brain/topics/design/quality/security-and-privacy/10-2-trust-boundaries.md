---
id: 01M3250V00W8883HV4NT7CRGFG
type: design
title: "Trust boundaries"
aliases: ["10 §2"]
source: "docs/design/10-security-and-privacy.md#2-trust-boundaries"
---
# Trust boundaries

```
 trusted ─────────────────────────────────────────────────────────────── untrusted
  the user      brain-wiki code   local brain files   agents/hosts    consolidator   external content
  (CLI, editor) (engine, server)  (user-owned)        (capable, can   LLM (sees      (web, email, issues,
                                                       be manipulated) packets)       others' documents)
```

- **Agents are capable but manipulable.** They follow instructions in what
  they read. brain-wiki keeps agent writes out of directive channels
  (`rules.md`, `AGENTS.md`). Agents with `edit` change notes directly, so
  git is how those edits are reviewed and reverted.
- **External content is untrusted.** It enters through agents. The
  `inputs` provenance field tracks it ([[05-3-provenance-and-inputs|05 §3]]).
- **Model providers see what is sent to them.** The consolidator LLM and the
  host's model receive brain content. Today every host that may use a brain
  reads all of it; which brains a host may use is the only limit
  (a [[proposal-privacy|proposal]] drafts finer control).
- **File access bypasses brain-wiki.** Any program running as the user can
  read and write the brain directly. Profiles govern brain-wiki's
  interfaces only and are not a sandbox. Real separation from a host that
  has file access means keeping the brain where that host cannot reach.
