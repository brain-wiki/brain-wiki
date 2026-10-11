"""`brain schedule`: routine templates for the hosts' own schedulers (design doc 15 §4).

Only schedulers on the user's machine can reach a local brain. Desktop apps are configured in
their apps, so for them this prints exactly what to enter; OpenClaw and the OS schedulers (cron,
launchd, systemd) are installed directly after a dry run.
"""

from __future__ import annotations

import json
import plistlib
import shlex
import shutil
import subprocess
import sys
from dataclasses import dataclass
from importlib import resources
from pathlib import Path
from typing import Any

from brainwiki.config.dirs import state_dir
from brainwiki.errors import NotAvailable, NotFound, UnsupportedHost, UsageError
from brainwiki.format.frontmatter import split

ROUTINES = ("brain-maintenance", "brain-harvest", "brain-health")
DESKTOP = ("claude-code", "codex")
CRON_MARK = "# brain-wiki:"


@dataclass
class Routine:
    name: str
    title: str
    cron: str
    hosts: list[str]
    needs: list[str]
    allow_tools: list[str]
    body: str

    def render(self, brain: str, brain_path: str, host: str) -> str:
        return (
            self.body.replace("{brain}", brain)
            .replace("{brain_path}", brain_path)
            .replace("{host}", host)
            .strip()
        )


def load_routine(name: str) -> Routine:
    if name not in ROUTINES:
        raise NotFound(f"unknown routine {name!r}; use one of {', '.join(ROUTINES)}")
    text = (resources.files("brainwiki") / "assets" / "routines" / f"{name}.md").read_text(
        encoding="utf-8"
    )
    fm = split(text)
    data = fm.data
    return Routine(
        name=name,
        title=str(data.get("title") or name),
        cron=str(data.get("cron") or "0 21 * * *"),
        hosts=[str(h) for h in data.get("hosts") or []],
        needs=[str(n) for n in data.get("needs") or []],
        allow_tools=[str(t) for t in data.get("allow_tools") or []],
        body=fm.body,
    )


def cron_at(cron: str, at: str | None) -> str:
    if not at:
        return cron
    hour, _, minute = at.partition(":")
    if not (hour.isdigit() and minute.isdigit() and int(hour) < 24 and int(minute) < 60):
        raise UsageError("--at must look like 21:00")
    fields = cron.split()
    return " ".join([str(int(minute)), str(int(hour)), *fields[2:]])


def _brain_info(engine: Any) -> tuple[str, str]:
    return engine.brain.display_name, str(engine.brain.root)


def show(engine: Any, name: str, host: str, *, at: str | None = None) -> dict[str, Any]:
    routine = load_routine(name)
    if host not in routine.hosts:
        raise UnsupportedHost(
            f"{name} is not offered for {host}; it is for {', '.join(routine.hosts)}"
            + (
                " (Cursor's automations run in the cloud and cannot reach a local brain)"
                if host == "cursor"
                else ""
            )
        )
    brain, brain_path = _brain_info(engine)
    cron = cron_at(routine.cron, at)
    prompt = routine.render(brain, brain_path, host)
    profile = engine.manifest.profile(host)
    missing = [need for need in routine.needs if not profile.can(need)]
    steps: list[str]
    if host == "claude-code":
        steps = [
            "In the Claude Code desktop app: Routines → New routine → Local.",
            f"Name: {routine.title}",
            f"Schedule: {cron} (cron, local time)",
            f"Folder: {brain_path}",
            "Instructions: the prompt below.",
            f"Run it once with “Run now” and always allow: {', '.join(routine.allow_tools)}.",
        ]
    elif host == "codex":
        steps = [
            f"In the Codex app, create a scheduled task on the local project {brain_path}.",
            f"Schedule: {cron} (local time). Prompt: the text below.",
            f"Run it once and allow: {', '.join(routine.allow_tools)}.",
        ]
    elif host == "antigravity":
        steps = [
            f'Run in Antigravity: /schedule "{cron}" {" ".join(prompt.split())}',
            f"Run it from a session whose workspace is {brain_path}; scheduled runs start there.",
            "In the CLI (`agy`) the schedule ends when that session exits; for unattended runs "
            "use the desktop app, or `brain schedule install --via cron|launchd|systemd`.",
        ]
    else:
        steps = [
            "Install with: "
            + shlex.join(_openclaw_command(routine, cron, prompt))
            + "  (or `brain schedule install ... --apply`)"
        ]
    if missing:
        steps.append(
            f"First grant {host} these capabilities in brain.toml [agents.{host}] write: {', '.join(missing)}"
        )
    return {
        "routine": name,
        "host": host,
        "cron": cron,
        "prompt": prompt,
        "allow_tools": routine.allow_tools,
        "working_dir": brain_path,
        "steps": steps,
        "missing_capabilities": missing,
    }


def on_calendar(cron: str) -> str:
    """A systemd OnCalendar expression for the simple cron forms the templates use."""
    minute, hour, _, _, weekday = cron.split()
    days = ("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
    prefix = f"{days[int(weekday) % 7]} " if weekday.isdigit() else ""
    return f"{prefix}*-*-* {int(hour):02d}:{int(minute):02d}:00"


def _openclaw_command(routine: Routine, cron: str, prompt: str) -> list[str]:
    return [
        "openclaw",
        "automations",
        "create",
        cron,
        prompt,
        "--name",
        routine.name,
        "--session",
        "isolated",
        "--no-deliver",
    ]


# -- OS schedulers -----------------------------------------------------------
def _cli_commands(name: str, brain_path: str) -> list[list[str]]:
    brain = (
        str(Path(sys.executable).parent / "brain")
        if (Path(sys.executable).parent / "brain").is_file()
        else "brain"
    )
    common = ["--brain", brain_path]
    if name == "brain-maintenance":
        return [
            [brain, "harvest", "--apply"],
            [brain, "consolidate", "--backend", "command", "--if-pending", "5", *common],
        ]
    if name == "brain-harvest":
        return [[brain, "harvest", "--apply"]]
    return [[brain, "lint", *common], [brain, "report", *common]]


def _shell_line(commands: list[list[str]]) -> str:
    return " ; ".join(shlex.join(c) for c in commands)


def _state_file() -> Path:
    return state_dir() / "schedule.json"


def schedule_state() -> list[dict[str, Any]]:
    try:
        return json.loads(_state_file().read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return []


def _save_state(items: list[dict[str, Any]]) -> None:
    path = _state_file()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(items, indent=2), encoding="utf-8")


def plan_install(
    engine: Any, name: str, *, host: str | None, via: str | None, at: str | None
) -> dict[str, Any]:
    routine = load_routine(name)
    brain, brain_path = _brain_info(engine)
    cron = cron_at(routine.cron, at)
    key = f"{name}:{engine.brain.key}"
    if host:
        if host != "openclaw":
            raise UsageError(
                f"{host}'s scheduler is configured in its app; use `brain schedule show {name} --for {host}`"
            )
        command = _openclaw_command(routine, cron, routine.render(brain, brain_path, host))
        return {"key": key, "kind": "openclaw", "commands": [command], "files": {}, "cron": cron}
    commands = _cli_commands(name, brain_path)
    if via == "cron":
        line = f"{cron} {_shell_line(commands)} {CRON_MARK}{key}"
        return {"key": key, "kind": "cron", "line": line, "files": {}, "commands": [], "cron": cron}
    if via == "systemd":
        unit = f"brain-wiki-{name}-{engine.brain.key[:8].lower()}"
        base = Path.home() / ".config" / "systemd" / "user"
        calendar = on_calendar(cron)
        service = (
            f"[Unit]\nDescription=brain-wiki {routine.title} ({brain})\n\n[Service]\nType=oneshot\n"
            + "".join(f"ExecStart={shlex.join(c)}\n" for c in commands)
        )
        timer = f"[Unit]\nDescription=brain-wiki {routine.title} ({brain})\n\n[Timer]\nOnCalendar={calendar}\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n"
        return {
            "key": key,
            "kind": "systemd",
            "unit": unit,
            "files": {str(base / f"{unit}.service"): service, str(base / f"{unit}.timer"): timer},
            "commands": [
                ["systemctl", "--user", "daemon-reload"],
                ["systemctl", "--user", "enable", "--now", f"{unit}.timer"],
            ],
            "cron": cron,
        }
    if via == "launchd":
        label = f"io.brain-wiki.{name}.{engine.brain.key[:8].lower()}"
        minute, hour, _, _, weekday = cron.split()
        interval: dict[str, int] = {"Hour": int(hour), "Minute": int(minute)}
        if weekday != "*":
            interval["Weekday"] = int(weekday)
        plist = {
            "Label": label,
            "ProgramArguments": ["/bin/sh", "-c", _shell_line(commands)],
            "StartCalendarInterval": interval,
        }
        path = Path.home() / "Library" / "LaunchAgents" / f"{label}.plist"
        return {
            "key": key,
            "kind": "launchd",
            "files": {str(path): plistlib.dumps(plist).decode("utf-8")},
            "commands": [["launchctl", "load", str(path)]],
            "cron": cron,
        }
    raise UsageError("give --for openclaw, or --via cron|launchd|systemd")


def describe(plan: dict[str, Any]) -> str:
    lines = [f"{plan['kind']}: {plan['key']} at {plan['cron']}"]
    if plan.get("line"):
        lines.append(f"crontab line: {plan['line']}")
    for path, content in plan.get("files", {}).items():
        lines += [f"write {path}:", *("  " + line for line in content.splitlines())]
    lines += ["run: " + shlex.join(c) for c in plan.get("commands", [])]
    return "\n".join(lines)


def install(plan: dict[str, Any]) -> None:
    if plan["kind"] == "cron":
        if not shutil.which("crontab"):
            raise NotAvailable("crontab is not available on this system")
        current = subprocess.run(
            ["crontab", "-l"], capture_output=True, text=True, check=False
        ).stdout
        lines = [
            line for line in current.splitlines() if not line.endswith(f"{CRON_MARK}{plan['key']}")
        ]
        lines.append(plan["line"])
        subprocess.run(["crontab", "-"], input="\n".join(lines) + "\n", text=True, check=True)
    for path, content in plan.get("files", {}).items():
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        Path(path).write_text(content, encoding="utf-8")
    for command in plan.get("commands", []):
        if shutil.which(command[0]) is None:
            raise NotAvailable(f"`{command[0]}` is not available on this system")
        subprocess.run(command, check=True, capture_output=True, text=True)
    items = [i for i in schedule_state() if i.get("key") != plan["key"]]
    items.append(
        {k: plan[k] for k in ("key", "kind", "cron") if k in plan}
        | {"files": list(plan.get("files", {})), "unit": plan.get("unit")}
    )
    _save_state(items)


def remove(name: str) -> list[str]:
    steps: list[str] = []
    items = schedule_state()
    keep = []
    for item in items:
        if not item["key"].startswith(f"{name}:"):
            keep.append(item)
            continue
        if item["kind"] == "cron" and shutil.which("crontab"):
            current = subprocess.run(
                ["crontab", "-l"], capture_output=True, text=True, check=False
            ).stdout
            lines = [
                line
                for line in current.splitlines()
                if not line.endswith(f"{CRON_MARK}{item['key']}")
            ]
            subprocess.run(["crontab", "-"], input="\n".join(lines) + "\n", text=True, check=True)
            steps.append(f"removed crontab entry {item['key']}")
        if item["kind"] == "systemd" and item.get("unit") and shutil.which("systemctl"):
            subprocess.run(
                ["systemctl", "--user", "disable", "--now", f"{item['unit']}.timer"],
                capture_output=True,
                check=False,
            )
        if item["kind"] == "launchd" and shutil.which("launchctl"):
            for path in item.get("files", []):
                subprocess.run(["launchctl", "unload", path], capture_output=True, check=False)
        if item["kind"] == "openclaw":
            steps.append(
                f"Remove the OpenClaw automation named {name} (`openclaw automations list`)."
            )
        for path in item.get("files", []):
            Path(path).unlink(missing_ok=True)
            steps.append(f"removed {path}")
    _save_state(keep)
    if not steps:
        steps.append(f"Nothing installed for {name}. Desktop-app routines are removed in the app.")
    return steps
