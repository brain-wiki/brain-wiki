---
id: 01M3250V00T34DRSZQEZQW3BZ6
type: design
title: "Alternatives considered (Import)"
aliases: ["Import §8"]
source: "docs/design/import.md#8-alternatives-considered"
---
# Alternatives considered (Import)

| Option | Why not |
|---|---|
| Restructure the vault into `topics/<slug>/` on import | Breaks the user's mental map, Obsidian shortcuts, and external links; huge git diffs. Overlay maps instead. |
| LLM-driven classification of every note during import | Slow, costly, non-deterministic; deterministic heuristics plus an editable plan are enough, and consolidation handles new material. |
| One big apply | Hard to review; phases keep each diff focused. |
