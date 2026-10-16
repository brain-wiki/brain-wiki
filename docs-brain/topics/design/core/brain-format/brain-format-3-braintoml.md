---
id: 01M3250V00TFQB9DKY3DJ4C7R1
type: design
title: "`brain.toml`"
aliases: ["Brain format §3"]
source: "docs/design/brain-format.md#3-braintoml"
---
# `brain.toml`

The manifest identifies the brain and holds settings that must travel with
it. Settings that belong to a user or a machine (where brains are, which
brain is the default) live in the user config ([[config-and-storage|config and storage]]).

```toml
format = 3                                  # format version (required, §13)
id = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"           # brain id, a ULID (required, never changes)
name = "personal"                           # display name (optional)
description = "Personal notes and projects" # one line shown by brain_list (optional)

[layout]                                    # all optional; defaults shown
topics_dir   = "topics"
inbox_dir    = "inbox"
archive_dir  = "archive"
reports_dir  = "reports"
hub_filename = "index.md"                   # or "{folder}.md" for folder-note style
ignore       = []                           # extra glob patterns, relative to the brain root

[budgets]                                   # hard limits enforced by lint and writers
rules_max_lines     = 100
rules_max_chars     = 4000
agents_md_max_lines = 150
orient_max_tokens   = 1500

[lint]
profile = "strict"                          # strict | migrate (see 06)
stale_inbox_days = 14
# [lint.overrides] maps path globs to a profile or "off", e.g. "Archive/**" = "migrate"

[search]                                    # ranking and guard settings (see 04)
freshness_ms       = 1000
max_guards_per_hit = 10
status_factor      = { active = 1.0, superseded = 0.35, archived = 0.2 }
kind_factor        = { hub = 1.15, note = 1.0, episode = 0.7, archived_episode = 0.5 }
recency_half_life_days = 180

[consolidate]
max_episodes_per_run = 50                   # episodes one `brain consolidate --prepare` returns (see 05)

[reports]
after_consolidate = true
commit = false                              # include reports/ in brain-wiki's git commits

[git]
mode = "auto"                               # auto | off ; auto = commit when the brain is a git work tree

[topics.search]                             # one table per declared topic (optional)
path        = "topics/search"               # default: the folder with this slug, at any depth
title       = "Search"
description = "How local search works and why."

[agents.default]                            # profile for unknown hosts
write       = ["episodes", "edit"]

[agents.claude-code]                        # profile for one host id
write       = ["episodes", "edit", "propose_rules", "harvest"]
```

Rules:

- `format` and `id` are REQUIRED. Unknown keys MUST be preserved by tools
  that rewrite the file and SHOULD produce a lint warning.
- Inline tables (`status_factor = { … }`) are TOML, not frontmatter; the
  flat-values rule in §4 applies to note frontmatter only.
- A topic that exists on disk but is not declared still works: its slug is
  its folder name and its title is taken from the hub. Declaring a topic
  lets the user set a title, a description, or a path (for imported
  vaults). A declaration without `path` applies to the folder whose slug
  matches, wherever it sits.
- Topic slugs match `^[a-z0-9][a-z0-9-]{0,63}$`.
- Agent profile names are host ids ([[agent-integrations-2-host-ids|agent integrations]]).
  The write capabilities are `episodes`, `edit`, `propose_rules`, and
  `harvest` ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]).
- Settings from 0.1 that format 3 dropped (`[consolidate]` `review`,
  `review_external`, `max_supersede_ratio`; topic `review` and
  `agent_edits`) are unknown keys: preserved, reported by lint (BW109), and
  ignored. The old capability names `consolidate` and `review` load and are
  ignored.
