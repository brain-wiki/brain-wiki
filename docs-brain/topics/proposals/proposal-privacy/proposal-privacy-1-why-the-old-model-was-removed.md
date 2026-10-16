---
id: 01M3250V00TNPJ36KY6T8XFAYM
type: proposal
title: "Why the old model was removed"
aliases: ["Privacy §1"]
source: "docs/proposal/privacy.md#1-why-the-old-model-was-removed"
---
# Why the old model was removed

The old model put an ordered level on topics and notes (`default`, then
`sensitive`, then `secret`). Each host had a maximum level it could read
through brain-wiki's tools, plus a topic allowlist.

| Problem | Effect |
|---|---|
| A level named no threat | Nobody could say what `sensitive` protected against, or from whom |
| It controlled reading, not what happened next | A note a host read still went to its model, transcripts, tool calls, and outputs |
| Agents could set it | Agents raised levels and stamped them on new notes, though only the owner knows what is sensitive |
| File access bypassed it | Hiding the folder path from restricted hosts made them worse at ordinary work |
| It cost structure | Public stand-in notes, hidden-note counts, and a lint rule (BW312) against links the owner wrote on purpose |
