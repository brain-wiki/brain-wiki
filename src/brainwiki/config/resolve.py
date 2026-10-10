"""Choose exactly one brain for a command, MCP call, or hook (design doc 03 §3)."""

from __future__ import annotations

import hashlib
import os
import tomllib
from dataclasses import dataclass
from pathlib import Path

from brainwiki.config.manifest import MANIFEST, Manifest, load_manifest
from brainwiki.config.user import UserConfig, load_user_config
from brainwiki.errors import Forbidden, NotConfigured, NotFound

PROJECT_FILE = ".brain-wiki.toml"


@dataclass
class Brain:
    root: Path
    manifest: Manifest
    name: str | None = None

    @property
    def id(self) -> str:
        return self.manifest.id

    @property
    def key(self) -> str:
        """Key for machine state; copies of one brain at different paths get distinct keys."""
        return state_key(self.manifest.id, self.root)

    @property
    def display_name(self) -> str:
        return self.name or self.manifest.name or self.root.name


def state_key(brain_id: str, root: Path) -> str:
    from brainwiki.config.dirs import state_dir

    marker = state_dir() / "brains" / brain_id / "root"
    resolved = str(root.resolve())
    if marker.exists():
        recorded = marker.read_text(encoding="utf-8").strip()
        if recorded and recorded != resolved and Path(recorded).joinpath(MANIFEST).exists():
            return f"{brain_id}-{hashlib.sha256(resolved.encode()).hexdigest()[:8]}"
    marker.parent.mkdir(parents=True, exist_ok=True)
    marker.write_text(resolved, encoding="utf-8")
    return brain_id


def open_brain(root: Path, name: str | None = None) -> Brain:
    root = root.expanduser()
    if not (root / MANIFEST).is_file():
        raise NotFound(f"{root} is not a brain (no {MANIFEST})")
    return Brain(root=root.resolve(), manifest=load_manifest(root), name=name)


def find_brain_root(start: Path) -> Path | None:
    current = start.resolve()
    for candidate in [current, *current.parents]:
        if (candidate / MANIFEST).is_file():
            return candidate
    return None


def _project_choice(cwd: Path) -> str | None:
    current = cwd.resolve()
    for candidate in [current, *current.parents]:
        project = candidate / PROJECT_FILE
        if project.is_file():
            try:
                data = tomllib.loads(project.read_text(encoding="utf-8"))
            except tomllib.TOMLDecodeError:
                return None
            value = data.get("brain")
            return str(value) if value else None
    return None


def _from_choice(choice: str, user: UserConfig) -> Brain | None:
    if choice in user.brains:
        return open_brain(user.brains[choice], name=choice)
    as_path = Path(choice).expanduser()
    if (as_path / MANIFEST).is_file():
        name = next((n for n, p in user.brains.items() if p.resolve() == as_path.resolve()), None)
        return open_brain(as_path, name=name)
    return None


def resolve_brain(
    explicit: str | None = None,
    *,
    host: str | None = None,
    cwd: Path | None = None,
    user: UserConfig | None = None,
) -> Brain:
    user = user or load_user_config()
    cwd = cwd or Path.cwd()
    host_cfg = user.host(host)
    candidates: list[tuple[str, str | None]] = [
        ("argument", explicit),
        ("environment", os.environ.get("BRAIN_WIKI_BRAIN")),
        ("project file", _project_choice(cwd)),
        ("host default", host_cfg.brain),
        ("user default", user.default),
    ]
    for source, choice in candidates:
        if not choice:
            continue
        brain = _from_choice(choice, user)
        if brain is None:
            if source in ("argument", "environment"):
                raise NotFound(
                    f"brain {choice!r} (from {source}) is not registered and is not a brain path"
                )
            continue
        _check_host_limit(brain, host, host_cfg.brains)
        return brain
    root = find_brain_root(cwd)
    if root is not None:
        brain = open_brain(root)
        _check_host_limit(brain, host, host_cfg.brains)
        return brain
    raise NotConfigured(
        "no brain is configured; run `brain init <path>` or ask your agent to set up brain-wiki"
    )


def _check_host_limit(brain: Brain, host: str | None, allowed: list[str] | None) -> None:
    if host is None or allowed is None:
        return
    if brain.name not in allowed:
        raise Forbidden(f"host {host!r} may not use brain {brain.display_name!r}")


def route_brain(cwd: str | None, host: str, user: UserConfig) -> Brain | None:
    """The brain a session's working directory belongs to, or None (05 §2.2, Route).

    Unlike `resolve_brain`, there is no fallback to the user's default brain: a session that
    routes nowhere is skipped, never filed into an unrelated brain.
    """
    import fnmatch

    if not cwd:
        return None
    path = Path(cwd).expanduser()
    routes = user.harvest.get("routes") or {}
    for pattern, choice in routes.items():
        expanded = str(Path(pattern).expanduser()) if pattern.startswith("~") else pattern
        if fnmatch.fnmatch(str(path), expanded) or fnmatch.fnmatch(str(path) + "/", expanded):
            brain = _from_choice(str(choice), user)
            if brain is not None:
                return brain
    choice = _project_choice(path) if path.exists() else None
    brain = _from_choice(choice, user) if choice else None
    if brain is not None:
        return brain
    root = find_brain_root(path) if path.exists() else None
    if root is not None:
        return open_brain(root)
    for name, brain_root in user.brains.items():
        try:
            path.resolve().relative_to(brain_root.resolve())
            return open_brain(brain_root, name=name)
        except ValueError:
            continue
    host_default = user.host(host).brain
    return _from_choice(host_default, user) if host_default else None
