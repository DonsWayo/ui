<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	export type Theme = 'light' | 'dark' | 'system';
	export type ResolvedTheme = 'light' | 'dark';

	export type ThemeContext = {
		/** The user's preference: 'light' | 'dark' | 'system'. */
		readonly theme: Theme;
		/** The currently applied theme after resolving 'system'. Always 'light' or 'dark'. */
		readonly resolved: ResolvedTheme;
		/** Update the user's preference. Persists to localStorage. */
		setTheme: (t: Theme) => void;
		/** Cycle system -> light -> dark -> system. */
		cycleTheme: () => void;
	};

	const THEME_CONTEXT_KEY = Symbol('@nucel/ui:theme');

	/** Read the ThemeProvider context from a descendant component. */
	export function getThemeContext(): ThemeContext {
		const ctx = getContext<ThemeContext | undefined>(THEME_CONTEXT_KEY);
		if (!ctx) {
			throw new Error(
				'[@nucel/ui] getThemeContext() called outside a <ThemeProvider>. Wrap your app in <ThemeProvider> first.',
			);
		}
		return ctx;
	}

	function _setThemeContext(ctx: ThemeContext): void {
		setContext(THEME_CONTEXT_KEY, ctx);
	}

	export { _setThemeContext };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, untrack } from 'svelte';

	type Props = {
		/** Initial theme preference. Defaults to 'system'. */
		defaultTheme?: Theme;
		/** localStorage key used for persistence. */
		storageKey?: string;
		/** Class to apply to the html element for dark mode. Default 'dark'. */
		darkClass?: string;
		/** Element/attribute target. Default 'html'. */
		attribute?: 'html' | 'body';
		children?: Snippet;
	};

	let {
		defaultTheme = 'system',
		storageKey = 'nucel-ui-theme',
		darkClass = 'dark',
		attribute = 'html',
		children,
	}: Props = $props();

	function isTheme(v: unknown): v is Theme {
		return v === 'light' || v === 'dark' || v === 'system';
	}

	function readStoredTheme(): Theme {
		if (typeof localStorage === 'undefined') return defaultTheme;
		try {
			const raw = localStorage.getItem(storageKey);
			return isTheme(raw) ? raw : defaultTheme;
		} catch {
			return defaultTheme;
		}
	}

	function getSystemPreference(): ResolvedTheme {
		if (typeof window === 'undefined' || !window.matchMedia) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Initial value: capture the prop once. Subsequent changes flow through `setTheme`.
	// eslint-disable-next-line svelte/no-reactive-reassign
	let theme = $state<Theme>(untrack(() => defaultTheme));
	let systemPref = $state<ResolvedTheme>('light');

	const resolved = $derived<ResolvedTheme>(theme === 'system' ? systemPref : theme);

	onMount(() => {
		// Hydrate from localStorage on mount (avoids SSR mismatch).
		theme = readStoredTheme();
		systemPref = getSystemPreference();

		const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
		if (!mql) return;

		const onChange = (e: MediaQueryListEvent) => {
			systemPref = e.matches ? 'dark' : 'light';
		};

		// Modern API + Safari fallback.
		if (typeof mql.addEventListener === 'function') {
			mql.addEventListener('change', onChange);
			return () => mql.removeEventListener('change', onChange);
		} else if (typeof (mql as MediaQueryList).addListener === 'function') {
			(mql as MediaQueryList).addListener(onChange);
			return () => (mql as MediaQueryList).removeListener(onChange);
		}
	});

	// Apply the resolved theme to the DOM whenever it changes.
	$effect(() => {
		if (typeof document === 'undefined') return;
		const target = attribute === 'body' ? document.body : document.documentElement;
		if (!target) return;
		if (resolved === 'dark') {
			target.classList.add(darkClass);
			target.style.colorScheme = 'dark';
		} else {
			target.classList.remove(darkClass);
			target.style.colorScheme = 'light';
		}
	});

	function setTheme(next: Theme) {
		theme = next;
		try {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(storageKey, next);
			}
		} catch {
			// localStorage unavailable (private mode / quota); silently ignore.
		}
	}

	function cycleTheme() {
		// system -> light -> dark -> system
		const next: Theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
		setTheme(next);
	}

	// Publish a stable context object whose getters always read the latest reactive state.
	_setThemeContext({
		get theme() {
			return theme;
		},
		get resolved() {
			return resolved;
		},
		setTheme,
		cycleTheme,
	});

</script>

{#if children}
	{@render children()}
{/if}
