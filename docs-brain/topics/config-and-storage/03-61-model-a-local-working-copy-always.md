---
id: 01M3250V00RQ7PJV6RAWY26YA9
type: design
title: "Model: a local working copy, always"
aliases: ["03 §6.1"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#61-model-a-local-working-copy-always"
bw-part_of:
  - "[[03-6-storage-and-sync]]"
---
# Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a **local working copy**: a normal folder. That
folder is the only thing the engine reads and writes.

Remote storage is the user's own sync tool or git in v0.1. Any remote
brain-wiki adds will be a **replica** of that folder, kept in step by a
sync component; the engine never reads from a network filesystem on the hot
path. Git and object-storage replicas, and a server mode with no local
copy, are a [[proposal-remote-sync|proposal]].
