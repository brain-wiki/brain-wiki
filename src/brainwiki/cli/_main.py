"""`brain` entry point (design doc 07 §2). Typer parses; handlers are imported only when used.

A command does no work itself: it returns a `_Call`, naming the handler and the namespace of
arguments the handler reads. `main` runs the handler outside Typer, so the exit codes and the
error lines of 07 §2.3 stay this module's, not Click's.
"""

import importlib
import os
import sys
from dataclasses import dataclass
from enum import StrEnum
from types import SimpleNamespace
from typing import Annotated, Any, Literal

import typer

_HANDLERS: dict[str, str] = {
    "init": "brainwiki.cli._cmd_core:init",
    "brains": "brainwiki.cli._cmd_core:brains",
    "agents": "brainwiki.cli._cmd_core:agents",
    "doctor": "brainwiki.cli._cmd_core:doctor",
    "setup": "brainwiki.cli._cmd_core:setup",
    "orient": "brainwiki.cli._cmd_read:orient",
    "search": "brainwiki.cli._cmd_read:search",
    "read": "brainwiki.cli._cmd_read:read",
    "neighbors": "brainwiki.cli._cmd_read:neighbors",
    "topics": "brainwiki.cli._cmd_browse:topics",
    "links": "brainwiki.cli._cmd_browse:links",
    "backlinks": "brainwiki.cli._cmd_browse:backlinks",
    "tags": "brainwiki.cli._cmd_browse:tags",
    "types": "brainwiki.cli._cmd_browse:types",
    "orphans": "brainwiki.cli._cmd_browse:orphans",
    "unresolved": "brainwiki.cli._cmd_browse:unresolved",
    "index": "brainwiki.cli._cmd_read:index",
    "log": "brainwiki.cli._cmd_write:log",
    "rules": "brainwiki.cli._cmd_write:rules",
    "mv": "brainwiki.cli._cmd_write:mv",
    "check": "brainwiki.cli._cmd_write:check",
    "restore": "brainwiki.cli._cmd_write:restore",
    "consolidate": "brainwiki.cli._cmd_consolidate:consolidate",
    "review": "brainwiki.cli._cmd_consolidate:review",
    "runs": "brainwiki.cli._cmd_runs:runs",
    "undo": "brainwiki.cli._cmd_runs:undo",
    "lint": "brainwiki.cli._cmd_lint:lint",
    "report": "brainwiki.cli._cmd_lint:report",
    "harvest": "brainwiki.cli._cmd_harvest:harvest",
    "origin": "brainwiki.cli._cmd_harvest:origin",
    "connect": "brainwiki.cli._cmd_hosts:connect",
    "mcp": "brainwiki.cli._cmd_hosts:mcp",
    "import": "brainwiki.cli._cmd_import:import_",
    "viz": "brainwiki.cli._cmd_viz:viz",
    "bench": "brainwiki.cli._cmd_bench:bench",
}


@dataclass(frozen=True)
class _Call:
    command: str
    args: SimpleNamespace


def _call(ctx: typer.Context, command: str, **values: Any) -> _Call:
    """The handler's namespace: `values`, plus the global options from every level of the
    command line, the one nearest the command winning (`brain --brain a log --brain b`)."""
    chain = []
    level: Any = ctx
    while level is not None:
        chain.append(level)
        level = level.parent
    found: dict[str, Any] = {"brain": None, "as_host": None, "json": False}
    for level in reversed(chain):
        for key in ("brain", "as_host"):
            if level.params.get(key) is not None:
                found[key] = level.params[key]
        found["json"] = found["json"] or bool(level.params.get("json"))
    return _Call(command, SimpleNamespace(command=command, **found, **values))


# Global options, accepted before the command and after it.
_Brain = Annotated[str | None, typer.Option("--brain", help="brain name or path")]
_As = Annotated[str | None, typer.Option("--as", metavar="HOST", help="act with HOST's profile")]
_Json = Annotated[bool, typer.Option("--json", help="machine-readable output")]

# Shared by several commands.
_Target = Annotated[str, typer.Argument(help="id, path, file name, alias, or title")]
_Topics = Annotated[
    list[str] | None,
    typer.Option("--topic", help="only this topic and its sub-topics (repeatable)"),
]
_Types = Annotated[
    list[str] | None,
    typer.Option("--type", metavar="TYPE", help="only notes of this type (repeatable: any)"),
]
_Tags = Annotated[
    list[str] | None,
    typer.Option(
        "--tag", metavar="TAG", help="only notes with this tag or its sub-tags (repeatable: all)"
    ),
]
_Cursor = Annotated[
    str | None, typer.Option("--cursor", help="continue from this offset (printed after a page)")
]
_Count = Annotated[bool, typer.Option("--count", help="print only the total")]
_Paths = Annotated[bool, typer.Option("--paths", help="one path per line")]
_Names = Annotated[bool, typer.Option("--paths", help="one name per line")]
_PageLimit = Annotated[int | None, typer.Option("--limit", min=1, help="items per page")]

_CONTEXT = {"help_option_names": ["-h", "--help"]}


def _sub_app(help_text: str) -> typer.Typer:
    return typer.Typer(
        help=help_text,
        rich_markup_mode=None,  # plain help, and rich is never imported
        pretty_exceptions_enable=False,
        add_completion=False,
        context_settings=_CONTEXT,
    )


_app = typer.Typer(
    name="brain",
    help="A local-first second brain for AI agents.",
    rich_markup_mode=None,
    pretty_exceptions_enable=False,
    context_settings=_CONTEXT,
)


def _show_version(value: bool) -> None:
    if value:
        import brainwiki  # __version__ reads package metadata (~50 ms), so only when asked

        print(f"brain-wiki {brainwiki.__version__} (format {brainwiki.FORMAT_VERSION})")
        raise typer.Exit()


@_app.callback(invoke_without_command=True)
def _root(
    ctx: typer.Context,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
    version: Annotated[
        bool,
        typer.Option(
            "--version", is_eager=True, callback=_show_version, help="show the version and exit"
        ),
    ] = False,
) -> None:
    if ctx.invoked_subcommand is None:
        print(ctx.get_help())
        raise typer.Exit(2)


# -- set up --------------------------------------------------------------------


@_app.command("init", help="create a brain")
def _init(
    ctx: typer.Context,
    path: Annotated[str, typer.Argument(help="folder for the brain (default: here)")] = ".",
    name: Annotated[
        str | None, typer.Option("--name", help="brain name (default: the folder name)")
    ] = None,
    git: Annotated[bool, typer.Option("--git", help="also run git init")] = False,
    no_register: Annotated[
        bool, typer.Option("--no-register", help="do not add it to the user config")
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "init", path=path, name=name, git=git, no_register=no_register)


_brains_app = _sub_app("list and manage registered brains (bare: list them)")
_app.add_typer(_brains_app, name="brains")


def _brains(ctx: typer.Context, action: str, *rest: str, purge_state: bool = False) -> _Call:
    return _call(ctx, "brains", action=action, args=list(rest), purge_state=purge_state)


@_brains_app.callback(invoke_without_command=True)
def _brains_root(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call | None:
    return _brains(ctx, "list") if ctx.invoked_subcommand is None else None


@_brains_app.command("list", help="brains you (or --as HOST) may use, and what each holds")
def _brains_list(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _brains(ctx, "list")


@_brains_app.command("add", help="register the brain at PATH as NAME")
def _brains_add(
    ctx: typer.Context,
    name: Annotated[str, typer.Argument(help="lowercase letters, digits, and hyphens")],
    path: Annotated[str, typer.Argument(help="the brain's folder")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "add", name, path)


@_brains_app.command("remove", help="unregister a brain; its folder is untouched")
def _brains_remove(
    ctx: typer.Context,
    name: Annotated[str, typer.Argument(help="a registered brain")],
    purge_state: Annotated[
        bool,
        typer.Option("--purge-state", help="also delete its index and run history here"),
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "remove", name, purge_state=purge_state)


@_brains_app.command("rename", help="rename a registered brain")
def _brains_rename(
    ctx: typer.Context,
    old: Annotated[str, typer.Argument(help="a registered brain")],
    new: Annotated[str, typer.Argument(help="its new name")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "rename", old, new)


@_brains_app.command("default", help="make a registered brain the default")
def _brains_default(
    ctx: typer.Context,
    name: Annotated[str, typer.Argument(help="a registered brain")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "default", name)


@_brains_app.command("limit", help="the only brains an agent _app may use")
def _brains_limit(
    ctx: typer.Context,
    host: Annotated[str, typer.Argument(help="host id, e.g. claude-code")],
    names: Annotated[list[str], typer.Argument(metavar="BRAIN...", help="registered brains")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "limit", host, *names)


@_brains_app.command("unlimit", help="let an agent _app use every brain again")
def _brains_unlimit(
    ctx: typer.Context,
    host: Annotated[str, typer.Argument(help="host id, e.g. claude-code")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _brains(ctx, "unlimit", host)


_agents_app = _sub_app("what each agent _app may do in a brain (bare: list the profiles)")
_app.add_typer(_agents_app, name="agents")

_Host = Annotated[str, typer.Argument(help="a host id, or default")]
_Caps = Annotated[
    list[str],
    typer.Argument(
        metavar="CAPABILITY...",
        help="episodes, edit, propose_rules, consolidate, harvest, review",
    ),
]
_ProfileDryRun = Annotated[bool, typer.Option("--dry-run", help="show the diff without writing")]


@_agents_app.callback(invoke_without_command=True)
def _agents_root(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call | None:
    if ctx.invoked_subcommand is None:
        return _call(ctx, "agents", action="list", args=[], dry_run=False)
    return None


@_agents_app.command("list", help="what each agent _app may write")
def _agents_list(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "agents", action="list", args=[], dry_run=False)


@_agents_app.command("grant", help="let an agent _app do more")
def _agents_grant(
    ctx: typer.Context,
    host: _Host,
    caps: _Caps,
    dry_run: _ProfileDryRun = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "agents", action="grant", args=[host, *caps], dry_run=dry_run)


@_agents_app.command("revoke", help="take capabilities away from an agent app")
def _agents_revoke(
    ctx: typer.Context,
    host: _Host,
    caps: _Caps,
    dry_run: _ProfileDryRun = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "agents", action="revoke", args=[host, *caps], dry_run=dry_run)


@_app.command("doctor", help="check configuration, brains, index, and host wiring")
def _doctor(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "doctor")


@_app.command("setup", help="set up step by step: create a brain, connect agents, turn on harvest")
def _setup(
    ctx: typer.Context,
    guide: Annotated[
        bool,
        typer.Option("--guide", help="print the steps for an AI agent to walk you through instead"),
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "setup", guide=guide)


# -- read ----------------------------------------------------------------------


@_app.command("orient", help="print orientation for an agent")
def _orient(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "orient")


@_app.command("search", help="search the brain, or browse it with an empty query")
def _search(
    ctx: typer.Context,
    query: Annotated[str, typer.Argument(help="keywords; empty to browse within the filters")] = "",
    limit: Annotated[int, typer.Option("--limit", min=1, help="results per page (1-50)")] = 8,
    topic: _Topics = None,
    types: _Types = None,
    tags: _Tags = None,
    where: Annotated[
        list[str] | None,
        typer.Option(
            "--where",
            metavar="KEY=VALUE",
            help="only notes whose frontmatter KEY equals VALUE (repeatable)",
        ),
    ] = None,
    since: Annotated[str | None, typer.Option("--since", help="YYYY-MM-DD, or 7d, 4w, 3m")] = None,
    until: Annotated[
        str | None, typer.Option("--until", help="updated on or before: YYYY-MM-DD, or 7d, 4w, 3m")
    ] = None,
    sort: Annotated[
        Literal["relevance", "recent", "title"] | None,
        typer.Option("--sort", help="default: relevance for a query, recent when browsing"),
    ] = None,
    cursor: Annotated[
        str | None, typer.Option("--cursor", help="next_cursor from the previous page")
    ] = None,
    intent: Annotated[
        Literal["none", "context", "why", "impact", "history", "related"],
        typer.Option(
            "--intent",
            help="also show hits' parents (context), dependencies (why), dependents "
            "(impact), supersessions (history), or links (related)",
        ),
    ] = "context",
    include: Annotated[
        str, typer.Option("--include", help="comma list: archived,episodes,archived_episodes")
    ] = "",
    no_episodes: Annotated[
        bool, typer.Option("--no-episodes", help="leave out pending episodes (on for queries)")
    ] = False,
    count: Annotated[
        bool, typer.Option("--count", help="print only the number of matches")
    ] = False,
    facets: Annotated[
        bool, typer.Option("--facets", help="counts by type, topic, and tag")
    ] = False,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "search",
        query=query,
        limit=limit,
        topic=topic or None,
        types=types or None,
        tags=tags or None,
        where=list(where or []),
        since=since,
        until=until,
        sort=sort,
        cursor=cursor,
        intent=intent,
        include=include,
        no_episodes=no_episodes,
        count=count,
        facets=facets,
        paths=paths,
    )


@_app.command("read", help="read a note, hub, or episode")
def _read(
    ctx: typer.Context,
    target: _Target,
    mode: Annotated[
        Literal["outline", "full", "section", "raw"] | None,
        typer.Option(
            "--mode",
            help="headings and claims, the body, one section, or the raw file "
            "(default: full; outline for hubs)",
        ),
    ] = None,
    section: Annotated[
        str | None, typer.Option("--section", help="heading to read with --mode section")
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "read", target=target, mode=mode, section=section)


class _Relation(StrEnum):
    part_of = "part_of"
    depends_on = "depends_on"
    conflicts_with = "conflicts_with"
    supersedes = "supersedes"
    related_to = "related_to"
    links_to = "links_to"


@_app.command(
    "neighbors",
    help="follow a note's relations by their meaning (e.g. what depends on it), "
    "not by which file declares them",
)
def _neighbors(
    ctx: typer.Context,
    target: _Target,
    relations: Annotated[
        list[_Relation] | None,
        typer.Option(
            "--rel", help="follow only this relation (repeatable; default: all but links_to)"
        ),
    ] = None,
    direction: Annotated[
        Literal["out", "in", "both"],
        typer.Option("--direction", help="out: what it points to; in: what points to it"),
    ] = "both",
    depth: Annotated[int, typer.Option("--depth", min=1, help="hops to follow (1-3)")] = 1,
    limit: Annotated[
        int, typer.Option("--limit", min=1, help="most neighbors to return (1-100)")
    ] = 30,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "neighbors",
        target=target,
        relations=[r.value for r in relations] if relations else None,
        direction=direction,
        depth=depth,
        limit=limit,
        paths=paths,
    )


@_app.command("topics", help="the topic tree with note counts")
def _topics(
    ctx: typer.Context,
    topic: Annotated[
        str | None, typer.Argument(help="show only this topic and its sub-topics")
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "topics", topic=topic)


@_app.command(
    "links", help="what a note links to, as written in its file (body links and typed relations)"
)
def _links(
    ctx: typer.Context,
    target: _Target,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "links", target=target, limit=limit, cursor=cursor, count=count, paths=paths)


@_app.command("backlinks", help="what links to a note, as written in other files")
def _backlinks(
    ctx: typer.Context,
    target: _Target,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx, "backlinks", target=target, limit=limit, cursor=cursor, count=count, paths=paths
    )


_Counts = Annotated[bool, typer.Option("--counts", help="show how many notes use each")]


@_app.command("tags", help="tags in use")
def _tags(
    ctx: typer.Context,
    counts: _Counts = False,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Names = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "tags", counts=counts, limit=limit, cursor=cursor, count=count, paths=paths)


@_app.command("types", help="note types in use")
def _types(
    ctx: typer.Context,
    counts: _Counts = False,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Names = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "types", counts=counts, limit=limit, cursor=cursor, count=count, paths=paths)


@_app.command("orphans", help="notes nothing links to")
def _orphans(
    ctx: typer.Context,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "orphans", limit=limit, cursor=cursor, count=count, paths=paths)


@_app.command("unresolved", help="links that resolve to no note")
def _unresolved(
    ctx: typer.Context,
    limit: _PageLimit = None,
    cursor: _Cursor = None,
    count: _Count = False,
    paths: _Paths = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "unresolved", limit=limit, cursor=cursor, count=count, paths=paths)


@_app.command("index", help="inspect or rebuild the index")
def _index(
    ctx: typer.Context,
    rebuild: Annotated[
        bool, typer.Option("--rebuild", help="rebuild the index from scratch")
    ] = False,
    status: Annotated[
        bool,
        typer.Option("--status", help="rescan changed files and show counts (the default)"),
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "index", rebuild=rebuild, status=status)


# -- write ---------------------------------------------------------------------


@_app.command("log", help="write an episode to the inbox")
def _log(
    ctx: typer.Context,
    text: Annotated[str | None, typer.Argument(help="episode text, or - for stdin")] = None,
    topic: Annotated[
        list[str] | None,
        typer.Option("--topic", help="topic hint for consolidation (repeatable)"),
    ] = None,
    claim: Annotated[
        list[str] | None, typer.Option("--claim", help="add a claim (repeatable)")
    ] = None,
    agent: Annotated[
        str | None, typer.Option("--agent", help="record as written by this host (scripts)")
    ] = None,
    inputs: Annotated[
        Literal["local", "external", "unknown"] | None,
        typer.Option(
            "--inputs",
            help="whether the text came from outside your control: external for web or tool "
            "output (default: local; unknown with --agent)",
        ),
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "log",
        text=text,
        topic=list(topic or []),
        claim=list(claim or []),
        agent=agent,
        inputs=inputs,
    )


_rules_app = _sub_app("manage standing rules")
_app.add_typer(_rules_app, name="rules")
_app.add_typer(_rules_app, name="rule", hidden=True)  # the old name


def _rules(ctx: typer.Context, action: str, value: str | None = None, **extra: Any) -> _Call:
    values = {"quote": None, "replaces": None} | extra
    return _call(ctx, "rules", action=action, value=value, **values)


@_rules_app.command("add", help="add a rule; with --as HOST, save it as a proposal instead")
def _rules_add(
    ctx: typer.Context,
    text: Annotated[str, typer.Argument(help="the rule")],
    quote: Annotated[
        str | None,
        typer.Option("--quote", help="the user's words behind the rule (default: the rule text)"),
    ] = None,
    replaces: Annotated[
        str | None, typer.Option("--replaces", help="id of the rule this one replaces (r-...)")
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _rules(ctx, "add", text, quote=quote, replaces=replaces)


@_rules_app.command("list", help="the rules, and proposals awaiting confirmation")
def _rules_list(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _rules(ctx, "list")


_ProposalId = Annotated[str, typer.Argument(metavar="ID", help="rule proposal id (r-...)")]


@_rules_app.command("accept", help="accept a rule proposal")
def _rules_accept(
    ctx: typer.Context,
    proposal: _ProposalId,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _rules(ctx, "accept", proposal)


@_rules_app.command("reject", help="reject a rule proposal")
def _rules_reject(
    ctx: typer.Context,
    proposal: _ProposalId,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _rules(ctx, "reject", proposal)


@_app.command(
    "check",
    help="record notes you edited by hand: validates each one, then records it; "
    "with no paths, lists hand edits not yet recorded",
)
def _check(
    ctx: typer.Context,
    paths: Annotated[list[str] | None, typer.Argument(help="note files you edited")] = None,
    adopt: Annotated[
        bool, typer.Option("--adopt", help="record as your own edit despite problems")
    ] = False,
    allow_shrink: Annotated[
        bool, typer.Option("--allow-shrink", help="allow removing most of a note")
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "check", paths=list(paths or []), adopt=adopt, allow_shrink=allow_shrink)


@_app.command("restore", help="put back a note's last recorded version")
def _restore(
    ctx: typer.Context,
    path: Annotated[str, typer.Argument(help="note file to restore")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "restore", path=path)


@_app.command("mv", help="move a note, or a topic folder with its notes, rewriting links")
def _mv(
    ctx: typer.Context,
    src: Annotated[str, typer.Argument(help="note or topic folder to move")],
    dst: Annotated[str, typer.Argument(help="new path")],
    dry_run: Annotated[
        bool, typer.Option("--dry-run", help="show the diff without moving anything")
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "mv", src=src, dst=dst, dry_run=dry_run)


# -- consolidate and review ------------------------------------------------------


@_app.command("consolidate", help="drive consolidation yourself (agents use brain_consolidate_*)")
def _consolidate(
    ctx: typer.Context,
    topic: Annotated[
        str | None, typer.Option("--topic", help="only pending episodes tagged with this topic")
    ] = None,
    max_episodes: Annotated[
        int | None,
        typer.Option("--max-episodes", help="most episodes in the packet (default: brain.toml)"),
    ] = None,
    dry_run: Annotated[
        bool, typer.Option("--dry-run", help="with --apply, show the diff without writing")
    ] = False,
    prepare: Annotated[
        bool, typer.Option("--prepare", help="write a packet for an external driver")
    ] = False,
    out: Annotated[
        str | None,
        typer.Option(
            "--out",
            help="with --prepare, write the packet as JSON ({run, instructions, packet}) "
            "to this file",
        ),
    ] = None,
    apply_file: Annotated[
        str | None,
        typer.Option(
            "--apply",
            metavar="OPS.json",
            help="validate and apply ops from this file (- for stdin); writes notes",
        ),
    ] = None,
    run: Annotated[
        str | None, typer.Option("--run", help="run id from --prepare (needed with --apply)")
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "consolidate",
        topic=topic,
        max_episodes=max_episodes,
        dry_run=dry_run,
        prepare=prepare,
        out=out,
        apply_file=apply_file,
        run=run,
    )


_review_app = _sub_app("proposals awaiting you: consolidations, edits, and rules")
_app.add_typer(_review_app, name="review")

_ReviewId = Annotated[
    str,
    typer.Argument(metavar="ID", help="proposal id: a run (run-...) or a rule proposal (r-...)"),
]


@_review_app.command("list", help="proposals awaiting review, with their kind")
def _review_list(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "review", action="list", run=None)


@_review_app.command("show", help="what a proposal would change")
def _review_show(
    ctx: typer.Context,
    run: _ReviewId,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "review", action="show", run=run)


@_review_app.command("accept", help="apply a proposal")
def _review_accept(
    ctx: typer.Context,
    run: _ReviewId,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "review", action="accept", run=run)


@_review_app.command("reject", help="discard a proposal")
def _review_reject(
    ctx: typer.Context,
    run: _ReviewId,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "review", action="reject", run=run)


_runs_app = _sub_app("list or show run records (bare: list them)")
_app.add_typer(_runs_app, name="runs")


@_runs_app.callback(invoke_without_command=True)
def _runs_root(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call | None:
    if ctx.invoked_subcommand is None:
        return _call(ctx, "runs", action="list", run=None)
    return None


@_runs_app.command("list", help="runs on this device, newest first")
def _runs_list(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "runs", action="list", run=None)


@_runs_app.command("show", help="one run's changes")
def _runs_show(
    ctx: typer.Context,
    run: Annotated[str | None, typer.Argument(help="run id to show (default: the latest)")] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "runs", action="show", run=run)


@_app.command("undo", help="undo a run")
def _undo(
    ctx: typer.Context,
    run: Annotated[
        str | None, typer.Argument(help="run id (default: the latest undoable run)")
    ] = None,
    force: Annotated[
        bool,
        typer.Option(
            "--force", help="undo even if files changed since; current versions are saved"
        ),
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "undo", run=run, force=force)


# -- lint ----------------------------------------------------------------------


@_app.command("lint", help="check the brain against the format")
def _lint(
    ctx: typer.Context,
    paths: Annotated[
        list[str] | None,
        typer.Argument(help="files or folders to check (default: the whole brain)"),
    ] = None,
    fix: Annotated[
        bool, typer.Option("--fix", help="fix what it can, as one undoable run")
    ] = False,
    dry_run: Annotated[
        bool, typer.Option("--dry-run", help="with --fix, show the diff without writing")
    ] = False,
    profile: Annotated[
        Literal["strict", "migrate"] | None,
        typer.Option(
            "--profile", help="migrate relaxes rules legacy notes break (default: brain.toml)"
        ),
    ] = None,
    staged: Annotated[
        bool, typer.Option("--staged", help="check only files staged in git")
    ] = False,
    changed: Annotated[
        bool, typer.Option("--changed", help="check only files changed since last lint")
    ] = False,
    install_hook: Annotated[
        bool, typer.Option("--install-hook", help="install a git pre-commit hook that lints")
    ] = False,
    select: Annotated[
        str | None, typer.Option("--select", help="only these codes or prefixes, e.g. BW3,BW405")
    ] = None,
    ignore: Annotated[
        str | None, typer.Option("--ignore", help="skip these codes or prefixes")
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "lint",
        paths=list(paths or []),
        fix=fix,
        dry_run=dry_run,
        profile=profile,
        staged=staged,
        changed=changed,
        install_hook=install_hook,
        select=select,
        ignore=ignore,
    )


@_app.command("report", help="regenerate reports/")
def _report(
    ctx: typer.Context, brain: _Brain = None, as_host: _As = None, json: _Json = False
) -> _Call:
    return _call(ctx, "report")


# -- harvest -------------------------------------------------------------------

_harvest_app = _sub_app(
    "turn host session transcripts into episodes "
    "(bare: list sessions, or harvest them with --apply)"
)
_app.add_typer(_harvest_app, name="harvest")


@_harvest_app.callback(invoke_without_command=True)
def _harvest_root(
    ctx: typer.Context,
    hosts: Annotated[
        list[str] | None,
        typer.Option("--from", help="harvest this host's sessions (repeatable; default: config)"),
    ] = None,
    since: Annotated[
        str | None,
        typer.Option(
            "--since", help="sessions from the last 12h, 30d, 2w (default: config or 30d)"
        ),
    ] = None,
    project: Annotated[
        str | None, typer.Option("--project", help="only sessions run in this folder or below it")
    ] = None,
    raw: Annotated[
        bool, typer.Option("--raw", help="write the turns as they are, without a model")
    ] = False,
    distill: Annotated[
        str | None,
        typer.Option(
            "--distill", metavar="PRESET", help="distill with this model preset (default: config)"
        ),
    ] = None,
    apply: Annotated[
        bool,
        typer.Option(
            "--apply", help="write episodes (without it, list sessions and token estimates)"
        ),
    ] = False,
    dry_run: Annotated[
        bool,
        typer.Option(
            "--dry-run",
            help="with --apply, list the turn ranges it would write as episodes; writes nothing",
        ),
    ] = False,
    status: Annotated[
        bool, typer.Option("--status", help="per host: on or off, sessions left")
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call | None:
    flags = {
        "hosts": hosts or None,
        "since": since,
        "project": project,
        "raw": raw,
        "distill": distill,
        "apply": apply,
        "dry_run": dry_run,
        "status": status,
    }
    if ctx.invoked_subcommand is None:
        return _call(ctx, "harvest", action=None, values=[], **flags)
    given = [name for name, value in flags.items() if value]
    if given:  # a flag the subcommand would ignore is an error, never dropped
        from brainwiki.errors import UsageError

        raise UsageError(f"put no listing flags before `brain harvest {ctx.invoked_subcommand}`")
    return None


def _configure(ctx: typer.Context, action: str, values: list[str]) -> _Call:
    return _call(ctx, "harvest", action=action, values=values)


_HarvestHosts = Annotated[
    list[str], typer.Argument(metavar="HOST...", help="host ids, e.g. claude-code codex")
]


@_harvest_app.command("enable", help="turn harvest on for these hosts")
def _harvest_enable(
    ctx: typer.Context,
    hosts: _HarvestHosts,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _configure(ctx, "enable", hosts)


@_harvest_app.command("disable", help="turn harvest off for these hosts")
def _harvest_disable(
    ctx: typer.Context,
    hosts: _HarvestHosts,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _configure(ctx, "disable", hosts)


@_harvest_app.command("route", help="send sessions run in folders matching PATTERN to BRAIN")
def _harvest_route(
    ctx: typer.Context,
    pattern: Annotated[str, typer.Argument(help='a folder pattern, e.g. "~/work/**"')],
    target: Annotated[str, typer.Argument(metavar="BRAIN", help="a registered brain")],
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _configure(ctx, "route", [pattern, target])


@_app.command("origin", help="show the conversation an episode came from")
def _origin(
    ctx: typer.Context,
    episode: Annotated[
        str, typer.Argument(help="episode id, or its path (in the brain, or absolute)")
    ],
    turns: Annotated[
        str | None,
        typer.Option(
            "--turns",
            help="turn range A-B within the session (default: the episode's turns plus context)",
        ),
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "origin", episode=episode, turns=turns)


# -- hosts, import, tools ----------------------------------------------------------


@_app.command("connect", help="wire an agent host to brain-wiki")
def _connect(
    ctx: typer.Context,
    host: Annotated[
        str,
        typer.Argument(help="claude-code, codex, antigravity, openclaw, cursor, or generic"),
    ],
    scope: Annotated[
        Literal["user", "project"],
        typer.Option(
            "--scope",
            help="install for your user, or for the current project (claude-code and cursor); "
            "each scope is connected and uninstalled on its own",
        ),
    ] = "user",
    force: Annotated[
        bool, typer.Option("--force", help="replace an edited instruction block")
    ] = False,
    dry_run: Annotated[
        bool, typer.Option("--dry-run", help="show the plan without changing anything")
    ] = False,
    uninstall: Annotated[
        bool, typer.Option("--uninstall", help="remove what connect installed")
    ] = False,
    print_only: Annotated[
        bool,
        typer.Option("--print", help="print the MCP entry and instructions to add by hand"),
    ] = False,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "connect",
        host=host,
        scope=scope,
        force=force,
        dry_run=dry_run,
        uninstall=uninstall,
        print_only=print_only,
    )


@_app.command("mcp", help="run the stdio MCP server")
def _mcp(
    ctx: typer.Context,
    host: Annotated[
        str,
        typer.Option("--host", help="host id for profiles, e.g. claude-code (default: auto)"),
    ] = "auto",
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "mcp", host=host)


@_app.command("import", help="adopt or import existing Markdown")
def _import(
    ctx: typer.Context,
    path: Annotated[
        str | None,
        typer.Argument(help="folder or file to import (with --from: memory location)"),
    ] = None,
    overlay: Annotated[
        bool,
        typer.Option("--overlay", help="adopt the folder as a brain in place, by phases"),
    ] = False,
    into: Annotated[
        str | None, typer.Option("--into", help="copy the files into this brain's topics")
    ] = None,
    to_episodes: Annotated[
        bool, typer.Option("--to-episodes", help="turn each Markdown file into an episode")
    ] = False,
    from_host: Annotated[
        str | None, typer.Option("--from", help="import this host's memory files as episodes")
    ] = None,
    agent: Annotated[
        str | None,
        typer.Option("--agent", help="with --to-episodes, record as written by this host"),
    ] = None,
    untrusted: Annotated[
        bool,
        typer.Option("--untrusted", help="with --to-episodes, mark the episodes untrusted"),
    ] = False,
    phase: Annotated[
        int | None,
        typer.Option(
            "--phase",
            help="overlay phase: 0 adopt (the default), 1 relations, 2 ids and status, 3 hubs",
        ),
    ] = None,
    apply: Annotated[
        bool, typer.Option("--apply", help="make the changes (without it, show a dry run)")
    ] = False,
    dry_run: Annotated[
        bool,
        typer.Option("--dry-run", help="show what would change (the default unless --apply)"),
    ] = False,
    topic: Annotated[
        str | None,
        typer.Option("--topic", help="put the imported files or episodes under this topic"),
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "import",
        path=path,
        overlay=overlay,
        into=into,
        to_episodes=to_episodes,
        from_host=from_host,
        agent=agent,
        untrusted=untrusted,
        phase=phase,
        apply=apply,
        dry_run=dry_run,
        topic=topic,
    )


@_app.command("viz", help="open the 3D brain map")
def _viz(
    ctx: typer.Context,
    topic: Annotated[
        list[str] | None, typer.Option("--topic", help="map only this topic (repeatable)")
    ] = None,
    port: Annotated[
        int, typer.Option("--port", help="port to serve on (default: any free port)")
    ] = 0,
    no_open: Annotated[
        bool, typer.Option("--no-open", help="print the URL; do not open a browser")
    ] = False,
    export: Annotated[
        str | None,
        typer.Option("--export", help="write the map to FILE (.html, .json, .graphml) and exit"),
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(ctx, "viz", topic=topic or None, port=port, no_open=no_open, export=export)


@_app.command("bench", help="run the evaluation bench")
def _bench(
    ctx: typer.Context,
    suites: Annotated[
        list[str] | None,
        typer.Argument(
            help="retrieval, lint, perf, consolidation, agent (default: retrieval lint perf)"
        ),
    ] = None,
    quiet: Annotated[
        bool,
        typer.Option(
            "-q",
            "--quiet",
            help="print only a summary, the failures, and the regressions instead of every metric",
        ),
    ] = False,
    backends: Annotated[
        str,
        typer.Option("--backends", help="comma list of model presets for consolidation and agent"),
    ] = "",
    sizes: Annotated[
        str, typer.Option("--sizes", help="comma list of brain sizes in notes, e.g. 1k,10k")
    ] = "1k",
    out: Annotated[
        str | None, typer.Option("--out", help="folder for results (default: a new temp folder)")
    ] = None,
    compare: Annotated[
        tuple[str, str] | None,
        typer.Option(
            "--compare", metavar="A B", help="compare two results files; fail on regressions"
        ),
    ] = None,
    brain: _Brain = None,
    as_host: _As = None,
    json: _Json = False,
) -> _Call:
    return _call(
        ctx,
        "bench",
        suites=list(suites or []),
        quiet=quiet,
        backends=backends,
        sizes=sizes,
        out=out,
        compare=compare,
    )


# -- running -------------------------------------------------------------------


def _parse(argv: list[str] | None) -> _Call | int:
    """Parse the command line: a `_Call` to run, or the exit code of what Typer did itself
    (help, --version, a usage error)."""
    from typer.main import get_command

    from brainwiki.errors import BrainError

    command = get_command(_app)
    _plain_help(command)
    try:
        result = command.main(
            args=sys.argv[1:] if argv is None else list(argv),
            prog_name="brain",
            standalone_mode=False,
        )
    except BrainError as exc:  # raised by a callback that checks its options
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return exc.exit_code
    except Exception as exc:  # Click's errors carry exit_code and format_message;
        # Typer vendors Click and exports no class to catch them by
        if not hasattr(exc, "format_message") or not hasattr(exc, "exit_code"):
            raise
        return _usage(exc)
    return result if isinstance(result, _Call) else int(result or 0)


def _plain_help(command: Any) -> None:
    """Help in argparse's style, which agents read well: commands in `_HANDLERS` order, each
    with its whole help line (Click cuts it at the first period, as in "e.g."), and values
    named in capitals (`--since SINCE`) rather than by type (`<str>`)."""
    for param in command.params:
        flag, choice = getattr(param, "is_flag", False), hasattr(param.type, "choices")
        if param.metavar is None and not flag and not choice:
            param.metavar = (param.name or "").upper() + ("..." if param.nargs == -1 else "")
    subcommands = getattr(command, "commands", None)
    if subcommands:
        rank = {name: i for i, name in enumerate(_HANDLERS)}
        command.commands = dict(
            sorted(subcommands.items(), key=lambda item: rank.get(item[0], len(rank)))
        )
        for sub in subcommands.values():
            sub.short_help = sub.short_help or sub.help
            _plain_help(sub)


def _usage(exc: Any) -> int:
    """A command line Typer could not parse: usage and the error on stderr, exit 2."""
    ctx = getattr(exc, "ctx", None)
    if ctx is not None:
        usage = ctx.get_usage()
        print(
            "usage:" + usage[len("Usage:") :] if usage.startswith("Usage:") else usage,
            file=sys.stderr,
        )
    where = ctx.command_path if ctx is not None else "brain"
    print(f"{where}: error: {exc.format_message()}", file=sys.stderr)
    return int(exc.exit_code)


def main(argv: list[str] | None = None) -> int:
    parsed = _parse(argv)
    if isinstance(parsed, int):
        return parsed
    module_name, func_name = _HANDLERS[parsed.command].split(":")
    from brainwiki.errors import BrainError

    try:
        handler = getattr(importlib.import_module(module_name), func_name)
        code = int(handler(parsed.args) or 0)
        sys.stdout.flush()  # inside the try, so a closed pipe is handled below
        return code
    except BrainError as exc:
        print(f"{exc.code}: {exc.message}", file=sys.stderr)
        return exc.exit_code
    except BrokenPipeError:  # `brain topics | head`: the reader left; say nothing
        os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())
        return 141
    except OSError as exc:  # a path the user gave that cannot be read or written
        where = f": {exc.filename}" if exc.filename else ""
        print(f"os_error: {exc.strerror or exc}{where}", file=sys.stderr)
        return 1
    except (KeyboardInterrupt, EOFError):  # Ctrl-C, or Ctrl-D at a prompt
        print(file=sys.stderr)
        return 130
    except Exception:  # a bug: keep the trace in the log, not on the user's screen (07 §2.3)
        return _internal_error(parsed.command)


def _internal_error(command: str) -> int:
    try:
        from brainwiki.logs import log_path, setup_logging

        setup_logging().exception("brain %s failed", command)
        where = f"details are in {log_path()}"
    except Exception:  # the log itself is unwritable: fall back to the trace on stderr
        import traceback

        traceback.print_exc()
        where = "the trace is above"
    print(f"internal: unexpected error; {where}", file=sys.stderr)
    return 10


if __name__ == "__main__":
    sys.exit(main())
