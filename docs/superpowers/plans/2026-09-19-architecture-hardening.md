# Architecture Hardening Implementation Plan

> **For agentic workers:** Execute task-by-task with tests before behavior changes and verify every batch before committing.

**Goal:** Make all extension and userscript release surfaces reproducible, minimally privileged, consistently shared, and CI-verified.

**Architecture:** pnpm remains the workspace orchestrator. WXT owns final browser artifacts through a local toolbox-assets module, shared packages own cross-surface code, and small Node/Vitest smoke checks validate release invariants.

**Tech Stack:** pnpm, TypeScript, React, WXT, Vite, VitePress, Vitest, GitHub Actions.

## Global Constraints

- Do not add Turborepo, Nx, or a general plugin framework.
- Keep toolbox usable as an independent web app.
- Commit each numbered task separately after its verification passes.

---

### Task 1: Browser-complete extension builds

**Files:** toolbox Vite config, local WXT module, extension config/scripts, root scripts, release smoke test.

- [ ] Add a failing smoke test for missing Chrome/Firefox toolbox artifacts.
- [ ] Change toolbox output to its own `dist` directory.
- [ ] Add a local WXT module that builds and copies toolbox assets for each browser target.
- [ ] Add explicit Chrome and Firefox build commands and a complete root release build.
- [ ] Build both targets and run the smoke test.
- [ ] Commit as `build: make toolbox browser-target aware`.

### Task 2: Least-privilege extension manifest

**Files:** WXT config, content entrypoint, manifest smoke assertions.

- [ ] Add failing assertions for exact permissions, resources, match patterns, and top-frame injection.
- [ ] Narrow permissions and web-accessible resources.
- [ ] Restrict matches to HTTP(S) and remove all-frame injection.
- [ ] Build both targets and verify generated manifests.
- [ ] Commit as `security: reduce extension privileges`.

### Task 3: Quality gates

**Files:** root package/scripts, Vitest config/tests, documentation component, GitHub Actions workflow.

- [ ] Add Vitest and extract URL parsing into a testable module.
- [ ] Write URL parser tests before moving behavior.
- [ ] Fix current lint failures without unrelated formatting.
- [ ] Add root lint, typecheck, test, and check commands.
- [ ] Add Node 22 CI workflow.
- [ ] Run the complete local check.
- [ ] Commit as `ci: add repository quality gates`.

### Task 4: Shared UI and workspace boundaries

**Files:** workspace package manifests, UI exports, extension JSON renderer, duplicate editor files, root pnpm settings.

- [ ] Point extension JSON rendering to the shared UI package.
- [ ] Remove the duplicate extension editor.
- [ ] Give root, extension, toolbox, shared, and UI packages unique scoped names.
- [ ] Correct runtime dependency classifications and centralize the Vite override.
- [ ] Install without changing dependency versions, then typecheck and build.
- [ ] Commit as `refactor: align workspace package boundaries`.

### Task 5: Conventional userscript discovery and artifacts

**Files:** userscript builder, docs links, userscript smoke test.

- [ ] Add failing tests for discovery and `.user.js` artifact names.
- [ ] Replace the hard-coded script list with deterministic directory discovery.
- [ ] Validate required `index.ts` and `manifests.ts` files with actionable errors.
- [ ] Emit `<name>.user.js` and update documentation links.
- [ ] Build and verify all discovered artifacts.
- [ ] Commit as `build: discover and emit userscript artifacts`.

### Task 6: Final release verification

**Files:** README documents only if commands require clarification.

- [ ] Run install consistency, lint, typecheck, tests, site build, and both browser builds.
- [ ] Inspect final manifests and userscript headers.
- [ ] Confirm the worktree contains only intentional changes and all phase commits.
- [ ] Commit any required documentation correction separately.
