"""The per-user config file: where brains live and per-host choices (config-and-storage.md §2)."""

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
    both hold the same brain (config-and-storage.md §5, Move)."""
    old_id = _brain_id(old.expanduser())
    return old_id is None or old_id == _brain_id(new)


def registration_conflict(
    name: str, brain_path: Path, *, path: Path | None = None, replaces: str | None = None
) -> str | None:
    """Why `name` cannot be registered for `brain_path`: the name is taken by another brain, or
    the folder is registered under another name (other than `replaces`, the name being renamed)."""
    user = load_user_config(path)
    target = brain_path.expanduser().resolve()
    current = user.brains.get(name)
    if replaces is not None and replaces != name and current is not None:
        return (
            f"a brain named {name!r} is already registered at {current}; pick another name, "
            f"or `brain brains remove {name}` first"
        )
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
        if other not in (name, replaces) and where.expanduser().resolve() == target:
            return (
                f"{brain_path} is already registered as {other!r}; "
                f"use `brain brains rename {other} {name}`"
            )
    return None


def register_brain(
    name: str,
    brain_path: Path,
    *,
    make_default: bool | None = None,
    path: Path | None = None,
    replaces: str | None = None,
) -> None:
    """Add a brain entry, preserving the file's comments and formatting. Refuses a name or a
    folder that is already registered, so a typo never silently re-points a brain.

    With `replaces`, this is a rename: the old entry goes, and every reference to the old name
    (the default, `[hosts.*] brain` and `brains`, harvest routes) follows, in one write. On a
    conflict nothing changes."""
    import tomlkit

    problem = registration_conflict(name, brain_path, path=path, replaces=replaces)
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
    if replaces is not None and replaces != name and replaces in brains:
        entry = brains[replaces]
        del brains[replaces]
        _rename_references(doc, replaces, name)
    brains[name] = entry
    if make_default or (make_default is None and not doc.get("default")):
        doc["default"] = name
    _save_doc(path, doc)


def _rename_references(doc: tomlkit.TOMLDocument, old: str, new: str) -> None:
    if doc.get("default") == old:
        doc["default"] = new
    for table in (doc.get("hosts") or {}).values():
        if table.get("brain") == old:
            table["brain"] = new
        allowed = table.get("brains")
        if isinstance(allowed, list) and old in allowed:
            table["brains"] = [new if b == old else b for b in allowed]
    routes = (doc.get("harvest") or {}).get("routes")
    for pattern in list(routes or {}):
        if routes[pattern] == old:
            routes[pattern] = new


def unregister_brain(name: str, *, path: Path | None = None) -> list[str] | None:
    """Remove a brain entry and every reference to its name, in one write: the default, host
    defaults, host brain limits, and harvest routes. A host whose limit listed only this brain
    keeps an empty list, so removing a brain never widens what a host may read. Returns what
    else was removed (as `key` descriptions), or None when no brain has the name."""
    path = path or config_file()
    doc = _load_doc(path)
    brains = doc.get("brains")
    if not brains or name not in brains:
        return None
    del brains[name]
    cleaned = []
    if doc.get("default") == name:
        del doc["default"]
        cleaned.append("default")
    for host, table in (doc.get("hosts") or {}).items():
        if table.get("brain") == name:
            del table["brain"]
            cleaned.append(f"hosts.{host}.brain")
        allowed = table.get("brains")
        if isinstance(allowed, list) and name in allowed:
            table["brains"] = [b for b in allowed if b != name]
            cleaned.append(f"hosts.{host}.brains")
    routes = (doc.get("harvest") or {}).get("routes")
    for pattern in [p for p in routes or {} if routes[p] == name]:
        del routes[pattern]
        cleaned.append(f"harvest.routes[{pattern!r}]")
    _save_doc(path, doc)
    return cleaned


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


def limit_host(host: str, brains: list[str] | None, *, path: Path | None = None) -> str | None:
    """Set the brains `host` may use, or with None let it use every brain again. A host default
    (`[hosts.<id>] brain`) outside the new list moves to its first brain, since it would only
    be refused. Returns the host default afterwards."""
    path = path or config_file()
    doc = _load_doc(path)
    hosts = doc.setdefault("hosts", {})
    table = hosts.setdefault(host, {})
    pinned = table.get("brain")
    if brains is None:
        table.pop("brains", None)
    else:
        table["brains"] = brains
        if pinned is not None and pinned not in brains:
            table["brain"] = pinned = brains[0]
    if not table:
        del hosts[host]
    if not hosts:
        del doc["hosts"]
    _save_doc(path, doc)
    return None if pinned is None else str(pinned)


def set_harvest(host: str, on: bool, *, path: Path | None = None) -> list[str]:
    """Add or remove a host in `[harvest] hosts`, keeping `enabled` true while any is left.
    Returns the hosts harvest is on for afterwards."""
    user = load_user_config(path)
    hosts = [h for h in user.harvest.get("hosts", []) if h != host] + ([host] if on else [])
    set_value("harvest.hosts", hosts, path=path)
    set_value("harvest.enabled", bool(hosts), path=path)
    return hosts


def add_harvest_route(pattern: str, brain: str, *, path: Path | None = None) -> dict[str, str]:
    """Map sessions whose folder matches `pattern` to `brain`. The first matching route wins, so
    routes are kept longest pattern first: `~/work/**` still matches after `~/**` exists."""
    routes = dict(load_user_config(path).harvest.get("routes") or {})
    routes[pattern] = brain
    ordered = dict(sorted(routes.items(), key=lambda item: -len(item[0])))
    set_value("harvest.routes", ordered, path=path)
    return ordered


def _display_path(p: Path) -> str:
    home = Path.home()
    try:
        return "~/" + str(p.resolve().relative_to(home))
    except ValueError:
        return str(p.resolve())
