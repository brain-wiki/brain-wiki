---
id: 01M3250V00QWET74RKZDPYA042
type: decision
title: "D42: The topic page is `_Index.md`"
aliases: ["D42"]
source: "docs/decision/d42-underscore-topic-files.md"
---
# D42: The topic page is `_Index.md`

Status: accepted.
Argued in: [[brain-format-2-directory-layout|brain format §2.2]], [[brain-format-8-topic-pages|brain format §8]].

The default topic page (`layout.topic_page`) is `_Index.md`, not `index.md`. A leading `_` marks a file in a topic folder that brain-wiki gives a meaning to. There are two: the topic page, and the topic rules, `_Rules.md` ([[d43-topic-rules|D43]]). File browsers and Obsidian sort them before the notes.

Brains keep working without a change. A brain whose `brain.toml` does not set `topic_page` still finds `index.md` as the page of a folder that has no `_Index.md`. Lint reports such a page (BW410), and `brain lint --fix` renames it to `_Index.md` and rewrites the links that named it by path, as one undoable run. A brain that sets `topic_page`, as imported vaults do, is not affected.

### Alternatives considered

- Keep `index.md`. Nothing in the name says brain-wiki reads the file. Vaults often hold an `index.md` that is an ordinary note, and the page sorts among the notes.
- `_index.md`, as Hugo names section pages. It differs from `_Index.md` only in case, which macOS and Windows treat as the same file (BW110). Title Case matches how notes are named in most vaults, and the rules file reads better as `_Rules.md`.
- Switch the default with a format version. Every write raises `format` by itself (brain format §13), so a brain would silently change which file is its page.
- Have `brain init` write `topic_page` into every new `brain.toml`, and keep `index.md` as the code's default. Old brains would keep the old name forever, and the default would differ from what every new brain uses.
- Accept both names in every brain. A folder could have two pages again, the problem [[d38-topic-pages|D38]] removed. The fallback here applies only when the brain names no page and the folder has no `_Index.md`, so a folder always has at most one.

## Related
- [[d38-topic-pages]]: D38: A topic is a folder and its page
- [[d43-topic-rules]]: D43: Topic rules say how a folder is organized
