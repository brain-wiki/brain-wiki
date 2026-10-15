"""Agent profiles: grant or revoke capabilities in brain.toml as one undoable run (07 §1)."""

from __future__ import annotations

from brainwiki.config import MANIFEST, grant, parse_manifest, revoke
from brainwiki.engine import Engine
from brainwiki.format import replace_block
from brainwiki.runs import Run


def profile_run(
    engine: Engine,
    grants: dict[str, list[str]] | None = None,
    revokes: dict[str, list[str]] | None = None,
) -> Run:
    """Stage brain.toml with these capabilities granted or revoked per host; the caller shows
    `run.diff()` and commits. The run has no entries when nothing would change."""
    grants, revokes = grants or {}, revokes or {}
    parts = [f"grant {h} {' '.join(c)}" for h, c in grants.items()]
    parts += [f"revoke {h} {' '.join(c)}" for h, c in revokes.items()]
    run = Run(engine, "config", summary="agents: " + "; ".join(parts))
    before = run.read(MANIFEST) or ""
    text = before
    for host, caps in grants.items():
        text = grant(text, host, caps)
    for host, caps in revokes.items():
        text = revoke(text, host, caps)
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
