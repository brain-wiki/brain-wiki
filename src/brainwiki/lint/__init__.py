"""Lint: rules, profiles, fixes, and reports."""

from __future__ import annotations

from brainwiki.lint._catalog import unknown_codes
from brainwiki.lint._files import run_gate
from brainwiki.lint._fixes import fix, plan
from brainwiki.lint._hook import install_hook, staged_files
from brainwiki.lint._reports import generate
from brainwiki.lint._runner import lint
from brainwiki.lint._validate import format_validate_text, validate

__all__ = [
    "fix",
    "format_validate_text",
    "generate",
    "install_hook",
    "lint",
    "plan",
    "run_gate",
    "staged_files",
    "unknown_codes",
    "validate",
]
