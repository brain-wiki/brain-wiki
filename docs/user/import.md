# Import

Every mode starts as a dry run; add `--apply` to change anything.

## Adopt an Obsidian vault or Markdown folder

```sh
brain import ~/notes --overlay                 # report: topics, hubs, counts, what would change
brain import ~/notes --overlay --apply         # phase 0: adopt in place
```

Phase 0 adds `brain.toml`, an `AGENTS.md` block, `rules.md`, `log.md`, and
the `inbox/`, `archive/`, and `reports/` folders. **No note is moved or
changed.** Top-level folders become topics; templates and attachment
folders are ignored; lint starts in the lenient `migrate` profile. The
brain is searchable right away.

Later phases are optional, each one a separate undoable run:

| Phase | Changes |
|---|---|
| `--phase 1` | Relation-like properties (`up`, `parent`, `related`, …) also become `## Relations` lines; the properties are kept |
| `--phase 2` | Notes without an `id` get one; non-standard `status` values (`draft`, `done`, …) move to `stage` |
| `--phase 3` | Topics without a hub get one; notes missing from their hub are listed |

```sh
brain import ~/notes --overlay --phase 2            # see the diff
brain import ~/notes --overlay --phase 2 --apply
```

If the folder is a git repository with uncommitted changes, apply stops so
the import diff stays clean.

## Copy notes into an existing brain

```sh
brain import ~/old-notes --into personal [--topic archive] --apply
```

Top-level folders become topics (or everything goes into `--topic`), path
links are rewritten, and the source is left untouched.

## Documents as episodes

```sh
brain import meeting-notes/ --to-episodes --apply
brain import clippings/ --to-episodes --untrusted --apply
```

Documents are split on headings into episodes for consolidation to fold
into notes. Use `--untrusted` for text you did not write.

## Your agents' memory files

```sh
brain import --from claude-code          # project memory and CLAUDE.md
brain import --from codex --apply        # ~/.codex/memories and AGENTS.md
```

Memory files become episodes attributed to the agent. Conversation history
is imported by `brain harvest` instead (see [Agents](agents.md)).
