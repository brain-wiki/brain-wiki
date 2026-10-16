---
id: 01M3250V00Z97CP3JQ932QAAVV
type: design
title: "v0.1: local folder with optional git"
aliases: ["03 §6.2"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#62-v01-local-folder-with-optional-git"
---
# v0.1: local folder with optional git

**Git mode** (`[git] mode = "auto"` in `brain.toml`): when the brain is a
git work tree, every brain-wiki write operation (consolidation run, review
accept, rule change, `lint --fix`, import apply, `mv`) is committed:

- exactly the files that operation touched are staged, so unrelated
  changes the user has in progress are never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers ([[05-73-apply|05 §7.3]]);
- the user's own git identity is used;
- **brain-wiki never pushes, pulls, or changes branches in v0.1.** The user
  syncs when they choose.

Episodes written by agents are not committed one by one (that would be a
commit per capture). They are committed with the run that consolidates
them, or by the user.

Git is driven through the `git` command line (subprocess with porcelain
output). It is the reference implementation, honors the user's hooks and
credential helpers, and avoids long-running library state in the MCP
server. If no `git` binary is found, git mode is off and `brain doctor`
says so.

Suggested `.gitattributes`, written by `brain init` when the user opts
into git:

```gitattributes
log.md merge=union        # append-only from several devices; union avoids conflicts
reports/** -diff          # generated
```

Episodes need no special merge rule: each is a new, uniquely named file.
Curated notes keep git's normal three-way merge; leftover conflict markers
are caught by lint.
