---
id: 01M3250V00V3SYDVNJ57PWCVNM
type: design
title: "Testing (Skills and onboarding)"
aliases: ["15 §5"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#5-testing"
---
# Testing (Skills and onboarding)

| Test | How |
|---|---|
| Skill conformance | `tests/test_plugin.py` checks every skill folder against the Agent Skills rules (name, description length, body length, links into `references/`) |
| Triggering | By hand before releases: for each skill, prompts that should trigger it and near-misses that should not, in at least two hosts |
| Onboarding end to end | By hand before releases: a fresh `HOME` with the plugin installed; the agent is asked to "set up brain-wiki"; success means a brain exists, the host is connected, a test search works, and every write was preceded by a dry run |
| Doctor contract | Unit tests on `brain doctor --json` output (problems, recovered runs); no JSON Schema yet |

Automating triggering and onboarding is part of the planned bench `agent`
suite ([[proposal-consolidation-bench-9-the-agent-suite|proposal]]).
