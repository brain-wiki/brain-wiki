---
id: 01M3250V00TNPJ36KY6T8XFAYM
type: proposal
title: "Why the old model was removed"
aliases: ["Privacy §1"]
source: "docs/proposal/privacy.md#1-why-the-old-model-was-removed"
---
# Why the old model was removed

The old model put an ordered level on topics and notes
(`default` < `sensitive` < `secret`) and gave each host a maximum level it
could read through brain-wiki's tools, plus a topic allowlist.

| Problem | Effect |
|---|---|
| A level named no threat. | Nobody could say what `sensitive` protected against that `default` did not, or from whom. |
| It controlled reading through the tools, not what happens after. | Once a host reads a note, the note goes to its model provider, into its transcript store, into tool calls, and into what it writes. The level governed none of that. |
| Agents could set it. | Checked edits could raise a note's level and consolidation stamped levels on new notes, although only the owner knows what is sensitive. |
| File access bypassed it. | `brain_list` withheld the folder path from restricted hosts, which made those hosts worse at ordinary work. |
| It cost structure. | Public stand-in notes so open notes could link to private people, hidden-guard counts, and a lint rule (BW312) that warned about links the owner wrote on purpose. |
