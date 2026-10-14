"""Per-host knowledge: detection, transcript readers, connect writers, instruction blocks."""

from __future__ import annotations

from brainwiki.hosts import _connect as connect
from brainwiki.hosts._connect import plugin_source
from brainwiki.hosts._detect import detect_host, host_from_client_name
from brainwiki.hosts._instructions import Access, find_block, host_access, server_instructions
from brainwiki.hosts._sessions import SessionInfo, Transcript, Turn, reader_for

__all__ = [
    "Access",
    "SessionInfo",
    "Transcript",
    "Turn",
    "connect",
    "detect_host",
    "find_block",
    "host_access",
    "host_from_client_name",
    "plugin_source",
    "reader_for",
    "server_instructions",
]
