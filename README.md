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

`monaco-editor` is declared differently on npm `latest` than in this tree, and
the difference is worth knowing before you install:

- **npm `latest` (`0.25.0`)** moved it into hard `dependencies` as
  `monaco-editor@^0.55.1`. Every consumer gets it whether or not they ever
  import `@nucel/ui/monaco` — 75 MB unpacked. You do not need to install it
  yourself. Verified with `bun add @nucel/ui@0.25.0` in an empty project:
  `node_modules/monaco-editor` lands at `0.55.1`.
- **This tree and published `0.21.0`** declare it as an _optional_ peer
  (`^0.52.0 || ^0.55.0`, with `peerDependenciesMeta.monaco-editor.optional`).
  The same probe against `0.21.0` installs no `monaco-editor` at all, so add it
  yourself if you use the editors.

The entry-point split described below is another axis of that divergence, and it
cuts the other way: keeping the editors **out** of the main barrel exists only in
this tree. Published `0.25.0` does have the `./monaco` and `./editor` subpaths,
but as _additional_ entries — its main barrel still exports the editors too.
`package/src/lib/index.ts` in the `0.25.0` tarball exports `CodeEditor`,
`DiffEditor`, `ThreeWayMerge`, `loadMonaco` and `resolveMonacoTheme` (lines
326-338) alongside `RichEditor` (line 431).

So on `latest` the barrel does have an import path to Monaco: `index.ts:328`
re-exports `./components/CodeEditor.svelte`, whose line 5 is a static
`import { loadMonaco, resolveMonacoTheme } from '../utils/monacoLoader.js'`, and
`utils/monacoLoader.ts:95` does `await import('monaco-editor')`, with the
`?worker` dynamic imports on lines 56-85 above it. That is the arrangement the section below describes as pulling
Monaco into every consumer's optimize pass — so on `0.25.0` the hard dependency
is not only an install-size cost. This tree's barrel has no such path
(`src/lib/index.ts:315-319` is the comment recording the move).

### Styles

The package exports a stylesheet holding the Tailwind v4 theme tokens the
components render against. Import it once, at the top of your app CSS:

```css
@import '@nucel/ui/styles.css';
```

It pulls in `tailwindcss` itself, so do not import Tailwind again alongside it,
and it defines raw semantic tokens (`--bg`, `--fg`, `--fg-muted`, `--success`,
`--warning`, `--danger`, …) on `:root` with dark values under `.dark`, maps them
into Tailwind utilities through `@theme inline`, and keeps the legacy shadcn
token names (`--background`, `--foreground`, `--primary`, …) aliased so existing
`bg-background` / `text-foreground` classes keep working.

#### You also need an `@source` line

The stylesheet carries tokens only. It does not tell Tailwind where the classes
the components use actually live, and Tailwind v4's automatic content detection
skips `node_modules` — so any utility that appears only inside `@nucel/ui`
source, and nowhere in your own markup, is never generated. Point Tailwind at
the installed package too:

```css
@import '@nucel/ui/styles.css';
@source './node_modules/@nucel/ui/src/lib';
```

`@source` resolves relative to the CSS file it appears in, which is why the
package cannot ship one for you — the path above assumes the CSS file sits at
the project root. `nucel/frontend/src/app.css` uses
`@source "../node_modules/@nucel/ui/src"`; `web/src/routes/layout.css` uses
`@source '../../node_modules/@nucel/ui/src/lib'`.

Omitting it does not error, it just yields components with missing styles. In
`nucel/frontend` that silently dropped `focus-visible:ring-[3px]` from `<Input>`
and `<Textarea>`, so keyboard users got no focus ring at all (fixed as NUC-062).
Measured on a clean `0.25.0` install: the same CSS entry compiles to 14 KB
without the `@source` line and 162 KB with it, and not one `ring-*` utility is
emitted without it.

#### `@import '@nucel/ui/styles.css'` is broken on `0.25.0`

The shipped `src/styles.css` starts with `@import 'tailwindcss'` and
`@import 'tw-animate-css'`, but `0.25.0` dropped `tw-animate-css` from
`dependencies` (this tree still has it, at `^1.4.0`). On a clean `0.25.0`
install the import fails to resolve:

```
Error: Can't resolve 'tw-animate-css' in '…/node_modules/@nucel/ui/src'
```

Add `tw-animate-css` to your own dependencies as a workaround. This is the same
class of problem as the sanitizer regression above: a published version that
does not match the tree it was cut from. Neither consumer hit it, because
neither actually imports `@nucel/ui/styles.css` — both inline their own copy of
the token blocks, which is its own drift worth closing.

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

That table describes this tree. Published `0.25.0` exposes the same three
specifiers, but its `@nucel/ui` barrel also exports the editors, so the rest of
this section explains a property only this tree currently has.

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

### Known issue: `?worker` breaks consumers' dependency pre-bundlers

This one is unfixed upstream and consumers have to work around it, in their app
config as well as their test config.

The `?worker` suffix is Vite transform-pipeline sugar. It is **not** rewritten
by a dependency pre-bundler, which runs _before_ the user plugin pipeline. Two
pre-bundlers hit it:

- **vitest browser mode.** Any consumer that imports `@nucel/ui/monaco`
  (directly or transitively) from a browser-mode project fails to load the
  module graph, so the suite cannot start.
- **`vite dev` on Vite 8.** The rolldown pre-optimizer resolves the literal
  `…worker.js?worker` path, which does not exist on disk, and the dev server
  crashes in dependency optimization.

Both surface as:

```
UNLOADABLE_DEPENDENCY: Could not load …/ts.worker.js?worker
```

It is sneaky because `vite build` and `svelte-check` both pass — only the
pre-bundlers choke.

Consumer workaround, in the app's `vite.config.ts`:

1. `optimizeDeps.exclude: ['@nucel/ui', 'monaco-editor']`, so those modules go
   through the normal transform pipeline (which rewrites `?worker` correctly)
   instead of being pre-bundled. Both `web/vite.config.ts` and
   `nucel/frontend/vite.config.ts` carry exactly this.
2. Optionally a small `enforce: 'pre'` plugin that resolves any `*?worker` id to
   an inert `Worker` class stub, scoped with `apply: 'serve'` so the production
   build keeps Vite's real `?worker` transform. `web/vite.config.ts` has one
   (`stubWorkerImports`).

And again in `vitest.config.ts` for browser-mode projects — `web/vitest.config.ts`
is a working copy. The same two pieces, with one extra wrinkle: a project-level
`plugins` array overrides the root one, so the stub plugin has to be re-listed
per project, and `optimizeDeps.exclude` has to be set on **every** browser-mode
project rather than once at the root.

The proper fix belongs here, not in every consumer: construct the workers behind
a function call so no `?worker` specifier is statically reachable from module
scope. Splitting Monaco into its own subpath (done) reduced the blast radius to
consumers who actually use the editors; it did not remove the problem for them.

### Known issue: duplicate Tiptap/ProseMirror instances

Consumers that render `RichEditor` _and_ import Tiptap themselves need a second
workaround, because this package ships raw Svelte source. Its `@tiptap/*`
imports resolve through the main resolver while the app's own resolve to
pre-bundled chunks, which yields two `prosemirror-model` instances — and every
cross-instance document operation dies with:

```
RangeError: Can not convert <> to a Fragment
```

`nucel/frontend/vite.config.ts` works around it by listing the editor graph in
both `resolve.dedupe` (`@tiptap/core`, `@tiptap/pm`, `@tiptap/suggestion`,
`prosemirror-model`, `prosemirror-state`, `prosemirror-view`,
`prosemirror-transform`) and `optimizeDeps.exclude` (the same plus
`@tiptap/starter-kit` and every `@tiptap/extension-*` in use), so both sides go
through one resolver. `web` does not need it — it does not use `RichEditor`.

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

**Mobile primitives** — `BottomSheet` and `Fab`. Only `Fab` hides itself on
desktop: it composes `md:hidden` into its class list unless you pass
`alwaysVisible`. `BottomSheet` has no responsive behaviour of its own — it is a
`Sheet` with `side="bottom"`, a grabber handle and a safe-area inset, and it
renders at every width. Wrap its trigger in your own `md:hidden` element if
desktop should keep a dropdown instead.

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
`nucel/frontend/src/lib/ui`. That directory is a long way from that convention:
it holds 44 `.svelte` files and 37 of them share a filename with a component
published in `@nucel/ui@0.25.0`. Not only the primitives (`Switch`, `Checkbox`,
`Radio`, `Skeleton`, `StatCard`, `EmptyState`, the Kanban pieces) but the entire
domain set the drift section above lists as present in `0.25.0` —
`ActivityFeed`, `FileTree`, `JobDag`, `MissionRow`, `PrRow`, `PrStateBadge`,
`ReviewThread`, `RepoHeader`, `StatusChecksList`, `StepTimeline`, `Timeline`,
`CloneMenu` — and `CodeEditor` and the filter bars on top of that. Only 7 of the
44 have no same-named component upstream.

The reasons recorded in the copies are stale: `Switch.svelte` says it exists
because "the installed @nucel/ui (0.10.0) does not export a Switch",
`Checkbox.svelte` cites `v0.3.0`. `0.25.0` exports both, and its `Switch`
already has the `ariaLabel` prop. So this is not one missing prop away from
resolution — it is an unreconciled fork, and closing it means diffing 37 pairs
of files. The `ariaLabel` gap that genuinely remains is on `Checkbox` and
`Radio` (missing in both trees) and on this tree's `Switch`.

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

Verified by running each against the code on `main` (`31fff88`; this branch
changes nothing but `README.md`). Two of them fail, and it is pre-existing debt
rather than anything you broke:

- `bun run check` — **passes.** 0 errors, 6 warnings (three `state_referenced_locally`
  in `Fab` / `ReactionBar`, three a11y warnings in `RichEditor`).
- `bun run build` — **passes.** Emits 127 files into `dist/`. The library entry
  is `dist/ui.js`, not `dist/index.js` — see CI below.
- `bun run dev` — **passes.** Vite 8 dev server on :5173, with an experimental
  `vite-plugin-svelte` banner about rolldown.
- `bun run storybook` — **passes.** Serves on :6006.
- `bun run build-storybook` — **passes.** Emits 215 files into
  `storybook-static/`.
- `bun run test` — the `unit` project **passes** (2 files, 17 tests: the
  `markdownSanitize` payload suite and the `ConfirmDialog` cancel-semantics
  suite). The `storybook` project drives 44 stories through real Chromium and
  needs browsers installed first:

  ```bash
  mise exec -- bunx playwright install chromium
  ```

  Without that, `bun run test` exits non-zero even though the unit tests passed.
  Only the `unit` project has been run green here; the story suite has not.

- `bun run lint` — **fails**: 23 errors, 4 warnings across 13 files. Mostly
  `no-explicit-any` in the Tiptap glue (`mention-suggestion.ts`,
  `slash-commands.ts`) plus a handful of unused vars and `{@html}` warnings.
  Known, deliberately deferred debt.
- `bun run format:check` — **fails**: 57 files. It is mostly library source, not
  stories: 48 under `src/lib/`, 8 under `src/stories/`, plus `package.json`.

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
- Even with an executor, the `lint` job fails on `main` (see above) at its very
  first step: it runs `format:check` before `eslint` and `check`, so it stops on
  the 57 unformatted files and never reaches the other two. `test` and `build`
  both `needs: [lint]`, so nothing downstream would run either.
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
- Interactive components need an accessible name. `Checkbox` and `Radio` have no
  `ariaLabel` prop in either this tree or `0.25.0`, and this tree's `Switch` is
  missing the one `0.25.0` already ships. New components should not repeat the
  gap.

## License

MIT © Nucel
