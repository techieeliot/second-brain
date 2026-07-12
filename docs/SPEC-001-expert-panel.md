---
id: SPEC-001
title: Expert Panel Review Framework
created: 2026-07-11
updated: 2026-07-11
owner: project-maintainers
experts:
  - Ryan Lopopolo
  - Thibault Sottiaux
  - Philipp Acsany
  - Waylan Limberg
  - Oleg Pidsadnyi
  - Raymond Hettinger
  - Brett Cannon
  - Mariatta Wijaya
  - Victor Stinner
  - Brandt Bucher
  - Charlie Marsh
  - Zanie Blue
  - Paul Moore
status: active
scope: project
type: SPEC
implements: []
---

# Expert Panel Review Framework

## Purpose

This specification defines the expert lenses used to review this Python
project. The names represent virtual review perspectives. They do not imply
participation in, endorsement of, or responsibility for the project by the
named people.

The panel is intentionally limited to the selected experts below. Reviews
should choose only the experts relevant to the change and should translate each
lens into concrete, verifiable feedback.

## Quick Start

1. Inspect the changed files, tests, documentation, and configuration.
2. Select the smallest relevant panel, normally two to four experts.
3. Apply the primary reviewer for the affected domain.
4. Add secondary reviewers when a change crosses domain boundaries.
5. Cite exact files, lines, commands, or observed behavior for every concern.
6. Do not attribute invented quotations or personal opinions to an expert.
7. Resolve recommendations using the hierarchy of consensus below.

## Review Scoring

- **10/10:** Correct, clear, tested, documented, and aligned with all
  applicable lenses. **Approve.**
- **9/10:** Strong implementation with minor non-blocking gaps.
  **Approve with follow-up.**
- **8/10:** Functional but with meaningful maintainability, test, or
  documentation concerns. **Request changes.**
- **7/10:** Major correctness, architecture, packaging, or compatibility
  problems. **Block.**
- **Below 7:** Unsafe, misleading, or fundamentally unsuitable.
  **Block and require redesign.**

A high score requires evidence. Documentation cannot compensate for incorrect
code, and passing tests cannot compensate for tests that miss the requested
behavior.

## Expert Priority and Lenses

### Codex

#### 1. Ryan Lopopolo — Harness Engineering

Primary lens for agent-readable repositories and harness feedback loops.

- Make repository expectations explicit and discoverable.
- Ensure agents can observe, test, and verify the behavior they change.
- Prefer durable feedback loops over repeated prompt corrections.
- Treat missing tools, unclear instructions, and unverifiable state as harness
  defects.
- Keep repository guidance concise, enforceable, and close to the affected
  scope.

Ryan's harness-engineering work is directly relevant to this repository.

#### 2. Thibault Sottiaux — Codex Product and Architecture

Primary lens for Codex architecture, autonomy boundaries, and end-to-end
workflows.

- Verify that tasks have explicit goals, constraints, and completion conditions.
- Preserve human control over consequential external actions.
- Prefer workflows that move from intent to tested, reviewable output.
- Check that agent permissions and integrations match the requested scope.
- Distinguish model limitations from environment, authorization, and tool
  failures.

Thibault is confirmed as leading Codex.

#### 3. Philipp Acsany — Agentic Workflows and Instruction
Primary lens for developer interactions with AI tools, Claude Code workflows, and educational clarity.
- Optimize codebase patterns for interactive agent environments and developer velocity.
- Ensure code examples and tutorials maintain high pedagogical value and universal accessibility.
- Verify that repository structures are easily parsed by both human learners and LLM context windows.
- Balance algorithmic optimization with readability to prevent cognitive overload for developers.
- Check that automated pipelines do not introduce fragile styling or design regressions.

### MkDocs

#### 1. Waylan Limberg — Documentation Architecture

Primary lens for Markdown processing, MkDocs configuration, extensions,
navigation, and authoring.

- Keep navigation predictable and documentation easy to discover.
- Use supported Markdown and extension behavior deliberately.
- Avoid configuration complexity that does not improve the reader experience.
- Run strict builds and resolve warnings rather than normalizing them.
- Keep examples executable, current, and consistent with the application.

#### 2. Oleg Pidsadnyi — Build and Maintenance

Primary lens for modern MkDocs build behavior, packaging, compatibility, and
maintenance.

- Verify configuration against current MkDocs behavior.
- Check build reproducibility and dependency compatibility.
- Treat strict-build failures as release blockers.
- Avoid relying on undocumented theme or plugin behavior.
- Review upgrades for deprecations and packaging consequences.

### Python

#### 1. Raymond Hettinger — Idiomatic and Readable Python

Primary Python reviewer.

- Prefer clear, idiomatic Python over cleverness.
- Use the standard library effectively.
- Choose data structures and control flow that communicate intent.
- Keep functions focused and names precise.
- Optimize only after identifying a real cost.

#### 2. Brett Cannon — Packages, Imports, and Project Architecture

Primary secondary reviewer for imports, package boundaries, build
configuration, and project structure.

- Preserve clear module and package responsibilities.
- Avoid import cycles and fragile import-time side effects.
- Keep packaging metadata consistent with the source layout.
- Make execution entry points explicit.
- Review changes for compatibility with Python tooling and environments.

#### 3. Mariatta Wijaya — Documentation and Maintainability

- Make contribution and maintenance workflows approachable.
- Keep documentation synchronized with behavior.
- Prefer errors and instructions that help contributors recover.
- Review automation for maintainability and contributor usability.
- Ensure project knowledge is not confined to one person's local setup.

#### 4. Victor Stinner — Runtime and Compatibility

- Check behavior across supported Python versions and platforms.
- Treat diagnostics and failure modes as part of the product.
- Measure before making performance claims.
- Avoid depending on interpreter implementation details without tests.
- Review concurrency, resource cleanup, and exception behavior carefully.

#### 5. Brandt Bucher — Language Evolution and Performance

- Use modern language features when they improve clarity or correctness.
- Avoid syntax that needlessly narrows supported Python versions.
- Consider interpreter evolution and future compatibility.
- Validate assumptions about bytecode or performance with measurements.
- Keep forward-looking optimizations subordinate to maintainability.

### uv

#### 1. Charlie Marsh — uv Architecture and Performance

Primary uv reviewer and direct Astral perspective.

- Keep dependency and environment workflows fast, predictable, and unified.
- Preserve the relationship between `pyproject.toml`, `uv.lock`, and the
  environment.
- Avoid unnecessary commands or alternate environment-management paths.
- Check cache and CI choices for measurable benefit.
- Prefer reproducible defaults with minimal configuration.

#### 2. Zanie Blue — uv Developer Experience

Direct Astral perspective on tooling behavior, documentation, and user
experience.

- Ensure commands are understandable and errors are actionable.
- Keep documentation aligned with actual uv behavior.
- Review lock, sync, and run workflows from the contributor's perspective.
- Avoid surprising environment mutation.
- Check cross-platform workflows and upgrade guidance.

#### 3. Paul Moore — Packaging Standards and Compatibility

Independent packaging and pip counterweight.

- Verify standards compatibility and interoperability with the Python ecosystem.
- Review Windows behavior explicitly.
- Check dependency installation, indexes, build isolation, and wheel handling.
- Avoid uv-specific assumptions that make the project unnecessarily
  non-portable.
- Treat packaging metadata as a public contract.

## Routing Rules

- **Agent instructions, Codex workflows, tools, permissions, and automation:**
  Ryan Lopopolo and Thibault Sottiaux. Add Philipp Acsany for Claude Code
  interactions, developer velocity, and education. Add Brett Cannon for
  repository structure.
- **Markdown, navigation, MkDocs configuration, plugins, and strict builds:**
  Waylan Limberg. Add Oleg Pidsadnyi for build or packaging effects.
- **General Python implementation and refactoring:** Raymond Hettinger. Add
  Mariatta Wijaya for documentation or workflow, Victor Stinner for runtime
  concerns, and Brandt Bucher for language or performance concerns.
- **Imports, entry points, package layout, and `pyproject.toml` structure:**
  Brett Cannon. Add Raymond Hettinger and Paul Moore.
- **uv commands, lockfiles, environments, caching, and CI dependencies:**
  Charlie Marsh and Zanie Blue. Add Paul Moore for standards, Windows,
  indexes, or build isolation.
- **Cross-cutting project or build configuration:** Brett Cannon and Oleg
  Pidsadnyi. Add Charlie Marsh, Zanie Blue, or Waylan Limberg according to
  impact.

## Required Panel Composition

- Use Ryan Lopopolo, Thibault Sottiaux, and Philipp Acsany for substantive
  Codex workflow or agent-architecture changes.
- Use Waylan Limberg for MkDocs and documentation architecture.
- Use all five Python experts for broad Python architecture or project-wide
  maintainability reviews.
- Add Oleg Pidsadnyi and Brett Cannon as secondary reviewers when a change
  affects build configuration, packaging, imports, or project structure.
- Use Charlie Marsh and Zanie Blue as the direct Astral perspectives for uv
  changes.
- Add Paul Moore when uv work touches standards compatibility, Windows,
  indexes, installation, or ecosystem portability.

## Review Process

1. Establish the requested behavior and affected domain.
2. Inspect the implementation and supporting tests before judging style.
3. Run the relevant test, lint, formatting, packaging, and documentation
   commands.
4. Record each expert's findings using evidence rather than simulated
   quotations.
5. Identify agreements, conflicts, and cross-domain consequences.
6. Prioritize findings as Critical, High, Medium, or Low.
7. Give a clear verdict: Approve, Approve with Changes, or Needs Rework.

## Hierarchy of Consensus

When lenses disagree, resolve them in this order:

1. Correctness, security, and data integrity.
2. Explicit project requirements and supported-platform contracts.
3. Reproducibility and test evidence.
4. Maintainability and clarity.
5. Compatibility and contributor experience.
6. Performance supported by measurement.
7. Personal style preference.

If evidence does not resolve the disagreement, document the trade-off and
request a project-owner decision.

## Reviewer Guardrails

- Do not invent an expert's position or quotation.
- Do not use a famous name as a substitute for technical evidence.
- Do not raise hypothetical concerns when repository evidence resolves them.
- Do not recommend unrelated rewrites.
- Every blocking concern must identify impact, evidence, and a feasible
  correction.
- Separate existing defects from regressions introduced by the reviewed change.
- Verify changed documentation whenever behavior, configuration, commands, or
  supported environments change.

## Decision Log

- **2026-07-11 — Establish the ranked panel:** All selected experts. This
  creates a focused review framework for the project's current stack.
- **2026-07-12 — Add Philipp Acsany to Codex panel:** Introduce a dedicated
  lens for developer-facing AI tool usage (Claude Code), technical education
  quality, and repository onboarding ergonomics.
- Add future decisions here as the panel or routing rules change.

## Update Policy

Update this specification when the project's supported stack, build process,
documentation system, or agent workflow changes materially. New experts require
a documented domain gap and an explicit routing rule. Keep the panel small
enough that each selected lens materially changes the review.
