# Course Overview

This repository is the working project for [Real Python's Codex for Python
Developers course](https://realpython.com/workshops/codex/). The course is a
two-day intermediate workshop focused on building and shipping a Python CLI
application with an agent working inside the codebase.

## Course Alignment

The current project already covers the workshop's setup foundations:

- src/ layout and an installable Python package
- pyproject.toml configuration
- uv dependency management and lockfile
- CLI entrypoint
- pytest tests
- Loguru logging
- MkDocs documentation
- Ruff linting and formatting
- Agent guidance in AGENTS.md, CLAUDE.md, and GUIDELINE.md

## Workshop Outcomes

The course emphasizes a complete development loop:

1. Plan a feature.
2. Implement code, tests, and documentation.
3. Run verification and investigate failures.
4. Review the result.
5. Commit and ship through GitHub.

Day 2 extends the project with reusable Codex skills, debugging practice, and
a Textual terminal dashboard. Hooks, MCP servers, and headless execution are
introduced as follow-on capabilities.

## Preparation Checklist

- [ ] Codex CLI is installed and working.
- [ ] Python and uv are installed.
- [ ] GitHub CLI is installed and authenticated.
- [ ] Git and GitHub basics are familiar.
- [ ] The project runs with uv sync and uv run pytest.

See the [raw course overview](../raw/course-overview-2026-07-11.md) for the
captured source notes.
