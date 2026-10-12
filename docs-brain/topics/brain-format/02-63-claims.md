---
id: 01M3250V005ZBHW8W70HBDEMMR
type: design
title: "Claims"
aliases: ["02 §6.3"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#63-claims"
---
# Claims

A claim is one list item under `## Claims`.

```text
claim      = "- " text [ " " meta ] EOL
superseded = "- ~~" text "~~ " meta EOL
meta       = "<!-- " pair *( "; " pair ) " -->"
pair       = key ":" value
key        = "id" | "src" | "origin" | "taint" | "at" | "status" | "by"
```

| Key | Meaning |
|---|---|
| `id` | Claim id. Present on every claim written by brain-wiki. Claims a human writes without metadata are valid; `lint --fix` can assign ids. |
| `src` | One or more comma-separated sources: `<brain path>#L<start>-L<end>` for episode spans, `<host>:<session>#T<start>-T<end>` for turns of an agent conversation, or a URL. |
| `origin` | `owner`, `agent`, `import`, or `system`, from the source episodes. |
| `taint` | `true` or `unknown` when any source episode was tainted or of unknown taint. Omitted when false. |
| `at` | Date or date-time the claim was last asserted. |
| `status` | Omitted when active. `superseded` or `retracted`. |
| `by` | For superseded claims: the id of the claim that replaced it. |

Why an HTML comment: it keeps one claim on one line, it is hidden in
Obsidian reading view and on GitHub, and every Markdown tool leaves it
alone. The cost is noise in source view, which we accept for parseability.
Superseded claims stay in place, struck through, so the history of a fact
is visible where the fact lives. Lint enforces that `by` points to an
existing claim.

Claims MAY wrap onto continuation lines indented by two or more spaces;
the metadata comment, if any, MUST be on the last line of the item.

## Relations
- part_of [[02-6-notes]]
