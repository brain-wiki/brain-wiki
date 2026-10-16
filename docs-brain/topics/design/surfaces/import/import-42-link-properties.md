---
id: 01M3250V00R6EN2F6ZFE7X6W81
type: design
title: "Link properties"
aliases: ["Import §4.2"]
source: "docs/design/import.md#42-link-properties"
---
# Link properties

Properties that hold wikilinks (`up`, `parent`, `related`, `see_also`,
`next`, `source`) are left as they are. Format 3 has no typed relations to
convert them into ([[d33-no-meaning-extraction|D33]]), and
brain-wiki indexes links from the body only, so these properties do not
appear in backlinks or neighbors. They can still be filtered with
`--where`. A user who wants them in the link graph can move them into the
body.
