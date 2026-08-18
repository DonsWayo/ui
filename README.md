# @nucel/ui

A Svelte 5 component library, published to npm as `@nucel/ui`. It is the shared
UI layer for the Nucel platform: the Nucel server's Inertia frontend and the
nucel.dev marketing site both consume it from the registry.

The library is built on [bits-ui](https://bits-ui.com) primitives with
shadcn-svelte styling, themed with Tailwind CSS v4 tokens. It ships **Svelte
source, not compiled output** — your bundler compiles it alongside your own
components.

Scope note: this is an internal-first library. It is versioned and published
publicly so Nucel apps can depend on it, but the component set and its API are
driven by what Nucel's own screens need. There is no stability guarantee across
minor versions yet, and several components carry Nucel-specific assumptions
(PR review states, CI status, repo headers). Treat it as alpha.

---

## Read this before you depend on it

**Published npm versions 0.22.0 through 0.25.0 were cut from a tree that does
not contain the `MarkdownRenderer` XSS hardening.** This was verified by
unpacking each published tarball:

| Version                    | `utils/markdownSanitize.ts` | `MarkdownRenderer` DOMPurify config            |
| -------------------------- | --------------------------- | ---------------------------------------------- |
| 0.21.0                     | present                     | `sanitizeMarkdownHtml(...)`, `style` forbidden |
| 0.22.0 – 0.25.0 (`latest`) | absent                      | inline `ADD_ATTR: ['style', ...]`              |

Allowing inline `style` on user-authored markdown is a stored-XSS / CSS-overlay
foot-gun: a `position:fixed; inset:0; z-index:9999` block can be used to hijack
clicks on top of trusted UI. The rationale that `style` is needed for Shiki
colours is wrong — `MarkdownRenderer` re-highlights fenced code with Shiki
_after_ sanitization by replacing each `<pre>` in the DOM, so Shiki's
`<span style>` output never passes through DOMPurify at all.

The fix lives in `src/lib/utils/markdownSanitize.ts` on `main` (this tree,
version `0.21.0`) together with a 10-payload test. It has not been re-published.
Until a release carries it forward:

- If you render **untrusted** markdown, pin `@nucel/ui@0.21.0`.
- If you are on `^0.25.0` and render markdown, know that inline `style` survives
  sanitization.

`nucel/frontend` currently pins `^0.25.0`; `web` pins `^0.21.0`.

### git `main` and npm `latest` have diverged in both directions

This repo's `main` is at `0.21.0`. npm `latest` is `0.25.0`. They are not
ancestor and descendant — each has files the other lacks.

Published `0.25.0` has roughly 65 files `main` does not, including a whole
`components/layout/` family (`Stack`, `HStack`, `VStack`, `Grid`, `Container`,
`Page`, `Panel`, `Toolbar`, `List`, `ListRow`, `FormRow`, `FieldGroup`,
`spacing.ts`) and a set of Nucel-domain components (`ActivityFeed`, `FileTree`,
`JobDag`, `MissionRow`, `PrRow`, `PrStateBadge`, `ReviewThread`, `RepoHeader`,
`StatusChecksList`, `StepTimeline`, `Timeline`, `CloneMenu`, `LogTerminal`, and
others).

This tree has 8 files `0.25.0` lacks: `utils/markdownSanitize.ts`,
`utils/relativeTime.ts`, the Tiptap `editor/callout.ts` and
`editor/slash-commands.ts` extensions, and `Popover`, `Switch`, `ReactionBar`,
`UserAvatar` (the last three exist in `0.25.0` under `components/ui/` instead of
`components/`).

Practical consequences:

- **Consuming the library**: install from npm. Do not point a consumer at this
  git tree — it is missing components that `0.25.0` consumers already import.
- **Changing the library**: reconciling `main` against the published `0.25.0`
  source is a prerequisite for the next release. Publishing straight from `main`
  today would delete the layout primitives and the domain components from
  everyone on `^0.25.0`, and publishing from the `0.25.0` lineage without
  cherry-picking the sanitizer would keep shipping the XSS regression.

To diff for yourself:

```bash
curl -sL "$(npm view @nucel/ui@0.25.0 dist.tarball)" | tar xz   # → ./package
diff -rq package/src/lib src/lib
```

---

## Installation

```bash
bun add @nucel/ui
# or: npm install @nucel/ui
```

Peer dependencies:

```bash
bun add svelte@^5 tailwindcss@^4
```

`monaco-editor` is an optional peer dependency, needed only if you import the
`@nucel/ui/monaco` entry point. (Note: `0.25.0` as published omits it from
`peerDependencies` entirely — install it explicitly if you use the editors.)

### Styles

The package exports a stylesheet holding the Tailwind v4 theme tokens the
components render against. Import it once, at the top of your app CSS:

```css
@import '@nucel/ui/styles.css';
```

It defines raw semantic tokens (`--bg`, `--fg`, `--fg-muted`, `--success`,
`--warning`, `--danger`, …) on `:root` with dark values under `.dark`, maps them
into Tailwind utilities through `@theme inline`, and keeps the legacy shadcn
token names (`--background`, `--foreground`, `--primary`, …) aliased so existing
`bg-background` / `text-foreground` classes keep working.

Dark mode is driven by a `.dark` class on an ancestor element. `<ThemeProvider>`
manages that class, persists the preference to `localStorage`, and follows
`prefers-color-scheme` when set to `system`:

```svelte
<script>
	import { ThemeProvider, ThemeToggle } from '@nucel/ui';
</script>

<ThemeProvider>
	<ThemeToggle />
	<!-- app -->
</ThemeProvider>
```

Descendants can read the current theme with `getThemeContext()`, which throws a
named error if called outside a provider.

---

## Entry points

The package has three JavaScript entry points. **Which one you import from is
not a style preference — importing heavy components from the wrong one breaks or
bloats consumer builds.**

| Import specifier   | Contents                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| `@nucel/ui`        | Everything except the editors — 175 exported names                              |
| `@nucel/ui/monaco` | `CodeEditor`, `DiffEditor`, `ThreeWayMerge`, `loadMonaco`, `resolveMonacoTheme` |
| `@nucel/ui/editor` | `RichEditor` (Tiptap)                                                           |

### Why Monaco is a separate entry

`utils/monacoLoader.ts` imports Monaco's web workers using Vite's `?worker`
query:

```ts
await import('monaco-editor/esm/vs/language/typescript/ts.worker?worker');
```

Those imports are dynamic and lazy at runtime, but a bundler's dependency
optimizer scans them **statically**. Re-exporting the loader from the main
barrel pulled Monaco into every consumer's optimize pass, including apps that
never render an editor — and under Vite 8's rolldown pre-bundler the `?worker`
query fails outright.

Keeping these exports in `monaco.ts` means the main `@nucel/ui` barrel is
Monaco-free and pre-bundles cleanly. Only code that imports `@nucel/ui/monaco`
pulls the editor and its workers.

Consumers should never import `monaco-editor` directly — always go through
`loadMonaco()`, which is browser-only (returns `null` during SSR), registers
`window.MonacoEnvironment.getWorker` once, and memoizes the in-flight promise.

### Why the Tiptap editor is a separate entry

`RichEditor.svelte` statically imports `@tiptap/core`, `@tiptap/starter-kit` and
around 19 extensions at module scope, plus `tippy.js` via the mention
suggestion. Re-exporting it from the main barrel dragged the entire
Tiptap/ProseMirror graph — roughly 400–700 KB — into every consumer's bundle.
Same failure class as Monaco, but silent: it bloats instead of erroring.

### Known issue: `?worker` breaks consumers' browser-mode test bundlers

This one is unfixed upstream and consumers have to work around it.

The `?worker` suffix is Vite dev/build sugar. It is **not** rewritten by
vitest's browser-mode dependency pre-bundler, which runs before the user plugin
pipeline. Any consumer that imports `@nucel/ui/monaco` (directly or
transitively) from a browser-mode vitest project hits:

```
UNLOADABLE_DEPENDENCY: Could not load …/ts.worker.js?worker
```

and the whole module graph fails to load — the suite cannot start. It is sneaky
because `vite build` and `svelte-check` both pass; only the test bundler chokes,
and only in browser-mode projects.

Consumer workaround, test config only (see `web/vitest.config.ts` in the `web`
repo for a working copy):

1. A small Vite plugin that resolves any `*?worker` id to an inert `Worker`
   class stub.
2. `optimizeDeps.exclude: ['@nucel/ui', 'monaco-editor']` on **every**
   browser-mode project, so those modules go through the plugin pipeline instead
   of being pre-bundled. A project-level `plugins` array overrides the root one,
   so the stub plugin has to be re-listed per project.

The proper fix belongs here, not in every consumer: construct the workers behind
a function call so no `?worker` specifier is statically reachable from module
scope. Splitting Monaco into its own subpath (done) reduced the blast radius to
consumers who actually use the editors; it did not remove the problem for them.

---

## What is in the library

`src/lib` holds 169 `.svelte` files. The main barrel exports 175 names. Rather
than list every one, here is the shape:

**bits-ui / shadcn primitives** (26 directories under `components/ui/`) —
accordion, avatar, badge, breadcrumb, button, card, collapsible, dialog,
dropdown-menu, input, label, navigation-menu, progress, scroll-area, select,
separator, sheet, skeleton, sonner (toasts), table, tabs, textarea, toggle,
toggle-group, tooltip, plus the `editor` directory backing `RichEditor`. These
follow the shadcn convention of a `Root`/`Content`/`Trigger` family re-exported
under flat names (`Dialog`, `DialogContent`, `DialogTrigger`, …).

**Composites** — `DataTable` (with `ColumnDef` / `SortDirection` types),
`Combobox`, `CommandPalette`, `Pagination`, `Breadcrumbs`, `DateRangePicker`
(with presets), `SearchInput`, `Drawer`, `ConfirmDialog` (async/busy states and
optional type-to-confirm, meant to replace hand-rolled `window.confirm()`),
`Popover`, `Switch`, `Checkbox`, `Radio`/`RadioGroup`, `Form`/`FormField`
(Inertia-friendly defaults), `ColorInput`, `IconButton`, `CopyButton`.

**Code and content rendering** — `CodeBlock` and `InlineCode` (Shiki-highlighted;
`getShikiHighlighter` / `loadShikiLanguage` / `detectLanguageFromPath` are
exported so you can warm the highlighter early), `MarkdownRenderer` (marked +
DOMPurify — read the sanitizer note above).

**Status and dashboard pieces** — `StatusDot`, `StatusBadge`, `StatusPill`,
`ReviewBadge`, `BranchPill`, `CommentPill`, `CountBadge`, `PermissionChips`,
`Sparkline`, `ProgressRing`, `StatCard`, `ListCard`, `AppCard`, `EmptyState`,
`Skeleton`, `Alert`, `ProviderIcon`, `ReactionBar`.

**Layout and navigation** — `PageHeader`, `Section`/`SectionTitle`, `TabBar`,
`Backdrop`, `VerticalSeparator`, `KbdShortcut`, `Kanban{Board,Column,Card}`.

**Mobile primitives** — `BottomSheet` and `Fab`, both defaulting to `md:hidden`
so desktop layouts are untouched.

**Editors** (separate entries, see above) — `CodeEditor`, `DiffEditor`,
`ThreeWayMerge`, `RichEditor`.

Two files in this tree are dead: `components/UserAvatar.svelte` and
`utils/relativeTime.ts` are not exported from any entry point. Both are live in
published `0.25.0`, at different paths — another symptom of the drift described
above.

### Usage

```svelte
<script>
	import { Card, CardHeader, CardTitle, CardContent, StatusBadge, Sparkline } from '@nucel/ui';
</script>

<Card>
	<CardHeader>
		<CardTitle>Pipeline</CardTitle>
	</CardHeader>
	<CardContent>
		<StatusBadge status="running" />
		<Sparkline data={[10, 25, 15, 30, 20, 35, 28]} />
	</CardContent>
</Card>
```

Storybook is the reference for props and variants — every component with a story
is documented there with live controls. See Development below.

---

## Where this fits in Nucel

Nucel is a self-hosted software development platform — git hosting, pull
requests, an OCI and npm registry, Pages, CI, and agent workflows. Its repos:

- **`nucel`** — the platform itself: `nucel-server` (Rust), the Svelte/Inertia
  frontend, CLI and SDKs. The frontend is this library's primary consumer.
- **`web`** — the nucel.dev marketing and docs site. Second consumer.
- **`charts`**, **`nucel-infra`** — Helm charts and OpenTofu for deployment.
- **`agent-operator`**, **`nucel-ci-operator`**, **`agent-sdk`** — Kubernetes
  operators and the agent SDK.
- **`nucel-qa`**, **`qa-action`** — QA suite and its CI action.

This repo has no dependency on any of them. It is a leaf: plain Svelte
components, no API client, no Nucel server calls. The coupling runs the other
way, and only through npm.

Per project convention, reusable Svelte components belong **here**, not in
`nucel/frontend/src/lib/ui`. That directory does still hold local copies of
`Switch`, `Checkbox`, `Radio`, `StatCard`, `EmptyState`, `Skeleton` and the
Kanban pieces — because the upstream `Switch` and `Checkbox` lack an `ariaLabel`
prop and a few APIs have not been reconciled. Adding `ariaLabel` upstream is
what unblocks deleting those copies.

---

## Development

Requires [bun](https://bun.sh). Per project convention bun is managed by mise,
so commands are prefixed with `mise exec --`.

```bash
mise exec -- bun install
```

| Command                           | What it does                                                   |
| --------------------------------- | -------------------------------------------------------------- |
| `bun run dev`                     | Vite dev server for the scratch playground in `src/App.svelte` |
| `bun run storybook`               | Storybook on :6006 — the real component workbench              |
| `bun run check`                   | `svelte-check` typecheck                                       |
| `bun run lint`                    | ESLint                                                         |
| `bun run format` / `format:check` | Prettier write / verify                                        |
| `bun run test`                    | vitest: jsdom unit tests + Storybook story tests               |
| `bun run build`                   | `vite build` library bundle into `dist/`                       |
| `bun run build-storybook`         | Static Storybook into `storybook-static/`                      |

### Current state of those commands on `main`

Verified by running each in a clean checkout of `main` (`31fff88`). Two of them
fail, and it is pre-existing debt rather than anything you broke:

- `bun run check` — **passes.** 0 errors, 6 warnings (three `state_referenced_locally`
  in `Fab` / `ReactionBar`, three a11y warnings in `RichEditor`).
- `bun run build` — **passes.** Emits 127 files into `dist/`.
- `bun run test` — the `unit` project **passes** (2 files, 17 tests: the
  `markdownSanitize` payload suite and the `ConfirmDialog` cancel-semantics
  suite). The `storybook` project drives 44 stories through real Chromium and
  needs browsers installed first:

  ```bash
  mise exec -- bunx playwright install chromium
  ```

  Without that, `bun run test` exits non-zero even though the unit tests passed.

- `bun run lint` — **fails**: 23 errors, 4 warnings across 13 files. Mostly
  `no-explicit-any` in the Tiptap glue (`mention-suggestion.ts`,
  `slash-commands.ts`) plus a handful of unused vars and `{@html}` warnings.
  Known, deliberately deferred debt.
- `bun run format:check` — **fails**: 57 files, almost all under `src/stories/`.

### Testing

Two vitest projects, configured in `vitest.config.ts`:

1. **`unit`** — jsdom, `src/**/*.{test,spec}.{js,ts}`, setup in
   `src/tests/setup.ts`. Two suites today.
2. **`storybook`** — `@storybook/addon-vitest` running every `*.stories.svelte`
   play function in headless Chromium via Playwright.

The a11y addon is enabled in Storybook, so accessibility violations surface in
the Storybook UI, but they are not currently a gate.

---

## CI

`.nucel-ci.yml` defines a three-job pipeline (`lint` → `test`, `build`) intended
to run on Nucel's own self-hosted CI — the library dogfooding the platform.

**It has never gone green, and cannot currently run.** Being explicit, because a
CI file is easy to mistake for a working gate:

- On the deployed Nucel instance, the CI worker never starts. `NUCEL_CI_K8S_URL`
  is unset and there is no Docker socket in the server pod, so no pipeline
  executes at all.
- Even with an executor, the `lint` job fails on `main` (see above), and `test`
  and `build` both `needs: [lint]`, so nothing downstream would run.
- The `test` job runs `bun run test` without installing Playwright browsers.
- The `build` job's verify step checks for `dist/index.js`, but `vite build`
  emits `dist/ui.js` — the library entry is named after the package. That check
  fails against a successful build.

There is no GitHub Actions workflow and no CodeBuild config here. Nothing gates
a merge or a publish today; the scripts above are local hygiene.

---

## Publishing

The published package ships **source**: `files` is `src/lib` plus
`src/styles.css`, with tests excluded. `dist/` is not published, and
`prepublishOnly` only echoes — so `bun run build` is a smoke test, not the
release artifact.

`publish.sh` wraps the release: it refuses to run unless `npm whoami` succeeds,
refuses to re-publish an already-published version, typechecks, shows a
`--dry-run` file list, and prompts before `npm publish --access public`.

```bash
bash publish.sh
```

Before publishing anything from this tree, resolve the drift described at the
top. Publishing `main` as-is would remove components that `^0.25.0` consumers
already depend on.

Two things to remember when bumping consumers:

- Check whether the `nucel` monorepo root `package.json` declares `@nucel/ui` as
  well as `nucel/frontend/package.json`. It does not today, but it has before,
  and when it does, bumping only the frontend leaves the root pinning the old
  version — bun hoists the root copy above the frontend one and the app silently
  resolves the stale version.
- `web` and `nucel/frontend` are currently on different pins (`^0.21.0` and
  `^0.25.0`). They should converge.

---

## Contributing

1. Branch from `main`.
2. Add the component under `src/lib/components/` (composites and app-level
   pieces) or `src/lib/components/ui/` (primitives and small display elements).
3. Export it from `src/lib/index.ts` — **unless** it statically pulls a heavy
   dependency graph at module scope. Monaco and Tiptap components go in
   `src/lib/monaco.ts` and `src/lib/editor.ts` respectively. If you add a third
   heavy dependency, give it its own subpath entry and a matching `exports` key
   in `package.json`; do not put it in the main barrel.
4. Add a `*.stories.svelte` under `src/stories/`. Stories are the documentation.
5. Add a unit test for anything with logic worth pinning — sanitization,
   cancel/confirm semantics, keyboard handling.
6. Run `bun run check` and `bun run test` locally. `lint` and `format:check`
   fail on `main` already; keep your diff from making them worse, and if you fix
   some of the existing debt do it in its own commit.

Component conventions:

- Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`). No legacy stores.
- Style with theme tokens (`bg-bg-elevated`, `text-fg-muted`, `border-danger`)
  rather than raw palette colours, so dark mode works without extra work.
- Merge classes with the exported `cn()` helper and accept a `class` prop.
- Anything touching `window` must be SSR-safe — guard with
  `typeof window === 'undefined'` or do the work in `onMount`.
- Interactive components need an accessible name. `ariaLabel` props are the
  current gap keeping consumers on local copies; new components should not
  repeat it.

## License

MIT © Nucel
