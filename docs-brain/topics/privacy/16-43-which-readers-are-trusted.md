---
id: 01M3250V00Y590FRVWVPTVJZPJ
type: design
title: "Which readers are trusted"
aliases: ["16 §4.3"]
tags: [privacy]
source: "docs/design/16-privacy.md#43-which-readers-are-trusted"
bw-part_of:
  - "[[16-4-draft-model]]"
---
# Which readers are trusted

The level says which sinks are allowed; each reader is then checked against
it. A host's model provider is known from the host (Claude Code, Codex,
Antigravity) or declared for command presets and OpenClaw.

```toml
[privacy]
trusted_providers = ["anthropic"]   # may read `private`; local models always may
```

| Reader | `open` | `private` | `secret` |
|---|---|---|---|
| Host on a trusted provider | yes | yes | no |
| Host on another provider, or unknown | yes | no | no |
| Local model (host or backend) | yes | yes | yes |
| The owner (CLI, editor, viz) | yes | yes | yes |
