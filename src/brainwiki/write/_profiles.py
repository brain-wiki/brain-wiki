"""Agent profiles: grant or revoke capabilities in brain.toml as one undoable run (docs/design/cli-and-mcp.md §1), and the
checks write paths use to refuse what the caller's profile does not allow."""

from __future__ import annotations

from brainwiki.config import MANIFEST, SLUG_RE, grant, parse_manifest, revoke
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden, UsageError
from brainwiki.format import replace_block
from brainwiki.runs import Run

_READ_ORIGIN = "read_origin"  # a flag, not a write capability, but granted the same way


def require(engine: Engine, capability: str, doing: str) -> None:
    """Refuse unless the caller's profile has `capability` (the owner has every one)."""
    if not engine.profile.can(capability):
        raise Forbidden(engine.profile.refusal(engine.host, capability, doing))


def require_owner(engine: Engine, doing: str) -> None:
    """Refuse an agent: some decisions are the user's alone, whatever its profile allows."""
    if engine.profile.name != "owner":
        raise Forbidden(f"only the user can {doing}, not an agent (acting as {engine.host!r})")


def profile_run(
    engine: Engine,
    grants: dict[str, list[str]] | None = None,
    revokes: dict[str, list[str]] | None = None,
) -> Run:
    """Stage brain.toml with these capabilities granted or revoked per host; the caller shows
    `run.diff()` and commits. The run has no entries when nothing would change."""
    require_owner(engine, "change what agents may do")
    grants, revokes = grants or {}, revokes or {}
    parts = [f"grant {h} {' '.join(c)}" for h, c in grants.items()]
    parts += [f"revoke {h} {' '.join(c)}" for h, c in revokes.items()]
    run = Run(engine, "config", summary="agents: " + "; ".join(parts))
    before = run.read(MANIFEST) or ""
    text = before
    for changes, value in ((grants, True), (revokes, False)):
        for host, caps in changes.items():
            write = [c for c in caps if c != _READ_ORIGIN]
            if write:
                text = (grant if value else revoke)(text, host, write)
            if _READ_ORIGIN in caps:
                text = _set_read_origin(text, host, value)
    if text == before:
        return run
    run.write(MANIFEST, text)
    edit = parse_manifest(text).profile("default").can("edit")
    if edit != parse_manifest(before).profile("default").can("edit"):
        # AGENTS.md tells file-reading agents whether they may edit notes.
        from brainwiki.index import agents_block

        agents = run.read("AGENTS.md") or ""
        run.write("AGENTS.md", replace_block(agents, agents_block(engine, edit=edit)))
    return run


def _set_read_origin(text: str, host: str, value: bool) -> str:
    """`brain.toml` text with `[agents.<host>] read_origin` set; a new table keeps the write
    capabilities the host has now, so only the flag changes."""
    import tomlkit

    if not SLUG_RE.match(host):
        raise UsageError(f"{host!r} is not a host id (e.g. claude-code, codex, default)")
    profile = parse_manifest(text).profile(host)
    if profile.read_origin == value:
        return text
    doc = tomlkit.parse(text)
    agents = doc.get("agents")
    if agents is None:
        agents = tomlkit.table(is_super_table=True)
        doc["agents"] = agents
    if host not in agents:
        agents[host] = tomlkit.table()
        agents[host]["write"] = profile.write
    agents[host][_READ_ORIGIN] = value
    return tomlkit.dumps(doc)
