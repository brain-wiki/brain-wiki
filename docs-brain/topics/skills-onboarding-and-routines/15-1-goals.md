---
id: 01M3250V006M0VC49A3VKDRVT3
type: design
title: "Goals (Skills, onboarding, and routines)"
aliases: ["15 §1"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#1-goals"
bw-part_of:
  - "[[skills-onboarding-and-routines]]"
---
# Goals (Skills, onboarding, and routines)

| # | Goal | How we will know |
|---|---|---|
| O1 | A new user goes from "plugin installed" to a working brain connected to their agents in one guided conversation, without reading docs. | The onboarding scenario in the agent suite ([[11-35-agent-optional-real-hosts\|11 §3.5]]) completes on a fresh machine. |
| O2 | Everyday use needs no manual: the agent knows when to recall, when to record, and what never to do. | Skill trigger tests (§6) pass for every supported host. |
| O3 | Maintenance (harvest, consolidation, health checks) runs on the user's schedule, in the scheduler their agent already has, created from a template in one step. | `brain schedule show <routine> --for <host>` produces a ready-to-create task for every host with a local scheduler. |
| O4 | Every step can be inspected and undone. | Each setup action prints a dry run first and records how to reverse it. |
