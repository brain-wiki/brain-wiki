---
id: 01M3250V004NG647ZTN739RE0X
type: concept
title: "Agent profile"
aliases: ["agent profile"]
source: "docs/design/glossary.md"
---
# Agent profile

Per-brain settings for one host, such as `claude-code`, in `brain.toml`. Its capabilities say what the host may write (`episodes`, `edit`, `propose_rules`, `harvest`), and `read_origin` lets it read the conversation behind an episode. Every host that may use a brain reads all of it.
