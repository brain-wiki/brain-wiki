"""User configuration, brain manifests, machine directories, and brain resolution."""

from __future__ import annotations

from brainwiki.config._dirs import (
    brain_cache_dir,
    brain_state_dir,
    cache_dir,
    config_file,
    data_dir,
    state_dir,
)
from brainwiki.config._manifest import (
    AGENT_EDITS,
    MANIFEST,
    SLUG_RE,
    Layout,
    Manifest,
    Profile,
    grant,
    parse_manifest,
    revoke,
)
from brainwiki.config._resolve import (
    AGENT_SETUP_HINT,
    Brain,
    open_brain,
    resolve_brain,
    route_brain,
)
from brainwiki.config._user import (
    UserConfig,
    add_harvest_route,
    load_user_config,
    register_brain,
    registration_conflict,
    set_harvest,
    set_value,
    unregister_brain,
)

__all__ = [
    "AGENT_EDITS",
    "AGENT_SETUP_HINT",
    "Brain",
    "Layout",
    "MANIFEST",
    "Manifest",
    "Profile",
    "SLUG_RE",
    "UserConfig",
    "add_harvest_route",
    "brain_cache_dir",
    "brain_state_dir",
    "cache_dir",
    "config_file",
    "data_dir",
    "grant",
    "load_user_config",
    "open_brain",
    "parse_manifest",
    "register_brain",
    "registration_conflict",
    "resolve_brain",
    "revoke",
    "route_brain",
    "set_harvest",
    "set_value",
    "state_dir",
    "unregister_brain",
]
