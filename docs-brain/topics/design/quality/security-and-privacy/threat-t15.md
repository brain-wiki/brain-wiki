---
id: 01M3250V000NSS48FPEW73J7VD
type: threat
title: "T15: Impersonating plugins"
aliases: ["threat T15"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T15: Impersonating plugins

**Impersonating plugins.** A fake "brain-wiki" plugin in a marketplace.

**Mitigations:** Document the official sources (repository, PyPI, registry name); the plugin manifests point to the official package.

**Residual risk:** Users must install from the official source.
