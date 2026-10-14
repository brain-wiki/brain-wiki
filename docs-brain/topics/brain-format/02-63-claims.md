---
id: 01M3250V005ZBHW8W70HBDEMMR
type: design
title: "Claims"
aliases: ["02 §6.3"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#63-claims"
bw-part_of:
  - "[[02-6-notes]]"
---
# Claims

A claim is one string in `bw-claims`. A claim that was superseded or
retracted moves to `bw-claims-superseded`.

```text
claim      = text [ " " meta ]
meta       = "{" pair *( "; " pair ) "}"
pair       = key ": " value             ; value double-quoted when it holds ";"
key        = "id" | "status" | "by" | "reason" | "src" | "origin" | "inputs" | "at"
```

| Key | Meaning |
|---|---|
| `id` | Claim id. Present on every claim written by brain-wiki. Claims a human writes without metadata are valid; `lint --fix` can assign ids. |
| `status` | Only in `bw-claims-superseded`, and only as `retracted`; a superseded claim needs no status. |
| `by` | For superseded claims: the id of the claim that replaced it. |
| `reason` | Why the claim was superseded or retracted. |
| `src` | One or more comma-separated sources: `<brain path>#L<start>-L<end>` for episode spans, `<host>:<session>#T<start>-T<end>` for turns of an agent conversation, or a URL. |
| `origin` | `owner`, `agent`, `import`, or `system`, from the source episodes. |
| `inputs` | `external` or `unknown` when any source episode had external or unknown inputs. Omitted when `local`. Any other value reads as `unknown` (lint BW201). |
| `at` | Date or date-time the claim was last asserted. |

Choices behind the form:

- **Strings, not nested objects.** Obsidian's Properties view shows and
  edits a list of strings but not nested mappings (§4), and one claim per
  line keeps diffs and model edits local.
- **A trailing `{…}` block.** It reads as metadata to people and is easy to
  split off. It counts as metadata only when it holds known keys, and
  writers replace braces inside claim text with parentheses.
- **A separate list for history.** `bw-claims` shows only what is current;
  the history of a fact stays in the note where the fact lives. Lint
  enforces that `by` points to an existing claim.
