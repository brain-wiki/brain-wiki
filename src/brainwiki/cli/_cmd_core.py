"""init, brains, agents, doctor, setup."""

from __future__ import annotations

import shutil
from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.config import (
    SLUG_RE,
    limit_host,
    load_user_config,
    open_brain,
    register_brain,
    set_value,
    unregister_brain,
)
from brainwiki.errors import Conflict, NotFound, UsageError


def init(args: Any) -> int:
    from brainwiki.config import registration_conflict
    from brainwiki.lifecycle import init_brain, init_git

    target = Path(args.path).expanduser()
    if not args.no_register:
        problem = registration_conflict(args.name or target.resolve().name, target)
        if problem:
            raise Conflict(problem)
    root = init_brain(target, args.name)
    brain = open_brain(root)
    name = args.name or brain.manifest.name or root.name
    if not args.no_register:
        register_brain(name, root)
    git_problem = init_git(root, name) if args.git else None
    if not args.git:
        git_line = "\n  tip: `brain init --git` or `git init` to track changes"
    elif git_problem:
        git_line = f"\n  git: {git_problem}; commit the brain's files yourself"
    else:
        git_line = "\n  git: initialized, with a first commit"
    emit(
        args,
        {
            "path": str(root),
            "name": name,
            "id": brain.id,
            "registered": not args.no_register,
            "git": bool(args.git) and git_problem is None,
        },
        f"Created brain {name!r} at {root}\n  id: {brain.id}"
        + ("" if args.no_register else "\n  registered in the user config")
        + git_line,
    )
    return 0


def brains(args: Any) -> int:
    user = load_user_config()
    action, rest = args.action, args.args

    def _check_brain_name(name: str) -> None:
        if not SLUG_RE.match(name):
            raise UsageError(
                f"{name!r} is not a brain name: use lowercase letters, digits, and hyphens "
                "(e.g. work, personal-notes)"
            )

    if action == "list":  # what brain_list returns
        from brainwiki.index import format_brain_list, list_brains

        host = getattr(args, "as_host", None)
        result = list_brains(host, explicit=args.brain)
        emit(args, result, format_brain_list(result, owner=host is None))
        return 0
    if action == "add":
        if len(rest) != 2:
            raise UsageError("brain brains add NAME PATH")
        _check_brain_name(rest[0])
        brain = open_brain(Path(rest[1]))
        register_brain(rest[0], brain.root, make_default=None)
        emit(
            args,
            {"name": rest[0], "path": str(brain.root)},
            f"Registered {rest[0]!r} -> {brain.root}",
        )
        return 0
    if action == "remove":
        if len(rest) != 1:
            raise UsageError("brain brains remove NAME")
        path = user.brains.get(rest[0])
        if not unregister_brain(rest[0]):
            raise NotFound(f"no brain named {rest[0]!r}")
        if args.purge_state and path and (path / "brain.toml").exists():
            from brainwiki.config import cache_dir, state_dir

            brain_id = open_brain(path).id
            for base in (state_dir(), cache_dir()):
                shutil.rmtree(base / "brains" / brain_id, ignore_errors=True)
        emit(
            args,
            {"removed": rest[0]},
            f"Removed {rest[0]!r} from the user config (the brain folder is untouched)",
        )
        return 0
    if action == "rename":
        if len(rest) != 2:
            raise UsageError("brain brains rename OLD NEW")
        old, new = rest
        if old not in user.brains:
            raise NotFound(
                f"no brain named {old!r}; registered: {', '.join(user.brains) or 'none'}"
            )
        _check_brain_name(new)
        if old != new:
            register_brain(new, user.brains[old], make_default=False, replaces=old)
        emit(args, {"renamed": rest}, f"Renamed {old!r} to {new!r}")
        return 0
    if action == "default":
        if len(rest) != 1 or rest[0] not in user.brains:
            raise UsageError("brain brains default NAME (a registered brain)")
        set_value("default", rest[0])
        emit(args, {"default": rest[0]}, f"Default brain is now {rest[0]!r}")
        return 0
    if action in ("limit", "unlimit"):
        if action == "limit" and len(rest) < 2 or action == "unlimit" and len(rest) != 1:
            raise UsageError("brain brains limit HOST BRAIN... | brain brains unlimit HOST")
        host, names = rest[0], rest[1:]
        if not SLUG_RE.match(host):
            raise UsageError(f"{host!r} is not a host id (e.g. claude-code, codex, openclaw)")
        missing = [n for n in names if n not in user.brains]
        if missing:
            raise NotFound(
                f"no brain named {', '.join(missing)}; registered: {', '.join(user.brains) or 'none'}"
            )
        pinned = limit_host(host, names if action == "limit" else None)
        text = (
            f"{host} may use only: {', '.join(names)}"
            if action == "limit"
            else f"{host} may use every brain"
        )
        if pinned:
            text += f" (its default brain is {pinned!r})"
        emit(args, {"host": host, "brains": names or None, "default": pinned}, text)
        return 0
    raise UsageError(f"unknown action {action}")


def agents(args: Any) -> int:
    from brainwiki.cli._cmd_runs import warn_git
    from brainwiki.cli._output import warn
    from brainwiki.engine import open_engine
    from brainwiki.write import profile_run

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        name = engine.brain.display_name
        manifest = engine.brain.manifest
        if args.action == "list":
            hosts = ["default", *[h for h in manifest.agents if h != "default"]]
            rows = {
                h: {
                    "write": manifest.profile(h).write,
                    "read_origin": manifest.profile(h).read_origin,
                }
                for h in hosts
            }
            width = max(len(h) for h in hosts)
            lines = [
                f"  {h:<{width}}  {', '.join(r['write']) or 'nothing'}"
                + ("; reads origins" if r["read_origin"] else "")
                for h, r in rows.items()
            ]
            text = (
                f"{name}:\n"
                + "\n".join(lines)
                + (
                    "\nAgents without their own profile use default. "
                    "Change one with `brain agents grant HOST CAPABILITY...`."
                )
            )
            emit(args, {"brain": name, "profiles": rows}, text)
            return 0
        if len(args.args) < 2:
            raise UsageError(f"brain agents {args.action} HOST CAPABILITY...")
        host, caps = args.args[0], args.args[1:]
        change = {host: caps}
        run = profile_run(
            engine,
            grants=change if args.action == "grant" else None,
            revokes=change if args.action == "revoke" else None,
        )
        from brainwiki.hosts import connect

        if host != "default" and host not in connect.HOSTS and host not in manifest.agents:
            warn(
                f"note: {host!r} is not a known host id ({', '.join(connect.HOSTS)}, default); "
                "changing its profile anyway"
            )
        if not run.entries:
            already = "may already" if args.action == "grant" else "may not"
            emit(args, {"changed": False}, f"No change: {host} {already} do that.")
            return 0
        if args.dry_run:
            emit(args, {"changed": False, "diff": run.diff()}, run.diff())
            return 0
        record = run.commit(log_lines=[f"- {args.action} {host}: {', '.join(caps)}"])
    warn_git(record)
    profile = open_brain(engine.brain.root).manifest.profile(host)
    now = profile.write
    emit(
        args,
        record.to_json() | {"host": host, "write": now, "read_origin": profile.read_origin},
        f"{host} may now: {', '.join(now) or 'nothing'}"
        + ("; reads origins" if profile.read_origin else "")
        + f" (undo: brain undo {record.run})",
    )
    return 0


def doctor(args: Any) -> int:
    from brainwiki.doctor import run_doctor

    report = run_doctor()
    lines = [f"brain-wiki {report['version']} on {report['device']}"]
    for b in report["brains"]:
        mark = "ok" if b.get("ok") else "PROBLEM"
        lines.append(
            f"  brain {b['name']}: {b['path']} [{mark}] notes={b.get('notes', '?')} pending={b.get('pending_episodes', '?')}"
        )
    for h in report["hosts"]:
        if h.get("installed"):
            lines.append(
                f"  host {h['id']}: installed, {'connected' if h.get('connected') else 'not connected'}"
            )
    sq = report["sqlite"]
    lines.append(f"  sqlite {sq['version']} fts5={sq['fts5']} trigram={sq['trigram']}")
    for p in report["problems"]:
        lines.append(f"  ! {p['message']}" + (f"  (fix: {p['fix']})" if p.get("fix") else ""))
    emit(args, report, "\n".join(lines))
    return 1 if any(p.get("severity") == "error" for p in report["problems"]) else 0


def setup(args: Any) -> int:
    from brainwiki.setup_wizard import run_wizard, setup_guide

    if args.guide:
        print(setup_guide(), end="")
        return 0
    return run_wizard(args)
