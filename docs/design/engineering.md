# Engineering

Status: draft for review

## 1. Repository layout

The repository root is also the plugin root for every supported host (D14),
so some root names are reserved by hosts and must only hold plugin content.

```text
brain-wiki/
├── plugin.json                  plugin manifest: Agent Plugins format, also read by Antigravity
├── mcp.json                     MCP server for Agent Plugins hosts (Codex, ChatGPT desktop, OpenClaw)
├── .mcp.json                    MCP server for Claude Code
├── mcp_config.json              MCP server for Antigravity
├── server.json                  MCP Registry entry
├── .claude-plugin/
│   ├── plugin.json              Claude Code plugin manifest
│   └── marketplace.json         marketplace listing this repo as one plugin
├── .codex-plugin/plugin.json    OpenAI overlay (only if root plugin.json lacks extensions["com.openai"])
├── rules/brain-wiki.md          Antigravity rule (trigger: always_on), generated from the static instruction block
├── skills/                      brain, brain-setup, brain-maintain (shared by all hosts; see 15)
│
├── src/brainwiki/               the Python package (§2)
├── tests/                       unit, property, integration tests; synthetic fixtures
├── docs/                        design/ (these documents) and user/ (user guide)
├── scripts/                     maintainer scripts (check, version sync, docs brain, visualizer bundle check)
├── .github/workflows/           CI (scripts/check.py) and the release workflow
├── pyproject.toml
├── README.md, LICENSE, CONTRIBUTING.md, SECURITY.md, CHANGELOG.md
├── AGENTS.md                    guide for coding agents working on this repo (see note)
└── .pre-commit-hooks.yaml       exposes `brain lint` to the pre-commit framework
```

**Reserved root names** (interpreted by at least one host when the repo is
installed as a plugin): `plugin.json`, `mcp.json`, `.mcp.json`,
`mcp_config.json`, `settings.json`, `.lsp.json`, `skills/`, `agents/`,
`commands/`, `hooks/`, `rules/`, `output-styles/`, `sidecars/`,
`.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`. Nothing else may
use these names.

**Developer instructions must not leak into users' sessions.** Whether any
host loads a plugin-root `AGENTS.md` (or `GEMINI.md`, which Antigravity
treats like `AGENTS.md` in workspaces) into a user's session is unverified.
The repo has no `GEMINI.md`, and its `AGENTS.md` is kept short and opens
with a line telling any agent that is not developing brain-wiki to ignore
it. Test item T-4 in [roadmap](../roadmap/verification.md)
checks this.

## 2. Package structure

```text
src/brainwiki/
├── cli/            Typer entry point; one module per command; lazy imports
├── config/         user config, brain.toml, brain resolution, platform dirs
├── format/         parsers and writers: frontmatter, links, episodes, rules, the AGENTS.md block;
│                   format 1/2 → 3 conversion (_convert.py; legacy claim and relation parsers read the old formats)
├── store/          LocalStore (atomic writes, O_EXCL creates, expected-hash writes)
├── index/          SQLite schema, scanner, queries (search, supersession guard, read, neighbors, orient)
├── lint/           rules, profiles, fixes, reports, `brain validate` (_validate.py)
├── write/          episode writer, secret scrubber, rule writer, agent profiles, mv
├── consolidate/    --prepare (episodes with candidate notes, _prepare.py), --done (archive as a run, _done.py)
├── schedule/       `brain commit` (snapshot and sync), crontab and LaunchAgent jobs, doctor checks
├── runs/           run records, pre-images, undo, locks, git integration
├── importer/       overlay, into, to-episodes, from-host presets
├── mcp/            MCP server (the only package that imports the SDK)
├── hosts/          per-host knowledge: transcript readers, host detection, connect writers, instruction blocks
├── viz/            graph export, level-of-detail API, local server; app/ is the built front end (committed)
├── bench/          generator, suites with their graders and scenarios, report
├── assets/         prompts (consolidate, distill, harvest); plugin files are copied in at build time
└── *.py            top-level modules: engine, lifecycle, harvest, presets (headless host CLIs for harvest
                    distillation), origin, doctor, setup_wizard, obsidian, ids, errors, logs
```

Dependency direction (an arrow means "may import"):

```
cli ─► mcp, hosts, viz, bench, importer ─► consolidate, lint, schedule ─► index, write, runs ─► format, store, config
```

`format`, `store`, and `config` import nothing from the rest. The MCP SDK,
the visualizer, and the bench are leaves: nothing in the core imports them.

**Package boundaries.** Every module inside a package is private
(`index/_search.py`). A package's API is what its `__init__.py` re-exports,
listed in `__all__`, and code outside the package imports only that:
`from brainwiki.index import search`, never `brainwiki.index._search`.
Where a group of operations reads better qualified, the package exports the
module as a namespace (`from brainwiki.hosts import connect`, then
`connect.plan(...)`). Inside a package, modules import each other's private
modules directly, never their own package's `__init__`, which loads every
module of the package. The modules directly under `brainwiki/` (`engine`,
`errors`, `ids`, and the like) stay public: re-exporting them from the root
would load the whole package on any import. Tests may import private
modules. `scripts/check_visibility.py` enforces all of this, and that every
re-export is used outside its package.

## 3. Dependencies

| Package | Why | Notes |
|---|---|---|
| `mcp` (2.x) | MCP server | Pulls in pydantic, starlette, uvicorn, httpx2, jsonschema, and others. Imported only by `brainwiki.mcp`. |
| `PyYAML` | Frontmatter parsing | `CSafeLoader` when available. Writers edit frontmatter line by line instead of dumping YAML, so formatting is preserved. |
| `tomlkit` | Editing `config.toml` and `brain.toml` without losing comments | Reading uses stdlib `tomllib`. |
| `filelock` | Cross-platform advisory locks | Imported when a lock is taken: it loads `asyncio` (~40 ms), which read-only commands never need. |
| `typer` | The CLI parser: nested subcommands, typed validation, shell completion ([CLI and MCP §2.4](cli-and-mcp.md#24-parser-and-startup-cost)) | Vendors Click, and installs rich and shellingham; rich markup is off, so rich is never imported. `typer-slim` is now only an alias that installs `typer`. |

Standard library for everything else: `sqlite3`, `tomllib`, `json`, `re`, `hashlib`, `gzip`, `subprocess`, `http.server`. ULIDs are
generated by a small internal function.

There are no optional extras; a file watcher for long-running processes is
in the [backlog](../roadmap/ideas.md).

Development tools are a `dev` dependency group in `pyproject.toml`
(`uv sync` installs it): `pytest`, `hypothesis`, and `ruff`, with `ruff`
pinned to an exact version because its formatting changes between
releases. There is no type checker or coverage tool in the toolchain.

Policy: a new runtime dependency needs a reason in its pull request, a
compatible license (Apache-2.0, MIT, BSD, PSF, MPL-2.0 for tools only),
and a version range in `pyproject.toml`. The repository tracks no
lockfile.

Supported Python: 3.11 to the latest release. Supported SQLite: 3.35+
with FTS5; trigram (3.34+) is used when present.

## 4. Packaging and distribution

- Build backend: `hatchling`. The plugin files at the repo root are copied
  into `brainwiki/assets/plugin/` at build time, so `brain connect` can
  install exactly the same files the marketplaces serve.
- Console scripts: `brain`, `brain-wiki` (same entry point), and
  `brain-wiki-mcp` (equivalent to `brain mcp`, for registries and configs
  that expect a dedicated server binary).
- Install paths users are told about: `uv tool install brain-wiki`,
  `pipx install brain-wiki`, or `uvx --from brain-wiki brain …` with no
  install.
- PyPI: `brain-wiki` is the package; `brainwiki` is published as a thin
  alias that depends on it, so either name installs the same thing.
- The README carries the `mcp-name:` marker the MCP Registry uses to verify
  PyPI ownership, and `server.json` declares the PyPI package with stdio
  transport.
- One version number, in `pyproject.toml`. `scripts/sync_versions.py`
  writes it into every plugin manifest and `server.json`; CI fails if they
  disagree.
- An npm launcher package (`npx brain-wiki`, delegating to `uvx`) is
  deferred until there is demand.

## 5. Performance budgets

| Operation | Budget | Measured by |
|---|---|---|
| Freshness check, no changes, 10k notes | < 150 ms | bench `perf` |
| Search p95, 10k notes | < 50 ms | bench `perf` |
| Lint, whole brain, warm, 10k notes | < 1 s | bench `perf` |
| Full index rebuild, 10k notes | < 30 s | bench `perf` |

The perf suite also checks read, orientation, and one-file update
([index and search §10](index-and-search.md#10-performance-budgets)). Below 10k
notes its thresholds are relaxed 2×. It is not part of `scripts/check.py`;
run `brain bench perf --sizes 10k` for performance work and before a
release. CLI start-up imports only the module of the command run, and help
none of them ([CLI and MCP §2.4](cli-and-mcp.md#24-parser-and-startup-cost)); a
test checks what `brain --help` imports, but no check measures time.

## 6. Testing

| Layer | What | Tools |
|---|---|---|
| Unit | Parsers, writers, format 1/2 → 3 conversion, `brain validate`, link resolution, profile filtering, path safety | pytest |
| Property | Parse → write → parse round trips; writers never change untouched lines; conversion keeps every claim's text | hypothesis |
| Index | Schema, freshness (edits, renames, deletes), supersession guards in both directions and through chains | pytest on temp brains |
| Commit and schedule | `brain commit` on temp git repositories with a local origin; crontab and LaunchAgent backends through an injected command runner, never the real crontab or launchd | pytest |
| CLI | Every command end to end on temp brains with `BRAIN_WIKI_*_DIR` overrides | pytest + subprocess |
| MCP | Every tool via the SDK's in-memory client; error codes; schema conformance | `mcp.Client(server)` |
| Session readers | Synthetic sessions per host → normalized turns, routing, inputs | pytest |
| Plugin | Manifests parse and agree, skills follow the Agent Skills rules | pytest (`tests/test_plugin.py`) |
| Hosts | Plugin loads and smoke flows in real hosts | by hand before releases; no automated host tests |
| Bench | [eval bench](eval-bench.md) `retrieval` and `lint` suites on a small brain | `brain bench`, from `scripts/check.py` |

Fixtures are synthetic: a small hand-written example brain about a
fictional software project, plus generated brains for scale tests. No
fixture may contain real personal data.

Platforms in CI: Ubuntu and macOS, Python 3.11 and 3.13 (§8). Windows is
best-effort and not tested in CI.

## 7. Code quality

- `ruff` for linting and formatting, with the `S` (bandit) rules on, which
  flag `shell=True`, `eval`, and similar calls.
- No type checker runs and there is no coverage target.
- No network access in core code, except the fetch and push `brain commit`
  asks `git` to make to the brain's own remote: a convention, not a check.

## 8. Continuous integration

`uv run scripts/check.py` is the one entry point, locally and in CI. It
runs, and reports each step:

1. `ruff check` and `ruff format --check` on `src`, `tests`, and `scripts`.
2. The test suite (`pytest`).
3. Minimal visibility (`scripts/check_visibility.py`): a module-level name
   is public only when another module, a test, or a script uses it, it names
   a class in a public signature, or it is on the script's short allowlist.
4. Version consistency (`scripts/sync_versions.py --check`, §4).
5. The docs brain is current (`scripts/build_docs_brain.py --check`).
6. Visualizer bundle check (`scripts/check_viz.py`): the committed bundle
   is complete and `BUILD_INFO.json` names a clean brain-wiki-viz commit.
   With `--source <checkout>` (a brain-wiki-viz checkout at that commit,
   after `npm ci`) it also rebuilds the bundle and fails if the result
   differs. brain-wiki-viz has no CI of its own, so brain-wiki's CI also
   runs its type check, unit tests, and public-registry lockfile check
   (`npm run check`) in that checkout.
7. Package contents: builds the wheel and sdist and checks that the
   plugin files, prompts, skills, and visualizer are in the wheel and that
   the sdist holds only allowed top-level entries.
8. The offline bench: `retrieval` and `lint` on a 300-note brain.

GitHub Actions runs `scripts/check.py` on Ubuntu and macOS with Python 3.11
and 3.13 on every push and pull request.

## 9. Release

1. Set the version (a final `X.Y.Z` or a development release such as
   `X.Y.Z.devN`; the first release is `0.1.0.dev0`), date its `CHANGELOG.md`
   entry, run `scripts/sync_versions.py`, and commit.
2. Push `main` and the tag `vX.Y.Z` together. `.github/workflows/release.yml` checks the tag
   against the version and the changelog, runs `scripts/check.py`, builds the
   sdist and wheel, publishes them to PyPI with trusted publishing, and
   creates the GitHub release from the changelog entry. GitHub labels it the
   way pip treats it: a dev, alpha, beta, or rc version is marked Latest while
   no final release exists, and a pre-release once one does. Its job that publishes `server.json` to the MCP
   Registry (GitHub OIDC) is turned off until the project decides to be
   listed, with the repository public first: a Registry install gets only the
   MCP server, and its first run depends on the `not_configured` hint leading
   to `uvx --from brain-wiki brain setup --guide` (skills and onboarding §3.1). When turned on,
   it lists final versions only.
3. Move `main` to the next `.devN` version. The plugin files keep pointing at
   the newest dated release, final or development (`scripts/sync_versions.py`),
   because the Claude Code and Codex marketplaces read the repository
   directly and Antigravity installs from the repository URL: a pin to an
   unreleased version would break every install.

## 10. Open-source hygiene

- No real personal data anywhere: examples use a fictional project and
  generic domains; docs never reference private systems.
- Maintainers may keep a local, untracked denylist of private strings
  (names, hosts, paths) checked by a local pre-commit hook, so private
  context cannot slip into commits. The denylist itself never enters the
  repository.
- `SECURITY.md` explains how to report vulnerabilities privately.
