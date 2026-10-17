---
id: 01M3250V00TFQB9DKY3DJ4C7R1
type: design
title: "`brain.toml`"
aliases: ["Brain format §3"]
source: "docs/design/brain-format.md#3-braintoml"
---
# `brain.toml`

The manifest identifies the brain and holds settings that travel with it.
Settings that belong to a user or a machine, such as where brains are and
which brain is the default, live in the user config
([[config-and-storage|config and storage]]).

```toml
format = 3                                  # format version (required, §13)
id = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"           # brain id, a ULID (required, never changes)
name = "personal"                           # display name (optional)
description = "Personal notes and projects" # one line shown by brain_list (optional)

[layout]                                    # all optional; defaults shown
topics_dir  = "topics"
inbox_dir   = "inbox"
archive_dir = "archive"
reports_dir = "reports"
topic_page  = "index.md"                    # or "{folder}.md" for folder-note style
ignore      = []                            # extra glob patterns, relative to the brain root

[budgets]
rules_max_lines     = 100
rules_max_chars     = 4000
agents_md_max_lines = 150
orient_max_tokens   = 1500

[lint]                                      # see lint and reports §2
profile = "strict"                          # strict | migrate
stale_inbox_days = 14
# [lint.overrides] maps path globs to a profile or "off", e.g. "Archive/**" = "migrate"

[search]                                    # see index and search §4 to §6
freshness_ms       = 1000
max_guards_per_hit = 10
status_factor      = { active = 1.0, superseded = 0.35, archived = 0.2 }
kind_factor        = { topic = 1.15, note = 1.0, episode = 0.7, archived_episode = 0.5 }
recency_half_life_days = 180

[consolidate]
max_episodes_per_run = 50                   # episodes one `brain consolidate --prepare` returns

[reports]
after_consolidate = true                    # `brain consolidate --done` regenerates reports/
commit = false                              # accepted, currently has no effect

[git]
mode = "auto"                               # auto | off; auto commits each run in a git work tree

[topics.search]                             # one table per declared topic (optional)
path        = "topics/search"               # default: the folder with this slug, at any depth
title       = "Search"
description = "How local search works and why."

[agents.default]                            # profile for hosts without their own
write       = ["edit"]

[agents.claude-code]                        # profile for one host id
write       = ["edit", "propose_rules", "harvest"]
read_origin = false
```

Rules:

- `format` and `id` are REQUIRED. A known key with a value of the wrong
  type stops the brain from opening, with an error naming the key.
- Unknown keys MUST be preserved by tools that rewrite the file, and
  SHOULD produce a lint warning (BW109).
- Inline tables (`status_factor = { … }`) are TOML, not frontmatter. The
  flat-values rule of §4 applies to note frontmatter only.
- An undeclared topic still works. Its title comes from its topic page,
  and its description from the page's `description` property. A declaration sets
  the title, the description, or a path (for imported vaults).
- Older `brain.toml` files may use the names from when topic pages were
  called hubs. `layout.hub_filename` is read as `layout.topic_page`, and a
  `hub` key in `search.kind_factor` as `topic`.
- Declared topic slugs MUST match `^[a-z0-9][a-z0-9-]{0,63}$` (BW409).
- `[budgets]` limits are hard. Rule writes refuse to exceed theirs, lint
  reports `rules.md` (BW402) and `AGENTS.md` (BW403), and orientation is
  cut to fit.
- `git.mode = "on"` behaves like `auto`.
- Agent profile names are host ids
  ([[agent-integrations-2-host-ids|agent integrations §2]]). The write
  capabilities are `edit`, `propose_rules`, and `harvest`, and
  `read_origin` lets a host read the conversation behind an episode
  ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]).
- Settings that 0.1 had and format 3 dropped (`[consolidate]` `review`,
  `review_external`, `max_supersede_ratio`, and topic `review` and
  `agent_edits`) are unknown keys, so they are preserved, reported
  (BW109), and ignored. The old capability names `consolidate`, `review`,
  and `episodes` grant nothing; capturing an episode needs no capability.
