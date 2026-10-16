---
id: 01M3250V00P6H3YT7QGM08X8K0
type: design
title: "Into an existing brain"
aliases: ["Import §5"]
source: "docs/design/import.md#5-into-an-existing-brain"
---
# Into an existing brain

1. Map the source's top-level folders (or the whole source, with
   `--topic <slug>`) to topics in the target brain.
2. Copy files to `topics/<slug>/…`, preserving relative structure.
3. Rewrite links between copied files and links to attachments; links to
   notes outside the source become unresolved and are reported.
4. Apply phase 1 (§3.2) to the copies (the source stays untouched), all in
   one run.
5. Then add hubs for the new topics and refresh the topic table in
   `AGENTS.md`, as separate lint-fix runs (the table can only be computed
   once the hubs exist). The output names every run, so undoing them all
   reverts the import.
