---
id: GUIDE-002
title: AI Prompting Standards
created: 2026-07-11
updated: 2026-07-11
status: active
scope: second-brain
type: GUIDE
---

# AI Prompting Standards

## Purpose

This guide defines how to give AI agents enough project context to make safe,
reviewable changes to `second-brain`. Prompts should state the outcome, scope,
constraints, sources of truth, and verification required.

## Prompt Contract

A strong task contains six parts:

1. **Outcome:** What observable result should exist?
2. **Scope:** Which files or systems may change?
3. **Context:** Which project documents and behavior matter?
4. **Constraints:** What must be preserved or avoided?
5. **Verification:** Which checks prove completion?
6. **Handoff:** What should the agent report?

## Project Sources of Truth

| Concern | Read first |
| --- | --- |
| Knowledge ingest, query, or lint | `AGENTS.md`, then `wiki/index.md` |
| Raw source processing | `AGENTS.md` and the complete source under `raw/` |
| Python behavior and entry points | `pyproject.toml`, `src/second_brain/`, and `tests/` |
| Installation, execution, and logging | Root `README.md` |
| Public API | `docs/REF-001-api-reference.md` and Python docstrings |
| Documentation changes | `docs/GUIDE-004-docs-standards.md` and `mkdocs.yml` |
| Code review | `docs/GUIDE-003-code-review.md` |
| Significant expert review | `docs/SPEC-001-expert-panel.md` |

If sources disagree, require the agent to identify the conflict and verify
behavior before editing.

## Prompt Template

```text
TASK
[Describe the observable outcome.]

SCOPE
- May change: [files or directories]
- Must not change: [files, behavior, or external state]

CONTEXT
- Read [specific project files] before editing.
- Preserve [relevant project contract].

ACCEPTANCE CRITERIA
- [Concrete behavior or artifact]
- [Required tests or documentation]

VERIFICATION
- uv run pytest --cov
- uv run ruff check .
- uv run ruff format --check .
- uv run mkdocs build --strict

HANDOFF
Summarize changed files, verification, assumptions, and remaining risks.
```

Include only commands relevant to the task, but require the full suite for
cross-cutting changes.

## Project Guardrails

### Raw sources are immutable

An ingest task may read `raw/` and update `wiki/`, but it must not rewrite or
delete source material. Require updates to `wiki/index.md` and `wiki/log.md`.

### Repository evidence beats memory

Require agents to inspect current files before making claims about commands,
dependencies, APIs, or configuration. External research should use primary or
official sources.

### Keep external actions explicit

Creating issues, pull requests, releases, messages, or deployments changes
external state. State those actions directly. Authentication does not imply
authorization, and a successful host-terminal login does not prove an agent
sandbox can access the same credentials.

When an agent cannot perform an external action, prefer a safe handoff: save the
prepared artifact and provide one exact user-run command.

### Protect secrets and local state

- Never ask an agent to print tokens or `.env` contents.
- Use `.env.example` for documented names and safe defaults.
- Do not commit `.env`, `.env.test`, logs, caches, `.venv`, `site/`, or local
  agent memory.
- State whether generated temporary files should be retained or removed.

### Preserve project tooling

- Use uv for environments and commands.
- Keep `uv.lock` consistent with dependency changes.
- Use Ruff for linting and formatting.
- Use pytest and the configured 80% coverage floor.
- Use `mkdocs build --strict` for documentation verification.

### Require evidence, not simulated authority

The expert panel provides lenses, not quotations or endorsements. Require
files, test results, official documentation, or observed behavior for blocking
concerns.

## Task Examples

### Python change

```text
Add the requested behavior under src/second_brain/ using tests-first
development. Read pyproject.toml, the affected module, and existing tests
first. Preserve the
CLI entry point, logging configuration, and supported Python version. Update
user
and API documentation if behavior changes. Verify pytest with coverage, Ruff,
and strict MkDocs.
```

### Source ingest

```text
Read AGENTS.md and the entire new file under raw/ before editing. Do not modify
the source. Synthesize durable knowledge into focused wiki pages, link related
pages, update wiki/index.md, and append a dated operation to wiki/log.md.
```

### Review

```text
Review the branch against docs/GUIDE-003-code-review.md. Use
docs/SPEC-001-expert-panel.md to choose only relevant lenses. Inspect the diff
and run applicable verification. Report findings by severity with file and line
evidence. Do not implement fixes unless requested.
```

## Evaluation Checklist

- [ ] The result satisfies the stated outcome.
- [ ] Claims use repository evidence or official sources.
- [ ] Changes stay in scope and preserve unrelated user work.
- [ ] Raw sources, secrets, and ignored local state remain untouched.
- [ ] Tests validate behavior and relevant failure paths.
- [ ] Documentation and README reflect user-facing changes.
- [ ] Verification ran, or failures are reported precisely.
- [ ] External actions were authorized and verified.

## Reject Output That

- invents conventions without inspecting the repository;
- silently broadens scope or rewrites unrelated files;
- modifies `raw/` during ingest;
- exposes secrets or commits local environment state;
- claims success without available verification;
- repeatedly retries a blocked external action instead of preparing a handoff;
- treats an expert's name as evidence;
- copies documentation from an unrelated project.

## See Also

- [Documentation standards](GUIDE-004-docs-standards.md)
- [Code review](GUIDE-003-code-review.md)
- [Expert panel](SPEC-001-expert-panel.md)
- Root `README.md` - canonical user guide

## Update Policy

Update this guide when agent entry points, repository permissions, verification
commands, or the knowledge workflow changes.
