"""`brain.toml`: the manifest that marks a directory as a brain (design doc 02 §3)."""

from __future__ import annotations

import fnmatch
import re
import tomllib
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from brainwiki import FORMAT_VERSION
from brainwiki.errors import FormatError

MANIFEST = "brain.toml"
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,63}$")
WRITE_CAPABILITIES = ("episodes", "edit", "propose_rules", "consolidate", "harvest", "review")
AGENT_EDITS = ("allow", "review", "deny")


@dataclass
class Layout:
    topics_dir: str = "topics"
    inbox_dir: str = "inbox"
    archive_dir: str = "archive"
    reports_dir: str = "reports"
    hub_filename: str = "index.md"
    ignore: list[str] = field(default_factory=list)

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
        default_factory=lambda: {"hub": 1.15, "note": 1.0, "episode": 0.7, "archived_episode": 0.5}
    )
    recency_half_life_days: float = 180.0


@dataclass
class ConsolidateCfg:
    backend: str = "agent"
    command: str | list[str] = "claude-code"
    model: str = ""
    timeout_s: int = 600
    review: str = "auto"
    review_tainted: bool = False
    max_episodes_per_run: int = 50
    max_supersede_ratio: float = 0.25
    device: str = ""
    origin_context_turns: int = 0


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
    review: str | None = None
    agent_edits: str | None = (
        None  # None inherits (allow at the top); others outside AGENT_EDITS deny
    )


@dataclass
class Profile:
    name: str
    write: list[str] = field(default_factory=lambda: ["episodes"])
    read_origin: bool = False

    def can(self, capability: str) -> bool:
        return capability in self.write


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
_TOPIC_KEYS = {"path", "title", "description", "review", "agent_edits"}
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
                write=list(WRITE_CAPABILITIES),
                read_origin=True,
            )
        raw = self.agents.get(host) or self.agents.get("default") or {}
        return Profile(
            name=host if host in self.agents else "default",
            write=[str(w) for w in raw.get("write", ["episodes"])],
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


def _section(cls: type, raw: Any, name: str, unknown: list[str]) -> Any:
    if raw is None:
        return cls()
    if not isinstance(raw, dict):
        raise FormatError(f"[{name}] must be a table")
    known = set(cls.__dataclass_fields__)
    kwargs = {}
    for key, value in raw.items():
        if key in known:
            kwargs[key] = value
        else:
            unknown.append(f"{name}.{key}")
    return cls(**kwargs)


def parse_manifest(text: str) -> Manifest:
    try:
        data = tomllib.loads(text)
    except tomllib.TOMLDecodeError as exc:
        raise FormatError(f"brain.toml is not valid TOML: {exc}") from exc
    unknown = [k for k in data if k not in _TOP_LEVEL]
    if "format" not in data or "id" not in data:
        raise FormatError("brain.toml must define 'format' and 'id'")
    fmt = int(data["format"])
    sections = {
        name: _section(cls, data.get(name), name, unknown) for name, cls in _SECTIONS.items()
    }
    topics: dict[str, TopicCfg] = {}
    layout: Layout = sections["layout"]
    for slug, raw in (data.get("topics") or {}).items():
        if not isinstance(raw, dict):
            raise FormatError(f"[topics.{slug}] must be a table")
        unknown += [f"topics.{slug}.{k}" for k in raw if k not in _TOPIC_KEYS]
        topics[slug] = TopicCfg(
            slug=slug,
            path=str(raw.get("path", f"{layout.topics_dir}/{slug}")).rstrip("/"),
            path_declared="path" in raw,
            title=raw.get("title"),
            description=raw.get("description"),
            review=raw.get("review"),
            agent_edits=str(raw["agent_edits"]) if "agent_edits" in raw else None,
        )
    agents = {str(k): dict(v) for k, v in (data.get("agents") or {}).items() if isinstance(v, dict)}
    for name, raw in agents.items():
        unknown += [f"agents.{name}.{k}" for k in raw if k not in _AGENT_KEYS]
    manifest = Manifest(
        format=fmt,
        id=str(data["id"]),
        name=data.get("name"),
        description=str(data["description"]) if data.get("description") else None,
        topics=topics,
        agents=agents,
        unknown_keys=unknown,
        **sections,
    )
    return manifest


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
