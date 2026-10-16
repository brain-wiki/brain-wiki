# Import

Every mode starts as a dry run; add `--apply` to change anything. `--dry-run`
wins over `--apply`. Choose one mode per command; a flag the mode does not
use (`--agent` without `--to-episodes`, `--phase` without `--overlay`, …) is
an error rather than ignored.

## Adopt an Obsidian vault or Markdown folder

```sh
brain import ~/notes --overlay                 # report: topics, hubs, counts, what would change
brain import ~/notes --overlay --apply         # phase 0: adopt in place
```

Phase 0 adds `brain.toml`, an `AGENTS.md` block, `rules.md`, `log.md`, and
the `inbox/`, `archive/`, and `reports/` folders. **No note is moved or
changed.** Top-level folders become topics; templates and attachment
folders are ignored; lint starts in the lenient `migrate` profile. The
brain is searchable right away. In a git repository, phase 0 commits
everything it added, including the plan in `reports/import-plan.md`.
Running phase 0 again on an adopted folder tells you it is already a brain.

Later phases are optional, each one a separate undoable run:

| Phase | Changes |
|---|---|
| `--phase 1` | Notes without an `id` get one; non-standard `status` values (`draft`, `done`, …) move to `bw-stage` |
| `--phase 2` | Topics without a hub get one; notes missing from their hub are listed |

```sh
brain import ~/notes --overlay --phase 1            # see the diff
brain import ~/notes --overlay --phase 1 --apply
```

The ids a phase 1 dry run shows are the ids the apply writes. Properties
such as `up:` or `related:` stay yours and are left as they are.

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

Documents are split on headings into episodes, for an agent to fold into
notes when consolidating; frontmatter is left out. Use `--untrusted` for text you did not
write. Running the same import again skips what was already imported, and
the output says how many episodes were written and how many skipped.

## Your agents' memory files

```sh
brain import --from claude-code          # project memory and CLAUDE.md
brain import --from codex --apply        # ~/.codex/memories and AGENTS.md
```

Memory files become episodes attributed to the agent. For other hosts, or
files kept elsewhere, give the location: `brain import ~/agent-notes --from
myagent`. Conversation history
is imported by `brain harvest` instead (see [Agents](agents.md)).
