"""Consolidation helper: gather an agent's pending episodes, then archive the ones it folded in."""

from __future__ import annotations

from brainwiki.consolidate._done import Outcome, done, parse_outcome
from brainwiki.consolidate._prepare import (
    guidance,
    nothing_message,
    packet_text,
    prepare,
)

__all__ = [
    "Outcome",
    "done",
    "guidance",
    "nothing_message",
    "packet_text",
    "parse_outcome",
    "prepare",
]
