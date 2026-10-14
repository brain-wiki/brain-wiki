"""`brain` entry point. The parser is built here; handlers are imported only when used."""

from __future__ import annotations

import argparse
import importlib
import sys

_HANDLERS: dict[str, str] = {
    "version": "brainwiki.cli.cmd_core:version",
    "init": "brainwiki.cli.cmd_core:init",
    "list": "brainwiki.cli.cmd_core:list_",
    "brains": "brainwiki.cli.cmd_core:brains",
    "doctor": "brainwiki.cli.cmd_core:doctor",
    "setup": "brainwiki.cli.cmd_core:setup",
    "orient": "brainwiki.cli.cmd_read:orient",
    "search": "brainwiki.cli.cmd_read:search",
    "read": "brainwiki.cli.cmd_read:read",
    "neighbors": "brainwiki.cli.cmd_read:neighbors",
    "topics": "brainwiki.cli.cmd_browse:topics",
    "notes": "brainwiki.cli.cmd_browse:notes",
    "outline": "brainwiki.cli.cmd_browse:outline",
    "links": "brainwiki.cli.cmd_browse:links",
    "backlinks": "brainwiki.cli.cmd_browse:backlinks",
    "tags": "brainwiki.cli.cmd_browse:tags",
    "types": "brainwiki.cli.cmd_browse:types",
    "recent": "brainwiki.cli.cmd_browse:recent",
    "orphans": "brainwiki.cli.cmd_browse:orphans",
    "unresolved": "brainwiki.cli.cmd_browse:unresolved",
    "index": "brainwiki.cli.cmd_read:index",
    "log": "brainwiki.cli.cmd_write:log",
    "rule": "brainwiki.cli.cmd_write:rule",
    "mv": "brainwiki.cli.cmd_write:mv",
    "check": "brainwiki.cli.cmd_write:check",
    "restore": "brainwiki.cli.cmd_write:restore",
    "consolidate": "brainwiki.cli.cmd_consolidate:consolidate",
    "review": "brainwiki.cli.cmd_consolidate:review",
    "runs": "brainwiki.cli.cmd_runs:runs",
    "undo": "brainwiki.cli.cmd_runs:undo",
    "lint": "brainwiki.cli.cmd_lint:lint",
    "report": "brainwiki.cli.cmd_lint:report",
    "harvest": "brainwiki.cli.cmd_harvest:harvest",
    "origin": "brainwiki.cli.cmd_harvest:origin",
    "connect": "brainwiki.cli.cmd_hosts:connect",
    "mcp": "brainwiki.cli.cmd_hosts:mcp",
    "import": "brainwiki.cli.cmd_import:import_",
    "viz": "brainwiki.cli.cmd_viz:viz",
    "bench": "brainwiki.cli.cmd_bench:bench",
}


def _common(*, suppress: bool) -> argparse.ArgumentParser:
    """Global options. Subcommands suppress their defaults, so `brain --brain X orient` keeps
    the X given before the subcommand instead of resetting it."""
    common = argparse.ArgumentParser(add_help=False)
    extra = {"default": argparse.SUPPRESS} if suppress else {}
    common.add_argument("--brain", help="brain name or path", **extra)
    common.add_argument(
        "--as", dest="as_host", metavar="HOST", help="act with HOST's profile", **extra
    )
    common.add_argument("--json", action="store_true", help="machine-readable output", **extra)
    common.add_argument(
        "-q", "--quiet", action="store_true", help="print less (brain bench)", **extra
    )
    return common


def _positive(text: str) -> int:
    value = int(text)
    if value < 1:
        raise argparse.ArgumentTypeError(f"must be 1 or more, not {value}")
    return value


def _build_parser() -> argparse.ArgumentParser:
    common = _common(suppress=True)
    parser = argparse.ArgumentParser(
        prog="brain",
        description="A local-first second brain for AI agents.",
        parents=[_common(suppress=False)],
    )
    sub = parser.add_subparsers(dest="command", metavar="COMMAND")

    def cmd(name: str, help_text: str) -> argparse.ArgumentParser:
        return sub.add_parser(name, help=help_text, parents=[common])

    cmd("version", "print the version")

    target_help = "id, path, file name, alias, or title"
    p = cmd("init", "create a brain")
    p.add_argument("path", nargs="?", default=".", help="folder for the brain (default: here)")
    p.add_argument("--name", help="brain name (default: the folder name)")
    p.add_argument("--git", action="store_true", help="also run git init")
    p.add_argument("--no-register", action="store_true", help="do not add it to the user config")

    cmd("list", "brains this host may use, and what each holds")

    p = cmd("brains", "list and manage registered brains")
    p.add_argument(
        "action",
        nargs="?",
        default="list",
        choices=["list", "add", "remove", "rename", "default"],
        help="list; add NAME PATH; remove NAME; rename OLD NEW; default NAME",
    )
    p.add_argument("args", nargs="*", help="the names and path the action takes")
    p.add_argument(
        "--purge-state",
        action="store_true",
        help="with remove, also delete its index and run history here",
    )

    cmd("doctor", "check configuration, brains, index, and host wiring")
    cmd("setup", "interactive onboarding wizard")

    cmd("orient", "print orientation for an agent")

    p = cmd("search", "search the brain, or browse it with an empty query")
    p.add_argument(
        "query", nargs="?", default="", help="keywords; empty to browse within the filters"
    )
    p.add_argument("--limit", type=_positive, default=8, help="results per page (1-50)")
    p.add_argument(
        "--topic", action="append", help="only this topic and its sub-topics (repeatable)"
    )
    p.add_argument(
        "--type",
        dest="types",
        action="append",
        metavar="TYPE",
        help="only notes of this type (repeatable: any)",
    )
    p.add_argument(
        "--tag",
        dest="tags",
        action="append",
        metavar="TAG",
        help="only notes with this tag or its sub-tags (repeatable: all)",
    )
    p.add_argument(
        "--where",
        action="append",
        default=[],
        metavar="KEY=VALUE",
        help="only notes whose frontmatter KEY equals VALUE (repeatable)",
    )
    p.add_argument("--since", help="YYYY-MM-DD, or 7d, 4w, 3m")
    p.add_argument("--until", help="updated on or before: YYYY-MM-DD, or 7d, 4w, 3m")
    p.add_argument(
        "--sort",
        choices=["relevance", "recent", "title"],
        help="default: relevance for a query, recent when browsing",
    )
    p.add_argument("--cursor", help="next_cursor from the previous page")
    p.add_argument(
        "--intent",
        default="context",
        choices=["none", "context", "why", "impact", "history", "related"],
        help="also show hits' parents (context), dependencies (why), dependents "
        "(impact), supersessions (history), or links (related)",
    )
    p.add_argument("--include", default="", help="comma list: archived,episodes,archived_episodes")
    p.add_argument(
        "--no-episodes", action="store_true", help="leave out pending episodes (on for queries)"
    )
    p.add_argument("--count", action="store_true", help="print only the number of matches")
    p.add_argument("--facets", action="store_true", help="counts by type, topic, and tag")
    p.add_argument("--paths", action="store_true", help="one path per line")

    p = cmd("read", "read a note, hub, or episode")
    p.add_argument("target", help=target_help)
    p.add_argument(
        "--mode",
        choices=["outline", "full", "section", "raw"],
        help="headings and claims, the body, one section, or the raw file "
        "(default: full; outline for hubs)",
    )
    p.add_argument("--section", help="heading to read with --mode section")

    p = cmd("neighbors", "follow a note's relations")
    p.add_argument("target", help=target_help)
    p.add_argument(
        "--rel",
        dest="relations",
        action="append",
        choices=["part_of", "depends_on", "conflicts_with", "supersedes", "related_to", "links_to"],
        help="follow only this relation (repeatable; default: all but links_to)",
    )
    p.add_argument(
        "--direction",
        choices=["out", "in", "both"],
        default="both",
        help="out: what it points to; in: what points to it",
    )
    p.add_argument("--depth", type=_positive, default=1, help="hops to follow (1-3)")
    p.add_argument("--limit", type=_positive, default=30, help="most neighbors to return (1-100)")
    p.add_argument("--paths", action="store_true", help="one path per line")

    def listing(p: argparse.ArgumentParser, limit: int | None = None) -> None:
        p.add_argument("--limit", type=_positive, default=limit, help="items per page")
        p.add_argument("--cursor", help="continue from this offset (printed after a page)")
        p.add_argument("--count", action="store_true", help="print only the total")
        p.add_argument("--paths", action="store_true", help="one path per line")

    p = cmd("topics", "the topic tree with note counts")
    p.add_argument("topic", nargs="?", help="show only this topic and its sub-topics")
    p = cmd("notes", "list notes (search with an empty query)")
    p.add_argument(
        "--topic", action="append", help="only this topic and its sub-topics (repeatable)"
    )
    p.add_argument(
        "--type",
        dest="types",
        action="append",
        metavar="TYPE",
        help="only notes of this type (repeatable: any)",
    )
    p.add_argument(
        "--tag",
        dest="tags",
        action="append",
        metavar="TAG",
        help="only notes with this tag or its sub-tags (repeatable: all)",
    )
    p.add_argument(
        "--sort", choices=["recent", "title"], default="recent", help="newest first, or by title"
    )
    p.add_argument("--facets", action="store_true", help="counts by type, topic, and tag")
    listing(p, 50)
    p = cmd("outline", "a note's headings")
    p.add_argument("target", help=target_help)
    for name, help_text in (
        ("links", "what a note links to"),
        ("backlinks", "what links to a note"),
    ):
        p = cmd(name, help_text)
        p.add_argument("target", help=target_help)
        listing(p)
    for name, help_text in (("tags", "tags in use"), ("types", "note types in use")):
        p = cmd(name, help_text)
        p.add_argument("--counts", action="store_true", help="show how many notes use each")
        listing(p)
    p = cmd("recent", "recently updated notes")
    p.add_argument("--since", help="YYYY-MM-DD, or 7d, 4w, 3m")
    listing(p, 20)
    listing(cmd("orphans", "notes nothing links to"))
    listing(cmd("unresolved", "links that resolve to no note"))

    p = cmd("index", "inspect or rebuild the index")
    p.add_argument("--rebuild", action="store_true", help="rebuild the index from scratch")
    p.add_argument(
        "--status", action="store_true", help="rescan changed files and show counts (the default)"
    )

    p = cmd("log", "write an episode to the inbox")
    p.add_argument("text", nargs="?", default=None, help="episode text, or - for stdin")
    p.add_argument(
        "--topic", action="append", default=[], help="topic hint for consolidation (repeatable)"
    )
    p.add_argument("--claim", action="append", default=[], help="add a claim (repeatable)")
    p.add_argument("--agent", help="record as written by this host (scripts)")
    p.add_argument(
        "--taint",
        choices=["true", "false", "unknown"],
        help="whether the text is untrusted (default: false; unknown with --agent)",
    )

    p = cmd("rule", "manage standing rules")
    p.add_argument(
        "action",
        choices=["add", "list", "accept", "reject"],
        help="add TEXT; list rules and proposals; accept or reject a proposal ID",
    )
    p.add_argument("value", nargs="?", help="rule text for add; proposal id for accept or reject")
    p.add_argument("--quote", help="the user's words behind the rule (default: the rule text)")
    p.add_argument("--replaces", help="id of the rule this one replaces (r-...)")

    p = cmd("check", "validate and record direct edits of notes; no paths lists pending edits")
    p.add_argument("paths", nargs="*", help="note files you edited")
    p.add_argument("--adopt", action="store_true", help="record as your own edit despite problems")
    p.add_argument("--allow-shrink", action="store_true", help="allow removing most of a note")

    p = cmd("restore", "put back a note's last recorded version")
    p.add_argument("path", help="note file to restore")

    p = cmd("mv", "move a note, or a topic folder with its notes, rewriting links")
    p.add_argument("src", help="note or topic folder to move")
    p.add_argument("dst", help="new path")
    p.add_argument("--dry-run", action="store_true", help="show the diff without moving anything")

    p = cmd("consolidate", "drive consolidation yourself (agents use brain_consolidate_*)")
    p.add_argument("--topic", help="only pending episodes tagged with this topic")
    p.add_argument(
        "--max-episodes", type=int, help="most episodes in the packet (default: brain.toml)"
    )
    p.add_argument(
        "--dry-run", action="store_true", help="with --apply, show the diff without writing"
    )
    p.add_argument("--prepare", action="store_true", help="write a packet for an external driver")
    p.add_argument("--out", help="with --prepare, write the packet to this file")
    p.add_argument(
        "--apply",
        dest="apply_file",
        metavar="OPS.json",
        help="validate and apply ops from this file (- for stdin); writes notes",
    )
    p.add_argument("--run", help="run id from --prepare (needed with --apply)")

    p = cmd("review", "list, show, accept, or reject proposals")
    p.add_argument(
        "action",
        choices=["list", "show", "accept", "reject"],
        help="accept applies the proposal; reject discards it",
    )
    p.add_argument("run", nargs="?", help="proposal run id (needed for show, accept, reject)")

    p = cmd("runs", "list or show run records")
    p.add_argument(
        "action",
        nargs="?",
        default="list",
        choices=["list", "show"],
        help="list runs on this device, or show one run's changes",
    )
    p.add_argument("run", nargs="?", help="run id to show (default: the latest)")

    p = cmd("undo", "undo a run")
    p.add_argument("run", nargs="?", help="run id (default: the latest undoable run)")
    p.add_argument(
        "--force",
        action="store_true",
        help="undo even if files changed since; current versions are saved",
    )

    p = cmd("lint", "check the brain against the format")
    p.add_argument("paths", nargs="*", help="files or folders to check (default: the whole brain)")
    p.add_argument("--fix", action="store_true", help="fix what it can, as one undoable run")
    p.add_argument(
        "--dry-run", action="store_true", help="with --fix, show the diff without writing"
    )
    p.add_argument(
        "--profile",
        choices=["strict", "migrate"],
        help="migrate relaxes rules legacy notes break (default: brain.toml)",
    )
    p.add_argument("--staged", action="store_true", help="check only files staged in git")
    p.add_argument(
        "--changed", action="store_true", help="check only files changed since last lint"
    )
    p.add_argument(
        "--install-hook", action="store_true", help="install a git pre-commit hook that lints"
    )
    p.add_argument("--select", help="only these codes or prefixes, e.g. BW3,BW405")
    p.add_argument("--ignore", help="skip these codes or prefixes")

    cmd("report", "regenerate reports/")

    p = cmd("harvest", "turn host session transcripts into episodes")
    p.add_argument(
        "--from",
        dest="hosts",
        action="append",
        help="harvest this host's sessions (repeatable; default: config)",
    )
    p.add_argument(
        "--since", default=None, help="sessions from the last 12h, 30d, 2w (default: config or 30d)"
    )
    p.add_argument("--project", help="only sessions run in this folder or below it")
    p.add_argument(
        "--raw", action="store_true", help="write the turns as they are, without a model"
    )
    p.add_argument(
        "--distill", metavar="PRESET", help="distill with this model preset (default: config)"
    )
    p.add_argument(
        "--apply",
        action="store_true",
        help="write episodes (without it, list sessions and token estimates)",
    )
    p.add_argument(
        "--dry-run", action="store_true", help="with --apply, list chunks without writing"
    )
    p.add_argument("--status", action="store_true", help="per host: on or off, sessions left")

    p = cmd("origin", "show the conversation an episode came from")
    p.add_argument("episode", help="episode id or path")
    p.add_argument("--turns", help="turn range A-B (default: the episode's turns plus context)")

    p = cmd("connect", "wire an agent host to brain-wiki")
    p.add_argument("host", help="claude-code, codex, antigravity, openclaw, cursor, or generic")
    p.add_argument(
        "--scope",
        choices=["user", "project"],
        default="user",
        help="install for your user, or for the current project",
    )
    p.add_argument("--force", action="store_true", help="replace an edited instruction block")
    p.add_argument("--dry-run", action="store_true", help="show the plan without changing anything")
    p.add_argument("--uninstall", action="store_true", help="remove what connect installed")
    p.add_argument(
        "--print",
        dest="print_only",
        action="store_true",
        help="print the MCP entry and instructions to add by hand",
    )

    p = cmd("mcp", "run the stdio MCP server")
    p.add_argument("--host", default="auto", help="host id for profiles (default: auto-detect)")

    p = cmd("import", "adopt or import existing Markdown")
    p.add_argument(
        "path", nargs="?", help="folder or file to import (with --from: memory location)"
    )
    p.add_argument(
        "--overlay", action="store_true", help="adopt the folder as a brain in place, by phases"
    )
    p.add_argument("--into", help="copy the files into this brain's topics")
    p.add_argument(
        "--to-episodes", action="store_true", help="turn each Markdown file into an episode"
    )
    p.add_argument("--from", dest="from_host", help="import this host's memory files as episodes")
    p.add_argument("--agent", help="with --to-episodes, record as written by this host")
    p.add_argument(
        "--untrusted", action="store_true", help="with --to-episodes, mark the episodes untrusted"
    )
    p.add_argument(
        "--phase",
        type=int,
        default=0,
        help="overlay phase: 0 adopt, 1 relations, 2 ids and status, 3 hubs",
    )
    p.add_argument(
        "--apply", action="store_true", help="make the changes (without it, show a dry run)"
    )
    p.add_argument(
        "--dry-run", action="store_true", help="show what would change (the default unless --apply)"
    )
    p.add_argument("--topic", help="put the imported files or episodes under this topic")

    p = cmd("viz", "open the 3D brain map")
    p.add_argument("--topic", action="append", help="map only this topic (repeatable)")
    p.add_argument("--port", type=int, default=0, help="port to serve on (default: any free port)")
    p.add_argument("--no-open", action="store_true", help="print the URL; do not open a browser")
    p.add_argument("--export", help="write the map to FILE (.html, .json, .graphml) and exit")

    p = cmd("bench", "run the evaluation bench")
    p.add_argument(
        "suites",
        nargs="*",
        help="retrieval, lint, perf (the default), consolidation, agent",
    )
    p.add_argument(
        "--backends", default="", help="comma list of model presets for consolidation and agent"
    )
    p.add_argument("--sizes", default="1k", help="comma list of brain sizes in notes, e.g. 1k,10k")
    p.add_argument("--out", help="folder for results (default: a new temp folder)")
    p.add_argument(
        "--compare",
        nargs=2,
        metavar=("A", "B"),
        help="compare two results files; fail on regressions",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)
    if not args.command:
        parser.print_help()
        return 2
    module_name, func_name = _HANDLERS[args.command].split(":")
    from brainwiki.errors import BrainError

    try:
        handler = getattr(importlib.import_module(module_name), func_name)
        return int(handler(args) or 0)
    except BrainError as exc:
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return exc.exit_code
    except OSError as exc:  # a path the user gave that cannot be read or written
        where = f": {exc.filename}" if exc.filename else ""
        print(f"os_error: {exc.strerror or exc}{where}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    sys.exit(main())
