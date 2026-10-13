---
id: 01M3250V00W8883HV4NT7CRGFG
type: design
title: "Trust boundaries"
aliases: ["10 §2"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#2-trust-boundaries"
bw-part_of:
  - "[[security-and-privacy]]"
---
# Trust boundaries

```
 trusted ─────────────────────────────────────────────────────────────── untrusted
  the user      brain-wiki code   local brain files   agents/hosts    consolidator   external content
  (CLI, editor) (engine, hooks)   (user-owned)        (capable, can   LLM (sees      (web, email, issues,
                                                       be manipulated) packets)       others' documents)
```

- **Agents are capable but manipulable.** They follow instructions in what
  they read. brain-wiki treats agent writes as unverified and keeps them
  out of directive channels.
- **External content is untrusted.** It enters through agents. Taint
  tracks it ([[05-3-provenance-and-taint|05 §3]]).
- **Model providers see what is sent to them.** The consolidator LLM and the
  host's model receive brain content. Profiles limit what each gets.
- **File access bypasses brain-wiki.** Any program running as the user can
  read and write the brain directly. Profiles and privacy levels govern
  brain-wiki's interfaces only: they filter what the tools return and are
  not a sandbox. Real separation from a host that has file access means
  keeping the brain where that host cannot reach, or a separate brain. For
  the same reason `brain_list` gives a brain's folder path only to profiles
  that may already read everything in it ([[04-91-brain-list|04 §9.1]]).
