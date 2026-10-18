---
id: 01M3250V00W7FVGQDMVQ1YQ8MG
type: idea
title: "An option for brain init to make the new brain an Obsidian vault by writing…"
source: "docs/roadmap/ideas.md"
---
# An option for brain init to make the new brain an Obsidian vault by writing…

An option for `brain init` to make the new brain an Obsidian vault by writing `.obsidian/app.json` with settings that match brain-wiki (wikilinks, `useMarkdownLinks: false`, so note bodies match brain-wiki's own link fields, in the shortest form brain-wiki writes, links updated on rename, new notes in `topics/`, and `inbox/`, `archive/`, and `reports/` as excluded files) and by gitignoring Obsidian's per-device files (`workspace.json`, caches), after which the user opens the folder once with Open folder as vault, since Obsidian lists only the vaults it has opened

**Area:** Setup

**Related design:** [[config-and-storage-5-brain-lifecycle|config and storage §5]]
