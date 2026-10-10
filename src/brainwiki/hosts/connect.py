"""`brain connect <host>`: wire a host to the locally installed brain-wiki (design doc 08 §8).

1. Materialize a host-specific copy of the plugin under `<data dir>/plugin/<host>/`, with MCP and
   hook commands pointing at the installed `brain` (faster than `uvx`), `--host <id>`, and an
   optional `--brain`; `--capture` adds the capture hooks.
2. Register it the way the host expects, preferring the host's own CLI.
3. Record every change (commands, files, backups) in `<state>/connect/<host>.json`, so
   `--uninstall` restores exactly what was there.
"""

from __future__ import annotations

import difflib
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

from brainwiki.config.dirs import data_dir, state_dir
from brainwiki.errors import NotAvailable, UnsupportedHost, UsageError

HOSTS = ("claude-code", "codex", "antigravity", "openclaw", "cursor", "generic")
MARKETPLACE = "brain-wiki-local"
PLUGIN_FILES = (
    "plugin.json",
    "mcp.json",
    ".mcp.json",
    "mcp_config.json",
    "hooks.json",
    "hooks/hooks.json",
    ".claude-plugin",
    "rules",
    "skills",
)
UNTRUSTED_MATCHER = "WebFetch|WebSearch|mcp__.*"


@dataclass
class Plan:
    host: str
    plugin_dir: Path
    files: dict[str, str] = field(default_factory=dict)  # path in plugin dir -> content
    commands: list[list[str]] = field(default_factory=list)
    edits: list[tuple[Path, str, str]] = field(default_factory=list)  # (file, before, after)
    links: list[tuple[Path, Path]] = field(default_factory=list)  # (link, target)
    notes: list[str] = field(default_factory=list)
    verify: list[str] | None = None

    def describe(self) -> str:
        lines = [f"Plugin copy: {self.plugin_dir} ({len(self.files)} files)"]
        for link, target in self.links:
            lines.append(f"Link: {link} -> {target}")
        for path, before, after in self.edits:
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


def brain_executable() -> str:
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


def _command(brain: str, *args: str) -> str:
    return shlex.join([brain, *args])


def _mcp_entry(brain: str, host: str, brain_name: str | None, *, typed: bool) -> dict[str, Any]:
    args = ["mcp", "--host", host] + (["--brain", brain_name] if brain_name else [])
    entry: dict[str, Any] = {"type": "stdio"} if typed else {}
    entry.update(command=brain, args=args)
    return entry


def materialize(host: str, *, capture: bool, brain_name: str | None) -> dict[str, str]:
    """The plugin files for this host, rewritten to use the installed `brain`."""
    source = plugin_source()
    brain = brain_executable()
    files: dict[str, str] = {}
    for item in PLUGIN_FILES:
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
    hook_host = host if host != "generic" else "auto"
    claude_hooks: dict[str, Any] = {
        "SessionStart": [
            {
                "hooks": [
                    {
                        "type": "command",
                        "command": _command(brain, "hook", hook_host, "SessionStart"),
                        "timeout": 10,
                    }
                ]
            }
        ]
    }
    if capture:
        claude_hooks["PostToolUse"] = [
            {
                "matcher": UNTRUSTED_MATCHER,
                "hooks": [
                    {
                        "type": "command",
                        "command": _command(brain, "hook", hook_host, "PostToolUse"),
                        "timeout": 10,
                    }
                ],
            }
        ]
        claude_hooks["Stop"] = [
            {
                "hooks": [
                    {
                        "type": "command",
                        "command": _command(brain, "hook", hook_host, "Stop"),
                        "timeout": 10,
                    }
                ]
            }
        ]
        for event in ("PreCompact", "SessionEnd"):
            claude_hooks[event] = [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": _command(brain, "hook", hook_host, event),
                            "timeout": 60,
                            "async": True,
                        }
                    ]
                }
            ]
    files["hooks/hooks.json"] = (
        json.dumps(
            {
                "description": "brain-wiki: orientation" + (" and capture" if capture else ""),
                "hooks": claude_hooks,
            },
            indent=2,
        )
        + "\n"
    )
    antigravity: dict[str, Any] = {
        "PreInvocation": [
            {
                "type": "command",
                "command": _command(brain, "hook", "antigravity", "PreInvocation"),
                "timeout": 10,
            }
        ]
    }
    if capture:
        for event in ("PostToolUse", "Stop"):
            antigravity[event] = [
                {
                    "type": "command",
                    "command": _command(brain, "hook", "antigravity", event),
                    "timeout": 30,
                }
            ]
    files["hooks.json"] = json.dumps({"brain-wiki": antigravity}, indent=2) + "\n"
    marketplace = json.loads(files[".claude-plugin/marketplace.json"])
    marketplace["name"] = MARKETPLACE
    files[".claude-plugin/marketplace.json"] = json.dumps(marketplace, indent=2) + "\n"
    return files


def _record_path(host: str) -> Path:
    return state_dir() / "connect" / f"{host}.json"


def load_record(host: str) -> dict[str, Any] | None:
    try:
        return json.loads(_record_path(host).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None


def _cursor_config(scope: str) -> Path:
    return (
        (Path.cwd() / ".cursor" / "mcp.json")
        if scope == "project"
        else Path.home() / ".cursor" / "mcp.json"
    )


def plan(
    host: str, *, scope: str = "user", capture: bool = False, brain_name: str | None = None
) -> Plan:
    if host not in HOSTS:
        raise UnsupportedHost(f"unknown host {host!r}; use one of {', '.join(HOSTS)}")
    plugin_dir = data_dir() / "plugin" / host
    result = Plan(host, plugin_dir, materialize(host, capture=capture, brain_name=brain_name))
    if host == "claude-code":
        if shutil.which("claude"):
            result.commands += [
                ["claude", "plugin", "marketplace", "add", str(plugin_dir)],
                ["claude", "plugin", "install", f"brain-wiki@{MARKETPLACE}", "--scope", scope],
            ]
            result.verify = ["claude", "plugin", "list"]
        else:
            result.notes.append(
                f"The `claude` command was not found. In Claude Code run: /plugin marketplace add {plugin_dir} "
                f"then /plugin install brain-wiki@{MARKETPLACE}"
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
        before = config.read_text(encoding="utf-8") if config.exists() else ""
        data = json.loads(before) if before.strip() else {}
        data.setdefault("mcpServers", {})["brain-wiki"] = _mcp_entry(
            brain_executable(), "cursor", brain_name, typed=False
        )
        result.edits.append((config, before, json.dumps(data, indent=2) + "\n"))
    else:
        entry = {
            "mcpServers": {
                "brain-wiki": _mcp_entry(brain_executable(), "generic", brain_name, typed=True)
            }
        }
        result.notes.append(
            "Add this to your MCP client's configuration:\n" + json.dumps(entry, indent=2)
        )
    return result


def apply(result: Plan, *, capture: bool, brain_name: str | None, scope: str) -> dict[str, Any]:
    if result.plugin_dir.exists():
        shutil.rmtree(result.plugin_dir)
    for rel, content in result.files.items():
        target = result.plugin_dir / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
    record: dict[str, Any] = {
        "host": result.host,
        "plugin_dir": str(result.plugin_dir),
        "capture": capture,
        "brain": brain_name,
        "scope": scope,
        "commands": [],
        "files": [],
        "links": [],
    }
    import brainwiki

    record["plugin"] = brainwiki.__version__
    backups = state_dir() / "connect" / "backups" / result.host
    for path, before, after in result.edits:
        backup = None
        if path.exists():
            backups.mkdir(parents=True, exist_ok=True)
            backup = backups / path.name
            backup.write_text(before, encoding="utf-8")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(after, encoding="utf-8")
        record["files"].append({"path": str(path), "backup": str(backup) if backup else None})
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
    path = _record_path(result.host)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(record, indent=2), encoding="utf-8")
    return record


def uninstall(host: str, *, dry_run: bool = False) -> list[str]:
    record = load_record(host)
    if record is None:
        return [f"{host} is not connected by brain-wiki; nothing to undo"]
    steps: list[str] = []
    commands: list[list[str]] = []
    if host == "claude-code" and shutil.which("claude"):
        commands = [
            [
                "claude",
                "plugin",
                "uninstall",
                f"brain-wiki@{MARKETPLACE}",
                "--scope",
                str(record.get("scope") or "user"),
            ],
            ["claude", "plugin", "marketplace", "remove", MARKETPLACE],
        ]
    elif host == "codex" and shutil.which("codex"):
        commands = [["codex", "plugin", "marketplace", "remove", MARKETPLACE]]
    elif host == "openclaw":
        steps.append("Remove the brain-wiki plugin in OpenClaw (`openclaw plugins` lists it).")
    for command in commands:
        steps.append("Run: " + shlex.join(command))
        if not dry_run:
            subprocess.run(command, capture_output=True, text=True, check=False, timeout=120)
    for link in record.get("links", []):
        steps.append(f"Remove link {link}")
        if not dry_run and Path(link).is_symlink():
            Path(link).unlink()
    for item in record.get("files", []):
        path, backup = Path(item["path"]), item.get("backup")
        steps.append(f"Restore {path}" if backup else f"Remove brain-wiki from {path}")
        if dry_run:
            continue
        if backup and Path(backup).is_file():
            path.write_text(Path(backup).read_text(encoding="utf-8"), encoding="utf-8")
        elif path.is_file():
            data = json.loads(path.read_text(encoding="utf-8") or "{}")
            data.get("mcpServers", {}).pop("brain-wiki", None)
            path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    steps.append(f"Remove {record['plugin_dir']}")
    if not dry_run:
        shutil.rmtree(record["plugin_dir"], ignore_errors=True)
        _record_path(host).unlink(missing_ok=True)
    return steps
