"""Rules: the strictest write path (design doc 05 §6). Consolidation never calls this module."""

from __future__ import annotations

from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from brainwiki.errors import BudgetExceeded, NotFound, UsageError
from brainwiki.format.episode import now_iso
from brainwiki.format.frontmatter import format_value, split
from brainwiki.format.meta import split_meta
from brainwiki.format.rules import RULES_HEADER, format_rule, parse_rules
from brainwiki.ids import is_prefixed, rule_id
from brainwiki.runs import Run, RunRecord

if TYPE_CHECKING:
    from brainwiki.engine import Engine

RULES = "rules.md"
MAX_RULE_CHARS = 300
MAX_QUOTE_CHARS = 500


def list_rules(engine: Engine) -> list[dict[str, Any]]:
    try:
        text = engine.store.read_text(RULES)
    except OSError:
        return []
    rules, _ = parse_rules(text)
    return [
        {
            "id": r.id,
            "text": r.text,
            "quote": r.meta.get("quote"),
            "at": r.meta.get("at"),
            "origin": r.meta.get("origin"),
            "via": r.meta.get("via"),
            "line": r.line,
        }
        for r in rules
    ]


def _validate(text: str, quote: str) -> tuple[str, str]:
    text, quote = " ".join(text.split()), " ".join(quote.split())
    if not text or len(text) > MAX_RULE_CHARS:
        raise UsageError(f"a rule must be 1 to {MAX_RULE_CHARS} characters")
    if not quote or len(quote) > MAX_QUOTE_CHARS:
        raise UsageError(f"the quote must be 1 to {MAX_QUOTE_CHARS} characters")
    return text, quote


def _stage_rule(run: Run, text: str, quote: str, replaces: str | None, via: str | None) -> str:
    engine = run.engine
    current = run.read(RULES) or RULES_HEADER
    new_id = rule_id()
    meta = {
        "id": new_id,
        "quote": quote,
        "at": datetime.now(UTC).strftime("%Y-%m-%d"),
        "origin": "owner",
    }
    if via:
        meta["via"] = via
    lines = current.split("\n")
    if replaces:
        index = next(
            (
                i
                for i, line in enumerate(lines)
                if f"id:{replaces}" in line and line.lstrip().startswith("-")
            ),
            None,
        )
        if index is None:
            raise NotFound(f"no rule {replaces} in rules.md")
        old_line = lines.pop(index)
        body, old_meta = split_meta(old_line.lstrip()[1:].strip())
        old_meta = dict(old_meta or {})
        old_meta.update(status="superseded", by=new_id)
        archive = f"{engine.manifest.layout.archive_dir}/rules.md"
        archived = run.read(archive) or "# Archived rules\n"
        run.write(archive, archived.rstrip("\n") + "\n" + format_rule(body, old_meta) + "\n")
    while lines and lines[-1] == "":
        lines.pop()
    lines.append(format_rule(text, meta))
    updated = "\n".join(lines) + "\n"
    budgets = engine.manifest.budgets
    if (
        len(updated.splitlines()) > budgets.rules_max_lines
        or len(updated) > budgets.rules_max_chars
    ):
        longest = sorted(parse_rules(updated)[0], key=lambda r: len(r.text), reverse=True)[:3]
        raise BudgetExceeded(
            f"rules.md would exceed its budget ({budgets.rules_max_lines} lines, "
            f"{budgets.rules_max_chars} characters); longest rules: "
            + "; ".join(f"{r.id}: {r.text[:60]}" for r in longest)
        )
    rules, malformed = parse_rules(updated)
    if malformed or not any(r.id == new_id for r in rules):
        raise UsageError("the rule could not be written in a parseable form")
    run.write(RULES, updated)
    return new_id


def add_rule(
    engine: Engine,
    text: str,
    *,
    quote: str | None = None,
    replaces: str | None = None,
    via: str | None = None,
    agent: str | None = None,
) -> tuple[str, RunRecord]:
    """Add (or replace) a rule as the user. Callers are responsible for user confirmation."""
    text, quote = _validate(text, quote or text)
    if replaces and not is_prefixed(replaces, "r-"):
        raise UsageError("replaces must be a rule id (r-…)")
    run = Run(engine, "rule", agent=agent, summary=f"rule: {text[:60]}")
    new_id = _stage_rule(run, text, quote, replaces, via)
    log = [f"- added {new_id}: {text}"] + ([f"- replaced {replaces}"] if replaces else [])
    return new_id, run.commit(log_lines=log)


# -- proposals: rules awaiting the user's confirmation --------------------
def _proposal_path(engine: Engine, proposal_id: str) -> str:
    return f"{engine.manifest.layout.proposals_dir}/rule-{proposal_id}.md"


def propose_rule(
    engine: Engine, text: str, quote: str, *, replaces: str | None = None, agent: str | None = None
) -> tuple[str, str]:
    """Write a rule proposal for `brain rule accept`. Returns (proposal id, path)."""
    text, quote = _validate(text, quote)
    proposal_id = rule_id()
    rel = _proposal_path(engine, proposal_id)
    fields = {
        "id": proposal_id,
        "type": "rule-proposal",
        "agent": agent,
        "created": now_iso(),
        "replaces": replaces,
        "quote": quote,
    }
    head = ["---"] + [f"{k}: {format_value(v)}" for k, v in fields.items() if v] + ["---"]
    body = [
        f"# Proposed rule: {text}",
        "",
        f"> {quote}",
        "",
        f"Accept with `brain rule accept {proposal_id}`, or reject with `brain rule reject {proposal_id}`.",
        "",
    ]
    engine.store.write_text(rel, "\n".join(head + body))
    return proposal_id, rel


def pending_rule_proposals(engine: Engine) -> list[dict[str, Any]]:
    directory = engine.store.abspath(engine.manifest.layout.proposals_dir)
    out = []
    for path in sorted(directory.glob("rule-*.md")) if directory.is_dir() else []:
        fm = split(path.read_text(encoding="utf-8"))
        title = next((ln for ln in fm.body.splitlines() if ln.startswith("# Proposed rule: ")), "")
        out.append(
            {
                "id": fm.data.get("id") or path.stem[len("rule-") :],
                "text": title[len("# Proposed rule: ") :],
                "quote": fm.data.get("quote"),
                "agent": fm.data.get("agent"),
                "replaces": fm.data.get("replaces"),
            }
        )
    return out


def _proposal(engine: Engine, proposal_id: str) -> dict[str, Any]:
    for proposal in pending_rule_proposals(engine):
        if proposal["id"] == proposal_id:
            return proposal
    raise NotFound(f"no rule proposal {proposal_id}")


def accept_rule(engine: Engine, proposal_id: str) -> tuple[str, RunRecord]:
    proposal = _proposal(engine, proposal_id)
    text, quote = _validate(proposal["text"], str(proposal["quote"] or proposal["text"]))
    run = Run(engine, "rule", summary=f"rule: {text[:60]}")
    new_id = _stage_rule(run, text, quote, proposal.get("replaces"), "proposal")
    run.delete(_proposal_path(engine, proposal_id))
    log = [
        f"- accepted proposal {proposal_id} from {proposal.get('agent') or 'an agent'} as {new_id}: {text}"
    ]
    return new_id, run.commit(log_lines=log)


def reject_rule(engine: Engine, proposal_id: str) -> RunRecord:
    _proposal(engine, proposal_id)
    run = Run(engine, "rule-reject", summary=f"rejected rule proposal {proposal_id}")
    run.delete(_proposal_path(engine, proposal_id))
    return run.commit()
