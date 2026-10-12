"""version, init, list, brains, doctor, setup."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.config.resolve import open_brain
from brainwiki.config.user import load_user_config, register_brain, set_value, unregister_brain
from brainwiki.errors import NotFound, UsageError


def version(args: Any) -> int:
    from brainwiki import FORMAT_VERSION, __version__

    emit(
        args,
        {"version": __version__, "format": FORMAT_VERSION},
        f"brain-wiki {__version__} (format {FORMAT_VERSION})",
    )
    return 0


def init(args: Any) -> int:
    from brainwiki.lifecycle import init_brain

    root = init_brain(Path(args.path), args.name)
    brain = open_brain(root)
    name = args.name or brain.manifest.name or root.name
    if not args.no_register:
        register_brain(name, root)
    if args.git and shutil.which("git") and not (root / ".git").exists():
        subprocess.run(["git", "init", "-q", str(root)], check=False)
    emit(
        args,
        {"path": str(root), "name": name, "id": brain.id, "registered": not args.no_register},
        f"Created brain {name!r} at {root}\n  id: {brain.id}"
        + ("" if args.no_register else "\n  registered in the user config")
        + (
            "\n  tip: `brain init --git` or `git init` to track changes"
            if not (root / ".git").exists()
            else ""
        ),
    )
    return 0


def list_(args: Any) -> int:
    from brainwiki.index.brains import format_brain_list, list_brains

    host = getattr(args, "as_host", None)
    result = list_brains(host, explicit=args.brain)
    emit(args, result, format_brain_list(result, owner=host is None))
    return 0


def brains(args: Any) -> int:
    user = load_user_config()
    action, rest = args.action, args.args
    if action == "list":
        return list_(args)
    if action == "add":
        if len(rest) != 2:
            raise UsageError("usage: brain brains add NAME PATH")
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
            raise UsageError("usage: brain brains remove NAME")
        path = user.brains.get(rest[0])
        if not unregister_brain(rest[0]):
            raise NotFound(f"no brain named {rest[0]!r}")
        if args.purge_state and path and (path / "brain.toml").exists():
            from brainwiki.config.dirs import cache_dir, state_dir

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
        if len(rest) != 2 or rest[0] not in user.brains:
            raise UsageError("usage: brain brains rename OLD NEW")
        path = user.brains[rest[0]]
        was_default = user.default == rest[0]
        unregister_brain(rest[0])
        register_brain(rest[1], path, make_default=was_default)
        emit(args, {"renamed": rest}, f"Renamed {rest[0]!r} to {rest[1]!r}")
        return 0
    if action == "default":
        if len(rest) != 1 or rest[0] not in user.brains:
            raise UsageError("usage: brain brains default NAME (a registered brain)")
        set_value("default", rest[0])
        emit(args, {"default": rest[0]}, f"Default brain is now {rest[0]!r}")
        return 0
    raise UsageError(f"unknown action {action}")


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
    from brainwiki.setup_wizard import run_wizard

    return run_wizard(args)
