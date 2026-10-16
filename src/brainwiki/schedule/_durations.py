"""Durations on the command line: `--settle 30s`, `--every 15m`."""

from __future__ import annotations

import re

from brainwiki.errors import UsageError

_DURATION_RE = re.compile(r"^(\d+)([smh]?)$")
_UNIT_SECONDS = {"": 1, "s": 1, "m": 60, "h": 3600}

# Minutes that divide an hour and hours that divide a day, so cron and launchd agree.
EVERY_VALUES = ("5m", "10m", "15m", "20m", "30m", "1h", "2h", "3h", "4h", "6h", "8h", "12h", "24h")


def parse_duration(text: str, option: str) -> int:
    """Seconds in `30s`, `2m`, `1h` (a bare number is seconds)."""
    match = _DURATION_RE.match(text.strip().lower())
    if not match:
        raise UsageError(f"{option} {text!r} is not a duration; use e.g. 30s, 2m, 1h")
    return int(match.group(1)) * _UNIT_SECONDS[match.group(2)]


def parse_every(text: str) -> tuple[str, int]:
    """(the canonical value, seconds) for an allowed `--every`."""
    value = text.strip().lower()
    if value not in EVERY_VALUES:
        raise UsageError(
            f"--every {text!r} is not allowed; use one of {', '.join(EVERY_VALUES)} "
            "(minutes that divide an hour or hours that divide a day)"
        )
    return value, parse_duration(value, "--every")


def cron_schedule(every: str) -> str:
    seconds = parse_every(every)[1]
    if seconds < 3600:
        return f"*/{seconds // 60} * * * *"
    hours = seconds // 3600
    return "0 0 * * *" if hours == 24 else f"0 */{hours} * * *"


def every_from_cron(fields: str) -> str | None:
    """The `--every` value a schedule written by `cron_schedule` stands for."""
    return next((e for e in EVERY_VALUES if cron_schedule(e) == fields.strip()), None)


def every_from_seconds(seconds: int) -> str | None:
    return next((e for e in EVERY_VALUES if parse_every(e)[1] == seconds), None)
