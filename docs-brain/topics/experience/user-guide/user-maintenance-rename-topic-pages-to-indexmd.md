---
id: 01M3250V00C4T8DCP7FP8WZQEY
type: guide
title: "Rename topic pages to `_Index.md`"
source: "docs/user/maintenance.md#rename-topic-pages-to-indexmd"
---
# Rename topic pages to `_Index.md`

Topic pages are named `_Index.md` since brain-wiki 0.3.4, so they stand
apart from notes. A brain that never set `layout.topic_page` keeps working
with its `index.md` pages, and lint reports each as BW410. Rename them in
one undoable run, which also rewrites the links that named them by path:

```sh
brain lint --fix --select BW410 --dry-run
brain lint --fix --select BW410
```

A brain that sets `topic_page` in `brain.toml`, such as an adopted
Obsidian vault with `Index.md` pages, is not affected. To move one to
`_Index.md` as well, delete the `topic_page` line: its pages then count as
the old name, which matches in any case, and the same two commands rename
them.
