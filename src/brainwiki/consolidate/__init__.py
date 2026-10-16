"""Consolidation helper: gather pending episodes for an agent, then archive the ones it folded in."""

from __future__ import annotations

from brainwiki.consolidate._done import done
from brainwiki.consolidate._prepare import guidance, packet_text, prepare

__all__ = ["done", "guidance", "packet_text", "prepare"]
