---
id: 01M3250V005EMAZ7YKA40WM56V
type: proposal
title: "Decisions"
aliases: ["Episodes: quick capture, per-agent consolidation §9"]
source: "docs/proposal/episode-lifecycle.md#9-decisions"
---
# Decisions

Settled with the maintainer on 2026-10-16:

| Question | Decision |
|---|---|
| How are records kept? | One dated note per record, in the topic it concerns (`topics/<topic>/records/2026-10-16-….md`), so each can be linked, cited, and superseded |
| Keep the `episodes` capability? | No. It cannot be enforced against an agent with file access, and capture is open by design |
| Do people write episodes? | No. People edit notes or ask an agent; `brain log` is removed |
| Confirm before an agent takes another agent's episodes? | No. The user's request is the consent; a confirmation step would not stop an agent that can read the files |
| Harvest in a scheduled run? | Only with `--harvest`, for a host with harvest on |
| Harvest into episodes? | No. The agent files sessions into notes directly and cites them with session URLs; brain-wiki keeps reading, routing, scrubbing, provenance, and watermarks; `brain harvest --apply`, `--raw`, and `--distill` are removed |
| A `pattern` hint at capture? | Yes, optional |
| Import documents and memory files through the CLI? | No. An agent files them into notes directly, citing sources in `bw-sources`; `--to-episodes` and `--from` are removed, `--overlay` and `--into` stay |
