---
id: 01M3250V00T34DRSZQEZQW3BZ6
type: design
title: "Alternatives considered (Import)"
aliases: ["Import §8"]
source: "docs/design/import.md#8-alternatives-considered"
---
# Alternatives considered (Import)

- Restructuring the vault into `topics/<slug>/` on import was rejected. It
  breaks the user's mental map, Obsidian shortcuts, and outside links, and
  makes huge git diffs. Overlay maps folders instead.
- Classifying every note with a model during import was rejected as slow,
  costly, and not repeatable. Deterministic rules and an editable plan are
  enough, and consolidation handles new material.
- One big apply was rejected as hard to review. Phases keep each diff
  focused.
