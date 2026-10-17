---
id: 01M3250V00MMDBD5SK70V7TDK5
type: proposal
title: "Recording outcomes"
aliases: ["Episodes: quick capture, per-agent consolidation §4.1"]
source: "docs/proposal/episode-lifecycle.md#41-recording-outcomes"
---
# Recording outcomes

`brain consolidate --done` takes the outcome with each episode, so the run
says what happened:

```
brain consolidate --done 01JA…:playbook:topics/lumen/release-howto.md \
                         01JB…:record:topics/lumen/records/2026-10-16-sync-outage.md \
                         "01JC…:skip:already in topics/lumen/sync.md"
```

MCP `brain_consolidate_done` takes `[{episode, pattern, notes}]`. A plain
episode id still works (pattern unknown). The run's `log.md` entry lists
each episode with its pattern and notes, and feeds the report in §5.4.

`--done` checks the trail before it archives anything. Each note named for
an episode must exist and cite that episode in `bw-sources`; a missing
citation fails the whole call, naming the note and the line to add. A
skipped episode needs a reason instead.
