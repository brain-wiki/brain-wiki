"""Session URLs: how a note cites the agent session it came from (brain-format.md §6.4).

`session://<host>/<session id>#turns=A-B` names a conversation in a host's own transcript
store. It holds no file path, so it means the same on every machine; tools on the machine that
has the transcript can show it (write-path.md §4.6).
"""

from __future__ import annotations

import re

_SESSION_URL = re.compile(
    r"^session://(?P<host>[a-z0-9][a-z0-9-]{0,63})/(?P<session>[A-Za-z0-9._:-]{1,200})"
    r"(?:#turns=(?P<turns>\d+-\d+))?$"
)


def session_url(host: str, session: str, turns: str | None = None) -> str:
    return f"session://{host}/{session}" + (f"#turns={turns}" if turns else "")


def parse_session_url(text: str) -> tuple[str, str, str | None] | None:
    """(host, session id, turns) from a session URL, or None."""
    match = _SESSION_URL.match(text.strip())
    return (match["host"], match["session"], match["turns"]) if match else None
