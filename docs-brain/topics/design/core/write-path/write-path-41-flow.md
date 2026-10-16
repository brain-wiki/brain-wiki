---
id: 01M3250V000TWJS4P3WSA86XCQ
type: design
title: "Flow"
aliases: ["Write path §4.1"]
source: "docs/design/write-path.md#41-flow"
---
# Flow

1. Prepare returns pending episodes, candidate notes, and the guidance. It
   writes nothing.
2. The agent edits notes under `topics/` and runs `brain validate` on them.
3. Done archives the handled episodes as one run, which `brain undo`
   reverses. It only moves files.

A failure between the steps leaves notes edited and episodes still pending.
Running prepare again shows what is left.
