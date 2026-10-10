"""`brain` entry point. The parser is built here; handlers are imported only when used."""

from __future__ import annotations

import argparse
import importlib
import sys

HANDLERS: dict[str, str] = {
    "version": "brainwiki.cli.cmd_core:version",
    "init": "brainwiki.cli.cmd_core:init",
    "brains": "brainwiki.cli.cmd_core:brains",
    "doctor": "brainwiki.cli.cmd_core:doctor",
    "setup": "brainwiki.cli.cmd_core:setup",
    "orient": "brainwiki.cli.cmd_read:orient",
    "search": "brainwiki.cli.cmd_read:search",
    "read": "brainwiki.cli.cmd_read:read",
    "index": "brainwiki.cli.cmd_read:index",
    "log": "brainwiki.cli.cmd_write:log",
    "rule": "brainwiki.cli.cmd_write:rule",
    "mv": "brainwiki.cli.cmd_write:mv",
    "consolidate": "brainwiki.cli.cmd_consolidate:consolidate",
    "review": "brainwiki.cli.cmd_consolidate:review",
    "runs": "brainwiki.cli.cmd_runs:runs",
    "undo": "brainwiki.cli.cmd_runs:undo",
    "lint": "brainwiki.cli.cmd_lint:lint",
    "report": "brainwiki.cli.cmd_lint:report",
    "harvest": "brainwiki.cli.cmd_harvest:harvest",
    "origin": "brainwiki.cli.cmd_harvest:origin",
    "connect": "brainwiki.cli.cmd_hosts:connect",
    "hook": "brainwiki.cli.cmd_hosts:hook",
    "mcp": "brainwiki.cli.cmd_hosts:mcp",
    "schedule": "brainwiki.cli.cmd_hosts:schedule",
    "import": "brainwiki.cli.cmd_import:import_",
    "viz": "brainwiki.cli.cmd_viz:viz",
    "bench": "brainwiki.cli.cmd_bench:bench",
}


def build_parser() -> argparse.ArgumentParser:
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--brain", help="brain name or path")
    common.add_argument("--as", dest="as_host", metavar="HOST", help="act with HOST's profile")
    common.add_argument("--json", action="store_true", help="machine-readable output")
    common.add_argument("-q", "--quiet", action="store_true")
    common.add_argument("-v", "--verbose", action="store_true")

    parser = argparse.ArgumentParser(
        prog="brain", description="A local-first second brain for AI agents.", parents=[common]
    )
    sub = parser.add_subparsers(dest="command", metavar="COMMAND")

    def cmd(name: str, help_text: str) -> argparse.ArgumentParser:
        return sub.add_parser(name, help=help_text, parents=[common])

    cmd("version", "print the version")

    p = cmd("init", "create a brain")
    p.add_argument("path", nargs="?", default=".")
    p.add_argument("--name")
    p.add_argument("--git", action="store_true", help="also run git init")
    p.add_argument("--no-register", action="store_true", help="do not add it to the user config")

    p = cmd("brains", "list and manage registered brains")
    p.add_argument(
        "action", nargs="?", default="list", choices=["list", "add", "remove", "rename", "default"]
    )
    p.add_argument("args", nargs="*")
    p.add_argument("--purge-state", action="store_true")

    cmd("doctor", "check configuration, brains, index, and host wiring")
    cmd("setup", "interactive onboarding wizard")

    cmd("orient", "print orientation for an agent")

    p = cmd("search", "search the brain")
    p.add_argument("query")
    p.add_argument("--limit", type=int, default=8)
    p.add_argument("--topic", action="append")
    p.add_argument(
        "--intent",
        default="context",
        choices=["none", "context", "why", "impact", "history", "related"],
    )
    p.add_argument("--include", default="", help="comma list: archived,episodes,archived_episodes")
    p.add_argument("--no-episodes", action="store_true")

    p = cmd("read", "read a note, hub, or episode")
    p.add_argument("target")
    p.add_argument("--mode", choices=["outline", "full", "section", "raw"])
    p.add_argument("--section")

    p = cmd("index", "inspect or rebuild the index")
    p.add_argument("--rebuild", action="store_true")
    p.add_argument("--status", action="store_true")

    p = cmd("log", "write an episode to the inbox")
    p.add_argument("text", nargs="?", default=None, help="episode text, or - for stdin")
    p.add_argument("--topic", action="append", default=[])
    p.add_argument("--claim", action="append", default=[])
    p.add_argument("--agent", help="record as written by this host (scripts)")
    p.add_argument("--taint", choices=["true", "false", "unknown"])

    p = cmd("rule", "manage standing rules")
    p.add_argument("action", choices=["add", "list", "accept", "reject"])
    p.add_argument("value", nargs="?")
    p.add_argument("--quote")
    p.add_argument("--replaces")

    p = cmd("mv", "move a note and rewrite links to it")
    p.add_argument("src")
    p.add_argument("dst")
    p.add_argument("--dry-run", action="store_true")

    p = cmd("consolidate", "fold pending episodes into notes")
    p.add_argument("--backend", choices=["agent", "command"])
    p.add_argument("--command", dest="preset", metavar="PRESET")
    p.add_argument("--model")
    p.add_argument("--topic")
    p.add_argument("--max-episodes", type=int)
    p.add_argument("--if-pending", type=int, default=0)
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--prepare", action="store_true", help="write a packet for an external driver")
    p.add_argument("--out")
    p.add_argument("--apply", dest="apply_file", metavar="OPS.json")
    p.add_argument("--run")

    p = cmd("review", "list, show, accept, or reject proposals")
    p.add_argument("action", choices=["list", "show", "accept", "reject"])
    p.add_argument("run", nargs="?")

    p = cmd("runs", "list or show run records")
    p.add_argument("action", nargs="?", default="list", choices=["list", "show"])
    p.add_argument("run", nargs="?")

    p = cmd("undo", "undo a run")
    p.add_argument("run", nargs="?")
    p.add_argument("--force", action="store_true")

    p = cmd("lint", "check the brain against the format")
    p.add_argument("paths", nargs="*")
    p.add_argument("--fix", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--profile", choices=["strict", "migrate"])
    p.add_argument("--staged", action="store_true")
    p.add_argument("--changed", action="store_true")
    p.add_argument("--install-hook", action="store_true")
    p.add_argument("--select", help="only these codes or prefixes, e.g. BW3,BW405")
    p.add_argument("--ignore", help="skip these codes or prefixes")

    cmd("report", "regenerate reports/")

    p = cmd("harvest", "turn host session transcripts into episodes")
    p.add_argument("--from", dest="hosts", action="append")
    p.add_argument("--since", default=None)
    p.add_argument("--project")
    p.add_argument("--raw", action="store_true")
    p.add_argument("--distill", metavar="PRESET")
    p.add_argument("--apply", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--status", action="store_true")

    p = cmd("origin", "show the conversation an episode came from")
    p.add_argument("episode")
    p.add_argument("--turns")
    p.add_argument("--include-tool-output", action="store_true")

    p = cmd("connect", "wire an agent host to brain-wiki")
    p.add_argument("host")
    p.add_argument("--scope", choices=["user", "project"], default="user")
    p.add_argument("--capture", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--uninstall", action="store_true")
    p.add_argument("--print", dest="print_only", action="store_true")

    p = cmd("hook", "handle a host hook event (reads JSON on stdin)")
    p.add_argument("host")
    p.add_argument("event")

    p = cmd("mcp", "run the stdio MCP server")
    p.add_argument("--host", default="auto")

    p = cmd("schedule", "routine templates for host schedulers")
    p.add_argument("action", choices=["list", "show", "install", "remove"])
    p.add_argument("routine", nargs="?")
    p.add_argument("--for", dest="for_host")
    p.add_argument("--via", choices=["cron", "launchd", "systemd"])
    p.add_argument("--at", default=None)
    p.add_argument("--apply", action="store_true")
    p.add_argument("--dry-run", action="store_true")

    p = cmd("import", "adopt or import existing Markdown")
    p.add_argument("path", nargs="?")
    p.add_argument("--overlay", action="store_true")
    p.add_argument("--into")
    p.add_argument("--to-episodes", action="store_true")
    p.add_argument("--from", dest="from_host")
    p.add_argument("--agent")
    p.add_argument("--untrusted", action="store_true")
    p.add_argument("--phase", type=int, default=0)
    p.add_argument("--apply", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--topic")

    p = cmd("viz", "open the 3D brain map")
    p.add_argument("--topic", action="append")
    p.add_argument("--port", type=int, default=0)
    p.add_argument("--no-open", action="store_true")
    p.add_argument("--export")

    p = cmd("bench", "run the evaluation bench")
    p.add_argument("suites", nargs="*")
    p.add_argument("--backends", default="")
    p.add_argument("--sizes", default="1k")
    p.add_argument("--out")
    p.add_argument("--compare", nargs=2, metavar=("A", "B"))
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if not args.command:
        parser.print_help()
        return 2
    module_name, func_name = HANDLERS[args.command].split(":")
    from brainwiki.errors import BrainError

    try:
        handler = getattr(importlib.import_module(module_name), func_name)
        return int(handler(args) or 0)
    except BrainError as exc:
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return exc.exit_code
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    sys.exit(main())
