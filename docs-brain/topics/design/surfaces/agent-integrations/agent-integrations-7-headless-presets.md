---
id: 01M3250V00B4DMAQHY107A77J0
type: design
title: "Headless presets"
aliases: ["Agent integrations §7"]
source: "docs/design/agent-integrations.md#7-headless-presets"
---
# Headless presets

`brainwiki/presets.py` runs a host CLI once with tools off. Harvest used it
to distill sessions into episodes until harvest began filing notes
([[d36-harvest-into-notes|D36]]); no command uses it now.
Scheduled consolidation needs the opposite, an agent with tools on that
edits the brain, and is designed in the
[[proposal-episode-lifecycle-7-unattended-agent-mode-per-host|episode lifecycle proposal]].
