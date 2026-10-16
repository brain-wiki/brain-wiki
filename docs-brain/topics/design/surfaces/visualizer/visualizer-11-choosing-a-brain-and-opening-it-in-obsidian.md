---
id: 01M3250V004NVBVXS2DJ0NJYW1
type: design
title: "Choosing a brain, and opening it in Obsidian"
aliases: ["Visualizer §11"]
source: "docs/design/visualizer.md#11-choosing-a-brain-and-opening-it-in-obsidian"
---
# Choosing a brain, and opening it in Obsidian

`brain viz [BRAIN]` and `brain obsidian [BRAIN]` open a brain for a person
to look at. The brain is the one named (`brain viz work`, or `--brain`);
otherwise the only registered brain; otherwise, at a terminal, the one the
user picks from a numbered list, with the brain the command would open
anyway as the default (Enter keeps it). Without a terminal, or with `--json`
or `BRAIN_WIKI_BRAIN`, nothing is asked. Naming two different brains (an
argument and `--brain`) is a usage error.

`brain obsidian` opens the brain's whole folder as a vault:

| Case | What happens |
|---|---|
| Obsidian already knows the folder | Found in Obsidian's vault list (`obsidian.json`, read only; reading it does not start Obsidian), then `obsidian://open?vault=<id>` goes to the operating system (`xdg-open`, `open`, or the Windows shell), which keeps the user's last workspace |
| An unknown folder, with the Obsidian CLI (1.12+) | `obsidian eval` runs `vault-open` with the folder: the internal call behind "Open folder as vault", which registers and opens it. Obsidian offers no public API for this, so a later Obsidian may break it, and the next row is the fallback |
| An unknown folder, without the CLI or if that fails | `obsidian://choose-vault` opens the vault manager, and the output names the step: Open folder as vault, then the folder |
| Obsidian not found, and nothing can open a link | Refused (`not_available`) with the same step |
| A known folder, and nothing can open the link | The link is printed for the user to open |
