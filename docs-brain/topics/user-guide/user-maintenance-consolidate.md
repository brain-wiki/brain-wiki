---
id: 01M3250V009ZMZN5MP2HS4PMJK
type: guide
title: "Consolidate"
tags: [user-guide]
source: "docs/user/maintenance.md#consolidate"
---
# Consolidate

Consolidation turns inbox episodes into claims on notes. A model proposes
small operations (add a claim, confirm one, supersede one, add a relation,
create a note); brain-wiki validates every one and applies them as one
undoable run.

| How | When |
|---|---|
| Ask your agent: "consolidate my brain" | Day to day; needs `consolidate` in the host's profile |
| `brain consolidate --prepare` then `--apply OPS.json --run RUN` | Driving it from your own tooling |

Nothing is ever deleted: superseded claims move to the note's
`bw-claims-superseded` list, with the id of what replaced them. Episodes move to `archive/` with the run.
