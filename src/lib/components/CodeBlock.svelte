<script lang="ts">
	import { CheckIcon, CopyIcon } from '@lucide/svelte';
	import { getContext, onMount } from 'svelte';
	import { cn } from '../utils.js';
	import {
		getHighlighter,
		loadLanguage,
		resolveLang,
		SHIKI_LIGHT_THEME,
		SHIKI_DARK_THEME,
	} from '../utils/shikiHighlighter.js';
	import type { ThemeContext } from './ThemeProvider.svelte';

	type Theme = 'light' | 'dark' | 'auto';

	type Props = {
		/** Source code to render. */
		code: string;
		/** Shiki language id. Unknown values fall back to `plaintext`. */
		language?: string;
		/** Theme. `auto` follows the nearest `<ThemeProvider>`. Defaults to `auto`. */
		theme?: Theme;
		/** Optional filename shown in the header. */
		filename?: string;
		/** Render gutter line numbers (default `false`). */
		showLineNumbers?: boolean;
		/** Soft-wrap long lines (default `false` — horizontal scroll). */
		wrap?: boolean;
		/** Show the copy button (default `true`). */
		copyable?: boolean;
		/**
		 * Backwards-compat alias for `copyable`. Older callers (0.5/0.6/0.7) still
		 * use `showCopy`; honour it but prefer `copyable` going forward.
		 */
		showCopy?: boolean;
		/** Max height before the body becomes scrollable. Default `60vh`. */
		maxHeight?: string;
		class?: string;
	};

	let {
		code,
		language = 'plaintext',
		theme = 'auto',
		filename,
		showLineNumbers = false,
		wrap = false,
		copyable = true,
		showCopy,
		maxHeight = '60vh',
		class: className,
	}: Props = $props();

	// Honor the legacy `showCopy` prop if a caller still passes it.
	const showCopyButton = $derived(showCopy === undefined ? copyable : showCopy);

	// Read the ThemeProvider context if present. Doesn't throw — CodeBlock
	// renders just fine outside a ThemeProvider, it just won't auto-switch.
	const themeCtx = getContext<ThemeContext | undefined>(Symbol.for('@nucel/ui:theme')) as
		| ThemeContext
		| undefined;
	// Note: the ThemeProvider uses its own private symbol; we can't read it
	// directly. Fall back to inspecting the `.dark` class on <html> at render
	// time — that's the contract ThemeProvider commits to.
	let domDark = $state(false);

	const resolvedTheme = $derived<'light' | 'dark'>(
		theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : domDark ? 'dark' : 'light',
	);

	const shikiTheme = $derived(
		resolvedTheme === 'dark' ? SHIKI_DARK_THEME : SHIKI_LIGHT_THEME,
	);

	let highlightedHtml = $state<string | null>(null);
	let highlighterReady = $state(false);
	let copied = $state(false);

	// Derived snapshot of the props that affect highlighting output. When any
	// of them change we re-run Shiki.
	const highlightKey = $derived(
		[code, language, shikiTheme, showLineNumbers ? '1' : '0'].join(''),
	);

	onMount(() => {
		// Initial dark-class snapshot + observe for ThemeProvider toggles.
		const html = document.documentElement;
		const sync = () => {
			domDark = html.classList.contains('dark');
		};
		sync();

		const mo = new MutationObserver(sync);
		mo.observe(html, { attributes: true, attributeFilter: ['class'] });

		// Kick off the highlighter ASAP — subsequent CodeBlocks reuse the cache.
		(async () => {
			await getHighlighter();
			highlighterReady = true;
		})();

		return () => mo.disconnect();
	});

	// Re-render whenever the highlight inputs change.
	$effect(() => {
		// Track all reactive deps.
		void highlightKey;
		if (typeof window === 'undefined') return;

		let cancelled = false;
		(async () => {
			try {
				await loadLanguage(language);
				const hl = await getHighlighter();
				if (cancelled) return;
				const html = hl.codeToHtml(code, {
					lang: resolveLang(language),
					theme: shikiTheme,
					transformers: [
						{
							name: 'nucel:line-attrs',
							line(node, line) {
								node.properties = node.properties ?? {};
								(node.properties as Record<string, string | number>)['data-line'] =
									line;
							},
						},
					],
				});
				if (!cancelled) highlightedHtml = html;
			} catch (err) {
				// Highlighting should never break the page — fall back to plain rendering.
				console.warn('[@nucel/ui CodeBlock] Shiki render failed:', err);
				if (!cancelled) highlightedHtml = null;
			}
		})();

		return () => {
			cancelled = true;
		};
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard API can fail in insecure contexts — silently ignore.
		}
	}

	const lines = $derived(code.split('\n'));
</script>

<div
	data-slot="code-block"
	data-theme={resolvedTheme}
	class={cn(
		'bg-muted/40 border-border relative overflow-hidden rounded-lg border text-sm',
		className,
	)}
>
	{#if filename || showCopyButton || language}
		<div
			class="border-border bg-muted/60 flex items-center justify-between gap-2 border-b px-3 py-1.5"
		>
			<div class="text-muted-foreground flex items-center gap-2 text-xs font-medium">
				{#if filename}
					<span class="truncate">{filename}</span>
				{/if}
				{#if language && language !== 'plaintext'}
					<span class="bg-background rounded px-1.5 py-0.5 font-mono text-[10px] uppercase">
						{language}
					</span>
				{/if}
			</div>
			{#if showCopyButton}
				<button
					type="button"
					onclick={copy}
					aria-label="Copy code"
					class="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs outline-none focus-visible:ring-2"
				>
					{#if copied}
						<CheckIcon class="size-3.5" /> Copied
					{:else}
						<CopyIcon class="size-3.5" /> Copy
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	<div
		class="nucel-code-body overflow-auto"
		class:nucel-code-wrap={wrap}
		style:max-height={maxHeight}
	>
		{#if highlightedHtml}
			<!-- Shiki-rendered output. {@html} is safe here: Shiki escapes all source. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<div class="nucel-code-shiki" class:with-line-numbers={showLineNumbers}>
				{@html highlightedHtml}
			</div>
		{:else}
			<!-- Plain fallback while Shiki loads / on SSR / on error. -->
			<pre
				class="text-foreground p-4 font-mono text-[13px] leading-relaxed"
				class:whitespace-pre-wrap={wrap}><code
					data-language={language}
					class={cn('block', `language-${language}`)}
					>{#if showLineNumbers}{#each lines as line, i (i)}<span
								class="text-muted-foreground/60 mr-4 inline-block w-6 text-right select-none"
								>{i + 1}</span
							>{line}{#if i < lines.length - 1}{'\n'}{/if}{/each}{:else}{code}{/if}</code
				></pre>
		{/if}
	</div>
</div>

<style>
	/* Shiki emits a <pre class="shiki ..."><code><span class="line">…</span></code></pre>.
	   We restyle its container only — the inline colour spans are Shiki's.
	   Theme-aware: when the consumer flips to dark we swap to the dark stylesheet. */
	.nucel-code-shiki :global(pre.shiki) {
		margin: 0;
		padding: 1rem;
		background: transparent !important;
		font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
		font-size: 13px;
		line-height: 1.55;
		tab-size: 2;
	}
	.nucel-code-shiki :global(pre.shiki code) {
		display: block;
		min-width: max-content;
	}
	.nucel-code-shiki.with-line-numbers :global(pre.shiki) {
		counter-reset: shiki-line;
		padding-left: 0;
	}
	.nucel-code-shiki.with-line-numbers :global(pre.shiki .line)::before {
		counter-increment: shiki-line;
		content: counter(shiki-line);
		display: inline-block;
		width: 2.5rem;
		margin-right: 1rem;
		padding-right: 0.5rem;
		text-align: right;
		color: var(--muted-foreground);
		opacity: 0.6;
		user-select: none;
		border-right: 1px solid var(--border);
	}
	.nucel-code-wrap :global(pre.shiki) {
		white-space: pre-wrap;
		word-break: break-word;
	}
	.nucel-code-wrap :global(pre.shiki code) {
		min-width: 0;
	}
</style>
