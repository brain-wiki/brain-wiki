"""`brain schedule`: OS jobs that run `brain commit` for a brain (write-path.md §5.2), and
`brain consolidate --run` for a brain and host (write-path.md §4.8).

The OS scheduler is the source of truth: a user crontab block on Linux, a LaunchAgent on macOS.
A commit job is keyed by the brain's id, a consolidate job by the brain's id and the host.
Backends run commands through an injected runner, so tests never touch the real ones.
"""

from __future__ import annotations

import os
import plistlib
import shlex
import shutil
import subprocess
import sys
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Protocol

from brainwiki.config import state_dir
from brainwiki.errors import NotAvailable, UsageError
from brainwiki.schedule._durations import (
    cron_schedule,
    every_from_cron,
    every_from_seconds,
    parse_every,
)

_LABEL_PREFIX = "io.github.brain-wiki."
_KINDS = ("commit", "consolidate")
_ENV_VARS = (
    "BRAIN_WIKI_CONFIG",
    "BRAIN_WIKI_STATE_DIR",
    "BRAIN_WIKI_CACHE_DIR",
    "BRAIN_WIKI_DATA_DIR",
)


class _Completed(Protocol):
    returncode: int
    stdout: str
    stderr: str


_Runner = Callable[[list[str], str | None], _Completed]


def _subprocess_runner(argv: list[str], stdin: str | None = None) -> _Completed:
    try:
        return subprocess.run(argv, input=stdin, capture_output=True, text=True, check=False)
    except FileNotFoundError as exc:
        return subprocess.CompletedProcess(argv, 127, "", str(exc))


# What `scheduler()` uses when not told otherwise; tests replace these.
_runner: _Runner = _subprocess_runner


def _platform() -> str:
    return sys.platform


@dataclass
class Job:
    """A job to install: `program commit --brain NAME [--push]` every `every`, or
    `program consolidate --run --host HOST --brain NAME [--harvest] [--include X]…` daily `at`."""

    brain_id: str
    brain_name: str
    every: str
    push: bool
    program: list[str]
    env: dict[str, str] = field(default_factory=dict)
    log: Path | None = None
    kind: str = "commit"
    host: str | None = None
    at: str | None = None  # "HH:MM", for consolidate
    harvest: bool = False
    include: list[str] = field(default_factory=list)

    @property
    def ident(self) -> str:
        return self.brain_id if self.kind == "commit" else f"{self.brain_id}.{self.host}"

    @property
    def argv(self) -> list[str]:
        if self.kind == "consolidate":
            argv = [*self.program, "consolidate", "--run", "--host", str(self.host)]
            argv += ["--brain", self.brain_name] + (["--harvest"] if self.harvest else [])
            for item in self.include:
                argv += ["--include", item]
            return argv
        return [*self.program, "commit", "--brain", self.brain_name] + (
            ["--push"] if self.push else []
        )

    @property
    def cron(self) -> str:
        if self.kind == "consolidate":
            hour, minute = _parse_at(self.at)
            return f"{minute} {hour} * * *"
        return cron_schedule(self.every)

    @property
    def log_path(self) -> Path:
        if self.log:
            return self.log
        if self.kind == "consolidate":
            return state_dir() / "logs" / f"consolidate-{self.brain_id}-{self.host}.log"
        return log_path(self.brain_id)


@dataclass
class InstalledJob:
    brain_id: str
    brain_name: str | None  # the name in the job's `--brain`
    every: str | None
    push: bool
    where: str  # "crontab" or the plist's path
    kind: str = "commit"
    host: str | None = None
    at: str | None = None
    harvest: bool = False
    include: list[str] = field(default_factory=list)


@dataclass
class _Plan:
    """What installing or removing a job did, or would do."""

    backend: str
    text: str  # the crontab block or the plist
    commands: list[str]
    manual: bool = False  # no backend works here: the user adds it by hand


def log_path(brain_id: str) -> Path:
    return state_dir() / "logs" / f"schedule-{brain_id}.log"


def _program_argv() -> list[str]:
    """The `brain` executable by absolute path: cron and launchd start with a minimal PATH."""
    found = shutil.which("brain")
    if found:
        return [str(Path(found).resolve())]
    script = Path(sys.argv[0]) if sys.argv and sys.argv[0] else None
    if script is not None and script.name == "brain" and script.exists():
        return [str(script.resolve())]
    return [sys.executable, "-m", "brainwiki"]


def _parse_at(at: str | None) -> tuple[int, int]:
    """(hour, minute) of "HH:MM"."""
    text = at or ""
    hour, _, minute = text.partition(":")
    if not (hour.isdigit() and minute.isdigit() and int(hour) < 24 and int(minute) < 60):
        raise UsageError(f"--at must be a time of day like 21:30, not {at!r}")
    return int(hour), int(minute)


def make_job(brain_id: str, brain_name: str, every: str, push: bool) -> Job:
    every = parse_every(every)[0]
    env = {k: os.environ[k] for k in _ENV_VARS if os.environ.get(k)}
    return Job(brain_id, brain_name, every, push, _program_argv(), env)


def make_consolidate_job(
    brain_id: str, brain_name: str, host: str, at: str, harvest: bool, include: list[str]
) -> Job:
    hour, minute = _parse_at(at)
    env = {k: os.environ[k] for k in _ENV_VARS if os.environ.get(k)}
    # cron and launchd start with a minimal PATH; the host CLI must be found the same way.
    if os.environ.get("PATH"):
        env["PATH"] = os.environ["PATH"]
    return Job(
        brain_id,
        brain_name,
        "",
        False,
        _program_argv(),
        env,
        kind="consolidate",
        host=host,
        at=f"{hour:02d}:{minute:02d}",
        harvest=harvest,
        include=list(include),
    )


def _option(argv: list[str], flag: str) -> str | None:
    return argv[argv.index(flag) + 1] if flag in argv[:-1] else None


def _job_from_argv(
    brain_id: str, argv: list[str], every: str | None, where: str, *, at: str | None = None
) -> InstalledJob:
    name = _option(argv, "--brain")
    if "consolidate" in argv and "--run" in argv:
        include = [argv[i + 1] for i, a in enumerate(argv[:-1]) if a == "--include"]
        return InstalledJob(
            brain_id,
            name,
            None,
            False,
            where,
            kind="consolidate",
            host=_option(argv, "--host"),
            at=at,
            harvest="--harvest" in argv,
            include=include,
        )
    return InstalledJob(brain_id, name, every, "--push" in argv, where)


def _renamed(argv: list[str], new_name: str) -> list[str]:
    out = list(argv)
    if "--brain" in out[:-1]:
        out[out.index("--brain") + 1] = new_name
    return out


# -- Linux: user crontab ----------------------------------------------------------------------


def _start(ident: str, kind: str = "commit") -> str:
    return f"# >>> brain-wiki {kind} {ident}"


def _end(ident: str, kind: str = "commit") -> str:
    return f"# <<< brain-wiki {kind} {ident}"


def _cron_line(schedule: str, argv: list[str], env: dict[str, str], log: Path) -> str:
    parts = [f"{k}={shlex.quote(v)}" for k, v in env.items()]
    parts += [shlex.join(argv), ">>", shlex.quote(str(log)), "2>&1"]
    return f"{schedule} " + " ".join(parts).replace("%", "\\%")  # cron reads % as a newline


def _parse_cron_line(line: str) -> tuple[str, list[str], dict[str, str], str | None]:
    """(schedule, argv, env, log) of a line `_cron_line` wrote."""
    fields = line.split(None, 5)
    schedule, rest = " ".join(fields[:5]), (fields[5] if len(fields) > 5 else "")
    tokens = shlex.split(rest.replace("\\%", "%"))
    env: dict[str, str] = {}
    while tokens and "=" in tokens[0] and tokens[0].split("=", 1)[0].isidentifier():
        key, value = tokens.pop(0).split("=", 1)
        env[key] = value
    log = None
    if ">>" in tokens:
        at = tokens.index(">>")
        log = tokens[at + 1] if at + 1 < len(tokens) else None
        tokens = tokens[:at]
    return schedule, tokens, env, log


def _find_block(lines: list[str], ident: str, kind: str = "commit") -> tuple[int, int] | None:
    start, end = _start(ident, kind), _end(ident, kind)
    for i, line in enumerate(lines):
        if line.rstrip("\r\n") == start:
            for j in range(i + 1, len(lines)):
                if lines[j].rstrip("\r\n") == end:
                    return i, j
    return None


def _blocks(text: str) -> dict[tuple[str, str], str]:
    """(kind, ident) -> the job line, for every brain-wiki block in a crontab."""
    out: dict[tuple[str, str], str] = {}
    lines = text.splitlines()
    for kind in _KINDS:
        prefix = _start("", kind)
        for line in lines:
            ident = line[len(prefix) :].strip() if line.startswith(prefix) else ""
            found = _find_block(lines, ident, kind) if ident else None
            if found:
                body = [x for x in lines[found[0] + 1 : found[1]] if x.strip() and x[0] != "#"]
                if body:
                    out[(kind, ident)] = body[0]
    return out


def _at_from_cron(schedule: str) -> str | None:
    fields = schedule.split()
    if len(fields) == 5 and fields[2:] == ["*", "*", "*"] and all(f.isdigit() for f in fields[:2]):
        return f"{int(fields[1]):02d}:{int(fields[0]):02d}"
    return None


class _Cron:
    name = "crontab"

    def __init__(self, runner: _Runner):
        self.run = runner

    def _read(self) -> str | None:
        """The crontab, "" when the user has none, None when there is no crontab command."""
        listed = self.run(["crontab", "-l"], None)
        if listed.returncode == 127:
            return None
        if listed.returncode != 0:
            if "no crontab" in (listed.stderr or "").lower():
                return ""
            raise NotAvailable(f"crontab -l failed: {(listed.stderr or '').strip()}")
        return listed.stdout

    def _write(self, text: str) -> None:
        written = self.run(["crontab", "-"], text)
        if written.returncode != 0:
            raise NotAvailable(f"crontab - failed: {(written.stderr or '').strip()}")

    def _block(self, job: Job) -> str:
        line = _cron_line(job.cron, job.argv, job.env, job.log_path)
        return f"{_start(job.ident, job.kind)}\n{line}\n{_end(job.ident, job.kind)}\n"

    @staticmethod
    def _replace(text: str, ident: str, block: str, kind: str = "commit") -> str:
        lines = text.splitlines(keepends=True)
        found = _find_block(lines, ident, kind)
        if found:
            start, end = found
            return "".join(lines[:start]) + block + "".join(lines[end + 1 :])
        if text and not text.endswith("\n"):
            text += "\n"
        return text + block

    def install(self, job: Job, dry_run: bool) -> _Plan:
        block = self._block(job)
        current = self._read()
        if current is None:
            return _Plan(self.name, block, ["crontab -e"], manual=True)
        plan = _Plan(self.name, block, ["crontab -l", "crontab -"])
        if not dry_run:
            job.log_path.parent.mkdir(parents=True, exist_ok=True)
            self._write(self._replace(current, job.ident, block, job.kind))
        return plan

    def remove(self, ident: str, dry_run: bool, kind: str = "commit") -> _Plan | None:
        current = self._read()
        if not current:
            return None
        lines = current.splitlines(keepends=True)
        found = _find_block(lines, ident, kind)
        if not found:
            return None
        start, end = found
        plan = _Plan(self.name, "".join(lines[start : end + 1]), ["crontab -l", "crontab -"])
        if not dry_run:
            self._write("".join(lines[:start] + lines[end + 1 :]))
        return plan

    def jobs(self) -> list[InstalledJob]:
        out = []
        for (kind, ident), line in _blocks(self._read() or "").items():
            schedule, argv, _env, _log = _parse_cron_line(line)
            brain_id = ident.split(".", 1)[0] if kind == "consolidate" else ident
            every = every_from_cron(schedule) if kind == "commit" else None
            out.append(_job_from_argv(brain_id, argv, every, self.name, at=_at_from_cron(schedule)))
        return out

    def rename(self, brain_id: str, new_name: str) -> bool:
        current = self._read()
        if current is None:
            return False
        renamed = False
        for (kind, ident), line in _blocks(current).items():
            if (ident.split(".", 1)[0] if kind == "consolidate" else ident) != brain_id:
                continue
            schedule, argv, env, log = _parse_cron_line(line)
            new_line = _cron_line(schedule, _renamed(argv, new_name), env, Path(log or "/dev/null"))
            block = f"{_start(ident, kind)}\n{new_line}\n{_end(ident, kind)}\n"
            current = self._replace(current, ident, block, kind)
            renamed = True
        if renamed:
            self._write(current)
        return renamed

    def remove_all(self, brain_id: str) -> bool:
        removed = False
        for kind, ident in list(_blocks(self._read() or "")):
            if (ident.split(".", 1)[0] if kind == "consolidate" else ident) == brain_id:
                removed = self.remove(ident, False, kind) is not None or removed
        return removed


# -- macOS: LaunchAgents ----------------------------------------------------------------------


class _Launchd:
    name = "launchd"

    def __init__(self, runner: _Runner, agents_dir: Path, uid: int):
        self.run = runner
        self.dir = agents_dir
        self.uid = uid

    def _path(self, ident: str, kind: str = "commit") -> Path:
        return self.dir / f"{_LABEL_PREFIX}{kind}.{ident}.plist"

    def _launchctl(self, *args: str, check: bool = True) -> None:
        done = self.run(["launchctl", *args], None)
        if check and done.returncode != 0:
            raise NotAvailable(f"launchctl {args[0]} failed: {(done.stderr or '').strip()}")

    @staticmethod
    def plist(job: Job) -> dict[str, Any]:
        data: dict[str, Any] = {
            "Label": f"{_LABEL_PREFIX}{job.kind}.{job.ident}",
            "ProgramArguments": job.argv,
            "StandardOutPath": str(job.log_path),
            "StandardErrorPath": str(job.log_path),
        }
        if job.kind == "consolidate":
            hour, minute = _parse_at(job.at)
            data["StartCalendarInterval"] = {"Hour": hour, "Minute": minute}
        else:
            data["StartInterval"] = parse_every(job.every)[1]
        if job.env:
            data["EnvironmentVariables"] = dict(job.env)
        return data

    def _load(self, path: Path, data: dict[str, Any], replacing: bool) -> None:
        label = data["Label"]
        if replacing:
            self._launchctl("bootout", f"gui/{self.uid}/{label}", check=False)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(plistlib.dumps(data))
        self._launchctl("bootstrap", f"gui/{self.uid}", str(path))

    def install(self, job: Job, dry_run: bool) -> _Plan:
        data = self.plist(job)
        path = self._path(job.ident, job.kind)
        commands = [f"launchctl bootstrap gui/{self.uid} {shlex.quote(str(path))}"]
        if path.exists():
            commands.insert(0, f"launchctl bootout gui/{self.uid}/{data['Label']}")
        plan = _Plan(self.name, plistlib.dumps(data).decode("utf-8"), commands)
        if not dry_run:
            job.log_path.parent.mkdir(parents=True, exist_ok=True)
            self._load(path, data, replacing=path.exists())
        return plan

    def remove(self, ident: str, dry_run: bool, kind: str = "commit") -> _Plan | None:
        path = self._path(ident, kind)
        if not path.exists():
            return None
        label = f"{_LABEL_PREFIX}{kind}.{ident}"
        plan = _Plan(
            self.name,
            path.read_text(encoding="utf-8"),
            [f"launchctl bootout gui/{self.uid}/{label}", f"rm {shlex.quote(str(path))}"],
        )
        if not dry_run:
            self._launchctl("bootout", f"gui/{self.uid}/{label}", check=False)
            path.unlink()
        return plan

    def _read(self, path: Path) -> dict[str, Any] | None:
        try:
            with path.open("rb") as f:
                data = plistlib.load(f)
        except (OSError, plistlib.InvalidFileException, ValueError):
            return None
        return data if isinstance(data, dict) else None

    def _installed(self) -> list[tuple[str, str, Path, dict[str, Any]]]:
        """(kind, ident, path, plist) for every brain-wiki LaunchAgent."""
        out = []
        for kind in _KINDS:
            prefix = f"{_LABEL_PREFIX}{kind}."
            for path in sorted(self.dir.glob(f"{prefix}*.plist")):
                data = self._read(path)
                if data is not None:
                    out.append((kind, path.name[len(prefix) : -len(".plist")], path, data))
        return out

    def jobs(self) -> list[InstalledJob]:
        out = []
        for kind, ident, path, data in self._installed():
            brain_id = ident.split(".", 1)[0] if kind == "consolidate" else ident
            every = every_from_seconds(int(data.get("StartInterval") or 0))
            when = data.get("StartCalendarInterval") or {}
            at = (
                f"{int(when.get('Hour', 0)):02d}:{int(when.get('Minute', 0)):02d}"
                if isinstance(when, dict) and when
                else None
            )
            argv = list(data.get("ProgramArguments") or [])
            out.append(_job_from_argv(brain_id, argv, every, str(path), at=at))
        return out

    def rename(self, brain_id: str, new_name: str) -> bool:
        renamed = False
        for kind, ident, path, data in self._installed():
            if (ident.split(".", 1)[0] if kind == "consolidate" else ident) != brain_id:
                continue
            data["ProgramArguments"] = _renamed(list(data.get("ProgramArguments") or []), new_name)
            self._load(path, data, replacing=True)
            renamed = True
        return renamed

    def remove_all(self, brain_id: str) -> bool:
        removed = False
        for kind, ident, _path, _data in self._installed():
            if (ident.split(".", 1)[0] if kind == "consolidate" else ident) == brain_id:
                removed = self.remove(ident, False, kind) is not None or removed
        return removed


def scheduler(
    *,
    platform: str | None = None,
    runner: _Runner | None = None,
    agents_dir: Path | None = None,
    uid: int | None = None,
) -> _Cron | _Launchd:
    """The backend native to this platform."""
    platform = platform or _platform()
    runner = runner or _runner
    if platform == "darwin":
        return _Launchd(
            runner,
            agents_dir or Path.home() / "Library" / "LaunchAgents",
            os.getuid() if uid is None else uid,
        )
    if platform.startswith("win") or platform == "cygwin":
        raise UsageError(
            "brain schedule is not supported on Windows yet; run `brain commit` from Task "
            "Scheduler yourself"
        )
    return _Cron(runner)


def list_jobs() -> list[InstalledJob]:
    """Every installed job; empty where no backend works."""
    try:
        return scheduler().jobs()
    except (UsageError, NotAvailable):
        return []


def rename_job(brain_id: str, new_name: str) -> bool:
    """Point the brain's jobs at its new registered name. True when there was one."""
    try:
        return scheduler().rename(brain_id, new_name)
    except (UsageError, NotAvailable):
        return False


def remove_job(brain_id: str) -> bool:
    """Remove the brain's jobs, of every kind. True when there was one."""
    try:
        return scheduler().remove_all(brain_id)
    except (UsageError, NotAvailable):
        return False
