---
id: 01M3250V00ZSVZWE71G84PRDWR
type: guide
title: "Writing"
source: "docs/user/reference.md#writing"
---
# Writing

- `brain log` warns when a `--topic` does not exist yet and keeps it as a
  hint. `--claim` adds a bullet under `## Claims` in the episode. `--inputs`
  defaults to `local`, or `unknown` with `--agent`.
- `brain rules add` with `--as HOST` saves a proposal instead of a rule.
- `brain mv` on a topic folder also updates the topic's `brain.toml` entry
  and the `AGENTS.md` topic table.
- `brain validate` checks the Markdown files git sees as changed, or every
  note in a brain without git. It exits 1 on problems.
- `brain consolidate --done` archives the episodes as one undoable run.
  Agents use `brain_consolidate_prepare` and `brain_consolidate_done`.
