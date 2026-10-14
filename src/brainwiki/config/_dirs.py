"""Machine directories: XDG layout on Linux and macOS, LOCALAPPDATA on Windows."""

from __future__ import annotations

import os
import sys
from pathlib import Path

_APP = "brain-wiki"


def _home() -> Path:
    return Path(os.path.expanduser("~"))


def _windows_base(var: str) -> Path:
    return Path(os.environ.get(var) or (_home() / "AppData" / "Local")) / _APP


def config_file() -> Path:
    override = os.environ.get("BRAIN_WIKI_CONFIG")
    if override:
        return Path(override).expanduser()
    if sys.platform == "win32":
        return _windows_base("APPDATA") / "config.toml"
    base = os.environ.get("XDG_CONFIG_HOME") or str(_home() / ".config")
    return Path(base) / _APP / "config.toml"


def state_dir() -> Path:
    override = os.environ.get("BRAIN_WIKI_STATE_DIR")
    if override:
        return Path(override).expanduser()
    if sys.platform == "win32":
        return _windows_base("LOCALAPPDATA") / "state"
    base = os.environ.get("XDG_STATE_HOME") or str(_home() / ".local" / "state")
    return Path(base) / _APP


def cache_dir() -> Path:
    override = os.environ.get("BRAIN_WIKI_CACHE_DIR")
    if override:
        return Path(override).expanduser()
    if sys.platform == "win32":
        return _windows_base("LOCALAPPDATA") / "cache"
    base = os.environ.get("XDG_CACHE_HOME") or str(_home() / ".cache")
    return Path(base) / _APP


def data_dir() -> Path:
    override = os.environ.get("BRAIN_WIKI_DATA_DIR")
    if override:
        return Path(override).expanduser()
    if sys.platform == "win32":
        return _windows_base("LOCALAPPDATA") / "data"
    base = os.environ.get("XDG_DATA_HOME") or str(_home() / ".local" / "share")
    return Path(base) / _APP


def brain_state_dir(brain_key: str) -> Path:
    path = state_dir() / "brains" / brain_key
    path.mkdir(parents=True, exist_ok=True)
    return path


def brain_cache_dir(brain_key: str) -> Path:
    path = cache_dir() / "brains" / brain_key
    path.mkdir(parents=True, exist_ok=True)
    return path
