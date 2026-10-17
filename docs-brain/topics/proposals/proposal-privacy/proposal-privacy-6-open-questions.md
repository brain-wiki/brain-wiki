---
id: 01M3250V002G4DTEPMKC8NERBT
type: proposal
title: "Open questions"
aliases: ["Privacy §6"]
source: "docs/proposal/privacy.md#6-open-questions"
---
# Open questions

| # | Question | Options |
|---|---|---|
| PQ1 | How many levels? | `open` and `private`; or `open`, `private`, and `secret` (draft) |
| PQ2 | Where does provider trust live? | `brain.toml`, which travels with the brain (draft); or the user config, per machine |
| PQ3 | After a private read, what happens before an external tool runs? | Ask the user (draft); block; label only |
| PQ4 | May the owner mark a single note private? | No, use a private sub-topic (draft); or an owner-only `bw-privacy` on a note |
| PQ5 | May an agent on a trusted cloud provider consolidate `private` episodes? | Yes (draft); or local models only |
| PQ6 | Does the owner's own CLI get the exposure mark? | No (draft); or yes, for agents running the CLI through a shell |
