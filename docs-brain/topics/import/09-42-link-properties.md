---
id: 01M3250V00FZFNEDFAWCZXG537
type: design
title: "Link properties"
aliases: ["09 §4.2"]
tags: [import]
source: "docs/design/09-import.md#42-link-properties"
---
# Link properties

Properties that hold wikilinks (`up`, `parent`, `related`, `see_also`,
`next`, `source`) are left as they are. Format 3 has no typed relations to
convert them into (D33), and brain-wiki indexes links from the body only, so
these properties do not appear in backlinks or neighbors. A user who wants
them there can move the links into the body.
