# D43: Topic rules say how a folder is organized

Status: accepted.
Argued in: [brain format §8.1](../design/brain-format.md#81-topic-rules), [index and search §7](../design/index-and-search.md#7-read).

A topic folder, or the topics folder itself, may hold `_Rules.md` (`layout.topic_rules`): the user's instructions for how that part of the brain is organized. What belongs there, how notes are named and shaped, and when to split a sub-topic off. A rules file applies to its folder and every folder below it, and a nearer one is more specific.

It is not a note. It has no id, is not searched, does not make a folder a topic, and is never listed in `## Notes`. brain-wiki delivers it where an agent decides where knowledge goes: `brain_read` of a topic page includes the text of the rules that apply, reading a note names them, `brain_validate` names the rules for the folders it checked, and `brain consolidate --prepare` lists them for the topics it touches. Agents follow the rules and do not edit them unless the user asks. Nothing checks a note against them, because brain-wiki does not extract meaning ([D33](d33-no-meaning-extraction.md)). Lint checks only their length (BW411), since their text goes into agents' context.

Topic rules differ from `rules.md`. `rules.md` holds the user's standing directives about their work, loaded in every session, each with the user's own words as its source, and changed only through the CLI. Topic rules are about organizing one part of the brain, loaded only when an agent works there, and they are a plain file the user edits, or that a template brings ([D44](d44-brain-templates.md)).

## Alternatives considered

- Conventions in the topic page. The page is navigation and summary that agents rewrite as the topic grows, so conventions would be edited away. It is also knowledge, and search would return the conventions as if they were facts.
- Conventions in `brain.toml` topic tables. TOML strings are poor for prose, Obsidian does not show them, and an undeclared topic could have none.
- Conventions in `rules.md`. It is loaded into every session against a hard budget, and its provenance rule (the user's quote) does not fit text a template brings.
- A schema per topic that lint enforces (required fields, note types). brain-wiki would have to read meaning from notes, and most conventions ("one note per person") are not checkable fields anyway.
- One rules file for the whole brain. Conventions differ by area, and an agent writing into `People/` gains nothing from the rules of `Projects/`.
