/**
 * Monaco Editor lazy loader.
 *
 * Why a dedicated loader:
 * - `monaco-editor` is ~3-5MB un-gzipped. Importing it eagerly would bloat
 *   the initial bundle of every consumer of `@nucel/ui`. We always load it
 *   lazily via dynamic `import()`.
 * - Monaco's web workers must be told where to load their JS from via the
 *   global `MonacoEnvironment.getWorker` hook. We register this once per
 *   page, on the first call.
 * - The whole thing is browser-only (no `window` → bail out) so it stays
 *   SSR-safe.
 *
 * Worker bundling: each worker is imported with Vite's `?worker` query.
 * Vite (and Storybook with the Vite builder) emits a separate chunk for
 * each one, so they're code-split and downloaded on demand.
 *
 * Consumers should NOT import `monaco-editor` directly — always go through
 * `loadMonaco()`.
 */

import type * as MonacoNs from 'monaco-editor';

let monacoPromise: Promise<typeof MonacoNs> | null = null;
let themesRegistered = false;

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		MonacoEnvironment?: {
			getWorker?: (workerId: string, label: string) => Worker | Promise<Worker>;
			getWorkerUrl?: (workerId: string, label: string) => string;
		};
	}
}

/**
 * Lazily load Monaco. Safe to call from any environment; resolves to `null`
 * during SSR. Subsequent calls return the same in-flight promise.
 */
export function loadMonaco(): Promise<typeof MonacoNs> | null {
	if (typeof window === 'undefined') return null;
	if (monacoPromise) return monacoPromise;

	monacoPromise = (async () => {
		// Register the worker factory before any editor is created.
		// Each worker is imported as a Vite `?worker` for proper code-splitting.
		// `getWorker` may return a promise, which Monaco awaits internally.
		if (!window.MonacoEnvironment) {
			window.MonacoEnvironment = {
				getWorker: async (_workerId: string, label: string): Promise<Worker> => {
					// Dynamic `?worker` imports return `{ default: WorkerCtor }`.
					// Vite emits a separate chunk per worker.
					switch (label) {
						case 'json': {
							const { default: WorkerCtor } = await import(
								'monaco-editor/esm/vs/language/json/json.worker?worker'
							);
							return new WorkerCtor();
						}
						case 'css':
						case 'scss':
						case 'less': {
							const { default: WorkerCtor } = await import(
								'monaco-editor/esm/vs/language/css/css.worker?worker'
							);
							return new WorkerCtor();
						}
						case 'html':
						case 'handlebars':
						case 'razor': {
							const { default: WorkerCtor } = await import(
								'monaco-editor/esm/vs/language/html/html.worker?worker'
							);
							return new WorkerCtor();
						}
						case 'typescript':
						case 'javascript': {
							const { default: WorkerCtor } = await import(
								'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
							);
							return new WorkerCtor();
						}
						default: {
							const { default: WorkerCtor } = await import(
								'monaco-editor/esm/vs/editor/editor.worker?worker'
							);
							return new WorkerCtor();
						}
					}
				},
			};
		}

		const monaco = await import('monaco-editor');
		registerNucelThemes(monaco);
		return monaco;
	})();

	return monacoPromise;
}

/**
 * Register two custom Monaco themes loosely matched to the nucel design
 * tokens. We pin bg/fg/border/cursor/selection to nucel values and let
 * Monaco's built-in `vs` / `vs-dark` cover the rest of the token palette.
 *
 * Monaco wants hex colors (#rrggbb / #rrggbbaa) which means we can't pipe
 * our oklch tokens through directly. The values below are hand-tuned to
 * match the surface/foreground colors used elsewhere in @nucel/ui.
 */
function registerNucelThemes(monaco: typeof MonacoNs): void {
	if (themesRegistered) return;
	themesRegistered = true;

	monaco.editor.defineTheme('nucel-light', {
		base: 'vs',
		inherit: true,
		rules: [],
		colors: {
			'editor.background': '#ffffff',
			'editor.foreground': '#0f172a',
			'editorLineNumber.foreground': '#94a3b8',
			'editorLineNumber.activeForeground': '#0f172a',
			'editor.selectionBackground': '#dbeafe',
			'editor.inactiveSelectionBackground': '#e2e8f0',
			'editorCursor.foreground': '#0f172a',
			'editor.lineHighlightBackground': '#f8fafc',
			'editorGutter.background': '#ffffff',
			'editorWidget.background': '#ffffff',
			'editorWidget.border': '#e2e8f0',
			'diffEditor.insertedTextBackground': '#bbf7d055',
			'diffEditor.removedTextBackground': '#fecaca55',
		},
	});

	monaco.editor.defineTheme('nucel-dark', {
		base: 'vs-dark',
		inherit: true,
		rules: [],
		colors: {
			'editor.background': '#0a0a0c',
			'editor.foreground': '#f1f5f9',
			'editorLineNumber.foreground': '#475569',
			'editorLineNumber.activeForeground': '#f1f5f9',
			'editor.selectionBackground': '#1e3a8a55',
			'editor.inactiveSelectionBackground': '#1e293b',
			'editorCursor.foreground': '#f1f5f9',
			'editor.lineHighlightBackground': '#13131a',
			'editorGutter.background': '#0a0a0c',
			'editorWidget.background': '#13131a',
			'editorWidget.border': '#1e293b',
			'diffEditor.insertedTextBackground': '#16653433',
			'diffEditor.removedTextBackground': '#7f1d1d33',
		},
	});
}

/** Resolve a "light" | "dark" | "auto" mode to a registered theme name. */
export function resolveMonacoTheme(mode: 'light' | 'dark' | 'auto'): string {
	if (typeof window === 'undefined') return 'nucel-light';
	if (mode === 'auto') {
		const isDark = document.documentElement.classList.contains('dark');
		return isDark ? 'nucel-dark' : 'nucel-light';
	}
	return mode === 'dark' ? 'nucel-dark' : 'nucel-light';
}
