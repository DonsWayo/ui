/**
 * Lazy, cached Shiki highlighter shared across all CodeBlock instances.
 *
 * Strategy:
 *  - One singleton `HighlighterCore` created via `createHighlighter` from
 *    `shiki/bundle/web` (web bundle — no fs / oniguruma node dependency).
 *  - Themes (`github-light`, `github-dark`) and `plaintext` are loaded
 *    eagerly on first `getHighlighter()` call.
 *  - Additional languages are loaded on-demand via `loadLanguage(...)`.
 *  - SSR-safe: callers must guard with `typeof window !== 'undefined'` or
 *    invoke from `onMount()`. The Shiki web bundle pulls in an Oniguruma
 *    WASM payload that is not appropriate for SSR.
 */

import type { Highlighter, BundledLanguage, BundledTheme } from 'shiki/bundle/web';

export const SHIKI_LIGHT_THEME: BundledTheme = 'github-light';
export const SHIKI_DARK_THEME: BundledTheme = 'github-dark';

export const SHIKI_DEFAULT_LANGS: BundledLanguage[] = ['plaintext' as BundledLanguage];

let highlighterPromise: Promise<Highlighter> | null = null;
const loadedLangs = new Set<string>(['plaintext']);
const inFlightLangs = new Map<string, Promise<void>>();

/**
 * Get (or create) the singleton highlighter.
 * Idempotent — subsequent calls return the cached promise.
 */
export function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = import('shiki/bundle/web').then(({ createHighlighter }) =>
			createHighlighter({
				themes: [SHIKI_LIGHT_THEME, SHIKI_DARK_THEME],
				langs: SHIKI_DEFAULT_LANGS,
			}),
		);
	}
	return highlighterPromise;
}

/**
 * Lazily register a language with the shared highlighter.
 * Idempotent and safe to call concurrently from many CodeBlock instances.
 */
export async function loadLanguage(lang: string): Promise<void> {
	if (!lang || lang === 'plaintext' || loadedLangs.has(lang)) return;

	const inFlight = inFlightLangs.get(lang);
	if (inFlight) return inFlight;

	const task = (async () => {
		const highlighter = await getHighlighter();
		try {
			await highlighter.loadLanguage(lang as BundledLanguage);
			loadedLangs.add(lang);
		} catch (err) {
			// Unknown language — fall back silently to plaintext at render time.
			// (Don't throw — failed highlighting should never break the consumer page.)
			console.warn(`[@nucel/ui CodeBlock] Unknown language "${lang}":`, err);
		} finally {
			inFlightLangs.delete(lang);
		}
	})();

	inFlightLangs.set(lang, task);
	return task;
}

/**
 * Returns the Shiki language to use, falling back to `plaintext` if the
 * requested language hasn't been loaded yet (or failed to load).
 */
export function resolveLang(lang: string): string {
	if (!lang) return 'plaintext';
	if (loadedLangs.has(lang)) return lang;
	return 'plaintext';
}
