---
id: 01M3250V00G09701XTP6F2MCST
type: proposal
title: "Options"
tags: [proposals]
source: "docs/proposals/privacy.md#5-options"
bw-part_of:
  - "[[proposal-privacy]]"
---
# Options

| Option | For | Against |
|---|---|---|
| **A · Levels as allowed sinks (this draft)** | Each level answers concrete questions; covers model, tools, outputs, injection, and exports; owner-only; visible in `index.md` | Most work; tool-call control depends on host hooks |
| B · Restore the old read levels | Already designed and tested | Same problems as §1 |
| C · Separate brains only (today) | Simplest; a directory boundary every tool understands | No links across the boundary; two brains to keep up; no control over tools or outputs inside a brain |
| D · Labels and instructions only | Cheap; no filtering code | Relies entirely on agents obeying; no hard guarantee anywhere |

Recommendation: A, built in two steps. Step 1: levels, declaration,
reader trust, read filtering, injection, packets, and P4. Step 2: the
exposure mark with pre-tool hooks, output labels, and export filtering.
