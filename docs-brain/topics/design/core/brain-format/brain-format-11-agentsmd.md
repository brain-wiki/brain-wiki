---
id: 01M3250V00R30CTPCVNWS0BJKQ
type: design
title: "`AGENTS.md`"
aliases: ["Brain format §11"]
source: "docs/design/brain-format.md#11-agentsmd"
---
# `AGENTS.md`

`AGENTS.md` lets an agent that can only read files use the brain. It
contains a generated block between markers. Anything the user writes
outside the markers is preserved.

```markdown
<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: personal

- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a page (`index.md`).
- To add or correct knowledge, edit or create a note, then run
  `brain validate <path>` (MCP: `brain_validate`) and fix what it reports. Something
  not organized yet goes in `inbox/episodes/YYYY/MM/<ULID>.md` (or the MCP tool
  `brain_log_episode`). Never edit `rules.md`, episodes, or `log.md`.
- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. A note
  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.

| Topic | Page | About |
|---|---|---|
| search | topics/search/index.md | How local search works and why. |
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`. Without `edit` in its `write` list, the third
bullet becomes "To record something, add a new file under
`inbox/episodes/YYYY/MM/<ULID>.md` (or call the brain-wiki MCP tool
`brain_log_episode`). Never edit `topics/` or `rules.md` directly." This
matches the host instruction block
([[agent-integrations-3-the-plugin-bundle|agent integrations §3.2]]).

- The topic table lists the top-level topics alphabetically, with each
  topic page's path and the description (or title) plus the number of
  sub-topics.
- The whole file is limited to `budgets.agents_md_max_lines`, counting
  the user's text outside the markers. When the table does not fit, it
  keeps the most recently updated topics and ends with a row pointing to
  the topic pages.
- Agents never edit `AGENTS.md`, inside or outside the markers. The user
  may.
- `brain init` writes the block. `brain lint --fix` (BW403, BW408),
  `brain mv`, and a grant or revoke that changes whether
  `[agents.default]` has `edit` regenerate it.
