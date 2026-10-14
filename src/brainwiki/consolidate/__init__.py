"""Consolidation: selection, packets, the ops schema and validator, the writer, backends, review."""

from __future__ import annotations

from brainwiki.consolidate import _pipeline as pipeline
from brainwiki.consolidate._presets import PRESETS, extract_ops, run_command
from brainwiki.consolidate._review import list_proposals, load_proposal, proposal_path
from brainwiki.consolidate._schema import LOOSE_SCHEMA

__all__ = [
    "LOOSE_SCHEMA",
    "PRESETS",
    "extract_ops",
    "list_proposals",
    "load_proposal",
    "pipeline",
    "proposal_path",
    "run_command",
]
