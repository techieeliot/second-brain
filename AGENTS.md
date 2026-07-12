# Repository Guidelines

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
- `src/frontend/` contains the Next.js 16 dashboard and registry components.
- `src/studio/` contains the Sanity Studio and note schema definitions.
- `tests/` contains pytest tests.
- `docs/` contains published documentation and standards.
- `raw/` contains immutable source material during ingest.
- `wiki/` contains synthesized, interlinked knowledge.
- `README.md` is the canonical user and contributor guide.
- `pyproject.toml` and `uv.lock` define the project and resolved environment.
- `package.json`, `turbo.json`, and `yarn.lock` define the JavaScript workspace.

## JavaScript Workspace

Use Yarn from the repository root. Turborepo coordinates the two apps:

```bash
yarn dev              # Start Next.js/Turbopack and Sanity Studio
yarn lint             # Lint both JavaScript apps
yarn build            # Build the frontend and Studio
yarn frontend:dev    # Start only the Next.js dashboard
yarn studio:dev      # Start only Sanity Studio on port 3333
```

The frontend uses the App Router under `src/frontend/src/app`, shadcn/ui
primitives under `src/frontend/src/components/ui`, and product compositions
under `src/frontend/src/components/registry`. Keep the matte-black theme and
accessible interactive behavior consistent with existing components. Next.js
development uses Turbopack; review the local Next guidance in
`src/frontend/AGENTS.md` before changing framework code.

The Studio keeps `sanity.config.ts` and `sanity.cli.ts` at its root, with
custom schemas under `src/studio/src/schemaTypes/`. Set
`SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in a local environment
file before connecting to Content Lake. Do not commit credentials.

The root `.mcp.json` registers Next DevTools and Sanity MCP. MCP access may
inspect live applications, but content mutations, deployments, DNS changes,
and other external writes require explicit user authorization.

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

For JavaScript changes, also run:

```bash
yarn lint
yarn build
```

For UI changes, verify the affected route locally and check keyboard focus,
tooltips, notifications, responsive layout, and dark-theme contrast.

## Commits and Pull Requests

Use concise imperative commit subjects, for example `Add note CLI` or
`Refactor flowcharts`. Keep pull requests focused, describe user-visible
behavior, link related issues, list verification commands, and include a
screenshot for meaningful UI changes. Never merge a pull request as part of a
review task unless the user explicitly requests the merge.
