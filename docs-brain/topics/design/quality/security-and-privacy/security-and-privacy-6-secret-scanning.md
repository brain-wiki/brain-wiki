---
id: 01M3250V00Q14ZNSW51ATX6XS6
type: design
title: "Secret scanning"
aliases: ["Security and privacy §6"]
source: "docs/design/security-and-privacy.md#6-secret-scanning"
---
# Secret scanning

Secrets are redacted when episodes are written and reported by lint
(BW701). Each pattern has a name used in `[REDACTED:<name>]`:

- keys with fixed prefixes: AWS access keys, Google API keys, GitHub
  tokens, Slack tokens and webhooks, Stripe keys, and Anthropic and
  OpenAI-style keys;
- PEM private key blocks;
- JSON Web Tokens;
- assignments to names containing `password`, `passwd`, `secret`, `token`,
  `api_key`, or `access_key` whose value is 12 or more characters with high
  entropy (`secret-assignment`).

Values that only name or compute a secret are not flagged: environment
lookups (`process.env.API_KEY`), calls and template expressions, dotted
references, `ALL_CAPS` variable names, links, and secret-manager references
(`name:latest`). An `sk-` match counts as an OpenAI-style key only when it
mixes upper case, lower case, and digits, so words and URL slugs pass.

Redaction happens before an episode touches disk, so a secret never enters
the brain through brain-wiki's episode writers. Lint cannot remove secrets
already in git history, and its message says to rotate the secret.
