# Claude Project Instructions

Follow the project instructions in [AGENTS.md](AGENTS.md). It is the
canonical schema for the project's LLM-maintained knowledge base.

## Repository Structure

- Treat [raw/](raw/) as immutable source material.
- Maintain synthesized, interlinked knowledge in [wiki/](wiki/).
- Read [wiki/index.md](wiki/index.md) before answering knowledge-base
  questions.
- Append ingest, query, and lint activity to [wiki/log.md](wiki/log.md).

## Python Workflow

- Use uv for dependency management and command execution.
- Keep application code under src/second_brain/.
- Run uv run ruff check . and uv run pytest before completing code changes.
- Preserve the existing pyproject.toml configuration and src layout.

## Change Discipline

- Inspect relevant files before editing.
- Do not modify or delete files in raw/ during wiki maintenance.
- Update wiki/index.md when adding or changing wiki pages.
- Prefer focused changes and add tests for changed application behavior.
