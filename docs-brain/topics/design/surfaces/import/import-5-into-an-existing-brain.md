---
id: 01M3250V00P6H3YT7QGM08X8K0
type: design
title: "Into an existing brain"
aliases: ["Import §5"]
source: "docs/design/import.md#5-into-an-existing-brain"
---
# Into an existing brain

`--into <brain>` copies the source's notes into a brain as one run. The
source stays untouched.

1. Map each note to a topic folder: `topics/<slug of its top-level
   folder>/…`, keeping the rest of its path. Notes at the source's top
   level go to the slug of the source folder's name. With `--topic <slug>`,
   every note goes under `topics/<slug>/`.
2. Rewrite links between copied notes: Markdown links get the new relative
   path, and wikilinks written as paths get the new path. Wikilinks by file
   name are left alone, since they still resolve. Markdown links to `.md`
   files outside the source are counted and reported.
3. Apply the phase 1 rules (§3.2) to the copies.
4. Commit the run through the lint gate.
5. Then add topic pages for the new topics, and refresh the topic table
   in `AGENTS.md`, as separate runs (the table can only be computed once
   the pages exist). The output names every run, so undoing them all reverts
   the import.

Only Markdown notes are copied. Attachments stay in the source, and links
to them are left as written.
