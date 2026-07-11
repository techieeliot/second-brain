---
id: GUIDE-001
title: Documentation Standards
created: 2026-07-11
updated: 2026-07-11
status: active
scope: second-brain
type: GUIDE
---

# Documentation Standards

## Purpose

This guide defines how documentation is written and maintained in `second-brain`. It covers the public MkDocs site, contributor entry points, and the repository's `raw/` to `wiki/` knowledge workflow.

The goal is one trustworthy explanation for each concern, with links instead of duplicated instructions.

## Documentation Map

| Location | Purpose | Source-of-truth rule |
| --- | --- | --- |
| `README.md` | Canonical user guide, commands, and orientation | Keep complete but scannable; link to `docs/` |
| `docs/` | Published user and contributor documentation | Must pass `mkdocs build --strict` |
| `docs/REF-NNN-*.md` | Numbered generated or lookup reference | Code, configuration, or source data remains canonical |
| `raw/` | Curated source material | Never rewrite or delete during ingest |
| `wiki/` | Synthesized, interlinked knowledge | Cite relevant raw sources near claims |
| `AGENTS.md` | Ingest, query, and wiki-lint workflow | Governs `raw/` and `wiki/` changes |
| `docs/SPEC-001-expert-panel.md` | Significant review policy | Governs expert selection and review |

## Core Rules

### Update documentation with behavior

Update documentation in the same change whenever you modify:

- commands, entry points, or environment variables;
- Python APIs or supported versions;
- logging format or sink behavior;
- uv dependency or environment workflows;
- MkDocs navigation, plugins, or extensions;
- the `raw/` to `wiki/` knowledge workflow.

If implementation and documentation disagree, verify behavior from code and tests, then correct the documentation before merging.

### Keep each concern canonical

- Put installation, execution, configuration, testing, documentation, and wiki procedures in `README.md` while the complete workflow remains scannable.
- Generate API details from Python code rather than copying signatures into prose.
- Put agent workflow rules in `AGENTS.md`.
- Put review policy in `SPEC-001-expert-panel.md` and these guides.
- Link to canonical pages instead of repeating large sections.

### Write for scanning

- Lead with purpose and expected outcome.
- Use descriptive headings and short paragraphs.
- Put commands in fenced `bash` blocks.
- Use relative links within the documentation site.
- Explain project-specific terms on first use.
- Avoid unverified commands, stale output, and claims imported from other projects.

### Keep examples executable

Commands run from the repository root unless stated otherwise:

```bash
uv sync
uv run second_brain
uv run pytest --cov
uv run ruff check .
uv run ruff format --check .
uv run mkdocs build --strict
```

uv is the supported environment and command workflow. Do not present direct `pip` or ad hoc virtual-environment steps as the primary path.

## Document Types

### README

Use `README.md` as the canonical user guide for installation, execution, configuration, logging, testing, documentation, and wiki orientation. Link to deeper standards and generated reference material instead of copying them.

### DOC

Do not create a separate `DOC-NNN` user guide while the complete workflow remains readable in `README.md`. Introduce a numbered `DOC` only when a stable tutorial or workflow becomes too large or specialized for the root README. Keep README as the entry point and link to the new canonical document.

### REF

Use `REF-NNN-*.md` for numbered lookup material whose canonical facts come from code or configuration. `REF-001-api-reference.md` is generated from the `second_brain` package and its docstrings.

`DOC` and `REF` numbers are independent sequences. Numbering communicates stable identity and linkability, not reading order.

### GUIDE

Use a `GUIDE-NNN-*.md` file for a repeatable workflow that requires human or agent judgment. Include purpose, rules, examples, validation, related documents, and an update policy.

### SPEC

Use a `SPEC-NNN-*.md` file for an architectural contract or routing framework shared by several workflows. A specification describes what must remain true; a guide describes how to work within that contract.

### Wiki page

Use `wiki/` for synthesized knowledge derived from `raw/` sources. Follow `AGENTS.md`: read sources completely, preserve inputs, link concepts, update `wiki/index.md`, and record the operation in `wiki/log.md`.

Do not use the wiki as a substitute for user documentation or repository standards.

## API Documentation

`docs/REF-001-api-reference.md` uses mkdocstrings to render the `second_brain` package. Public functions should have concise docstrings explaining purpose, relevant side effects, and configuration contracts.

Avoid duplicating implementation details already visible through `show_source`. Add prose only when it clarifies how a caller should use the package.

## Documentation Review

Apply these lenses from [SPEC-001](SPEC-001-expert-panel.md):

- **Waylan Limberg:** Markdown, navigation, extensions, and authoring clarity.
- **Oleg Pidsadnyi:** strict builds, packaging, compatibility, and maintenance.
- **Mariatta Wijaya:** contributor usability and durable project knowledge.

Add Brett Cannon when documentation changes package layout, entry points, imports, or build configuration.

## Validation Checklist

- [ ] Commands match `pyproject.toml`, source code, and scripts.
- [ ] Environment variables and defaults are accurate.
- [ ] Relative links resolve.
- [ ] User-facing pages appear in `mkdocs.yml` navigation.
- [ ] API descriptions match code and docstrings.
- [ ] Wiki edits comply with `AGENTS.md` and preserve `raw/`.
- [ ] `uv run mkdocs build --strict` succeeds.
- [ ] Related README content remains accurate and non-duplicative.

## Anti-Patterns

- Copying organizational rules from another repository without adapting them.
- Publishing commands that have not been run here.
- Maintaining the same detailed procedure in README and MkDocs.
- Editing `raw/` sources to simplify synthesis.
- Adding a page without navigation or an intentional inbound link.
- Treating generated `site/` content as source documentation.

## See Also

- [Documentation home](index.md)
- Root `README.md` - canonical user guide
- [API reference](REF-001-api-reference.md)
- [AI prompting](GUIDE-002-ai-prompting.md)
- [Code review](GUIDE-003-code-review.md)
- [Expert panel](SPEC-001-expert-panel.md)

## Update Policy

Update this guide when the documentation layout, MkDocs configuration, supported commands, or knowledge workflow changes. Validate every update with a strict MkDocs build.
