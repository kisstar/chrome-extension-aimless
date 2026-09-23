# Architecture Hardening Design

## Goal

Make the repository's browser-extension and userscript releases reproducible across Chrome and Firefox, reduce extension privileges, remove duplicated UI ownership, and add automated quality gates without introducing a heavyweight monorepo orchestrator.

## Constraints

- Keep pnpm workspaces and the existing React, WXT, Vite, and VitePress stack.
- Preserve the independently runnable toolbox web app.
- Keep the JSON page detector available on arbitrary HTTP and HTTPS pages.
- Use a single implementation of shared JSON UI.
- Produce conventional `.user.js` userscript artifacts.
- Make each implementation batch independently verified and committed.

## Design

### Extension build ownership

The toolbox remains an independent Vite application, but it no longer writes directly into a browser-specific WXT directory. Its normal build writes to `apps/toolbox/dist`. A local WXT module builds the toolbox before production extension builds and exposes its output through WXT's public-assets pipeline. WXT therefore owns the final Chrome and Firefox output directories and zip contents.

Root scripts distinguish `build:site` from `build:extension`; the root `build` command produces all release surfaces. Extension smoke verification checks that both manifests and both toolbox pages exist.

### Extension privileges

The content script remains matched to HTTP and HTTPS pages so standalone JSON responses can be detected, but it runs only in the top frame. The unlisted JSON renderer is the only web-accessible resource. Permissions are restricted to APIs used by the current implementation: `contextMenus` and `scripting`.

### Shared UI and workspace boundaries

`@aimless/ui` owns the JSON editor and viewer. Both the toolbox and extension import it; the duplicate extension implementation is removed. Runtime workspace dependencies are declared in `dependencies`, package names are unique, and Vite overrides live only at workspace root. Internal packages remain private.

### Quality gates

Vitest covers pure URL parsing and release-structure smoke checks. CI runs install, lint, type checks, unit tests, and production builds on Node 22. The existing documentation lint violations are fixed so lint can be a required gate.

### Userscript build

The userscript builder discovers script directories from files rather than a hard-coded name array. It validates that each script has an entrypoint and metadata banner, emits `<name>.user.js`, and preserves watch mode. Documentation links point to the new artifacts.

### Deferred optimization

Monaco bundle-size optimization and a full `src/` migration are deliberately deferred. Neither is required to correct build ownership, permissions, dependency boundaries, or release verification.

## Verification

- `pnpm lint` succeeds.
- `pnpm typecheck` succeeds.
- `pnpm test` succeeds.
- `pnpm build` produces Chrome and Firefox manifests, toolbox pages, documentation, and all discovered `.user.js` files.
- Generated manifests contain only intended permissions and expose only `json-content.js`.
