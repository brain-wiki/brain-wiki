"""The ops schema (design doc 05 §5), validated per op so errors name the op and the field."""

from __future__ import annotations

from typing import Any

from jsonschema import Draft202012Validator

_OP_NAMES = (
    "add_claim",
    "merge_claim",
    "supersede_claim",
    "retract_claim",
    "add_relation",
    "create_note",
    "create_topic",
    "skip_episode",
)
MAX_OPS = 200
CLAIM_MAX_CHARS = 500

_SRC = {"type": "string", "pattern": "^E[0-9]+#L[0-9]+(-L[0-9]+)?$"}
_SRCS = {"type": "array", "minItems": 1, "maxItems": 20, "items": _SRC}
_NOTE_REF = {"type": "string", "pattern": "^(N[0-9]+|new:[a-z0-9-]+/[a-z0-9-]+)$"}
_CLAIM_REF = {"type": "string", "pattern": "^C[0-9]+$"}
_TEXT = {"type": "string", "minLength": 1, "maxLength": CLAIM_MAX_CHARS}
_REASON = {"type": "string", "maxLength": 300}


def _op(name: str, required: list[str], properties: dict[str, Any]) -> dict[str, Any]:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["op", *required],
        "properties": {"op": {"const": name}, **properties},
    }


_OP_SCHEMAS: dict[str, dict[str, Any]] = {
    "add_claim": _op(
        "add_claim",
        ["note", "text", "sources"],
        {"note": _NOTE_REF, "text": _TEXT, "sources": _SRCS},
    ),
    "merge_claim": _op(
        "merge_claim", ["claim", "sources"], {"claim": _CLAIM_REF, "sources": _SRCS}
    ),
    "supersede_claim": _op(
        "supersede_claim",
        ["claim", "text", "sources", "reason"],
        {"claim": _CLAIM_REF, "text": _TEXT, "sources": _SRCS, "reason": _REASON},
    ),
    "retract_claim": _op(
        "retract_claim",
        ["claim", "sources", "reason"],
        {"claim": _CLAIM_REF, "sources": _SRCS, "reason": _REASON},
    ),
    "add_relation": _op(
        "add_relation",
        ["from", "verb", "to"],
        {
            "from": _NOTE_REF,
            "verb": {"type": "string", "pattern": "^[a-z_]+$"},
            "to": _NOTE_REF,
            "qualifier": {"type": "string", "maxLength": 60},
            "attrs": {
                "type": "object",
                "maxProperties": 5,
                "additionalProperties": {"type": ["string", "number"]},
            },
            "comment": {"type": "string", "maxLength": 200},
            "sources": _SRCS,
        },
    ),
    "create_note": _op(
        "create_note",
        ["ref", "title", "claims"],
        {
            "ref": {"type": "string", "pattern": "^new:[a-z0-9-]+/[a-z0-9-]+$"},
            "title": {"type": "string", "minLength": 1, "maxLength": 200},
            "type": {"type": "string", "pattern": "^[a-z][a-z0-9_-]{0,31}$"},
            "summary": {"type": "string", "maxLength": 1500},
            "claims": {
                "type": "array",
                "maxItems": 30,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["text", "sources"],
                    "properties": {"text": _TEXT, "sources": _SRCS},
                },
            },
        },
    ),
    "create_topic": _op(
        "create_topic",
        ["slug", "title"],
        {
            "slug": {"type": "string", "pattern": "^[a-z0-9][a-z0-9-]{0,63}$"},
            "title": {"type": "string", "minLength": 1, "maxLength": 100},
            "description": {"type": "string", "maxLength": 300},
            "parent": {"type": "string", "pattern": "^[a-z0-9][a-z0-9-]{0,63}$"},
        },
    ),
    "skip_episode": _op(
        "skip_episode",
        ["episode", "reason"],
        {
            "episode": {"type": "string", "pattern": "^E[0-9]+$"},
            "reason": {"type": "string", "maxLength": 200},
        },
    ),
}


# A loose shape for CLIs that constrain output: enough to force JSON with an ops array, without
# the oneOf that some structured-output implementations reject. The validator does the rest.
LOOSE_SCHEMA: dict[str, Any] = {
    "type": "object",
    "required": ["ops"],
    "properties": {
        "ops": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["op"],
                "properties": {"op": {"type": "string", "enum": list(_OP_NAMES)}},
            },
        }
    },
}

_VALIDATORS = {name: Draft202012Validator(schema) for name, schema in _OP_SCHEMAS.items()}


def schema_errors(data: Any) -> list[str]:
    """V1: shape errors, each naming the op index and field so a model can correct them."""
    if not isinstance(data, dict) or not isinstance(data.get("ops"), list):
        return ['the response must be a JSON object {"ops": [...]}']
    extra = sorted(set(data) - {"ops"})
    errors = [f"unexpected top-level key {key!r}" for key in extra]
    ops = data["ops"]
    if len(ops) > MAX_OPS:
        errors.append(f"too many ops ({len(ops)} > {MAX_OPS})")
    for index, op in enumerate(ops):
        name = op.get("op") if isinstance(op, dict) else None
        if name not in _VALIDATORS:
            errors.append(f"ops[{index}]: unknown op {name!r}; use one of {', '.join(_OP_NAMES)}")
            continue
        for error in sorted(_VALIDATORS[name].iter_errors(op), key=lambda e: list(e.path)):
            where = ".".join(str(p) for p in error.path)
            errors.append(f"ops[{index}] ({name}){' ' + where if where else ''}: {error.message}")
    return errors
