"""harvest, origin."""

from __future__ import annotations

from typing import Any

from brainwiki.cli._output import emit
from brainwiki.errors import NotFound, UsageError

_READABLE = ("claude-code", "codex", "antigravity")


def _check_readable(hosts: list[str]) -> None:
    """Refuse a host harvest cannot read: an unknown id, or a known host with no session reader."""
    from brainwiki.hosts import connect, reader_for

    unknown = [h for h in hosts if h not in connect.HOSTS]
    if unknown:
        raise UsageError(f"unknown host {', '.join(unknown)}; harvest reads {', '.join(_READABLE)}")
    unreadable = [h for h in hosts if reader_for(h) is None]
    if unreadable:
        raise UsageError(
            f"harvest cannot read {', '.join(unreadable)} sessions yet; it reads {', '.join(_READABLE)}"
        )


def _folder(cwd: str | None) -> str:
    if not cwd:
        return "-"
    from pathlib import Path

    home = str(Path.home())
    return "~" + cwd[len(home) :] if cwd == home or cwd.startswith(home + "/") else cwd


def harvest(args: Any) -> int:
    from brainwiki import harvest as hv
    from brainwiki.config import load_user_config

    if args.action:
        return _configure(args)
    if args.hosts:
        _check_readable(args.hosts)
    user = load_user_config()
    hosts = args.hosts or list(user.harvest.get("hosts") or ["claude-code", "codex", "antigravity"])
    candidates = hv.discover(user, hosts, since=args.since, project=args.project)
    eligible = [c for c in candidates if not c.skip]
    if args.status:
        rows = []
        for host in hosts:
            mine = [c for c in candidates if c.info.host == host]
            rows.append(
                {
                    "host": host,
                    "enabled": user.harvest_enabled(host),
                    "sessions": len(mine),
                    "unharvested": sum(1 for c in mine if not c.skip),
                }
            )
        text = "\n".join(
            f"{r['host']}: {'on' if r['enabled'] else 'off'}, {r['unharvested']} of {r['sessions']} sessions to harvest"
            for r in rows
        )
        off = [r["host"] for r in rows if not r["enabled"]]
        if off:
            text += f"\nTo turn harvest on, run: brain harvest enable {' '.join(off)}"
        emit(args, rows, text)
        return 0
    data = [c.to_json() for c in candidates]
    lines = [
        f"{c.info.host} {c.info.id}  {_folder(c.info.cwd)}  "
        f"→ {c.brain.display_name if c.brain else '-'}  "
        + (
            f"skip: {c.skip}"
            if c.skip
            else f"turns {c.to_json()['turns']}, ~{c.to_json()['estimated_tokens']} tokens"
        )
        for c in candidates
    ]
    total = sum(c.to_json()["estimated_tokens"] for c in eligible)
    if any(c.skip == "routes to no brain" for c in candidates):
        lines.append(
            "Sessions route to the brain of their working directory: put a .brain-wiki.toml "
            'with `brain = "NAME"` in the project, or map folders in [harvest.routes] in '
            f"{user.path}."
        )
    lines.append(
        f"{len(eligible)} sessions to harvest, ~{total} tokens for an agent to read."
        + (' Ask the agent to "harvest my sessions".' if eligible else "")
    )
    emit(args, data, "\n".join(lines))
    return 0


def _configure(args: Any) -> int:
    """`brain harvest enable|disable|route`: the user-config side of harvest
    (write-path.md §2.2).
    """
    from brainwiki.config import add_harvest_route, config_file, load_user_config, set_harvest

    if args.action == "route":
        if len(args.values) != 2:
            raise UsageError(
                'brain harvest route PATTERN BRAIN, e.g. brain harvest route "~/**" personal'
            )
        pattern, brain = args.values
        registered = load_user_config().brains
        if brain not in registered:
            raise NotFound(
                f"no brain named {brain!r}; registered: {', '.join(registered) or 'none'}"
            )
        routes = add_harvest_route(pattern, brain)
        emit(
            args,
            {"routes": routes},
            f"Sessions in folders matching {pattern} go to {brain!r} (in {config_file()}).",
        )
        return 0
    if not args.values:
        raise UsageError(f"brain harvest {args.action} HOST...")
    on = args.action == "enable"
    if on:
        _check_readable(args.values)
    user = load_user_config()
    already = [h for h in args.values if user.harvest_enabled(h) == on]
    hosts: list[str] = []
    for host in args.values:
        hosts = set_harvest(host, on)
    text = f"Harvest is on for {', '.join(hosts)}." if hosts else "Harvest is off."
    if already:
        state = "on" if on else "off"
        text = f"Harvest was already {state} for {', '.join(already)}. " + text
    if on:
        text += (
            " For an agent to harvest its own sessions in a conversation, also run "
            f"`brain agents grant {args.values[0]} harvest`."
        )
    emit(args, {"hosts": hosts}, text)
    return 0


def origin(args: Any) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.origin import format_origin, origin_window

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = origin_window(engine, args.episode, turns=args.turns)
    emit(args, result, format_origin(result))
    return 0
