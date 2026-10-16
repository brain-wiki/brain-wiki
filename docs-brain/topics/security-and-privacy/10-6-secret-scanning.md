---
id: 01M3250V0099519TB569FQRSPB
type: design
title: "Secret scanning"
aliases: ["10 §6"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#6-secret-scanning"
---
# Secret scanning

Applied when episodes are written (redact) and by lint (report). Patterns
cover common forms, each with a name used in `[REDACTED:<name>]`:

- Cloud and platform keys with fixed prefixes (AWS access keys, Google API
  keys, GitHub tokens, Slack tokens, Stripe keys, OpenAI and Anthropic
  style keys).
- PEM private key blocks.
- JSON Web Tokens.
- `password`, `secret`, `token`, `api_key` assignments whose value has high
  entropy.

Values that only name or compute a secret are not flagged: environment
lookups (`process.env.API_KEY`), calls and template expressions, dotted
references, `ALL_CAPS` variable names, and secret-manager references
(`name:latest`). An `sk-` match counts as an OpenAI-style key only when it
mixes upper case, lower case, and digits, so words and URL slugs pass.

Redaction happens before the episode touches disk, so a secret never
enters the brain through brain-wiki. Lint cannot remove secrets that are
already in git history; its message says to rotate the secret.
