---
id: 01M3250V00V3SYDVNJ57PWCVNM
type: design
title: "Testing (Skills and onboarding)"
aliases: ["15 §5"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#5-testing"
bw-part_of:
  - "[[skills-and-onboarding]]"
---
# Testing (Skills and onboarding)

| Test | How |
|---|---|
| Skill conformance | `skills-ref validate` (or an equivalent check in CI) on every skill folder |
| Triggering | For each skill, a set of prompts that should trigger it and near-misses that should not, run headless against at least two hosts; results tracked in the bench `agent` suite |
| Onboarding end to end | A fresh `HOME` with the plugin installed; the agent is asked to "set up brain-wiki" with scripted answers; success means a brain exists, the host is connected, a test search works, and every write was preceded by a dry run |
| Doctor contract | `brain doctor --json` validated against its JSON Schema in every state the onboarding test passes through |
