"""`brain schedule`: one OS job per brain that runs `brain commit` (write-path.md §5.2).

The OS scheduler is the source of truth: a user crontab block on Linux, a LaunchAgent on macOS.
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

_LABEL_PREFIX = "io.github.brain-wiki.commit."
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
    """A job to install: `program commit --brain NAME [--push]` every `every`."""

    brain_id: str
    brain_name: str
    every: str
    push: bool
    program: list[str]
    env: dict[str, str] = field(default_factory=dict)
    log: Path | None = None

    @property
    def argv(self) -> list[str]:
        return [*self.program, "commit", "--brain", self.brain_name] + (
            ["--push"] if self.push else []
        )

    @property
    def log_path(self) -> Path:
        return self.log or log_path(self.brain_id)


@dataclass
class InstalledJob:
    brain_id: str
    brain_name: str | None  # the name in the job's `--brain`
    every: str | None
    push: bool
    where: str  # "crontab" or the plist's path


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


def make_job(brain_id: str, brain_name: str, every: str, push: bool) -> Job:
    every = parse_every(every)[0]
    env = {k: os.environ[k] for k in _ENV_VARS if os.environ.get(k)}
    return Job(brain_id, brain_name, every, push, _program_argv(), env)


def _job_from_argv(brain_id: str, argv: list[str], every: str | None, where: str) -> InstalledJob:
    name = argv[argv.index("--brain") + 1] if "--brain" in argv[:-1] else None
    return InstalledJob(brain_id, name, every, "--push" in argv, where)


def _renamed(argv: list[str], new_name: str) -> list[str]:
    out = list(argv)
    if "--brain" in out[:-1]:
        out[out.index("--brain") + 1] = new_name
    return out


# -- Linux: user crontab ----------------------------------------------------------------------


def _start(brain_id: str) -> str:
    return f"# >>> brain-wiki commit {brain_id}"


def _end(brain_id: str) -> str:
    return f"# <<< brain-wiki commit {brain_id}"


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


def _find_block(lines: list[str], brain_id: str) -> tuple[int, int] | None:
    start, end = _start(brain_id), _end(brain_id)
    for i, line in enumerate(lines):
        if line.rstrip("\r\n") == start:
            for j in range(i + 1, len(lines)):
                if lines[j].rstrip("\r\n") == end:
                    return i, j
    return None


def _blocks(text: str) -> dict[str, str]:
    """brain id -> the job line, for every brain-wiki block in a crontab."""
    out: dict[str, str] = {}
    lines = text.splitlines()
    prefix = _start("")
    for line in lines:
        brain_id = line[len(prefix) :].strip() if line.startswith(prefix) else ""
        found = _find_block(lines, brain_id) if brain_id else None
        if found:
            body = [x for x in lines[found[0] + 1 : found[1]] if x.strip() and x[0] != "#"]
            if body:
                out[brain_id] = body[0]
    return out


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
        line = _cron_line(cron_schedule(job.every), job.argv, job.env, job.log_path)
        return f"{_start(job.brain_id)}\n{line}\n{_end(job.brain_id)}\n"

    @staticmethod
    def _replace(text: str, brain_id: str, block: str) -> str:
        lines = text.splitlines(keepends=True)
        found = _find_block(lines, brain_id)
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
            self._write(self._replace(current, job.brain_id, block))
        return plan

    def remove(self, brain_id: str, dry_run: bool) -> _Plan | None:
        current = self._read()
        if not current:
            return None
        lines = current.splitlines(keepends=True)
        found = _find_block(lines, brain_id)
        if not found:
            return None
        start, end = found
        plan = _Plan(self.name, "".join(lines[start : end + 1]), ["crontab -l", "crontab -"])
        if not dry_run:
            self._write("".join(lines[:start] + lines[end + 1 :]))
        return plan

    def jobs(self) -> list[InstalledJob]:
        out = []
        for brain_id, line in _blocks(self._read() or "").items():
            schedule, argv, _env, _log = _parse_cron_line(line)
            out.append(_job_from_argv(brain_id, argv, every_from_cron(schedule), self.name))
        return out

    def rename(self, brain_id: str, new_name: str) -> bool:
        current = self._read()
        line = _blocks(current or "").get(brain_id)
        if current is None or line is None:
            return False
        schedule, argv, env, log = _parse_cron_line(line)
        new_line = _cron_line(schedule, _renamed(argv, new_name), env, Path(log or "/dev/null"))
        block = f"{_start(brain_id)}\n{new_line}\n{_end(brain_id)}\n"
        self._write(self._replace(current, brain_id, block))
        return True


# -- macOS: LaunchAgents ----------------------------------------------------------------------


class _Launchd:
    name = "launchd"

    def __init__(self, runner: _Runner, agents_dir: Path, uid: int):
        self.run = runner
        self.dir = agents_dir
        self.uid = uid

    def _path(self, brain_id: str) -> Path:
        return self.dir / f"{_LABEL_PREFIX}{brain_id}.plist"

    def _launchctl(self, *args: str, check: bool = True) -> None:
        done = self.run(["launchctl", *args], None)
        if check and done.returncode != 0:
            raise NotAvailable(f"launchctl {args[0]} failed: {(done.stderr or '').strip()}")

    @staticmethod
    def plist(job: Job) -> dict[str, Any]:
        data: dict[str, Any] = {
            "Label": _LABEL_PREFIX + job.brain_id,
            "ProgramArguments": job.argv,
            "StartInterval": parse_every(job.every)[1],
            "StandardOutPath": str(job.log_path),
            "StandardErrorPath": str(job.log_path),
        }
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
        path = self._path(job.brain_id)
        commands = [f"launchctl bootstrap gui/{self.uid} {shlex.quote(str(path))}"]
        if path.exists():
            commands.insert(0, f"launchctl bootout gui/{self.uid}/{data['Label']}")
        plan = _Plan(self.name, plistlib.dumps(data).decode("utf-8"), commands)
        if not dry_run:
            job.log_path.parent.mkdir(parents=True, exist_ok=True)
            self._load(path, data, replacing=path.exists())
        return plan

    def remove(self, brain_id: str, dry_run: bool) -> _Plan | None:
        path = self._path(brain_id)
        if not path.exists():
            return None
        label = _LABEL_PREFIX + brain_id
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

    def jobs(self) -> list[InstalledJob]:
        out = []
        for path in sorted(self.dir.glob(f"{_LABEL_PREFIX}*.plist")):
            data = self._read(path)
            if data is None:
                continue
            brain_id = path.name[len(_LABEL_PREFIX) : -len(".plist")]
            every = every_from_seconds(int(data.get("StartInterval") or 0))
            out.append(
                _job_from_argv(brain_id, list(data.get("ProgramArguments") or []), every, str(path))
            )
        return out

    def rename(self, brain_id: str, new_name: str) -> bool:
        path = self._path(brain_id)
        data = self._read(path) if path.exists() else None
        if data is None:
            return False
        data["ProgramArguments"] = _renamed(list(data.get("ProgramArguments") or []), new_name)
        self._load(path, data, replacing=True)
        return True


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
    """Every installed commit job; empty where no backend works."""
    try:
        return scheduler().jobs()
    except (UsageError, NotAvailable):
        return []


def rename_job(brain_id: str, new_name: str) -> bool:
    """Point the brain's job at its new registered name. True when there was a job."""
    try:
        return scheduler().rename(brain_id, new_name)
    except (UsageError, NotAvailable):
        return False


def remove_job(brain_id: str) -> bool:
    """Remove the brain's job. True when there was one."""
    try:
        return scheduler().remove(brain_id, dry_run=False) is not None
    except (UsageError, NotAvailable):
        return False
