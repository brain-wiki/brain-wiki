"""The sanctioned write paths: episodes, rules, moves, agent profiles, and secret scrubbing."""

from __future__ import annotations

from brainwiki.write import _rules as rules
from brainwiki.write._episode import write_episode
from brainwiki.write._move import move_note, plan_move
from brainwiki.write._paths import brain_path, protected_reason
from brainwiki.write._profiles import profile_run, require, require_owner
from brainwiki.write._secrets import find_secrets, scrub

__all__ = [
    "brain_path",
    "find_secrets",
    "move_note",
    "plan_move",
    "profile_run",
    "protected_reason",
    "require",
    "require_owner",
    "rules",
    "scrub",
    "write_episode",
]
