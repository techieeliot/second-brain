# Project Guidelines

`AGENTS.md` is the canonical instruction file for AI agents. The root
`README.md` is the canonical user and contributor guide.

## Knowledge Base

1. Store immutable inputs in `raw/` during ingest.
2. Synthesize and cross-link durable knowledge in `wiki/`.
3. Keep `wiki/index.md` as the content catalog.
4. Keep `wiki/log.md` as an append-only chronological record.
5. Cite sources near important claims.
6. Record contradictions and unresolved questions rather than hiding them.

Use lowercase, descriptive, hyphen-separated filenames for wiki pages. Keep
each page focused on one topic, entity, source, or analysis.

## Python Project

- Use uv for dependency management and project commands.
- Keep runtime code in `src/second_brain/` and tests in `tests/`.
- Keep project configuration in `pyproject.toml` and resolved dependencies in
  `uv.lock`.
- Preserve the supported Python version and package entry points unless
  requirements change.
- Run Ruff, pytest with coverage, and applicable documentation checks before
  completion.

## Documentation

- Keep installation, usage, environment, testing, and contributor workflows in
  `README.md`.
- Keep published standards, the docs index, expert-panel policy, and generated
  API reference under `docs/`.
- Keep accumulated source-derived knowledge under `wiki/`.
- Follow `docs/GUIDE-004-docs-standards.md` for documentation changes.
- Build documentation with `uv run mkdocs build --strict`.

## AI-Assisted Work

- Follow `docs/GUIDE-002-ai-prompting.md` for agent tasks and external-action
  safety.
- Follow `docs/GUIDE-003-code-review.md` for reviews.
- Use `docs/SPEC-001-expert-panel.md` for significant or cross-domain review
  routing.
