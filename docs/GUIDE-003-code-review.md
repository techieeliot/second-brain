---
id: GUIDE-003
title: Code Review Standards
created: 2026-07-11
updated: 2026-07-11
status: active
scope: second-brain
type: GUIDE
---

# Code Review Standards

## Purpose

This guide defines evidence-based review for Python, uv, MkDocs, and
knowledge-workflow changes in `second-brain`. Review the requested change, not
an imagined redesign, and report only actionable findings.

## Review Order

1. Intent and scope.
2. Correctness and safety.
3. Tests and verification.
4. Architecture and maintainability.
5. Packaging and compatibility.
6. Documentation and knowledge integrity.

## The Six Gates

- **Intent:** Is the outcome and reason clear? Block when unstated context is
  required; approve when the task or PR is self-contained.
- **Correctness:** Do normal and failure paths work? Block when errors are
  silent or contracts regress; approve when behavior matches requirements.
- **Tests:** Do tests prove observable behavior? Block when requested behavior
  is untested; approve when tests demonstrate the change.
- **Architecture:** Is logic in the right module? Block when responsibilities
  scatter or imports become fragile; approve when the smallest coherent change
  fits existing boundaries.
- **Tooling:** Are uv, Python, logging, and MkDocs contracts preserved? Block
  when lockfiles, entry points, versions, or builds conflict; approve when
  workflows remain reproducible.
- **Documentation:** Are user docs, API docs, and wiki contracts current? Block
  when behavior is undocumented or raw sources changed; approve when connected
  docs are accurate and strict MkDocs passes.

## Python Review

Apply the Python panel from [SPEC-001](SPEC-001-expert-panel.md):

- **Raymond Hettinger:** idiomatic, readable code and effective
  standard-library use.
- **Brett Cannon:** packages, imports, entry points, and project structure.
- **Mariatta Wijaya:** contributor usability, documentation, and
  maintainability.
- **Victor Stinner:** runtime behavior, diagnostics, resources, and
  compatibility.
- **Brandt Bucher:** modern language features and measured performance concerns.

Check focused responsibilities, precise names, useful public docstrings,
explicit exception boundaries, stable imports, Python 3.13 compatibility, and
measured performance claims.

## Tests and Coverage

Tests should assert behavior visible through a public function, CLI output, log
sink, file, or documented workflow. Require the requested happy path, relevant
boundaries, preserved configuration, and the motivating regression.

Avoid tests coupled only to private implementation details. Prefer real values
and temporary paths for local behavior.

```bash
uv run pytest --cov
```

The coverage floor is 80%. Coverage is a safety signal, not a substitute for
meaningful assertions.

## Logging Review

When logging changes, verify:

- console level follows `LOG_LEVEL`;
- file path follows `LOG_FILE`;
- the file sink remains at `DEBUG` unless requirements change;
- rotation and retention are preserved or documented;
- console and file formats remain consistent;
- custom levels and exceptions remain readable;
- tests do not leave persistent logs in the repository.

## uv and Packaging Review

Apply Charlie Marsh and Zanie Blue as direct Astral lenses, adding Paul Moore
for standards or compatibility.

- `pyproject.toml` and `uv.lock` agree after dependency changes.
- The `second_brain` script resolves to `second_brain.app:main`.
- The `src/` layout remains installable.
- Build-system constraints are intentional.
- CI and documented commands use uv consistently.
- Windows and standards interoperability are considered when relevant.

## MkDocs Review

Apply Waylan Limberg for documentation architecture and Oleg Pidsadnyi for
build and compatibility changes.

- Navigation is understandable.
- Relative links resolve.
- Markdown uses configured extensions.
- mkdocstrings imports the package.
- Examples match application behavior.
- Generated `site/` content is not treated as source.

```bash
uv run mkdocs build --strict
```

## Knowledge Workflow Review

For `raw/`, `wiki/`, or `AGENTS.md` changes:

- Raw sources remain unchanged during ingest.
- Synthesized claims cite sources.
- Related wiki pages link to one another.
- `wiki/index.md` includes new or renamed pages.
- `wiki/log.md` records operations chronologically.
- Durable conclusions live in `wiki/`, not only in chat.

## AI-Assisted Review

Follow [GUIDE-002](GUIDE-002-ai-prompting.md). Distinguish model errors from
missing context, authentication from authorization, host-terminal behavior from
sandbox behavior, and a blocked external action from incomplete prepared work.

Do not accept repeated retries as progress. When an environment cannot perform
an authorized external action, require a safe, exact handoff.

## Finding Format

Every blocking finding includes:

1. severity: Critical, High, Medium, or Low;
2. file and tight line range;
3. observed evidence;
4. concrete impact;
5. the smallest feasible correction.

If no actionable findings exist, say so. Do not manufacture minor issues.

## Verification Set

Run relevant commands and the full set for cross-cutting work:

```bash
uv run ruff check .
uv run ruff format --check .
uv run pytest --cov
uv run mkdocs build --strict
git diff --check
git status --short
```

Review untracked files deliberately and preserve unrelated user work.

## Approval Checklist

- [ ] Intent and scope are clear.
- [ ] Behavior and meaningful failure paths are tested.
- [ ] Ruff lint and formatting pass.
- [ ] pytest passes with the coverage floor.
- [ ] uv metadata and lockfile remain consistent.
- [ ] Strict MkDocs passes when documentation is affected.
- [ ] README and connected docs reflect user-facing changes.
- [ ] Raw sources and ignored local state are preserved.
- [ ] Findings distinguish regressions from existing issues.
- [ ] External actions were authorized and verified.

## See Also

- [Documentation standards](GUIDE-004-docs-standards.md)
- [AI prompting](GUIDE-002-ai-prompting.md)
- [Expert panel](SPEC-001-expert-panel.md)
- Root `README.md` - canonical user guide
- [API reference](REF-001-api-reference.md)

## Update Policy

Update this guide when verification commands, supported Python versions,
packaging, logging contracts, documentation tooling, or the knowledge workflow
changes.
