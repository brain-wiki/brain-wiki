---
id: 01M3250V00CDDHFFJ9DRBY6Z14
type: design
title: "Converting format 1 and 2 notes (BW117)"
aliases: ["Lint and reports §5.1"]
source: "docs/design/lint-and-reports.md#51-converting-format-1-and-2-notes-bw117"
---
# Converting format 1 and 2 notes (BW117)

The BW117 fix rewrites a note in format 3. Claims become `## Facts` and
`## History` bullets, relations become `## Related` bullets, cited
episodes and URLs become `bw-sources`, and a superseded-by relation
becomes the `bw-superseded_by` field. The full mapping is in
[[brain-format-13-format-versioning|brain format §13]].

- Episodes are never converted.
- Until a note is converted, the text of its format 2 claims stays
  searchable ([[index-and-search-3-schema|index and search §3]]).
- Like any run that writes notes, the conversion raises `format` to 3.
- `brain lint --fix --dry-run` shows the diff first, and `brain undo`
  reverses the whole conversion.
