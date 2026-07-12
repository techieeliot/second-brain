# Project Agent Instructions

This file is the canonical entry point for AI agents working in `second-brain`.

## Project Standards

- Documentation: `docs/GUIDE-004-docs-standards.md`
- AI prompting and agent safety: `docs/GUIDE-002-ai-prompting.md`
- Code review: `docs/GUIDE-003-code-review.md`
- Expert routing: `docs/SPEC-001-expert-panel.md`
- Generated API reference: `docs/REF-001-api-reference.md`
- User and contributor workflow: `README.md`

Use `.agent/skills/expert-panel-reviewer/SKILL.md` for significant
architecture, Python, uv, MkDocs, packaging, agent-workflow, or cross-domain
reviews.

## Repository Structure

- `src/second_brain/` contains runtime Python code.
- `tests/` contains pytest tests.
- `docs/` contains published documentation and standards.
- `raw/` contains immutable source material during ingest.
- `wiki/` contains synthesized, interlinked knowledge.
- `README.md` is the canonical user and contributor guide.
- `pyproject.toml` and `uv.lock` define the project and resolved environment.

## Knowledge Workflow

### Ingest

1. Read each new `raw/` source completely.
2. Discuss substantive claims, assumptions, and open questions with the user.
3. Create or update focused wiki pages.
4. Link affected pages to related concepts and sources.
5. Update `wiki/index.md` for every new or changed page.
6. Append a dated entry to `wiki/log.md`.

Never rewrite or delete raw sources as part of ingest.

### Query

Read `wiki/index.md` first, then follow relevant links. Cite wiki pages and raw
sources where applicable. Store durable analyses and conclusions in `wiki/`
instead of leaving them only in chat history.

### Lint

Check for stale or contradictory claims, orphan pages, missing citations,
missing concepts, and unresolved sourcing questions. Record completed health
checks in `wiki/log.md`.

### Wiki Conventions

- Use descriptive lowercase filenames joined by hyphens.
- Prefer one topic, entity, source, or analysis per page.
- Use relative links between related pages.
- Put source links near supported claims.
- Keep `wiki/index.md` content-oriented and `wiki/log.md` chronological.
- Start log entries with `## [YYYY-MM-DD] <operation> | <subject>`.

## Change Discipline

- Inspect relevant files before editing.
- Preserve unrelated user changes and untracked files.
- Keep changes focused on the requested outcome.
- Add or update tests for changed behavior.
- Update README, docs, and API docstrings when connected behavior changes.
- Do not expose secrets or commit local environments, logs, caches, generated
  sites, or local agent memory.
- Do not perform external writes unless the user explicitly authorizes them.

## Verification

Run checks proportional to the change. For cross-cutting work, run:

```bash
uv run ruff check .
uv run ruff format --check .
uv run pytest --cov
uv run mkdocs build --strict
git diff --check
git status --short
```

Report commands not run and explain why.
