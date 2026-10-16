---
id: 01M3250V00SCD25S67KBW3BF3W
type: design
title: "Logging"
aliases: ["Security and privacy §8"]
source: "docs/design/security-and-privacy.md#8-logging"
---
# Logging

Logs go to `<state>/logs/brain-wiki.log`, local only, rotated at 2 MB with
3 old files kept. They record operations and errors, never note content.
