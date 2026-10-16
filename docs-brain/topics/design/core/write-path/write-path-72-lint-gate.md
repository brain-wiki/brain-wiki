---
id: 01M3250V009RJBC0GX8CV94PJT
type: design
title: "Lint gate"
aliases: ["Write path §7.2"]
source: "docs/design/write-path.md#72-lint-gate"
---
# Lint gate

Runs that rewrite notes in bulk (`lint --fix`, `mv`, `import --into`) pass a check to
`commit`: strict lint errors the run would introduce in the files it
touches, computed in memory before anything is written. Errors already in
a file before the run do not count, so one note a person broke by hand does
not stall every later run that touches it. A failing check raises
`invalid_ops` and writes nothing.
