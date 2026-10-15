---
id: 01M3250V009BS6Y6F8EBSKEERJ
type: guide
title: "Which agent may do what"
tags: [user-guide]
source: "docs/user/agents.md#which-agent-may-do-what"
bw-part_of:
  - "[[user-agents]]"
---
# Which agent may do what

Each agent acts with a **profile** in `brain.toml`. Every agent reads the
whole brain; by default it may log episodes and correct notes it checks with
`brain check`. Grant more per host:

```sh
brain agents                                       # what each app may do
brain agents grant claude-code consolidate propose_rules --dry-run
brain agents grant claude-code consolidate propose_rules
brain agents revoke claude-code propose_rules
```

Each change is a run that `brain undo` reverses. When an agent asks for
something its profile does not allow, brain-wiki refuses and names the
`brain agents grant` command that allows it. The capabilities, and
how to limit which brains an agent may use, are in
[[user-privacy|Privacy and safety]].
