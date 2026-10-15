# Contributing to brain-wiki

## Setup

```sh
uv sync                      # creates .venv with dev dependencies
uv run brain --help
```

## Checks

```sh
uv run scripts/check.py      # everything CI runs: lint, format, tests, plugin sync, docs brain, visualizer bundle, package contents
uv run pytest -q             # tests only
uv run ruff format src tests scripts && uv run ruff check src tests scripts   # format, then lint
```

After editing `docs/`, regenerate the docs brain (`docs-brain/`, the docs as a
brain) with `uv run scripts/build_docs_brain.py`; CI fails when it is stale.
After changing the version or anything under `src/brainwiki/assets/`, run
`uv run scripts/sync_versions.py`.

### The visualizer front end

`brain viz` serves a prebuilt bundle from `src/brainwiki/viz/app/`, so users
never need Node. Its source is the
[brain-wiki-viz](https://github.com/brain-wiki/brain-wiki-viz) repository.
Clone it next to this one, then:

```sh
cd ../brain-wiki-viz
npm ci                       # Node 20.19+, or 22.12+ on Node 22
npm run check                # type check, unit tests, lockfile check
git commit …                 # commit the source first: the build records its commit
npm run build                # writes ../brain-wiki/src/brainwiki/viz/app/
```

Commit the rebuilt bundle here. `scripts/check.py` checks that the bundle is
complete and was built from a clean brain-wiki-viz commit
(`BUILD_INFO.json`); `scripts/check_viz.py --source ../brain-wiki-viz`
also rebuilds that checkout and fails if the result differs. For live reload,
run `brain viz --no-open --port 8765` here and `npm run dev` there, then open
the dev server with the token from `brain viz` (`?t=…`).

## Releasing

CI (`.github/workflows/ci.yml`) runs `scripts/check.py` on Linux and macOS
with Python 3.11 and 3.13, runs brain-wiki-viz's checks at the bundle's
commit, and checks that the bundle rebuilds from it. A version tag runs
`.github/workflows/release.yml`: it checks the tag against the version and
the changelog, runs the checks, builds, publishes to PyPI with trusted
publishing, and creates the GitHub release from the changelog entry. Its
MCP Registry job is turned off until the project decides to be listed.

1. Set `version` in `pyproject.toml` to `X.Y.Z`, or a development release
   such as `X.Y.Z.devN`, and date its changelog entry: `## X.Y.Z (YYYY-MM-DD)`.
   A development release goes to PyPI like any other, and pip and uv install
   it while no final release exists. The GitHub release follows the same
   rule: it is marked Latest until a final release exists, and a
   pre-release after that.
2. `uv run scripts/sync_versions.py`, then commit.
3. `git tag vX.Y.Z && git push origin main vX.Y.Z`.
4. Move `main` to the next development version (`X.Y.(Z+1).dev0` after
   `X.Y.Z`, `X.Y.Z.dev(N+1)` after `X.Y.Z.devN`) with a new `(unreleased)`
   entry, run `sync_versions.py`, commit, and push. The plugin files keep
   pointing at the newest dated release, because marketplaces install the
   plugin from `main`.

One-time setup: a trusted publisher on PyPI for this repository, workflow
`release.yml`, environment `pypi` (and that environment in the GitHub
repository settings); private vulnerability reporting turned on (see
`SECURITY.md`).

## Where things are

| Path | What |
|---|---|
| `docs/design/` | The design of what is implemented. Read the relevant document before changing behavior, and update it in the same change. |
| `docs/proposals/` | Designs not yet built, and the backlog. Building one moves its content into `docs/design/`. |
| `src/brainwiki/` | The package (layout in `docs/design/13-engineering.md` §2) |
| `src/brainwiki/assets/` | Prompts the engine uses; the skills' copies are generated from them |
| `plugin.json`, `mcp.json`, `.mcp.json`, `mcp_config.json`, `rules/`, `skills/`, `.claude-plugin/`, `server.json` | The plugin, served from the repository root. These names, and `hooks/` and `hooks.json`, are reserved by hosts; the bundle ships no hooks. |
| `src/brainwiki/viz/app/` | The visualizer's built bundle (source: brain-wiki-viz); do not edit by hand |
| `scripts/sync_versions.py` | Writes the version into every manifest and regenerates skill references (`--check` in CI) |
| `tests/fixtures/` | Synthetic fixtures only |

## Rules

- **No real personal data anywhere**: examples and fixtures use the
  fictional notes app "Lumen" and generic paths.
- **Test fixtures never contain credentials**, even fake ones in their real
  shape; build such strings at runtime in the test.
- **Minimal visibility.** Modules inside a package are private
  (`_name.py`); a package's API is what its `__init__.py` re-exports, and
  code outside the package imports only that (tests may reach private
  modules). Inside a module, a name is public only when another module, a
  test, or a script uses it. `scripts/check_visibility.py` (part of
  `scripts/check.py`) enforces both; `docs/design/13-engineering.md` §2 has
  the details.
- **Writers never reflow text.** Anything that edits a note changes only the
  lines it must; add a test that untouched lines survive byte for byte.
- **Every curated change goes through `runs.Run`** so it is recorded,
  locked, gated by lint, and undoable.
- **The CLI starts fast**: subcommand modules are imported lazily, and only
  `brain mcp` imports the MCP SDK (`docs/design/07-interfaces.md` §2.4).
- One version number, in `pyproject.toml`; run `scripts/sync_versions.py`
  after changing it or any file under `src/brainwiki/assets/`.

## Commits and pull requests

Conventional Commits (`feat(lint): …`, `fix(index): …`). The message says
why the change exists, not what the diff shows.
