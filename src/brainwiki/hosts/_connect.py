"""`brain connect <host>`: wire a host to the locally installed brain-wiki (docs/design/agent-integrations.md §8).

1. Materialize a host-specific copy of the plugin under `<data dir>/plugin/<host>/`, with MCP
   commands pointing at the installed `brain` (faster than `uvx`), `--host <id>`, and an optional
   `--brain`.
2. Register it the way the host expects, preferring the host's own CLI.
3. Write the static instruction block into the file the host loads in every session (docs/design/agent-integrations.md §3.2).
4. Record every change (commands, files, backups, block hashes) in `<state>/connect/<host>.json`
   (user scope) or `<state>/connect/projects/<folder hash>/<host>.json` (project scope), so
   `--uninstall` undoes exactly what was done in that scope and never touches the other.
"""

from __future__ import annotations

import difflib
import hashlib
import json
import os
import shlex
import shutil
import subprocess
import sys
from dataclasses import dataclass, field
from importlib import resources
from pathlib import Path
from typing import Any

from brainwiki.config import MANIFEST, data_dir, load_user_config, state_dir
from brainwiki.errors import (
    Conflict,
    FormatError,
    NotAvailable,
    NotFound,
    UnsupportedHost,
    UsageError,
)
from brainwiki.hosts import _instructions as ins

HOSTS = ("claude-code", "codex", "antigravity", "openclaw", "cursor", "generic")
_USER_ONLY = ("codex", "antigravity", "openclaw")  # hosts with no per-project install
_MARKETPLACE = "brain-wiki-local"
_PLUGIN_FILES = (
    "plugin.json",
    "mcp.json",
    ".mcp.json",
    "mcp_config.json",
    ".claude-plugin",
    "rules",
    "skills",
)


@dataclass
class Instruction:
    """An instruction file to write: `path` as named, `written` after following symlinks."""

    path: Path
    written: Path
    before: str
    after: str
    whole: bool
    created: bool


@dataclass
class Plan:
    host: str
    plugin_dir: Path
    files: dict[str, str] = field(default_factory=dict)  # path in plugin dir -> content
    commands: list[list[str]] = field(default_factory=list)
    edits: list[tuple[Path, str, str]] = field(default_factory=list)  # (file, before, after)
    links: list[tuple[Path, Path]] = field(default_factory=list)  # (link, target)
    instructions: list[Instruction] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)
    verify: list[str] | None = None
    stale: list[dict[str, Any]] = field(default_factory=list)  # instructions no longer written
    scope: str = "user"
    project: Path | None = None  # the project folder, for project scope

    def describe(self) -> str:
        lines = [f"Plugin copy: {self.plugin_dir} ({len(self.files)} files)"]
        for link, target in self.links:
            lines.append(f"Link: {link} -> {target}")
        edits = [*self.edits, *((i.written, i.before, i.after) for i in self.instructions)]
        for path, before, after in edits:
            lines.append(f"Edit {path}:")
            lines += [
                "  " + line.rstrip("\n")
                for line in difflib.unified_diff(
                    before.splitlines(keepends=True),
                    after.splitlines(keepends=True),
                    "before",
                    "after",
                )
            ]
        for command in self.commands:
            lines.append("Run: " + shlex.join(command))
        lines += self.notes
        return "\n".join(lines)


def _brain_executable() -> str:
    """The installed `brain` command, as an absolute path."""
    sibling = Path(sys.executable).parent / ("brain.exe" if os.name == "nt" else "brain")
    if sibling.is_file():
        return str(sibling)
    found = shutil.which("brain")
    if found:
        return str(Path(found).resolve())
    raise NotAvailable(
        "cannot find the installed `brain` command; install brain-wiki with `uv tool install brain-wiki`"
    )


def plugin_source() -> Path:
    """Plugin files shipped in the wheel, or the repository root in a source checkout."""
    packaged = Path(str(resources.files("brainwiki") / "assets" / "plugin"))
    if (packaged / "plugin.json").is_file():
        return packaged
    repo = Path(__file__).resolve().parents[3]
    if (repo / "plugin.json").is_file():
        return repo
    raise NotAvailable("the plugin files are missing from this installation")


def _mcp_entry(brain: str, host: str, brain_name: str | None, *, typed: bool) -> dict[str, Any]:
    args = ["mcp", "--host", host] + (["--brain", brain_name] if brain_name else [])
    entry: dict[str, Any] = {"type": "stdio"} if typed else {}
    entry.update(command=brain, args=args)
    return entry


def _materialize(
    host: str, *, brain_name: str | None, access: ins.Access | None = None
) -> dict[str, str]:
    """The plugin files for this host, rewritten to use the installed `brain`."""
    source = plugin_source()
    brain = _brain_executable()
    files: dict[str, str] = {}
    for item in _PLUGIN_FILES:
        path = source / item
        if path.is_dir():
            for child in sorted(path.rglob("*")):
                if child.is_file():
                    files[child.relative_to(source).as_posix()] = child.read_text(encoding="utf-8")
        elif path.is_file():
            files[item] = path.read_text(encoding="utf-8")
    for name, typed in (("mcp.json", True), (".mcp.json", True), ("mcp_config.json", False)):
        if name in files:
            data = json.loads(files[name])
            data["mcpServers"]["brain-wiki"] = _mcp_entry(brain, host, brain_name, typed=typed)
            files[name] = json.dumps(data, indent=2) + "\n"
    files["rules/brain-wiki.md"] = ins.antigravity_rule(access or ins.Access())
    marketplace = json.loads(files[".claude-plugin/marketplace.json"])
    marketplace["name"] = _MARKETPLACE
    files[".claude-plugin/marketplace.json"] = json.dumps(marketplace, indent=2) + "\n"
    return files


def check_brain(brain_name: str | None) -> str | None:
    """The `--brain` value for the MCP entry: a registered name as given, or a brain folder
    made absolute. Anything else is refused, so connect never wires a brain that is not there."""
    if not brain_name:
        return None
    user = load_user_config()
    if brain_name in user.brains:
        return brain_name
    folder = Path(brain_name).expanduser()
    if (folder / MANIFEST).is_file():
        return str(folder.resolve())
    raise NotFound(
        f"no brain named {brain_name!r}; registered: {', '.join(user.brains) or 'none'} "
        "(or give the path of a brain folder)"
    )


def _scope_dir(scope: str, project: Path | None = None) -> Path:
    """Where connect keeps its record and backups for one scope: each project has its own."""
    base = state_dir() / "connect"
    if scope != "project":
        return base
    folder = str((project or Path.cwd()).resolve())
    return base / "projects" / hashlib.sha256(folder.encode("utf-8")).hexdigest()[:16]


def _record_path(host: str, scope: str = "user", project: Path | None = None) -> Path:
    return _scope_dir(scope, project) / f"{host}.json"


def _load_record(
    host: str, scope: str = "user", project: Path | None = None
) -> dict[str, Any] | None:
    try:
        return json.loads(_record_path(host, scope, project).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None


def _host_records(host: str) -> list[Path]:
    """Every scope this host is connected in: the user record and one per project."""
    base = state_dir() / "connect"
    found = [base / f"{host}.json", *sorted(base.glob(f"projects/*/{host}.json"))]
    return [path for path in found if path.is_file()]


def _sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _read_mcp_config(path: Path, fix: str) -> tuple[str, dict[str, Any]]:
    """An MCP client's JSON config, kept byte for byte in `before` (no newline translation)."""
    before = path.read_bytes().decode("utf-8") if path.exists() else ""
    if not before.strip():
        return before, {}
    try:
        data = json.loads(before)
    except json.JSONDecodeError as exc:
        raise FormatError(
            f"{path} is not plain JSON ({exc.msg} at line {exc.lineno}); comments and trailing "
            f"commas are not supported: remove them, or {fix}"
        ) from None
    if not isinstance(data, dict) or not isinstance(data.get("mcpServers", {}), dict):
        raise FormatError(f"{path} has no top-level mcpServers object; fix it, or {fix}")
    return before, data


def _has_entry(text: str) -> bool:
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return False
    servers = data.get("mcpServers") if isinstance(data, dict) else None
    return isinstance(servers, dict) and "brain-wiki" in servers


def _cursor_config(scope: str) -> Path:
    return (
        (Path.cwd() / ".cursor" / "mcp.json")
        if scope == "project"
        else Path.home() / ".cursor" / "mcp.json"
    )


def _plan_instructions(
    host: str, scope: str, access: ins.Access, *, force: bool, project: Path | None = None
) -> tuple[list[Instruction], list[str]]:
    """The instruction files to write, refusing to overwrite a block the user edited."""
    targets, notes = ins.targets(host, scope, access, project)
    record = _load_record(host, scope, project) or {}
    recorded = {item["path"]: item.get("sha256") for item in record.get("instructions", [])}
    out = []
    for target in targets:
        written = target.path.resolve() if target.path.is_symlink() else target.path
        if written != target.path:
            notes.append(f"{target.path} is a symlink; writing to {written}")
        before = written.read_text(encoding="utf-8") if written.is_file() else ""
        current = ins.find_block(before)
        if target.whole and before and current is None:
            current = before  # brain-wiki's own file, but rewritten without the markers
        wanted = ins.find_block(target.content) or target.content
        if (
            current is not None
            and current != wanted
            and ins.block_hash(current) != recorded.get(str(target.path))
            and not force
        ):
            raise Conflict(
                f"the brain-wiki instructions in {written} were edited since `brain connect` "
                "wrote them; rerun with --force to replace them"
            )
        after = target.content if target.whole else ins.put_block(before, target.content)
        if target.cap and len(after.encode("utf-8")) > target.cap * 0.9:
            notes.append(
                f"warning: {written} is {len(after.encode('utf-8')):,} bytes, close to what "
                f"{host} loads ({target.cap:,}); trim it so the block is not cut off"
            )
        out.append(
            Instruction(target.path, written, before, after, target.whole, not written.exists())
        )
    return out, notes


def plan(
    host: str, *, scope: str = "user", brain_name: str | None = None, force: bool = False
) -> Plan:
    if host not in HOSTS:
        raise UnsupportedHost(f"unknown host {host!r}; use one of {', '.join(HOSTS)}")
    if scope == "project" and host in _USER_ONLY:
        raise UsageError(
            f"{host} has no project scope: brain-wiki connects it for your user; "
            "run it without --scope project"
        )
    project = Path.cwd().resolve() if scope == "project" else None
    plugin_dir = data_dir() / "plugin" / host
    access = ins.host_access(host)
    result = Plan(host, plugin_dir, _materialize(host, brain_name=brain_name, access=access))
    result.scope, result.project = scope, project
    result.instructions, notes = _plan_instructions(
        host, scope, access, force=force, project=project
    )
    result.notes += notes
    wanted = {str(i.path) for i in result.instructions}
    result.stale = [
        item
        for item in (_load_record(host, scope, project) or {}).get("instructions", [])
        if not item.get("plugin") and item["path"] not in wanted
    ]
    result.notes += [
        f"Remove the brain-wiki block from {item.get('written') or item['path']} "
        "(an earlier connect wrote it; this host no longer reads it)"
        for item in result.stale
    ]
    if host == "claude-code":
        if shutil.which("claude"):
            result.commands += [
                ["claude", "plugin", "marketplace", "add", str(plugin_dir)],
                ["claude", "plugin", "install", f"brain-wiki@{_MARKETPLACE}", "--scope", scope],
            ]
            result.verify = ["claude", "plugin", "list"]
        else:
            result.notes.append(
                f"The `claude` command was not found. In Claude Code run: /plugin marketplace add {plugin_dir} "
                f"then /plugin install brain-wiki@{_MARKETPLACE}"
            )
    elif host == "codex":
        if shutil.which("codex"):
            result.commands.append(["codex", "plugin", "marketplace", "add", str(plugin_dir)])
            result.verify = ["codex", "plugin", "marketplace", "list"]
            result.notes.append("Then enable brain-wiki from Codex's plugin browser.")
        else:
            result.notes.append(
                f"The `codex` command was not found. Add {plugin_dir} as a local marketplace in Codex."
            )
    elif host == "antigravity":
        result.links.append(
            (Path.home() / ".gemini" / "config" / "plugins" / "brain-wiki", plugin_dir)
        )
    elif host == "openclaw":
        if shutil.which("openclaw"):
            result.commands.append(["openclaw", "plugins", "install", "--link", str(plugin_dir)])
        else:
            result.notes.append(
                f"The `openclaw` command was not found. Install the plugin from {plugin_dir}."
            )
    elif host == "cursor":
        config = _cursor_config(scope)
        before, data = _read_mcp_config(
            config, "add brain-wiki by hand with `brain connect cursor --print`"
        )
        data.setdefault("mcpServers", {})["brain-wiki"] = _mcp_entry(
            _brain_executable(), "cursor", brain_name, typed=False
        )
        result.edits.append((config, before, json.dumps(data, indent=2) + "\n"))
    else:
        result.notes.append(print_text(host, brain_name, access))
    return result


def print_text(host: str, brain_name: str | None, access: ins.Access | None = None) -> str:
    """The MCP entry and the instruction block, for hosts brain-wiki cannot configure itself."""
    access = access or ins.host_access(host)
    entry = {
        "mcpServers": {"brain-wiki": _mcp_entry(_brain_executable(), host, brain_name, typed=True)}
    }
    return (
        "Add this to your MCP client's configuration:\n"
        + json.dumps(entry, indent=2)
        + "\n\nAnd add these instructions where your agent reads them in every session:\n\n"
        + ins.block_text(access, skill=False)
    )


def apply(result: Plan, *, brain_name: str | None, scope: str) -> dict[str, Any]:
    if result.plugin_dir.exists():
        shutil.rmtree(result.plugin_dir)
    for rel, content in result.files.items():
        target = result.plugin_dir / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
    record: dict[str, Any] = {
        "host": result.host,
        "plugin_dir": str(result.plugin_dir),
        "brain": brain_name,
        "scope": scope,
        "commands": [],
        "files": [],
        "links": [],
    }
    project = result.project if scope == "project" else None
    if project is not None:
        record["project"] = str(project)
    import brainwiki

    record["plugin"] = brainwiki.__version__
    previous = {
        item["path"]: item
        for item in (_load_record(result.host, scope, project) or {}).get("files", [])
    }
    backups = _scope_dir(scope, project) / "backups" / result.host
    for path, before, after in result.edits:
        earlier = previous.get(str(path))
        if earlier and earlier.get("sha256") == _sha(before.encode("utf-8")):
            # Reconnecting over our own unchanged write: the first backup is still the
            # user's original file; a new one would only hold brain-wiki's entry.
            backup = earlier.get("backup")
        elif path.exists():
            backups.mkdir(parents=True, exist_ok=True)
            backup = str(backups / path.name)
            Path(backup).write_bytes(before.encode("utf-8"))
        else:
            backup = None
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(after.encode("utf-8"))
        record["files"].append(
            {"path": str(path), "backup": backup, "sha256": _sha(after.encode("utf-8"))}
        )
    for item in result.stale:
        _remove_block(item, dry_run=False)
    record["instructions"] = []
    for item in result.instructions:
        backup = None
        if item.before:
            backups.mkdir(parents=True, exist_ok=True)
            backup = backups / f"{item.written.name}.before"
            backup.write_text(item.before, encoding="utf-8")
        item.written.parent.mkdir(parents=True, exist_ok=True)
        item.written.write_text(item.after, encoding="utf-8")
        body = ins.find_block(item.after) or item.after
        record["instructions"].append(
            {
                "path": str(item.path),
                "written": str(item.written),
                "sha256": ins.block_hash(body),
                "whole": item.whole,
                "created": item.created,
                "backup": str(backup) if backup else None,
            }
        )
    if result.host == "antigravity":
        rule = result.plugin_dir / "rules" / "brain-wiki.md"
        record["instructions"].append({"path": str(rule), "plugin": True})
    for link, target in result.links:
        if link.is_symlink() or link.exists():
            if not (link.is_symlink() and link.resolve() == target.resolve()):
                raise UsageError(
                    f"{link} already exists and is not brain-wiki's link; remove it first"
                )
            link.unlink()
        link.parent.mkdir(parents=True, exist_ok=True)
        link.symlink_to(target, target_is_directory=True)
        record["links"].append(str(link))
    for command in result.commands:
        done = subprocess.run(command, capture_output=True, text=True, check=False, timeout=120)
        record["commands"].append(
            {
                "run": command,
                "ok": done.returncode == 0,
                "output": (done.stdout + done.stderr)[-400:],
            }
        )
    if result.verify:
        done = subprocess.run(
            result.verify, capture_output=True, text=True, check=False, timeout=60
        )
        record["visible"] = "brain-wiki" in done.stdout
    path = _record_path(result.host, scope, project)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(record, indent=2), encoding="utf-8")
    return record


def _remove_block(item: dict[str, Any], *, dry_run: bool) -> list[str]:
    """Undo one recorded instruction file: drop brain-wiki's block, or the file it created."""
    if item.get("plugin"):
        return []
    path = Path(item.get("written") or item["path"])
    if not path.is_file():
        return []
    text = path.read_text(encoding="utf-8")
    if ins.find_block(text) is None:
        return [f"Leave {path} (no brain-wiki block in it)"]
    remaining = "" if item.get("whole") else ins.drop_block(text)
    if not remaining.strip() and (item.get("whole") or item.get("created")):
        if not dry_run:
            path.unlink()
        return [f"Delete {path}"]
    if not dry_run:
        path.write_text(remaining, encoding="utf-8")
    return [f"Remove the brain-wiki block from {path}"]


def _restore_file(item: dict[str, Any], *, dry_run: bool) -> list[str]:
    """Undo one config edit (docs/design/agent-integrations.md §8.5). Unchanged since connect: put back the user's original
    bytes, or delete the file connect created. Changed since: take out only brain-wiki's
    entry, so the user's later edits survive."""
    path = Path(item["path"])
    if not path.is_file():
        return []
    raw = path.read_bytes()
    backup = Path(item["backup"]) if item.get("backup") else None
    unchanged = item.get("sha256") == _sha(raw)
    if unchanged and backup is None:
        if not dry_run:
            path.unlink()
        return [f"Delete {path} (connect created it)"]
    if unchanged and backup is not None and backup.is_file():
        original = backup.read_bytes()
        if not _has_entry(original.decode("utf-8", "replace")):
            if not dry_run:
                path.write_bytes(original)
                backup.unlink()
            return [f"Restore {path} as it was before connect"]
    _, data = _read_mcp_config(path, "remove the brain-wiki entry by hand")
    servers = data.get("mcpServers", {})
    if "brain-wiki" not in servers:
        return [f"Leave {path} (no brain-wiki entry in it)"]
    del servers["brain-wiki"]
    if backup is None and data in ({}, {"mcpServers": {}}):
        if not dry_run:
            path.unlink()
        return [f"Delete {path} (connect created it; nothing else is left in it)"]
    if not dry_run:
        path.write_bytes((json.dumps(data, indent=2) + "\n").encode("utf-8"))
    why = "" if unchanged else " (it changed since connect, so the rest is kept as it is now)"
    return [f"Remove brain-wiki's entry from {path}{why}"]


def _scope_label(path: Path) -> str:
    record = json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}
    return f"project {record['project']}" if record.get("project") else "user"


def uninstall(host: str, *, scope: str = "user", dry_run: bool = False) -> list[str]:
    project = Path.cwd().resolve() if scope == "project" else None
    path = _record_path(host, scope, project)
    record = _load_record(host, scope, project)
    others = [p for p in _host_records(host) if p != path]
    if record is None:
        where = f"for {project}" if project else "for your user"
        steps = [f"{host} is not connected by brain-wiki {where}; nothing to undo"]
        for other in others:
            label = _scope_label(other)
            steps.append(
                f"It is connected for {label}: run "
                f"`brain connect {host} --scope project --uninstall` in that folder"
                if label.startswith("project")
                else f"It is connected for your user: run `brain connect {host} --uninstall`"
            )
        return steps
    steps: list[str] = []
    commands: list[list[str]] = []
    if host == "claude-code" and shutil.which("claude"):
        commands = [
            [
                "claude",
                "plugin",
                "uninstall",
                f"brain-wiki@{_MARKETPLACE}",
                "--scope",
                str(record.get("scope") or "user"),
            ]
        ]
        if not others:
            commands.append(["claude", "plugin", "marketplace", "remove", _MARKETPLACE])
    elif host == "codex" and shutil.which("codex") and not others:
        commands = [["codex", "plugin", "marketplace", "remove", _MARKETPLACE]]
    elif host == "openclaw":
        steps.append("Remove the brain-wiki plugin in OpenClaw (`openclaw plugins` lists it).")
    for command in commands:
        steps.append("Run: " + shlex.join(command))
        if not dry_run:
            subprocess.run(command, capture_output=True, text=True, check=False, timeout=120)
    for item in record.get("instructions", []):
        steps += _remove_block(item, dry_run=dry_run)
    for link in record.get("links", []):
        steps.append(f"Remove link {link}")
        if not dry_run and Path(link).is_symlink():
            Path(link).unlink()
    for item in record.get("files", []):
        steps += _restore_file(item, dry_run=dry_run)
    if others:
        labels = ", ".join(_scope_label(p) for p in others)
        steps.append(f"Keep {record['plugin_dir']} (still connected for {labels})")
    else:
        steps.append(f"Remove {record['plugin_dir']}")
    if not dry_run:
        if not others:
            shutil.rmtree(record["plugin_dir"], ignore_errors=True)
        path.unlink(missing_ok=True)
    return steps
