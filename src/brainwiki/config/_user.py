"""The per-user config file: where brains live and per-host choices (design doc 03 §2)."""

from __future__ import annotations

import socket
import tomllib
from dataclasses import dataclass, field
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.config._dirs import config_file
from brainwiki.errors import Conflict, FormatError

if TYPE_CHECKING:
    import tomlkit


@dataclass
class HostCfg:
    brain: str | None = None
    brains: list[str] | None = None


@dataclass
class UserConfig:
    path: Path
    default: str | None = None
    device: str | None = None
    brains: dict[str, Path] = field(default_factory=dict)
    hosts: dict[str, HostCfg] = field(default_factory=dict)
    harvest: dict[str, Any] = field(default_factory=dict)

    @property
    def device_name(self) -> str:
        return self.device or socket.gethostname().split(".")[0]

    def host(self, host_id: str | None) -> HostCfg:
        if host_id is None:
            return HostCfg()
        return self.hosts.get(host_id, HostCfg())

    def harvest_enabled(self, host_id: str) -> bool:
        return bool(self.harvest.get("enabled")) and host_id in self.harvest.get("hosts", [])


def load_user_config(path: Path | None = None) -> UserConfig:
    path = path or config_file()
    if not path.exists():
        return UserConfig(path=path)
    try:
        data = tomllib.loads(path.read_text(encoding="utf-8"))
    except tomllib.TOMLDecodeError as exc:
        raise FormatError(f"{path} is not valid TOML: {exc}") from exc
    brains = {}
    for name, raw in (data.get("brains") or {}).items():
        if isinstance(raw, dict) and "path" in raw:
            brains[name] = Path(str(raw["path"])).expanduser()
    hosts = {}
    for host_id, raw in (data.get("hosts") or {}).items():
        if isinstance(raw, dict):
            hosts[host_id] = HostCfg(brain=raw.get("brain"), brains=raw.get("brains"))
    return UserConfig(
        path=path,
        default=data.get("default"),
        device=data.get("device"),
        brains=brains,
        hosts=hosts,
        harvest=dict(data.get("harvest") or {}),
    )


def _load_doc(path: Path) -> tomlkit.TOMLDocument:
    import tomlkit

    if path.exists():
        return tomlkit.parse(path.read_text(encoding="utf-8"))
    return tomlkit.document()


def _save_doc(path: Path, doc: tomlkit.TOMLDocument) -> None:
    import tomlkit

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(tomlkit.dumps(doc), encoding="utf-8")


def _brain_id(root: Path) -> str | None:
    try:
        return str(tomllib.loads((root / "brain.toml").read_text(encoding="utf-8")).get("id"))
    except (OSError, tomllib.TOMLDecodeError):
        return None


def _moved(old: Path, new: Path) -> bool:
    """A name may follow its brain to a new folder: the old folder is no longer a brain, or
    both hold the same brain (03 §5, Move)."""
    old_id = _brain_id(old.expanduser())
    return old_id is None or old_id == _brain_id(new)


def registration_conflict(name: str, brain_path: Path, *, path: Path | None = None) -> str | None:
    """Why `name` cannot be registered for `brain_path`: the name is taken by another brain, or
    the folder is registered under another name."""
    user = load_user_config(path)
    target = brain_path.expanduser().resolve()
    current = user.brains.get(name)
    if (
        current is not None
        and current.expanduser().resolve() != target
        and not _moved(current, target)
    ):
        return (
            f"a brain named {name!r} is already registered at {current}; pick another name, "
            f"or `brain brains remove {name}` first"
        )
    for other, where in user.brains.items():
        if other != name and where.expanduser().resolve() == target:
            return (
                f"{brain_path} is already registered as {other!r}; "
                f"use `brain brains rename {other} {name}`"
            )
    return None


def register_brain(
    name: str, brain_path: Path, *, make_default: bool | None = None, path: Path | None = None
) -> None:
    """Add a brain entry, preserving the file's comments and formatting. Refuses a name or a
    folder that is already registered, so a typo never silently re-points a brain."""
    import tomlkit

    problem = registration_conflict(name, brain_path, path=path)
    if problem:
        raise Conflict(problem)
    path = path or config_file()
    doc = _load_doc(path)
    brains = doc.get("brains")
    if brains is None:
        brains = tomlkit.table(is_super_table=True)
        doc["brains"] = brains
    entry = tomlkit.table()
    entry["path"] = _display_path(brain_path)
    brains[name] = entry
    if make_default or (make_default is None and not doc.get("default")):
        doc["default"] = name
    _save_doc(path, doc)


def unregister_brain(name: str, *, path: Path | None = None) -> bool:
    path = path or config_file()
    doc = _load_doc(path)
    brains = doc.get("brains")
    if not brains or name not in brains:
        return False
    del brains[name]
    if doc.get("default") == name:
        del doc["default"]
    _save_doc(path, doc)
    return True


def set_value(dotted: str, value: Any, *, path: Path | None = None) -> None:
    """Set a dotted key such as `harvest.enabled` or `hosts.codex.brain`."""
    import tomlkit

    path = path or config_file()
    doc = _load_doc(path)
    keys = dotted.split(".")
    table: Any = doc
    for key in keys[:-1]:
        if key not in table:
            table[key] = tomlkit.table()
        table = table[key]
    table[keys[-1]] = value
    _save_doc(path, doc)


def _display_path(p: Path) -> str:
    home = Path.home()
    try:
        return "~/" + str(p.resolve().relative_to(home))
    except ValueError:
        return str(p.resolve())
