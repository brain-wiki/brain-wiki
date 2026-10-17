---
id: 01M3250V00M2RAP5K2X3P0670W
type: design
title: "Testing (Skills and onboarding)"
aliases: ["Skills and onboarding §5"]
source: "docs/design/skills-and-onboarding.md#5-testing"
---
# Testing (Skills and onboarding)

| Test | How |
|---|---|
| Skill conformance | `tests/test_plugin.py` (§2) |
| Triggering | By hand before releases: for each skill, prompts that should trigger it and near-misses that should not, in at least two hosts |
| Onboarding end to end | By hand before releases: a fresh `HOME` with the plugin installed, and the agent asked to "set up brain-wiki". It passes when a brain exists, the host is connected, a test search works, and every write was preceded by a dry run. |
| Doctor shape | Unit tests on `brain doctor --json` (problems, recovered runs, commit-job problems); no JSON Schema yet |

Automated trigger and onboarding tests would belong to the bench's `agent`
suite, which is not built ([[eval-bench|eval bench §3.5]]).
