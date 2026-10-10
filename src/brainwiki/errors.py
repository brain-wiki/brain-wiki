"""Errors with stable codes shared by the CLI (exit codes) and the MCP server (tool errors)."""

from __future__ import annotations


class BrainError(Exception):
    code = "internal"
    exit_code = 10

    def __init__(self, message: str, *, details: object | None = None):
        super().__init__(message)
        self.message = message
        self.details = details

    def __str__(self) -> str:
        return f"{self.code}: {self.message}"


class UsageError(BrainError):
    code = "usage"
    exit_code = 2


class NotFound(BrainError):
    code = "not_found"
    exit_code = 3


class NotConfigured(BrainError):
    code = "not_configured"
    exit_code = 3


class Ambiguous(BrainError):
    code = "ambiguous"
    exit_code = 1


class Forbidden(BrainError):
    code = "forbidden"
    exit_code = 5


class Conflict(BrainError):
    code = "stale"
    exit_code = 4


class Busy(BrainError):
    code = "busy"
    exit_code = 4


class Expired(BrainError):
    code = "expired"
    exit_code = 4


class InvalidOps(BrainError):
    code = "invalid_ops"
    exit_code = 1


class BudgetExceeded(BrainError):
    code = "budget_exceeded"
    exit_code = 1


class NotAvailable(BrainError):
    code = "not_available"
    exit_code = 3


class UnsupportedHost(BrainError):
    code = "unsupported_host"
    exit_code = 1


class FormatError(BrainError):
    code = "format"
    exit_code = 1
