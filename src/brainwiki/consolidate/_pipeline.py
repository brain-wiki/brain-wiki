"""Consolidation end to end: prepare a packet, validate proposed ops, stage, gate, and commit.

Every stage is deterministic except the model's proposal. A failure before commit leaves the
brain untouched; a run routed to review writes only a proposal file.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from importlib import resources
from typing import TYPE_CHECKING, Any

from brainwiki.config import Profile
from brainwiki.consolidate._apply import stage
from brainwiki.consolidate._packet import (
    Packet,
    build_packet,
    drop_packet,
    load_packet,
    save_packet,
)
from brainwiki.consolidate._review import load_proposal, proposal_path, write_proposal
from brainwiki.consolidate._validate import validate
from brainwiki.errors import Conflict, Forbidden, InvalidOps
from brainwiki.ids import run_id
from brainwiki.runs import Run, RunRecord

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def instructions() -> str:
    return (resources.files("brainwiki") / "assets" / "prompts" / "consolidate.md").read_text(
        encoding="utf-8"
    )


@dataclass
class ApplyResult:
    run: str
    status: str  # applied | review | dry_run | invalid | stale
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    review: list[str] = field(default_factory=list)
    pending: list[str] = field(default_factory=list)
    summary: dict[str, Any] = field(default_factory=dict)
    proposal: str | None = None
    diff: str = ""
    git_commit: str | None = None

    def to_json(self) -> dict[str, Any]:
        return {k: v for k, v in self.__dict__.items() if v not in (None, "", [], {})} | {
            "run": self.run,
            "status": self.status,
        }

    def format_text(self) -> str:
        lines = [f"{self.run}: {self.status}"]
        if self.errors:
            lines += ["Errors (fix the ops and resubmit):", *[f"  - {e}" for e in self.errors]]
        if self.review:
            lines += ["Routed to review because:", *[f"  - {r}" for r in self.review]]
        if self.proposal:
            lines.append(f"Proposal: {self.proposal} (brain review accept {self.run})")
        if self.summary:
            s = self.summary
            lines.append(
                f"Archived {s.get('episodes_archived', 0)} episodes; "
                f"{len(s.get('notes_created', []))} new notes; {len(s.get('notes_changed', {}))} notes changed."
            )
        if self.pending:
            lines.append(f"Left pending (not cited or skipped): {', '.join(self.pending)}")
        lines += [f"Warning: {w}" for w in self.warnings]
        if self.diff:
            lines += ["", self.diff]
        return "\n".join(lines)


def _require(profile: Profile) -> None:
    if not profile.can("consolidate"):
        raise Forbidden(
            f'profile {profile.name!r} may not consolidate; add "consolidate" to its write list in brain.toml'
        )


def prepare(
    engine: Engine,
    profile: Profile,
    *,
    backend: str = "agent",
    topic: str | None = None,
    max_episodes: int | None = None,
) -> Packet | None:
    _require(profile)
    packet = build_packet(
        engine, profile, run=run_id(), backend=backend, topic=topic, max_episodes=max_episodes
    )
    if packet is not None:
        save_packet(engine, packet)
    return packet


def _reports(engine: Engine) -> None:
    if engine.manifest.reports.after_consolidate:
        from brainwiki.lint import generate

        generate(engine)


def apply(
    engine: Engine,
    packet: Packet,
    payload: Any,
    profile: Profile,
    *,
    dry_run: bool = False,
    agent: str | None = None,
    backend: str | None = None,
    model: str | None = None,
    strict_hashes: bool = True,
    accepting: bool = False,
) -> ApplyResult:
    from brainwiki.lint import run_gate

    _require(profile)
    result = ApplyResult(packet.run, "invalid")
    validation = validate(engine, packet, payload)
    result.errors, result.warnings = list(validation.errors), list(validation.warnings)
    if not validation.ok:
        return result
    ops = payload["ops"]
    result.pending = [packet.episodes[h].path for h in validation.pending]
    try:
        staged = stage(
            engine,
            packet,
            ops,
            validation,
            strict_hashes=strict_hashes,
            agent=agent,
            backend=backend,
            model=model,
        )
    except Conflict as exc:
        result.status, result.errors = "stale", [exc.message]
        return result
    except InvalidOps as exc:
        result.errors = [exc.message]
        return result
    gate = run_gate(engine)
    problems = gate(staged.run)
    if problems:
        result.errors = [f"lint: {p}" for p in problems]
        return result
    result.summary = staged.summary()
    if dry_run:
        result.status, result.diff = "dry_run", staged.run.diff()
        return result
    if validation.review and not accepting:
        result.status, result.review = "review", validation.review
        result.proposal = write_proposal(engine, packet, ops, validation, staged, agent)
        return result
    if accepting:
        staged.run.delete(proposal_path(engine, packet.run))
    notes = len(result.summary["notes_changed"]) + len(result.summary["notes_created"])
    subject = f"brain: consolidate {len(staged.archived)} episodes into {notes} notes"
    try:
        record = staged.run.commit(
            check=gate, log_lines=staged.log_lines(len(validation.pending)), subject=subject
        )
    except Conflict as exc:
        result.status, result.errors = "stale", [exc.message]
        return result
    except InvalidOps as exc:
        result.errors = [exc.message]
        return result
    result.status, result.git_commit = "applied", record.git_commit
    drop_packet(engine, packet.run)
    _reports(engine)
    return result


def apply_run(
    engine: Engine,
    run: str,
    payload: Any,
    profile: Profile,
    *,
    dry_run: bool = False,
    agent: str | None = None,
    backend: str = "agent",
) -> ApplyResult:
    packet = load_packet(engine, run)
    return apply(engine, packet, payload, profile, dry_run=dry_run, agent=agent, backend=backend)


# -- review ---------------------------------------------------------------
def accept_review(engine: Engine, run: str, profile: Profile) -> ApplyResult:
    packet, ops, agent, _ = load_proposal(engine, run)
    return apply(
        engine,
        packet,
        {"ops": ops},
        profile,
        agent=agent,
        backend="review",
        strict_hashes=False,
        accepting=True,
    )


def reject_review(engine: Engine, run: str) -> RunRecord:
    load_proposal(engine, run)
    record_run = Run(engine, "review-reject", summary=f"rejected proposal {run}")
    record_run.delete(proposal_path(engine, run))
    drop_packet(engine, run)
    return record_run.commit(log_lines=[f"- rejected {run}; its episodes stay pending"])
