---
id: 01M3250V004NVBVXS2DJ0NJYW1
type: design
title: "Choosing a brain, and opening it in Obsidian"
aliases: ["Visualizer §11"]
source: "docs/design/visualizer.md#11-choosing-a-brain-and-opening-it-in-obsidian"
---
# Choosing a brain, and opening it in Obsidian

`brain viz [BRAIN]` and `brain obsidian [BRAIN]` open a brain for a person to look at. They open the brain named as the argument or with `--brain`. Otherwise, with several brains registered and a terminal attached, they ask the user to pick one from a numbered list, and Enter keeps the brain the command would have opened anyway. With one brain, without a terminal, or with `--json` or `BRAIN_WIKI_BRAIN` set, nothing is asked. Naming two different brains, one as the argument and one with `--brain`, is a usage error.

`brain obsidian` opens the brain's whole folder as a vault:

| Case | What happens |
|---|---|
| Obsidian already knows the folder | brain-wiki finds it in Obsidian's vault list (`obsidian.json`, read without starting Obsidian) and hands `obsidian://open?vault=<id>` to the operating system (`xdg-open`, `open`, or the Windows shell), which keeps the user's last workspace |
| An unknown folder, with the Obsidian CLI (1.12+) | `obsidian eval` runs `vault-open` with the folder, the internal call behind "Open folder as vault", which registers and opens it |
| An unknown folder, without the CLI or when that fails | `obsidian://choose-vault` opens the vault manager, and the output names the step to take: Open folder as vault, then the folder |
| An unknown folder, no CLI, and nothing can open a link | Refused with `not_available` and the same step |
| A known folder, and nothing can open the link | The link is printed for the user to open |

Obsidian has no public API for adding a vault, so a later Obsidian may break the `vault-open` call. The vault manager is the fallback.
