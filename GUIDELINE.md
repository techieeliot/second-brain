# Project Guidelines

## Knowledge Base

This project follows the persistent-wiki pattern described in the LLM Wiki
workflow:

1. Store curated, immutable inputs in raw/.
2. Synthesize and cross-link durable knowledge in wiki/.
3. Keep wiki/index.md as the content-oriented catalog.
4. Keep wiki/log.md as an append-only chronological record.
5. Cite the raw source or wiki page supporting important claims.
6. Record contradictions, stale claims, and unresolved questions rather than
   silently hiding them.

Use lowercase, descriptive, hyphen-separated names for wiki pages. Keep each
page focused on one topic, entity, source, or analysis.

## Python Project

- Use uv, not pip, for project commands and dependency management.
- Keep runtime code in src/second_brain/.
- Keep tests in tests/ and run them with pytest.
- Keep configuration in pyproject.toml.
- Do not add type hints unless the project requirements change.
- Run Ruff and pytest before considering a change complete.

## Documentation

Keep README.md focused on setup and usage. Keep docs/ focused on generated
project documentation. Keep wiki/ focused on accumulated workshop knowledge;
do not mix the two documentation purposes.
