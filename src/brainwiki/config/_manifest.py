"""`brain.toml`: the manifest that marks a directory as a brain (brain-format.md §3)."""

from __future__ import annotations

import fnmatch
import re
import tomllib
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from brainwiki import FORMAT_VERSION
from brainwiki.errors import FormatError, UsageError

MANIFEST = "brain.toml"
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,63}$")
_WRITE_CAPABILITIES = ("edit", "propose_rules", "harvest")
# What an agent without its own profile may do: edit notes. Capturing episodes needs no capability.
_DEFAULT_WRITE = ("edit",)
# Capabilities brain-wiki no longer has; older brain.toml files still list them.
_REMOVED_CAPABILITIES = frozenset({"episodes"})


@dataclass
class Layout:
    topics_dir: str = "topics"
    inbox_dir: str = "inbox"
    archive_dir: str = "archive"
    reports_dir: str = "reports"
    topic_page: str = "_Index.md"
    topic_rules: str = "_Rules.md"
    ignore: list[str] = field(default_factory=list)
    # The page name before `_Index.md` (D42), still found when brain.toml names no page. Set by
    # parse_manifest, never read from brain.toml.
    legacy_topic_page: str = ""

    @property
    def episodes_dir(self) -> str:
        return f"{self.inbox_dir}/episodes"

    @property
    def agents_inbox_dir(self) -> str:
        return f"{self.inbox_dir}/agents"

    @property
    def proposals_dir(self) -> str:
        return f"{self.inbox_dir}/proposals"

    @property
    def archive_episodes_dir(self) -> str:
        return f"{self.archive_dir}/episodes"


@dataclass
class Budgets:
    rules_max_lines: int = 100
    rules_max_chars: int = 4000
    agents_md_max_lines: int = 150
    topic_rules_max_lines: int = 60
    orient_max_tokens: int = 1500


@dataclass
class LintCfg:
    profile: str = "strict"
    stale_inbox_days: int = 14
    overrides: dict[str, str] = field(default_factory=dict)


@dataclass
class SearchCfg:
    freshness_ms: int = 1000
    max_guards_per_hit: int = 10
    status_factor: dict[str, float] = field(
        default_factory=lambda: {"active": 1.0, "superseded": 0.35, "archived": 0.2}
    )
    kind_factor: dict[str, float] = field(
        default_factory=lambda: {
            "topic": 1.15,
            "note": 1.0,
            "episode": 0.7,
            "archived_episode": 0.5,
        }
    )
    recency_half_life_days: float = 180.0


@dataclass
class ConsolidateCfg:
    max_episodes_per_run: int = 50


@dataclass
class GitCfg:
    mode: str = "auto"


@dataclass
class ReportsCfg:
    after_consolidate: bool = True
    commit: bool = False


@dataclass
class TopicCfg:
    slug: str
    path: str
    path_declared: bool = False  # without one, the folder whose slug matches, at any depth
    title: str | None = None
    description: str | None = None


@dataclass
class Profile:
    name: str
    write: list[str] = field(default_factory=lambda: list(_DEFAULT_WRITE))
    read_origin: bool = False

    def can(self, capability: str) -> bool:
        return capability in self.write

    def refusal(self, host: str | None, capability: str, doing: str) -> str:
        """Why this profile may not do something, and the command that allows it for this
        agent alone."""
        return (
            f"the {self.name!r} profile may not {doing}; the user can allow it for this agent "
            f"with `brain agents grant {host or 'default'} {capability}`"
        )


_SECTIONS: dict[str, type] = {
    "layout": Layout,
    "budgets": Budgets,
    "lint": LintCfg,
    "search": SearchCfg,
    "consolidate": ConsolidateCfg,
    "git": GitCfg,
    "reports": ReportsCfg,
}
_TOP_LEVEL = {"format", "id", "name", "description", "topics", "agents", *_SECTIONS}
# Settings renamed when topic pages stopped being called hubs; older brain.toml files use them.
_RENAMED = {"layout.hub_filename": "topic_page"}
_INTERNAL = {"layout.legacy_topic_page"}
_TOPIC_KEYS = {"path", "title", "description"}
_AGENT_KEYS = {"write", "read_origin"}


@dataclass
class Manifest:
    format: int
    id: str
    name: str | None = None
    description: str | None = None
    layout: Layout = field(default_factory=Layout)
    budgets: Budgets = field(default_factory=Budgets)
    lint: LintCfg = field(default_factory=LintCfg)
    search: SearchCfg = field(default_factory=SearchCfg)
    consolidate: ConsolidateCfg = field(default_factory=ConsolidateCfg)
    git: GitCfg = field(default_factory=GitCfg)
    reports: ReportsCfg = field(default_factory=ReportsCfg)
    topics: dict[str, TopicCfg] = field(default_factory=dict)
    agents: dict[str, dict[str, Any]] = field(default_factory=dict)
    unknown_keys: list[str] = field(default_factory=list)

    # -- profiles ------------------------------------------------------
    def profile(self, host: str | None) -> Profile:
        if host in (None, "owner"):
            return Profile(
                name="owner",
                write=list(_WRITE_CAPABILITIES),
                read_origin=True,
            )
        raw = self.agents.get(host) or self.agents.get("default") or {}
        return Profile(
            name=host if host in self.agents else "default",
            write=[
                str(w) for w in raw.get("write", _DEFAULT_WRITE) if w not in _REMOVED_CAPABILITIES
            ],
            read_origin=bool(raw.get("read_origin", False)),
        )

    def is_ignored(self, rel: str) -> bool:
        if rel.startswith(".") or "/." in rel:
            return True
        if not self.layout.ignore:
            return False
        first = rel.split("/", 1)[0]
        return any(
            fnmatch.fnmatch(rel, pat) or fnmatch.fnmatch(first, pat) for pat in self.layout.ignore
        )

    def lint_profile_for(self, rel: str) -> str:
        for pattern, profile in self.lint.overrides.items():
            if fnmatch.fnmatch(rel, pattern):
                return profile
        return self.lint.profile


def _checked(where: str, value: Any, default: Any, annotation: str = "") -> Any:
    """`value` if it has the type of the setting's default; floats also take integers."""
    if isinstance(default, bool):
        ok, kind = isinstance(value, bool), "true or false"
    elif isinstance(default, int):
        ok, kind = isinstance(value, int) and not isinstance(value, bool), "a whole number"
    elif isinstance(default, float):
        ok, kind = isinstance(value, int | float) and not isinstance(value, bool), "a number"
        value = float(value) if ok else value
    elif isinstance(default, str):
        ok, kind = isinstance(value, str), "a string"
    elif isinstance(default, list):
        ok = isinstance(value, list) and all(isinstance(v, str) for v in value)
        kind = "a list of strings"
    elif isinstance(default, dict):
        numbers = annotation.endswith("float]")
        kind = "a table of numbers" if numbers else "a table of strings"
        ok = isinstance(value, dict) and all(
            (isinstance(v, int | float) and not isinstance(v, bool))
            if numbers
            else isinstance(v, str)
            for v in value.values()
        )
    else:
        ok, kind = True, ""
    if not ok:
        raise FormatError(f"brain.toml: {where} must be {kind}, not {value!r}")
    return value


def _section(cls: type, raw: Any, name: str, unknown: list[str]) -> Any:
    if raw is None:
        return cls()
    if not isinstance(raw, dict):
        raise FormatError(f"[{name}] must be a table")
    fields = cls.__dataclass_fields__
    defaults = cls()
    kwargs = {}
    for given, value in raw.items():
        key = _RENAMED.get(f"{name}.{given}", str(given))
        if key in fields and f"{name}.{key}" not in _INTERNAL:
            kwargs[key] = _checked(
                f"{name}.{key}", value, getattr(defaults, key), str(fields[key].type)
            )
        else:
            unknown.append(f"{name}.{key}")
    factors = kwargs.get("kind_factor")
    if factors is not None and "hub" in factors:
        factors.setdefault("topic", factors.pop("hub"))
    return cls(**kwargs)


def _table(where: str, value: Any) -> dict[str, Any]:
    if value is None:
        return {}
    if not isinstance(value, dict):
        raise FormatError(f"[{where}] must be a table")
    return value


def parse_manifest(text: str) -> Manifest:
    try:
        data = tomllib.loads(text)
    except tomllib.TOMLDecodeError as exc:
        raise FormatError(f"brain.toml is not valid TOML: {exc}") from exc
    unknown = [k for k in data if k not in _TOP_LEVEL]
    if "format" not in data or "id" not in data:
        raise FormatError("brain.toml must define 'format' and 'id'")
    fmt = _checked("format", data["format"], 0)
    for key in ("id", "name", "description"):
        if key in data:
            _checked(key, data[key], "")
    sections = {
        name: _section(cls, data.get(name), name, unknown) for name, cls in _SECTIONS.items()
    }
    topics: dict[str, TopicCfg] = {}
    layout: Layout = sections["layout"]
    raw_layout = data.get("layout") or {}
    if "topic_page" not in raw_layout and "hub_filename" not in raw_layout:
        layout.legacy_topic_page = "index.md"
    for slug, raw in _table("topics", data.get("topics")).items():
        raw = _table(f"topics.{slug}", raw)
        unknown += [f"topics.{slug}.{k}" for k in raw if k not in _TOPIC_KEYS]
        for key in _TOPIC_KEYS & set(raw):
            _checked(f"topics.{slug}.{key}", raw[key], "")
        topics[slug] = TopicCfg(
            slug=slug,
            path=str(raw.get("path", f"{layout.topics_dir}/{slug}")).rstrip("/"),
            path_declared="path" in raw,
            title=raw.get("title"),
            description=raw.get("description"),
        )
    agents: dict[str, dict[str, Any]] = {}
    for name, raw in _table("agents", data.get("agents")).items():
        raw = _table(f"agents.{name}", raw)
        unknown += [f"agents.{name}.{k}" for k in raw if k not in _AGENT_KEYS]
        if "write" in raw:
            _checked(f"agents.{name}.write", raw["write"], [])
        if "read_origin" in raw:
            _checked(f"agents.{name}.read_origin", raw["read_origin"], False)
        agents[str(name)] = dict(raw)
    return Manifest(
        format=fmt,
        id=data["id"],
        name=data.get("name"),
        description=data.get("description") or None,
        topics=topics,
        agents=agents,
        unknown_keys=unknown,
        **sections,
    )


def grant(text: str, host: str, capabilities: list[str]) -> str:
    """`brain.toml` text with `capabilities` added to `[agents.<host>]` write, comments kept.

    A new table starts from what the host may already do (its default profile), so a grant
    never takes anything away.
    """
    return _set_write(text, host, add=capabilities)


def revoke(text: str, host: str, capabilities: list[str]) -> str:
    """`brain.toml` text with `capabilities` removed from `[agents.<host>]` write; a host
    without its own table gets one, so other agents keep the default profile."""
    return _set_write(text, host, remove=capabilities)


def _set_write(
    text: str, host: str, *, add: list[str] | None = None, remove: list[str] | None = None
) -> str:
    import tomlkit

    add, remove = add or [], remove or []
    unknown = sorted(set(add + remove) - set(_WRITE_CAPABILITIES))
    if unknown:
        raise UsageError(
            f"unknown capability {', '.join(unknown)}; use {', '.join(_WRITE_CAPABILITIES)}"
        )
    if not SLUG_RE.match(host):
        raise UsageError(f"{host!r} is not a host id (e.g. claude-code, codex, default)")
    wanted = (set(parse_manifest(text).profile(host).write) | set(add)) - set(remove)
    doc = tomlkit.parse(text)
    agents = doc.get("agents")
    if agents is None:
        agents = tomlkit.table(is_super_table=True)
        doc["agents"] = agents
    if host not in agents:
        agents[host] = tomlkit.table()
    agents[host]["write"] = [c for c in _WRITE_CAPABILITIES if c in wanted]
    return tomlkit.dumps(doc)


def load_manifest(root: Path) -> Manifest:
    path = root / MANIFEST
    if not path.is_file():
        raise FormatError(f"{root} is not a brain (no {MANIFEST})")
    manifest = parse_manifest(path.read_text(encoding="utf-8"))
    if manifest.format > FORMAT_VERSION:
        raise FormatError(
            f"brain format {manifest.format} is newer than this brain-wiki supports ({FORMAT_VERSION}); upgrade brain-wiki"
        )
    return manifest
