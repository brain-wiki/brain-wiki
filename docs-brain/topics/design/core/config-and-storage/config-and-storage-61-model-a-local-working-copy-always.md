---
id: 01M3250V0054BCKBAV5QGNKD0F
type: design
title: "Model: a local working copy, always"
aliases: ["Config and storage §6.1"]
source: "docs/design/config-and-storage.md#61-model-a-local-working-copy-always"
---
# Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a local working copy, a normal folder. That folder is
the only thing the engine reads and writes.

Today a brain moves between devices through git or the user's own sync
tool. Any remote brain-wiki adds will be a replica of that folder, kept
current by a sync component. The engine never reads a network filesystem on
the hot path. Git and object-storage replicas, and a server mode with no
local copy, are a [[proposal-remote-sync|proposal]].
