"""Local log file for long-running processes whose stdout belongs to a protocol (docs/design/cli-and-mcp.md §2.2)."""

from __future__ import annotations

import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

from brainwiki.config import state_dir

_configured = False


def log_path() -> Path:
    return state_dir() / "logs" / "brain-wiki.log"


def setup_logging(verbose: bool = False) -> logging.Logger:
    """Send brain-wiki logs to the rotating state-dir log, never to stdout."""
    global _configured
    logger = logging.getLogger("brainwiki")
    if _configured:
        return logger
    path = log_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    handler = RotatingFileHandler(path, maxBytes=2_000_000, backupCount=3, encoding="utf-8")
    handler.setFormatter(
        logging.Formatter("%(asctime)s %(process)d %(levelname)s %(name)s: %(message)s")
    )
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG if verbose else logging.INFO)
    logger.propagate = False
    _configured = True
    return logger
