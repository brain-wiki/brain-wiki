# Contributing to brain-wiki

## Setup

```sh
uv sync                      # creates .venv with dev dependencies
uv run brain --help
```

## Checks

```sh
uv run scripts/check.py      # everything CI runs: lint, format, tests, plugin sync, visualizer bundle, wheel contents
uv run pytest -q             # tests only
uv run ruff check src tests scripts && uv run ruff format src tests scripts
```

### The visualizer front end

`brain viz` serves a prebuilt bundle from `src/brainwiki/viz/app/`, so users
never need Node. To change the front end, edit `viz-app/` and rebuild:

```sh
cd viz-app
npm ci                       # Node 20 or newer
npm run check                # type check and unit tests
npm run build                # writes src/brainwiki/viz/app/ and its THIRD_PARTY_NOTICES
```

Commit the rebuilt bundle with the source; `scripts/check.py` fails when they
differ. `package-lock.json` must resolve from `https://registry.npmjs.org/`
only. To work on the UI with live reload, run `brain viz --no-open --port
8765` and `npm run dev`, then open the dev server with the token from
`brain viz` (`?t=…`).

## Where things are

| Path | What |
|---|---|
| `docs/design/` | The design. Read the relevant document before changing behavior, and update it in the same change. |
| `src/brainwiki/` | The package (layout in `docs/design/13-engineering.md` §2) |
| `src/brainwiki/assets/` | Prompts and routine templates the engine uses; the skills' copies are generated from them |
| `plugin.json`, `mcp.json`, `.mcp.json`, `mcp_config.json`, `hooks/`, `hooks.json`, `rules/`, `skills/`, `.claude-plugin/`, `server.json` | The plugin, served from the repository root. These names are reserved by hosts. |
| `viz-app/` | Source of the visualizer front end; the build is committed to `src/brainwiki/viz/app/` |
| `scripts/sync_versions.py` | Writes the version into every manifest and regenerates skill references (`--check` in CI) |
| `tests/fixtures/` | Synthetic fixtures only |

## Rules

- **No real personal data anywhere**: examples and fixtures use the
  fictional notes app "Lumen" and generic paths.
- **Test fixtures never contain credentials**, even fake ones in their real
  shape; build such strings at runtime in the test.
- **Writers never reflow text.** Anything that edits a note changes only the
  lines it must; add a test that untouched lines survive byte for byte.
- **Every curated change goes through `runs.Run`** so it is recorded,
  locked, gated by lint, and undoable.
- **Hooks must stay fast** (see `docs/design/13-engineering.md` §5) and must
  never import the MCP SDK.
- One version number, in `pyproject.toml`; run `scripts/sync_versions.py`
  after changing it or any file under `src/brainwiki/assets/`.

## Commits and pull requests

Conventional Commits (`feat(lint): …`, `fix(index): …`). The message says
why the change exists, not what the diff shows.
