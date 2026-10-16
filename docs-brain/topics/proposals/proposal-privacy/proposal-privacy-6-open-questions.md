---
id: 01M3250V002G4DTEPMKC8NERBT
type: proposal
title: "Open questions (Privacy)"
aliases: ["Privacy §6"]
source: "docs/proposal/privacy.md#6-open-questions"
---
# Open questions (Privacy)

| # | Question | Options |
|---|---|---|
| PQ1 | How many levels? | `open`/`private`; `open`/`private`/`secret` (draft) |
| PQ2 | Where does provider trust live? | `brain.toml` (travels with the brain, draft); user config (per machine) |
| PQ3 | After a private read, what happens before an external tool runs? | Ask the user (draft); block; label only |
| PQ4 | May the owner mark a single note private? | No: use a private sub-topic (draft); owner-only `bw-privacy` on a note |
| PQ5 | May a cloud backend consolidate `private` episodes if its provider is trusted? | Yes (draft); local backends only |
| PQ6 | Does the owner's own CLI get the exposure mark? | No (draft); yes, for agents running the CLI through a shell |
