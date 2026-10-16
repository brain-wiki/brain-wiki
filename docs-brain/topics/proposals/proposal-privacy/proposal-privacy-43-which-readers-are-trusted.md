---
id: 01M3250V00QR3Y66YT0FT0YT5D
type: proposal
title: "Which readers are trusted"
aliases: ["Privacy §4.3"]
source: "docs/proposal/privacy.md#43-which-readers-are-trusted"
---
# Which readers are trusted

The level says which destinations are allowed. Each reader is then checked
against it. A host's model provider is known from the host (Claude Code,
Codex, Antigravity), or declared for distill presets and OpenClaw.

```toml
[privacy]
trusted_providers = ["anthropic"]   # may read `private`; local models always may
```

| Reader | `open` | `private` | `secret` |
|---|---|---|---|
| Host on a trusted provider | Yes | Yes | No |
| Host on another or unknown provider | Yes | No | No |
| Local model | Yes | Yes | Yes |
| The owner (CLI, editor, viz) | Yes | Yes | Yes |
