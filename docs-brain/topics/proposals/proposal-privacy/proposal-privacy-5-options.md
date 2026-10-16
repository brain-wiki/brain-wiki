---
id: 01M3250V00YXQNNCKQKY30KKJR
type: proposal
title: "Options"
aliases: ["Privacy §5"]
source: "docs/proposal/privacy.md#5-options"
---
# Options

| Option | For | Against |
|---|---|---|
| A. Levels as allowed destinations (this draft) | Concrete questions per level; covers models, tools, outputs, and exports; owner-only; visible in `index.md` | Most work; tool-call control depends on host hooks |
| B. Restore the old read levels | Already designed and tested once | The problems in §1 |
| C. Separate brains only (today) | Simplest; a folder boundary every tool understands | No links across brains; two brains to keep up; no control inside a brain |
| D. Labels and instructions only | Cheap; no filtering code | Relies on agents obeying; no hard guarantee |

Recommendation: A, built in two steps.

1. Levels, declaration, reader trust, read filtering, packets, and P4.
2. The exposure mark with pre-tool hooks, output labels, and export
   filtering.
