# Upstream and maintenance review

Independent maintenance of `remark-lint@9.1.2` as `@stackline/remark-lint`.

- Source history: https://github.com/remarkjs/remark-lint/tree/639271aed95fa579623f385bade4939a9c70e959
- Original npm integrity: `sha512-m9e/aPlh7tsvfJfj8tPxrQzD6oEdb9Foko+Ya/6OwUP9EoGMfehv1Qtv26W1DoH58Wn8rT8CD+KuprTWscMmIA==`.
- Issues checked: 2026-09-29T00:22:05.352222+00:00.
- Original authors, notices and license are retained. Published runtime and declaration file hashes are recorded in `.stackline/upstream.json`; reviewed differences are explicitly listed there.
- Original functional suites run against both source and the extracted final tarball. Type checks and the complete development/runtime audit must pass.

This maintenance branch selects the npm package from the upstream monorepo into the repository root and retains the upstream Git history. Shared tests are narrowed to this package and wired to its local implementation. Other monorepo products are not published by this repository.

## Issue triage

- https://github.com/remarkjs/remark-lint/issues/332: Concerns the separate list-item-bullet-indent rule package; no core message-control change is indicated.
- https://github.com/remarkjs/remark-lint/issues/335: Concerns the separate no-missing-blank-lines rule package; no core message-control change is indicated.
- https://github.com/remarkjs/remark-lint/issues/331: New rule proposal, not an existing core defect.
- https://github.com/remarkjs/remark-lint/issues/277: Proposal to lint suppression comments; it would add diagnostics and change the current API behavior. Not introduced in this compatibility release.
- https://github.com/remarkjs/remark-lint/issues/217: New table rule option; the separate rule is not part of this package.
- https://github.com/remarkjs/remark-lint/issues/82: Autofix API/CLI proposal. Not introduced in this compatibility release.

The evidence query fetched the latest 100 open and 30 closed issue/PR entries and removed PRs. This is a bounded review, not a claim of exhaustive issue history or resolution of every issue.

## Release verification

GitHub Actions publishes the reviewed passing-CI tarball. Release completion requires exact source identity, zero open CodeQL alerts, npm provenance and tarball identity, normal and aliased installs, and matching immutable GitHub release assets. Existing versions are never replaced.
