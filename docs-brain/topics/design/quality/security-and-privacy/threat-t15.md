---
id: 01M3250V00HJGT6CMGK1B2BYJR
type: threat
title: "T15: Impersonating plugins"
aliases: ["threat T15"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T15: Impersonating plugins

**Impersonating plugins.** A fake "brain-wiki" plugin in a marketplace.

**Mitigations:** Document the official sources (repository, PyPI, registry name); the plugin manifests point to the official package.

**Residual risk:** Users must install from the official source.
