---
id: 01M3250V009BCGV388587D25NX
type: design
title: "Testing (Skills, onboarding, and routines)"
aliases: ["15 §6"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#6-testing"
bw-part_of:
  - "[[skills-onboarding-and-routines]]"
---
# Testing (Skills, onboarding, and routines)

| Test | How |
|---|---|
| Skill conformance | `skills-ref validate` (or an equivalent check in CI) on every skill folder |
| Triggering | For each skill, a set of prompts that should trigger it and near-misses that should not, run headless against at least two hosts; results tracked in the bench `agent` suite |
| Onboarding end to end | A fresh `HOME` with the plugin installed; the agent is asked to "set up brain-wiki" with scripted answers; success means a brain exists, the host is connected, a test search works, and every write was preceded by a dry run |
| Routine templates | `brain schedule show <routine> --for <host>` compared to golden outputs for every host; OS-scheduler entries installed and removed in a temporary environment |
| Doctor contract | `brain doctor --json` validated against its JSON Schema in every state the onboarding test passes through |
