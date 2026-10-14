"""Output helpers shared by CLI commands."""

from __future__ import annotations

import json
import sys
from typing import Any


def emit(args: Any, data: Any, text: str | None = None) -> None:
    """Print JSON with --json, else the human text (or a JSON fallback)."""
    if getattr(args, "json", False) or text is None:
        print(json.dumps(data, indent=2, ensure_ascii=False, default=str))
    elif text:
        print(text)


def warn(message: str) -> None:
    print(message, file=sys.stderr)
